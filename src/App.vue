<template>
  <div>
    <header>
      <!-- Logo 1 -->
      <router-link to="/" class="logo1-link">
        <img src="/src/views/assets/Logo1.png" alt="Elysium Earth Essence" class="logo1" />
      </router-link>

      <!-- Search bar with image -->
      <div class="search-bar">
        <img src="/src/views/assets/searchbar.png" alt="Search Icon" class="search-icon" @click="toggleSearch" />
        <input v-show="showSearch" type="text" placeholder="Search" class="search-input" />
      </div>

      <!-- Logo 2 -->
      <router-link to="/" class="logo2-link">
        <img src="/src/views/assets/Logo2.png" alt="Elysium Earth Essence" class="title-image" />
      </router-link>

      <!-- Top right icons -->
      <div class="top-right-icons">
        <!-- Cart -->
        <div class="item-chatbox">
          <router-link to="/chatbox">
            <img src="/src/views/assets/chatbot.jpg" alt="Chatbox">
          </router-link>
        </div>

        <div class="item-cart">
          <router-link to="/cart">
            <img src="/src/views/assets/cart.png" alt="Cart">
          </router-link>
        </div>

        <!-- User login -->
        <div class="user-login">
          <router-link to="/accountpage">
            <img src="/src/views/assets/accountpage.png" alt="Login">
          </router-link>
        </div>
      </div>
    </header>

    <!-- Navigation links -->
    <nav class="navbar">
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/explore">Explore</router-link></li>
        <li><router-link to="/aboutus">Discover</router-link></li>
        <li><router-link to="/byyou">By You</router-link></li>
        <li><router-link to="/collection">Collection</router-link></li>
      </ul>
    </nav>

    <!-- Router view for displaying components -->
    <router-view />

    <!-- Footer section -->
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-column">
          <h3>Company</h3>
          <ul>
            <li><router-link to="/about">About Us</router-link></li>
            <li><router-link to="/contact">Contact Us</router-link></li>
            <li><router-link to="/careers">Careers</router-link></li>
          </ul>
        </div>
        <div class="footer-column">
          <h3>Support</h3>
          <ul>
            <li><router-link to="/faq">FAQ</router-link></li>
            <li><router-link to="/terms">Terms & Conditions</router-link></li>
            <li><router-link to="/privacy">Privacy Policy</router-link></li>
          </ul>
        </div>
        <div class="footer-column">
          <h3>Connect</h3>
          <ul>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">Instagram</a></li>
          </ul>
        </div>
        <div class="footer-column">
          <h3>Contact</h3>
          <p>Email: 21306164@stu.mmu.ac.uk</p>
          <p>Phone: +44 07519914067
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showSearch: false
    };
  },
  methods: {
    toggleSearch() {
      this.showSearch = !this.showSearch;
    }
  }
};
</script>

<style>
/* Chat bot icon */
.item-chatbox img {
  width: 30px; /* Adjust width as needed */
  height: 30px; /* Adjust height as needed */
  cursor: pointer; /* Show pointer cursor when hovering over the icon */
}

.item-chatbox:hover img {
  opacity: 0.8; /* Reduce opacity when hovered over */
}

/* Logo 1 styling */
.logo1 {
  cursor: pointer; /* Show pointer cursor when hovering over the image */
  width: 60px; /* Adjust width as needed */
  height: auto; /* Maintain aspect ratio */
  display: block; /* Make the image a block element */
  position: absolute; /* Position absolutely within the header */
  top: 10px; /* Adjust top position as needed */
  left: 10px; /* Adjust left position as needed */
}

/* Logo 2 styling */
.title-image {
  cursor: pointer; /* Show pointer cursor when hovering over the image */
  width: 200px; /* Adjust width as needed */
  height: auto; /* Maintain aspect ratio */
  display: block; /* Make the image a block element */
  margin: 5px auto; /* Center the image horizontally and reduce the gap */
}

/* Top right icons styling */
.top-right-icons {
  position: absolute;
  top: 10px; /* Adjust as needed */
  right: 10px; /* Adjust as needed */
}

.top-right-icons > div {
  display: inline-block;
  margin-left: 10px; /* Adjust as needed to create space between the icons */
}

/* Navbar styling */
.navbar {
  background-color: #333;
  overflow: hidden;
  margin-top: 10px; /* Add margin to create space below the logo */
}

.navbar ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.navbar ul li {
  float: left;
}

.navbar ul li a {
  display: block;
  color: black;
  text-align: center;
  padding: 14px 60px;
  text-decoration: none;
}

.navbar ul li a:hover {
  background-color: #ddd;
  color: black;
}

/* Search bar styling */
.search-bar {
  position: absolute;
  top: 27px;
  left: 90px; /* Adjust left position to align with Logo 1 */
}

.search-icon {
  width: 25px;
  height: 25px;
  cursor: pointer; /* Show pointer cursor when hovering over the image */
}

.search-input {
  padding: 10px;
  margin-left: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

/* Footer styling */
.footer {
  background-color: #333;
  color: white;
  padding: 40px 0;
  text-align: center;
}

.footer-content {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.footer-column {
  flex: 1;
  margin: 0 20px;
}

.footer h3 {
  color: #fff;
  font-size: 20px;
  margin-bottom: 15px;
}

.footer-column ul {
  list-style-type: none;
  padding: 0;
}

.footer-column ul li {
  margin-bottom: 10px;
}

.footer-column ul li a {
  color: #ccc;
  text-decoration: none;
}

.footer-column ul li a:hover {
  color: #fff;
}

.footer-contact {
  font-size: 14px;
  margin-top: 20px;
}

.footer-contact p {
  margin-bottom: 10px;
}
</style>
