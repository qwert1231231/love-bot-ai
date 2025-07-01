async function send() {
  const inputBox = document.getElementById("userInput");
  const chatBox = document.getElementById("chat");
  const userText = inputBox.value.trim();
  if (userText === "") return;

  // Show user message
  chatBox.innerHTML += `<p class="user">You: ${userText}</p>`;

  // Clear input
  inputBox.value = "";

  // Show a loading message while waiting
  chatBox.innerHTML += `<p class="ai">AI: ...thinking...</p>`;
  chatBox.scrollTop = chatBox.scrollHeight;

  // Call OpenAI API
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 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"  // <-- Put your API key here
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",  // or "gpt-4", "gpt-3.5-turbo"
        messages: [
          { role: "system", content: "You are a romantic chatbot." },
          { role: "user", content: userText }
        ],
        max_tokens: 100,
        temperature: 0.7
      })
    });

    const data = await response.json();

    // Remove the '...thinking...' message
    chatBox.querySelector("p.ai:last-child").remove();

    // Show AI reply
    const aiReply = data.choices[0].message.content;
    chatBox.innerHTML += `<p class="ai">AI: ${aiReply}</p>`;
    chatBox.scrollTop = chatBox.scrollHeight;

  } catch (error) {
    // Remove the '...thinking...' message
    chatBox.querySelector("p.ai:last-child").remove();

    chatBox.innerHTML += `<p class="ai">AI: Sorry, I’m having trouble connecting right now.</p>`;
    chatBox.scrollTop = chatBox.scrollHeight;
    console.error(error);
  }
}
