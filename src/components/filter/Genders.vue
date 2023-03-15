<template>

  <select
      v-model="selectedGender"
      @change="this.$emit('genderChange', selectedGender)"
      id="countries"
      class="border text-sm rounded-lg block w-full p-2.5
      bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500">>
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