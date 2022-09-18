import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    // 바뀌는 색
    bgColor: string;
    bgWhiteColor: string;
    bgWhiteTransColor1: string;
    bgWhiteTransColor2: string;
    bgBlackTransColor: string;

    textColor: string;
    textWhiteColor: string;
    textAcentColor: string;

    btnColor: string;

    grayscaleblackColor: string;
    grayscalewhiteColor: string;
    grayscale1Color: string;
    grayscale2Color: string;
    grayscale3Color: string;
    grayscale4Color: string;
    grayscale5Color: string;
    grayscale6Color: string;

    // 바뀌지 않는 색
    primaryGreenColor: string;
    primaryBlueColor: string;

    secondaryDarkBlueColor: string;
    secondaryBlueColor: string;
    secondaryMintColor: string;
    secondaryDarkColor: string;
    secondaryLightBlueColor: string;
    secondaryLightMintColor: string;

    infoColor: string;
    darkVariantColor: string;

    dangerColor: "#eb5757";
    successColor: " #219653";
    warningColor: "#f2c94c";
  }
}
