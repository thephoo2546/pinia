import { defineStore } from 'pinia'


export const useProductStore = defineStore('product', {
  state: () => ({
    productList: [
      { name: ' Dark Spot Bright Serum ', price: 789, image:'/imgs/clear-dark.jpg'},
      { name: ' Vitamin C Concentrate Super Serum  ', price: 589, image:'/imgs/clear-c.jpg' },
      { name: ' UV Sun Serum SPF50+ PA++++ ', price: 500, image:'/imgs/clear-uv.jpg' },
      { name: ' Acne Care Solution Cleanser ', price: 110, image:'/imgs/clear-clean.jpg' },
      { name: ' Acne Care Solution Facial Serum', price: 690, image:'/imgs/clear-facialse.jpg' },
      { name: ' Intensive Facial Black Mask', price: 140, image:'/imgs/CLEAR NOSE Intensive.jpg' },
      { name: ' Aloe Vera Soothing Brightening Gel', price: 49, image:'/imgs/clear-gel.jpg' },
      { name: ' Acne Gel Concentrate Solution Care ', price: 49, image:'/imgs/CLEAR NOSE Acne Gel.jpg' },
      { name: ' Acne Care Solution BB', price: 400, image:'/imgs/BB.jpg' },
      { name: ' Acne Care Solution BB 4g', price: 49, image:'/imgs/bbsong.jpg' },
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