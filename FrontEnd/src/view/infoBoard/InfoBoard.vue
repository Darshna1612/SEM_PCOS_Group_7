<template>
	<div class='info-container'>
		<div class='title-container'>Blogs</div>
		<div class='blogs-container'>
			<BlogBlock 
				v-for="(blogInfo, index) in blogInfos" 
				:blogInfo=blogInfo 
				v-bind:key=index 
			/>
			
		</div>
	</div>
</template>

<script>
import BlogBlock from './components/BlogBlock.vue';
export default {
	components: {
		BlogBlock
  },
	data() {
		return {
			blogInfos: [
				{
					title: 'The case for a new PCOS therapy',
					intro: 'The causes of PCOS continue to be mysterious (1), though it appears to be related to both genetic and environmental factors.',
					link: 'https://helloclue.com/articles/cycle-a-z/the-case-for-a-new-pcos-therapy',
					poster: require('./components/Blog3.png')
				},
				{
					title: 'What you may not know about PCOS: questions and misconceptions',
					intro: 'PCOS is a common but often undiagnosed condition in which certain hormones are out of balance. These imbalances typically show up as irregular menstrual cycles, a higher level of androgens (a type of hormone including testosterone) in the body, and small cysts in the ovaries.',
					link: 'https://helloclue.com/articles/cycle-a-z/what-you-may-not-know-about-pcos-questions-and-misconceptions',
					poster: require('./components/Blog4.png')
				},
				{
					title: 'Polycystic Ovary Syndrome: What It Is, How to Manage It',
					intro: 'Often misunderstood and misdiagnosed, PCOS can play havoc with your fertility. Here’s how to recognize the symptoms and take action to protect your reproductive health.',
					link: 'https://www.nytimes.com/article/polycystic-ovary-syndrome.html',
					poster: require('./components/Blog5.png')
				},
				{
					title: '5 Women Share How They Were Finally Diagnosed With PCOS',
					intro: 'No two women experience polycystic ovary syndrome in the exact same way. PCOS, an endocrine disorder in which levels of reproductive hormones such as estrogen and testosterone are imbalanced, can trigger a wide range of symptoms, including (but not limited to!) irregular periods, migraines, facial hair growth, weight gain, insulin resistance, painful periods, ovarian cysts, and fertility problems.',
					link: 'https://www.womenshealthmag.com/health/a19970440/symptoms-of-pcos/',
					poster: require('./components/Blog6.png')
				},
				{
					title: 'Obesity and Polycystic Ovary Syndrome',
					intro: 'Obesity has been recognized as a common feature of the polycystic ovary syndrome (PCOS)',
					link: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2861983/',
					poster: require('./components/Blog1.png')
				},
				{
					title: 'Higher blood pressure in normal weight women with PCOS compared to controls',
					intro: 'Obesity is considered to be the strongest predictive factor for cardio-metabolic risk in women with polycystic ovary syndrome (PCOS). The aim of the study was to compare blood pressure (BP) in normal weight women with PCOS and controls matched for age and BMI.',
					link: 'https://ec.bioscientifica.com/view/journals/ec/10/2/EC-20-0527.xml',
					poster: require('./components/Blog2.png')
				},
		
			]
		}
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