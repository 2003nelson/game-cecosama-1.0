// Variables de estado del juego
let currentQuestionIndex = 0;
let score = 0;
let isProcessingAnswer = false; // Bandera para evitar clics múltiples

document.addEventListener('DOMContentLoaded', () => {
    const loadingIntro = document.getElementById('loading-screen');
    const mainMenu = document.getElementById('main-menu');
    const playButton = document.getElementById('play-button');
    const gameContainer = document.getElementById('game-container');
    
    // Obtener el elemento del spinner de la intro
    const spinnerIntro = document.querySelector('#loading-screen .spinner');

    // Crea el overlay de carga que se usará en el juego
    const loadingOverlay = document.createElement('div');
    loadingOverlay.id = 'loading-overlay';
    loadingOverlay.classList.add('hidden');
    // Usaremos la clase 'spinner-intro-repeat' para la animación de 3s
    loadingOverlay.innerHTML = '<div class="spinner spinner-intro-repeat">😊</div>';
    document.body.appendChild(loadingOverlay);


    // --- 1. Flujo de la Pantalla de Carga Inicial (CORRECCIÓN FINAL) ---
    loadingIntro.classList.remove('hidden');
    
    setTimeout(() => {
        // CORRECCIÓN: Usamos solo la transición de opacidad para ocultar la pantalla completa
        loadingIntro.style.opacity = '0'; 

        // Ocultamos completamente después de que la transición (0.5s) termine
        setTimeout(() => {
            loadingIntro.classList.add('hidden');
            loadingIntro.style.display = 'none'; // Aseguramos que desaparece del flujo
            mainMenu.classList.remove('hidden');
        }, 500); 

    }, 3000); // 3000ms: Duración total de la animación de intro

    // --- 2. Iniciar el Juego al hacer clic en 'Comenzar' ---
    playButton.addEventListener('click', () => {
        // Oculta el menú principal y muestra el contenedor de juego
        mainMenu.classList.add('hidden');
        gameContainer.classList.remove('hidden');
        
        // Iniciar el ciclo de preguntas con la primera
        // Usaremos 3000ms de transición de intro para la transición
        loadQuestion(currentQuestionIndex, 3000); 
    });

    // --- 3. Funciones de Lógica del Juego ---
    
    /** Carga y renderiza la pregunta actual */
    function loadQuestion(index, transitionDuration = 800) {
        // Muestra la carga con la duración especificada
        showLoading(true, transitionDuration);

        // El tiempo de espera incluye la duración de la animación de carga
        setTimeout(() => {
            showLoading(false);
            
            // Comprobación de fin del juego
            if (index >= gameQuestions.length) {
                // Si ya no hay preguntas, termina el juego
                gameContainer.innerHTML = `<h2>🎉 ¡Felicidades! Juego Terminado. 🎉</h2><h3>Tu puntuación final es: ${score}/${gameQuestions.length}</h3>`;
                return;
            }

            const questionData = gameQuestions[index];
            const card = document.getElementById('question-card');
            card.innerHTML = ''; // Limpiar la tarjeta
            isProcessingAnswer = false;

            // Renderizar basado en el tipo de pregunta
            if (questionData.type === 'multiple_choice') {
                renderMultipleChoice(card, questionData);
            } else if (questionData.type === 'dialog_fill') {
                // **PENDIENTE:** Aquí se implementará el diálogo
                card.innerHTML = `<div class="question-text">Tipo de pregunta Diálogo pendiente de implementación.</div>`;
                // Para que el flujo no se detenga:
                currentQuestionIndex++;
                setTimeout(() => loadQuestion(currentQuestionIndex), 1000);
            }
            // Aquí irían los otros tipos de preguntas (word_order)
            
        }, transitionDuration + 50); // Un pequeño margen
    }

    /** Muestra/Oculta el overlay de carga */
    function showLoading(show, duration) {
        const spinner = loadingOverlay.querySelector('.spinner');

        if (show) {
            // Reiniciar la animación forzando un repaint
            spinner.style.animation = 'none';
            spinner.offsetHeight; // Truco para forzar el repaint
            
            loadingOverlay.classList.remove('hidden');
            
            // Si la duración es 3000ms (la intro completa), aplicamos la animación de 3s
            if (duration === 3000) {
                spinner.classList.add('spinner-intro-repeat');
                spinner.classList.remove('spinner-spin-only');
            } else {
                // Animación de carga rápida (la que gira infinitamente)
                spinner.classList.add('spinner-spin-only'); 
                spinner.classList.remove('spinner-intro-repeat');
            }
        } else {
            // Detenemos cualquier animación al ocultar
            spinner.style.animation = 'none'; 
            loadingOverlay.classList.add('hidden');
        }
    }
    

    /** Muestra el mensaje de retroalimentación */
    function showFeedback(message, isCorrect) {
        const existingFeedback = document.querySelector('.feedback-message');
        if (existingFeedback) existingFeedback.remove();

        const feedback = document.createElement('div');
        feedback.classList.add('feedback-message', isCorrect ? 'feedback-success' : 'feedback-error');
        feedback.textContent = message;
        document.body.appendChild(feedback);

        // Muestra el mensaje
        setTimeout(() => {
            feedback.classList.add('show');
        }, 10);

        // Oculta y remueve el mensaje después de 2 segundos
        setTimeout(() => {
            feedback.classList.remove('show');
            setTimeout(() => feedback.remove(), 500);
        }, 2000);
    }

    /** Renderiza la interfaz para preguntas de Opción Múltiple (TIPO: multiple_choice) */
    function renderMultipleChoice(card, data) {
        const questionHtml = `<div class="question-text">${data.question}</div>`;
        const optionsHtml = data.options.map(option =>
            `<button class="option-button" data-answer="${option}">${option}</button>`
        ).join('');

        card.innerHTML = questionHtml + `<div class="options-container">${optionsHtml}</div>`;

        // Añadir listeners a los botones
        document.querySelectorAll('.option-button').forEach(button => {
            button.addEventListener('click', (e) => {
                checkAnswer(e.target.getAttribute('data-answer'), data);
            });
        });
    }

    /** Verifica la respuesta del usuario (Aplica para multiple_choice) */
    function checkAnswer(userAnswer, questionData) {
        if (isProcessingAnswer) return;
        isProcessingAnswer = true;

        const isCorrect = (userAnswer === questionData.correctAnswer);
        
        // Resaltar la opción seleccionada
        const buttons = document.querySelectorAll('.option-button');
        buttons.forEach(button => {
            button.disabled = true; // Deshabilita todos los botones
            if (button.getAttribute('data-answer') === userAnswer) {
                // Resalta la respuesta del usuario
                button.classList.add(isCorrect ? 'correct' : 'incorrect');
            } else if (button.getAttribute('data-answer') === questionData.correctAnswer && !isCorrect) {
                 // Si fue incorrecta, también resalta la correcta
                 button.classList.add('correct');
            }
        });

        if (isCorrect) {
            score++;
            showFeedback("¡Éxito! 🎉", true);
            currentQuestionIndex++;
            
            // Pasa a la siguiente pregunta después de un breve delay
            // Usaremos 800ms para la carga entre preguntas
            setTimeout(() => {
                loadQuestion(currentQuestionIndex, 800); 
            }, 2500); 

        } else {
            showFeedback("Respuesta incorrecta. 😔", false);
            
            // Recarga la misma pregunta después de un breve delay (Duolingo Style)
            setTimeout(() => {
                loadQuestion(currentQuestionIndex, 800); 
            }, 2500); 
        }
    }
});