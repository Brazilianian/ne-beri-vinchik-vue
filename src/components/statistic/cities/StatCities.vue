<template>
  <div class="border rounded-lg p-2 overflow-y-auto">
    <div
        v-for="city in cities"
        class="pl-5 hover:bg-gray-500 hover:cursor-pointer"
        @click="selectCity(city.key)"
    >
      {{ city.name }}
    </div>
  </div>
</template>

<script>

export default {
  name: "StatCities",
  data() {
    return {
      selectedCity: ""
    }
  },
  props: {
    cities: new Map()
  },
  methods: {
    selectCity(selectedCity) {
      this.$emit('cityChange', selectedCity)
    }
  }
}
</script>

<style scoped>

</style>