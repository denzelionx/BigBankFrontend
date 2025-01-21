<template>
  <div class="min-w-[75em] min-h-screen">
    <h1 class="text-6xl font-bold mt-8 mb-12">BIG BANK</h1>
    <NavBar />
    <router-view />
    <Toast ref="toast" />
  </div>
</template>

<script>
import NavBar from '@/components/nav-bar/NavBar.vue'
import Toast from '@/components/toast/MessageToast.vue' // Adjust the path as needed

export default {
  name: 'App',
  components: {
    NavBar,
    Toast
  }
}
</script>
