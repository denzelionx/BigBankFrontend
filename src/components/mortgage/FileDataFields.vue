<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div v-for="file in visibleFields" :key="file.id" class="mb-4">
      <label :class="'block items-center space-x-2'" :for="file.id">
        <font-awesome-icon :icon="file.icon" />
        <span>{{ file.label }}</span>
      </label>
      <input
        :id="file.id"
        :accept="file.accept"
        :class="{ 'cursor-not-allowed opacity-50': isEditDisabled }"
        :disabled="isEditDisabled"
        :required="!isEditDisabled && file.required"
        class="bg-transparent border rounded p-2 w-full border-gray-500"
        type="file"
        @change="file.handler"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'FileDataFields',
  props: {
    handlePdfUpload: Function,
    handleJsonUpload: Function,
    isEditDisabled: {
      type: Boolean,
      default: false
    },
    isVip: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    visibleFields() {
      return this.fields.filter((field) => !this.isVip || field.showForVip)
    }
  },

  data() {
    return {
      fields: [
        {
          id: 'pdfUpload',
          icon: 'id-card',
          label: 'Copy of Identity (PDF)',
          accept: 'application/pdf',
          required: true,
          handler: this.handlePdfUpload,
          showForVip: true
        },
        {
          id: 'appraisalReportValidationUpload',
          icon: 'file-alt',
          label: 'Appraisal Report Validation (JSON)',
          accept: 'application/json',
          required: true,
          handler: this.handleJsonUpload,
          showForVip: true
        },
        {
          id: 'recentPayslipUpload',
          icon: 'file-alt',
          label: 'Recent Payslip',
          accept: 'application/json',
          required: false,
          handler: this.handleJsonUpload,
          showForVip: false
        },
        {
          id: 'employerStatementUpload',
          icon: 'briefcase',
          label: 'Employer Statement',
          accept: 'application/json',
          required: false,
          handler: this.handleJsonUpload,
          showForVip: false
        },
        {
          id: 'intentionStatementUpload',
          icon: 'file-signature',
          label: 'Intent Statement (for temporary contracts)',
          accept: 'application/json',
          required: false,
          handler: this.handleJsonUpload,
          showForVip: false
        },
        {
          id: 'salaryBankStatementUpload',
          icon: 'file-invoice-dollar',
          label: 'Bank Statement with Salary',
          accept: 'application/json',
          required: false,
          handler: this.handleJsonUpload,
          showForVip: false
        },
        {
          id: 'purchaseAgreementUpload',
          icon: 'file-contract',
          label: 'Purchase Agreement or Purchase/Construction Agreement',
          accept: 'application/json',
          required: false,
          handler: this.handleJsonUpload,
          showForVip: true
        },
        {
          id: 'pensionDetailsUpload',
          icon: 'file',
          label: 'Pension Details (if applicable)',
          accept: 'application/json',
          required: false,
          handler: this.handleJsonUpload,
          showForVip: false
        },
        {
          id: 'annualFiguresUpload',
          icon: 'file-alt',
          label: 'Annual Figures (for self-employed)',
          accept: 'application/json',
          required: false,
          handler: this.handleJsonUpload,
          showForVip: true
        },
        {
          id: 'currentMortgageOverviewUpload',
          icon: 'file-alt',
          label: 'Current Mortgage Overview (for refinancing)',
          accept: 'application/json',
          required: false,
          handler: this.handleJsonUpload,
          showForVip: false
        },
        {
          id: 'currentHouseValuationUpload',
          icon: 'file-alt',
          label: 'Current House Valuation',
          accept: 'application/json',
          required: false,
          handler: this.handleJsonUpload,
          showForVip: false
        }
      ]
    }
  }
}
</script>

<style scoped>
input[type='file']:disabled {
  cursor: not-allowed;
}
</style>
