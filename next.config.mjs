/** @type {import('next').NextConfig} */
import NextPWA from "next-pwa";

const nextConfig = {};
const withPWA = NextPWA({
  dest: "public",
});

export default withPWA(nextConfig);
