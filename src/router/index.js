import { createRouter, createWebHistory } from 'vue-router'
import MortgageForm from '@/components/mortgage/MortgageForm.vue'
import HomePage from '@/components/home/HomePage.vue'
import CustomerApproval from '@/components/CustomerApproval/CustomerApproval.vue'
import OfferProcessStart from '@/components/CustomerApproval/OfferProcessStart.vue'

const routes = [
  { path: '/', name: 'BigBankHome', component: HomePage },
  { path: '/home', name: 'BigBankHomeAlias', component: HomePage },
  { path: '/mortgage/request', name: 'NewMortgageRequest', component: MortgageForm },
  { path: '/mortgage/request/:id', name: 'OpenMortgageRequest', component: MortgageForm },
  { path: '/mortgage/approval', name: 'MortgageApproval', component: CustomerApproval },
  { path: '/mortgage/approval/:id', name: 'OpenMortgageApproval', component: CustomerApproval },
  { path: '/mortgage/approval/:id/start', name: 'StartMortgageApproval', component: OfferProcessStart }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), // No need to manually import eslint-plugin-vue
  routes
})

export default router
