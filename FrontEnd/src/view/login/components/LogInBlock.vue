<template>
  <el-dialog 
    :visible='showBlock'
    class='container'
    width="30%"
    :before-close='handleClose'
    :close-on-click-modal=false
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
    <div class='item-title'>Input Your User Name <span style="color:red">*</span></div>
    <el-input v-model='userName' class='item-input'></el-input>
    <div class='item-title'>Input Your Email <span style="color:red">*</span></div>
    <el-input v-model='email' class='item-input'></el-input>
    <div class='item-title'>Input Your Password <span style="color:red">*</span></div>
    <div class='item-title'><i>Must contain letters and numbers, with a length between 6 and 30</i></div>
    <el-input v-model='pwd' class='item-input' show-password></el-input>
    <div class='item-title'>Confirm Your Password <span style="color:red">*</span></div>
    <el-input v-model='pwdConfirm' class='item-input' show-password></el-input>
    <div class='login-btn' @click='register'>Register</div>
  </div>

  </el-dialog>
</template>

<script>
import { createUser, loginUser } from '../../../request/userApi'
export default {
  props: {
    showBlock: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      userName: '',
      activeTab: 'login',
      email: '',
      pwd: '',
      pwdConfirm: '',
    }
  },
  methods: {
    login() {
      const data = {
        email: this.email,
        password: this.pwd,
      }
      loginUser(data).then(res => {
        if (res.data.status === 0) {
          this.$notify({
            title: 'Success',
            message: 'Log in successfully!',
            type: 'success'
          });
          console.log(res.data)
          this.$store.commit('changeEmail', this.email)
          this.$store.commit('changeUserName', res.data.userName || '')          
          this.$router.push('./main')
        } else if (res.data.status === 1) {
          this.$notify({
            title: 'Warning',
            message: res.data.description || 'Something Went Wrong',
            type: 'error'
          })
        }
      })
      return
    },
    clickTab(tab) {
      if (this.activeTab === tab) return
      this.email = ''
      this.pwd = ''
      this.pwdConfirm = ''
      setTimeout(() => {
        this.activeTab = tab;
      }, 0)
    },
    handleClose() {
      this.$emit('closeBlock')
    },
    register() {
      if (this.pwd === '' || this.pwdConfirm === '' || this.email === '' || this.userName === '') {
        this.$notify({
          title: 'Warning',
          message: 'Please complete all required fields!',
          type: 'error'
        })
        return
      }
      if (this.pwd !== this.pwdConfirm) {
        this.$notify({
          title: 'Warning',
          message: 'Password and Confirm Password are not same',
          type: 'error'
        })
        return
      }
      let emailRegx = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
      if (!emailRegx.test(this.email)) {
        this.$notify({
          title: 'Warning',
          message: 'Your Email is not correct!',
          type: 'error'
        })
        return
      }
      let pwdRegex = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z]).{8,30}');
      if (!pwdRegex.test(this.pwd)) {
        this.$notify({
          title: 'Warning',
          message: 'Your Password is so easy!',
          type: 'error'
        })
        return
      }
      const data = {
        userName: this.userName,
        email: this.email,
        password: this.pwd,
      }
      createUser(data).then(res => {
        if (res.data.status === 0) {
          this.$notify({
            title: 'Success',
            message: 'Register and log in successfully!',
            type: 'success'
          });
          this.$store.commit('changeEmail', this.email)
          this.$store.commit('changeUserName', this.userName)
          this.$router.push('./main')
        } else if (res.data.status === 1) {
          this.$notify({
            title: 'Warning',
            message: res.data.description || 'Something Went Wrong',
            type: 'error'
          })
        }
      })
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