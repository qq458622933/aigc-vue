<template>
  <div class="main-content">
    <!-- 页面具体内容放这里 -->
    <h1>欢迎使用管理平台</h1>
  </div>
</template>

<script lang="ts">
  export default {
    name: "MainContent"
  }
</script>

<style scoped>
  .main-content {
    position: absolute;
    top: 60px;       /* Header 高度 */
    left: 280px;     /* Sidebar 宽度 */
    right: 0;
    bottom: 0;
    padding: 20px;
    overflow: auto;
    background-color: #f5f5f5;
  }
</style>
