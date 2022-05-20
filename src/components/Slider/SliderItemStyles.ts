import styled from "styled-components";

type Props = {
	zoomFactor: number;
	slideMargin: number;
	visibleSlides: number;
	className: string;
};

export const StyledSliderItem = styled.div<Props>`
	margin: 0 ${(props) => props.slideMargin}px;

	transition: transform 500ms ease;
	margin-right: 50px;
	cursor: pointer;
	width: fit-content;
	height: 100%;
	box-sizing: border-box;
	display: flex;
	transform: scale(1);
	user-select: none;

	img {
		height: 100%;

		filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
		box-sizing: border-box;
	}
	:hover {
		transform: scale(${(props) => props.zoomFactor / 100 + 1}) !important;
	}
	:hover ~ * {
		transform: translateX(
			${(props) => props.zoomFactor / 2 + "%"}
		) !important;
	}
	&.left {
		transform-origin: left;
		:hover ~ * {
			transform: translateX(
				${(props) => props.zoomFactor + "%"}
			) !important;
		}
	}
	&.right {
		transform-origin: right;
		:hover ~ * {
			transform: translateX(0%) !important;
		}
	}
`;
