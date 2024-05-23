<template>
    <div>
      <!-- Chat Box Component -->
      <div v-if="showChat || !chatClosed" :class="{ 'enlarged': isEnlarged }" id="chat-popup">
        <div class="header">
          <span>Chat Box</span>
          <button @click="toggleEnlarged" class="enlarge-btn">{{ isEnlarged ? '-' : '+' }}</button>
        </div>
        <div class="content">
          <!-- Chat History -->
          <div v-if="chatHistory.length > 0" class="chat-history">
            <p><strong>Chat History:</strong></p>
            <ul>
              <li v-for="(message, index) in chatHistory" :key="index" :class="{ 'user-message': message.fromUser, 'bot-message': !message.fromUser }">
                <span v-if="message.fromUser">You:</span>
                <span v-else>Elysium Bot:</span>
                {{ message.content }}
              </li>
            </ul>
          </div>
          <!-- User Input -->
          <div class="user-input">
            <input v-model="userMessage" @keyup.enter="sendMessage" type="text" placeholder="Type your message...">
            <button @click="sendMessage">Send</button>
          </div>
          <template v-if="selectedInterest === ''">
            <p>Please select your interest:</p>
            <div>
              <button @click="generateRandomRecommendation" class="navy-button">Fragrance Recommendation</button>
            </div>
          </template>
          <template v-else>
            <!-- Fragrance Recommendation content -->
            <template v-if="selectedInterest === 'Fragrance Recommendation'">
              <p>What Kind Of Scent Are You Looking For? Pick One Of The Options Below To Reveal Your Next Scent:</p>
              <p>{{ recommendedScent }}</p>
              <button @click="selectInterest('Autumn')" class="light-blue-button">Autumn</button>
              <button @click="selectInterest('Winter')" class="light-blue-button">Winter</button>
              <button @click="selectInterest('Spring')" class="light-blue-button">Spring</button>
              <button @click="selectInterest('Summer')" class="light-blue-button">Summer</button>
            </template>
            <!-- Other interest contents -->
            <!-- Your existing interest contents -->
          </template>
        </div>
        <span class="close-btn" @click="closeChat">✕</span>
      </div>
      <!-- Button to reopen chat -->
      <button v-if="chatClosed" @click="reopenChat">Open Chat</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        showChat: true,
        chatClosed: false, // Track if chat is closed
        selectedInterest: '',
        isEnlarged: false,
        recommendedScent: '',
        chatHistory: [], // Store chat history
        userMessage: '' // Store user input message
      };
    },
    methods: {
      closeChat() {
        this.showChat = false;
        this.chatClosed = true; // Chat is closed
      },
      reopenChat() {
        this.showChat = true;
        this.chatClosed = false; // Chat is reopened
      },
      toggleEnlarged() {
        this.isEnlarged = !this.isEnlarged;
      },
      selectInterest(interest) {
        if (interest === 'Fragrance Recommendation') {
          this.generateRandomRecommendation();
        } else {
          const options = {
            'Autumn': ['1819 Revolution', '1819', 'Milano', 'Obscene Obsession','Only Hour'],
            'Winter': ['Stars et Oud', "Nuit d'orleans", 'Marseille',"Lust's Delight",'Noir Francios','After Hours','Blue Moon','Imperial Orchid','Twilight Princess'],
            'Spring': ["Lion's Heart", "Love's Golden Hour", 'Brooklyn', 'Flowers In Japan'],
            'Summer': ['Atmospheric Diamond', 'Pineapple Glacier', "Desire's Dream","Fifth Avenue",'Algerian Dunes']
          };
          const randomIndex = Math.floor(Math.random() * options[interest].length);
          this.recommendedScent = options[interest][randomIndex];
          this.selectedInterest = 'Fragrance Recommendation';
          this.addToChatHistory(`Selected ${interest} fragrance`);
        }
      },
      generateRandomRecommendation() {
        const scents = ['Stars et Oud', 'Lusts Delight', 'Flowers In Japan', 'Blue Moon', 'Milano','1819', '1819 Revolution', 'Pineapple Glacier'];
        const randomIndex = Math.floor(Math.random() * scents.length);
        this.recommendedScent = scents[randomIndex];
        this.selectedInterest = 'Fragrance Recommendation';
        this.addToChatHistory('Generated random fragrance recommendation');
      },
      addToChatHistory(message, fromUser = false) {
        this.chatHistory.push({ content: message, fromUser }); // Add message to chat history
      },
      sendMessage() {
        if (this.userMessage.trim() !== '') {
          // Add user message to chat history
          this.addToChatHistory(this.userMessage, true);
          
          // Handle user input and generate chatbot response
          this.handleUserInput(this.userMessage.toLowerCase().trim());
          
          // Clear input field after sending message
          this.userMessage = ''; 
        }
      },
      handleUserInput(message) {
        // Simple logic for chatbot response
        if (message === 'hi' || message === 'hello'|| message === 'help') {
        const reply = "Hi! Welcome to Elysium Bot. How can I assist you today?";
        this.addToChatHistory(reply);
      } else {
        // Handle other user inputs here
      }
    }
  }
};
</script>

<style scoped>
/* Chat Box Styles */
#chat-popup {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 350px; /* Adjusted width for the chat box */
  background-color: #333; /* Dark gray background */
  border: 1px solid #555; /* Dark gray border */
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  z-index: 9998;
  transition: all 0.3s ease;
}

#chat-popup.enlarged {
  width: 80%; /* Adjusted width for enlarged state */
  height: 80vh; /* Adjusted height for enlarged state */
  top: 50%; /* Center vertically */
  left: 50%; /* Center horizontally */
  transform: translate(-50%, -50%); /* Center vertically and horizontally */
}

#chat-popup .header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: #555; /* Dark gray header */
  color: #fff; /* White text */
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

#chat-popup .content {
  padding: 20px;
  max-height: 60vh; /* Adjusted maximum height */
  overflow-y: auto; /* Add scroll bar when content exceeds maximum height */
}

#chat-popup .close-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
  font-size: 20px;
  color: #ddd; /* Light gray text */
}

#chat-popup button {
  margin: 5px;
  padding: 10px 20px; /* Adjusted padding */
  font-size: 16px;
  background-color: #007bff; /* Blue buttons */
  color: #fff;
  border: none;
  border-radius: 5px; /* Rounded button */
  cursor: pointer;
}

/* Hover effect for buttons */
#chat-popup button:hover {
  background-color: #0056b3; /* Darker blue on hover */
}

/* Styling for chat history */
#chat-popup .content .chat-history {
  margin-bottom: 10px;
}

#chat-popup .content ul {
  list-style-type: none;
  padding: 0;
}

#chat-popup .content ul li {
  margin-bottom: 5px;
  color: #ddd; /* Light gray text */
}

/* User input field */
#chat-popup .content .user-input {
  margin-top: 10px;
}

#chat-popup .content .user-input input {
  width: calc(100% - 80px); /* Adjusted input width */
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
}

#chat-popup .content .user-input button {
  padding: 10px 20px; /* Adjusted padding */
  font-size: 16px;
  background-color: #007bff; /* Blue buttons */
  color: #fff;
  border: none;
  border-radius: 5px; /* Rounded button */
  cursor: pointer;
}

#chat-popup .content .user-input button:hover {
  background-color: #0056b3; /* Darker blue on hover */
}

/* Enlarge button */
#chat-popup .header .enlarge-btn {
  font-size: 16px;
  background-color: #f71c04; /* Blue buttons */
  color: #fff;
  border: none;
  border-radius: 5px; /* Rounded button */
  cursor: pointer;
  padding: 5px 10px; /* Adjusted padding */
}

#chat-popup .header .enlarge-btn:hover {
  background-color: #0056b3; /* Darker blue on hover */
}

/* Style for reopen chat button */
button.reopen-chat {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff; /* Blue color for button */
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button.reopen-chat:hover {
  background-color: #0056b3; /* Darker blue on hover */
}
</style>

  