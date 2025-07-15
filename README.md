# もの₍ ･ᴗ･ ₎の活動記録

mono's projects, tools, and creations を表示するWebサイト

## 特徴

- **多様なプロジェクト**: Nostrアプリ、ゲーム、ライブラリ、Bot等の表示
- **カテゴリ別整理**: プロジェクトをカテゴリごとに整理して表示
- **検索・フィルタリング**: プロジェクトの検索とカテゴリフィルタリング
- **レスポンシブデザイン**: モバイル・デスクトップ対応
- **Nostr統合**: @konemono/nostr-web-components を使用したNostr投稿の埋め込み

## 技術スタック

- **フレームワーク**: SvelteKit + Svelte 5
- **言語**: TypeScript
- **データ処理**: Papa Parse (CSV), SheetJS (Excel)
- **スタイル**: カスタムCSS
- **Nostr統合**: @konemono/nostr-web-components

## セットアップ

```bash
# プロジェクトの作成
npx sv create myapp
cd myapp

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

## データファイル

プロジェクトデータは以下のいずれかの形式で `static/` フォルダに配置:

- `tsukemono_projects_all_cleaned.csv` (推奨)
- `data.xlsx` (フォールバック)

### データ形式

CSVファイルには以下の列が必要:

| 列名         | 説明                       |
| ------------ | -------------------------- |
| Title        | プロジェクト名             |
| Url          | デモURL                    |
| Desc         | 説明                       |
| Source       | ソースコードURL            |
| Date         | 開発期間                   |
| ジャンル１   | 主要ジャンル               |
| ジャンル２   | 副ジャンル                 |
| 他キーワード | キーワード（カンマ区切り） |
| 分類         | プロジェクトカテゴリ       |

## プロジェクトカテゴリ

- **WebComponentライブラリ**: 再利用可能なWebコンポーネント
- **ライブラリ**: 開発用ライブラリ・パッケージ
- **Webアプリ**: ブラウザで動作するアプリケーション
- **Bot**: 自動化Bot・定期投稿システム
- **ブラウザ拡張**: ブラウザ機能拡張
- **ゲーム**: ゲーム・インタラクティブコンテンツ
- **ソフトウェア**: デスクトップアプリケーション
- **アカウント**: 各種プラットフォームアカウント
- **記事**: 技術記事・ドキュメント
- **その他**: 上記以外のプロジェクト

## 機能

### 検索・フィルタリング

- プロジェクト名、説明、ジャンル、キーワードでの検索
- カテゴリ別フィルタリング
- 全展開・全折りたたみ機能

### Nostr統合

- Nostrプロジェクトの投稿埋め込み表示
- @konemono/nostr-web-components を使用

### レスポンシブデザイン

- モバイル・タブレット・デスクトップ対応
- プロジェクトカードのグリッドレイアウト
- 折りたたみ可能なカテゴリセクション

## ビルド

```bash
# プロダクションビルド
npm run build

# プレビュー
npm run preview
```

## カスタマイズ

### 新しいカテゴリの追加

`src/lib/types.ts` の `ProjectCategory` 型と `categoryConfigs` を更新:

```typescript
export type ProjectCategory = '既存のカテゴリ' | '新しいカテゴリ';

export const categoryConfigs: Record<ProjectCategory, CategoryConfig> = {
	// ...
	新しいカテゴリ: {
		name: '表示名',
		color: 'bg-color-500',
		icon: '🆕',
		description: '説明'
	}
};
```

### スタイルのカスタマイズ

各コンポーネントのスタイルは `<style>` タグ内で定義されています。グローバルスタイルは `src/app.css` で管理。

## ライセンス

MIT License

## 作者

mono ₍ ･ᴗ･ ₎

- GitHub: [@TsukemonoGit](https://github.com/TsukemonoGit)
- Zenn: [@konemono](https://zenn.dev/konemono)
- Bluesky: [@mono.bsky.social](https://bsky.app/profile/mono.bsky.social)

---

# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
