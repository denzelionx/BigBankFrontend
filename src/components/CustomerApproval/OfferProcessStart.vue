<template>
  <div>
    <div>
      <div class="bg-white p-6 rounded shadow-md">
        <h1 class="text-lg font-semibold mb-4">Approve a Mortgage</h1>
         <div class="mb-4">
            <label class="block" for="mortgageId">Your Mortgage ID</label>
          </div>
          <form @submit.prevent="retrieveMortgage">
            <input
              id="mortgageId"
              v-model="ApprovalData.approval.id"
              class="border rounded p-2 w-full"
              type="text"
            />
         
              <button class="bg-blue-500 text-white rounded p-2 w-full"  type="submit">Retrieve</button>
            </form>


      <div v-if="JSON.stringify(ApprovalData.fullRequest) != '{}'">
      {{ApprovalData.fullRequest}}
      <form @submit.prevent="sumbitApproval">
      <p>
      <font-awesome-icon icon="house" />
          Mortgage ID
          <input
            id="mortgageId"
            v-model="ApprovalData.approval.id"
            class="border rounded p-2 w-full"
            type="text"
            disabled=true
          />
      </p>

       <p>
       <font-awesome-icon icon="percent" />
          Base rate
          <input
            id="mortgageRate"
            v-model="ApprovalData.approval.baseRate"
            class="border rounded p-2 w-full"
            type="number"
            disabled=true
          />
      </p>

      <p>
       <font-awesome-icon icon="calendar-days" />
          Interest Rate period (in years)
          <input
            id="mortgageLength"
            v-model="ApprovalData.fullRequest.desiredInterestRatePeriod"
            class="border rounded p-2 w-full"
            type="number"
            disabled=true
          />
      </p>

       <p>
          <font-awesome-icon :icon="['fas', 'money-check-dollar']" />
          Interest Rate period (in years)
          <input
            id="mortgageAmount"
            v-model="ApprovalData.fullRequest.requestedAmount"
            class="border rounded p-2 w-full"
            type="number"
            disabled=true
          />
      </p>
      
      <p> 
        </br>
        Would you like to continue with this request and make it an official offer?
        </br>
        </br>
      </p>
      <input type="radio" id="approved" value="approved" v-model="ApprovalData.request.status">
      <label for="approved">Agree</label><br>
      <input type="radio" id="rejected" value="rejected" v-model="ApprovalData.request.status">
      <label for="rejected">Dismiss</label><br>

      <button 
       id="mortgageIdpreview22"
      v-bind:class="(ApprovalData.request.status == 'approved') ? 
                    'bg-green-500 text-white rounded p-2 w-full ': 
                    'bg-red-500 text-white rounded p-2 w-full'" 
        @click="sumbitApprovaldecision">
        Sumbit {{ApprovalData.request.status}}
      </button>
      </form>

      
</div>

      </div>
    </div>
  </div>
</template>

<script src="./OfferProcessStart.js"></script>

<style scoped></style>
