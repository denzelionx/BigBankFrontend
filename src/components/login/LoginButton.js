import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import api from '@/api/api.js'

export default {
  name: 'LoginButton',
  emits: ['login', 'logout'],
  props: {
    isLoggedIn: {
      type: Boolean,
      default: false
    }
  },

  setup(props, { emit }) {
    const email = ref('')
    const showPrompt = ref(false)
    const error = ref('')
    const emailInput = ref(null)

    /**
     * Toggles the login prompt or emits logout event based on login state.
     */
    const togglePrompt = () => {
      if (props.isLoggedIn) {
        emit('logout')
        window.location.reload()
        return
      }

      showPrompt.value = !showPrompt.value

      if (showPrompt.value) {
        nextTick(() => emailInput.value?.focus())
      } else {
        email.value = ''
        error.value = ''
      }
    }

    /**
     * Handles the login form submission.
     * Fetches customer data by email, emits login event if successful.
     * Sets error message if fetch fails or customer not found.
     */
    const handleSubmit = async () => {
      if (email.value) {
        try {
          const customer = await api.getCustomerByEmail(email.value)
          if (customer && customer.vip) {
            emit('login', customer)
            showPrompt.value = false
            email.value = ''
            error.value = ''
          } else {
            error.value = "Logging in is exclusively for our VIP's."
          }
        } catch (err) {
          console.error('Error fetching customer:', err)
          error.value = 'An error occurred. Please try again.'
        }
      }
    }

    /**
     * Handles clicks outside the login button component.
     * Closes the login prompt and resets fields if clicked outside.
     * @param {Event} event - The click event
     */
    const handleClickOutside = (event) => {
      const loginButton = document.querySelector('.login-button')
      if (loginButton && !loginButton.contains(event.target) && showPrompt.value) {
        showPrompt.value = false
        email.value = ''
        error.value = ''
      }
    }

    onMounted(() => {
      document.addEventListener('click', handleClickOutside)
    })

    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside)
    })

    return {
      email,
      showPrompt,
      error,
      togglePrompt,
      handleSubmit,
      emailInput
    }
  }
}
