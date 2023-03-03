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
      data: {}
    },
    methods: {
      createChart() {
        const config = {
          type: 'doughnut',
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
          }
        };

        const myChart = new Chart(this.$refs.myChart, config);
      }
    }
}
</script>

<style scoped>

</style>