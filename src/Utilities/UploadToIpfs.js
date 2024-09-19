import { PinataSDK } from "pinata-web3";

const pinataJWT = import.meta.env.VITE_PINATA_JWT;
const pinataGateway = import.meta.env.VITE_PINATA_GATEWAY;

const pinata = new PinataSDK({
  pinataJwt: pinataJWT,
  pinataGateway: pinataGateway,
});
export async function uploadToIpfs(buffer, title) {
  console.log(pinata);

  console.log(title);
  const blob = new Blob([buffer], { type: "video/mp4" });
  const file = new File([blob], title, { type: "video/mp4" });

  const upload = await pinata.upload.file(blob);
  console.log(upload);
}
