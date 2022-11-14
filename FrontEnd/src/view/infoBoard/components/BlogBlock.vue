<template>
	<div class='blog-block' @click="handleClick">
		<img class='blog-image' :src=blogInfo.poster />
		<!-- <el-image :src=blogInfo.poster></el-image> -->
		<div class='blog-content'>
			<el-tooltip class="item" effect="dark" :content=blogInfo.title placement="top" :open-delay=1000>
				<div class='blog-title'>{{blogInfo.title.slice(0, 40)}}{{blogInfo.title.length >= 40 ? '...' : ''}}</div>
			</el-tooltip>
			<el-tooltip class="item" effect="dark" :content=blogInfo.intro placement="top" :open-delay=1000>
				<div class='blog-intro'>{{blogInfo.intro.slice(0, 40)}}...</div>
			</el-tooltip>
		</div>
	</div>
</template>

<script>

export default {
	props: {
		blogInfo: {
			type: Object,
		},
		// blogImage: {
		// 	type: String,
		// }
	},
	data() {
		return {
			imgList: [
				"@/resource/images/Blog1.png",
				'./Blog1.png'
			]
		}
	},
	computed: {
		imgUrl() {
			return this.blogInfo.poster
		}
	},
	methods: {
		handleClick() {
			window.open(this.blogInfo.link, '_blank')	
		}
	}
}
</script>

<style scoped>
.blog-block {
	margin: 20px auto;
	box-sizing: border-box;
	border: 1px solid #EEEEEE;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	width: 100%;
	height: 100px;
	display: flex;
	/* flex-direction: column; */
	justify-content: space-between;
	padding: 9px;
	/* align-items: flex-end; */
	cursor: pointer;
}

.blog-image {
	object-fit: cover;
	object-position:0 0;
	display: flex;
	width: 30%;
	float: left;
}

.blog-content {
	width: 65%;
}

.blog-title {
	color: rgba(50, 115, 197, 0.8);
	font-weight: 700;
	font-size: 14px;
	word-break: break-all;
}
.blog-intro {
	word-break: break-all;
	font-weight: 400;
	font-size: 14px;
}
</style>

<style>
	.el-tooltip__popper {
		max-width: 400px;
	}
</style>