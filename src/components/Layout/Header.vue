<template>
  <header class="header">
    <div class="logo">管理平台</div>
    <div class="user-info">
      <span>欢迎，Admin</span>
    </div>
  </header>
</template>

<script setup>
</script>

<style scoped>
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    width: 100%;
    background-color: #fdfdff;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    z-index: 999;
  }
  .logo {
    font-size: 20px;
    font-weight: bold;
    color: #181818;
  }
  .user-info {
    font-size: 14px;
    color: #181818;
  }
</style>
