<script setup>
import { ref } from 'vue'
import TutorialDataService from '../services/TutorialDataService'

const tutorial = ref({ id: null, title: '', description: '', published: false })
const submitted = ref(false)

function saveTutorial() {
  const data = {
    title: tutorial.value.title,
    description: tutorial.value.description
  }
  TutorialDataService.create(data)
    .then((response) => {
      console.log(response.data)
      tutorial.value.id = response.data.id
      submitted.value = true
    })
    .catch((e) => console.log(e))
}
function newTutorial() {
  tutorial.value = {}
  submitted.value = false
}
</script>

<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group mb-2">
        <label for="title">Título</label>
        <input
          type="text"
          class="form-control"
          id="title"
          name="title"
          required
          v-model="tutorial.title"
        />
      </div>
      <div class="form-group">
        <label for="description">Descripción</label>
        <input
          type="text"
          class="form-control"
          id="description"
          name="description"
          required
          v-model="tutorial.description"
        />
      </div>

      <button @click="saveTutorial" class="btn btn-success mt-4">Enviar</button>
    </div>

    <div v-else>
      <h5>El tutorial fue enviado correctamente</h5>
      <button class="btn btn-success" @click="newTutorial">Añadir</button>
    </div>
  </div>
</template>

<style scoped>
.submit-form {
  max-width: 400px;
  margin: auto;
}
</style>
