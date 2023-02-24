<template>
  <img v-if="media.fileType==='image'"
       class="rounded-lg"
       :class="className"
       :src="'data:image/' + media.file + ';base64,' + media.content"
       alt=""/>

  <video v-if="media.fileType==='video' && mute"
         controls
         autoplay
         loop
         muted
         class="rounded-lg"
         :class="className"
         :src="'data:video/mp4;base64,' + media.content">
  </video>

  <video v-if="media.fileType==='video' && !mute"
         controls
         autoplay
         loop
         class="rounded-lg"
         :class="className"
         :src="'data:video/mp4;base64,' + media.content">
  </video>
</template>

<script>
export default {
  name: "Media",
  props: {
    media: {},
    className: "",
    mute: false
  },

}
</script>

<style scoped>

</style>