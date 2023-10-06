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
            <li class="breadcrumb-item"><a href="#">คำสั่งซื้อ</a></li>
          </ol>
        </nav>
      </h4>
    </div>
  </header>

  <div class="container">
    <h1 class="menu">รายการคำสั่งซื้อ</h1>
    <table class="table">
      <thead>
        <tr>
          <th>สินค้า</th>
          <th>จำนวน</th>
          <th>ราคา</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in cartItems" :key="index">
          <td>
            <img :src="item.image" alt="Product Image" class="product-image">
            {{ item.name }}
          </td>
          <td>{{ item.quantity }}</td>
          <td>{{ item.price * item.quantity }}</td>
        </tr>
      </tbody>
    </table>
    <div class="total-price">
      <p><b>รวมทั้งหมด: {{ calculateTotalPrice() }}</b></p>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const cartItems = JSON.parse(route.query.cartItems || '[]');

const calculateTotalPrice = () => {
  let totalPrice = 0;
  for (const item of cartItems) {
    totalPrice += item.price * item.quantity;
  }
  return totalPrice;
};


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

.menu {
  margin-top: 20px;
}

.header-logo {
  width: 70px;
  /* ปรับขนาดของรูปภาพตามที่คุณต้องการ */
  height: auto;
  /* ความสูงจะปรับอัตโนมัติตามอัตราส่วนของรูปภาพ */
}

.product-image {
  width: 150px;
  height: auto;
}

.breadcrumb a {
  color: black;
  transition: color 0.3s;
}

.total-price {
  text-align: right;
  margin-top: 20px;
  font-size: 24px;
}</style>