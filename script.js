const chatContainer = document.getElementById("chat-container");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

// Your OpenAI API key here — keep it secret in production!
const OPENAI_API_KEY = "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";

// Store the conversation history for context
let conversation = [
  {
    role: "system",
    content: "You are a romantic, kind, intelligent AI chatbot that talks naturally and warmly."
  }
];

// Add a message to chat
function appendMessage(text, sender) {
  const div = document.createElement("div");
  div.className = "message " + sender;
  div.textContent = text;
  chatContainer.appendChild(div);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Send message to OpenAI and get a response
async function send(event) {
  event.preventDefault();

  const userText = userInput.value.trim();
  if (!userText) return;

  appendMessage(userText, "user");
  conversation.push({ role: "user", content: userText });
  userInput.value = "";
  sendBtn.disabled = true;

  // Show typing indicator
  const typingMessage = document.createElement("div");
  typingMessage.className = "message ai";
  typingMessage.textContent = "AI is typing...";
  chatContainer.appendChild(typingMessage);
  chatContainer.scrollTop = chatContainer.scrollHeight;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: conversation,
        temperature: 0.7,
        max_tokens: 250,
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const aiText = data.choices[0].message.content;

    // Remove typing indicator
    typingMessage.remove();

    appendMessage(aiText, "ai");
    conversation.push({ role: "assistant", content: aiText });
  } catch (error) {
    typingMessage.textContent = "Oops! Something went wrong.";
    console.error(error);
  }

  sendBtn.disabled = false;
  userInput.focus();
}
