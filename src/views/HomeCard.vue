<template>
  <header>
    <router-link to="/">
      <img src="/src/assets/clearlogo.png" class="header-logo">
    </router-link>
    <div class="cart">
      <h4>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="#" data-bs-toggle="modal" data-bs-target="#cartModal">ตะกร้าสินค้า</a>
            </li>
            <li class="breadcrumb-item">
              <RouterLink to="/confirm">คำสั่งซื้อ</RouterLink>
            </li>
          </ol>
        </nav>
      </h4>
    </div>
  </header>

  <body>
    <div class="card-con">
      <div v-for="(product, index) in storeProduct.productList" :key="index" :id="`card${index + 1}`">
        <div class="card" style="width: 16rem;">
          <img :src="`/src/assets/${product.image}`" class="card-img-top">
          <div class="card-body">
            <h5 class="card-title"><b>{{ product.name }}</b></h5>
            <p>Price: {{ product.price }}</p>

            <div class="buttons">
              <button type="button" class="btn btn-danger btn-sm rounded-circle" @click="decrementCount(index)">-</button>
              {{ count[index] }}
              <button type="button" class="btn btn-danger btn-sm rounded-circle" @click="incrementCount(index)">+</button>
            </div>
            <div class="secon">
              <button type="button" class="btn btn-secondary" @click="addToCart(index)">เพิ่ม</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>

  <div class="modal fade" id="cartModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">ตะกร้าสินค้า</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <table class="table">
            <thead>
              <tr>
                <th class="product-column">สินค้า</th>
                <th>จำนวน</th>
                <th>ราคา</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(product, index) in cartItems" :key="index">
                <td>
                  <img :src="product.image" alt="Product Image" class="product-image">
                  {{ product.name }}
                </td>
                <td>
                  <button @click="decrementQuantity(index)" class="btn btn-sm btn-danger">-</button>
                  {{ product.quantity }}
                  <button @click="incrementQuantity(index)" class="btn btn-sm btn-danger">+</button>
                </td>
                <td>{{ product.price * product.quantity }}</td>
              </tr>
            </tbody>
          </table>
          <div class="total-price" style="text-align: right;">
            <p><b>รวม : {{ calculateTotalPrice() }}</b></p>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">ช็อปปิ้งต่อ!!</button>
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal"
            @click="confirmProducts">ยืนยันสินค้า</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useProductStore } from '../stores/counter';
import { RouterLink } from 'vue-router';
import { useRouter } from 'vue-router';

const storeProduct = useProductStore();
const count = ref(Array(storeProduct.productList.length).fill(0));
const cartItems = ref([]);
const router = useRouter();

const confirmProducts = () => {
  router.push({ name: 'confirm', query: { cartItems: JSON.stringify(cartItems.value) } });
}


const incrementCount = (index) => {
  count.value[index]++;
}

const decrementCount = (index) => {
  if (count.value[index] > 0) {
    count.value[index]--;
  }
}
const incrementQuantity = (index) => {
  cartItems.value[index].quantity++;
}

const decrementQuantity = (index) => {
  if (cartItems.value[index].quantity > 1) {
    cartItems.value[index].quantity--;
  } else {
    // ถ้าจำนวนสินค้าเหลือ 1 หรือน้อยกว่า ให้ลบสินค้าออกจากตะกร้า
    cartItems.value.splice(index, 1);
  }
}
// เพิ่มฟังก์ชันสำหรับเพิ่มสินค้าในตะกร้า
const addToCart = (index) => {
  if (count.value[index] > 0) {
    const product = storeProduct.productList[index];
    const quantity = count.value[index];
    const existingItemIndex = cartItems.value.findIndex(item => item.name === product.name);

    if (existingItemIndex !== -1) {
      // หากสินค้ามีอยู่ในตะกร้าแล้ว อัปเดตจำนวนเท่านั้น
      cartItems.value[existingItemIndex].quantity += quantity;
    } else {
      // หากสินค้ายังไม่มีในตะกร้า ให้เพิ่มในตะกร้า
      cartItems.value.push({
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: product.image, // เพิ่ม URL ของรูปภาพ
      });
    }

    // รีเซ็ตจำนวนสินค้าให้เป็น 0
    count.value[index] = 0;
  }
}

const calculateTotalPrice = () => {
  let totalPrice = 0;
  for (const product of cartItems.value) {
    totalPrice += product.price * product.quantity;
  }
  return totalPrice;
}

// ฟังก์ชันเปิด modal ตะกร้าสินค้าเมื่อกดปุ่ม "ตะกร้าสินค้า"
const openCartModal = () => {
  $('#cartModal').modal('show');
}

onMounted(() => {

});
</script>
  
<style scoped>
header {
  margin: 0;
  padding: 40px;
  background-color: #f5eb5f;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-logo {
  width: 70px;
  height: auto;
}

.product-column {
  text-align: center;
}

.cart {
  display: flex;
  align-items: center;
}

.breadcrumb a {
  color: black;
  transition: color 0.3s;
}

.card-con {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  /* 5 คอลัมน์ */
  gap: 5px;
  /* ระยะห่างระหว่างการ์ด */
  justify-content: center;
  margin: 40px auto;
  /* ชิดกลางแนวนอน */
  max-width: 800px;
  /* ขนาดสูงสุดของ container */
  flex-wrap: wrap;
  margin-bottom: 120px;
}

.card {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 20px;
  text-align: center;
  width: 16rem;
  /* กำหนดขนาดความกว้างของการ์ด */
  margin: 20px;
  /* ระยะห่างระหว่างการ์ด */
}

.product-image {
  width: 50px;
  /* ปรับความกว้างตามที่คุณต้องการ */
  height: auto;
  /* ความสูงจะปรับอัตโนมัติตามอัตราส่วนของรูปภาพ */
}

.card img {
  border-radius: 9px;
}

.card button {
  border-radius: 10px;
  margin-top: 0px;
}

.secon button {
  margin-top: 20px;
}
</style>