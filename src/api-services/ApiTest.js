import http from '../http-common'

class ApiTest {
  getWelcomeMessage(data = '') {
    return http.get('/getWelcomeMessage/'+ data)
  }
}

export default new ApiTest()
