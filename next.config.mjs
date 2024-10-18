/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    RECIPIENT_EMAIL: process.env.RECIPIENT_EMAIL,
    RESEND_API_KEY: process.env.RESEND_API_KEY
  },
  images: {
    domains: [
      'images.unsplash.com'],
  },
  
};

export default nextConfig;
