import { useEffect } from "react";

function useClickedOutsideEffect(ref: any, effectFunction: Function) {
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (ref.current && !ref.current.contains(event.target)) {
				effectFunction();
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	});
}

export default useClickedOutsideEffect;
