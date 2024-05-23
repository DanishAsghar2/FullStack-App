<template>
  <div class="home-container">
    <!-- Moving message -->
    <div class="moving-message-container">
      <p class="moving-message">Use Code Fragrance For 10% Off Your Order.</p>
    </div>

    <!-- Slideshow -->
    <div class="slideshow">
      <div class="slideshow-container">
        <img id="img1" class="slideimg" src="../assets/image1.png"/>
        <img id="img2" class="slideimg" src="../assets/image2.png"/>
        <img id="img3" class="slideimg" src="../assets/image3.jpg"/>
      </div>
      <div class="buttonleft">
        <button class="buttonslide" @click="Backward()">&lt;</button> 
      </div>
      <div class="buttonright">
        <button class="buttonslide" @click="Forward()">&gt;</button> 
      </div>
    </div>

    <!-- About Elysium Earth Essence -->
    <div class="about-elysium">
      <h2 class="elysium-heading">About Elysium Earth Essence</h2>
      <div class="elysium-info" @click="toggleInfo">
        <p class="info-heading">{{ showInfo ? 'Click to Close' : 'Click to Learn More' }}</p>
        <div class="info-box" v-if="showInfo">
        
          <div class="info-content">
            <p class="info-text">
              Elysium Earth Essence is more than just a fragrance brand; it's a commitment to sustainable luxury. Our mission is to provide fragrances that not only captivate the senses but also preserve the planet for future generations. 
            </p>
            <p class="info-text">
              At Elysium, we believe in creating scents that are as unique as they are environmentally conscious. That's why all our fragrances are carefully crafted using sustainable ingredients sourced from around the world. From the design of our bottles to the selection of our ingredients, sustainability is at the heart of everything we do.
            </p>
            <p class="info-text">
              Our fragrances are designed to be unisex, appealing to individuals who appreciate quality, elegance, and responsibility. Join us on our journey to redefine luxury with a conscience.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Featured Products -->
    <div class="featured-products">
      <h2 class="featured-products-title">Featured Products</h2>
      <div class="product-list">
        <!-- Product 1 -->
        <div class="product product1" @click="redirectToExplorePage()">
          <img src="../assets/Stars Et Oud.png" alt="Stars Et Oud">
          <p class="product-name">Stars Et Oud</p>
          <p class="product-description">Dark. Fruity and Oud</p>
        </div>
        <!-- Product 2 -->
        <div class="product product2" @click="redirectToExplorePage()">
          <img src="../assets/1819.png" alt="1819">
          <p class="product-name">1819</p>
          <p class="product-description">Sweet and Musky</p>
        </div>
        <!-- Product 3 -->
        <div class="product product3" @click="redirectToExplorePage()">
          <img src="../assets/Lust's Delight.png" alt="Lust's Delight">
          <p class="product-name">Lust's Delight</p>
          <p class="product-description">Sweet and creamy</p>
        </div>
        <!-- Product 4 -->
        <div class="product product4" @click="redirectToExplorePage()">
          <img src="../assets/Flowers In Japan.png" alt="Flowers In Japan">
          <p class="product-name">Flowers In Japan</p>
          <p class="product-description">Japanese Fruit and yuza</p>
        </div>
        <!-- Product 5 -->
        <div class="product product5" @click="redirectToExplorePage()">
          <img src="../assets/Nuit d'Orleans.png" alt="Nuit d'Orleans">
          <p class="product-name">Nuit d'Orleans</p>
          <p class="product-description">Mysterious and Fruity</p>
        </div>
        <!-- Product 6 -->
        <div class="product product6" @click="redirectToExplorePage()">
          <img src="../assets/Torino.png" alt="Torino">
          <p class="product-name">Torino</p>
          <p class="product-description">Fresh and Musky</p>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer>
      <div>
        <p>&copy; 2024 Elysium Earth Essence. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slideNo: 0,
      slideTimer: null,
      showInfo: false
    };
  },
  mounted() {
    this.startSlides();
    this.startMovingMessage();
  },
  beforeDestroy() {
    clearInterval(this.slideTimer);
  },
  methods: {
    startSlides() {
      this.slideTimer = setInterval(() => {
        this.Forward();
      }, 5000);
    },
    startMovingMessage() {
      setInterval(() => {
        const messageContainer = document.querySelector('.moving-message-container');
        messageContainer.style.animation = 'slideMessage 10s infinite linear';
      }, 1000); // Every 15 seconds
    },
    Forward() {
      if (this.slideNo < 3) {
        this.slideNo = this.slideNo + 1;
      }
      if (this.slideNo == 3) {
        this.slideNo = this.slideNo - 3;
      }
      this.displaySlide();
      this.resetTimer();
    },
    Backward() {
      if (this.slideNo > -1) {
        this.slideNo = this.slideNo - 1;
      }
      if (this.slideNo == -1) {
        this.slideNo = this.slideNo + 3;
      }
      this.displaySlide();
      this.resetTimer();
    },
    displaySlide() {
      if (this.slideNo == 0) {
        document.getElementById("img1").style.display = "block";
        document.getElementById("img2").style.display = "none";
        document.getElementById("img3").style.display = "none";
      } else if (this.slideNo == 1) { 
        document.getElementById("img2").style.display = "block";
        document.getElementById("img1").style.display = "none";
        document.getElementById("img3").style.display = "none";
      } else if (this.slideNo == 2) {  
        document.getElementById("img3").style.display = "block";
        document.getElementById("img2").style.display = "none";
        document.getElementById("img1").style.display = "none";
      }
    },
    redirectToExplorePage() {
      // Redirect to the explore page
      this.$router.push('/explore');
    },
    slidebutton(numero) {
      this.slideNo = numero;
      this.displaySlide();
      this.resetTimer();
    },
    showProductInfo(productNumber) {
      this.showInfo = true;
    },
    closeInfo() {
      this.showInfo = false;
    },
    resetTimer() {
      clearInterval(this.slideTimer);
      this.startSlides();
    },
    toggleInfo() {
      this.showInfo = !this.showInfo;
    }
  },
};
</script>

<style scoped>
/* Container Styles */
.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  animation: fadeIn 2s ease-in-out; /* Fade in animation */
  font-family: 'Arial', sans-serif; /* Set a readable font */
}

/* Other styles */

/* Slideshow Styles */
.slideshow {
  position: relative;
  margin-bottom: 30px;
  perspective: 1000px; /* Add perspective */
}

.slideshow-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  transform-style: preserve-3d; /* Add 3D effect */
  animation: waveAnimation 5s infinite ease-in-out; /* Wave animation */
}

.slideimg {
  display: none;
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5); /* Add shadow */
  transform: rotateY(0deg); /* Initial rotation */
  transition: transform 0.5s ease; /* Add transition */
}

.buttonleft,
.buttonright {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.buttonslide {
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  cursor: pointer;
  padding: 10px;
  font-size: 16px;
  z-index: 1000;
  border-radius: 5px; /* Rounded corners */
}

.buttonleft:hover,
.buttonright:hover {
  background-color: rgba(0, 0, 0, 0.7);
}

.buttonleft {
  left: 0;
}

.buttonright {
  right: 0;
}

/* Featured Products Styles */
.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.product {
  width: calc(33.33% - 20px); /* 3 products in a row with spacing */
  margin-bottom: 20px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.product:hover {
  transform: translateY(-5px); /* Add hover effect */
}

.product img {
  max-width: 100%;
  height: auto;
}

.product-name {
  font-weight: bold;
  margin-top: 10px;
}

.product-description {
  color: #666;
  margin-top: 5px;
}

/* Moving message Styles */
.moving-message-container {
  text-align: center;
  margin-bottom: 20px;
}

.moving-message {
  background-color: #0f496b;
  color: white;
  font-size: 17px;
  padding: 5px 10px; /* Adjust padding */
  border-radius: 3px;
  animation: slideMessage 14s infinite linear;
}

@keyframes slideMessage {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* About Elysium Earth Essence Styles */
.about-elysium {
  margin-top: 50px;
}

.about-elysium .elysium-heading {
  text-align: center;
  margin-bottom: 20px;
  transform: rotateY(15deg); /* Add 3D effect */
}

.about-elysium .elysium-info {
  cursor: pointer;
}

.info-box {
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 30px;
  margin-top: 20px;
  animation: slideIn 0.5s ease-in-out; /* Animation for opening */
  transform: perspective(1000px) rotateX(-20deg); /* Add 3D effect */
  transform-style: preserve-3d; /* Preserve 3D effect */
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5); /* Add shadow */
}

.info-content {
  transition: opacity 0.5s ease-in-out; /* Add fade-in effect */
  opacity: 0; /* Initially hidden */
}

.info-box:hover .info-content {
  opacity: 1; /* Show content on hover */
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #666;
}

.info-text {
  color: #8464f9; /* Change text color */
  font-family: 'Open Sans', sans-serif; /* Set a nice readable font */
  font-size: 16px; /* Adjust font size */
  line-height: 1.6; /* Increase line height for better readability */
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
