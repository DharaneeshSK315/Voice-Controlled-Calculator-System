/**
 * VoxCalc - Voice Controlled Calculator Logic
 */

class VoxCalc {
    constructor() {
        this.expression = '';
        this.result = '0';
        this.isListening = false;
        
        // DOM Elements
        this.exprElem = document.getElementById('expression');
        this.resultElem = document.getElementById('result');
        this.voiceBtn = document.getElementById('voice-btn');
        this.statusText = document.getElementById('status');
        this.keys = document.querySelectorAll('.key');

        // Recognition Setup
        this.initializeSpeechRecognition();
        this.setupEventListeners();
    }

    initializeSpeechRecognition() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            this.statusText.innerText = "Speech Recognition not supported in this browser.";
            this.voiceBtn.style.display = "none";
            return;
        }

        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false; // Stop after one command
        this.recognition.interimResults = true;
        this.recognition.lang = 'en-US';

        this.recognition.onstart = () => {
            this.isListening = true;
            this.voiceBtn.classList.add('listening');
            this.statusText.innerText = "Listening...";
            this.statusText.classList.add('active');
        };

        this.recognition.onresult = (event) => {
            const transcript = Array.from(event.results)
                .map(result => result[0].transcript)
                .join('')
                .toLowerCase();

            this.processSpeech(transcript);
            
            if (event.results[0].isFinal) {
                this.calculateFromSpeech(transcript);
            }
        };

        this.recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            this.stopListening();
            this.statusText.innerText = `Error: ${event.error}`;
        };

        this.recognition.onend = () => {
            this.stopListening();
        };
    }

    stopListening() {
        this.isListening = false;
        this.voiceBtn.classList.remove('listening');
        this.statusText.classList.remove('active');
        this.statusText.innerText = "Tap the mic to start";
    }

    toggleListening() {
        if (this.isListening) {
            this.recognition.stop();
        } else {
            this.recognition.start();
        }
    }

    processSpeech(transcript) {
        // Show interim transcript in the expression row
        this.exprElem.innerText = transcript;
    }

    calculateFromSpeech(transcript) {
        // Core Mapping Logic
        let processed = transcript;
        
        // Numbers mapping
        const wordsToNums = {
            'zero': '0', 'one': '1', 'two': '2', 'three': '3', 'four': '4',
            'five': '5', 'six': '6', 'seven': '7', 'eight': '8', 'nine': '9', 'ten': '10'
        };

        // Operations mapping
        const wordsToOps = {
            'plus': '+', 'add': '+',
            'minus': '-', 'subtract': '-', 'less': '-',
            'times': '*', 'into': '*', 'multiplied by': '*', 'multiply': '*',
            'divided by': '/', 'divide': '/', 'over': '/'
        };

        // Commands
        if (transcript.includes('clear') || transcript.includes('reset')) {
            this.clear();
            this.speak("Cleared");
            return;
        }

        // Replace words with symbols
        Object.entries(wordsToNums).forEach(([word, num]) => {
            const reg = new RegExp(`\\b${word}\\b`, 'g');
            processed = processed.replace(reg, num);
        });

        Object.entries(wordsToOps).forEach(([word, op]) => {
            processed = processed.replace(word, op);
        });

        // Clean up expression (remove non-math characters)
        // Keep digits, basic operators (+ - * / . ^ %)
        processed = processed.replace(/[^0-9+\-*/.%]/g, '');

        if (processed) {
            this.expression = processed;
            this.exprElem.innerText = this.formatExpression(processed);
            this.calculate();
        } else {
            this.statusText.innerText = "Didn't catch that correctly...";
        }
    }

    formatExpression(expr) {
        return expr.replace(/\*/g, '×').replace(/\//g, '÷');
    }

    calculate() {
        try {
            // Basic safety check for expression
            if (!this.expression) return;
            
            // eval is okay here for a controlled internal calculator app, 
            // but in production, we might use a dedicated math parser like mathjs
            const resultValue = eval(this.expression);
            
            // Format result
            this.result = Number.isInteger(resultValue) ? 
                resultValue.toString() : 
                parseFloat(resultValue.toFixed(4)).toString();
            
            this.updateDisplay();
            this.speak(`The result is ${this.result}`);
        } catch (err) {
            console.error("Calculation Error:", err);
            this.result = "Error";
            this.updateDisplay();
        }
    }

    updateDisplay() {
        this.resultElem.innerText = this.result;
    }

    clear() {
        this.expression = '';
        this.result = '0';
        this.exprElem.innerText = 'Ready to listen...';
        this.updateDisplay();
    }

    speak(text) {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 1;
            utterance.pitch = 1;
            utterance.volume = 0.8;
            window.speechSynthesis.speak(utterance);
        }
    }

    setupEventListeners() {
        // Voice Button
        this.voiceBtn.addEventListener('click', () => this.toggleListening());

        // Keypad buttons
        this.keys.forEach(key => {
            key.addEventListener('click', () => {
                const val = key.getAttribute('data-val');
                const command = key.getAttribute('data-command');

                if (command === 'clear') {
                    this.clear();
                } else if (command === 'calculate') {
                    this.calculate();
                } else if (val) {
                    if (this.result !== '0' && this.expression === '') {
                        // After a result, start new if digit pressed
                        if (!['+', '-', '*', '/'].includes(val)) {
                            this.expression = '';
                            this.result = '0';
                        } else {
                            // If operator pressed, continue from result
                            this.expression = this.result;
                        }
                    }
                    this.expression += val;
                    this.exprElem.innerText = this.formatExpression(this.expression);
                }
            });
        });
    }
}

// Initialize the app
window.addEventListener('DOMContentLoaded', () => {
    const app = new VoxCalc();
});
