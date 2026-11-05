(() => {
    const form = document.querySelector("#contact-form");
    if (!form) return;
    const fields = document.querySelector("#contact-fields");
    const status = document.querySelector("#contact-status");
    const button = form.querySelector("button[type=submit]");
    const confirmation = document.querySelector("#contact-confirmation");
    const sendButton = document.querySelector("#contact-send");
    const editButton = document.querySelector("#contact-edit");
    const inputNames = ["name", "email", "message", "reply"];
    const input = (name) => form.elements.namedItem(name);
    let reviewing = false;
    const endpoint = (window.ICHITO_CONTACT?.endpoint || "").trim();
    const configured = /^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(endpoint);
    let submitting = false;

    if (configured) {
        form.action = endpoint;
        fields.disabled = false;
        status.textContent = "入力後、確認画面で内容をご確認いただいてから送信できます。";
    }

    const showInput = () => {
        reviewing = false;
        fields.hidden = false;
        confirmation.hidden = true;
        sendButton.disabled = true;
        status.textContent = "内容を修正し、もう一度「入力内容を確認する」を押してください。";
        input("name").focus();
    };
    editButton.addEventListener("click", showInput);

    form.addEventListener("submit", (event) => {
        if (!configured || submitting) {
            event.preventDefault();
            return;
        }
        ["name", "email", "message"].forEach((name) => { input(name).value = input(name).value.trim(); });
        // 非表示の入力欄で検証エラーが起きた場合は、入力画面へ戻す。
        if (!form.checkValidity()) {
            event.preventDefault();
            if (reviewing) showInput();
            form.reportValidity();
            return;
        }
        if (!reviewing || event.submitter !== sendButton) {
            event.preventDefault();
            inputNames.forEach((name) => {
                document.querySelector(`#contact-review-${name}`).textContent = input(name).value;
            });
            reviewing = true;
            fields.hidden = true;
            confirmation.hidden = false;
            sendButton.disabled = false;
            status.textContent = "まだ送信されていません。内容をご確認のうえ「この内容で送信する」を押してください。";
            document.querySelector("#contact-confirmation-heading").focus();
            return;
        }
        submitting = true;
        sendButton.disabled = true;
        editButton.disabled = true;
        sendButton.textContent = "送信画面に移動しています…";
        status.textContent = "まだ送信は完了していません。移動先の画面で送信結果をご確認ください。";
        // 通常のHTTPS POSTで送信。成功表示は送信サービスの応答に任せる。
    });

    window.addEventListener("pageshow", (event) => {
        submitting = false;
        button.disabled = false;
        editButton.disabled = false;
        sendButton.disabled = !configured || !reviewing;
        sendButton.textContent = "この内容で送信する";
        if (configured && event.persisted) status.textContent = "送信結果が不明な場合は、重複送信を避けるため少し待ってからご確認ください。";
    });
})();
