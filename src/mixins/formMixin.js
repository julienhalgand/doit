export default {
  data: () => {
    return {
      formSend: false,
      formShow: true,
      errorsInForm: false,
      message: {
        title: 'Tous les champs sont requis',
        content: '',
        state: ''
      }
    }
  },
  methods: {
    closeFormErrors () {
      this.errorsInForm = false
    },
    formValidator: function () {

    }
  }
}
