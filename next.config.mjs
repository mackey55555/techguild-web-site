/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // 開発時に http://127.0.0.1:3000 でアクセスしてもクロスオリジン扱いで
  // 開発リソース(HMR/フォント/JSチャンク)がブロックされないようにする
  allowedDevOrigins: ['127.0.0.1'],
  // Keystatic の reader はリポジトリ内の content/ をファイルとして読む。
  // ISR の再生成（サーバーレス関数）でも読めるよう、関数バンドルに content/ を同梱する。
  // これを入れないと再生成後に getEvents()/getSiteStats() が空を返す。
  outputFileTracingIncludes: {
    '/**': ['./content/**/*'],
  },
}

export default nextConfig
