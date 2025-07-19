<template>
  <div class="agent-manager">
    <!-- 主界面 -->
    <div class="header">
      <h1>智能体管理</h1>
      <button
        @click="showCreateDialog = true"
        class="create-btn"
      >
        <svg class="icon" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
        </svg>
        创建智能体
      </button>
    </div>

    <!-- 智能体列表 -->
    <div class="agent-list">
      <div
        v-for="agent in agents"
        :key="agent.id"
        class="agent-card"
      >
        <div class="agent-avatar">
          <img :src="agent.avatar" :alt="agent.name" />
        </div>
        <div class="agent-info">
          <h3>{{ agent.name }}</h3>
          <p class="agent-type">{{ getTypeLabel(agent.type) }}</p>
          <p class="agent-description">{{ agent.description }}</p>
        </div>
        <div class="agent-actions">
          <button @click="editAgent(agent)" class="edit-btn">编辑</button>
          <button @click="deleteAgent(agent.id)" class="delete-btn">删除</button>
        </div>
      </div>
    </div>

    <!-- 创建/编辑智能体弹窗 -->
    <div v-if="showCreateDialog" class="dialog-overlay" @click="closeDialog">
      <div class="dialog" @click.stop>
        <div class="dialog-header">
          <h2>{{ editingAgent ? '编辑智能体' : '创建智能体' }}</h2>
          <button @click="closeDialog" class="close-btn">&times;</button>
        </div>

        <form @submit.prevent="saveAgent" class="dialog-content">
          <!-- 智能体类型选择 -->
          <div class="form-group">
            <label>智能体类型 *</label>
            <div class="type-options">
              <label class="type-option">
                <input
                  type="radio"
                  v-model="formData.type"
                  value="conversation"
                  :disabled="editingAgent"
                >
                <div class="option-card">
                  <div class="option-icon">💬</div>
                  <div class="option-content">
                    <h4>对话流类型</h4>
                    <p>单轮自动化任务的工作流</p>
                  </div>
                </div>
              </label>

              <label class="type-option">
                <input
                  type="radio"
                  v-model="formData.type"
                  value="workflow"
                  :disabled="editingAgent"
                >
                <div class="option-card">
                  <div class="option-icon">⚙️</div>
                  <div class="option-content">
                    <h4>工作流类型</h4>
                    <p>支持记忆的复杂多轮对话工作流</p>
                  </div>
                </div>
              </label>
            </div>
          </div>

          <!-- 智能体名称 -->
          <div class="form-group">
            <label>智能体名称 *</label>
            <input
              type="text"
              v-model="formData.name"
              placeholder="请输入智能体名称"
              required
            >
          </div>

          <!-- 智能体头像 -->
          <div class="form-group">
            <label>智能体头像</label>
            <div class="avatar-upload">
              <div class="avatar-preview">
                <img
                  v-if="formData.avatar"
                  :src="formData.avatar"
                  alt="头像预览"
                />
                <div v-else class="avatar-placeholder">
                  <svg viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              </div>
              <div class="upload-actions">
                <input
                  type="file"
                  ref="fileInput"
                  @change="handleFileUpload"
                  accept="image/*"
                  style="display: none"
                >
                <button
                  type="button"
                  @click="$refs.fileInput.click()"
                  class="upload-btn"
                >
                  选择图片
                </button>
                <button
                  type="button"
                  @click="formData.avatar = ''"
                  class="remove-btn"
                  v-if="formData.avatar"
                >
                  移除
                </button>
              </div>
            </div>
          </div>

          <!-- 功能描述 -->
          <div class="form-group">
            <label>功能描述 *</label>
            <textarea
              v-model="formData.description"
              placeholder="请描述智能体的功能和用途"
              rows="4"
              required
            ></textarea>
          </div>

          <!-- 操作按钮 -->
          <div class="dialog-actions">
            <button type="button" @click="closeDialog" class="cancel-btn">
              取消
            </button>
            <button type="submit" class="submit-btn">
              {{ editingAgent ? '保存' : '创建' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, reactive, onMounted } from 'vue'

  // 响应式数据
  const showCreateDialog = ref(false)
  const editingAgent = ref(null)
  const agents = ref([])

  // 表单数据
  const formData = reactive({
    type: 'conversation',
    name: '',
    avatar: '',
    description: ''
  })

  // 重置表单
  const resetForm = () => {
    formData.type = 'conversation'
    formData.name = ''
    formData.avatar = ''
    formData.description = ''
  }

  // 获取类型标签
  const getTypeLabel = (type) => {
    return type === 'conversation' ? '对话流类型' : '工作流类型'
  }

  // 处理文件上传
  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        formData.avatar = e.target.result
      }
      reader.readAsDataURL(file)
    }
  }

  // 关闭弹窗
  const closeDialog = () => {
    showCreateDialog.value = false
    editingAgent.value = null
    resetForm()
  }

  // 保存智能体
  const saveAgent = () => {
    if (editingAgent.value) {
      // 编辑模式
      const index = agents.value.findIndex(a => a.id === editingAgent.value.id)
      if (index > -1) {
        agents.value[index] = {
          ...editingAgent.value,
          name: formData.name,
          avatar: formData.avatar || getDefaultAvatar(),
          description: formData.description
        }
      }
    } else {
      // 创建模式
      const newAgent = {
        id: Date.now(),
        type: formData.type,
        name: formData.name,
        avatar: formData.avatar || getDefaultAvatar(),
        description: formData.description,
        createdAt: new Date().toISOString()
      }
      agents.value.push(newAgent)
    }

    closeDialog()

    // 这里可以添加保存到后端的逻辑
    console.log('智能体已保存:', editingAgent.value ? '编辑' : '创建')
  }

  // 编辑智能体
  const editAgent = (agent) => {
    editingAgent.value = agent
    formData.type = agent.type
    formData.name = agent.name
    formData.avatar = agent.avatar
    formData.description = agent.description
    showCreateDialog.value = true
  }

  // 删除智能体
  const deleteAgent = (id) => {
    if (confirm('确定要删除这个智能体吗？')) {
      agents.value = agents.value.filter(a => a.id !== id)
    }
  }

  // 获取默认头像
  const getDefaultAvatar = () => {
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzk5OTk5OSI+PHBhdGggZD0iTTEyIDEyYzIuMjEgMCA0LTEuNzkgNC00cy0xLjc5LTQtNC00LTQgMS43OS00IDQgMS43OSA0IDQgNHptMCAyYy0yLjY3IDAtOCAxLjM0LTggNHYyaDE2di0yYzAtMi42Ni01LjMzLTQtOC00eiIvPjwvc3ZnPg=='
  }

  // 初始化数据
  onMounted(() => {
    // 示例数据
    agents.value = [
      {
        id: 1,
        type: 'conversation',
        name: '客服助手',
        avatar: getDefaultAvatar(),
        description: '专业的客服智能体，可以回答常见问题并提供帮助。',
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        type: 'workflow',
        name: '项目管理助手',
        avatar: getDefaultAvatar(),
        description: '帮助管理项目进度，跟踪任务状态，提供项目报告。',
        createdAt: new Date().toISOString()
      }
    ]
  })
</script>

<style scoped>
  .agent-manager {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
  }

  .header h1 {
    color: #333;
    font-size: 28px;
    margin: 0;
  }

  .create-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
  }

  .create-btn:hover {
    background: #0056b3;
  }

  .create-btn .icon {
    width: 20px;
    height: 20px;
    fill: currentColor;
  }

  .agent-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 20px;
  }

  .agent-card {
    background: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .agent-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }

  .agent-avatar {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    overflow: hidden;
    margin-bottom: 15px;
  }

  .agent-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .agent-info h3 {
    margin: 0 0 8px 0;
    color: #333;
    font-size: 18px;
  }

  .agent-type {
    margin: 0 0 8px 0;
    color: #666;
    font-size: 14px;
    background: #f0f0f0;
    padding: 4px 8px;
    border-radius: 4px;
    display: inline-block;
  }

  .agent-description {
    margin: 0 0 15px 0;
    color: #666;
    font-size: 14px;
    line-height: 1.5;
  }

  .agent-actions {
    display: flex;
    gap: 8px;
  }

  .edit-btn, .delete-btn {
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
    transition: background-color 0.3s;
  }

  .edit-btn {
    background: #28a745;
    color: white;
  }

  .edit-btn:hover {
    background: #218838;
  }

  .delete-btn {
    background: #dc3545;
    color: white;
  }

  .delete-btn:hover {
    background: #c82333;
  }

  .dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .dialog {
    background: white;
    border-radius: 12px;
    max-width: 600px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
  }

  .dialog-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid #eee;
  }

  .dialog-header h2 {
    margin: 0;
    color: #333;
    font-size: 20px;
  }

  .close-btn {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #999;
    padding: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background-color 0.3s;
  }

  .close-btn:hover {
    background: #f5f5f5;
  }

  .dialog-content {
    padding: 20px;
  }

  .form-group {
    margin-bottom: 20px;
  }

  .form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: #333;
  }

  .type-options {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
  }

  .type-option input[type="radio"] {
    display: none;
  }

  .option-card {
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    padding: 15px;
    cursor: pointer;
    transition: all 0.3s;
    text-align: center;
  }

  .type-option input[type="radio"]:checked + .option-card {
    border-color: #007bff;
    background: #f8f9ff;
  }

  .option-icon {
    font-size: 24px;
    margin-bottom: 8px;
  }

  .option-content h4 {
    margin: 0 0 4px 0;
    color: #333;
    font-size: 16px;
  }

  .option-content p {
    margin: 0;
    color: #666;
    font-size: 12px;
  }

  .form-group input[type="text"],
  .form-group textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 14px;
    transition: border-color 0.3s;
  }

  .form-group input[type="text"]:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: #007bff;
  }

  .avatar-upload {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .avatar-preview {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 2px dashed #ddd;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .avatar-preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .avatar-placeholder {
    width: 40px;
    height: 40px;
    color: #999;
  }

  .avatar-placeholder svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }

  .upload-actions {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .upload-btn, .remove-btn {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
    transition: background-color 0.3s;
  }

  .upload-btn {
    background: #007bff;
    color: white;
  }

  .upload-btn:hover {
    background: #0056b3;
  }

  .remove-btn {
    background: #6c757d;
    color: white;
  }

  .remove-btn:hover {
    background: #5a6268;
  }

  .dialog-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    padding-top: 20px;
    border-top: 1px solid #eee;
  }

  .cancel-btn, .submit-btn {
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s;
  }

  .cancel-btn {
    background: #6c757d;
    color: white;
  }

  .cancel-btn:hover {
    background: #5a6268;
  }

  .submit-btn {
    background: #007bff;
    color: white;
  }

  .submit-btn:hover {
    background: #0056b3;
  }
</style>
