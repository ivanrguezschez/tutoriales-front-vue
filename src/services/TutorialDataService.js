import http from '../http-common'

class TutorialDataService {
  findAll() {
    return http.get('/tutoriales')
  }

  findById(id) {
    return http.get(`/tutoriales/${id}`)
  }

  findByTitle(title) {
    return http.get(`/tutoriales?title=${title}`)
  }

  findByPublished() {
    return http.get('/tutoriales/publicados')
  }

  create(data) {
    return http.post('/tutoriales', data)
  }

  update(id, data) {
    return http.put(`/tutoriales/${id}`, data)
  }

  delete(id) {
    return http.delete(`/tutoriales/${id}`)
  }

  deleteAll() {
    return http.delete('/tutoriales')
  }
}

export default new TutorialDataService()
