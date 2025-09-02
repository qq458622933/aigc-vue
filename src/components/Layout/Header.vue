<template>
  <header class="header">
    <div class="header-container">
      <div class="logo-section">
        <div class="logo-icon">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="var(--color-primary-600)"/>
            <path d="M8 12h16M12 8l4 4 4-4M12 16l4 4 4-4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="logo-text">
          <span class="brand-name">AIGC Platform</span>
          <span class="brand-subtitle">智能内容生成平台</span>
        </div>
      </div>
      
      <div class="header-actions">
        <nav class="quick-nav">
          <a href="/dashboard" class="nav-link">工作台</a>
          <a href="/help" class="nav-link">帮助中心</a>
        </nav>
        
        <div class="user-section">
          <div class="user-avatar">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <div class="user-info">
            <span class="user-name">管理员</span>
            <span class="user-role">Administrator</span>
          </div>
          <div class="user-menu-toggle">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6,6 10,10 6,14"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  backdrop-filter: blur(8px);
  background: rgba(255, 255, 255, 0.95);
  z-index: 1000;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 24px;
  max-width: 100%;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-text {
  display: flex;
  flex-direction: column;
}

.brand-name {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text-primary);
  line-height: 1.2;
}

.brand-subtitle {
  font-size: 12px;
  color: var(--color-text-secondary);
  line-height: 1.2;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 32px;
}

.quick-nav {
  display: flex;
  gap: 24px;
}

.nav-link {
  font-size: 14px;
  color: var(--color-text-secondary);
  text-decoration: none;
  padding: 8px 0;
  position: relative;
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: var(--color-primary-600);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--color-primary-600);
  transform: scaleX(0);
  transition: transform 0.2s ease;
}

.nav-link:hover::after {
  transform: scaleX(1);
}

.user-section {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 16px;
  border-radius: var(--border-radius-lg);
  background: var(--color-background-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
}

.user-section:hover {
  background: var(--color-background-tertiary);
  box-shadow: var(--shadow-sm);
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--color-primary-100);
  color: var(--color-primary-600);
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.user-name {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-primary);
  line-height: 1.2;
}

.user-role {
  font-size: 12px;
  color: var(--color-text-tertiary);
  line-height: 1.2;
}

.user-menu-toggle {
  color: var(--color-text-tertiary);
  transition: transform 0.2s ease;
}

.user-section:hover .user-menu-toggle {
  transform: translateX(2px);
}

@media (max-width: 768px) {
  .header-container {
    padding: 0 16px;
  }
  
  .header-actions {
    gap: 16px;
  }
  
  .quick-nav {
    display: none;
  }
  
  .brand-subtitle {
    display: none;
  }
  
  .user-info {
    display: none;
  }
}
</style>
