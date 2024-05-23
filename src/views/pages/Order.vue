<template>
  <div class="container">
    <h1>Order Confirmation</h1>
    <div class="order-details">
      <p>Thank you for your order!</p>
      <p>Your order number is: <strong>{{ orderNumber }}</strong></p>
      <p>We have received your order and will process it shortly.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderNumber: ''
    };
  },
  mounted() {
    this.generateOrderNumber();
  },
  methods: {
    generateOrderNumber() {
      // Generate a random order number (you can replace this with your actual order number generation logic)
      this.orderNumber = Math.floor(Math.random() * 1000000) + 1;
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 50px auto;
  padding: 40px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.order-details {
  margin-top: 20px;
}

.order-details p {
  margin-bottom: 10px;
}

.order-details strong {
  font-weight: bold;
}
</style>
