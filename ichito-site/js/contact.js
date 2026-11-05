(() => {
    const form = document.querySelector("#contact-form");
    if (!form) return;
    const fields = document.querySelector("#contact-fields");
    const status = document.querySelector("#contact-status");
    const button = form.querySelector("button[type=submit]");
    const endpoint = (window.ICHITO_CONTACT?.endpoint || "").trim();
    const configured = /^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(endpoint);
    let submitting = false;

    if (configured) {
        form.action = endpoint;
        fields.disabled = false;
        status.textContent = "送信後、外部サービスの確認画面へ移動します。画面の案内に沿って送信を完了してください。";
    }

    form.addEventListener("submit", (event) => {
        if (!configured || submitting) {
            event.preventDefault();
            return;
        }
        const name = form.elements.namedItem("name");
        const message = form.elements.namedItem("message");
        name.value = name.value.trim();
        message.value = message.value.trim();
        if (!form.reportValidity()) {
            event.preventDefault();
            return;
        }
        submitting = true;
        button.disabled = true;
        button.textContent = "送信画面に移動しています…";
        status.textContent = "まだ送信は完了していません。移動先の画面で送信結果をご確認ください。";
        // 通常のHTTPS POSTで送信。成功表示は送信サービスの応答に任せる。
    });

    window.addEventListener("pageshow", (event) => {
        submitting = false;
        button.disabled = false;
        button.textContent = "お問い合わせを送信する";
        if (configured && event.persisted) status.textContent = "送信結果が不明な場合は、重複送信を避けるため少し待ってからご確認ください。";
    });
})();
