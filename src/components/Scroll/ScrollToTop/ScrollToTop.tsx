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
			onClick={scrollToTop}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			className="flex flex-col items-center w-16 cursor-pointer hover:animate-scale-reveal"
		>
			{inHover && <h1 className="text-sm">Top</h1>}
			<button
				style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.53)" }}
				className={classNames(
					isVisible
						? "block bg-bgGrey100 bg-opacity-60 p-1 "
						: "hidden"
				)}
			>
				<ArrowTopIcon className="w-auto h-8" />
			</button>
		</div>
	);
};

export default ScrollToTop;
