<template>
	<div class='blog-block'>
		<img class='blog-image' src='./Group 4.png' />
		<div class='blog-content'>
			<div class='blog-title'>This is a title</div>
			<div class='blog-intro'>This is a introduction!This is a introduction! ...</div>
		</div>
	</div>
</template>

<script>

</script>

<style scoped>
.blog-block {
	margin: 20px auto;
	box-sizing: border-box;
	border: 1px solid #EEEEEE;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	width: 100%;
	height: 90px;
	display: flex;
	/* flex-direction: column; */
	justify-content: space-between;
	padding: 9px;
	/* align-items: flex-end; */
}

.blog-image {
	display: flex;
	width: 35%;
	float: left;
}

.blog-content {
	width: 65%;
}

.blog-title {
	color: rgba(50, 115, 197, 0.8);
	font-weight: 700;
	font-size: 16px;
}
.blog-intro {
	word-break: break-all;
	font-weight: 400;
	font-size: 14px;
}
</style>