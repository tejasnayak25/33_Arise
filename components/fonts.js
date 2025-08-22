import { Poppins } from "next/font/google";

export const poppins = Poppins({
  subsets: ["latin"], // required
  weight: ["400", "500", "600", "700"], // optional, specify the weights you need
  style: ["normal"], // optional
});
