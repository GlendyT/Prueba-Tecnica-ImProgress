import { NextFont } from "next/dist/compiled/@next/font";
import { Konkhmer_Sleokchher } from "next/font/google";

//STYLES
export const cardStyles: string =
  "flex flex-col items-center border-2 border-black rounded-md py-2  w-1/3 h-auto max-sm:w-full max-sm:h-auto bg-white shadow-lg max-lg:w-full";

export const textStyles: string =
  "text-sm text-black font-semibold max-sm:text-xs text-center";

export const cardBottomStyles: string =
  "w-1/2 flex flex-col gap-0 max-lg:w-full";

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

export const paleteColors: string[] = ["#ae1580", "#480935", "#181d1d"];

