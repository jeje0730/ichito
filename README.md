# らぁ麺 いちと

滋賀県東近江市五個荘にある「らぁ麺 いちと」の紹介サイトです。
料理やお店のこだわりを伝え、来店前にお品書き・営業時間・アクセスを確認できるように制作しました。

## ページ構成

- **ホーム**（`ichito-site/index.html`）：お店の紹介、お品書きへの案内、営業案内、Instagramへのリンク。
- **お品書き**（`ichito-site/menu.html`）：らぁ麺・定食・単品料理と価格の紹介。
- **こだわり**（`ichito-site/commitment.html`）：麺・スープ・一杯へのこだわりや、お店の想いの紹介。
- **店舗案内**（`ichito-site/shop.html`）：住所・営業時間・定休日、Googleマップ、ご来店時の案内。
- **お問い合わせ**（`ichito-site/contact.html`）：メールフォーム、個人情報の取り扱い、Instagramへの案内。

## 見てほしいところ

料理の写真を大きく使い、「食べてみたい」「お店に行ってみたい」と感じてもらえる見せ方を目指しました。
ホームからお品書きや店舗案内へ移動しやすくし、来店に必要な情報を探せる構成にしています。

## 工夫した点

- 赤・黒・金を基調に、明朝体や余白を使って落ち着いた和の雰囲気を表現しました。
- 画面幅に応じてレイアウトを切り替え、スマートフォンでも読めるようにしています。
- スマートフォン向けのハンバーガーメニューは、背景やリンクのクリック、Escapeキーでも閉じられます。
- ページをスクロールすると、上部へ戻るボタンが表示されます。
- 共通スタイルとページ専用スタイルを分け、ページ間でデザインを統一しています。

## 使用技術

- HTML
- CSS（CSS変数・Grid・Flexbox・メディアクエリ）
- JavaScript（外部ライブラリなし）
- Googleマップの埋め込み

## ディレクトリ構成

```text
ichito-site/
├── index.html
├── menu.html
├── commitment.html
├── shop.html
├── css/
│   ├── common.css
│   ├── index.css
│   ├── menu.css
│   ├── commitment.css
│   └── shop.css
├── js/
│   └── main.js
└── images/
```

## 閲覧方法

`ichito-site/index.html`をブラウザで開いてください。
ビルドや依存パッケージのインストールは不要です。Googleマップの表示やInstagramの閲覧にはインターネット接続が必要です。

## お問い合わせフォームの有効化

独立した`contact.html`にフォームがあります。FormSubmitは接続できなかったため使用を中止し、FormspreeへのHTTPS POSTに切り替えました。2026-11-05、Formspreeの登録ページはHTTP 200を確認済みです。サービスへの接続確認と、フォームの送受信確認は別です。

1. https://formspree.io/register から、お店のメール（`ichito240808@gmail.com`）で登録し、認証メールで認証します。
2. 管理画面の「New Form」でフォームを作成し、受信先を確認します。
3. Integrationに表示される`https://formspree.io/f/フォームID`を`ichito-site/js/contact-config.js`の`endpoint`に設定します。未設定の間は送信できません。メールアドレスだけでは送信できません。パスワードやAPIキーはコードに記載しないでください。
4. 公開先またはローカルHTTPサーバーからフォームを開き、テスト送信します。画像認証が表示された場合は完了します。
5. 名前・返信先・本文が受信でき、返信先がお問い合わせした人になっていることを確認します。サービス側の受付表示だけで受信完了とは判断しないでください。

送信後はFormspree側の確認画面へ移動します。フォームには必須項目、文字数制限、同意欄、迷惑投稿対策用の`_gotcha`を設けています。ブラウザの検証は利便性のためのもので、送信先サービスの迷惑投稿対策と併用します。

フォームURL`https://formspree.io/f/mnppwowo`を設定済みです。2026-11-05、テスト送信はHTTP 200と`{"next":"/thanks","ok":true}`を返し、Formspreeでの受付を確認しました。Gmail側の実受信は所有者による確認待ちです。送信は外部サービスの稼働状況に依存します。

公式資料：[FormspreeのHTMLフォーム設定](https://help.formspree.io/articles/building-your-form/building-an-html-form)

## 関連リンク

- [らぁ麺 いちと Instagram](https://www.instagram.com/ramen_ichito/)
