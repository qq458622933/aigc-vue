<template>
  <aside class="sidebar" :class="{ open: isOpen }">
    <div class="sidebar-content">
      <div class="sidebar-header">
        <div class="sidebar-brand">
          <div class="brand-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
          </div>
          <div class="brand-text">
            <span class="brand-title">AIGC Suite</span>
            <span class="brand-description">智能创作工具集</span>
          </div>
        </div>
      </div>

      <nav class="sidebar-nav">
        <div class="nav-section">
          <div class="nav-section-title">核心功能</div>
          <div
            v-for="item in navigationItems"
            :key="item.id"
            class="nav-item"
            :class="{ active: isActiveModule(item.id) }"
            @click="handleModuleClick(item.id)"
          >
            <div class="nav-item-icon">
              <component :is="getIconComponent(item.icon)" />
            </div>
            <span class="nav-item-label">{{ item.label }}</span>
            <div v-if="item.badge" class="nav-item-badge">{{ item.badge }}</div>
          </div>
        </div>
      </nav>

      <div class="sidebar-footer">
        <div class="footer-stats">
          <div class="stat-item">
            <span class="stat-value">12</span>
            <span class="stat-label">个项目</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-value">98%</span>
            <span class="stat-label">成功率</span>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, defineComponent, h } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const _props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const router = useRouter()
const route = useRoute()

const emit = defineEmits(['module-change'])

const showDebug = ref(false)

// Icon components
const DashboardIcon = defineComponent({
  render() {
    return h('svg', {
      width: '20',
      height: '20',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: '2'
    }, [
      h('rect', { x: '3', y: '3', width: '7', height: '7' }),
      h('rect', { x: '14', y: '3', width: '7', height: '7' }),
      h('rect', { x: '14', y: '14', width: '7', height: '7' }),
      h('rect', { x: '3', y: '14', width: '7', height: '7' })
    ])
  }
})

const ImageIcon = defineComponent({
  render() {
    return h('svg', {
      width: '20',
      height: '20',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: '2'
    }, [
      h('rect', { x: '3', y: '3', width: '18', height: '18', rx: '2', ry: '2' }),
      h('circle', { cx: '8.5', cy: '8.5', r: '1.5' }),
      h('polyline', { points: '21,15 16,10 5,21' })
    ])
  }
})

const MicIcon = defineComponent({
  render() {
    return h('svg', {
      width: '20',
      height: '20',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: '2'
    }, [
      h('path', { d: 'M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z' }),
      h('path', { d: 'M19 10v2a7 7 0 0 1-14 0v-2' }),
      h('line', { x1: '12', y1: '19', x2: '12', y2: '23' }),
      h('line', { x1: '8', y1: '23', x2: '16', y2: '23' })
    ])
  }
})

const VideoIcon = defineComponent({
  render() {
    return h('svg', {
      width: '20',
      height: '20',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: '2'
    }, [
      h('polygon', { points: '23,7 16,12 23,17 23,7' }),
      h('rect', { x: '1', y: '5', width: '15', height: '14', rx: '2', ry: '2' })
    ])
  }
})

const BotIcon = defineComponent({
  render() {
    return h('svg', {
      width: '20',
      height: '20',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: '2'
    }, [
      h('rect', { x: '3', y: '11', width: '18', height: '10', rx: '2', ry: '2' }),
      h('circle', { cx: '12', cy: '5', r: '2' }),
      h('path', { d: 'M12 7v4' }),
      h('line', { x1: '8', y1: '16', x2: '8', y2: '16' }),
      h('line', { x1: '16', y1: '16', x2: '16', y2: '16' })
    ])
  }
})

const navigationItems = ref([
  {
    id: 'dashboard',
    icon: 'dashboard',
    label: '工作台',
    path: '/dashboard'
  },
  {
    id: 'imageTraining',
    icon: 'image',
    label: '形象克隆',
    path: '/imageTraining',
    badge: 'Hot'
  },
  {
    id: 'speaker-training',
    icon: 'mic',
    label: '声音克隆',
    path: '/speaker-training'
  },
  {
    id: 'video-generation',
    icon: 'video',
    label: '数字分身',
    path: '/video-generation'
  },
  {
    id: 'agent-management',
    icon: 'bot',
    label: '智能体',
    path: '/agent-management'
  }
])

const getIconComponent = (iconName: string) => {
  const iconMap: Record<string, any> = {
    'dashboard': DashboardIcon,
    'image': ImageIcon,
    'mic': MicIcon,
    'video': VideoIcon,
    'bot': BotIcon
  }
  return iconMap[iconName] || DashboardIcon
}

const activeModuleId = computed(() => {
  const currentPath = route.path
  const activeItem = navigationItems.value.find(item =>
    currentPath === item.path || currentPath.startsWith(item.path + '/')
  )
  return activeItem ? activeItem.id : 'dashboard'
})

const isActiveModule = (moduleId: string) => {
  return activeModuleId.value === moduleId
}

const handleModuleClick = async (moduleId: string) => {
  const item = navigationItems.value.find(nav => nav.id === moduleId)
  
  if (item) {
    try {
      await router.push(item.path)
      emit('module-change', moduleId)
    } catch (error) {
      console.error('Navigation failed:', error)
    }
  }
}

watch(route, (newRoute, oldRoute) => {
  if (showDebug.value) {
    console.log('Route changed:', {
      from: oldRoute?.path,
      to: newRoute.path,
      activeModule: activeModuleId.value
    })
  }
}, { immediate: true })

onMounted(() => {
  if (route.path === '/') {
    router.replace('/dashboard')
  }
})
</script>

<style scoped>
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  width: 280px;
  height: 100vh;
  background: var(--color-surface);
  border-right: 1px solid var(--color-border);
  z-index: 999;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.sidebar-header {
  padding: 24px 20px;
  border-bottom: 1px solid var(--color-border);
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--border-radius-lg);
  background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600));
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-sm);
}

.brand-text {
  display: flex;
  flex-direction: column;
}

.brand-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text-primary);
  line-height: 1.2;
}

.brand-description {
  font-size: 12px;
  color: var(--color-text-secondary);
  line-height: 1.2;
}

.sidebar-nav {
  flex: 1;
  padding: 16px 0;
  overflow-y: auto;
}

.nav-section {
  padding: 0 20px;
}

.nav-section-title {
  font-size: 12px;
  font-weight: 500;
  color: var(--color-text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
  padding: 0 4px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  margin: 2px 0;
  border-radius: var(--border-radius-base);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.nav-item:hover {
  background: var(--color-background-secondary);
  color: var(--color-text-primary);
}

.nav-item.active {
  background: var(--color-primary-50);
  color: var(--color-primary-700);
  font-weight: 500;
}

.nav-item.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 20px;
  background: var(--color-primary-600);
  border-radius: 0 2px 2px 0;
}

.nav-item-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: inherit;
}

.nav-item.active .nav-item-icon {
  color: var(--color-primary-600);
}

.nav-item-label {
  flex: 1;
  font-size: 14px;
}

.nav-item-badge {
  background: var(--color-error);
  color: white;
  font-size: 10px;
  font-weight: 500;
  padding: 2px 6px;
  border-radius: 10px;
  line-height: 1.2;
}

.sidebar-footer {
  padding: 20px;
  border-top: 1px solid var(--color-border);
}

.footer-stats {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: var(--color-background-secondary);
  border-radius: var(--border-radius-lg);
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}

.stat-value {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text-primary);
  line-height: 1.2;
}

.stat-label {
  font-size: 11px;
  color: var(--color-text-tertiary);
  line-height: 1.2;
}

.stat-divider {
  width: 1px;
  height: 20px;
  background: var(--color-border);
}

@media (max-width: 768px) {
  .sidebar {
    width: 260px;
    transform: translateX(-100%);
  }

  .sidebar.open {
    transform: translateX(0);
  }
}
</style>
