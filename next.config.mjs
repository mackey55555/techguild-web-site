/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // 開発時に http://127.0.0.1:3000 でアクセスしてもクロスオリジン扱いで
  // 開発リソース(HMR/フォント/JSチャンク)がブロックされないようにする
  allowedDevOrigins: ['127.0.0.1'],
}

export default nextConfig
