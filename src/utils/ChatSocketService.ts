import { io } from "socket.io-client";

export const ChatSocketService = {};

export const clientSocket = io("http://localhost:4000", { autoConnect: false });
