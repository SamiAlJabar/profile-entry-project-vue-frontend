import http from '../http-common'

class ProfileService {
  getProfileByCreatorId(creatorId = null) {
    return http.get('/profiles/'+ creatorId)
  }
  getProfileByProfileName(creatorId = null, fullName = '') {
    return http.get('/profiles/'+ creatorId + '/profile/' + fullName)
  }
  getProfileById(creatorId = null, profileId = null) {
    return http.get('/profiles/'+ creatorId + '/id/' + profileId)
  }
  deleteProfileById(profileId = null) {
    return http.delete('/profiles/'+ profileId)
  }
  updateProfile(profileId = null, profile = {}) {
    return http.put('/profiles/' + profileId, profile)
  }
  createProfile(creatorId = null, profile = {}) {
    return http.post('/profiles/' + creatorId, profile)
  }
}

export default new ProfileService()
