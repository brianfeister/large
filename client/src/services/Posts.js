import Api from '@/services/Api'

const getErrMsgFromRes = err => {
  return err.response.data.error || err.response.data.message || 'Unknown error'
}

export default {
  getAll (params) {
    return Api().get('posts', { params })
      .catch(err => {
        const errMsg = getErrMsgFromRes(err)
        console.error(errMsg)
        throw errMsg
      })
  },
  get (uuid) {
    return Api().get(`posts/${uuid}`)
      .catch(err => {
        const errMsg = getErrMsgFromRes(err)
        console.error(errMsg)
        throw errMsg
      })
  },
  getByUser (credentials) {
    return Api().get('posts', credentials)
      .catch(err => {
        const errMsg = getErrMsgFromRes(err)
        console.error(errMsg)
        throw errMsg
      })
  },
  create (payload) {
    return Api().post('posts', payload)
      .catch(err => {
        const errMsg = getErrMsgFromRes(err)
        console.error(errMsg)
        throw errMsg
      })
  },
  update (uuid, payload) {
    return Api().patch(`posts/${uuid}`, payload)
      .catch(err => {
        const errMsg = getErrMsgFromRes(err)
        console.error(errMsg)
        throw errMsg
      })
  },
  delete (uuid) {
    return Api().delete(`posts/${uuid}`)
      .catch(err => {
        const errMsg = getErrMsgFromRes(err)
        console.error(errMsg)
        throw errMsg
      })
  },
  // login (credentials) {
  //   return Api().post('login', credentials)
  //     .catch(err => {
  //       const errMsg = getErrMsgFromRes(err)
  //       console.error(errMsg)
  //       throw errMsg
  //     })
  // }
}
