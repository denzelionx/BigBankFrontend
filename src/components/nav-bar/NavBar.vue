<template>
  <nav class="bg-gray-800 p-4">
    <div class="container mx-auto flex justify-between items-center">
      <ul class="flex space-x-4">
        <li>
          <router-link class="text-white hover:text-gray-400" to="/home">Home</router-link>
        </li>
        <li>
          <router-link class="text-white hover:text-gray-400" to="/mortgage/request">
            Request New Mortgage
          </router-link>
        </li>
        <li>
          <router-link class="text-white hover:text-gray-400" to="/mortgage/approval">
            Approve Mortgage
          </router-link>
        </li>
      </ul>

      <!--  Login button  -->
      <div class="flex items-center space-x-4">
        <span v-if="customer" class="text-white">
          Welcome {{ customer.firstName }} {{ customer.lastName }}
          <span v-if="customer.vip" class="text-yellow-400"
            >(VIP) <font-awesome-icon :icon="['fas', 'star']"
          /></span>
        </span>
        <LoginButton :isLoggedIn="!!customer" @login="handleLogin" @logout="handleLogout" />
      </div>
    </div>
  </nav>
</template>

<script src="./NavBar.js"></script>
