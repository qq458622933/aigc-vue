<template>
  <div class="sidebar" :class="{ open: isOpen }">
    <div class="sidebar-header">
      <h2>🎬 数字人平台</h2>
      <p>AI视频生成管理系统</p>
    </div>

    <nav class="sidebar-nav">
      <div
        v-for="item in navigationItems"
        :key="item.id"
        class="nav-item"
        :class="{ active: isActiveModule(item.id) }"
        @click="handleModuleClick(item.id)"
      >
        <i>{{ item.icon }}</i>
        <span>{{ item.label }}</span>
      </div>
    </nav>

    <!-- 调试信息 -->
<!--    <div class="debug-info" v-if="showDebug">-->
<!--      <p>当前路由: {{ route.path }}</p>-->
<!--      <p>激活模块: {{ activeModuleId }}</p>-->
<!--    </div>-->
  </div>
</template>

<script setup>
  import { ref, computed, onMounted, watch } from 'vue'
  import { useRouter, useRoute } from 'vue-router'

  // Props
  const props = defineProps({
    isOpen: {
      type: Boolean,
      default: false
    }
  })

  // Router 实例
  const router = useRouter()
  const route = useRoute()

  // Emits
  const emit = defineEmits(['module-change'])

  // 调试开关
  const showDebug = ref(true) // 开发时设为 true，生产时设为 false

  // 导航菜单数据
  const navigationItems = ref([
    {
      id: 'dashboard',
      icon: '📊',
      label: '首页',
      path: '/dashboard'
    },
    {
      id: 'imageTraining',
      icon: '👤',
      label: '形象克隆',
      path: '/imageTraining'
    },
    {
      id: 'speaker-training',
      icon: '🗣️',
      label: '声音克隆',
      path: '/speaker-training'
    },
    {
      id: 'video-generation',
      icon: '🎬',
      label: '数字分身',
      path: '/video-generation'
    },
    {
      id: 'agent-management',
      icon: '🤖',
      label: '智能体',
      path: '/agent-management'
    }
  ])

  // 计算当前激活的模块ID
  const activeModuleId = computed(() => {
    const currentPath = route.path
    const activeItem = navigationItems.value.find(item =>
      currentPath === item.path || currentPath.startsWith(item.path + '/')
    )
    return activeItem ? activeItem.id : 'dashboard'
  })

  // 判断当前激活的模块
  const isActiveModule = (moduleId) => {
    return activeModuleId.value === moduleId
  }

  // 处理模块点击
  const handleModuleClick = async (moduleId) => {
    console.log('🔍 点击模块:', moduleId)

    const item = navigationItems.value.find(nav => nav.id === moduleId)
    console.log('🔍 找到的菜单项:', item)

    if (item) {
      console.log('🚀 准备跳转到:', item.path)
      console.log('🔍 当前路由:', route.path)

      try {
        // 路由跳转
        await router.push(item.path)
        console.log('✅ 路由跳转成功')

        // 触发事件
        emit('module-change', moduleId)
        console.log('📡 触发事件:', moduleId)

      } catch (error) {
        console.error('❌ 路由跳转失败:', error)
      }
    } else {
      console.error('❌ 未找到对应的菜单项:', moduleId)
    }
  }

  // 监听路由变化
  watch(route, (newRoute, oldRoute) => {
    console.log('🔄 路由变化:', {
      from: oldRoute?.path,
      to: newRoute.path,
      activeModule: activeModuleId.value
    })
  }, { immediate: true })

  // 组件挂载时处理默认路由
  onMounted(() => {
    console.log('🚀 组件挂载，当前路由:', route.path)

    // 如果当前是根路径，自动跳转到dashboard
    if (route.path === '/') {
      console.log('📍 根路径重定向到 dashboard')
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
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    z-index: 1000;
    transition: all 0.3s ease;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  }

  .sidebar-header {
    padding: 30px 25px;
    text-align: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .sidebar-header h2 {
    color: white;
    font-size: 1.5rem;
    margin-bottom: 5px;
    margin: 0;
  }

  .sidebar-header p {
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.9rem;
    margin: 5px 0 0 0;
  }

  .sidebar-nav {
    padding: 20px 0;
  }

  .nav-item {
    display: flex;
    align-items: center;
    padding: 15px 25px;
    color: rgba(255, 255, 255, 0.8);
    cursor: pointer;
    transition: all 0.3s ease;
    border-left: 3px solid transparent;
  }

  .nav-item:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border-left-color: #fff;
  }

  .nav-item.active {
    background: rgba(255, 255, 255, 0.15);
    color: white;
    border-left-color: #fff;
  }

  .nav-item i {
    font-size: 1.5rem;
    margin-right: 15px;
    width: 25px;
    text-align: center;
  }

  .nav-item span {
    font-size: 1rem;
    font-weight: 500;
  }

  /* 调试信息样式 */
  .debug-info {
    position: absolute;
    bottom: 20px;
    left: 20px;
    right: 20px;
    background: rgba(0, 0, 0, 0.3);
    padding: 10px;
    border-radius: 5px;
    color: white;
    font-size: 0.8rem;
  }

  .debug-info p {
    margin: 2px 0;
  }

  /* 响应式设计 */
  @media (max-width: 768px) {
    .sidebar {
      width: 250px;
      transform: translateX(-100%);
    }

    .sidebar.open {
      transform: translateX(0);
    }
  }
</style>
