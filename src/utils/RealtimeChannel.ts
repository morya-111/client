// Minimal Supabase Realtime (Phoenix protocol) client for receiving broadcast
// events on one topic. supabase-js doesn't bundle on CRA 4 / webpack 4, and
// we only need "listen to a broadcast channel", so this speaks the wire
// protocol directly: join, heartbeat, reconnect.

type Listener = (payload: any) => void;

const HEARTBEAT_MS = 25000;
const RECONNECT_MS = [1000, 2000, 5000, 10000];

export class RealtimeChannel {
	private ws: WebSocket | null = null;
	private ref = 0;
	private heartbeat: ReturnType<typeof setInterval> | null = null;
	private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
	private attempts = 0;
	private closedByUser = false;
	private listeners: Record<string, Set<Listener>> = {};

	constructor(
		private supabaseUrl: string,
		private apiKey: string,
		private topic: string
	) {}

	connect() {
		this.closedByUser = false;
		const wsUrl = `${this.supabaseUrl.replace(
			/^http/,
			"ws"
		)}/realtime/v1/websocket?apikey=${encodeURIComponent(
			this.apiKey
		)}&vsn=1.0.0`;

		const ws = new WebSocket(wsUrl);
		this.ws = ws;

		ws.onopen = () => {
			this.attempts = 0;
			const joinRef = this.nextRef();
			this.push({
				topic: `realtime:${this.topic}`,
				event: "phx_join",
				payload: {
					config: {
						broadcast: { ack: false, self: false },
						presence: { key: "" },
						postgres_changes: [],
						private: false,
					},
				},
				ref: joinRef,
				join_ref: joinRef,
			});
			this.heartbeat = setInterval(() => {
				this.push({
					topic: "phoenix",
					event: "heartbeat",
					payload: {},
					ref: this.nextRef(),
				});
			}, HEARTBEAT_MS);
		};

		ws.onmessage = (e) => {
			let msg: any;
			try {
				msg = JSON.parse(e.data);
			} catch {
				return;
			}
			if (msg.event === "broadcast" && msg.payload?.event) {
				this.listeners[msg.payload.event]?.forEach((fn) =>
					fn(msg.payload.payload)
				);
			}
		};

		ws.onclose = () => {
			this.stopHeartbeat();
			if (this.closedByUser) return;
			const delay =
				RECONNECT_MS[Math.min(this.attempts, RECONNECT_MS.length - 1)];
			this.attempts++;
			this.reconnectTimer = setTimeout(() => this.connect(), delay);
		};
	}

	disconnect() {
		this.closedByUser = true;
		this.stopHeartbeat();
		if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
		this.ws?.close();
		this.ws = null;
	}

	on(event: string, fn: Listener) {
		if (!this.listeners[event]) this.listeners[event] = new Set();
		this.listeners[event].add(fn);
	}

	off(event: string, fn: Listener) {
		this.listeners[event]?.delete(fn);
	}

	private push(msg: object) {
		if (this.ws?.readyState === WebSocket.OPEN)
			this.ws.send(JSON.stringify(msg));
	}

	private nextRef() {
		return String(++this.ref);
	}

	private stopHeartbeat() {
		if (this.heartbeat) clearInterval(this.heartbeat);
		this.heartbeat = null;
	}
}
