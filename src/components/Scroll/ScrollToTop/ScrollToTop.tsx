import React, { useEffect, useState } from "react";
import { ReactComponent as ArrowTopIcon } from "assets/common/arrow-top-icon.svg";
import classNames from "classnames";

const ScrollToTop = () => {
	const [isVisible, setIsVisible] = useState(false);
	const toggleVisibility = () => {
		window.pageYOffset > 300 ? setIsVisible(true) : setIsVisible(false);
	};
	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
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
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			className="flex flex-col items-center w-16 animate-bounce"
		>
			{inHover && <h1 className="text-sm">Top</h1>}
			<button
				onClick={scrollToTop}
				className={classNames(
					isVisible
						? "block bg-semiLight bg-opacity-60 p-1 "
						: "hidden"
				)}
			>
				<ArrowTopIcon className="w-auto h-8" />
			</button>
		</div>
	);
};

export default ScrollToTop;
