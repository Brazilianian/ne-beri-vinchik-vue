<template>
  <div class="text-white min-h-[100vh] dark:bg-gray-800">

    <div class="text-white p-5 fixed">
      <font-awesome-icon icon="circle-chevron-left"
                         class="h-10 hover:cursor-pointer "
                         @click="this.$router.go(-1)"/>
    </div>

    <div class="" v-if="!notFound">

      <div class="grid xl:grid-flow-col  flex justify-around p-2.5">
        <div
            v-for="media in profile.media"
            class="pb-5"
        >

          <Media
              :media="media"
              :class-name="'md:h-[80vh] w-[90vw] md:w-auto border border-black'"
          >
          </Media>
        </div>

      </div>

      <div class="text-right m-5 text-gray-500 italic" v-if="profile.date">
<!--        Знайдено {{ getDateFormat(new Date(profile.date)) }}-->
      </div>

      <hr class="rounded-lg w-3/4 ml-[12.5%]">

      <div class="text-center p-2 md:grid md:grid-cols-4 whitespace-pre-wrap">
        <div class="md:col-start-2 md:col-end-4 ">
          <h1 class="text-4xl mb-3">{{ profile.name }} - {{ profile.age }}</h1>
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
      <h1 class="text-xl italic" >Анкети не знайдено :(</h1>
    </div>

  </div>
</template>

<script>
import {getProfileById} from "@/service/profile_service";
import Profile from "@/components/Profile.vue";
import {getMediaByProfileId, modifyType, getContent} from "@/service/media_service";
import Media from "@/components/Media.vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";


export default {
  name: "ProfilePage",
  components: {Media, Profile,},
  data() {
    return {
      profile: {},
      notFound: false,
      mediaList: []
    }
  },

  methods: {
    getProfile() {
      getProfileById(this.$route.params.id).then(profile => {
        this.profile = profile
        this.getMedia()
      })
    },

    getMedia() {
      getMediaByProfileId(101).then(mediaList => {
        mediaList.forEach(media => {
          getContent(media.name).then(content => {
            media.content = content
          })
        });
        modifyType(mediaList);
      })
    },

    getDateFormat(date) {
      const americanDateTime = new Intl.DateTimeFormat("ru-UA").format;
      return americanDateTime(date)
    }
  },

  mounted() {
    this.getProfile()
  },
}

</script>

<style scoped>

</style>