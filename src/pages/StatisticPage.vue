<template>
  <div class="min-h-[100vh] w-full bg-black text-white p-1">
    <div class="bg-gray-800 w-full text-xl p-2">
      <BackButton
          class="fixed p-5"
          @goBack="goToMainPage()"
      >
      </BackButton>
      <div class="lg:grid lg:grid-cols-16 xl:grid-cols-19 lg:block flex flex-col-reverse">
        <div class="col-span-1"></div>

        <div class="lg:col-span-12 xl:col-span-14">
          Розділ статистики “Не Бери Вінчика” є цікавою та дуже детальною ілюстрацією того, як багато людей зараз
          користуються сайтами знайомств (на прикладі телеграм боту Дайвінчік).
          <br>
          <br>
          Хочемо одразу попередити, що дані не можуть бути на 100% точними, адже цей проект не має безпосереднього
          доступу до бази даних користувачів телеграм боту.
          <br>
          <br>
          Маючи доступ тільки до публічних даних, які постійно змінюються, ми ілюструємо їх в більш зручному вигляді.
          <br>
          <br>
          Також нагадуємо, що даний проект ніколи не мав та не буде мати на меті когось образити або принизити. Ви
          можете не погодитись з статистикою, що побачите і це правильно, адже ми ще раз наголошуємо на її неточності, а
          лише максимальній наближеності до реальності.
        </div>
        <div class="lg:col-span-3 xl:col-span-4 mx-auto my-auto md-2 lg:md-0">
          <img src="icon.png" alt="">
        </div>
      </div>

      <hr class="m-2 border-top border-black my-4">

      <div class="lg:grid lg:grid-cols-16 xl:grid-cols-19">
        <div class="col-span-1"></div>

        <div class="col-span-11 xl:col-span-12 lg:border-r border-black lg:pr-2">
          Кожного дня ми не тільки поповнюємо базу даних новими анкетами, а ще й вивчаємо нові способи як це зробити
          ефективніше та швидше.
          <br>
          <br>
          На момент першої публікації було близько 15 тис. анкет, коли зараз Ви можете знайти більше
          {{ getTotalCount() }} тис.!
          <br>
          <br>
        </div>
        <div class="col-span-4 xl:col-span-6 lg:pl-2">
          Відслідкуйте динаміку кількості анкет в певному проміжку часу:

        </div>
      </div>

      <TotalCountChart
          class="h-[50vh]"
          :title="'Загальна кількість анкет'"
          :data="totalCountData"
      >
      </TotalCountChart>

      <hr class="m-2 border-top border-black my-4">

      <div class="lg:grid lg:grid-cols-16 xl:grid-cols-19">
        <div class="col-span-1"></div>

        <div class="lg:col-span-15 xl:col-span-18 lg:grid lg:grid-cols-15 xl:grid-cols-18 ">
          <div class="lg:col-span-10 xl:col-span-11 lg:relative">
            Цікаво, що з {{ getTotalCount() }} тис. користувачів, близько
            {{ getPercentage(this.currentTotalFemale, this.currentTotalCount) }}% дівчат та
            {{ getPercentage(this.currentTotalMale, this.currentTotalCount) }}% хлопців.
            <br>
            <br>
            Але відповідно до різних вікових категорій, ця статистика змінюється.
            <br>
            <br>
            Ми пропонуємо Вам самим переконатись та відслідкувати динаміку гендерного співвідношення користувачів
            різного
            віку.
            <br>
            <br>

            <div class="lg:absolute bottom-0 w-full">
              Вкажіть мінімальний та максимальний вік:
              <br>
              <br>
              <div class="grid grid-cols-2 gap-2">
                <div class="">
                  Від:
                  <input type="number"
                         class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                         v-model="genderFilter.min"
                  >
                </div>
                <div class="">
                  До:
                  <input type="number"
                         class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                         v-model="genderFilter.max"
                  >
                </div>
              </div>
            </div>
          </div>

          <div class="lg:col-span-5 xl:col-span-7">
            <TotalGenderChart
                class="h-[50vh]"
                :title="'Діаграма статевого розподілу'"
                :data="totalGenderData"
            >
            </TotalGenderChart>
          </div>
        </div>

      </div>

      <hr class="m-2 border-top border-black my-4">

      <div class="lg:grid lg:grid-cols-16 xl:grid-cols-19 lg:block flex flex-col-reverse">
        <div class="col-span-1"></div>

        <div class="lg:col-span-12 xl:col-span-14">
          На даний момент наша база баних має анкети з {{ currentTotalCities }} міст України.
          <br>
          <br>
          Ось топ 2 міста по кількості анкет: <br>
          1) Київ - 15 982<br>
          2) Кривий Ріг - 5 342<br>
        </div>
        <div class="lg:col-span-3 xl:col-span-4 mx-auto my-auto md-2 lg:md-0">
        </div>
      </div>

      <TotalCityChart
          class="h-[50vh]"
          :title="'Діаграма розподілу по містам'"
          :data="totalCityData"
      >
      </TotalCityChart>

      <div class="lg:grid lg:grid-cols-16 xl:grid-cols-19 lg:block flex flex-col-reverse">
        <div class="col-span-1"></div>

        <div class="lg:col-span-4 xl:col-span-6">

          <StatCities
              class="max-h-[25vh]"
              v-if="cities.length > 0"
              :cities="cities"
              @cityChange="addCityTag"
          >
          </StatCities>
        </div>
        <div class="lg:col-span-11 xl:col-span-12 my-auto md-2 lg:md-0 lg:grid lg:grid-cols-11 xl:grid-cols-12">
          <div
              v-if="addedCities"
              v-for="city in addedCities"
              :key="city.key"
              class="col-span-3"
          >
            <CityTag
                :city="city"
                @cityClick="removeCityTag"
            >
            </CityTag>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import BackButton from "@/components/ui/Back-Button.vue";
import TotalCountChart from "@/components/statistic/TotalCountChart.vue";
import TotalGenderChart from "@/components/statistic/TotalGenderChart.vue";
import TotalCityChart from "@/components/statistic/cities/TotalCityChart.vue";
import Cities from "@/components/filter/Cities.vue";
import {getCities} from "@/service/filter_service";
import StatCities from "@/components/statistic/cities/StatCities.vue";
import CityTag from "@/components/statistic/cities/CityTag.vue";
import CustomSpinner from "@/components/ui/Spinner.vue";

export default {
  name: "StatisticPage",
  components: {CustomSpinner, CityTag, StatCities, Cities, TotalCityChart, TotalGenderChart, TotalCountChart, BackButton},
  data() {
    return {
      isSearching: true,

      cities: [],
      addedCities: [],

      currentTotalCount: 21_335,
      currentTotalMale: 8_857,
      currentTotalFemale: 12_471,

      currentTotalCities: 2,

      genderFilter: {
        min: 0,
        max: 0
      },

      totalCountData: {
        labels: ['26.02.23', '27.02.23', '28.02.23'],
        datasets: [
          {
            label: 'Анкети',
            data: [15899, 19802, 20111],
            fill: false,
            tension: 0.2
          }
        ]
      },
      totalGenderData: {
        labels: ['Чоловіки', 'Жінки'],
        datasets: [
          {
            label: 'Статевий розподіл',
            data: [8_857, 12_471],
            fill: false,
            tension: 0.2,
            backgroundColor: [
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 99, 132, 0.6)',
            ]
          },
        ]
      },
      totalCityData: {
        labels: ['Київ', 'Кривий Ріг'],
        datasets: [
          {
            label: 'Розподіл по містам',
            data: [15_982, 5_342],
            fill: false,
            tension: 0.2,
          },
        ]
      }
    }
  },
  methods: {
    goToMainPage() {
      this.$router.push('/')
    },

    getTotalCount() {
      return Math.floor(this.currentTotalCount / 1000)
    },

    getPercentage(count, total) {
      return Math.floor(count / total * 100)
    },

    getCities() {
      getCities()
          .then(cities => {
            this.cities = cities
          })
    },

    addCityTag(key) {
      let city = this.cities.filter(city => city.key === key)
      this.addedCities.push(city[0])
      this.cities = this.cities.filter(city => city.key !== key)

    },

    removeCityTag(city) {
      this.addedCities = this.addedCities.filter(c => c.key !== city.key)
      this.cities.push(city)
    }
  },

  mounted() {
    this.getCities()
  },

  watch: {
    //TODO set min max change
  }
}
</script>

<style scoped>

</style>