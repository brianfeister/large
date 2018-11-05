import Api from '@/services/Api'

const getErrMsgFromRes = err => {
  return err.response.data.error || err.response.data.message || 'Unknown error'
}

export default {
  register (credentials) {
    return Api().post('register', credentials)
      .catch(err => {
        const errMsg = getErrMsgFromRes(err)
        console.error(errMsg)
        throw errMsg
      })
  },
  login (credentials) {
    return Api().post('login', credentials)
      .catch(err => {
        const errMsg = getErrMsgFromRes(err)
        console.error(errMsg)
        throw errMsg
      })
  }
}
