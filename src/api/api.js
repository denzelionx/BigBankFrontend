import axios from 'axios'

/**
 * This class provides functionalities for retrieving and storing data.
 */
class Api {
  /**
   * Fetches the mortgage request data for a given request ID.
   * @param {string} requestId - The ID of the mortgage request to fetch.
   * @returns {Promise<object>} The mortgage request data.
   * @throws Error when the fetch operation fails.
   */
  static async getMortgageRequest(requestId) {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/mortgage/request/${requestId}`
      )
      return response.data
    } catch (error) {
      throw new Error(`Failed to fetch mortgage request with ID ${requestId}: ${error.message}`)
    }
  }

  /**
   * Submits the mortgage request data to the mortgage API endpoint.
   * @param {object} mortgageData - The mortgage request data to be submitted.
   * @returns {Promise<string>} The mortgage request ID.
   * @throws Error when the mortgage request submission fails.
   */
  static async postMortgageRequest(mortgageData) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/mortgage/request`,
        mortgageData,
        config
      )
      return response.data
    } catch (error) {
      throw new Error(`Mortgage request submission failed: ${error.message}`)
    }
  }


  /**
   * deletes the mortgage request data for a given request ID.
   * @param {string} requestId - The ID of the mortgage request to delete.
   * @throws Error when the fetch operation fails.
   */

  static async deleteMortgageRequest(requestId) {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/mortgage/request/${requestId}`
      )
      return response.data
    } catch (error) {
      throw new Error(`Failed to fetch mortgage request with ID ${requestId}: ${error.message}`)
    }
  }



  /**
   * Updates mortgage request data to the mortgage API endpoint.
   * @param {object} mortgageData - The mortgage request data to update.
   * @returns {Promise<string>} The mortgage request ID.
   * @throws Error when the mortgage request update fails.
   */
  static async putMortgageRequest(mortgageData) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/mortgage/request`,
        mortgageData,
        config
      )
      return response.data
    } catch (error) {
      throw new Error(`Mortgage request update failed: ${error.message}`)
    }
  }

  /**
   * Fetches the customer data for a given email address.
   * @param {string} customerEmail - The email of the customer to fetch.
   * @returns {Promise<object>} The customer data.
   * @throws Error when the fetch operation fails.
   */
  static async getCustomerByEmail(customerEmail) {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/customer/${customerEmail}`)
      return response.data
    } catch (error) {
      throw new Error(`Failed to fetch customer data for email ${customerEmail}: ${error.message}`)
    }
  }

  /**
   * Submits the customer data to the customer API endpoint.
   * @param {object} customerData - The customer data to be submitted.
   * @returns {Promise<string>} The email of the customer.
   * @throws Error when the customer submission fails.
   */
  static async postCustomer(customerData) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/customer/add`,
        customerData,
        config
      )
      return response.data
    } catch (error) {
      throw new Error(`Customer submission failed: ${error.message}`)
    }
  }



  static async startProcess(processData) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/process/start`,
        processData,
        config
      )
      return response.data
    } catch (error) {
      throw new Error(`Customer submission failed: ${error.message}`)
    }
  }

}

export default Api
