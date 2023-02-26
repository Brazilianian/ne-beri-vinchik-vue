<template>
  <div
      class="h-[8vh] bg-amber-300 lg:w-[19%] md:w-[24%] md:ml-1 lg:ml-2 lg:mt-0 w-full
       border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-white
       flex justify-between p-2">

      <img
          @click="this.$emit('search', undefined)"
          :src="publicPath + 'icon.png'"
          class="h-full ml-2 hover:cursor-pointer">


    <div class="flex justify-end">
      <router-link to="/statistic" class="text-sm italic text-gray-400 my-auto mr-3">
        Статистика
      </router-link>
      <router-link to="/about" class="text-sm italic text-gray-400 my-auto mr-1">
        Про нас
      </router-link>

    </div>
  </div>
</template>

<script>
export default {
  name: "MenuBar",
  data() {
    return {
      // publicPath: process.env.BASE_URL
      publicPath: ''
    }
  }
}
</script>

<style scoped>

</style>