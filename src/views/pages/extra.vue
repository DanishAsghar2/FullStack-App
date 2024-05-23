<template>
    <div class="container">
      <button class="season-btn" @click="filterBySeason('Spring')">Spring</button>
      <button class="season-btn" @click="filterBySeason('Summer')">Summer</button>
      <button class="season-btn" @click="filterBySeason('Autumn')">Autumn</button>
      <button class="season-btn" @click="filterBySeason('Winter')">Winter</button>
  
      <div class="fragrance" v-for="(fragrance, index) in filteredFragrances" :key="index">
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
        filteredFragrances: [],
        error: "",
        selectedSeason: "" // Track the selected season
      };
    },
    mounted() {
      productService.getAll()
        .then(fragrances => {
          this.fragrances = fragrances;
          this.filteredFragrances = fragrances; 
        })
        .catch(error => this.error = error)
    },
    methods: {
      showDetails(index) {
        this.filteredFragrances[index].showDetails = true;
      },
      hideDetails(index) {
        this.filteredFragrances[index].showDetails = false;
      },
      toggleNotes(index) {
        this.filteredFragrances[index].showNotes = !this.filteredFragrances[index].showNotes;
      },
      goToProduct(id) {
         this.$router.push('/product/' + id);
      },
      filterBySeason(season) {
        this.selectedSeason = season;
        if (season === "Spring") {
          this.filteredFragrances = this.fragrances.filter(fragrance => fragrance.type === "Spring");
        } else if (season === "Summer") {
          this.filteredFragrances = this.fragrances.filter(fragrance => fragrance.type === "Summer");
        } else if (season === "Autumn") {
          this.filteredFragrances = this.fragrances.filter(fragrance => fragrance.type === "Autumn");
        } else if (season === "Winter") {
          this.filteredFragrances = this.fragrances.filter(fragrance => fragrance.type === "Winter");
        } else {
          this.filteredFragrances = this.fragrances; // If no season is selected, show all fragrances
        }
      }
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
    z-index: 1; 
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


.season-btn {
  margin: 5px; 
  padding: 10px 20px; 
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px; 
  font-family: 'Verdana', sans-serif; 
}

.season-btn:hover {
  background-color: #0056b3;
}
</style>

  