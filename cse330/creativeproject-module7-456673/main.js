var app = new Vue({
  el: '#app',
  data: {
    products: [
      {category: 'Socks', articles: [
        {id: 1, name: 'Rainbow', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5nqDvm_plo2saL3d07SwTRPUhM_eu3rBCBuBrEWWrVCQafI_tpM1LCxT-tlcE7PO8SEScYVP9&usqp=CAc', price: 9, show: true, likes:20},
        {id: 2, name: 'Egg', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvYv9YMUXwaI7Vxhj-10xUVXJOXegirdO77gcBDJf-HrRflYD9aiBiRvk8by8AZiv8_Nte7w&usqp=CAc', price: 7, show: true, likes:3},
        {id: 3, name: 'M&M', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfknbuPMCKFw7CTlfrMmJzbPdKjKZUVMlQVw&usqp=CAU', price: 8, show: true, likes:2},
        {id: 4, name: 'Striped', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREMdkxKgsJ46wKLEOJTqmIrQjUAgaSk2_S-Ni_Zk8F8fCbo2ZWgRz4I6DdRREH5YSIAtn_3oo&usqp=CAc', price: 12, show: true, likes:24},
        {id: 5, name: 'Plain', photo: 'https://www.dim.com/dw/image/v2/AARR_PRD/on/demandware.static/-/Sites-dim-master/default/dw00b2106a/D025WM2-0HY_01.jpg', price: 6, show: true, likes:2},
        {id: 6, name: 'Split Toe', photo: 'https://cdn.shopify.com/s/files/1/1132/3434/products/Injinji_Bedrock_Dual2_1367x.jpg?v=1589215097', price: 19, show: true, likes:1}
      ], invisible: false},
      {category: 'Shoes', articles: [
        {id: 7, name: 'Air Forces', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzQoayydWLzkib8dvvM7uK4qCT4bUm0YGoIA&usqp=CAU', price: 60, show: true, likes:0},
        {id: 8, name: 'Free Runs', photo: 'https://images.dsw.com/is/image/DSWShoes/460643_002_ss_01?$colpg$', price: 70, show: true, likes:2},
        {id: 9, name: 'Allbirds', photo: 'https://cdn.shopify.com/s/files/1/1104/4168/products/Allbirds_WL_RN_SF_PDP_Natural_Grey_BTY_10b4c383-7fc6-4b58-8b3f-6d05cef0369c_600x600.png?v=1610061677', price: 90, show: true, likes:3},
        {id: 10, name: 'Ugly Shoes', photo: 'https://cdn.shopify.com/s/files/1/1026/3407/products/CX332-Kona-OUT_large.jpg?v=1605214303', price: 48, show: true, likes:1}
      ], invisible: false},
      {category: 'Shirts', articles: [
        {id: 11, name: 'Orange Shirt', photo: 'https://m.media-amazon.com/images/I/61mSyjeYXWL._AC_UL1001_.jpg', price: 10, show: true, likes:2},
        {id: 12, name: 'Colorblock', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnn17_ZAv_aHacMPKMHuiHfePCzvUUuNzWkp3ZQ3TFCp9RCJwTRzary0lCrBrHkCX8gcuBfQQ&usqp=CAc', price: 12, show: true, likes:11},
        {id: 13, name: 'Teddy Bear', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR63YzhtDQieJoZf3zFcoP8gjE61rSurOrIinjc7qjWtp-mgILXB1EqCPdbwKg5F412DlxezvI&usqp=CAc', price: 15, show: true, likes:12},
        {id: 14, name: 'Among Us', photo: 'https://images-na.ssl-images-amazon.com/images/I/71YI5FjLNdL._AC_UX385_.jpg', price: 22, show: true, likes:8},
        {id: 15, name: 'MTV', photo: 'https://target.scene7.com/is/image/Target/GUEST_0d4e6ceb-f250-4efa-8c4c-7347cdbfafa5?wid=488&hei=488&fmt=pjpeg', price: 29, show: true, likes:44}
      ], invisible: false}
    ],
    message: 'hello',
    picked: 'yes',
    price: 100
  },

  methods: {
    filter(event) {
      var selection = event.target.value;
      selection = selection.slice(0, -1);
      if (selection != "All") {
        data = document.getElementsByClassName("categories");
        console.log(data);
        for (i = 0; i < data.length; i++) {
          data[i].style.display="none";
        }
        document.getElementById(selection).style.display="initial";
      }
      else {
        data = document.getElementsByClassName("categories");
        console.log(data);
        for (i = 0; i < data.length; i++) {
          data[i].style.display="initial";
        }
      }
    },
    cart() {
      document.getElementById("cart").style.display="block";
    },
    add(name) {
      var item = document.createElement("div");
      document.getElementById("cart");
    },
    like(id) {
      for (i = 0; i < this.products.length; i++) {
        for (j = 0; j < this.products[i].articles.length; j++) {
          if (this.products[i].articles[j].id == id) {
            this.products[i].articles[j].likes += 1;
          }
        }
      }
    },
    priceRestrict() {
      this.price = document.getElementById("pricechanger").value;
      for (i = 0; i < this.products.length; i++) {
        var k = 0;
        console.log(this.products[i].articles.length);
        for (j = 0; j < this.products[i].articles.length; j++) {
          if (this.products[i].articles[j].price > this.price) {
            document.getElementById(this.products[i].articles[j].name).style.display="none";
            k += 1;
          }
          else {
            console.log("hello");
            document.getElementById(this.products[i].articles[j].name).style.display="inline";
          }
        }
        if (k == this.products[i].articles.length) {
          this.products[i].invisible = true;
        }
        else {
          this.products[i].invisible = false;
        }
      }
    }
  }
})
