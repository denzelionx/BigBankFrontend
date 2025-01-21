import { inject } from 'vue'
import LoginButton from '@/components/login/LoginButton.vue'

export default {
  name: 'NavBar',
  components: {
    LoginButton
  },
  setup() {
    /**
     * Reactive reference to store the current customer data.
     * Null when no user is logged in.
     */
    const loggedInCustomer = inject('loggedInCustomer')

    /**
     * Handles the login event.
     * Updates the customer data with the logged-in user's information.
     * @param {Object} customerData - The data of the logged-in customer
     */
    const handleLogin = (customerData) => {
      loggedInCustomer.value = customerData
    }

    /**
     * Handles the logout event.
     * Clears the customer data, effectively logging out the user.
     */
    const handleLogout = () => {
      loggedInCustomer.value = null
    }

    return {
      customer: loggedInCustomer,
      handleLogin,
      handleLogout
    }
  }
}
