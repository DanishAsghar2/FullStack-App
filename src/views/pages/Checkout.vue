<template>
  <div class="container">
    <h1>Checkout Page</h1>
    <div class="dropdown">
      <button class="dropbtn">Details</button>
      <div class="dropdown-content">
        <label for="userId">Delivery:</label>
        <br/>
        <label for="userId">Free</label>
      </div>
    </div>
    <div class="dropdown">
      <button class="dropbtn">Card Details</button>
      <div class="dropdown-content">
        <label for="cardNumber">Card Number:</label>
        <input type="text" id="cardNumber" v-model="cardNumber" required><br>

        <label for="expiryDate">Expiry Date:</label>
        <input type="text" id="expiryDate" v-model="expiryDate" required><br>

        <label for="cvv">CVV:</label>
        <input type="text" id="cvv" v-model="cvv" required><br>

        <label for="firstName">First Name:</label>
        <input type="text" id="firstName" v-model="first_name" required><br>

        <label for="lastName">Last Name:</label>
        <input type="text" id="lastName" v-model="last_name" required><br>
      </div>
    </div>
    <div class="dropdown">
      <button class="dropbtn">Address</button>
      <div class="dropdown-content">
        <label for="addline1">Address Line 1:</label>
        <input type="text" id="addline1" v-model="addline1" required><br>

        <label for="addline2">Address Line 2:</label>
        <input type="text" id="addline2" v-model="addline2"><br>

        <label for="townorcity">Town/City:</label>
        <input type="text" id="townorcity" v-model="townorcity" required><br>

        <label for="postcode">Postcode:</label>
        <input type="text" id="postcode" v-model="postcode" required><br>

        <label for="phone">Phone:</label>
        <input type="text" id="phone" v-model="phone" required><br>

        <label for="country">Country:</label>
        <input type="text" id="country" v-model="country" required><br>
      </div>
    </div>
    <button class="order-btn" @click="submitForm">Submit</button>
    <div id="message">{{ message }}</div>
  </div>
</template>

<script>
import { billingService } from '../../services/billingServices';
import { cartService } from '../../services/cartServices';
import { deliveryService } from '../../services/deliveryServices';
import { ordersService } from '../../services/orderServices'

export default {
  data() {
    return {
      formData: {
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        first_name: '',
        last_name: '',
        addline1: '',
        addline2: '',
        townorcity: '',
        postcode: '',
        phone: '',
        country: '',
        items: [],
        delivery_id: null,
        billing_id: null,
        order_id: null
      },
      message: ''
    };
  },
  mounted() {
    let user_id = localStorage.getItem('user_id');
    cartService.getAll(user_id)
      .then(items => {
        this.items = items
        console.log(this.items)
      })
      .catch(error => this.error = error)
  },
  methods: {
    submitForm() {
      const user_id = parseInt(localStorage.getItem('user_id'));

      billingService.create(this.cardNumber, this.expiryDate, this.cvv, this.first_name, this.last_name,
        this.addline1, this.addline2, this.townorcity, this.postcode, this.phone, this.country, user_id)
        .then(result => {
          console.log("Billing Address Added")
          this.billing_id = parseInt(localStorage.getItem('billing_id'));
          deliveryService.create(this.first_name, this.last_name, this.addline1, this.addline2, this.townorcity,
            this.postcode, this.phone, this.country, user_id)
            .then(result => {
              console.log("Delivery Address Added")
              this.delivery_id = parseInt(localStorage.getItem('delivery_id'));
              for (let x = 0; x < this.items.length; x++) {
                let order_num = this.items[0].cart_id
                console.log(this.items[x].fragrance_id, this.delivery_id, this.billing_id, user_id, order_num)
                ordersService.create(this.items[x].fragrance_id, this.delivery_id, this.billing_id, user_id, order_num)
                  .then(result => {
                    console.log("Success")
                    this.order_id = order_num
                  })
                  .catch(error => this.error = error)
              }
              for (let y = 0; y < this.items.length; y++) {
                cartService.removeItem(this.items[y].cart_id)
                  .then(result => {
                    console.log("Item removed")
                    this.goToOrder(this.order_id)
                  })
                  .catch(error => this.error = error)
              }
            })
            .catch(error => this.error = error)

          console.log(this.delivery_id, this.billing_id)
        })
        .catch(error => this.error = error)

    },
    goToOrder(id) {
      // Navigate to Order
      this.$router.push('/order/' + id);
    },
  },
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

/* Dropdown container */
.dropdown {
  margin-bottom: 20px;
}

/* Dropdown button */
.dropbtn {
  background-color: #3498db;
  color: white;
  padding: 10px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  width: 100%;
  text-align: left;
}

/* Dropdown button on hover & focus */
.dropbtn:hover,
.dropbtn:focus {
  background-color: #2980b9;
}

/* Dropdown content */
.dropdown-content {
  display: block;
  position: relative;
  background-color: #f9f9f9;
  min-width: 200px;
  z-index: 1;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 10px;
}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown-content input:hover {
  background-color: #ddd;
}

/* Style the submit button */
button[type="submit"] {
  margin-top: 20px;
  padding: 12px 24px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
}

button[type="submit"]:hover {
  background-color: #0056b3;
}

/* Style form inputs */
input[type="text"],
input[type="number"] {
  width: 100%;
  padding: 10px;
  margin-top: 8px;
  margin-bottom: 16px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
