import {css} from "styled-components";

interface IValue {
  [key: number]: number;
}

export const breakpoints = (
  cssProp = "padding",
  cssPropUnits = "px",
  values: IValue[] = [],
  mediaQueryType = "min-width"
) => {
  const breakpointProps = values.reduce((mediaQueries, value) => {
    const screenBreakpoint = Object.keys(value);
    const cssPropBreakpoint = Object.values(value);

    return (mediaQueries += `
    @media screen and (${mediaQueryType}: ${screenBreakpoint}px) {
      ${cssProp}: ${cssPropBreakpoint}${cssPropUnits};
    };
    `);
  }, "");

  return css(() => breakpointProps);
};
