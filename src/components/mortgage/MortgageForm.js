import Toast from '@/components/toast/MessageToast.js'
import api from '@/api/api.js'
import FormFiles from '@/logic/formfiles.js'
import PersonalDataFields from '@/components/mortgage/PersonalDataFields.vue'
import FileDataFields from '@/components/mortgage/FileDataFields.vue'
import FeedbackArea from '@/components/mortgage/FeedbackArea.vue'
import { inject } from 'vue'

export default {
  name: 'MortgageForm',
  components: {
    FeedbackArea,
    Toast,
    PersonalDataFields,
    FileDataFields
  },

  setup() {
    const loggedInCustomer = inject('loggedInCustomer')
    return { loggedInCustomer }
  },

  data() {
    return { formData: this.initFormData() }
  },

  beforeRouteLeave(to, from, next) {
    if (to.path === '/mortgage/request') {
      this.formData = this.initFormData()
    }
    next()
  },

  mounted() {
    if (this.$route.params.id) {
      this.updateFromData(this.$route.params.id)
    }
  },

  watch: {
    '$route.params.id'(newId) {
      this.updateFromData(newId)
    },
    'formData.customer.email'(newEmail) {
      this.formData.request.customerEmail = newEmail
    },
    loggedInCustomer: {
      handler(newCustomer) {
        if (newCustomer) {
          this.formData.customer = { ...this.formData.customer, ...newCustomer }
        }
      },
      immediate: true
    }
  },

  computed: {
    isNew() {
      return this.$route.params.id == null
    },
    isEditDisabled() {
      const status = this.formData.request.status
      return !(status === '' || status === 'changes-requested')
    }
  },

  created() {
    this.files = new FormFiles()
  },

  methods: {
    handlePdfUpload(event) {
      this.files.handlePdfUpload.call(this, event)
    },
    handleJsonUpload(event) {
      this.files.handleJsonUpload.call(this, event)
    },
    submitForm() {
      submitForm.call(this, this.formData)
    },
    updateFromData(requestId) {
      loadFormData.call(this, requestId)
    },
    initFormData() {
      return {
        customer: {
          email: '',
          firstName: '',
          lastName: '',
          phone: '',
          address: '',
          age: 0,
          vip: false
        },
        request: {
          url: '',
          status: '',
          customerEmail: '',
          copyOfId: ''
        }
      }
    }
  }
}

/**
 * Submits the form data to the mortgage request API endpoint and redirects to the detail page upon success.
 * @param {object} formData - The form data to be submitted, including customer and request information.
 * @property {object} formData.customer - The customer data to be submitted.
 * @property {object} formData.request - The mortgage request data to be submitted.
 */
async function submitForm(formData) {
  try {
    if (this.isNew) {
      await createRequest.call(this, formData)
    } else {
      await updateRequest.call(this, formData)
    }
  } catch (error) {
    console.error('Error submitting form:', error)
    this.$root.$refs.toast.showToast('Something went wrong... Try again later.', 'error')
  }
}

/**
 * Creates a new mortgage request and navigates to the request page.
 *
 * @async
 * @function createRequest
 * @param {Object} formData - The form data containing customer and request information.
 * @throws {Error} If API calls fail or navigation encounters an error.
 */
async function createRequest(formData) {
  formData.request.customerEmail = await api.postCustomer(formData.customer)
  await api.postMortgageRequest(Object.assign(formData.request, formData.customer))

  this.$router.push({ name: 'BigBankHomeAlias' }).then(() => {
    this.$root.$refs.toast.showToast('Mortgage requested successfully', 'success')
  })
}

/**
 * Updates an existing mortgage request.
 *
 * @async
 * @function updateRequest
 * @param {Object} formData - The form data containing customer and request information.
 * @throws {Error} If API calls fail.
 */
async function updateRequest(formData) {
  formData.request.customerEmail = await api.postCustomer(formData.customer)
  await api.putMortgageRequest(formData.request)

  this.$router.push({ name: 'BigBankHomeAlias' }).then(() => {
    this.$root.$refs.toast.showToast('Mortgage request updated', 'success')
  })
}

/**
 * Loads the form data with mortgage request and associated customer data for a given request ID.
 * @param {string} requestId - The ID of the mortgage request to fetch.
 * @throws {error} Will throw an error if fetching the mortgage request or customer data fails.
 */
async function loadFormData(requestId) {
  if (requestId == null) {
    return
  }
  try {
    const request = await api.getMortgageRequest(requestId)
    this.formData.request = request
    this.formData.customer = await api.getCustomerByEmail(request.customerEmail)
    this.formData.request.customerEmail = this.formData.customer.email
  } catch (error) {
    throw new Error(`Error fetching mortgage request or customer data: ${error.message}`)
  }
}
