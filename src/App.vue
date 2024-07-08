<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark px-3">
      <RouterLink to="/" class="navbar-brand">IRS</RouterLink>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <RouterLink to="/tutoriales" class="nav-link">Tutoriales</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/add" class="nav-link">Añadir</RouterLink>
        </li>
      </div>
    </nav>
    <div class="container mt-4">
      <RouterView />
    </div>
  </div>
</template>
