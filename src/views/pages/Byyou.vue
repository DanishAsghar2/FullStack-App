<template>
  <div class="fragrance-customization">
    <div class="description">
      <h2>Create Your Own Sustainable Fragrance</h2>
      <p>
        Customize your fragrance by selecting top, heart, and base notes. Mix and match sustainable ingredients to create a scent that suits your style. Our fragrances are housed in eco-friendly bottles, embodying our commitment to sustainability.
      </p>
    </div>
    <div class="form-container">
      <!-- Top Notes Form -->
      <form class="fragrance-form">
        <div class="note-selection">
          <label>Top Notes:</label>
          <div class="button-group">
            <button
              v-for="note in topNotes"
              :key="'top-' + note"
              :class="{ active: selectedTopNotes.includes(note) }"
              @click="toggleTopNote(note)"
              type="button"
              :disabled="selectedTopNotes.length >= 2 && !selectedTopNotes.includes(note)"
            >{{ note }}</button>
          </div>
        </div>
      </form>

      <!-- Heart Notes Form -->
      <form class="fragrance-form">
        <div class="note-selection">
          <label>Heart Notes:</label>
          <div class="button-group">
            <button
              v-for="note in heartNotes"
              :key="'heart-' + note"
              :class="{ active: selectedHeartNotes.includes(note) }"
              @click="toggleHeartNote(note)"
              type="button"
              :disabled="selectedHeartNotes.length >= 2 && !selectedHeartNotes.includes(note)"
            >{{ note }}</button>
          </div>
        </div>
      </form>

      <!-- Base Notes Form -->
      <form class="fragrance-form">
        <div class="note-selection">
          <label>Base Notes:</label>
          <div class="button-group">
            <button
              v-for="note in baseNotes"
              :key="'base-' + note"
              :class="{ active: selectedBaseNotes.includes(note) }"
              @click="toggleBaseNote(note)"
              type="button"
              :disabled="selectedBaseNotes.length >= 2 && !selectedBaseNotes.includes(note)"
            >{{ note }}</button>
          </div>
        </div>

        <!-- Additional Notes Section -->
        <div class="additional-notes">
          <h2>Select Season:</h2>
          <div>
            <select v-model="season">
              <option v-for="s in seasons" :key="s">{{ s }}</option>
            </select>
          </div>
          <div class="fragrance-notes">
            <h2>By You</h2>
            <h3>Top Notes: {{ selectedTopNotes }}</h3>
            <h3>Heart Notes: {{ selectedHeartNotes }}</h3>
            <h3>Base Notes: {{ selectedBaseNotes }}</h3>
          </div>
          <button class="addToCart" @click="addCustom()">Create By You</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { productService } from '../../services/productServices';
import { cartService } from '../../services/cartServices';

export default {
  data() {
    return {
      topNotes: ["Citrus", "Floral", "Fruity", "Herbal", "Aquatic", "Woody", "Spicy", "Aromatic", "Powdery", "Green","Fresh","Musky"],
      heartNotes: ["Spicy", "Woody", "Aromatic", "Powdery", "Green", "Citrus", "Floral", "Fruity", "Herbal", "Aquatic"],
      baseNotes: ["Musky", "Vanilla", "Amber", "Oriental", "Sweet", "Citrus", "Floral", "Fruity", "Herbal", "Aquatic"],
      seasons: ["Spring", "Summer", "Autumn", "Winter"], 
      selectedTopNotes: [],
      selectedHeartNotes: [],
      selectedBaseNotes: [],
      season: ""
    };
  },
  methods: {
    toggleTopNote(note) {
      this.toggleNote(note, 'selectedTopNotes');
    },
    toggleHeartNote(note) {
      this.toggleNote(note, 'selectedHeartNotes');
    },
    toggleBaseNote(note) {
      this.toggleNote(note, 'selectedBaseNotes');
    },
    toggleNote(note, noteType) {
      const selectedNotes = this[noteType];
      if (selectedNotes.includes(note)) {
        this[noteType] = selectedNotes.filter(item => item !== note);
      } else if (selectedNotes.length < 2) {
        this[noteType].push(note);
      }
    },
    addCustom() {
  console.log('Adding custom fragrance...');
  console.log('Selected top notes:', this.selectedTopNotes);
  console.log('Selected heart notes:', this.selectedHeartNotes);
  console.log('Selected base notes:', this.selectedBaseNotes);
  console.log('Selected season:', this.season);

  // Fetch the custom fragrance details from the backend
  productService.create("By You", 109.99, this.season, this.getDescription(), this.getBaseNotes(), this.getHeartNotes(), this.getTopNotes(), "Yes")
    .then(result => {
      console.log("Custom fragrance successfully created:", result);
      // Add the custom fragrance to the cart
      this.addToCart(result);
    })
    .catch(error => {
      console.error('Error creating custom fragrance:', error);
    });
},


    getDescription() {
      return "An essence where individuality meets sustainability. Craft your own signature scent, uniquely tailored to reflect your essence. With eco-conscious ingredients and packaging, 'By You' not only celebrates your identity but also nurtures the planet. Embrace sustainability while expressing yourself with 'By You'.";
    },

    getBaseNotes() {
      return this.selectedBaseNotes.join(", ");
    },

    getHeartNotes() {
      return this.selectedHeartNotes.join(", ");
    },

    getTopNotes() {
      return this.selectedTopNotes.join(", ");
    },

    addToCart(product) {
      // Assuming user ID is available in localStorage
      let userId = localStorage.getItem('user_id');
      userId = parseInt(userId);

      // Prepare cart item data
      const cartItem = {
        fragrance_id: product.fragrance_id,
        price: product.price,
        user_id: userId,
        quantity: 1 // Assuming default quantity is 1
      };

      // Add the custom fragrance to the cart
      cartService.addToCart(cartItem)
        .then(() => {
          console.log('Custom fragrance added to cart successfully:', product.name);
        })
        .catch(error => {
          console.error('Error adding custom fragrance to cart:', error);
        });
    }
  }
};
</script>

<style scoped>
.fragrance-customization {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.description {
  max-width: 800px;
  text-align: center;
  margin-bottom: 20px;
}

.description h2 {
  font-size: 28px;
  color: #333;
  margin-bottom: 10px;
}

.description p {
  font-size: 18px;
  color: #666;
}

.form-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.fragrance-form {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  width: 100%;
}

.note-selection {
  margin-bottom: 20px;
}

.label {
  display: block;
  margin-bottom: 5px;
  color: #333;
  font-weight: bold;
}

.button-group {
  display: flex;
  flex-wrap: wrap; /* Changed to wrap to make buttons go to the next line */
  width: 100%;
  gap: 5px;
  justify-content: flex-start;
}

button {
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  width: auto; /* Changed to auto to fit button content */
}

button.active {
  background-color: #0056b3;
}

button[disabled] {
  background-color: #ccc;
  cursor: not-allowed;
}

button[type="submit"] {
  width: 100%;
}

.additional-notes {
  margin-top: 20px;
}

.fragrance-notes {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
}

.fragrance-notes h4 {
  margin-bottom: 5px;
}

.fragrance-notes p {
  margin: 5px 0;
}

button.addToCart {
  margin-top: 10px;
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
  overflow: hidden; /* Ensure child elements don't overflow */
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

</style>
