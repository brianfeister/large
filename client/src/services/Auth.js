import Api from '@/services/Api'

export default {
  register (credentials) {
    return Api().post('register', credentials)
      .catch(err => {
        throw err.response.data.message
      })
  }
}
