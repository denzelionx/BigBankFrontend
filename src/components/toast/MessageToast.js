export default {
  name: 'message-toast',
  data() {
    return {
      visible: false,
      message: '',
      type: 'success'
    }
  },
  computed: {
    typeClass() {
      return this.type === 'success' ? 'bg-green-500' : 'bg-red-500'
    }
  },
  methods: {
    showToast(message, type = 'success', duration = 5000) {
      this.message = message
      this.type = type
      this.visible = true
      setTimeout(() => {
        this.visible = false
      }, duration)
    },
    hideToast() {
      this.visible = false
    }
  }
}
