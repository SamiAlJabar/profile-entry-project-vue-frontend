import http from '../http-common'
import http_py from '../http-common_python'

class LearnInstructions {
  getHESN(data = {}) {
    return http.post('/getHESN/', data)
  }
  formHESN(data = '') {
    return http_py.get('/GetNER?sent=' + data)
  }
}

export default new LearnInstructions()
