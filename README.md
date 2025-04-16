# ✏️ Sentence Construction Tool

## 📌 Project Overview

The **Sentence Construction Tool** is an interactive React-based web application that helps users learn sentence structure by filling in the blanks with provided word options. It uses the power of **Google Gemini AI** to generate smart, contextual hints for each question—helping users think critically without giving away the answer.

<br>

## 🚀 Live Project

Check out the live demo: [Sentence Construction Tool](https://your-live-demo-link.netlify.app/)

<br>

## 🎯 Features

- ✍️ **Fill-in-the-Blank Questions** – Sentences with one or multiple blanks and word options.
- 💡 **AI-Powered Hints** – Contextual hints generated via the Gemini API.
- 🔄 **Dynamic Hint Generation** – Each question gets a unique, relevant hint.
- 👆 **User-Friendly UI** – Clean and responsive interface for seamless interaction.
- 🧠 **Grammar-Aware Guidance** – Hints encourage understanding of sentence flow, grammar, and tone without revealing the answer.
- 📊 Score tracking and answer validation
- ✅ Highlight correct/incorrect answers

<br>

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS
- **AI Integration:** Gemini API (Google AI)
- **JSON Server:** For Mock Backend
- **Other:** Vite, JavaScript, HTML, CSS

<br>

## 🚀 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/amehtacc/Sentence-Construction-Tool.git
cd Sentence-Construction-Tool
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Set Up Environment Variables

```bash
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### 4️⃣ Set Up JSON Server (for Mock Backend)

Install json-server

```bash
npm install -g json-server
```

Run the server

```bash
json-server --watch question_data.json --port 3001
```

### 5️⃣ Start the Development Server

```bash
npm run dev

```

<br>

## 📝 Usage Instructions
1. Read the sentence and identify the blanks.
2. Use the provided word options to fill the blanks.
3. If stuck, click the "Need a Hint?" button.
4. A short AI-generated hint will guide your thinking without giving the answer.
5. Move to the next question to continue practicing.

<br>

## 🔥 Future Enhancements
- ✅ Improve hint variation and context awareness
- ✅ Add difficulty levels (Beginner, Intermediate, Advanced)

<br>

## 🏆 Credits
Developed by **Aryan Mehta** 🚀

<br>

## 🌐 Contact Information
Build with ❤️ by [Aryan Mehta](https://aryanmehta.netlify.app/) - feel free to contact me!
