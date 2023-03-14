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
    data: {},
    flag: true,
  },

  data() {
    return {
      chart: null
    }
  },

  methods: {
    createChart() {
      const config = {
        type: 'line',
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
              text: this.title,
            }
          },
          scales: {
            y: {
              beginAtZero: false,
            }
          }
        }
      };

      this.chart = new Chart(this.$refs.myChart, config);
    }
  },

  watch: {
    flag() {
      this.chart.destroy()
      this.createChart()
    }
  }
});
</script>

<style scoped>

</style>