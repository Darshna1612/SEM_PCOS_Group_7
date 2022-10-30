<template>
  <div>
    <transition name="el-fade-in-linear">
      <el-row class='container' v-if='showPage' :class='{"opening-block-container": showBlock}'>
        <el-col :span='11' class='poster-part'>
          <img class='poster' src='../../resource/images/poster.png'/>
        </el-col>

        <el-col :span='13' class='login-part'>
          <IntroBlock @clickStart='openLogInBlock'/>
        </el-col>
      </el-row>
    </transition>
    <transition name="el-fade-in-linear">
      <LogInBlock :showBlock='showBlock' class='login-block' @closeBlock='closeLogInBlock'/>
    </transition>
  </div>

</template>

<script>
import IntroBlock from './components/IntroBlock.vue';
import LogInBlock from './components/LogInBlock.vue';

export default {
  components: {
    IntroBlock,
    LogInBlock,
  },
  data() {
    return {
      showPage: false,
      showBlock: false,
    }
  },
  mounted() {
    setTimeout(() => {
			this.showPage = true
		}, 500)
  },
  methods: {
    openLogInBlock() {
      this.showBlock = true
    },
    closeLogInBlock() {
      this.showBlock = false
    }
  }
}
</script>

<style scoped>
	.container {
		box-sizing: border-box;
		width: 100%;
		height: 100%;
    padding: 20px;
    transition: opacity 0.3s;
	}
  .opening-block-container {
    opacity: 0.3;
  }

  .poster-part {
    height: 100%;
    border-right: 2px solid #EEEEEE;
    /* box-shadow: 5px 0px 4px rgba(0, 0, 0, 0.25); */
  }

  .poster {
    width: 80%;
    height: 100%;
  }

</style>