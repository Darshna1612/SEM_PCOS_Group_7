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
					v-if="hasRecord"
				>
				</el-progress>
				<el-empty v-else description=" "></el-empty>
				<!-- <div ref='chart' style='width: 80%; height: 60%; margin: 0 auto;'></div> -->
				
				<div class='card-container'>
			
					<div class='card'>
						<div class='data-value'>{{hasRecord ? BMI : 'N/A'}}</div>
						<div class='data-key'>BMI</div>
					</div>

					<div class='card'>
						<div class='data-value'>{{hasRecord ? weight : 'N/A'}}</div>
						<div class='data-key'>Weight</div>
						<div class='data-unit'>kg</div>
					</div>
				</div>

				<div class='card-container'>
					<div class='card'>
						<el-tooltip class="item" effect="dark" content="Whether you have gained weight over time" placement="top">
							<i class="el-icon-question"></i>
						</el-tooltip>
						<div class='data-value'>{{hasRecord ? isWeightGain : 'N/A'}}</div>
						<div class='data-key'>Weight Gain</div>
						<div class='data-unit'>True or False</div>
					</div>

					<div class='card'>
						<el-tooltip class="item" effect="dark" content="The period length of your last menstrual" placement="top">
							<i class="el-icon-question"></i>
						</el-tooltip>
						<div class='data-value'>{{hasRecord ? menstrualCycle : 'N/A'}}</div>
						<div class='data-key'>Menstrual Length</div>
						<div class='data-unit'>days</div>
					</div>
				</div> 
				<EditBlock 
					:isEditing='isEditing' 
					:BMI='BMI'
					:weight='weight'
					:weightGain='weightGain'
					:menstrualCycle='menstrualCycle'
					@submitEditData='submitEditData'
					@closeBlock='closeEditingBlock'
				/>
				<InstructionBlock
					:instruction='instruction'
					@closeInstruction='instruction=false'
				/>
			</el-col>
			<el-col :span='9' class='summary-container'>
				
					<div class='summary-block' v-if="hasRecord">
						<div class='summary-text'>Your health status is</div>
						<div class='summary-result' :class=healthStatus>{{healthStatus}}</div>
						<div class='summary-text' style="marginTop: 40px">Probability of having PCOS is</div>
						<div class='summary-result' :class=healthStatus>{{(100 - healthProbability).toFixed(1)}}%</div>
					</div>
					<div class = 'summary-block' v-else>
						<div class='summary-text'>Looks like you haven't used our site!</div>
						<div class='summary-text'>Click Profile button to get started!</div>
					</div>
			
					<div class='summary-divider'></div>

					<div class='operate-area'>
						<div class='operate-btn' @click='openInstruction'>Instruction</div>
						<div class='operate-btn' @click='handleEdit'>Profile</div>
					</div>
			
			</el-col>
	</el-row>
</template>

<script>
// import * as echarts from 'echarts';
import EditBlock from './components/EditBlock.vue'
import InstructionBlock from './components/InstructionBlock.vue'
import { getExamineHistory } from '@/request/testApi'

export default {
	components: {
		EditBlock,
		InstructionBlock
  },
	mounted(){
		getExamineHistory({
			email: this.$store.state.email
		})
		.then(res => {
			if (!res || !res.data || res.data.length === 0) {
				this.hasRecord = false
			} else {
				this.hasRecord = true
				const data = res.data[0]
				this.healthProbability = Number((Number(data.result) * 100).toFixed(1))
				this.BMI = data.BMI
				this.weight = data.weight
				this.weightGain = data.weightGain + ''
				this.menstrualCycle = data.menstrualCycle
				console.log('weightGain', this.weightGain)
			}
		})
	},
	data() {
		return {
			hasRecord: false,
			healthProbability: 0,
			BMI: '',
			weight: '',
			weightGain: '',
			menstrualCycle: '',
			isEditing: false,
			instruction: false,
			colors: [
        {color: '#F56C6C', percentage: 20},
        {color: '#E6A23C', percentage: 40},
        {color: '#61A67D', percentage: 60},
        {color: '#64C23A', percentage: 80},
        {color: '#67C23A', percentage: 100}
      ],
			
		}
	},
	computed: {
		healthStatus() {
			if (this.healthProbability < 25) {
				return 'WEAK'
			} else if (this.healthProbability < 50) {
				return 'NORMAL'
			} else if (this.healthProbability < 75) {
				return 'GOOD'
			} else {
				return 'GREAT'
			}
		},
		isWeightGain() {
			if (this.weightGain === '') return 'N/A';
			return this.weightGain === '1' ? 'True' : 'False'
		}
	},
	methods: {
		submitEditData(obj) {
			this.BMI = Number(Number(obj.BMI).toFixed(1));
			this.weightGain = obj.weightGain;
			this.menstrualCycle = Number(Number(obj.menstrualCycle).toFixed(1));
			this.weight = Number(Number(obj.weight).toFixed(1));
			// this.healthProbability = this.ret[this.ind]
			// this.ind++
			// this.healthProbability = Number((100 * Math.random()).toFixed(1))
			this.healthProbability = Number((100 * Number(obj.result)).toFixed(1))
			this.hasRecord = true
		},
		closeEditingBlock() {
			this.isEditing = false;
		},
		handleEdit() {
			this.isEditing = true;
		},
		openInstruction() {
			this.instruction = true
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
	text-align: center;
}

.chart {
	/* width: 80%; */
	margin: 0 auto;
}

.card-container {
	width: 100%;
	display: flex;
	margin: 20px 0 0 10px;
	justify-content: space-between;
	/* overflow: auto; */
}
.card {
	box-sizing: content-box;
	height: 90px;
	width: 180px;
	flex: none;
	margin-right: 40px;
	background: #FFFFFF;
	border: 1px solid #EEEEEE;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	/* display: flex;
	justify-content: space-between;
	flex-direction: column; */
	position: relative;
}
.el-icon-question {
	position: absolute;
	right: 10px;
	top: 10px;
}

.data-value {
	margin: 10px auto 0;
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
	height: 50%;
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
	margin: 20px auto 0;
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

.WEAK {
	color: #F56C6C;
}
.NORMAL {
	color: #E6A23C;
}
.GOOD {
	color: #61A67D;
}
.GREAT {
	color: #67C23A;
	font-size: 28px;
}
</style>