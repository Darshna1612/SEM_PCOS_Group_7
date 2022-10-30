<template>
  <div class='container'>
		<div class='avatar'>
			<div class='user-image'>JZ</div>
		</div>
		<div class='navigator'>

			<div class='item' :class='{"selected-item": currentPage === 1}'>
				<div class='selected-bar' v-if='currentPage === 1'></div>
				<div class='item-title' @click='clickItem(1)'>Dashboard</div>
			</div>

			<div class='item' :class='{"selected-item": currentPage === 2}'>
				<div class='selected-bar' v-if='currentPage === 2'></div>
				<div class='item-title' @click='clickItem(2)'>Track History</div>
			</div>

		</div>
  </div>
</template>

<script>
export default {
	data() {
		return {
			currentPage: 1,
		}
	},
	methods: {
		clickItem(val) {
			if (val === this.currentPage) return;
			this.currentPage = 0;
			this.$emit('changePage', val)
			setTimeout(() => {
				this.currentPage = val;
			}, 300)

		}
	},
}
</script>

<style scoped>
	.container {
		padding-top: 20px;
	}
	.user-image {
		border: #40404040 solid 1px;
		background-color: #404040;
		width: 72px;
		height: 72px;
		border-radius: 50%;
		margin: 0 auto;

		font-weight: 700;
		color: white;
		font-size: 36px;
		text-align: center;
		line-height: 72px;
	}

	.navigator {
		font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
		text-align: left;
		box-sizing: border-box;
		padding: 40px 0;
		height: 80%;
		width: 100%;
		/* border: 1px red solid */
	}

	.item {
		font-size: 20px;
		line-height: 36px;
		cursor: pointer;
		transition: all .2s;
	}
	.selected-item {
		box-sizing: border-box;
		font-size: 24px;
		padding-left: 0px;
		height: 36px;
		width: 95%;
		background: #F8F8F8;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		border-radius: 0px 5px 5px 0px;
		display: flex;
	}

	.selected-bar {
		height: 100%;
		width: 6px;
		background: #458D93;
	}

	.item-title {
		padding-left: 16px;
	}
</style>