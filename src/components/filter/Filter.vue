<template>
  <div
      class="lg:w-[19%] md:w-[24%] m-0 md:ms-1 lg:ms-2 text-white max-h-[92vh] overflow-auto md:m-2 md:mt-2"
      :class="isOpened ? 'border border-gray-200 rounded-lg shadow ' : ''"
  >
    <div v-if="isOpened" class="bg-gray-800 border-gray-700 p-2">
      <h2 class="text-3xl text-center italic">Я шукаю...</h2>
      <hr>

      <div class="grid gap-6 mt-2 mb-6 grid-cols-2 ">
        <div class="col-start-1 col-end-3">
          <label for="age" class="block mb-2 text-sm font-medium text-white italic">
            Місто
          </label>
          <Cities
              v-if="cities"
              :cities="cities"
              @cityChange="(city) => this.filter.city = city"
          ></Cities>

        </div>
        <div>
          <label for="age" class="block mb-2 text-sm font-medium text-white italic">
            Від
          </label>
          <input type="number"
                 id="age-min"
                 min="1" max="99" step="1"
                 class="border text-sm rounded-lg block w-full p-2.5
                  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                 placeholder="16" required
                 v-model="filter.ageMin"
          >
        </div>
        <div>
          <label for="age" class="block mb-2 text-sm font-medium text-white italic">
            До
          </label>
          <input type="number"
                 id="age-max"
                 min="1" max="99" step="1"
                 class="border text-sm rounded-lg block w-full p-2.5
                  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                 placeholder="18" required
                 v-model="filter.ageMax"
          >
        </div>
        <div class="col-start-1 col-end-3">
          <label for="gender" class="block mb-2 text-sm font-medium text-gray-900 text-white italic">
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
          <label for="name" class="block mb-2 text-sm font-medium text-gray-900 text-white italic">
            Ім'я <span class="font-normal">(aбо ім'я містить)</span>
          </label>
          <input type="text"
                 id="name"
                 class="border text-sm rounded-lg block w-full p-2.5
                  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500
                 placeholder:italic"
                 placeholder="Аня"
                 required
                 v-model="filter.name"
          >
        </div>

        <div class="col-start-1 col-end-3">
          <label for="name" class="block mb-2 text-sm font-medium text-gray-900 text-white italic">
            Опис <span class="font-normal">(aбо опис містить)</span>
          </label>
          <textarea
              id="name"
              class="border text-sm rounded-lg block w-full p-2.5
                  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500
                 placeholder:italic"
              placeholder="Обожнюю пити каву та прогулюватися нічним Києвом❤"
              required
              v-model="filter.description"
          />
        </div>
      </div>

      <hr>

      <button type="button"
              class="w-full text-white mt-3 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300
               focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
              @click="search"
      >
        Пошук
      </button>
    </div>


    <div
        class="md:hidden text-white md:p-1"
        :class="isOpened? 'bg-gray-800 border-gray-700' : ''"
    >
      <div class="text-center ">
        <font-awesome-icon
            v-if="isOpened"
            class="h-10 mt-1 "
            @click="changeIsOpened"
            icon="fa-circle-up"
        />
      </div>

      <div class="flex justify-end">
        <div class="p-2 mr-2">
          <font-awesome-icon
              v-if="!isOpened"
              icon="fa-filter"
              @click="changeIsOpened"
              class="h-10 text-gray-900 border-gray-700"
          />
        </div>
      </div>
    </div>
    <div>
      <h1
          class="text-right text-gray-400 italic text-xs pr-2 pb-1
                bg-gray-800 border-gray-700"
          v-if="isOpened">Made and designed by
        Brazilian</h1>
    </div>

  </div>
</template>

<script>

import {getCities, getGenders} from "@/service/filter_service";
import Cities from "@/components/filter/Cities.vue";
import Genders from "@/components/filter/Genders.vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import MenuBar from "@/components/MenuBar.vue";


export default {
  name: "Filter",
  components: {MenuBar, FontAwesomeIcon, Genders, Cities},
  data() {
    return {
      filter: {
        ageMin: 16,
        ageMax: 18
      },
      cities: [],
      genders: [],
      isOpened: false,
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
  },

  mounted() {
    this.getCities()
    this.getGenders()
    this.setFilterIsOpened()
  }
}
</script>

<style>
</style>