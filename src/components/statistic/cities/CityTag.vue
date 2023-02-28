<template>
  <div
      class="text-red-400 my-auto hover:cursor-pointer text-center"
      @click="this.$emit('cityClick', city)"
  >
    <span class="text-white pr-2">
    {{ city.name }}
    </span>
    <font-awesome-icon
        icon="xmark"
    ></font-awesome-icon>
  </div>

</template>

<script>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export default {
  name: "CityTag",
  components: {FontAwesomeIcon},
  props: {
    city: {
      key: '',
      value: ''
    }
  }
}
</script>

<style scoped>

</style>