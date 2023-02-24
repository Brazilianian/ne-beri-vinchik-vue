<template>
  <div class="text-white p-5 fixed">
    <font-awesome-icon icon="circle-chevron-left"
                       class="h-10 hover:cursor-pointer "
                       @click="this.$router.go(-1)"/>
  </div>
</template>

<script>
export default {
  name: "Back-Button"
}
</script>

<style scoped>

</style>