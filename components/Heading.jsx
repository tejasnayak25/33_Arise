import { poppins } from "./fonts";

const SiteScanLogo = () => (
  <h1
    className={`
      text-xl font-extrabold tracking-wide 
      text-start ${poppins.className}
    `}
    style={{ letterSpacing: "0.04em" }}
  >
    <span className="text-[#189fb8]">Site</span>
    <span className="text-orange-500">Scan</span>
  </h1>
);

export default SiteScanLogo;
