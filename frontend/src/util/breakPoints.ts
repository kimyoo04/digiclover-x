import {css} from "styled-components";

export const breakpoints = (
  cssProp = "padding",
  cssPropUnits = "px",
  values: any = [],
  mediaQueryType = "min-width"
) => {
  const breakpointProps = values.reduce((mediaQueries: string, value: any) => {
    const screenBreakpoint = Object.keys(value);
    const cssPropBreakpoint = Object.values(value);

    return (mediaQueries += `
    @media screen and (${mediaQueryType}: ${screenBreakpoint}px) {
      ${cssProp}: ${cssPropBreakpoint}${cssPropUnits};
    };
    `);
  }, "");

  return css(breakpointProps);
};
