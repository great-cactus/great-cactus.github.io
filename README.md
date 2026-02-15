# great-cactus.github.io

角田 陽の個人研究者ページ。Astro製の静的サイトで、GitHub Pagesにデプロイされる。

## 技術スタック

- **Astro 5** — 静的サイトジェネレータ
- **React 19** — インタラクティブコンポーネント
- **Tailwind CSS 4** — スタイリング（Viteプラグイン経由）
- **Pagefind** — 静的サイト内検索
- **bibtex-parse-js** — BibTeXからMarkdownへの自動変換

## 必要環境

- Node.js >= 22.12.0

## コマンド一覧

| コマンド | 説明 |
|---|---|
| `npm run dev` | 開発サーバー起動 |
| `npm run build` | BibTeX変換 → Astroビルド → Pagefindインデックス生成 |
| `npm run preview` | ビルド結果をローカルで確認 |
| `npm run lint` | Astro型チェック (`astro check`) |
| `npm run import-bibtex` | `citations.bib` → `src/content/publications/` に変換 |

## ディレクトリ構成

```
.
├── citations.bib              # 論文データ（BibTeX形式）
├── scripts/
│   └── import-bibtex.js       # BibTeX → Markdown変換スクリプト
├── src/
│   ├── config.ts              # サイト名・ナビゲーション・SNSリンク等
│   ├── content.config.ts      # コンテンツコレクションのスキーマ定義
│   ├── content/
│   │   ├── publications/      # 論文（import-bibtexで自動生成）
│   │   ├── research/          # 研究テーマ（手動作成）
│   │   └── honors/            # 受賞歴（手動作成）
│   ├── components/            # UIコンポーネント
│   ├── layouts/               # ページレイアウト
│   ├── pages/                 # ルーティング（index, research, achievements, cv, search）
│   └── styles/                # グローバルCSS
├── public/                    # 静的ファイル（favicon, フォント）
├── astro.config.mjs           # Astro設定（サイトURL, Viteプラグイン）
└── .github/workflows/
    └── deploy.yml             # GitHub Pages自動デプロイ
```

## コンテンツの追加・編集

### 論文を追加する

`citations.bib` にBibTeXエントリを追加し、ビルドすると `src/content/publications/` にMarkdownが自動生成される。

```bash
# BibTeX変換だけ実行
npm run import-bibtex
```

### 研究テーマを追加する

`src/content/research/` にMarkdownファイルを作成する。

```yaml
---
title: テーマ名
description: 概要説明
order: 1          # 表示順（小さいほど先）
---

本文をここに書く。
```

### 受賞歴を追加する

`src/content/honors/` にMarkdownファイルを作成する。

```yaml
---
title: 受賞タイトル
award: 賞の名称
date: 2025-03-01
year: "2025"
type: Other       # Challenge Cup | Internet+ | Other
level: First      # Special | First | Second | Third
---
```

## デプロイ

`main` ブランチにpushすると GitHub Actions が自動でビルド・デプロイする。手動トリガー (`workflow_dispatch`) も可能。

## 主要設定ファイル

| ファイル | 役割 |
|---|---|
| `astro.config.mjs` | サイトURL、HTML圧縮、Viteプラグイン（Tailwind CSS）の設定 |
| `src/config.ts` | サイト名、著者情報、ナビゲーション、SNSリンク、i18n設定 |
| `src/content.config.ts` | publications / research / honors のスキーマ定義 |
