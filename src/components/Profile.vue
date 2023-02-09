<template>
  <div class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <router-link :to="'/profile/' + profile.id">
    <div v-if="profile.media">
        <Media
            :media="profile.media[0]"
        ></Media>
      <p
          class="text-gray-500 text-right p-2 italic"
          v-if="profile.media.length > 1"
      >
        Ще {{ profile.media.length - 1 }} зображення
      </p>
    </div>

    <div class="p-5">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {{ profile.name }} - {{ profile.age }}
      </h5>

      <p class="mb-3 font-normal text-white">
        {{ profile.description }}
      </p>
      <a v-if="profile.tgLink" :href="profile.tgLink">
      </a>
    </div>
    </router-link>
  </div>

</template>

<script>

import {getMediaByProfileId} from "@/service/profile_service";
import {modifyType} from "@/service/media_service";
import Media from "@/components/Media.vue";

export default {
  name: "Profile",
  components: {Media},
  props: {
    profile: {},
  },

  methods: {
    loadMediaForProfile() {
      if (this.profile.id) {
        getMediaByProfileId(this.profile.id).then(media => {
          this.profile.media = media
          modifyType(this.profile.media)
        })
      }
    },


  },

  mounted() {
    // this.loadMediaForProfile()
  },

  activated() {

  }

}
</script>

<style scoped>

</style>