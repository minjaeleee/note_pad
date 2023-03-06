import styled from "@emotion/styled";
import { border, BorderProps, color, ColorProps, display, DisplayProps, flexbox, FlexboxProps, layout, LayoutProps, position, PositionProps, space, SpaceProps, typography, TypographyProps } from "styled-system";


export type BoxProps = LayoutProps & ColorProps
	& SpaceProps & PositionProps
	& BorderProps & DisplayProps & FlexboxProps & TypographyProps


const Box = styled.div<BoxProps>`
	${layout}
	${color}
	${border}
	${display}
	${flexbox}
	${typography}
	${space}
	${position}
`


export default Box;