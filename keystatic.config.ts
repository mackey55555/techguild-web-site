import { config, fields, collection, singleton } from '@keystatic/core'

// 重要: この設定はサーバーとクライアント(管理UI)の両方で評価されるため、
// 判定にはクライアントへも渡る NEXT_PUBLIC_* の値だけを使う。
// （KEYSTATIC_GITHUB_CLIENT_ID 等の非公開 env はクライアントでは undefined になり、
//  サーバーと判定がズレて「Create GitHub App」が出ない不具合になる）
//
// GitHub モードにするのは次のいずれか:
//   - GitHub App 設定済み（本番で NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG あり）
//   - NEXT_PUBLIC_KEYSTATIC_STORAGE=github で明示（App 作成ウィザード起動時）
// それ以外（ローカル開発・env 未設定のプレビュー）は local モードでビルドを通す。
const useGithub =
  !!process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG ||
  process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE === 'github'

const storage = useGithub
  ? ({
      kind: 'github',
      repo: 'mackey55555/techguild-web-site',
    } as const)
  : ({ kind: 'local' } as const)

export default config({
  storage,
  ui: {
    brand: { name: 'Tech Guild' },
  },
  singletons: {
    siteStats: singleton({
      label: 'サイト統計・運営者プロフィール',
      path: 'content/site-stats',
      format: { data: 'json' },
      schema: {
        participantCount: fields.text({
          label: '参加者数',
          description: 'Track Record に表示（例: 71）',
        }),
        sessionCount: fields.text({
          label: '座談会回数',
          description: 'Track Record に表示（例: 15）',
        }),
        continuationLabel: fields.text({
          label: '継続期間',
          description: '例: 1年2ヶ月',
        }),
        tagline: fields.text({ label: 'タグライン' }),
        organizerName: fields.text({ label: '運営者名' }),
        organizerRole: fields.text({ label: '運営者の肩書き' }),
        organizerBio: fields.array(
          fields.text({ label: '段落', multiline: true }),
          { label: '運営者プロフィール（段落ごと）', itemLabel: (p) => p.value.slice(0, 24) }
        ),
        organizerPhoto: fields.image({
          label: '運営者の写真',
          directory: 'public/images/organizer',
          publicPath: '/images/organizer/',
        }),
      },
    }),
  },
  collections: {
    events: collection({
      label: '活動イベント',
      path: 'content/events/*',
      slugField: 'title',
      format: { data: 'yaml' },
      schema: {
        title: fields.slug({
          name: { label: 'タイトル' },
          slug: {
            label: 'スラッグ（英数字・例: e18）',
            description: 'ファイル名になります。英数字で一意に。',
          },
        }),
        date: fields.text({ label: '開催（例: 2026.06）' }),
        eventType: fields.select({
          label: '種別',
          options: [
            { label: '座談会', value: 'roundtable' },
            { label: 'ハッカソン', value: 'hackathon' },
            { label: '野営会', value: 'camp' },
            { label: 'トーク・LT', value: 'talk' },
            { label: 'セミナー', value: 'seminar' },
            { label: '懇親会', value: 'social' },
            { label: 'その他', value: 'other' },
          ],
          defaultValue: 'roundtable',
        }),
        sortOrder: fields.integer({
          label: '並び順（大きいほど新しい）',
          validation: { isRequired: true },
        }),
        url: fields.text({ label: 'connpass URL（任意）' }),
      },
    }),
    hackathons: collection({
      label: 'ハッカソン',
      path: 'content/hackathons/*',
      slugField: 'title',
      format: { data: 'yaml' },
      schema: {
        title: fields.slug({
          name: { label: 'タイトル' },
          slug: {
            label: 'スラッグ（URL・例: 2026-shibukawa）',
            description: '/hackathon/{スラッグ} で公開されます。',
          },
        }),
        subtitle: fields.text({ label: 'サブタイトル（例: 〜1泊2日合宿 in 渋川〜）' }),
        catchCopy: fields.text({
          label: 'キャッチコピー',
          description: 'ヒーローの見出し下に出る一文',
          multiline: true,
        }),
        status: fields.select({
          label: '募集ステータス',
          options: [
            { label: '募集中', value: 'open' },
            { label: '準備中（近日公開）', value: 'coming' },
            { label: '募集終了', value: 'closed' },
            { label: '開催終了', value: 'finished' },
          ],
          defaultValue: 'open',
        }),
        connpassUrl: fields.url({ label: 'connpass URL（申し込み先）' }),
        startDate: fields.text({
          label: '開始日時（ISO 8601）',
          description: '例: 2026-10-17T09:00:00+09:00。OGP・並び順・自動締切判定に使用。',
        }),
        endDate: fields.text({
          label: '終了日時（ISO 8601）',
          description: '例: 2026-10-18T16:00:00+09:00',
        }),
        dateLabel: fields.text({
          label: '日程の表示テキスト',
          description: '例: 2026.10.17(土) 9:00 – 10.18(日) 16:00',
        }),
        venueName: fields.text({ label: '会場名' }),
        venueAddress: fields.text({ label: '会場住所' }),
        venueMapUrl: fields.text({ label: '地図URL（任意）' }),
        venueNote: fields.text({ label: '会場の補足（任意）', multiline: true }),
        capacity: fields.text({ label: '定員（例: 40名程度）' }),
        fee: fields.text({ label: '参加費（例: 無料 / 2日間の食事付き）' }),
        heroImage: fields.image({
          label: 'メイン画像（任意）',
          directory: 'public/images/hackathons',
          publicPath: '/images/hackathons/',
        }),
        themeTitle: fields.text({ label: 'テーマ（見出し）' }),
        themeDescription: fields.text({ label: 'テーマの説明', multiline: true }),
        themeExamples: fields.array(fields.text({ label: '切り口' }), {
          label: 'テーマの切り口例',
          itemLabel: (p) => p.value,
        }),
        targets: fields.array(
          fields.object({
            title: fields.text({ label: '見出し' }),
            description: fields.text({ label: '説明', multiline: true }),
          }),
          { label: 'こんな人におすすめ', itemLabel: (p) => p.fields.title.value }
        ),
        timetable: fields.array(
          fields.object({
            day: fields.select({
              label: '日',
              options: [
                { label: 'Day 1', value: 'day1' },
                { label: 'Day 2', value: 'day2' },
              ],
              defaultValue: 'day1',
            }),
            time: fields.text({ label: '時刻（例: 9:00 / 午前）' }),
            title: fields.text({ label: '内容' }),
            note: fields.text({ label: '補足（任意）' }),
          }),
          {
            label: 'タイムテーブル',
            itemLabel: (p) => `${p.fields.day.value} ${p.fields.time.value} ${p.fields.title.value}`,
          }
        ),
        timetableNote: fields.text({ label: 'タイムテーブルの注記（任意）', multiline: true }),
        belongings: fields.array(fields.text({ label: '持ち物' }), {
          label: '持ち物リスト',
          itemLabel: (p) => p.value,
        }),
        prizes: fields.array(
          fields.object({
            title: fields.text({ label: '賞の名前' }),
            description: fields.text({ label: '説明', multiline: true }),
          }),
          { label: '賞', itemLabel: (p) => p.fields.title.value }
        ),
        judgingCriteria: fields.array(fields.text({ label: '審査の観点' }), {
          label: '審査の観点',
          itemLabel: (p) => p.value,
        }),
        // スポンサーは開催ごとに集めるため、ハッカソンの子要素として持つ
        // （他の回に流用しない＝共有コレクションにはしない）
        sponsors: fields.array(
          fields.object({
            name: fields.text({ label: '企業・団体名' }),
            tier: fields.select({
              label: '協賛区分（ロゴ掲載サイズ 大/中/小）',
              options: [
                { label: 'ゴールド（大）', value: 'gold' },
                { label: 'シルバー（中）', value: 'silver' },
                { label: 'ブロンズ（小）', value: 'bronze' },
                { label: '現物協賛', value: 'inkind' },
              ],
              defaultValue: 'bronze',
            }),
            logo: fields.image({
              label: 'ロゴ（未入稿の間は社名テキストで表示されます）',
              directory: 'public/images/sponsors',
              publicPath: '/images/sponsors/',
            }),
            url: fields.text({ label: 'Webサイト URL（任意）' }),
            note: fields.text({ label: '一言紹介（任意）', multiline: true }),
          }),
          { label: 'スポンサー', itemLabel: (p) => p.fields.name.value }
        ),
        sponsorMessage: fields.text({
          label: 'スポンサー募集の一文（任意）',
          multiline: true,
        }),
        sponsorFormUrl: fields.text({
          label: 'スポンサー申し込みフォームURL（任意）',
          description: '設定すると協賛募集ボタンがこのURLに向きます。未設定なら企業向け問い合わせページへ。',
        }),
        sponsorDeadline: fields.date({
          label: '協賛の申し込み締切（任意）',
          description:
            '当日の23:59（日本時間）を過ぎると申し込みボタンは自動で消え、募集文だけが残ります。',
        }),
        faq: fields.array(
          fields.object({
            question: fields.text({ label: '質問' }),
            answer: fields.text({ label: '回答', multiline: true }),
          }),
          { label: 'よくある質問', itemLabel: (p) => p.fields.question.value }
        ),
        notes: fields.array(fields.text({ label: '注意事項' }), {
          label: '注意事項',
          itemLabel: (p) => p.value,
        }),
        organizerLabel: fields.text({ label: '主催（例: 岡山エンジニアコミュニティ【Tech Guild】）' }),
      },
    }),
    studentVoices: collection({
      label: '学生の声',
      path: 'content/student-voices/*',
      slugField: 'name',
      format: { data: 'yaml' },
      schema: {
        name: fields.slug({
          name: { label: '表示名' },
          slug: { label: 'スラッグ（英数字）' },
        }),
        university: fields.text({ label: '大学・学部・学年' }),
        quote: fields.text({ label: 'コメント', multiline: true }),
        displayOrder: fields.integer({
          label: '表示順',
          validation: { isRequired: true },
        }),
      },
    }),
    roadmap: collection({
      label: 'ロードマップ',
      path: 'content/roadmap/*',
      slugField: 'year',
      format: { data: 'yaml' },
      schema: {
        year: fields.slug({ name: { label: '年（例: 2026）' } }),
        events: fields.array(fields.text({ label: '項目' }), {
          label: '出来事',
          itemLabel: (p) => p.value,
        }),
        status: fields.select({
          label: 'ステータス',
          options: [
            { label: '達成済み', value: 'done' },
            { label: '進行中', value: 'upcoming' },
            { label: '将来', value: 'future' },
          ],
          defaultValue: 'upcoming',
        }),
        sortOrder: fields.integer({
          label: '並び順',
          validation: { isRequired: true },
        }),
      },
    }),
  },
})
