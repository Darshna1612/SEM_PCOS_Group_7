<template>
  <el-row class='history-container'>
			<el-col :span='15' class='chart-container'>
				<div class='info-title'>History</div>
				<el-empty v-if="!this.hasRecord" description=" "></el-empty>
				<div ref='chart' style='width: 100%; height: 80%;'></div>
			</el-col>
			<el-col :span='9' class='info-container'>
				<div class='info-title'>Info Board</div>
				<el-card class='info-board'>
					<div class='info-item'>
						<div class='info-key'>Date:</div> 
						<div class='info-value'>{{curData.date}}</div>
						<div class='summary-divider'></div>
					</div> 
					<div class='info-item'>
						<div class='info-key'>Result:</div> 
						<div class='info-value'>{{curData.result}}</div>
						<div class='summary-divider'></div>
					</div> 
					<div class='info-item'>
						<div class='info-key'>BMI:</div> 
						<div class='info-value'>{{curData.BMI}}</div>
						<div class='summary-divider'></div>
					</div> 
					<div class='info-item'>
						<div class='info-key'>Weight (Kg):</div> 
						<div class='info-value'>{{curData.weight}}</div>
						<div class='summary-divider'></div>
					</div> 
					<div class='info-item'>
						<div class='info-key'>Cycle (Days):</div> 
						<div class='info-value'>{{curData.cycle}}</div>
						<el-divider></el-divider>
					</div> 
					

				</el-card>
			</el-col>
	</el-row>
</template>

<script>
import * as echarts from 'echarts';
import { getExamineHistory } from '@/request/testApi';
import { getTime } from '@/utils/utils'
export default {
	mounted(){
		getExamineHistory({
			email: this.$store.state.email
		})
		.then(res => {
			this.historyData = res.data.slice(0, this.itemNumber).reverse()
			const n = this.historyData.length
			if (n === 0) return
			this.hasRecord = true
			this.curData = {
				date: getTime(this.historyData[n - 1].timeStamp),
				result: (Number(this.historyData[n - 1].result) * 100).toFixed(1) + ' %',
				BMI: this.historyData[n - 1].BMI,
				weight: this.historyData[n - 1].weight,
				cycle: this.historyData[n - 1].menstrualCycle,
			}
			this.getCharts()
		})
	},
	data() {
		return {
			hasRecord: false,
			historyData: [],
			itemNumber: 7,
			curData: {
				date: '',
				result: '',
				BMI: '',
				weight: '',
				cycle: '',
			}
		}
	},
	computed: {
		chartData() {
			const data = []
			this.historyData.forEach(d => {
				data.push(Number((100 * Number(d.result)).toFixed(1)))
			})
			return data
		},
		chartDateData() {
			const data = []
			this.historyData.forEach(d => {
				data.push(getTime(d.timeStamp))
			})
			return data
		}
	},
	methods: {
		getCharts() {
			const chart = this.$refs.chart
			const myChart = echarts.init(chart)
			myChart.setOption({
				width: 'auto',
        xAxis: {
          type: 'category',
          data: this.chartDateData
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: this.chartData,
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }
        ],
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'shadow'
					},
					formatter: function (params) {
						let data = params[0]
						return data.axisValue + '<br/>' + data.data;
					}
				}
      });
			myChart.on('click', event => {
				console.log(event)
			})
			myChart.on('mouseover', event => {
				const index = event.dataIndex
				this.curData = {
					date: getTime(this.historyData[index].timeStamp),
					result: (Number(this.historyData[index].result) * 100).toFixed(1) + ' %',
					BMI: this.historyData[index].BMI,
					weight: this.historyData[index].weight,
					cycle: this.historyData[index].menstrualCycle,
				}
			})

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
	padding: 20px 0;
	height: 90%;
	width: 90%;
	background: #FFF;
	border: 1px solid #EEEEEE;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	text-align: left;
}

.chart-container {
	height: 100%;
	border-right: 1px #EEE solid;
}

.info-container {
	height: 100%;
	text-align: left;
}

.info-title {
	font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
	height: 5%;
	font-weight: 400;
	font-size: 24px;
	line-height: 15px;
	text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	width: 90%;
	margin: 0 auto;
}
.info-board {
	width: 90%;
	height: 80%;
	margin: 20px auto;
	/* border: 1px black solid; */
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.info-item {
	/* display: flex; */
}

.info-value {
	text-align: left;
	line-height: 28px;
}
.info-key {
	text-align: left;
	line-height: 28px;
}

.summary-divider {
	width: 100%;
	height: 2px;
	background-color: #EEEEEE;
	margin: 10px auto;
}
</style>