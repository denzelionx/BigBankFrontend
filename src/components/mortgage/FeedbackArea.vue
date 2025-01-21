<template>
  <div class="pl-6 w-1/3">
    <h2 class="text-lg font-semibold mb-4 flex items-center space-x-2">
      <font-awesome-icon icon="comment" />
      <span>Feedback</span>
    </h2>
    <textarea
      v-model="formData.request.feedback"
      class="w-full h-64 p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="No feedback yet..."
      readonly
    ></textarea>
  </div>
</template>

<script>
export default {
  name: 'FeedbackArea',
  props: ['formData']
}
</script>
