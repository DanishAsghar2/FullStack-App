<template>
  <div class="cart-container">
    <div class="cart-form">
      <h2>Shopping Cart</h2>
      <div v-if="cartItems.length === 0" class="empty-cart">Your cart is empty</div>
      <div v-if="fragrances && cartItems.length > 0" class="cart-items">
        <div class="cart-item" v-for="item in cartItems" :key="item.cart_id">
          <div class="item-details">
            <img :src="'/src/views/assets/' + fragrances[item.fragrance_id - 1].name + '.png'" alt="Product Image" class="product-image">
            <div class="item-info">
              <span class="item-name">{{ fragrances[item.fragrance_id - 1].name }}</span>
              <span class="item-price">£{{ fragrances[item.fragrance_id - 1].price }}</span>
              <button @click="removeItem(item.cart_id)" class="remove-button">Remove</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="summary">
      <h2>Order Summary</h2>
      <div class="summary-content">
        <div class="summary-item">
          <span>Total Items:</span>
          <span>{{ cartItems.length }}</span>
        </div>
        <div class="summary-item">
          <span>Total Price:</span>
          <span>£{{ totalPrice.toFixed(2) }}</span>
        </div>
        <div class="summary-item" v-if="cartItems.length > 0">
          <span>Eligible for Free Delivery:</span>
          <span>{{ deliveryEligibility }}</span>
        </div>
        <div class="summary-item">
          <div class="discount-code-container">
            <input type="text" v-model="discountCode" placeholder="Enter discount code">
            <button @click="applyDiscount" class="apply-discount-button">Apply</button>
          </div>
        </div>
        <div class="checkout-container">
          <button class="checkout-btn" @click="checkout">Checkout</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { cartService } from '../../services/cartServices';

import { productService } from '../../services/productServices';

export default {
  data() {
    return {
      cartItems: [],
      fragrances: [],
      discountCode: '',
      isEligibleForFreeDelivery: false,
      discountAmount: 0, // Add discount amount property
    };
  },
  mounted() {
    this.fetchCartItems();
    productService.getAll()
      .then(fragrances => {
        this.fragrances = fragrances;
      })
      .catch(error => {
        console.error('Error fetching fragrances:', error);
      });
  },
  computed: {
    totalPrice() {
      // Calculate total price with discount applied
      return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0) - this.discountAmount;
    },
    // Compute delivery eligibility with human-readable format
    deliveryEligibility() {
      return this.isEligibleForFreeDelivery ? 'Yes' : 'No';
    }
  },
  methods: {
    fetchCartItems() {
      let userId = localStorage.getItem('user_id');
      userId = parseInt(userId);
      cartService.getAll(userId)
        .then(cartItems => {
          this.cartItems = cartItems;
          this.isEligibleForFreeDelivery = cartItems.length > 0 && this.totalPrice >= 50;
        })
        .catch(error => {
          console.error('Error fetching cart items:', error);
        });
    },
    removeItem(itemId) {
      cartService.removeItem(itemId)
        .then(() => {
          console.log('Item removed from cart');
          this.fetchCartItems(); // Refresh cart items after removal
        })
        .catch(error => {
          console.error('Error removing item from cart:', error);
        });
    },
    applyDiscount() {
      // Implement discount code application logic here
      if (this.discountCode === 'fragrance') {
        // Apply 10% discount
        this.discountAmount = this.totalPrice * 0.1;
        console.log('Discount applied:', this.discountAmount);
      } else {
        console.log('Invalid discount code');
      }
    },
    checkout() {
      console.log('Checkout');
      // Implement checkout functionality
      this.$router.push('/checkout');
    }
  }
};
</script>

<style scoped>
/* Your styles remain unchanged */
</style>


<style scoped>
.cart-container {
  display: flex;
  justify-content: space-between;
  border: 1px solid #eaeaea;
  border-radius: 20px; /* Added border-radius for oval shape */
  overflow: hidden;
  margin: 20px auto;
  width: 90%;
  max-width: 1200px;
}

.cart-form {
  flex: 1;
  padding: 20px;
}

.empty-cart {
  text-align: center;
  font-size: 24px;
  color: #666;
}

.cart-items {
  overflow-y: auto;
  max-height: 600px;
  margin-top: 20px;
}

.cart-item {
  border: 1px solid #eaeaea;
  border-radius: 20px; /* Added border-radius for oval shape */
  padding: 10px;
  background-color: #f7f7f7;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
  margin-bottom: 10px;
}

.item-details {
  display: flex;
  align-items: center;
}

.product-image {
  width: 150px;
  height: 150px;
  margin-right: 20px;
  object-fit: contain;
}

.item-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.item-name {
  margin-bottom: 10px;
  font-size: 24px;
  font-weight: bold;
}

.item-price {
  margin-bottom: 10px;
  color: #888;
  font-size: 20px;
}

.remove-button {
  background-color: #ff4d4f;
  color: #fff;
  border: none;
  border-radius: 20px; /* Added border-radius for oval shape */
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 18px;
}

.remove-button:hover {
  background-color: #ff7875;
}

.summary {
  flex: 1;
  padding: 20px;
  background-color: #f8f9fa;
  min-width: 300px;
}

.summary-content {
  margin-top: 20px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.checkout-container {
  padding: 20px;
}

.checkout-button {
  background-color: #1890ff;
  color: #fff;
  border: none;
  border-radius: 20px; /* Added border-radius for oval shape */
  padding: 15px 30px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.checkout-button:hover {
  background-color: #40a9ff;
}

.discount-code-container {  display: flex;
  align-items: center;
}

.discount-code-container input[type="text"] {
  border: 1px solid #ccc;
  border-radius: 20px; /* Added border-radius for oval shape */
  padding: 10px 15px;
  margin-right: 10px;
}

.apply-discount-button {
  background-color: #52c41a;
  color: #fff;
  border: none;
  border-radius: 20px; /* Added border-radius for oval shape */
  padding: 5px 10px; /* Reduced padding */
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.apply-discount-button:hover {
  background-color: #73d13d;
}
</style>

