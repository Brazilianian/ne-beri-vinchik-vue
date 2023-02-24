<template>

  <select
      v-model="selectedGender"
      @change="this.$emit('genderChange', selectedGender)"
      id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    <option value="" selected>Не має значення</option>
    <option
        v-for="gender in genders"
        :value="gender.key"
    >{{ gender.name }}</option>
  </select>

</template>

<script>
export default {
  name: "Genders",
  data() {
    return{
      selectedGender: ""
    }
  },
  props: {
    genders: new Map()
  }
}
</script>

<style scoped>

</style>