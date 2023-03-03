<template>
  <div>
    <canvas ref="myChart"></canvas>
  </div>

</template>

<script>
import { defineComponent } from 'vue';
import Chart from 'chart.js/auto';

export default defineComponent({
  name: "TotalCountChart",
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
        type: 'line',
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
              beginAtZero: false
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