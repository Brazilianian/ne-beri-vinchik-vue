<template>
  <font-awesome-icon icon="circle-chevron-left"
                     class="h-10 hover:cursor-pointer "
                     @click="this.$emit('goBack')"/>
</template>

<script>
export default {
  name: "Back-Button"
}
</script>

<style scoped>

</style>