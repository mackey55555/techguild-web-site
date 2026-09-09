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
  images: {
    // スポンサーのロゴは SVG で入稿されることがある。next/image の最適化サーバーは
    // 既定で SVG を拒否する（400）ため許可し、あわせて実行を封じる緩和策を入れる。
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
}

export default nextConfig
