<template>
  <div class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <router-link :to="'/profile/' + profile.id">
    <div v-if="mediaList.length !== 0">
        <Media
            :mute="true"
            :media="mediaList[0]"
        ></Media>
      <p
          class="text-gray-500 text-right p-2 italic"
          v-if="mediaList.length > 1"
      >
        Ще {{ mediaList.length - 1 }} зображення
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

import {blobToBase64, getContent, getMediaByProfileId} from "@/service/media_service";
import {modifyType} from "@/service/media_service";
import Media from "@/components/Media.vue";

export default {
  name: "Profile",
  components: {Media},
  data() {
    return {
      mediaList: []
    }
  },
  props: {
    profile: {
    },
  },

  methods: {
    getMedia() {
      getMediaByProfileId(this.profile.id).then(mediaList => {
        modifyType(mediaList);
        mediaList.forEach(media => {
          getContent(media.name).then(blob => {
            blobToBase64(blob).then(base64 => {
              media.content = base64.split(',')[1];
              this.mediaList.push(media)
            })
          })
        });
      })
    },
  },

  mounted() {
    this.getMedia()
  },

}
</script>

<style scoped>

</style>