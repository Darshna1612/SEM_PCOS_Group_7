<template>
  <div>
    <div class='title'>PCOS Tracker</div>
    <div class='introduction'>One-Stop Forecast-Tracking PCOS Platform</div>
    <div class='image-block'>
      <img style='width: 100%;' src='../../../resource/images/pcos-intro.png'/>
    </div>
    <div class='login-button' @click='clickStart()'>
      Get Started
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    clickStart() {
      this.$emit('clickStart');
    }
  }
}
</script>

<style scoped>
  .title {
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 36px;
    margin-bottom: 24px;
  }

  .introduction {
    font-size: 24px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    margin-bottom: 12px;
  }

  .image-block {
    width: 80%;
    margin: 0 auto;
  }

  .login-button {
    /* position: absolute;
    bottom: 92px; */
    margin: 24px auto;
    color: white;
    width: 200px;
    height: 76px;

    background: rgba(64, 64, 64, 0.8);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 15px;
    font-size: 24px;
    line-height: 76px;
    cursor: pointer;
    transition: all .3s;
  }

  .login-button:hover {
    height: 92px;
    line-height: 92px;
    width: 240px;
  }
</style>