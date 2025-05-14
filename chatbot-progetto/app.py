from flask import Flask, request, jsonify, render_template
import random

app = Flask(__name__)

general_responses = [
    "Ottima domanda! Ci sto pensando...",
    "Raccontami di più, sono curioso!",
    "Interessante... vuoi approfondire?",
    "Potremmo parlare a lungo di questo!",
    "Non ho una risposta precisa, ma posso aiutarti!"
]

topic_responses = {
    "cibo": [
        "Il cibo italiano è il migliore! Hai un piatto preferito?",
        "Adoro parlare di cucina. Dolce o salato?",
        "Pizza o pasta? Difficile scegliere!"
    ],
    "tecnologia": [
        "Parliamo di tecnologia! AI, machine learning, o web?",
        "Sono aggiornato sulle novità tech. Chiedimi pure!",
        "La programmazione è il futuro. Ti piace codare?"
    ],
    "sport": [
        "Ami lo sport? Calcio, basket o altro?",
        "Anche una passeggiata è ottimo esercizio!",
        "Segui qualche squadra in particolare?"
    ],
    "saluto": [
        "Ciao! Come posso aiutarti oggi?",
        "Ehi! Sono qui per te!",
        "Benvenuto! Parliamo di qualcosa?"
    ]
}

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    user_message = request.json.get("message", "").lower()

    # Semplice classificazione per parole chiave
    if any(word in user_message for word in ["ciao", "salve", "ehi"]):
        response = random.choice(topic_responses["saluto"])
    elif any(word in user_message for word in ["cibo", "mangiare", "ristorante", "pasta", "pizza"]):
        response = random.choice(topic_responses["cibo"])
    elif any(word in user_message for word in ["tech", "computer", "programmare", "ai", "machine learning"]):
        response = random.choice(topic_responses["tecnologia"])
    elif any(word in user_message for word in ["sport", "calcio", "basket", "palestra"]):
        response = random.choice(topic_responses["sport"])
    else:
        response = random.choice(general_responses)

    return jsonify({"response": response})

if __name__ == "__main__":
    app.run(debug=True)
