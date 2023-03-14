<template>
  <div>
    <canvas id="canvas" ref="myChart"></canvas>
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
    chartData: {},
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
        type: 'bar',
        data: this.chartData,
        options: {
          animation: {
            duration: 0
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
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      };

      if(this.chart != null) {
        this.chart.destroy()
      }
      this.chart = new Chart(this.$refs.myChart, config);
    },

    updateChart() {
      this.chart.destroy()
      this.createChart()
    }
  },

  watch: {
    flag() {
      console.log('watch')
      this.updateChart()
    }
  }
});
</script>

<style scoped>

</style>