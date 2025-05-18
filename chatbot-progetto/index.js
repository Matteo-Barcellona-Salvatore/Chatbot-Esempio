const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const knowledgeBase = [
    {
        keywords: ["ciao", "salve", "hey", "buongiorno"],
        answers: [
            "Ciao! Come posso esserti utile oggi?",
            "Ehilà! Come posso aiutarti?",
            "Ciao! È un piacere parlarti!"
        ]
    },
    {
        keywords: ["come stai", "come va", "tutto bene", "come te la passi", "come ti senti", "stai bene"],
        answers: [
            "Sto benissimo, grazie! Come stai tu?",
            "Tutto bene, grazie per chiedere! E tu?",
            "Mi sento alla grande! Come va da te?"
        ]
    },
    {
        keywords: ["come ti chiami", "chi sei", "chi sei tu"],
        answers: [
            "Sono ChatBot, un assistente virtuale. Sono qui per aiutarti!",
            "Mi chiamo ChatBot, il tuo assistente sempre disponibile!"
        ]
    },
    {
        keywords: ["diventiamo amici", "siamo amici", "amici", "essere amici"],
        answers: [
            "Certo! Siamo già amici virtuali. Come posso esserti utile?",
            "Un amico virtuale è sempre pronto ad aiutarti. Cosa posso fare per te?"
        ]
    },
    {
        keywords: ["machine learning", "cos'è il machine learning", "intelligenza artificiale", "AI", "apprendimento automatico"],
        answers: [
            "Il Machine Learning è un campo dell'Intelligenza Artificiale che consente ai sistemi di apprendere dai dati.",
            "Il ML è un modo per insegnare ai computer a imparare da sé, proprio come facciamo noi!"
        ]
    },
    {
        keywords: ["linguaggi", "programmi", "tecnologie", "conosci", "linguaggi di programmazione"],
        answers: [
            "Conosco molti linguaggi come JavaScript, Python, Java, HTML, CSS... Chiedimi pure!",
            "Sono esperto in diverse tecnologie! Vuoi sapere qualcosa in particolare?"
        ]
    },
    {
        keywords: ["cibo", "parli di cucina", "ricette", "mangiare"],
        answers: [
            "Mmm... adoro parlare di cucina! Pizza, pasta, tiramisù... qual è il tuo piatto preferito?",
            "Il cibo è sempre un ottimo argomento! Qual è il tuo piatto preferito?"
        ]
    },
    {
        keywords: ["javascript", "js", "js programming", "javascript coding"],
        answers: [
            "JavaScript è uno dei linguaggi più versatili e potenti per creare siti dinamici.",
            "JS è il cuore dell'interattività nel web. Cosa vuoi sapere su JavaScript?"
        ]
    },
    {
        keywords: ["html", "css", "web design", "markup", "style sheets"],
        answers: [
            "HTML è la struttura di base di una pagina web, mentre CSS ne definisce lo stile e la bellezza.",
            "HTML e CSS sono i fondamenti di qualsiasi sito web. Hai bisogno di aiuto con questi?"
        ]
    },
    {
        keywords: ["grazie", "sei bravo", "gentile", "ti ringrazio", "bene"],
        answers: [
            "Grazie! Sono felice di esserti utile. Se hai altre domande, sono qui!",
            "Molto gentile da parte tua! Spero di esserti stato utile."
        ]
    },
    {
        keywords: ["cos'è java", "java", "linguaggio java", "programmare in java", "linguaggio di programmazione java"],
        answers: [
            "Java è un linguaggio di programmazione orientato agli oggetti, noto per la sua portabilità grazie alla filosofia 'scrivi una volta, esegui ovunque'. È utilizzato per sviluppare applicazioni mobili, web, desktop e sistemi embedded.",
            "Java è uno dei linguaggi di programmazione più popolari e versatili. È utilizzato in una vasta gamma di applicazioni, da sistemi bancari a giochi per dispositivi mobili.",
            "Java è un linguaggio di programmazione robusto e sicuro, progettato per essere portatile e adattabile a diverse piattaforme.",
            "Ecco un esempio di codice Java che stampa 'Ciao, mondo!':\n\n" +
            "```java\n" +
            "public class Main {\n" +
            "    public static void main(String[] args) {\n" +
            "        System.out.println(\"Ciao, mondo!\");\n" +
            "    }\n" +
            "}\n" +
            "```\n\n" +
            "Questo è un programma di base che mostra come definire una classe e il metodo principale in Java, che è il punto di ingresso per l'esecuzione del programma.",

            "Ecco come dichiarare una variabile in Java e usarla per sommare due numeri:\n\n" +
            "```java\n" +
            "public class Main {\n" +
            "    public static void main(String[] args) {\n" +
            "        int a = 5;\n" +
            "        int b = 3;\n" +
            "        int somma = a + b;\n" +
            "        System.out.println(\"La somma di a e b è: \" + somma);\n" +
            "    }\n" +
            "}\n" +
            "```\n\n" +
            "Questo esempio mostra come dichiarare variabili intere, sommarle e stampare il risultato."
        ]
    },


    {
        keywords: [],
        answers: [
            "Hmm, non sono sicuro di aver capito. Puoi riformulare?",
            "Non sono sicuro di capire... puoi spiegarti meglio?",
            "Potresti essere un po' più chiaro? Sono qui per aiutarti!"
        ]
    }
];

function getResponse(input) {
    const cleanedInput = input.toLowerCase();

    for (const entry of knowledgeBase) {
        for (const keyword of entry.keywords) {
            if (cleanedInput.includes(keyword)) {
                // Risposta casuale
                const randomIndex = Math.floor(Math.random() * entry.answers.length);
                return entry.answers[randomIndex];
            }
        }
    }

    const defaultResponse = knowledgeBase[knowledgeBase.length - 1].answers;
    const randomIndex = Math.floor(Math.random() * defaultResponse.length);
    return defaultResponse[randomIndex];
}

function sendMessage() {
    const text = userInput.value.trim();
    if (text === "") return;

    addMessage(text, "user");
    userInput.value = "";

    setTimeout(() => {
        addMessage("Sta scrivendo...", "bot");

        setTimeout(() => {
            removeTypingIndicator();
            const response = getResponse(text);
            addMessage(response, "bot");
        }, 1000);
    }, 300);
}

function addMessage(text, sender) {
    const msg = document.createElement("div");
    msg.className = `message ${sender}`;
    msg.textContent = text;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function removeTypingIndicator() {
    const indicators = document.querySelectorAll(".bot");
    indicators.forEach(el => {
        if (el.textContent === "Sta scrivendo...") el.remove();
    });
}


userInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        sendMessage();
    }
});

document.getElementById("sendBtn").addEventListener("click", sendMessage);

document.getElementById("settingsBtn").addEventListener("click", () => {
    const menu = document.getElementById("settingsMenu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
});

document.getElementById("themeSelect").addEventListener("change", (e) => {
    document.body.classList.toggle("dark-theme", e.target.value === "dark");
    document.body.classList.toggle("light-theme", e.target.value === "light");
});

document.getElementById("saveHistoryBtn").addEventListener("click", () => {
    const historyText = chatHistory.join("\n");
    const blob = new Blob([historyText], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "chat_history.txt";
    link.click();
});

document.getElementById("downloadChatBtn").addEventListener("click", () => {
    const historyText = chatHistory.join("\n");
    const blob = new Blob([historyText], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "chat.txt";
    link.click();
});

userInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        sendMessage();
    }
});
