import styled from "@emotion/styled";
import { border, color, display,  flexbox, layout, position, space, typography } from "styled-system";
import { BoxProps } from "./Box";

const Button = styled.button<BoxProps & {
  square?: boolean
}>`
  cursor: pointer;
  background-color: white;
  border: #ccc solid 1px;
  height: 32px;
  width:  ${({square}) => square ? "32px" : "64px"};
  :hover {
    border-color: #06c;
    color:  #06c;
  }
	${layout}
	${color}
	${border}
	${display}
	${flexbox}
	${typography}
	${space}
	${position}
`


export default Button;