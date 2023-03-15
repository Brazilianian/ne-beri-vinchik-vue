<template>
  <div class="border rounded-lg shadow bg-gray-800 border-gray-700">
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
      <div v-else class="text-center">
        <CustomSpinner :class="'w-[10vh] mx-auto mb-4 mt-2'">
        </CustomSpinner>
      </div>

      <div class="p-5">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-white">
          {{ profile.name }} - {{ profile.age }}
        </h5>

        <h3 class="mb-2 font-bold text-xl text-white">
          {{ profile.city }}
        </h3>

        <p class="mb-3 font-normal text-white">
          {{ profile.description.length > 75 ? profile.description.substring(0, 75) + '   ...' : profile.description }}
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
import CustomSpinner from "@/components/ui/Spinner.vue";

export default {
  name: "Profile",
  components: {CustomSpinner, Media},
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