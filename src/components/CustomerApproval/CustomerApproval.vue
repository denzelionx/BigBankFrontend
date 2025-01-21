<template>
  <div>
    <div>
      <div class="bg-white p-6 rounded shadow-md">
        <h1 class="text-lg font-semibold mb-4">Approve a Mortgage</h1>
         <form @submit.prevent="retrieveMortgage()" v-show="JSON.stringify(ApprovalData.fullRequest) == '{}'">
         <div class="mb-4">
            <label class="block" for="mortgageId">Your Mortgage ID</label>
          </div>
         
              <input
                id="mortgageId"
                v-model="ApprovalData.approval.id"
                class="border rounded p-2 w-full"
                type="text"/>
              <button class="bg-blue-500 text-white rounded p-2 w-full"   type="submit">Retrieve</button>
          </form>
      <div v-if="JSON.stringify(ApprovalData.fullRequest) != '{}'">
     
      <form @submit.prevent="sumbitApproval">
        <p>
            <font-awesome-icon icon="house" />
            Mortgage ID
            <input
              id="mortgageId"
              v-model="ApprovalData.approval.id"
              class="border rounded p-2 w-full"
              type="text"
              readonly />
        </p>

        <p>
            <font-awesome-icon icon="percent" />
            Interest rate
            <input
              id="mortgageRate"
              v-model="ApprovalData.fullRequest.interestRate"
              class="border rounded p-2 w-full"
              type="number"
              readonly />
        </p>

        <p>
            <font-awesome-icon icon="calendar-days" />
            Interest Rate period (in years)
            <input
              id="mortgageLength"
              v-model="ApprovalData.fullRequest.desiredInterestRatePeriod"
              class="border rounded p-2 w-full"
              type="number"
              readonly/>
        </p>

        <p>
            <font-awesome-icon :icon="['fas', 'money-check-dollar']" />
            Requested amount
            <input
              id="mortgageAmount"
              v-model="ApprovalData.fullRequest.requestedAmount"
              class="border rounded p-2 w-full"
              type="number"
              readonly />
        </p>

          <p>
            <font-awesome-icon :icon="['fas', 'money-check-dollar']" />
            Experation date
            <input
              v-bind:class="validateRequest ? 
                          'bg-lime-100 text-black rounded p-2 w-full ': 
                          'bg-red-100 text-black rounded p-2 w-full'" 
            
              id="mortgageExpDate"
              v-model="(ApprovalData.fullRequest.interestRateExpirationDate)"
              class="border rounded p-2 w-full"
              type="text"
              readonly
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
            v-show="validateRequest"
            id="mortgageIdpreview223"
            v-bind:class="(ApprovalData.request.status == 'approved') ? 
                          'bg-green-500 text-white rounded p-2 w-full ': 
                          'bg-red-500 text-white rounded p-2 w-full'" 
            @click="sumbitApprovaldecision">
            Sumbit {{ApprovalData.request.status}}
        </button>

        <button
            v-show="!validateRequest" 
            id="mortgageIdpreview22"
            v-bind:class="(ApprovalData.request.status == 'approved') ? 
                          'bg-slate-300 text-white rounded p-2 w-full ': 
                          'bg-slate-500 text-white rounded p-2 w-full'" 
              disabled="true">
              Sumbit {{ApprovalData.request.status}}
        </button>
      </form>

      
</div>

      </div>
    </div>
  </div>
</template>

<script src="./CustomerApproval.js"></script>

<style scoped></style>
