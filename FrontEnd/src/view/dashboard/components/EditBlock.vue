<template>
  <el-dialog 
    :visible='isEditing'
    class='edit-block-container'
    width="30%"
    :before-close='handleClose'
  >
    <div
      v-loading="fullscreenLoading"
      element-loading-text="Your result will appear in seconds..."
    >
      <div class='edit-block-item-container'>
        <div class='edit-block-item-title'>BMI</div>
        <el-input v-model='obj.BMI' class='edit-block-item-input'></el-input>
      </div>
      <div class='edit-block-item-container'>
        <div class='edit-block-item-title'>Weight</div>
        <el-input v-model='obj.weight' class='edit-block-item-input'></el-input>
      </div>
      <div class='edit-block-item-container'>
        <div class='edit-block-item-title'>Weight Gain</div>
          <el-radio-group v-model="obj.weightGain" class="edit-weight-gain">
            <el-radio label="0">False</el-radio>
            <el-radio label="1">True</el-radio>
          </el-radio-group>

      </div>
      <div class='edit-block-item-container'>
        <div class='edit-block-item-title'>Menstrual Cycle</div>
        <el-input v-model='obj.menstrualCycle' class='edit-block-item-input'></el-input>
      </div>

      <div class='edit-block-custom-divider'></div>

      <div class='edit-block-button-area'>
        <div class='edit-block-btn edit-block-confirm-btn' @click='handleSubmit'>Confirm</div>
        <div class='edit-block-btn edit-block-cancel-btn' @click='handleClose'>Cancel</div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { examineUser } from '../../../request/testApi'
export default {
  props: {
    isEditing: {
      type: Boolean,
      default: false
    },
    BMI: {
      type: [Number, String],
      default: '',
    },
    weight: {
      type: [Number, String],
      default: '',
    },
    weightGain: {
      type: [Number, String, Boolean],
      default: '',
    },
    menstrualCycle: {
      type: [Number, String],
      default: '',
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
            weight: this.weight,
          }
        }
      }
    }
  },
  data() {
    return {
      obj: {
        BMI: 0,
        weight: 0,
        weightGain: '',
        menstrualCycle: 0,
      },
      fullscreenLoading: false
    }
  },
  methods: {
    handleClose() {
      this.$emit('closeBlock');
    },
    handleSubmit() {
      console.log(this.obj)
      if (isNaN(this.obj.BMI) || isNaN(this.obj.weight) || isNaN(this.obj.menstrualCycle)) {
        this.$message({
          type: 'error',
          message: 'Please make sure you input valid value!'
        })
        return;
      }
      this.fullscreenLoading = true;
      examineUser({
        ...this.obj,
        timeStamp: new Date().getTime(),
        email: this.$store.state.email
      }).then(res => {
        console.log(res)
        this.fullscreenLoading = false;
        this.obj.result = res.data.examine_result;
        this.$emit('submitEditData', this.obj);
        this.$emit('closeBlock');
      })
    }
  }
}
</script>


<style>
.edit-block-container {
  padding: 0;
}
.edit-block-item-container {
  width: 100%;
  display: flex;
  margin-bottom: 20px;
}
.edit-block-item-title {
  width: 30%;
  line-height: 40px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.edit-block-item-input {
  width: 60%;
}
.edit-weight-gain {
  /* width: 100%; */
  line-height: 48px;
}
.edit-block-custom-divider {
  width: 90%;
	height: 2px;
	background-color: #EEEEEE;
	margin: 20px auto 20px;
}

.edit-block-button-area {
  display: flex;
  justify-content: flex-end;
  margin-bottom: -10px;
}

.edit-block-btn {
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

.edit-block-cancel-btn {
  background-color: #E6A23C;
}

.el-loading-spinner {
  top: 30%!important;
}
</style>