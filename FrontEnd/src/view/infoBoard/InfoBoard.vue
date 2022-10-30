<template>
	<div class='info-container'>
		<div class='title-container'>Blogs</div>
		<div class='blogs-container'>
			<BlogBlock/>
			<BlogBlock/>
			<BlogBlock/>
			<BlogBlock/>
			<BlogBlock/>
			<BlogBlock/>
		</div>
	</div>
</template>

<script>
import BlogBlock from './components/BlogBlock.vue';
export default {
	components: {
		BlogBlock
  }
}
</script>

<style scoped>
	.info-container {
		box-sizing: border-box;
		padding: 18px;
		text-align: left;
		height: 100%;
	}

	.title-container {
		font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
		height: 5%;
		font-weight: 400;
		font-size: 24px;
		line-height: 15px;
		text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	}
	.blogs-container {
		height: 90%;
		overflow: auto;
	}
</style>