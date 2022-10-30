<template>
  <el-dialog 
    :visible='showBlock'
    class='container'
    width="30%"
    :before-close='handleClose'
  >
  <div class='tabs'>
    <div class='tabs-item' :class='{"selected-tab": activeTab === "login"}' @click='clickTab("login")'>Login</div>
    <div class='tabs-item' :class='{"selected-tab": activeTab === "register"}' @click='clickTab("register")'>Register</div>
  </div>
  <div class='custom-divider'></div>

  <div class='login-container' v-if='activeTab ==="login"'>
    <div class='item-title'>Email / Account</div>
    <el-input v-model='email' class='item-input'></el-input>
    <div class='item-title'>Password</div>
    <el-input v-model='pwd' class='item-input' show-password></el-input>
    <div class='login-btn' @click='login'>Log In</div>
  </div>

  <div class='login-container' v-if='activeTab ==="register"'>
    <div class='item-title'>Input Your Email</div>
    <el-input v-model='email' class='item-input'></el-input>
    <div class='item-title'>Input Your Password</div>
    <el-input v-model='pwd' class='item-input' show-password></el-input>
    <div class='item-title'>Confirm Your Password</div>
    <el-input v-model='pwdConfirm' class='item-input' show-password></el-input>
    <div class='login-btn' @click='login'>Register</div>
  </div>

  </el-dialog>
</template>

<script>
export default {
  props: {
    showBlock: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      activeTab: 'login',
      email: '',
      pwd: '',
      pwdConfirm: '',
    }
  },
  methods: {
    login() {
      this.$notify({
        title: 'Success',
        message: 'Log in successfully!',
        type: 'success'
      });
      this.$router.push('./main')
    },
    clickTab(tab) {
      if (this.activeTab === tab) return
      // this.activeTab = '';
      setTimeout(() => {
        this.activeTab = tab;
      }, 0)
    },
    handleClose() {
      this.$emit('closeBlock')
    }
  }
}

</script>
<style scoped>
.container {
}
.tabs {
  display: flex;
}
.tabs-item {
  text-align: left;
  width: fit-content;
  font-size: 16px;
  cursor: pointer;
  margin-right: 20px;
}
.selected-tab {
  font-weight: bold;
  border-bottom: 5px solid rgba(50, 115, 197, 0.6);
}
.custom-divider {
  width: 100%;
  background-color: rgba(238, 238, 238, 1);
  height: 1px;
}
.login-container {
  text-align: left;
  box-sizing: border-box;
}
.item-title {
  text-align: left;
  color: #666;
  font-weight: 400;
  font-size: 12px;
  margin: 10px 0;
}
.item-input {
  padding-left: 0;
  /* width: 80%; */
}
.login-btn {
  width: 189px;
  height: 48px;

  background: #404040;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  margin: 20px auto 0;

  text-align: center;
  font-size: 16px;
  color: white;
  line-height: 48px;
  font-weight: bold;

  cursor: pointer;
}
</style>