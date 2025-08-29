import { NextFont } from "next/dist/compiled/@next/font";
import { Konkhmer_Sleokchher } from "next/font/google";

//STYLES
export const cardStyles: string =
  "flex flex-col items-center justify-center rounded-lg py-2 w-full px-2 max-2xl:w-full max-xl:w-full  h-full  bg-white shadow-2xl max-lg:w-full";

export const textStyles: string =
  "text-sm text-black font-semibold max-sm:text-xs text-center px-2";

export const cardBottomStyles: string = " w-full px-2 ";

export const bottomSmallCards: string = " flex flex-col items-center justify-center w-full  px-2 py-1 mx-auto h-auto";

export const konkhmer: NextFont = Konkhmer_Sleokchher({
  subsets: ["latin"],
  weight: ["400"],
});

//LABELS AND COLORS
export const donutLabels: string[] = [
  "Rendimiento Alto",
  "Rendimiento Normal",
  "Rendimiento Bajo",
];

export const paleteColors: string[] = ["#AE1580", "#480935", "#181d1d"];
