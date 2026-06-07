import { config, fields, collection, singleton } from '@keystatic/core'

// 開発時は GitHub App なしで編集できる local モード、本番は GitHub モード。
const storage =
  process.env.NODE_ENV === 'development'
    ? ({ kind: 'local' } as const)
    : ({
        kind: 'github',
        repo: 'mackey55555/techguild-web-site',
      } as const)

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
