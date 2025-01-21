import Toast from '@/components/toast/MessageToast.js'
import api from '@/api/api.js'

export default {
  name: 'OfferProcessStart',
  components: {
    Toast
  },

  data() {
    return {
      ApprovalData: {
        approval: {
          id : "",
          baseRate: 0,
          requestedAmount: '',
          companyApproved: ''
        },
        request: {
          url: '',
          status: 'rejected'
        },
        fullRequest:{}
      }
    }
  },

  mounted() {
    if (this.$route.params.id) {
        this.ApprovalData.approval.id = this.$route.params.id;
        console.log(this.ApprovalData.approval.id);
        api.startProcess(this.ApprovalData.approval.id);
    }
  },

  watch: {
    '$route.params.id'(newId) {
        api.startProcess()
    }
  },

  methods: {
    retrieveMortgage() {
      retrieveMortgage.call(this)
    },
   
    sumbitApprovaldecision : function(event) {
      
    }
  },
  computed: {
    console: () => console,
    window: () => window,
  }
}


/**
 * Updates the form data with mortgage request and associated customer data for a given request ID.
 * @param {string} requestId - The ID of the mortgage request to fetch.
 * @throws Will throw an error if fetching the mortgage request or customer data fails.
 */
async function retrieveMortgage(requestId) {
 
  try {
    const request = await api.getMortgageRequest(this.ApprovalData.approval.id)
    this.ApprovalData.approval.baseRate = request.baseRate
    this.ApprovalData.approval.companyApproved = request.status
    this.ApprovalData.fullRequest = request;
   
  } catch (error) {
    throw new Error(`Error fetching mortgage request or customer data: ${error.message}`)
  }
}


/**
 * Submits the form data to the mortgage request API endpoint and redirects to the detail page upon success.
 * @param {object} ApprovalData - The form data to be submitted, including customer and request information.
 * @property {object} ApprovalData.approval - The customer data to be submitted.
 * @property {object} ApprovalData.request - The mortgage request data to be submitted.
 */
async function sumbitApprovaldecision(ApprovalData) {
  try {
      this.$router.push({ name: 'StartMortgageApproval', params: { id: ApprovalData.approval.id } }).then(() => {
      this.$root.$refs.toast.showToast('Decision about offer has been sent', 'success')
    })
  } catch (error) {
    console.error('Error submitting form:', error)
    this.$root.$refs.toast.showToast('Something went wrong... Try again later.', 'error')
  }
}