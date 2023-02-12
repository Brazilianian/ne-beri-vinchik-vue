<template>
  <div
      class="bg-amber-300 border lg:w-[19%] md:w-[24%] md:m-1 lg:m-2 w-full border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-white p-0.5 fixed">
    <div v-if="isOpened">
      <h2 class="text-3xl italic text-center my-2">Я шукаю...</h2>
      <hr>

      <div class="grid gap-6 mt-2 mb-6 grid-cols-2 ">
        <div class="col-start-1 col-end-3">
          <label for="age" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white italic">
            Місто
          </label>
          <Cities
              v-if="cities"
              :cities="cities"
              @cityChange="(city) => this.filter.city = city"
          ></Cities>

        </div>
        <div>
          <label for="age" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white italic">
            Від
          </label>
          <input type="number"
                 id="age-min"
                 min="1" max="99" step="1"
                 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                 placeholder="16" required
                 v-model="filter.ageMin"
          >
        </div>
        <div>
          <label for="age" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white italic">
            До
          </label>
          <input type="number"
                 id="age-max"
                 min="1" max="99" step="1"
                 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                 placeholder="18" required
                 v-model="filter.ageMax"
          >
        </div>
        <div class="col-start-1 col-end-3">
          <label for="gender" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white italic">
            Шукаю
          </label>
          <Genders
              v-if="genders"
              :genders="genders"
              @genderChange="(gender) => this.filter.gender = gender"
          >
          </Genders>
        </div>
        <div class="col-start-1 col-end-3">
          <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white italic">
            Ім'я <span class="font-normal">(aбо ім'я містить)</span>
          </label>
          <input type="text"
                 id="name"
                 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
                 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                 placeholder:italic"
                 placeholder="Аня"
                 required
                 v-model="filter.name"
          >
        </div>

        <div class="col-start-1 col-end-3">
          <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white italic">
            Опис <span class="font-normal">(aбо опис містить)</span>
          </label>
          <textarea
                 id="name"
                 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
                 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                 placeholder:italic"
                 placeholder="Обожнюю пити каву та прогулюватися нічним Києвом🖤"
                 required
                 v-model="filter.description"
          />
        </div>
      </div>

      <hr>

      <button type="button"
              class="w-full text-white mt-3 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300
               focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              @click="search"
      >
        Пошук
      </button>
    </div>



    <div class="md:hidden text-white text-center md:p-1">
      <font-awesome-icon
          v-if="isOpened"
          class="h-10"
          @click="changeIsOpened"
          icon="fa-circle-up"
      />

      <font-awesome-icon
          v-if="!isOpened"
          icon="fa-circle-down"
          @click="changeIsOpened"
          class="h-10"
      />
    </div>
  </div>
</template>

<script>

import {getCities, getGenders} from "@/service/filter_service";
import Cities from "@/components/filter/Cities.vue";
import Genders from "@/components/filter/Genders.vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";


export default {
  name: "Filter",
  components: {FontAwesomeIcon, Genders, Cities},
  data() {
    return {
      filter: {
        ageMin: 16,
        ageMax: 18
      },
      cities: [],
      genders: [],
      isOpened: true
    }
  },

  methods: {
    search() {
      this.$emit('search', this.filter)
    },

    getCities() {
      getCities()
          .then(cities => {
            this.cities = cities
          })
    },

    getGenders() {
      getGenders()
          .then(genders => {
            this.genders = genders
          })
    },

    changeIsOpened() {
      this.isOpened = !this.isOpened
    },

    setFilterIsOpened() {
      if (window.screen.width < 768) {
        this.isOpened = false
        return
      }
      this.isOpened = true
    },

    addWindowResizeEventListener() {
      window.addEventListener("resize", this.setFilterIsOpened)
    }
  },

  mounted() {
    this.getCities()
    this.getGenders()
    this.setFilterIsOpened()
    this.addWindowResizeEventListener()
  }
}
</script>

<style>
</style>