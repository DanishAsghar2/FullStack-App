<template>
  <div class="login-container">
    <div class="login-wrapper">
      <div class="login-form">
        <h2>Login</h2>
        <form @submit.prevent="login">
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="text" id="email" name="email" v-model="email" placeholder="Enter your email" required autocomplete="off">
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" v-model="password" placeholder="Enter your password" required autocomplete="off">
          </div>
          <button type="submit">Login</button>
        </form>
        <router-link to="/register">Register</router-link> <!-- Link to the Register page -->
        <router-link to="/forgotpassword">Forgot Password?</router-link>
      </div>
      <div class="slideshow">
        <img :src="currentImage" alt="Slideshow Image" class="slide">
      </div>
    </div>
  </div>
</template>

<script>
import { userService } from '../../services/userServices';

export default {
  data() {
    return {
      email: "",
      password: "",
      slideshowImages: [ // Array of slideshow images
        'src/views/assets/Torino.png',
        'src/views/assets/Pineapple Glacier.png',
        "src/views/assets/nuit d'orleans.png"
      ],
      currentIndex: 0,
      intervalId: null,
      submitted: false,
      error: "",
    };
  },
  computed: {
    currentImage() {
      return this.slideshowImages[this.currentIndex];
    }
  },
  mounted() {
    // Start the slideshow timer when the component is mounted
    this.startSlideshow();
  },
  methods: {
    login() {
      this.submitted = true;
      this.error = "";
      userService.login(this.email, this.password)
        .then(result => {
          console.log("Authorized");
          this.$router.push("/accountpage")
          // Redirect or perform actions upon successful login
        })
        .catch(error => {
          this.error = error;
          alert("Invalid Email / Password");
        });
    },
    startSlideshow() {
      // Start the slideshow timer
      this.intervalId = setInterval(this.nextSlide, 2000); // Change slide every 2 seconds
    },
    nextSlide() {
      // Move to the next slide
      this.currentIndex = (this.currentIndex + 1) % this.slideshowImages.length;
    }
  },
  beforeDestroy() {
    // Clean up the slideshow timer when the component is destroyed
    clearInterval(this.intervalId);
  }
};
</script>

<style>
/* Login container styles */
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.login-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Login form styles */
.login-form {
  width: 100%; /* Adjust the width of the login form */
  padding: 50px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.login-form h2 {
  text-align: center;
  margin-bottom: 10px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #45a049;
}

/* Slideshow styles */
.slideshow {
  width: 40%; /* Adjust the width of the slideshow */
  height: 100vh; /* Adjust the height of the slideshow */
  border-radius: 0 10px 10px 0;
  overflow: hidden;
}

.slide {
  width: auto;
  height: 100%;
}
</style>
