<template>
  <div class="app-container">
    <Sidebar />
    <div class="main-area">
      <Header />
      <main class="content">
        <RouterView />
      </main>
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
  font-family: 
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    'Roboto',
    'Helvetica Neue',
    Arial,
    'Noto Sans',
    sans-serif;
}

#app {
  background: var(--color-background);
  color: var(--color-text-primary);
}
</style>

<style scoped>
.app-container {
  display: flex;
  width: 100%;
  height: 100vh;
  background: var(--color-background);
}

.main-area {
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: 280px;
  height: 100vh;
  overflow: hidden;
}

.content {
  flex: 1;
  margin-top: 64px;
  padding: 24px;
  background: var(--color-background-secondary);
  overflow-y: auto;
}

@media (max-width: 768px) {
  .main-area {
    margin-left: 0;
  }
  
  .content {
    padding: 16px;
  }
}
</style>
