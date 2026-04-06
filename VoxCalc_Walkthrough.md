# VoxCalc: Voice-Controlled Calculator System

Welcome to **VoxCalc**, a premium, voice-activated calculator designed with a sleek, modern glassmorphism aesthetic. This system allows you to perform mathematical operations using only your voice, providing an efficient and hands-free experience.

## 🚀 Getting Started

1.  **Open Chromium-based Browser**: Use Google Chrome, Microsoft Edge, or any browser that supports the Web Speech API.
2.  **Grant Microphone Permissions**: When prompted, allow the browser to access your microphone.
3.  **Tap the Microphone**: Click the microphone icon on the calculator to start listening.

## 🎙️ Supported Voice Commands

VoxCalc recognizes a wide range of natural language commands. Here are some examples:

### Basic Arithmetic
-   **Addition**: "five plus five" or "one hundred add fifty"
-   **Subtraction**: "ten minus three" or "twenty subtract five"
-   **Multiplication**: "six times eight" or "two into four" or "five multiplied by ten"
-   **Division**: "twelve divided by three" or "ten over two"

### Utility Commands
-   **Clear**: Say "clear" or "reset" to wipe the current expression and result.
-   **Decimals**: "five point five plus three"

## ✨ Key Features

-   **Premium Glassmorphism Design**: A deep indigo and purple theme with subtle blur effects and neon accents.
-   **High Accuracy Speech Recognition**: Leverages the Web Speech API for real-time transcription.
-   **Text-to-Speech (TTS)**: The calculator speaks the result back to you, ensuring you don't miss the answer.
-   **Hybrid Input**: Use the voice button for hands-free mode or the physical-style keypad for manual input.
-   **Micro-animations**: Pulse effects and smooth transitions enhance the user experience.

## ⚙️ How it Works

1.  **Voice to Text**: The browser captures your speech and converts it to text in real-time.
2.  **Mapping Logic**: Our custom logic maps words like "into" to `*`, "divided by" to `/`, and "plus" to `+`.
3.  **Expression Processing**: The system cleans the input to ensure only valid mathematical expressions are evaluated.
4.  **Instant Result**: The calculation is performed immediately, displayed on screen, and spoken aloud.

---

> [!TIP]
> For best results, speak clearly and pause briefly between numbers and operators. If you're in a noisy environment, you can always use the keypad to adjust the expression!

> [!IMPORTANT]
> The calculator uses `eval()` safely on processed strings. Ensure your browser is up to date for the best speech recognition performance.
