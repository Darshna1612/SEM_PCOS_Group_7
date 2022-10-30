<template>
  <el-row class='dashboard-container'>
			<el-col :span='15' class='chart-container'>
			
				<el-progress 
					type="dashboard" 
					:percentage="healthProbability" 
					:color="colors"
					:width='250'
					:stroke-width='30'
					class='chart'
				>
				</el-progress>
				<!-- <div ref='chart' style='width: 80%; height: 60%; margin: 0 auto;'></div> -->
				
				<div class='card-container'>
					<div class='card'>
						<div class='data-value'>{{BMI}}</div>
						<div class='data-key'>BMI</div>
					</div>

					<div class='card'>
						<div class='data-value'>{{weightGain}}</div>
						<div class='data-key'>Weight Gain</div>
						<div class='data-unit'>kg/day</div>
					</div>

					<div class='card'>
						<div class='data-value'>{{menstrualCycle}}</div>
						<div class='data-key'>Menstrual Cycle</div>
						<div class='data-unit'>days</div>
					</div>

				</div>
				<EditBlock 
					:isEditing='isEditing' 
					:BMI='BMI'
					:weightGain='weightGain'
					:menstrualCycle='menstrualCycle'
					@submitEditData='submitEditData'
					@closeBlock='closeEditingBlock'
				/>
			</el-col>
			<el-col :span='9' class='summary-container'>
				<div>
					<div class='summary-block'>
						<div class='summary-text'>Your health status is</div>
						<div class='summary-result'>{{healthStatus}}</div>
						<div class='summary-text' style="marginTop: 40px">Probability of having PCOS is</div>
						<div class='summary-result'>{{(100 - healthProbability).toFixed(1)}}%</div>
					</div>
			
					<div class='summary-divider'></div>

					<div class='operate-area'>
						<div class='operate-btn'>See Detail</div>
						<div class='operate-btn' @click='handleEdit'>Edit</div>
					</div>
				</div>
			</el-col>
	</el-row>
</template>

<script>
// import * as echarts from 'echarts';
import EditBlock from './components/EditBlock.vue'

export default {
	components: {
		EditBlock,
  },
	mounted(){
		this.getCharts()
	},
	data() {
		return {
			healthStatus: 'GOOD',
			healthProbability: 18.3,
			BMI: 18.8,
			weightGain: 0.2,
			menstrualCycle: 45,
			isEditing: false,
			colors: [
        {color: '#f56c6c', percentage: 20},
        {color: '#e6a23c', percentage: 40},
        {color: '#5cb87a', percentage: 60},
        {color: '#1989fa', percentage: 80},
        {color: '#6f7ad3', percentage: 100}
      ],
		}
	},
	methods: {
		submitEditData(obj) {
			this.BMI = obj.BMI;
			this.weightGain = obj.weightGain;
			this.menstrualCycle = obj.menstrualCycle;
			this.healthProbability = Number((100 * Math.random()).toFixed(1))
		},
		closeEditingBlock() {
			this.isEditing = false;
		},
		handleEdit() {
			this.isEditing = true;
		},
		getCharts() {
			// const chart = this.$refs.chart
			// const myChart = echarts.init(chart)
			// myChart.setOption();
		}
	},
}

</script>

<style scoped>
.dashboard-container {
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
	box-sizing: border-box;
	height: 100%;
	border-right: 1px #EEE solid;
	padding: 0 20px;
}

.chart {
	/* width: 80%; */
}

.card-container {
	width: 100%;
	display: flex;
	margin-top: 20px;
	justify-content: space-between;
	/* overflow: hidden; */
}
.card {
	box-sizing: content-box;
	height: 140px;
	width: 120px;
	/* margin-right: 40px; */
	background: #FFFFFF;
	border: 1px solid #EEEEEE;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.data-value {
	margin: 20px auto;
	font-size: 24px;
	font-weight: bold;
	color: rgba(97, 166, 125, 1);
}

.data-key {
	font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
	word-break: break-all;
}

.data-unit {
	color: #777777;
	font-style: italic;
	font-size: 14px;
	margin: 10px auto;
}
.summary-container {
	height: 100%;
	box-sizing: border-box;
}
.summary-block {
	padding-top: 20px;
}

.summary-text {
	font-size: 18px;
	text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.summary-result {
	font-size: 24px;
	font-weight: bold;
	text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	color: rgba(97, 166, 125, 1);
	margin-top: 10px;
}

.summary-divider {
	width: 80%;
	height: 2px;
	background-color: #EEEEEE;
	margin: 80px auto 0;
}

.operate-btn {
	margin: 30px auto;
	font-weight: bold;
	line-height: 48px;
	font-size: 20px;
	cursor: pointer;
	color: white;
	width: 70%;
	height: 48px;
	background: rgba(50, 115, 197, 0.8);
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	border-radius: 10px;
}
</style>