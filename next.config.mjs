const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com',  // This matches the domain
          pathname: '/djpdesqrs/**',       // This matches the path after the domain
        },
        {
          hostname: 'i3.ytimg.com',  // This matches the domain
        },
      ],
    },
  };
  
export default nextConfig;