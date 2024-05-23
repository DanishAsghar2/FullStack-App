<template>
  <div class="account-page">
    <div class="welcome-section">
      <h2>Welcome, {{ userName }}!</h2>
      <p>Thank you for being a valued member of our community.</p>
    </div>

    <button class="logout-button" @click="logout">Logout</button>
  </div>
</template>

<script>
import { userService } from '../../services/userServices';

export default {
  data() {
    return {
      userName: '' // Initialize user's name as empty
    };
  },
  methods: {
    logout() {
      userService.logout()
        .then(result => {
          console.log("Logged Out")
          this.$router.push("/")
        })
        .catch(error => this.error = error)
    },
    fetchUserName() {
      // Call backend API to fetch user's name
      // For example:
      // userService.fetchUserName()
      //   .then(name => {
      //     this.userName = name;
      //   })
      //   .catch(error => {
      //     console.error("Error fetching user's name:", error);
      //   });

      // Mock data for demonstration (replace with actual API call)
      this.userName = "User";
    }
  },
  mounted() {
    // Fetch user's name when the component is mounted
    this.fetchUserName();
  }
};
</script>

<style scoped>
.account-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.welcome-section {
  margin-bottom: 30px;
}

h2 {
  color: #333;
  margin-bottom: 10px;
}

p {
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
}

.logout-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.logout-button:hover {
  background-color: #0056b3;
}
</style>
