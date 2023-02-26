<template>
  <div class="h-[100vh] w-full bg-gray-800 text-white pt-10">

    <BackButton
    class="fixed p-5"
    @goBack="goToMainPage()"
    >

    </BackButton>

    <h1 class="text-lg text-center">В розробці</h1>
  </div>
</template>

<script>
import BackButton from "@/components/ui/Back-Button.vue";

export default {
  name: "StatisticPage",
  components: {BackButton},
  methods: {
    goToMainPage(){
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>

</style>