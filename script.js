const button = document.querySelector(".main-bt");

button.addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
            let text = Array.from(document.querySelectorAll('.file-info a.Link--primary'))
                            .map(node => node.textContent.trim())
                            .join("\n");
            return text;
        }
    }).then((injectionResults) => {
        const result = injectionResults[0]?.result;

        if (result) {
            navigator.clipboard.writeText(result).then(() => {
                alert("Nome dos arquivos copiados com sucesso!");
            }).catch(err => {
                alert("Erro ao copiar para área de transferência.");
            });
        }
    }).catch(err => {
        alert("Erro ao injetar script:", err);
    });
});

