<template>

  <select
      v-model="selectedCity"
      @change="this.$emit('cityChange', selectedCity)"
      class="border text-sm rounded-lg block w-full p-2.5
      bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500">
    <option value="" selected>Не має значення</option>
    <option
        v-for="city in cities"
        :value="city.key"
    >{{ city.name }}</option>
  </select>

</template>

<script>

export default {
  name: "Cities",
  data() {
    return {
      selectedCity: ""
    }
  },
  props: {
    cities: new Map()
  },
}
</script>

<style scoped>

</style>