var app = new Vue({
  el: '#app',
  data: {
    products: [
      {name: 'Rainbow', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5nqDvm_plo2saL3d07SwTRPUhM_eu3rBCBuBrEWWrVCQafI_tpM1LCxT-tlcE7PO8SEScYVP9&usqp=CAc', price: 9, quantity: 2},
      {name: 'Egg', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvYv9YMUXwaI7Vxhj-10xUVXJOXegirdO77gcBDJf-HrRflYD9aiBiRvk8by8AZiv8_Nte7w&usqp=CAc', price: 7, quantity: 1},
      {name: 'Air Forces', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzQoayydWLzkib8dvvM7uK4qCT4bUm0YGoIA&usqp=CAU', price: 60, quantity: 1},
      {name: 'Orange Shirt', photo: 'https://m.media-amazon.com/images/I/61mSyjeYXWL._AC_UL1001_.jpg', price: 9, quantity: 3},
    ],
    total: 0
  },

  methods:{
    sum() {
      var k = 0;
      for (i = 0; i < this.products.length; i++) {
        k += this.products[i].price * this.products[i].quantity;
      }
      this.total = k;
      console.log(this.total);
    },

    add(photo) {
      for (i = 0; i < this.products.length; i++) {
        if (this.products[i].photo == photo) {
          this.products[i].quantity += 1;
        }
      }
      this.sum()
    },

    remove(name) {
      for (i = 0; i < this.products.length; i++) {
        if (this.products[i].name == name) {
          this.products[i].quantity -= 1;
          if (this.products[i].quantity == 0) {
            document.getElementById(name).remove();
          }
        }
      }
      this.sum()
    },

  },

  beforeMount() {
    this.sum()
  }
})
