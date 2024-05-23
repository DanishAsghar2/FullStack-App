<template>
  <div class="container">
    <h1 class="title">Discover <span class="highlight">Our Exclusive And Sustainable</span> Fragrances</h1>
    <transition-group name="fade" tag="div" class="products" @before-enter="beforeEnter" @enter="enter">
      <!-- Product items with "Add to Cart" buttons -->
      <div v-for="(fragrance, index) in fragrances" :key="index" class="product" :data-index="index" tabindex="0" @mouseover="applyParallax" @mouseleave="resetParallax" @keydown.enter="addToCart(fragrance)">
        <div class="product-container" @click="addToCart(fragrance)">
          <img :src="getImageUrl(fragrance.name)" :alt="fragrance.name" class="product-image">
        </div>
        <p class="product-name">{{ fragrance.name }}</p>
        <p class="product-price">£{{ fragrance.price }}</p>
        <button class="add-to-cart" :class="{ 'added': fragrance.addedToCart }" @click="addToCart(fragrance)" aria-label="Add to Cart">
          {{ fragrance.addedToCart ? 'Added to Cart' : 'Add to Cart' }}
        </button>
      </div>
    </transition-group>
    <button class="explore-page2-btn" @click="goToExplorepage2">See More</button>
  </div>
</template>

<script>
import { cartService } from '../../services/cartServices';
import { productService } from '../../services/productServices';

export default {
  data() {
    return {
      fragrances: [],
      error: "",
      staggerDelay: 100 // Delay between each product animation (in milliseconds)
    };
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const fragrances = await productService.getAll();
        this.fragrances = fragrances.map(fragrance => ({ ...fragrance, addedToCart: false }));
      } catch (error) {
        this.error = error;
        console.error("Error fetching products:", error);
      }
    },
    getImageUrl(name) {
      return new URL(`../../assets/${name}.png`, import.meta.url).href;
    },
    addToCart(fragrance) {
      let userId = localStorage.getItem('user_id');
      userId = parseInt(userId);
      console.log(fragrance.fragrance_id, fragrance.price, userId, 1);
      cartService.addItem(fragrance.fragrance_id, fragrance.price, userId, 1)
        .then(() => {
          console.log('Product added to cart:', fragrance.name);
          fragrance.addedToCart = true;
        })
        .catch(error => this.error = error);
    },
    goToExplorepage2() {
      // Navigate to ExplorePage2
      this.$router.push('/explorepage2');
    },
    applyParallax(event) {
      const product = event.currentTarget;
      product.classList.add('parallax');
    },
    resetParallax(event) {
      const product = event.currentTarget;
      product.classList.remove('parallax');
    },
    beforeEnter(el) {
      el.style.opacity = 0;
    },
    enter(el, done) {
      const delay = el.dataset.index * this.staggerDelay;
      setTimeout(() => {
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        el.style.opacity = 1;
        el.style.transform = 'translateY(0)';
        done();
      }, delay);
    }
  }
};
</script>

<style>
/* Your existing styles */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.title {
  text-align: center;
  margin-bottom: 50px;
  font-size: 36px;
  color: #333;
  animation: fadeInDown 1s ease;
}

.title .highlight {
  color: #67b186;
}

@keyframes fadeInDown {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.products {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.product {
  flex-basis: calc(25% - 20px);
  margin: 10px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  overflow: hidden; 
  transform: translateY(50px);
}

.product:hover .product-container {
  transform: scale(1.1);
}

.product-container {
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-radius: 8px;
  position: relative;
  transition: transform 0.3s ease;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.product-name {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #555;
  transition: color 0.3s ease;
}

.product-price {
  font-size: 16px;
  color: #555;
  transition: color 0.3s ease;
}

.add-to-cart {
  padding: 5px 10px;
  font-size: 14px;
  background-color: #0056b3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
}

.add-to-cart.added {
  background-color: #4CAF50;
  animation: pulse 1s infinite alternate;
  box-shadow: 0 0 15px #4CAF50;
}

.add-to-cart:hover {
  background-color: #004080;
  transform: scale(1.05);
  box-shadow: 0 0 15px #004080;
}

.explore-page2-btn {
  padding: 5px 10px;
  font-size: 14px;
  background-color: #0056b3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: block;
  margin: 20px auto;
}

.explore-page2-btn:hover {
  background-color: #004080;
}

@keyframes pulse {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.05);
  }
}

/* Additional Animations */
.product:hover .product-image {
  transform: rotate(10deg) scale(1.1);
}

.product:hover .product-name {
  color: #79d2e8;
}

.product:hover .product-price {
  color: #33d177;
}

.add-to-cart:active {
  transform: scale(0.95);
}

.parallax .product-container {
  transform: scale(1.1);
}

/* Glow Animation */
@keyframes glow {
  0% {
    box-shadow: 0 0 10px rgba(0, 0, 255, 0.5);
  }
  50% {
    box-shadow: 0 0 20px rgba(0, 0, 255, 0.7);
  }
  100% {
    box-shadow: 0 0 10px rgba(0, 0, 255, 0.5);
  }
}

.product-container::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 255, 0.5);
  animation: glow 2s infinite alternate;
}

.fade-enter-active {
  transition: opacity 0.5s, transform 0.5s;
}

.fade-enter {
  opacity: 0;
}
</style>
