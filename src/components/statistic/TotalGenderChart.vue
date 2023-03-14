<template>
  <div>
    <canvas ref="myChart"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js/auto";

export default {
  name: "TotalGenderChart",
  mounted() {
    this.createChart();
  },
  props: {
    title: '',
    data: {},
    flag: true
  },

  data() {
    return {
      chart: null
    }
  },

  methods: {
    createChart() {
      const config = {
        type: 'doughnut',
        data: this.data,
        options: {
          animation: {
            duration: 0,
          },
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: this.title
            }
          },
        }
      };

      this.chart = new Chart(this.$refs.myChart, config);
    },
  },
  watch: {
    flag() {
      this.chart.destroy()
      this.createChart()
    }
  }
}
</script>

<style scoped>

</style>