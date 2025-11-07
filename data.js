// data.js

const gameQuestions = [
    // ------------------------------------------------------------------
    // TIPO 1: Opción Múltiple (Simula "Selecciona la respuesta correcta")
    // Adaptado a: Identificar emociones o acciones saludables.
    // ------------------------------------------------------------------
    {
        id: 1,
        type: "multiple_choice",
        question: "¿Qué emoción sueles sentir al alcanzar una meta importante?",
        options: [
            "Tristeza",
            "Alegría",
            "Miedo",
            "Enojo"
        ],
        correctAnswer: "Alegría",
        explanation: "La alegría es la emoción natural al lograr algo que deseamos o valoramos."
    },

    // ------------------------------------------------------------------
    // TIPO 2: Completar Diálogo (Simula la vista de chat de Duolingo)
    // Adaptado a: Responder con habilidades sociales o rechazo asertivo.
    // ------------------------------------------------------------------
    {
        id: 2,
        type: "dialog_fill",
        speakerA: "Amigo/a",
        speakerB: "Tú",
        dialog: [
            { speaker: "Amigo/a", text: "¡Oye, vamos a esa fiesta! Dijeron que hay de todo para 'pasar un buen rato'." },
            { speaker: "Tú", text: "Gracias por invitar, pero prefiero no ir." },
            { speaker: "Amigo/a", text: "¿Por qué? ¡No seas aguafiestas!" },
            { speaker: "Tú", text: "[BLANCO]" } // El usuario debe completar con una opción
        ],
        options: [
            "Lo siento, es que tengo mucha tarea. (Excusa)",
            "No, porque si voy, voy a caer mal. (Baja autoestima)",
            "Prefiero evitar lugares con esas tentaciones. Si quieres, vamos al cine. (Rechazo asertivo y alternativa)",
            "¡Qué aburrido, no tienes otro plan?"
        ],
        correctAnswer: "Prefiero evitar lugares con esas tentaciones. Si quieres, vamos al cine. (Rechazo asertivo y alternativa)",
        explanation: "El rechazo asertivo implica decir 'no' firmemente, explicar brevemente la razón (si se desea) y ofrecer una alternativa."
    },

    // ------------------------------------------------------------------
    // TIPO 3: Ordenar Palabras (Simula "Traduce la frase")
    // Adaptado a: Construir mensajes de autocuidado o apoyo.
    // ------------------------------------------------------------------
    {
        id: 3,
        type: "word_order",
        words: ["mis", "escucho", "es", "cuerpo", "importante", "lo", "que"],
        correctSentence: "Es importante que escucho lo que mis cuerpo", //Nota: se puede modificar el texto para que haga sentido
        correctOrder: [4, 6, 1, 5, 7, 0, 3, 2], // Índices de las palabras para formar la frase
        explanation: "La autoconciencia y escuchar las señales de tu cuerpo son esenciales para el autocuidado."
    }
];