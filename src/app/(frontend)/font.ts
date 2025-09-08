import { Inter_Tight } from "next/font/google";

export const interTight = Inter_Tight({
  subsets: ["latin"], // character subsets
  weight: ["400", "600", "700"], // include all weights you plan to use
  variable: "--font-inter-tight", // optional CSS variable
});
