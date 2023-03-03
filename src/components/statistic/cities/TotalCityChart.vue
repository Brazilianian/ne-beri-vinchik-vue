<template>
  <div>
    <canvas ref="myChart"></canvas>
  </div>

</template>

<script>
import { defineComponent } from 'vue';
import Chart from 'chart.js/auto';

export default defineComponent({
  name: "TotalCityChart",
  mounted() {
    this.createChart();
  },
  props: {
    title: '',
    data: {}
  },
  methods: {
    createChart() {
      const config = {
        type: 'bar',
        data: this.data,
        options: {
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
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      };

      const myChart = new Chart(this.$refs.myChart, config);
    }
  }
});
</script>

<style scoped>

</style>