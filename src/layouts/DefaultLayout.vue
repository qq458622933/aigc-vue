<template>
  <div class="layout">
    <Header />
    <div class="main">
      <Sidebar />
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
  import Header from '@/components/Layout/Header.vue'
  import Sidebar from '@/components/Layout/Sidebar.vue'
</script>

<style scoped>
  .layout {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  .main {
    display: flex;
    flex: 1;
  }
  .content {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
  }
</style>
