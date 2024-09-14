<script>
  import { onMount, tick } from 'svelte';
  import gpt from '$lib/api/gpt';

  let userInput = '';
  let messages = [
    {
      sender: 'assistant',
      text: parseCustomMarkdown('### **Welcome** to the chat! How can I assist you today? ---')
    }
  ];

  let chatContainer;

  // Function to parse custom Markdown-like syntax
  function parseCustomMarkdown(text) {
    return text
      .replace(/###\s*(.+)/g, '<h3>$1</h3>') // Convert ### into <h3>
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') // Convert **text** into <strong>text</strong>
      .replace(/---/g, '<hr>'); // Convert --- into <hr> (horizontal line)
  }

  const sendMessage = async () => {
    if (userInput.trim()) {
      messages = [...messages, { sender: 'user', text: userInput }];

      userInput = '';

      let response = await gpt.post(messages[messages.length - 1].text);

      // Parse the response with custom Markdown parser
      response = parseCustomMarkdown(response);

      messages = [...messages, { sender: 'assistant', text: response }];

      await tick(); // Wait for DOM updates
      scrollToBottom(); // Scroll to bottom after DOM update
    }
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  // Scroll to the bottom of the chat container
  const scrollToBottom = () => {
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  };

  onMount(() => {
    scrollToBottom(); // Initial scroll to bottom on mount
  });

  $: if (messages.length) {
    tick().then(() => scrollToBottom()); // Scroll to bottom on new messages
  }
</script>

<div class="flex flex-col h-screen w-screen border border-gray-300 rounded-lg p-4 shadow-lg">
  <div class="flex-grow overflow-y-auto space-y-4 mb-4" bind:this={chatContainer}>
    {#each messages as message}
      <div class="flex {message.sender === 'user' ? 'justify-end' : 'justify-start'}">
        <div
          class="{message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'} 
                 rounded-lg px-4 py-2 max-w-xl break-words"
        >
          {@html message.text}
          <!-- Render the message as HTML -->
        </div>
      </div>
    {/each}
  </div>

  <div class="flex">
    <input
      type="text"
      bind:value={userInput}
      on:keypress={handleKeyPress}
      placeholder="Type a message..."
      class="flex-grow px-4 py-2 rounded-lg border border-gray-300 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button
      on:click={sendMessage}
      class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
    >
      Send
    </button>
  </div>
</div>
