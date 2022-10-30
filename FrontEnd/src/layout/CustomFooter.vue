<template>
	<div class='custom-footer'>
    <el-row class='footer-content'>
      <el-col :span='6' class='footer-col'>Get to Know Us</el-col>
      <el-col :span='6' class='footer-col'>Useful Link</el-col>
      <el-col :span='6' class='footer-col'>Connect With Us</el-col>
      <el-col :span='6' class='footer-col'>Feedback</el-col>
    </el-row>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
	.custom-footer {
		width: 100%;
		height: 150px;
		z-index: 999;
		background-color:#404040;
	}
  .footer-content {
    width: 100%;
  }
  .footer-col {
    padding-top: 20px;
    color: white;
    font-weight: bold;
  }
</style>