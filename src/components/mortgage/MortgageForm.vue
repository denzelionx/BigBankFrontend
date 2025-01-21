<template>
  <div class="w-full">
    <div class="pt-6 rounded flex justify-center">
      <!-- Left side: Form -->
      <div class="w-2/3">
        <h1 class="text-lg font-semibold mb-4 flex items-center space-x-2">
          <font-awesome-icon icon="home" />
          <span>Request a Mortgage</span>
        </h1>
        <form @submit.prevent="submitForm">
          <PersonalDataFields :formData="formData" :isEditDisabled="isEditDisabled" />
          <FileDataFields
            :handleJsonUpload="handleJsonUpload"
            :handlePdfUpload="handlePdfUpload"
            :isEditDisabled="isEditDisabled"
            :isVip="formData.customer.vip"
          />

          <!-- Submit button -->
          <button
            :class="[
              'text-white rounded p-2 w-full flex items-center justify-center space-x-2 mt-4',
              isEditDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
            ]"
            :disabled="isEditDisabled"
            type="submit"
          >
            <font-awesome-icon icon="paper-plane" />
            <span>Submit</span>
          </button>
        </form>
      </div>

      <!-- Right side: Feedback text box -->
      <FeedbackArea v-if="formData.request.status === 'changes-requested'" :formData="formData" />
    </div>
  </div>
</template>

<script src="./MortgageForm.js"></script>

<style scoped></style>
