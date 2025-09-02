<template>
  <div class="agent-management-page">
    <header class="page-header">
      <div class="header-content">
        <h1 class="page-title">智能体</h1>
        <p class="page-subtitle">定制专属知识库，打造个性化AI助手</p>
        <button class="create-agent-btn" @click="showCreateModal = true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          创建智能体
        </button>
      </div>
    </header>

    <div class="container">
      <div class="tab-navigation">
        <button class="tab-btn" :class="{ active: activeTab === 'mine' }" @click="activeTab = 'mine'">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
          我的
        </button>
        <button class="tab-btn" :class="{ active: activeTab === 'others' }" @click="activeTab = 'others'">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          其他
        </button>
        <button class="tab-btn" :class="{ active: activeTab === 'templates' }" @click="activeTab = 'templates'">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <rect x="7" y="7" width="3" height="3"/>
            <rect x="14" y="7" width="3" height="3"/>
            <rect x="7" y="14" width="3" height="3"/>
            <rect x="14" y="14" width="3" height="3"/>
          </svg>
          模板
        </button>
      </div>
    </div>

    <main class="main-content">
      <div class="container">
        <div v-if="activeTab === 'mine'" class="mine-section">
          <div class="search-section">
            <div class="search-card">
              <div class="search-filters">
                <div class="filter-group">
                  <label class="filter-label">发布状态</label>
                  <select class="filter-select" v-model="searchFilters.publishStatus">
                    <option value="">全部</option>
                    <option value="published">已发布</option>
                    <option value="unpublished">未发布</option>
                  </select>
                </div>
                <div class="filter-group">
                  <label class="filter-label">智能体类型</label>
                  <select class="filter-select" v-model="searchFilters.agentType">
                    <option value="">全部</option>
                    <option value="dialogue">对话流</option>
                    <option value="task">工作流</option>
                  </select>
                </div>
                <div class="filter-group">
                  <label class="filter-label">智能体名称</label>
                  <input type="text" class="filter-input" placeholder="请输入智能体名称" v-model="searchFilters.agentName"/>
                </div>
                <div class="filter-actions">
                  <button class="search-btn" @click="performSearch">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="11" cy="11" r="8"/>
                      <path d="M21 21l-4.35-4.35"/>
                    </svg>
                    搜索
                  </button>
                  <button class="reset-btn" @click="resetFilters">重置</button>
                </div>
              </div>
            </div>
          </div>

          <div class="agents-grid">
            <div v-for="agent in filteredAgents" :key="agent.id" class="agent-card">
              <div class="card-header">
                <div class="agent-icon">
                  <img v-if="agent.avatar" :src="agent.avatar" :alt="agent.name" class="agent-avatar">
                  <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 12l2 2 4-4"/>
                    <path d="M21 12c.552 0 1-.448 1-1V5c0-.552-.448-1-1-1H3c-.552 0-1 .448-1 1v6c0 .552.448 1 1 1h9l4 4v-4z"/>
                  </svg>
                </div>
                <div class="card-status">
                  <span class="status-badge" :class="getStatusClass(agent.publishStatus)">
                    {{ getStatusText(agent.publishStatus) }}
                  </span>
                </div>
              </div>
              <div class="card-content">
                <h3 class="agent-name">{{ agent.name }}</h3>
                <p class="agent-description">{{ agent.description }}</p>
                <div class="agent-meta">
                  <div class="meta-item">
                    <span class="meta-label">类型:</span>
                    <span class="meta-value">{{ getTypeText(agent.type) }}</span>
                  </div>
                  <div class="meta-item">
                    <span class="meta-label">发布时间:</span>
                    <span class="meta-value">{{ agent.publishTime || '未发布' }}</span>
                  </div>
                  <div class="meta-item">
                    <span class="meta-label">发布人:</span>
                    <span class="meta-value">{{ agent.publisher || '-' }}</span>
                  </div>
                </div>
              </div>
              <div class="card-actions">
                <button class="action-btn edit-btn" @click="editAgent(agent)">编辑</button>
                <button class="action-btn publish-btn" @click="togglePublish(agent)" v-if="agent.publishStatus === 'unpublished'">发布</button>
                <button class="action-btn unpublish-btn" @click="togglePublish(agent)" v-if="agent.publishStatus === 'published'">取消发布</button>
                <button class="action-btn delete-btn" @click="deleteAgent(agent)">删除</button>
              </div>
            </div>
          </div>

          <div class="empty-state" v-if="filteredAgents.length === 0">
            <div class="empty-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 12l2 2 4-4"/>
                <path d="M21 12c.552 0 1-.448 1-1V5c0-.552-.448-1-1-1H3c-.552 0-1 .448-1 1v6c0 .552.448 1 1 1h9l4 4v-4z"/>
              </svg>
            </div>
            <p>暂无符合条件的智能体</p>
            <button class="create-btn" @click="showCreateModal = true">创建智能体</button>
          </div>
        </div>

        <div v-if="activeTab === 'others'" class="others-section">
          <div class="section-header">
            <h2 class="section-title">其他智能体</h2>
            <p class="section-subtitle">发现更多由其他用户创建的智能体</p>
          </div>
          <div class="agents-grid">
            <div v-for="agent in otherAgents" :key="agent.id" class="agent-card">
              <div class="card-header">
                <div class="agent-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 12l2 2 4-4"/>
                    <path d="M21 12c.552 0 1-.448 1-1V5c0-.552-.448-1-1-1H3c-.552 0-1 .448-1 1v6c0 .552.448 1 1 1h9l4 4v-4z"/>
                  </svg>
                </div>
                <div class="card-rating">
                  <span class="rating-stars">⭐ {{ agent.rating }}</span>
                </div>
              </div>
              <div class="card-content">
                <h3 class="agent-name">{{ agent.name }}</h3>
                <p class="agent-description">{{ agent.description }}</p>
                <div class="agent-meta">
                  <div class="meta-item">
                    <span class="meta-label">类型:</span>
                    <span class="meta-value">{{ getTypeText(agent.type) }}</span>
                  </div>
                  <div class="meta-item">
                    <span class="meta-label">创建者:</span>
                    <span class="meta-value">{{ agent.creator }}</span>
                  </div>
                  <div class="meta-item">
                    <span class="meta-label">使用次数:</span>
                    <span class="meta-value">{{ agent.usageCount }}</span>
                  </div>
                </div>
              </div>
              <div class="card-actions">
                <button class="action-btn use-btn" @click="useAgent(agent)">使用</button>
                <button class="action-btn fork-btn" @click="forkAgent(agent)">复制</button>
              </div>
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'templates'" class="templates-section">
          <div class="section-header">
            <h2 class="section-title">智能体模板</h2>
            <p class="section-subtitle">基于模板快速创建您的专属智能体</p>
          </div>
          <div class="agents-grid">
            <div v-for="template in templateAgents" :key="template.id" class="agent-card template-card">
              <div class="card-header">
                <div class="agent-icon template-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <rect x="7" y="7" width="3" height="3"/>
                    <rect x="14" y="7" width="3" height="3"/>
                    <rect x="7" y="14" width="3" height="3"/>
                    <rect x="14" y="14" width="3" height="3"/>
                  </svg>
                </div>
                <div class="template-badge">
                  <span>模板</span>
                </div>
              </div>
              <div class="card-content">
                <h3 class="agent-name">{{ template.name }}</h3>
                <p class="agent-description">{{ template.description }}</p>
                <div class="agent-meta">
                  <div class="meta-item">
                    <span class="meta-label">类型:</span>
                    <span class="meta-value">{{ getTypeText(template.type) }}</span>
                  </div>
                  <div class="meta-item">
                    <span class="meta-label">适用场景:</span>
                    <span class="meta-value">{{ template.scenario }}</span>
                  </div>
                  <div class="meta-item">
                    <span class="meta-label">使用次数:</span>
                    <span class="meta-value">{{ template.usageCount }}</span>
                  </div>
                </div>
              </div>
              <div class="card-actions">
                <button class="action-btn use-template-btn" @click="useTemplate(template)">使用模板</button>
                <button class="action-btn preview-btn" @click="previewTemplate(template)">预览</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- 创建智能体弹窗 -->
    <div v-if="showCreateModal" class="modal-overlay" @click="closeCreateModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2 class="modal-title">创建智能体</h2>
          <button class="modal-close" @click="closeCreateModal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <form @submit.prevent="createAgent" class="modal-form">
          <div class="form-group">
            <label class="form-label">智能体类型 <span class="required">*</span></label>
            <div class="type-selector">
              <div class="type-option"
                   :class="{ active: createForm.type === 'dialogue' }"
                   @click="createForm.type = 'dialogue'">
                <div class="type-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                </div>
                <div class="type-content">
                  <h4>对话流</h4>
                  <p>单轮自动化任务的工作流</p>
                </div>
              </div>
              <div class="type-option"
                   :class="{ active: createForm.type === 'task' }"
                   @click="createForm.type = 'task'">
                <div class="type-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 12l2 2 4-4"/>
                    <path d="M21 12c.552 0 1-.448 1-1V5c0-.552-.448-1-1-1H3c-.552 0-1 .448-1 1v6c0 .552.448 1 1 1h9l4 4v-4z"/>
                  </svg>
                </div>
                <div class="type-content">
                  <h4>工作流</h4>
                  <p>支持记忆的复杂多轮对话工作流</p>
                </div>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">智能体名称 <span class="required">*</span></label>
            <input
              type="text"
              class="form-input"
              v-model="createForm.name"
              placeholder="请输入智能体名称"
              required>
          </div>

          <div class="form-group">
            <label class="form-label">智能体头像</label>
            <div class="avatar-upload">
              <div class="avatar-preview" @click="($refs.avatarInput as HTMLInputElement).click()">
                <img v-if="createForm.avatar" :src="createForm.avatar" alt="头像预览">
                <div v-else class="avatar-placeholder">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
                    <circle cx="12" cy="13" r="3"/>
                  </svg>
                  <span>上传头像</span>
                </div>
              </div>
              <input
                ref="avatarInput"
                type="file"
                accept="image/*"
                @change="handleAvatarUpload"
                style="display: none;">
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">功能描述 <span class="required">*</span></label>
            <textarea
              class="form-textarea"
              v-model="createForm.description"
              placeholder="请描述智能体的主要功能和应用场景"
              rows="4"
              required></textarea>
          </div>

          <div class="form-actions">
            <button type="button" class="btn btn-secondary" @click="closeCreateModal">取消</button>
            <button type="submit" class="btn btn-primary" :disabled="!isFormValid">创建智能体</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { ref, reactive, computed } from 'vue'

  export default {
    name: 'AgentManagement',
    setup() {
      const activeTab = ref('mine')
      const showCreateModal = ref(false)

      const searchFilters = reactive({
        publishStatus: '',
        agentType: '',
        agentName: ''
      })

      const createForm = reactive({
        type: 'dialogue',
        name: '',
        avatar: '',
        description: ''
      })

      const myAgents = ref([
        {
          id: 'agent_001',
          name: '客服助手',
          description: '专业的客户服务智能体，能够回答常见问题，处理客户咨询，提供24小时在线服务。',
          type: 'dialogue',
          publishStatus: 'published',
          publishTime: '2024-01-15 14:30:25',
          publisher: '张三',
          avatar: ''
        },
        {
          id: 'agent_002',
          name: '文档分析器',
          description: '智能文档处理助手，可以快速分析、总结和提取文档中的关键信息。',
          type: 'task',
          publishStatus: 'unpublished',
          publishTime: '',
          publisher: '',
          avatar: ''
        },
        {
          id: 'agent_003',
          name: '代码审查员',
          description: '专业的代码审查智能体，提供代码质量检查、安全性分析和优化建议。',
          type: 'task',
          publishStatus: 'published',
          publishTime: '2024-01-14 10:15:42',
          publisher: '李四',
          avatar: ''
        },
        {
          id: 'agent_004',
          name: '销售顾问',
          description: '销售领域的专业顾问，协助制定销售策略，分析客户需求，提升销售效率。',
          type: 'dialogue',
          publishStatus: 'unpublished',
          publishTime: '',
          publisher: '',
          avatar: ''
        }
      ])

      const otherAgents = ref([
        {
          id: 'other_001',
          name: '法律顾问',
          description: '专业的法律咨询智能体，提供法律条文解读、合同审查等服务。',
          type: 'dialogue',
          creator: '王律师',
          rating: 4.8,
          usageCount: 1250
        },
        {
          id: 'other_002',
          name: '数据分析师',
          description: '强大的数据分析工具，支持多种数据格式，提供深度分析报告。',
          type: 'task',
          creator: '数据科学团队',
          rating: 4.6,
          usageCount: 890
        },
        {
          id: 'other_003',
          name: '营销策划师',
          description: '营销领域专家，协助制定营销方案、分析市场趋势、优化广告投放。',
          type: 'dialogue',
          creator: '营销大师',
          rating: 4.9,
          usageCount: 2100
        }
      ])

      const templateAgents = ref([
        {
          id: 'template_001',
          name: '企业客服模板',
          description: '标准的企业客服智能体模板，包含常见问题处理、工单创建等功能。',
          type: 'dialogue',
          scenario: '客户服务',
          usageCount: 3200
        },
        {
          id: 'template_002',
          name: '电商助手模板',
          description: '电商平台专用智能体，支持商品推荐、订单查询、售后处理等功能。',
          type: 'dialogue',
          scenario: '电商平台',
          usageCount: 2800
        },
        {
          id: 'template_003',
          name: '文档处理模板',
          description: '通用文档处理工具模板，支持文档格式转换、内容提取、智能分类。',
          type: 'task',
          scenario: '办公自动化',
          usageCount: 1900
        },
        {
          id: 'template_004',
          name: '教育助手模板',
          description: '在线教育智能体模板，提供答疑解惑、学习计划制定、知识点梳理。',
          type: 'dialogue',
          scenario: '在线教育',
          usageCount: 2500
        }
      ])

      const filteredAgents = computed(() => {
        let filtered = myAgents.value

        if (searchFilters.publishStatus) {
          filtered = filtered.filter(agent => agent.publishStatus === searchFilters.publishStatus)
        }

        if (searchFilters.agentType) {
          filtered = filtered.filter(agent => agent.type === searchFilters.agentType)
        }

        if (searchFilters.agentName) {
          const nameFilter = searchFilters.agentName.toLowerCase()
          filtered = filtered.filter(agent =>
            agent.name.toLowerCase().includes(nameFilter) ||
            agent.description.toLowerCase().includes(nameFilter)
          )
        }

        return filtered
      })

      const isFormValid = computed(() => {
        return createForm.type && createForm.name.trim() && createForm.description.trim()
      })

      const performSearch = () => {
        console.log('执行搜索', searchFilters)
      }

      const resetFilters = () => {
        Object.assign(searchFilters, {
          publishStatus: '',
          agentType: '',
          agentName: ''
        })
      }

      const getStatusClass = (status) => {
        return status === 'published' ? 'status-published' : 'status-unpublished'
      }

      const getStatusText = (status) => {
        return status === 'published' ? '已发布' : '未发布'
      }

      const getTypeText = (type) => {
        return type === 'dialogue' ? '对话流' : '工作流'
      }

      const editAgent = (agent) => {
        alert(`编辑智能体: ${agent.name}`)
      }

      const togglePublish = (agent) => {
        if (agent.publishStatus === 'published') {
          agent.publishStatus = 'unpublished'
          agent.publishTime = ''
          agent.publisher = ''
          alert(`${agent.name} 已取消发布`)
        } else {
          agent.publishStatus = 'published'
          agent.publishTime = new Date().toLocaleString('zh-CN')
          agent.publisher = '当前用户'
          alert(`${agent.name} 发布成功`)
        }
      }

      const deleteAgent = (agent) => {
        if (confirm(`确定要删除智能体 "${agent.name}" 吗？`)) {
          const index = myAgents.value.findIndex(a => a.id === agent.id)
          if (index > -1) {
            myAgents.value.splice(index, 1)
          }
        }
      }

      const useAgent = (agent) => {
        alert(`使用智能体: ${agent.name}`)
      }

      const forkAgent = (agent) => {
        alert(`复制智能体: ${agent.name} 到我的智能体`)
      }

      const useTemplate = (template) => {
        alert(`使用模板: ${template.name} 创建新智能体`)
      }

      const previewTemplate = (template) => {
        alert(`预览模板: ${template.name}`)
      }

      const closeCreateModal = () => {
        showCreateModal.value = false
        // 重置表单
        Object.assign(createForm, {
          type: 'dialogue',
          name: '',
          avatar: '',
          description: ''
        })
      }

      const handleAvatarUpload = (event) => {
        const file = event.target.files[0]
        if (file) {
          const reader = new FileReader()
          reader.onload = (e) => {
            createForm.avatar = e.target?.result as string
          }
          reader.readAsDataURL(file)
        }
      }

      const createAgent = () => {
        if (!isFormValid.value) return

        const newAgent = {
          id: `agent_${Date.now()}`,
          name: createForm.name,
          description: createForm.description,
          type: createForm.type,
          publishStatus: 'unpublished',
          publishTime: '',
          publisher: '',
          avatar: createForm.avatar
        }

        myAgents.value.unshift(newAgent)
        closeCreateModal()
        alert(`智能体 "${newAgent.name}" 创建成功！`)
      }

      return {
        activeTab,
        showCreateModal,
        searchFilters,
        createForm,
        myAgents,
        otherAgents,
        templateAgents,
        filteredAgents,
        isFormValid,
        performSearch,
        resetFilters,
        getStatusClass,
        getStatusText,
        getTypeText,
        editAgent,
        togglePublish,
        deleteAgent,
        useAgent,
        forkAgent,
        useTemplate,
        previewTemplate,
        closeCreateModal,
        handleAvatarUpload,
        createAgent
      }
    }
  }
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .agent-management-page {
    min-height: 100vh;
    background: var(--color-background-secondary);
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
  }

  .page-header {
    background: var(--color-surface);
    border-bottom: 1px solid var(--color-border);
    padding: 32px 0;
    margin-bottom: 32px;
    position: relative;
  }

  .header-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
    text-align: center;
  }

  .page-title {
    font-size: 28px;
    font-weight: 600;
    color: var(--color-text-primary);
    margin-bottom: 8px;
  }

  .page-subtitle {
    font-size: 16px;
    color: var(--color-text-secondary);
  }

  .create-agent-btn {
    position: absolute;
    top: 50%;
    right: 24px;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 20px;
    background: var(--color-primary-500);
    color: white;
    border: none;
    border-radius: var(--border-radius-base);
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: var(--shadow-sm);
  }

  .create-agent-btn:hover {
    background: var(--color-primary-600);
    box-shadow: var(--shadow-md);
    transform: translateY(-50%) translateY(-2px);
  }

  .create-agent-btn svg {
    width: 20px;
    height: 20px;
  }

  .tab-navigation {
    display: flex;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-lg);
    padding: 8px;
    margin-bottom: 32px;
    box-shadow: var(--shadow-sm);
  }

  .tab-btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 12px 20px;
    border: none;
    background: transparent;
    border-radius: var(--border-radius-base);
    font-size: 14px;
    font-weight: 500;
    color: var(--color-text-secondary);
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .tab-btn svg {
    width: 18px;
    height: 18px;
  }

  .tab-btn.active {
    background: var(--color-primary-500);
    color: white;
    box-shadow: var(--shadow-sm);
  }

  .tab-btn:hover:not(.active) {
    background: var(--color-background-secondary);
    color: var(--color-primary-500);
  }

  .main-content {
    max-width: 1200px;
    margin: 0 auto 40px;
    padding: 0 24px;
  }

  .search-section {
    margin-bottom: 30px;
  }

  .search-card {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-lg);
    padding: 24px;
    box-shadow: var(--shadow-sm);
  }

  .search-filters {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    align-items: end;
  }

  .filter-group {
    display: flex;
    flex-direction: column;
  }

  .filter-label {
    font-size: 14px;
    font-weight: 500;
    color: var(--color-text-primary);
    margin-bottom: 6px;
  }

  .filter-select,
  .filter-input {
    padding: 10px 12px;
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-base);
    font-size: 14px;
    background: var(--color-surface);
    color: var(--color-text-primary);
    transition: all 0.2s ease;
  }

  .filter-select:focus,
  .filter-input:focus {
    outline: none;
    border-color: var(--color-primary-500);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }

  .filter-actions {
    display: flex;
    gap: 10px;
  }

  .search-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 10px 20px;
    background: var(--color-primary-500);
    color: white;
    border: none;
    border-radius: var(--border-radius-base);
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .search-btn:hover {
    background: var(--color-primary-600);
    box-shadow: var(--shadow-md);
    transform: translateY(-1px);
  }

  .search-btn svg {
    width: 16px;
    height: 16px;
  }

  .reset-btn {
    padding: 10px 16px;
    background: var(--color-surface);
    color: var(--color-text-secondary);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-base);
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .reset-btn:hover {
    border-color: var(--color-primary-500);
    color: var(--color-primary-500);
  }

  .section-header {
    text-align: center;
    margin-bottom: 32px;
    padding: 32px 0;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-lg);
  }

  .section-title {
    font-size: 20px;
    font-weight: 600;
    color: var(--color-text-primary);
    margin-bottom: 8px;
  }

  .section-subtitle {
    font-size: 14px;
    color: var(--color-text-secondary);
  }

  .agents-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 25px;
  }

  .agent-card {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-lg);
    padding: 24px;
    transition: all 0.2s ease;
  }

  .agent-card:hover {
    box-shadow: var(--shadow-lg);
    transform: translateY(-4px);
    border-color: var(--color-primary-200);
  }

  .template-card {
    background: linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%);
    border: 2px solid #e0e7ff;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }

  .agent-icon {
    width: 48px;
    height: 48px;
    border-radius: var(--border-radius-base);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    overflow: hidden;
    background: var(--color-primary-500);
  }

  .agent-avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px;
  }

  .template-icon {
    background: linear-gradient(135deg, #8b5cf6, #a855f7);
  }

  .agent-icon svg {
    width: 24px;
    height: 24px;
  }

  .status-badge {
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 500;
  }

  .status-published {
    background: var(--color-success-light);
    color: var(--color-success);
  }

  .status-unpublished {
    background: var(--color-warning-light);
    color: var(--color-warning);
  }

  .rating-stars {
    font-size: 0.9rem;
    color: #f59e0b;
    font-weight: 500;
  }

  .template-badge {
    background: #8b5cf6;
    color: white;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 500;
  }

  .card-content {
    margin-bottom: 20px;
  }

  .agent-name {
    font-size: 18px;
    font-weight: 600;
    color: var(--color-text-primary);
    margin-bottom: 8px;
  }

  .agent-description {
    color: var(--color-text-secondary);
    line-height: 1.5;
    margin-bottom: 16px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .agent-meta {
    space-y: 6px;
  }

  .meta-item {
    display: flex;
    align-items: center;
    margin-bottom: 6px;
  }

  .meta-label {
    font-size: 12px;
    color: var(--color-text-tertiary);
    min-width: 70px;
    font-weight: 500;
  }

  .meta-value {
    font-size: 12px;
    color: var(--color-text-secondary);
  }

  .card-actions {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .action-btn {
    padding: 8px 16px;
    border: none;
    border-radius: 6px;
    font-size: 0.85rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    flex: 1;
  }

  .edit-btn {
    background: #3b82f6;
    color: white;
  }

  .edit-btn:hover {
    background: #2563eb;
  }

  .publish-btn {
    background: #10b981;
    color: white;
  }

  .publish-btn:hover {
    background: #059669;
  }

  .unpublish-btn {
    background: #f59e0b;
    color: white;
  }

  .unpublish-btn:hover {
    background: #d97706;
  }

  .delete-btn {
    background: #ef4444;
    color: white;
  }

  .delete-btn:hover {
    background: #dc2626;
  }

  .use-btn {
    background: #8b5cf6;
    color: white;
  }

  .use-btn:hover {
    background: #7c3aed;
  }

  .fork-btn {
    background: #06b6d4;
    color: white;
  }

  .fork-btn:hover {
    background: #0891b2;
  }

  .use-template-btn {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
  }

  .use-template-btn:hover {
    background: linear-gradient(135deg, #5a67d8, #6b46c1);
  }

  .preview-btn {
    background: #64748b;
    color: white;
  }

  .preview-btn:hover {
    background: #475569;
  }

  .empty-state {
    text-align: center;
    padding: 80px 20px;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-lg);
    color: var(--color-text-secondary);
  }

  .empty-icon {
    width: 100px;
    height: 100px;
    margin: 0 auto 20px;
    opacity: 0.6;
  }

  .empty-icon svg {
    width: 100%;
    height: 100%;
  }

  .empty-state p {
    font-size: 1.1rem;
    margin-bottom: 20px;
    opacity: 0.9;
  }

  .create-btn {
    background: linear-gradient(135deg, #10b981, #059669);
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .create-btn:hover {
    background: linear-gradient(135deg, #059669, #047857);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }

  /* 弹窗样式 */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    backdrop-filter: blur(4px);
  }

  .modal-content {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-lg);
    width: 90%;
    max-width: 600px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: var(--shadow-xl);
    animation: modalSlideIn 0.3s ease;
  }

  @keyframes modalSlideIn {
    from {
      opacity: 0;
      transform: translateY(-50px) scale(0.9);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 24px 0;
    border-bottom: 1px solid var(--color-border);
    margin-bottom: 24px;
  }

  .modal-title {
    font-size: 20px;
    font-weight: 600;
    color: var(--color-text-primary);
  }

  .modal-close {
    width: 32px;
    height: 32px;
    border: none;
    background: #f3f4f6;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .modal-close:hover {
    background: #e5e7eb;
  }

  .modal-close svg {
    width: 18px;
    height: 18px;
    color: #666;
  }

  .modal-form {
    padding: 0 24px 24px;
  }

  .form-group {
    margin-bottom: 24px;
  }

  .form-label {
    display: block;
    font-size: 14px;
    font-weight: 500;
    color: var(--color-text-primary);
    margin-bottom: 8px;
  }

  .required {
    color: #ef4444;
  }

  .type-selector {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  .type-option {
    padding: 20px;
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .type-option:hover {
    border-color: #667eea;
    background: #f8f9ff;
  }

  .type-option.active {
    border-color: #667eea;
    background: linear-gradient(135deg, #f8f9ff, #ffffff);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
  }

  .type-icon {
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    flex-shrink: 0;
  }

  .type-icon svg {
    width: 20px;
    height: 20px;
  }

  .type-content h4 {
    font-size: 1rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 4px;
  }

  .type-content p {
    font-size: 0.85rem;
    color: #666;
    line-height: 1.4;
  }

  .form-input,
  .form-textarea {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-base);
    font-size: 14px;
    background: var(--color-surface);
    color: var(--color-text-primary);
    transition: all 0.2s ease;
  }

  .form-input:focus,
  .form-textarea:focus {
    outline: none;
    border-color: var(--color-primary-500);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }

  .form-textarea {
    resize: vertical;
    min-height: 100px;
    font-family: inherit;
  }

  .avatar-upload {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .avatar-preview {
    width: 80px;
    height: 80px;
    border: 2px dashed #d1d5db;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    overflow: hidden;
  }

  .avatar-preview:hover {
    border-color: #667eea;
    background: #f8f9ff;
  }

  .avatar-preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .avatar-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    color: #666;
  }

  .avatar-placeholder svg {
    width: 24px;
    height: 24px;
  }

  .avatar-placeholder span {
    font-size: 0.8rem;
  }

  .form-actions {
    display: flex;
    gap: 12px;
    justify-content: flex-end;
    margin-top: 32px;
    padding-top: 20px;
    border-top: 1px solid #e5e7eb;
  }

  .btn {
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .btn-secondary {
    background: var(--color-background-secondary);
    color: var(--color-text-secondary);
    border: 1px solid var(--color-border);
  }

  .btn-secondary:hover {
    background: var(--color-background);
  }

  .btn-primary {
    background: var(--color-primary-500);
    color: white;
  }

  .btn-primary:hover:not(:disabled) {
    background: var(--color-primary-600);
    box-shadow: var(--shadow-md);
    transform: translateY(-1px);
  }

  .btn-primary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .mine-section,
  .others-section,
  .templates-section {
    animation: fadeIn 0.3s ease;
  }

  @media (max-width: 768px) {
    .container {
      padding: 0 15px;
    }

    .page-title {
      font-size: 2rem;
    }

    .create-agent-btn {
      position: static;
      margin-top: 20px;
    }

    .tab-btn {
      padding: 10px 15px;
      font-size: 0.9rem;
    }

    .tab-btn svg {
      width: 16px;
      height: 16px;
    }

    .search-filters {
      grid-template-columns: 1fr;
      gap: 15px;
    }

    .filter-actions {
      grid-column: 1;
      justify-self: stretch;
    }

    .search-btn,
    .reset-btn {
      flex: 1;
    }

    .agents-grid {
      grid-template-columns: 1fr;
      gap: 20px;
    }

    .agent-card {
      padding: 20px;
    }

    .card-actions {
      flex-direction: column;
    }

    .action-btn {
      width: 100%;
    }

    .type-selector {
      grid-template-columns: 1fr;
    }

    .modal-content {
      width: 95%;
      margin: 20px;
    }
  }

  @media (max-width: 480px) {
    .page-header {
      padding: 40px 0 30px;
    }

    .page-title {
      font-size: 1.8rem;
    }

    .tab-navigation {
      padding: 6px;
    }

    .tab-btn {
      padding: 8px 12px;
      font-size: 0.85rem;
    }

    .search-card {
      padding: 20px;
    }

    .agent-card {
      padding: 15px;
    }

    .agent-name {
      font-size: 1.1rem;
    }

    .section-title {
      font-size: 1.5rem;
    }

    .modal-form {
      padding: 0 16px 16px;
    }

    .modal-header {
      padding: 16px 16px 0;
    }
  }
</style>
