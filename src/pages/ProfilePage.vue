<template>
  <div class="text-white min-h-[100vh] bg-gray-800">

    <BackButton
        class="text-white p-5 fixed"
        @goBack="goToMainPage()"
    >
    </BackButton>

    <div class="" v-if="!notFound">

      <div class="grid xl:grid-flow-col  flex justify-around p-2.5">
        <div
            v-if="mediaList.length !== 0"
            v-for="media in mediaList"
            class="pb-5"
        >

          <Media
              :media="media"
              :class-name="'md:h-[80vh] w-[90vw] md:w-auto border border-black mx-auto'"
          >
          </Media>
        </div>
        <div
            v-if="mediaList.length === 0"
        >
          <CustomSpinner
              :class="'h-20'">
          </CustomSpinner>
        </div>

      </div>

      <div class="text-right m-5 text-gray-500 italic" v-if="profile.date">
        Знайдено {{ getDateFormat(new Date(profile.date)) }} <br>
        <span v-if="profile.date !== profile.last_modified">
        Останній раз помічено {{ getDateFormat(new Date(profile.last_modified)) }}
        </span>
      </div>

      <hr v-if="!isSearching" class="rounded-lg w-3/4 ml-[12.5%]">

      <div class="text-center p-2 md:grid md:grid-cols-4 whitespace-pre-wrap" v-if="!isSearching">
        <div class="md:col-start-2 md:col-end-4 ">
          <h1 class="text-4xl mb-3">{{ profile?.name }} - {{ profile.age }}</h1>
          <h3 class="text-3xl">{{ profile.city }}</h3>
          <h3 class="text-lg">{{ profile.description }}</h3>
          <h3 class="text-lg text-blue-500" v-if="profile.tgLink">
            <a :href="profile.tgLink">tg: {{ profile.name }}</a>
          </h3>
          <h3 class="text-lg text-blue-500" v-if="profile.instLink">
            <a :href="profile.instLink">inst: {{ profile.name }}</a>
          </h3>
        </div>
      </div>
    </div>


    <div class="text-center text-white md:static flex justify-center align-middle h-full" v-if="notFound">
      <h1 class="text-xl italic">Анкети не знайдено :(</h1>
    </div>

  </div>
</template>

<script>
import {getProfileById} from "@/service/profile_service";
import Profile from "@/components/Profile.vue";
import {modifyType, getMediaByProfileId, getContent, blobToBase64} from "@/service/media_service";
import Media from "@/components/Media.vue";
import BackButton from "@/components/ui/Back-Button.vue";
import CustomSpinner from "@/components/ui/Spinner.vue";


export default {
  name: "ProfilePage",
  components: {CustomSpinner, BackButton, Media, Profile},
  data() {
    return {
      profile: {},
      notFound: false,
      mediaList: [],
      isSearching: false
    }
  },

  methods: {
    goToMainPage() {
      this.$router.go(-1)
    },

    getProfile() {
      this.isSearching = true
      getProfileById(this.$route.params.id)
          .then(res => {
            this.profile = res
            this.getMedia()
            this.isSearching = false
          })
          .catch(() => {
            this.notFound = true
            this.isSearching = false
          })
    },

    getMedia() {
      if (this.$route.params.id) {
        getMediaByProfileId(this.$route.params.id).then(mediaList => {
          mediaList.forEach(media => {
            getContent(media.name).then(blob => {
              blobToBase64(blob).then(base64 => {
                media.content = base64.split(',')[1]
                this.mediaList.push(media)
              })
            })
          });
          modifyType(mediaList);
        })
      } else {
        this.getMedia()
      }
    },

    getDateFormat(date) {
      const americanDateTime = new Intl.DateTimeFormat("ru-UA").format;
      return americanDateTime(date)
    }
  },

  mounted() {
    this.getProfile()
  },

  created() {
    document.title = 'Не бери вінчік - Знайди своїх знайомих!'
  }
}

</script>

<style scoped>

</style>