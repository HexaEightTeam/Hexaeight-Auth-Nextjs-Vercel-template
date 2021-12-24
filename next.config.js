module.exports = {
  reactStrictMode: true,
   async rewrites() {
    return [
     {
        source: '/login(.*)',
        destination: '/api/loginpage',
      },
    ]
  }
}


