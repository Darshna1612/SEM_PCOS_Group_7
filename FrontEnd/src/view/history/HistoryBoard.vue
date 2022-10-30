<template>
  <el-row class='history-container'>
			<el-col :span='12' class='chart-container'>
				<div ref='chart' style='width: 80%; height: 80%;'></div>
			</el-col>
			<el-col :span='12'></el-col>
	</el-row>
</template>

<script>
import * as echarts from 'echarts';
export default {
	mounted(){
		this.getCharts()
	},
	methods: {
		getCharts() {
			const chart = this.$refs.chart
			const myChart = echarts.init(chart)
			myChart.setOption({
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }
        ]
      });
		}
	},
	components: {
  }
}

</script>

<style scoped>
.history-container {
	box-sizing: border-box;
	margin: 40px auto;
	padding: 20px;
	height: 90%;
	width: 90%;
	background: #FFF;
	border: 1px solid #EEEEEE;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.chart-container {
	height: 100%;
	border-right: 1px #EEE solid;
}
</style>