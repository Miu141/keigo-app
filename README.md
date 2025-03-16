# 敬語変換アプリ

普通の日本語を丁寧な敬語に変換するWebアプリケーションです。OpenAI APIを使用して、入力されたテキストを敬語に変換します。

## 機能

- テキスト入力フォーム
- OpenAI APIを使用した敬語変換
- モダンなUI/UXデザイン
- ダークモード対応

## 技術スタック

- React
- TypeScript
- Vite
- TailwindCSS
- SCSS
- OpenAI API
- Express (バックエンドAPI)

## セットアップ方法

### 前提条件

- Node.js (v14以上)
- OpenAI APIキー

### インストール

1. リポジトリをクローンまたはダウンロードします
2. 依存関係をインストールします

```bash
cd keigo-app
npm install
```

3. `.env.example`ファイルを`.env`にコピーし、OpenAI APIキーを設定します

```bash
cp .env.example .env
```

`.env`ファイルを編集し、`OPENAI_API_KEY`に有効なAPIキーを設定します。

### 実行方法

1. バックエンドサーバーを起動します

```bash
npm run server
```

2. 別のターミナルで、フロントエンド開発サーバーを起動します

```bash
npm run dev
```

3. ブラウザで `http://localhost:5173` にアクセスします

## 使い方

1. テキスト入力欄に変換したい文章を入力します
2. 「敬語に変換する」ボタンをクリックします
3. 変換結果が表示されます

## ライセンス

MIT 