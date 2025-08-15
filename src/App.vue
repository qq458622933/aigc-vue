<template>
  <div class="app-container">
    <!-- 左侧导航栏 -->
      <Sidebar />
    <!-- 主体区域：顶部 + 内容 -->
    <div class="main-area">
      <Header />
      <div class="content">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Sidebar from '@/components/Layout/Sidebar.vue'
  import Header from '@/components/Layout/Header.vue'
</script>
<style>
  html, body, #app {
    height: 100%;
    margin: 0;
    padding: 0;
  }
</style>
<style scoped>
  .content {
    margin-left: 280px;
    width: 1640px;
    margin-top: 60px;
  }
  .app-container {
    display: flex; /* 横向排列 Sidebar + main */
    width: 100%;
    height: 100%;
  }

  .main-area {
    display: flex;
    flex-direction: column;
    flex: 1; /* 占据 Sidebar 剩余的空间 */
    height: 100%;
    overflow: hidden;
  }
</style>
