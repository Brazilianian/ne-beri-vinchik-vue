<template>
  <div class="min-h-[100vh] w-full bg-black text-white p-1">
    <div class="min-h-[99vh] bg-gray-800 w-full text-xl p-2">
      <BackButton
          class="fixed p-5"
          @goBack="goToMainPage()"
      >
      </BackButton>

      <div v-if="isSearching" class="text-center mt-2 z-20">
        <CustomSpinner class="h-14"></CustomSpinner>
      </div>

      <div v-if="!isSearching"
          class="lg:grid lg:grid-cols-16 xl:grid-cols-19 lg:block flex flex-col-reverse">
        <div class="col-span-1"></div>

        <div class="lg:col-span-12 xl:col-span-14">
          Розділ статистики “Не Бери Вінчика” є цікавою та дуже детальною ілюстрацією того, як багато людей зараз
          користуються сайтами знайомств (на прикладі телеграм боту <a class="text-blue-600 hover:text-blue-400 italic"
                                                                       href="https://t.me/leomatchbot">Дайвінчік</a>).
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
          можете не погодитись з статистикою, яку побачите, і це правильно, адже ми ще раз наголошуємо на її неточності,
          а
          лише максимальній наближеності до реальності.
        </div>
        <div class="lg:col-span-3 xl:col-span-4 mx-auto my-auto md-2 lg:md-0">
          <img src="icon.png" alt="">
        </div>
      </div>


      <hr class="m-2 border-top border-black my-4">

      <div v-if="!isSearching" class="lg:grid lg:grid-cols-16 xl:grid-cols-19">
        <div class="col-span-1"></div>

        <div class="col-span-11 xl:col-span-12 lg:border-r border-black lg:pr-2">
          Кожного дня ми не тільки поповнюємо базу даних новими анкетами, а ще й вивчаємо нові способи як це зробити
          ефективніше та швидше.
          <br>
          <br>
          На момент першої публікації було близько 15 тис. анкет, коли зараз Ви можете знайти більше
          {{ getTotalCountInThousands() }} тис.!
          <br>
          <br>
        </div>
        <div class="col-span-4 xl:col-span-6 lg:pl-2">
          Відслідкуйте динаміку кількості анкет в певному проміжку часу:
          <br>
          <br>
          <div class="grid grid-cols-2 gap-2">
            <div class="">
              Від:
              <input type="date"
                     class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     :min="dateFilter.min"
                     :max="totalCountFilter.dateMax"
                     v-model="totalCountFilter.dateMin"
                     @change="refreshTotalCountChart()"
              >
            </div>
            <div class="">
              До:
              <input type="date"
                     class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     :max="dateFilter.max"
                     :min="totalCountFilter.dateMin"
                     v-model="totalCountFilter.dateMax"
                     @change="refreshTotalCountChart()"
              >
            </div>
          </div>
        </div>
      </div>

      <TotalCountChart
          v-if="!isSearching"
          class="h-[50vh]"
          :title="'Загальна кількість анкет'"
          :data="totalCountData"
          :flag="totalCountFlag"
      >
      </TotalCountChart>

      <hr v-if="!isSearching" class="m-2 border-top border-black my-4">

      <div v-if="!isSearching" class="lg:grid lg:grid-cols-16 xl:grid-cols-19">
        <div class="col-span-1"></div>

        <div class="lg:col-span-15 xl:col-span-18 lg:grid lg:grid-cols-15 xl:grid-cols-18 ">
          <div class="lg:col-span-10 xl:col-span-11 lg:relative">
            Цікаво, що з {{ getTotalCountInThousands() }} тис. користувачів, близько
            {{ getPercentage(this.currentStatistic.female, this.currentStatistic.total) }}% дівчат та
            {{ 100 - getPercentage(this.currentStatistic.female, this.currentStatistic.total) }}% хлопців.
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
                         :min="ageFilter.min"
                         :max="genderFilter.ageMax"
                         v-model="genderFilter.ageMin"
                         @change="this.refreshGenderChart()"
                  >
                </div>
                <div class="">
                  До:
                  <input type="number"
                         class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                         :max="ageFilter.max"
                         :min="genderFilter.ageMin"
                         v-model="genderFilter.ageMax"
                         @change="this.refreshGenderChart()"
                  >
                </div>
              </div>
            </div>
          </div>

          <div
              class="lg:col-span-5 xl:col-span-7">
            <TotalGenderChart
                v-if="!isSearching"
                class="h-[50vh]"
                :title="'Діаграма статевого розподілу'"
                :data="totalGenderData"
                :flag="genderFlag"
            >
            </TotalGenderChart>
          </div>
        </div>

      </div>

      <hr v-if="!isSearching" class="m-2 border-top border-black my-4">

      <div v-if="!isSearching" class="lg:grid lg:grid-cols-16 xl:grid-cols-19 lg:block flex flex-col-reverse">
        <div class="col-span-1"></div>
        <!--todo when we will have more than 2 cities, we need to set top 3-->
        <div class="lg:col-span-12 xl:col-span-14">
          На даний момент наша база баних має анкети з {{ cities.length + addedCities.length }} міст України.
          <br>
          <br>
          Ось топ {{ cities.length + addedCities.length }} міста по кількості анкет: <br>

          <span v-for="(city, i) in topCountCities">{{ i + 1 }}) {{ city.city }} - {{ city.total.toLocaleString('ru') }}<br> </span>
        </div>
        <div class="lg:col-span-3 xl:col-span-4 mx-auto my-auto md-2 lg:md-0">
        </div>
      </div>

      <TotalCityChart
          v-if="!isSearching"
          class="h-[50vh]"
          :title="'Діаграма розподілу по містам'"
          :chartData="totalCityData"
          :flag="cityFlag"
      >
      </TotalCityChart>

      <div v-if="!isSearching" class="lg:grid lg:grid-cols-16 xl:grid-cols-19 lg:block flex flex-col-reverse">
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
import StatCities from "@/components/statistic/cities/StatCities.vue";
import CityTag from "@/components/statistic/cities/CityTag.vue";
import CustomSpinner from "@/components/ui/Spinner.vue";
import {loadStatistic} from "@/service/statistic_service";

export default {
  name: "StatisticPage",
  components: {
    CustomSpinner,
    CityTag,
    StatCities,
    Cities,
    TotalCityChart,
    TotalGenderChart,
    TotalCountChart,
    BackButton
  },
  data() {
    return {
      isSearching: true,

      cityFlag: true,
      genderFlag: true,
      totalCountFlag: true,

      cities: [],
      addedCities: [],

      statistics: [],

      currentStatistic: {
        total: 0,
        male: 0,
        female: 0,

        date: "",

        cities: [],
        ages: [],

        statisticCities: [
          {
            city: "",
            total: 0,
            male: 0,
            female: 0,
            statisticAges: [
              {
                age: 0,
                total: 0,
                male: 0,
                female: 0,
              }
            ]
          }
        ]
      },

      dateFilter: {
        min: new Date().toISOString().substring(0, 10),
        max: new Date().toISOString().substring(0, 10),
      },

      totalCountFilter: {
        dateMin: new Date().toISOString().substring(0, 10),
        dateMax: new Date().toISOString().substring(0, 10),
      },

      ageFilter: {
        min: 0,
        max: 0,
      },

      genderFilter: {
        ageMin: 16,
        ageMax: 18,
      },

      topCountCities: [
        {
          city: '',
          total: 0,
          male: 0,
          female: 0,
        }
      ],

      totalCountData: {
        labels: [],
        datasets: [
          {
            label: 'Анкети',
            data: [],
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
            data: [],
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
        labels: [],
        datasets: [
          {
            label: 'Розподіл по містам',
            data: [],
            fill: false,
            tension: 0.2,
          },
        ]
      }
    }
  },
  methods: {
    getStatistics() {
      this.isSearching = true
      loadStatistic()
          .then(statistics => {

            this.statistics = statistics
            this.currentStatistic = statistics[statistics.length - 1]

            this.fillAgeFilter()
            this.fillDateFilter()
            this.fillTopCountCities()
            this.fillCitiesTags()

            this.fillCitiesChart()
            this.fillTotalCountData()
            this.fillTotalGenderData()
            this.fillTotalCountData()


            this.isSearching = false
          })
    },

    fillTotalCountData() {
      let days = []
      this.statistics.forEach(s => {
        if (new Date(s.date).getTime() >= new Date(this.totalCountFilter.dateMin).getTime()
            && new Date(s.date).getTime() <= new Date(this.totalCountFilter.dateMax).getTime()) {
          days.push(new Date(s.date).toLocaleDateString())
        }
      })

      this.totalCountData.labels = days;

      let totals = []
      this.statistics.forEach(s => {
        if (new Date(s.date).getTime() >= new Date(this.totalCountFilter.dateMin).getTime()
            && new Date(s.date).getTime() <= new Date(this.totalCountFilter.dateMax).getTime()) {
          totals.push(s.total)
        }
      })

      this.totalCountData.datasets[0].data = totals
    },

    fillAgeFilter() {
      this.statistics.forEach(s => {
        s.ages.forEach(a => {
          if (a < this.ageFilter.min) {
            this.ageFilter.min = a
          }
          if (a > this.ageFilter.max) {
            this.ageFilter.max = a
          }
        })
      })
    },

    fillDateFilter() {
      this.statistics.forEach(s => {
        if (new Date(s.date).getTime() < new Date(this.dateFilter.min).getTime()) {
          this.dateFilter.min = new Date(s.date).toISOString().substring(0, 10)
        }
        if (new Date(s.date).getTime() > new Date(this.dateFilter.max).getTime()) {
          this.dateFilter.max = new Date(s.date).toISOString().substring(0, 10)
        }
      })
      this.totalCountFilter.dateMin = this.dateFilter.min
    },

    fillTotalGenderData() {
      let currentMale = 0
      let currentFemale = 0

      for (let i = 0; i < this.currentStatistic.statisticCities.length; i++) {
        let statisticCity = this.currentStatistic.statisticCities[i]
        for (let j = 0; j < statisticCity.statisticAges.length; j++) {
          let statisticAge = statisticCity.statisticAges[j]
          if (statisticAge.age >= this.genderFilter.ageMin && statisticAge.age <= this.genderFilter.ageMax) {
            currentMale += statisticAge.male
            currentFemale += statisticAge.female
          }
        }
      }

      this.totalGenderData.datasets[0].data = [currentMale, currentFemale]
    },

    fillTopCountCities() {
      this.topCountCities = []
      this.currentStatistic.statisticCities.forEach(c => {
        this.topCountCities.push({
          city: c.city,
          total: c.total,
          male: c.male,
          female: c.female
        })
      })

      this.topCountCities.sort((a, b) => {
        return b.total - a.total
      })
    },

    fillCitiesTags() {
      //todo change when will have more than 2 cities
      for (let i = 0; i < this.topCountCities.length; i++) {
        this.addedCities.push({
          city: this.topCountCities[i].city,
          total: this.topCountCities[i].total
        })
      }
    },

    fillCitiesChart() {
      this.totalCityData.labels = []
      this.totalCityData.datasets[0].data = []

      for (let i = 0; i < this.addedCities.length; i++) {
        let addedCity = this.addedCities[i]
        this.totalCityData.labels.push(addedCity.city)
        this.totalCityData.datasets[0].data.push(addedCity.total)
      }
    },

    goToMainPage() {
      this.$router.push('/')
    },

    getTotalCountInThousands() {
      return Math.floor(this.currentStatistic.total / 1000)
    },

    getPercentage(count, total) {
      return Math.floor(count / total * 100)
    },

    addCityTag(city) {
      let foundedCity = this.cities.filter(c => c === city)
      this.addedCities.push(foundedCity[0])
      this.cities = this.cities.filter(c => c !== city)

      this.refreshCitiesChart()
    },

    removeCityTag(city) {
      this.addedCities = this.addedCities.filter(c => c !== city)
      this.cities.push(city)

      this.refreshCitiesChart()
    },

    refreshGenderChart() {
      this.fillTotalGenderData()
      this.genderFlag = !this.genderFlag
    },

    refreshCitiesChart() {
      this.fillCitiesChart()
      this.cityFlag = !this.cityFlag
    },

    refreshTotalCountChart() {
      this.fillTotalCountData()
      this.totalCountFlag = !this.totalCountFlag
    }
  },

  mounted() {
    this.getStatistics()
  },
}
</script>

<style scoped>

</style>