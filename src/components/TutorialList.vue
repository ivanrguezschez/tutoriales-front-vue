<script setup>
import { onMounted, ref } from 'vue'
import TutorialDataService from '../services/TutorialDataService'

const tutoriales = ref([])
const currentTutorial = ref(null)
const currentIndex = ref(-1)
const title = ref('')

function retrieveTutorials() {
  TutorialDataService.findAll()
    .then((response) => {
      console.log(response.data)
      tutoriales.value = response.data
    })
    .catch((e) => console.log(e))
}
function refreshList() {
  retrieveTutorials()
  currentTutorial.value = null
  currentIndex.value = -1
}
function setActiveTutorial(tutorial, index) {
  currentTutorial.value = tutorial
  currentIndex.value = tutorial ? index : -1
}
function removeAllTutorials() {
  TutorialDataService.deleteAll()
    .then((response) => {
      console.log(response.data)
      refreshList()
    })
    .catch((e) => {
      console.log(e)
    })
}
function searchTitle() {
  TutorialDataService.findByTitle(title.value)
    .then((response) => {
      console.log(response.data)
      tutoriales.value = response.data
      setActiveTutorial(null)
    })
    .catch((e) => {
      console.log(e)
    })
}
onMounted(() => {
  retrieveTutorials()
})
</script>

<template>
  <div class="list row">
    <div class="col-md-12">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Buscar por título" v-model="title" />
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" @click="searchTitle">
            Buscar
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Lista Tutoriales</h4>
      <ul class="list-group mb-4">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(tutorial, index) in tutoriales"
          :key="index"
          @click="setActiveTutorial(tutorial, index)"
        >
          {{ tutorial.title }}
        </li>
      </ul>

      <button class="btn btn-danger" @click="removeAllTutorials">Borrar Todos</button>
    </div>
    <div class="col-md-6">
      <div v-if="currentTutorial">
        <h4>Tutorial</h4>
        <div>
          <label><strong>Título:</strong></label> {{ currentTutorial.title }}
        </div>
        <div>
          <label><strong>Descripción:</strong></label> {{ currentTutorial.description }}
        </div>
        <div>
          <label><strong>Estado:</strong></label>
          {{ currentTutorial.published ? 'Publicado' : 'Pendiente' }}
        </div>

        <RouterLink :to="'/tutoriales/' + currentTutorial.id" class="btn btn-warning mt-4">
          Editar
        </RouterLink>
      </div>
      <div v-else>
        <br />
        <p>Por favor pulse sobre un Tutorial...</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
