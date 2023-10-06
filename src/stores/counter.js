import { defineStore } from 'pinia'


export const useProductStore = defineStore('product', {
  state: () => ({
    productList: [
      { name: ' Dark Spot Bright Serum ', price: 789, image:'/src/assets/clear-dark.jpg'},
      { name: ' Vitamin C Concentrate Super Serum  ', price: 589, image:'/src/assets/clear-c.jpg' },
      { name: ' UV Sun Serum SPF50+ PA++++ ', price: 500, image:'/src/assets/clear-uv.jpg' },
      { name: ' Acne Care Solution Cleanser ', price: 110, image:'/src/assets/clear-clean.jpg' },
      { name: ' Acne Care Solution Facial Serum', price: 690, image:'/src/assets/clear-facialse.jpg' },
      { name: ' Intensive Facial Black Mask', price: 140, image:'/src/assets/CLEAR NOSE Intensive.jpg' },
      { name: ' Aloe Vera Soothing Brightening Gel', price: 49, image:'/src/assets/clear-gel.jpg' },
      { name: ' Acne Gel Concentrate Solution Care ', price: 49, image:'/src/assets/CLEAR NOSE Acne Gel.jpg' },
      { name: ' Acne Care Solution BB', price: 400, image:'/src/assets/BB.jpg' },
      { name: ' Acne Care Solution BB 4g', price: 49, image:'/src/assets/bbsong.jpg' },
    ],
  }),
  getters: {
    getProductList() {
      return this.productList;
    },
  },
  actions: {
    
  },
});