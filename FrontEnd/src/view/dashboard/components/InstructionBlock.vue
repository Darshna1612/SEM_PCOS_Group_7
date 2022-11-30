<template>
  <el-dialog
    :visible='instruction'
    class='instruction-block-container'
    width="50%"
    :before-close='handleClose'
  >
    <div class='instruction-block'>
      <transition name="el-fade-in-linear">
        <div v-if="(active === 0 && show)" class='instruction-container'>
          
          <div class='title'>Step1. Click the 'Profile' Button</div>
          <img src="./Step1.png" class='instruction-image'/>
        
        </div>
      </transition>
      <transition name="el-fade-in-linear">
        <div v-if="(active === 1 && show)" class='instruction-container'>
          <div class='title'>Step2. Enter Relevant Information and Click the 'Confirm' Button </div>
          <img src="./Step2.png" class='instruction-image'/>
        </div>
      </transition>
      <transition name="el-fade-in-linear">
        <div v-if="(active === 2 && show)" class='instruction-container'>
          <div class='title'>Step3. Your Examine Results Will Be Presented</div>
          <img src="./Step3.png" class='instruction-image'/>
        </div>
      </transition>
      <transition name="el-fade-in-linear">
        <div v-if="(active === 3 && show)" class='instruction-container'>
          <el-result icon="success" title="Success" subTitle="Start Your Trip on PCOS-Trackor"></el-result>
        </div>
      </transition>
    </div>
    <el-steps :active="active" finish-status="success">
      <el-step title="Step 1"></el-step>
      <el-step title="Step 2"></el-step>
      <el-step title="Step 3"></el-step>
    </el-steps>
    <el-button style="margin-top: 12px;" @click="next(false)">Previous</el-button>
    <el-button style="margin-top: 12px;" @click="next(true)">Next</el-button>
  </el-dialog>
</template>

<script>
export default {
  props: {
    instruction: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      active: 0,
      show: true,
    }
  },
  methods: {
    handleClose() {
      this.$emit('closeInstruction')
    },
    next(goNext) {
      if (!this.show) return
      if (goNext) {
        if (this.active++ > 2) this.active = 0;
        this.show = false
        setTimeout(() => {this.show = true}, 300)
      } else {
        if (this.active === 0) {
          return
        }
        this.show = false
        setTimeout(() => {this.show = true}, 300)
        this.active--
      }
    }
  }
}
</script>

<style scoped>
.instruction-block-container {
  text-align: left;
  box-sizing: content-box;
}
.instruction-block {
  width: 100%;
  height: 300px;
}

.instruction-container {
  width: 100%;
  height: 90%;
  text-align: center;
}
.instruction-image {
  height: 90%;
  margin: 20px auto;
}
.title {
  font-weight: bold;
  font-size: 16px;
}
</style>