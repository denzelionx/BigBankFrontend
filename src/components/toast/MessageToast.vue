<template>
  <div
    v-if="visible"
    :class="[
      'fixed bottom-10 left-1/2 transform -translate-x-1/2 px-8 py-4 rounded-lg shadow-lg text-white text-xl', // Updated padding and font size
      typeClass
    ]"
    @click="hideToast"
  >
    {{ message }}
  </div>
</template>

<script src="./MessageToast.js"></script>
