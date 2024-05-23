<template>
    <div class="forgot-password-container">
      <div class="forgot-password-form">
        <h2>Forgot Password</h2>
        <form @submit.prevent="resetPassword">
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" v-model="email" placeholder="Enter your email" required>
          </div>
          <button type="submit">Reset Password</button>
        </form>
        <router-link to="/login">Back to Login</router-link> 
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: ''
      };
    },
    methods: {
      resetPassword() {
        //  password reset  
        console.log('Reset password for email:', this.email);
        
      }
    }
  };
  </script>
  
  <style>
  /* Forgot Password container styles */
  .forgot-password-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
  
  /* Forgot Password form styles */
  .forgot-password-form {
    width: 400px;
    padding: 50px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .forgot-password-form h2 {
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
  </style>
  