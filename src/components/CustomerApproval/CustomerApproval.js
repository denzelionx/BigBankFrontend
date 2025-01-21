import Toast from '@/components/toast/MessageToast.js'
import api from '@/api/api.js'

export default {
  name: 'CustomerApproval',
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
      this.ApprovalData.approval.id = this.$route.params.id
      this.retrieveMortgage();
    }
  },

  watch: {
    '$route.params.id'(newId) {
      this.retrieveMortgage(newId);
    }
  },

  methods: {
    retrieveMortgage() {
      retrieveMortgage.call(this)
    },
   
    sumbitApprovaldecision : function(event) {
      sumbitApprovaldecision.call(this, this.ApprovalData)
    },
    updateFromData(requestId) {
      updateFromData.call(this, requestId)
    },
    validateRequest() {
     return validateRequest.call(this)
    },
    mortgageExpired() {
      return mortgageExpired.call(this)
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
    this.ApprovalData.approval.companyApproved = request.status;
   
    console.log("request" + request);
    this.ApprovalData.fullRequest = request;
    console.log("approval" + this.ApprovalData);
    return true;
   
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
    if(this.ApprovalData.request.status == "rejected") {
      api.deleteMortgageRequest(this.ApprovalData.approval.id);
      this.$router.push({ name: 'BigBankHome'})
      
    }else{
        this.$router.push({ name: 'StartMortgageApproval', params: { id: ApprovalData.approval.id , start: true} }).then(() => {
        this.$root.$refs.toast.showToast('Decision about the offer has been sent', 'success')})
    }
  } catch (error) {
    console.error('Error submitting form:', error)
    this.$root.$refs.toast.showToast('Something went wrong... Try again later.', 'error')
  }
}

function validateRequest() {
  if(JSON.stringify(this.ApprovalData.fullRequest) == '{}'){
    console.log("JSON stringify")
    return false;
  }
  if(mortgageExpired()){
    console.log("Expire date");
    return false;
  }
  return true;
}

function mortgageExpired() {
  if(this.ApprovalData.fullRequest != "{}"){
    const expireDate = Date.parse(this.ApprovalData.fullRequest.interestRateExpirationDate.toString());
    if(expireDate - Date.now() < 0)
    {
      return false;
    }
    return true;
  }
}