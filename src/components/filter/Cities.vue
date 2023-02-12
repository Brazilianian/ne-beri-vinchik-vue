<template>

  <select
      v-model="selectedCity"
      @change="this.$emit('cityChange', selectedCity)"
      id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    <option
        v-for="city in cities"
        :value="city"
    >{{ city }}</option>
  </select>

</template>

<script>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export default {
  name: "Cities",
  components: {FontAwesomeIcon},
  data() {
    return {
      selectedCity: ""
    }
  },
  props: {
    cities:[]
  },
}
</script>

<style scoped>

</style>