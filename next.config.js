module.exports = {
    images: {
      domains: ['firebasestorage.googleapis.com'], // Allow images from Firebase Storage
    },
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      });
  
      return config;
    },
  };