import React, { useEffect, useState } from "react";
import { ReactComponent as ArrowBottomIcon } from "assets/common/arrow-bottom-icon.svg";
import classNames from "classnames";

const ScrollToBottom = () => {
	const [isVisible, setIsVisible] = useState(false);
	const toggleVisibility = () => {
		window.pageYOffset > 300 ? setIsVisible(false) : setIsVisible(true);
	};
	const scrollToBottom = () => {
		window.scrollTo({ top: 10000000, behavior: "smooth" });
	};
	useEffect(() => {
		window.addEventListener("scroll", toggleVisibility);
		return () => {
			window.removeEventListener("scroll", toggleVisibility);
		};
	}, []);
	const [inHover, setHover] = useState(false);
	return (
		<div
			onClick={scrollToBottom}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			className="flex flex-col items-center w-16 cursor-pointer hover:animate-scale-reveal"
		>
			<button
				style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.53)" }}
				className={classNames(
					isVisible
						? "block  bg-opacity-60 p-1  bg-bgGrey100 "
						: "hidden"
				)}
			>
				<ArrowBottomIcon className="w-auto h-8" />
			</button>
			{inHover && <h1 className="text-sm">Bottom</h1>}
		</div>
	);
};

export default ScrollToBottom;
