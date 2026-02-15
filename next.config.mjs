const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com',
          pathname: '/djpdesqrs/**',
        },
        {
          hostname: 'i3.ytimg.com',
        },
      ],
    },
  };
  
export default nextConfig;