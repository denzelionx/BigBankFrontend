<template>
  <div class="relative login-button">
    <button
      :class="[
        'font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline',
        isLoggedIn
          ? 'bg-red-500 hover:bg-red-600 text-white'
          : 'bg-blue-500 hover:bg-blue-600 text-white'
      ]"
      @click="togglePrompt"
    >
      <font-awesome-icon
        :icon="isLoggedIn ? ['fas', 'right-from-bracket'] : ['fas', 'right-to-bracket']"
      />
      {{ isLoggedIn ? 'Logout' : 'Login' }}
    </button>

    <div
      v-if="showPrompt && !isLoggedIn"
      class="absolute right-0 mt-2 p-4 bg-white rounded shadow-lg"
      @click.stop
    >
      <form class="flex flex-col" @submit.prevent="handleSubmit">
        <input
          ref="emailInput"
          v-model="email"
          class="border rounded px-2 py-1 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your email"
          required
          type="email"
        />
        <button
          class="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          <font-awesome-icon :icon="['fas', 'key']" />
        </button>
      </form>
      <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
    </div>
  </div>
</template>

<script src="./LoginButton.js"></script>
