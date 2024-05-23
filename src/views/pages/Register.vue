<template>
    <div class="register-container">
      <div class="register-form">
        <h2>Register</h2>
        <form @submit.prevent="register">
          <div class="form-group">
            <label for="fullname">Firstname:</label>
            <input type="text" id="fullname" name="fullname" v-model="firstname" placeholder="Enter your first name" required>
          </div>
          <div class="form-group">
            <label for="lastname">Lastname:</label>
            <input type="text" id="lastname" name="lastname" v-model="lastname" placeholder="Enter your last name" required>
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" v-model="email" placeholder="Enter your email" required>
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" v-model="password" placeholder="Enter your password" required>
          </div>
          <button type="submit">Register</button>
        </form>
        <router-link to="/login">Login</router-link> <!-- Link to the Login page -->
      </div>
    </div>
  </template>
  
  <script>
import { userService } from '../../services/userServices';

  export default {
    data() {
      return {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        submitted: false,
      };
    },
    methods: {
      register() {
        // Handle registration logic
        this.submitted = true
        userService.register(this.firstname, this.lastname, this.email, this.password)
        .then(result => {
          console.log("Registered Successfully")
        })
        .catch(error => this.error = error)
      }
    }
  };
  </script>
  
  <style>
  /* Register container styles */
  .register-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
  
  /* Register form styles */
  .register-form {
    width: 400px;
    padding: 50px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .register-form h2 {
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
  