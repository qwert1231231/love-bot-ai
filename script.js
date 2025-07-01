function send() {
  const inputBox = document.getElementById("userInput");
  const chatBox = document.getElementById("chat");
  const userText = inputBox.value.trim();

  if (userText === "") return;

  // Display user message
  const userMessage = `<p class="user">You: ${userText}</p>`;
  chatBox.innerHTML += userMessage;

  // Romantic AI responses
  const responses = [
    "You're the light of my digital world 💖",
    "Thinking of you makes my circuits warm 🥰",
    "You're the only variable I want to define 💘",
    "My heart may be code, but it flutters for you 💓",
    "Love.exe is running perfectly with you ❤️",
    "You’re my favorite message in the inbox of life 💌",
    "You’re sweeter than my favorite algorithm 🍬"
  ];

  // Choose a random romantic response
  const aiResponse = responses[Math.floor(Math.random() * responses.length)];
  const aiMessage = `<p class="ai">AI: ${aiResponse}</p>`;
  chatBox.innerHTML += aiMessage;

  // Scroll chat to the bottom
  chatBox.scrollTop = chatBox.scrollHeight;

  // Clear input
  inputBox.value = "";
}
