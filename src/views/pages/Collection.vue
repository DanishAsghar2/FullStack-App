<template>
  <div class="container">
    <div class="fragrance" v-for="(fragrance, index) in fragrances" :key="index">
      <img
        :src="'/src/views/assets/' + fragrance.name + '.png'"
        :alt="fragrance.name"
        class="fragrance-image"
        @mouseover="showDetails(index)"
        @mouseout="hideDetails(index)"
      />
      <div class="fragrance-details" v-if="fragrance.showDetails">
        <h2>{{ fragrance.name }}</h2>
        <div class="notes">
          <p>{{ fragrance.description }}</p>
        </div>
        <div class="notes" v-if="fragrance.showNotes">
          <p><span class="note-type">Top Notes:</span> {{ fragrance.top }}</p>
          <p><span class="note-type">Heart Notes:</span> {{ fragrance.heart }}</p>
          <p><span class="note-type">Base Notes:</span> {{ fragrance.base }}</p>
        </div>
        <button class="see-notes-btn" @click="toggleNotes(index)">
          {{ fragrance.showNotes ? 'Hide Notes' : 'See Notes' }}
        </button>
        <button class="product-btn" @click="goToProduct(fragrance.fragrance_id)">More Information</button>
      </div>
    </div>
  </div>
</template>

<script>

import { productService } from '../../services/productServices';

export default {
  data() {
    return {
      fragrances: [],
      error: ""
    };
  },
  mounted() {
    productService.getByCustom(0)
    .then(fragrances => {
      this.fragrances = fragrances
    })
    .catch(error => this.error = error)
  },
  methods: {
    showDetails(index) {
      this.fragrances[index].showDetails = true;
    },
    hideDetails(index) {
      this.fragrances[index].showDetails = true;
    },
    toggleNotes(index) {
      this.fragrances[index].showNotes = !this.fragrances[index].showNotes;
    },
    goToProduct(id) {
       this.$router.push('/product/' + id);
    },
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.fragrance {
  margin: 20px;
  position: relative;
  overflow: hidden;
}

.fragrance-image {
  width: 250px;
  height: 250px;
  border-radius: 8px;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.fragrance:hover .fragrance-image {
  transform: scale(1.1);
  opacity: 0.8;
}

.fragrance-details {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  padding: 20px;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1; /* Ensure fragrance details appear over the button */
  font-size: 10px; 
  color: white; 
  font-family: 'Verdana', sans-serif; 
  font-style: italic; 
}

.fragrance:hover .fragrance-details {
  opacity: 1;
}

.notes p {
  font-size: 12px; 
  font-style: italic; 
}

.note-type {
  font-weight: bold;
  color: #fff;
}

.see-notes-btn {
  position: relative;
  z-index: 2; 
  margin-top: 10px;
  padding: 10px 20px; 
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px; 
  font-family: 'Verdana', sans-serif; 
}

.see-notes-btn:hover {
  background-color: #0056b3;
}
</style>