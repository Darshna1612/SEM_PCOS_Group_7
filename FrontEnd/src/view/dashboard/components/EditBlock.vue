<template>
  <el-dialog 
    :visible='isEditing'
    class='container'
    width="30%"
    :before-close='handleClose'
  >
    <div>
      <div class='item-container'>
        <div class='item-title'>BMI</div>
        <el-input v-model='obj.BMI' class='item-input'></el-input>
      </div>
      <div class='item-container'>
        <div class='item-title'>Weight Gain</div>
        <el-input v-model='obj.weightGain' class='item-input'></el-input>
      </div>
      <div class='item-container'>
        <div class='item-title'>Menstrual Cycle</div>
        <el-input v-model='obj.menstrualCycle' class='item-input'></el-input>
      </div>

      <div class='custom-divider'></div>

      <div class='button-area'>
        <div class='btn confirm-btn' @click='handleSubmit'>Confirm</div>
        <div class='btn cancel-btn' @click='handleClose'>Cancel</div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    isEditing: {
      type: Boolean,
      default: false
    },
    BMI: {
      type: Number,
      default: 0,
    },
    weightGain: {
      type: Number,
      default: 0,
    },
    menstrualCycle: {
      type: Number,
      default: 0,
    },
  },
  watch: {
    isEditing: {
      handler(newValue) {
        if (newValue) {
          this.obj = {
            BMI: this.BMI,
            weightGain: this.weightGain,
            menstrualCycle: this.menstrualCycle,
          }
        }
      }
    }
  },
  data() {
    return {
      obj: {
        BMI: 0,
        weightGain: 0,
        menstrualCycle: 0,
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('closeBlock');
    },
    handleSubmit() {
      this.$emit('submitEditData', this.obj);
      this.$emit('closeBlock');
    }
  }
}
</script>

<style scoped>
.container {
  padding: 0;
}
.item-container {
  width: 100%;
  display: flex;
  margin-bottom: 20px;
}
.item-title {
  width: 30%;
  line-height: 40px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.item-input {
  width: 60%;
}

.custom-divider {
  width: 90%;
	height: 2px;
	background-color: #EEEEEE;
	margin: 20px auto 10px;
}

.button-area {
  display: flex;
  justify-content: flex-end;
  margin-bottom: -10px;
}

.btn {
  width: 100px;
  margin-right: 20px;
  height: 40px;
  background: rgba(50, 115, 197, 0.8);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	border-radius: 10px;

  color: white;
  /* font-weight: bold; */
  font-size: 18px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  line-height: 40px;

  cursor: pointer;
}

.cancel-btn {
  background-color: #E6A23C;
}
</style>