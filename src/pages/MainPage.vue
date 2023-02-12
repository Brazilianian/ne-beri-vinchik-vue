<template>
  <div class="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-1 bg-black min-h-[100vh]">
    <Filter
        @search="searchByFilter">
    </Filter>

    <div class="col-start-1 md:col-start-2 lg:col-end-6 md:col-end-5 sm:col-end-4 cold-end-3 border rounded-lg m-2">
      <h1
          class="text-gray-500 italic ml-5 mt-1"
          v-if="profiles.length !== 0"
      >
        Знайдено: {{ totalElements.toLocaleString('ru') }} анкет
      </h1>
      <div class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
        <Profile
            v-for="profile in profiles"
            :key="profile.id"
            :profile="profile"
            class="mx-2 my-2 "
        ></Profile>
      </div>

      <div class="text-center text-white md:mt-3 md:static flex justify-center align-middle" v-if="profiles.length === 0">
        <h1 class="text-xl italic" >Анкети не знайдено :(</h1>
      </div>

    </div>
  </div>
</template>

<script>
import { getProfiles } from "@/service/profile_service"
import Profile from "@/components/Profile.vue";
import Filter from "@/components/filter/Filter.vue";

export default {
  name: "MainPage",
  components: {Filter, Profile},
  data() {
    return {
      profiles: [],
      count: 28,
      numberOfPage: 0,
      filter: {},
      totalElements: 0,
    }
  },

  methods: {
    searchByFilter(filter) {
      this.filter = filter
      this.refreshData()
      this.getProfiles(this.count, this.numberOfPage, filter)
      this.isSearching = true
    },

    refreshData() {
      this.profiles = []
      this.numberOfPage = 0
    },

    getNextProfiles() {
      let bottomOfWindow = document.documentElement.offsetHeight - (document.documentElement.scrollTop + window.innerHeight) < 150;
      if (bottomOfWindow) {
        this.getProfiles(this.count, ++this.numberOfPage, this.filter)
      }
    },

    getProfiles(count, numberOfPage, filter) {
      getProfiles(count, numberOfPage, filter).then(profiles => {
        profiles.forEach(profile => {
          this.profiles.push(profile)
        })
      })
    },
  },

  activated() {
    document.addEventListener('scroll', this.getNextProfiles)
  },

  deactivated() {
    document.removeEventListener('scroll', this.getNextProfiles)
  },

  mounted() {
    this.getNextProfiles()
  },
}
</script>

<style scoped>
</style>