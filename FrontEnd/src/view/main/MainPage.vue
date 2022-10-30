<template>
	<transition name="el-fade-in-linear">
		<el-row class='container' v-if='showPage'>
			<el-col :span='4' class='user-profile'>
				<UserProfile @changePage='handleChangePage'/>
			</el-col>

			<el-col :span='15' class='dash-board'>
				<transition name="el-fade-in-linear">
					<DashBoard v-if='showDash'/>
				</transition>
				<transition name="el-fade-in-linear">
					<HistoryBoard v-if='showHistory'/>
				</transition>
			</el-col>

			<el-col :span='5' class='other-information'>
				<InfoBoard />
			</el-col>
		</el-row>
	</transition>
</template>

<script>
import UserProfile from '../userProfile/UserProfile.vue'
import DashBoard from '../dashboard/DashBoard.vue'
import HistoryBoard from '../history/HistoryBoard.vue'
import InfoBoard from '../infoBoard/InfoBoard.vue'
export default {
	components: {
		UserProfile,
		DashBoard,
		InfoBoard,
		HistoryBoard
  },
	data() {
		return {
			showPage: false,
			showHistory: false,
			showDash: true,
		}
	},
	methods: {
		handleChangePage(val) {
			this.showHistory = false;
			this.showDash = false;
			setTimeout(() => {
				if (val === 1) {
					this.showHistory = false;
					this.showDash = true;
				}
				if (val === 2) {
					this.showHistory = true;
					this.showDash = false;
				}
			}, 300);
		}
	},
	mounted() {
		setTimeout(() => {
			this.showPage = true
		}, 0)
	}
}
</script>

<style scoped>
	.container {
		box-sizing: border-box;
		width: 100%;
		height: 100%;
	}
	.user-profile {
		height: 100%;
		padding: 0;
		/* border-right: 1px #404040 solid; */
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	}

	.dash-board {
		height: 100%;
	}
	.other-information {
		height: 100%;
		border-left: 1px solid rgba(238, 238, 238, 1);
	}
</style>