# Tech Guild Web Site

学生と企業が、地域のITを一緒に育てるコミュニティ「Tech Guild」の公式サイトです。

ハッカソンや月次座談会・ディナーイベントを通じて、地域のIT人材育成を推進しています。

## 技術スタック

- **フレームワーク**: [Next.js 16](https://nextjs.org/) (App Router)
- **言語**: TypeScript 5.7
- **UI**: React 19 / [Tailwind CSS v4](https://tailwindcss.com/) / [shadcn/ui](https://ui.shadcn.com/) (Radix UI)
- **CMS**: [microCMS](https://microcms.io/)
- **フォーム**: react-hook-form + zod
- **解析**: Vercel Analytics
- **デプロイ**: Vercel

## ディレクトリ構成

```
.
├── app/                  # Next.js App Router
│   ├── about/            # コミュニティ紹介
│   ├── activities/       # 活動内容・ロードマップ
│   ├── companies/        # 企業向けページ
│   ├── students/         # 学生向けページ
│   ├── api/revalidate/   # microCMS Webhook 用 ISR 再検証エンドポイント
│   ├── layout.tsx
│   └── page.tsx          # トップページ
├── components/           # ページごとのコンポーネント + ui/ (shadcn/ui)
├── hooks/                # カスタムフック
├── lib/
│   ├── microcms.ts       # microCMS クライアント・型定義・フェッチ関数
│   ├── content.ts
│   └── utils.ts
├── public/               # 静的ファイル
└── styles/
```

## クイックスタート

### 1. 必要な環境

- Node.js **20.x 以降** (推奨: v20.17.0)
- npm 10.x 以降
- microCMS のアカウント (コンテンツを表示するため。未設定でも UI は fallback データで動作します)

### 2. リポジトリの取得

```bash
git clone <このリポジトリのURL>
cd techguild-web-site
```

### 3. 依存パッケージのインストール

```bash
npm install
```

### 4. 環境変数の設定

プロジェクトルートに `.env.local` を作成し、以下を設定します。

```bash
# microCMS — 必須(コンテンツ取得用)
MICROCMS_SERVICE_DOMAIN=your-service-domain
MICROCMS_API_KEY=your-api-key

# microCMS Webhook 用シークレット — 任意(ISR の再検証 API で使用)
REVALIDATE_SECRET=your-random-secret
```

| 変数名 | 必須 | 説明 |
| --- | --- | --- |
| `MICROCMS_SERVICE_DOMAIN` | ○ | microCMS のサービスドメイン (`https://<ドメイン>.microcms.io` の `<ドメイン>` 部分) |
| `MICROCMS_API_KEY` | ○ | microCMS の API キー (GET 権限が必要) |
| `REVALIDATE_SECRET` | △ | `/api/revalidate` を叩く際の認証用シークレット |

> **Note**: `MICROCMS_*` が未設定の場合でも、`lib/microcms.ts` の各フェッチ関数は try/catch で fallback 値を返すため、ローカルでの UI 確認は可能です。

### 5. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

## microCMS のエンドポイント

`lib/microcms.ts` で以下のエンドポイントを参照しています。同じ構造で microCMS 側にコンテンツを作成してください。

| エンドポイント | 種別 | 用途 |
| --- | --- | --- |
| `roundtable-sessions` | リスト | 月次座談会の開催履歴 |
| `student-voices` | リスト | 学生の声 |
| `next-event` | リスト | 次回イベント告知 (`isActive` で制御) |
| `site-stats` | オブジェクト | 参加者数・運営者プロフィールなどサイト共通情報 |
| `roadmap` | リスト | コミュニティのロードマップ |

各スキーマの詳細フィールドは `lib/microcms.ts` の型定義 (`RoundtableSession` / `StudentVoice` / `NextEvent` / `SiteStats` / `RoadmapMilestone`) を参照してください。

## よく使うコマンド

| コマンド | 説明 |
| --- | --- |
| `npm run dev` | 開発サーバーを起動 (デフォルト: 3000 番ポート) |
| `npm run build` | プロダクションビルド |
| `npm run start` | ビルド済みアプリを起動 |
| `npm run lint` | ESLint を実行 |

## ISR 再検証 (microCMS Webhook 連携)

microCMS でコンテンツを更新した際にサイト側を即時反映させるため、`POST /api/revalidate` を用意しています。

**使い方**: microCMS の Webhook 設定で以下を登録します。

- URL: `https://<your-domain>/api/revalidate?secret=<REVALIDATE_SECRET>`
- メソッド: POST

ヘッダー `x-microcms-signature` または クエリパラメータ `secret` のいずれかが `REVALIDATE_SECRET` に一致したときに、トップ・`/about`・`/activities`・`/students` を再検証します。

## デプロイ

Vercel への接続を推奨します。リポジトリを Vercel に取り込んだ後、上記の環境変数をプロジェクト設定に登録してください。

## ライセンス

社内/コミュニティ運用のためのプライベートリポジトリです。
