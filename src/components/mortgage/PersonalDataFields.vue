<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div v-for="(field, key) in fields" :key="key" class="mb-4">
      <label :for="key" class="block items-center space-x-2">
        <font-awesome-icon :icon="field.icon" />
        <span>{{ field.label }}</span>
      </label>
      <input
        :id="key"
        v-model="formData.customer[key]"
        :readonly="isEditDisabled"
        :required="!isEditDisabled && field.required"
        :type="field.type"
        class="bg-transparent border rounded p-2 w-full border-gray-500"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PersonalDataFields',
  props: {
    formData: {
      type: Object
    },
    isEditDisabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      fields: {
        firstName: { label: 'First Name', icon: 'user', type: 'text', required: false },
        lastName: { label: 'Last Name', icon: 'user', type: 'text', required: false },
        age: { label: 'Age', icon: 'calendar-alt', type: 'number', required: false },
        email: { label: 'Email', icon: 'envelope', type: 'email', required: true },
        phone: { label: 'Phone', icon: 'phone', type: 'tel', required: false },
        address: { label: 'Address', icon: 'map-marker-alt', type: 'text', required: false }
      }
    }
  }
}
</script>

<style scoped></style>
