<script setup>
import { onMounted, ref } from 'vue'
import TutorialDataService from '../services/TutorialDataService'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const currentTutorial = ref(null)
const message = ref('')

function getTutorial(id) {
  TutorialDataService.findById(id)
    .then((response) => {
      console.log(response.data)
      currentTutorial.value = response.data
    })
    .catch((e) => console.log(e))
}
function updatePublished(status) {
  const data = {
    id: currentTutorial.value.id,
    title: currentTutorial.value.title,
    description: currentTutorial.value.description,
    published: status
  }
  TutorialDataService.update(currentTutorial.value.id, data)
    .then((response) => {
      console.log(response.data)
      currentTutorial.value.published = status
      message.value = 'El estado fué actualizado correctamente'
    })
    .catch((e) => console.log(e))
}
function updateTutorial() {
  TutorialDataService.update(currentTutorial.value.id, currentTutorial.value)
    .then((response) => {
      console.log(response.data)
      message.value = 'El tutorial fué actualizado correctamente'
    })
    .catch((e) => console.log(e))
}
function deleteTutorial() {
  TutorialDataService.delete(currentTutorial.value.id)
    .then(() => {
      router.push({ name: 'tutorial-list' })
    })
    .catch((e) => console.log(e))
}
onMounted(() => {
  message.value = ''
  getTutorial(route.params.id)
})
</script>

<template>
  <div v-if="currentTutorial" class="edit-form">
    <h4>Tutorial</h4>
    <form class="mb-4">
      <div class="form-group">
        <label for="title">Título</label>
        <input type="text" class="form-control" id="title" v-model="currentTutorial.title" />
      </div>
      <div class="form-group">
        <label for="description">Descripción</label>
        <input
          type="text"
          class="form-control"
          id="description"
          v-model="currentTutorial.description"
        />
      </div>
      <div class="form-group">
        <label><strong>Estado:</strong></label>
        {{ currentTutorial.published ? 'Publicado' : 'Pendiente' }}
      </div>
    </form>

    <button
      v-if="currentTutorial.published"
      class="btn btn-primary me-2"
      @click="updatePublished(false)"
    >
      Despublicar
    </button>
    <button v-else class="btn btn-primary me-2" @click="updatePublished(true)">Publicar</button>
    <button class="btn btn-danger me-2" @click="deleteTutorial">Borrar</button>
    <button type="submit" class="btn btn-success" @click="updateTutorial">Actualizar</button>
    <p class="py-4">{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Por favor pulse sobre un Tutorial...</p>
  </div>
</template>

<style scoped>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
