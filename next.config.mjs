import withPWA from 'next-pwa';

const nextConfig = {
  // your next config options here
};

export default withPWA({
  dest: 'public',
})(nextConfig);