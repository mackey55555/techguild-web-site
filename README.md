# Tech Guild Web Site

学生と企業が、地域のITを一緒に育てるコミュニティ「Tech Guild」の公式サイトです。

ハッカソンや月次座談会・ディナーイベントを通じて、地域のIT人材育成を推進しています。

## 技術スタック

- **フレームワーク**: [Next.js 16](https://nextjs.org/) (App Router)
- **言語**: TypeScript 5.7
- **UI**: React 19 / [Tailwind CSS v4](https://tailwindcss.com/) / [shadcn/ui](https://ui.shadcn.com/) (Radix UI)
- **CMS**: [Keystatic](https://keystatic.com/)（Git ベース・GitHub モード）
- **フォーム**: react-hook-form + zod
- **解析**: Vercel Analytics
- **デプロイ**: Vercel

## ディレクトリ構成

```
.
├── app/
│   ├── (site)/           # 公開サイト（Nav/Footer 付きルートグループ）
│   │   ├── about/        # コミュニティ紹介
│   │   ├── activities/   # 活動内容・ロードマップ
│   │   ├── companies/    # 企業向けページ
│   │   ├── students/     # 学生向けページ
│   │   └── page.tsx      # トップページ
│   ├── keystatic/        # Keystatic 管理画面 (/keystatic)
│   ├── api/keystatic/    # Keystatic ルートハンドラ
│   └── layout.tsx        # 最小ルートレイアウト（html/body/fonts）
├── content/              # Keystatic のコンテンツ（Git 管理）
│   ├── site-stats.json   # サイト統計・運営者プロフィール
│   ├── events/           # 活動イベント一覧
│   ├── roadmap/          # ロードマップ
│   └── student-voices/   # 学生の声
├── components/           # ページごとのコンポーネント + ui/ (shadcn/ui)
├── hooks/                # カスタムフック
├── keystatic.config.ts   # Keystatic スキーマ・ストレージ設定
├── lib/
│   ├── cms.ts            # Keystatic reader・型定義・フェッチ関数
│   ├── connpass.ts       # connpass フィードからの今後のイベント取得
│   ├── content.ts        # 静的な日本語テキスト
│   └── utils.ts
├── public/               # 静的ファイル（運営者写真など）
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

**ローカル開発では環境変数は不要です。** Keystatic は `NODE_ENV=development` のとき `local` モード（リポジトリ内ファイルを直接読み書き）で動くため、そのまま `npm run dev` で起動できます。

本番（GitHub モード）で `/keystatic` の編集 UI を動かす場合のみ、以下を設定します（初回に `/keystatic` から GitHub App を作成すると値が発行されます）。

```bash
KEYSTATIC_GITHUB_CLIENT_ID=...
KEYSTATIC_GITHUB_CLIENT_SECRET=...
KEYSTATIC_SECRET=...
NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG=...
```

| 変数名 | 説明 |
| --- | --- |
| `KEYSTATIC_GITHUB_CLIENT_ID` / `KEYSTATIC_GITHUB_CLIENT_SECRET` | GitHub App の認証情報 |
| `KEYSTATIC_SECRET` | セッション署名用シークレット |
| `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` | 作成した GitHub App のスラッグ |

> **Note**: 編集メンバーはこのリポジトリの **write 権限を持つ collaborator** である必要があります（Keystatic の編集はリポジトリへのコミットとして反映されます）。

### 5. 開発サーバーの起動

```bash
npm run dev
```

- 公開サイト: [http://localhost:3000](http://localhost:3000)
- 管理画面: [http://localhost:3000/keystatic](http://localhost:3000/keystatic)（local モードで GitHub App 不要）

## コンテンツ（Keystatic）

コンテンツはリポジトリ内の `content/` にファイルとして保存され、`lib/cms.ts` の reader 経由で読み出します。スキーマは `keystatic.config.ts` を参照してください。

| 種別 | 保存場所 | 用途 |
| --- | --- | --- |
| `siteStats`（singleton） | `content/site-stats.json` | 参加者数・座談会回数・継続期間・タグライン・運営者プロフィール |
| `events`（collection） | `content/events/*.yaml` | 活動イベント（座談会・ハッカソン・野営会など、`eventType` で種別管理） |
| `roadmap`（collection） | `content/roadmap/*.yaml` | コミュニティのロードマップ |
| `studentVoices`（collection） | `content/student-voices/*.yaml` | 学生の声（空の場合はセクション非表示） |

> 今後のイベント告知は connpass の公開フィード（`lib/connpass.ts`）から取得しており、CMS 管理は不要です。

## よく使うコマンド

| コマンド | 説明 |
| --- | --- |
| `npm run dev` | 開発サーバーを起動 (デフォルト: 3000 番ポート) |
| `npm run build` | プロダクションビルド |
| `npm run start` | ビルド済みアプリを起動 |
| `npm run lint` | ESLint を実行 |

## コンテンツ更新の流れ

1. `/keystatic` でコンテンツを編集（または `content/` のファイルを直接編集）
2. GitHub モードでは編集内容がリポジトリへのコミットとして反映される
3. Vercel が push を検知して再デプロイ → ビルド時に `lib/cms.ts` の reader がファイルを読み込み反映

各ページには ISR の `revalidate`（connpass の今後のイベント取得用）が設定されています。

## デプロイ

Vercel への接続を推奨します。リポジトリを Vercel に取り込んだ後、`/keystatic` から GitHub App を作成し、発行された `KEYSTATIC_*` 環境変数を Vercel のプロジェクト設定に登録してください。

## ライセンス

社内/コミュニティ運用のためのプライベートリポジトリです。
