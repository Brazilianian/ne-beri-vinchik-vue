<script setup>
import {RouterView} from 'vue-router'</script>


<template>
  <router-view v-slot="{ Component }">
    <keep-alive exclude="ProfilePage">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<style>
</style>