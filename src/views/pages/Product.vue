<template>
    <div v-if="fragrance" class="container">
      <div class="product-image">
        <img :src="'/src/views/assets/' + fragrance.name + '.png'">
      </div>
      <div class="product-info">
        <h1 class="product-title">{{ fragrance.name }}</h1>
        <p class="product-description">{{ fragrance.description }}</p>
        <p class="product-price">Price: {{ "£" + fragrance.price }}</p>
        <p class="product-description">Price: {{ "Top Notes: " + fragrance.top }}</p>
        <p class="product-description">Price: {{ "Heart Notes: " + fragrance.heart }}</p>
        <p class="product-description">Price: {{ "Base Notes: " + fragrance.base }}</p>
      </div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </template>
  
  <script>
import { productService } from '../../services/productServices';

  export default {
    data() {
      return {
        fragrance: {},
        error: "",
      };
    },
    mounted() {
      console.log(this.$route.params.id)
      productService.getOne(this.$route.params.id)
      .then(fragrance => {
        this.fragrance = fragrance;
      })
      .catch(error => this.error = error);
    },
    methods: {
      fetchProductDetails() {
      }
    }
  };
  </script>
  
  <style scoped>
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
  }
  .container {
    max-width: 800px;
    margin: 20px auto;
    padding: 0 20px;
  }
  .product-image {
    text-align: center;
  }
  .product-image img {
    max-width: 100%;
    height: auto;
  }
  .product-info {
    text-align: center;
    margin-top: 20px;
  }
  .product-title {
    font-size: 24px;
    margin-bottom: 10px;
  }
  .product-description {
    font-size: 16px;
    margin-bottom: 10px;
  }
  .product-price,
  .product-ml {
    font-size: 20px;
    color: green;
  }
  </style>
  