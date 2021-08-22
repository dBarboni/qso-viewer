module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/lotw/:path*',
        destination: 'https://lotw.arrl.org/lotwuser/lotwreport.adi/:path*',
      },
    ]
  }
}
