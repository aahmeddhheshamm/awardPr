import axios from '../../../services/axios'
export default {
  getAllAwards () {
    return axios().get('api/awards/getAllAwards')
  },
  // addMainInfo (payload) {
  //   return axios().post('api/awards/AddAward', payload)
  // },
  addAward (newData) {
    return new Promise((resolve, reject) => {
      axios().post('api/awards/addAward', newData).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
