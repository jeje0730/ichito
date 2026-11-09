# Cloudflare Pagesへの公開

このサイトはHTML・CSS・JavaScriptで動く静的サイトです。ビルド、データベース、Pages Functionsは不要です。
公開ディレクトリは `ichito-site` です。リポジトリ全体はアップロードしません。

## GitHub連携で公開（推奨）

1. この変更をGitHubへpushします。
2. Cloudflareの管理画面で「Workers & Pages」からPagesの作成へ進み、GitHubリポジトリを接続します。Workersの作成ではなくPagesを選びます。
3. 次の値を設定します。

| 項目 | 値 |
| --- | --- |
| プロジェクト名 | `ramen-ichito`（使用済みなら別の名前） |
| 本番ブランチ | 公開するブランチを選択 |
| フレームワーク | None |
| ルートディレクトリ | リポジトリ直下（変更しない） |
| ビルドコマンド | `exit 0` |
| ビルド出力ディレクトリ | `ichito-site` |
| 環境変数 | 不要 |

4. デプロイ完了後、表示された `https://プロジェクト名.pages.dev` にアクセスします。
5. 以後、本番ブランチへのpushで自動更新されます。

`wrangler.jsonc` にも公開ディレクトリを定義しています。管理画面で別の出力ディレクトリを指定しないでください。

## フォルダーを手動アップロードする場合

Pagesの「Direct Upload」で `ichito-site` フォルダーを選びます。アップロード後の最上位に `index.html`、`_headers`、`404.html` があることを確認します。
Git連携とDirect Uploadは後から同じプロジェクトで切り替えられないため、継続的に更新する場合は最初からGit連携を選んでください。

## 独自ドメイン

ドメイン取得後、Pagesプロジェクトの「Custom domains」から設定します。
`example.com` のようなルートドメインを使う場合は、そのドメインのネームサーバーをCloudflareに設定します。
既存のメールを使っているドメインでは、MX・SPF・DKIMなど既存のDNSレコードを引き継いでから変更してください。
ドメインが未確定のため、canonical・サイトマップ・ドメイン固定のリダイレクトは未設定です。確定後に本番URLで追加します。

## 公開後の確認

- ホーム、お品書き、こだわり、店舗案内、お問い合わせが表示される。
- スマートフォンでメニューが開閉でき、写真が表示される。
- 存在しないURLで404ページが表示され、「ホームへ戻る」でトップへ戻れる。
- HTTPSで表示され、店舗案内のGoogleマップが表示される。
- お問い合わせはFormspreeへ送信する既存構成です。Formspree側の受信先認証・利用枠・公開ドメイン制限を確認し、公開URLからテストして店舗のメール受信まで確認します。

`_headers` はCloudflare Pagesで適用されるレスポンスヘッダーです。通常のローカルファイル閲覧では適用されません。
問い合わせ送信は外部サービスに依存し、Cloudflareだけでメール送信は完結しません。

## 公式資料

- [静的HTMLの公開](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/)
- [Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/)
- [カスタムドメイン](https://developers.cloudflare.com/pages/configuration/custom-domains/)
- [レスポンスヘッダー](https://developers.cloudflare.com/pages/configuration/headers/)
