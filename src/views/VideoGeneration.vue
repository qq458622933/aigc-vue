<template>
  <div class="video-generation-page">
    <!-- 页面标题 -->
    <header class="page-header">
      <div class="container">
        <h1 class="page-title">数字分身</h1>
        <p class="page-subtitle">利用声音和形象创作数字人作品</p>
      </div>
    </header>

    <!-- 选项卡导航 -->
    <div class="container">
      <div class="tab-navigation">
        <button
          class="tab-btn"
          :class="{ active: activeTab === 'creation' }"
          @click="activeTab = 'creation'"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="23 7,16 12,23 17,23 7"/>
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
          </svg>
          视频创作
        </button>
        <button
          class="tab-btn"
          :class="{ active: activeTab === 'records' }"
          @click="activeTab = 'records'"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14,2 14,8 20,8"/>
          </svg>
          创作记录
        </button>
      </div>
    </div>

    <!-- 主要内容 -->
    <main class="main-content">
      <div class="container">
        <!-- 视频创作选项卡 -->
        <div v-if="activeTab === 'creation'" class="creation-section">
          <div class="form-card">
            <h2 class="form-title">创建数字分身视频</h2>

            <!-- 数字形象选择 -->
            <div class="form-group">
              <label class="form-label">选择数字形象</label>
              <div class="selection-grid">
                <div
                  v-for="avatar in avatarList"
                  :key="avatar.id"
                  class="selection-item"
                  :class="{ selected: formData.selectedAvatar === avatar.id }"
                  @click="formData.selectedAvatar = avatar.id"
                >
                  <div class="item-preview">
                    <div class="avatar-placeholder">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                      </svg>
                    </div>
                  </div>
                  <div class="item-info">
                    <p class="item-name">{{ avatar.name }}</p>
                    <p class="item-status">{{ avatar.status }}</p>
                  </div>
                </div>
              </div>
              <p class="selection-hint">请选择一个已训练完成的数字形象</p>
            </div>

            <!-- 发言人选择 -->
            <div class="form-group">
              <label class="form-label">选择发言人声音</label>
              <div class="selection-grid">
                <div
                  v-for="speaker in speakerList"
                  :key="speaker.id"
                  class="selection-item"
                  :class="{ selected: formData.selectedSpeaker === speaker.id }"
                  @click="selectSpeaker(speaker)"
                >
                  <div class="item-preview speaker-preview">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polygon points="11 5,6 9,2 9,2 15,6 15,11 19,11 5"/>
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
                    </svg>
                  </div>
                  <div class="item-info">
                    <p class="item-name">{{ speaker.name }}</p>
                    <p class="item-status">{{ speaker.status }}</p>
                  </div>
                  <button
                    v-if="speaker.status === '已完成'"
                    class="play-demo-btn"
                    @click.stop="playDemo(speaker)"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polygon points="5 3,19 12,5 21,5 3"/>
                    </svg>
                  </button>
                </div>
              </div>
              <p class="selection-hint">请选择一个已训练完成的声音模型</p>
            </div>

            <!-- 播报文案输入 -->
            <div class="form-group">
              <label class="form-label">播报文案</label>
              <textarea
                class="form-textarea"
                placeholder="请输入需要生成的播报文案..."
                v-model="formData.script"
                maxlength="5000"
                rows="8"
              ></textarea>
              <div class="textarea-footer">
                <span class="char-count" :class="{ warning: formData.script.length > 4500 }">
                  {{ formData.script.length }}/5000
                </span>
                <div class="textarea-actions">
                  <button type="button" class="action-btn" @click="clearScript">清空</button>
                  <button type="button" class="action-btn" @click="loadTemplate">加载模板</button>
                </div>
              </div>
            </div>

            <!-- 提交按钮 -->
            <div class="form-actions">
              <button
                type="button"
                class="submit-btn"
                @click="submitGeneration"
                :disabled="!canSubmit || isSubmitting"
              >
                <span v-if="isSubmitting">生成中...</span>
                <span v-else>提交生成</span>
              </button>
            </div>
          </div>
        </div>

        <!-- 创作记录选项卡 -->
        <div v-if="activeTab === 'records'" class="records-section">
          <div class="records-card">
            <div class="records-header">
              <h2 class="records-title">创作记录</h2>
              <div class="records-filters">
                <select class="filter-select" v-model="filterStatus">
                  <option value="">全部状态</option>
                  <option value="completed">已完成</option>
                  <option value="processing">处理中</option>
                  <option value="failed">失败</option>
                </select>
              </div>
            </div>

            <div class="records-table-container">
              <table class="records-table">
                <thead>
                <tr>
                  <th>记录ID</th>
                  <th>形象名称</th>
                  <th>发言人</th>
                  <th>文案预览</th>
                  <th>提交时间</th>
                  <th>状态</th>
                  <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="record in filteredRecords" :key="record.id">
                  <td class="record-id">{{ record.id }}</td>
                  <td class="record-name">{{ record.avatarName }}</td>
                  <td class="record-speaker">{{ record.speakerName }}</td>
                  <td class="record-script">{{ truncateScript(record.script) }}</td>
                  <td class="record-time">{{ formatTime(record.submitTime) }}</td>
                  <td class="record-status">
                      <span class="status-badge" :class="getStatusClass(record.status)">
                        {{ getStatusText(record.status) }}
                      </span>
                  </td>
                  <td class="record-actions">
                    <button
                      class="action-btn preview-btn"
                      @click="previewVideo(record)"
                      v-if="record.status === 'completed'"
                    >
                      预览
                    </button>
                    <button
                      class="action-btn download-btn"
                      @click="downloadVideo(record)"
                      v-if="record.status === 'completed'"
                    >
                      下载
                    </button>
                    <button
                      class="action-btn retry-btn"
                      @click="retryGeneration(record)"
                      v-if="record.status === 'failed'"
                    >
                      重试
                    </button>
                    <button
                      class="action-btn delete-btn"
                      @click="deleteRecord(record)"
                    >
                      删除
                    </button>
                  </td>
                </tr>
                </tbody>
              </table>
              <div class="empty-state" v-if="filteredRecords.length === 0">
                <div class="empty-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="23 7,16 12,23 17,23 7"/>
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                  </svg>
                </div>
                <p>暂无创作记录</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  export default {
    name: 'VideoGeneration',
    data() {
      return {
        activeTab: 'creation',
        formData: {
          selectedAvatar: null,
          selectedSpeaker: null,
          script: ''
        },
        isSubmitting: false,
        filterStatus: '',
        avatarList: [
          { id: 'avatar_001', name: '我的数字形象', status: '已完成' },
          { id: 'avatar_002', name: '企业形象代言人', status: '处理中' },
          { id: 'avatar_003', name: '产品介绍人', status: '已完成' }
        ],
        speakerList: [
          { id: 'speaker_001', name: '我的专属声音', status: '已完成' },
          { id: 'speaker_002', name: '客服语音模板', status: '处理中' },
          { id: 'speaker_003', name: '播报员声音', status: '已完成' }
        ],
        creationRecords: [
          {
            id: 'VID_001',
            avatarName: '我的数字形象',
            speakerName: '我的专属声音',
            script: '大家好，欢迎来到我们的产品介绍视频。今天我将为大家详细介绍我们最新推出的AI数字人技术...',
            submitTime: '2024-01-15 14:30:25',
            status: 'completed'
          },
          {
            id: 'VID_002',
            avatarName: '企业形象代言人',
            speakerName: '播报员声音',
            script: '尊敬的客户，感谢您选择我们的服务。我们致力于为您提供最优质的体验...',
            submitTime: '2024-01-14 10:15:42',
            status: 'processing'
          },
          {
            id: 'VID_003',
            avatarName: '产品介绍人',
            speakerName: '客服语音模板',
            script: '本季度我们的业绩表现十分出色，各项指标均超预期完成...',
            submitTime: '2024-01-13 16:45:18',
            status: 'failed'
          }
        ]
      }
    },
    computed: {
      canSubmit() {
        return this.formData.selectedAvatar && this.formData.selectedSpeaker && this.formData.script.trim().length > 0;
      },
      filteredRecords() {
        if (!this.filterStatus) return this.creationRecords;
        return this.creationRecords.filter(record => record.status === this.filterStatus);
      }
    },
    methods: {
      selectSpeaker(speaker) {
        if (speaker.status === '已完成') {
          this.formData.selectedSpeaker = speaker.id;
        }
      },
      playDemo(speaker) {
        alert(`播放 ${speaker.name} 的演示音频`);
      },
      clearScript() {
        this.formData.script = '';
      },
      loadTemplate() {
        const templates = [
          '大家好，欢迎来到我们的产品介绍视频。今天我将为大家详细介绍我们最新推出的功能特性。',
          '尊敬的客户，感谢您选择我们的服务。我们致力于为您提供最优质的产品体验。',
          '本期视频将为您展示如何使用我们的平台，让您快速上手并充分发挥产品的价值。'
        ];
        const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
        this.formData.script = randomTemplate;
      },
      async submitGeneration() {
        if (!this.canSubmit) return;
        this.isSubmitting = true;
        try {
          await new Promise(resolve => setTimeout(resolve, 2000));
          const selectedAvatar = this.avatarList.find(a => a.id === this.formData.selectedAvatar);
          const selectedSpeaker = this.speakerList.find(s => s.id === this.formData.selectedSpeaker);
          const newRecord = {
            id: `VID_${String(Date.now()).slice(-3)}`,
            avatarName: selectedAvatar.name,
            speakerName: selectedSpeaker.name,
            script: this.formData.script,
            submitTime: new Date().toLocaleString('zh-CN'),
            status: 'processing'
          };
          this.creationRecords.unshift(newRecord);
          this.formData = { selectedAvatar: null, selectedSpeaker: null, script: '' };
          this.activeTab = 'records';
          alert('提交成功！');
        } catch (error) {
          alert('提交失败，请重试');
        } finally {
          this.isSubmitting = false;
        }
      },
      truncateScript(script) {
        return script.length > 50 ? script.substring(0, 50) + '...' : script;
      },
      formatTime(timeString) {
        return timeString;
      },
      getStatusClass(status) {
        const statusMap = {
          'completed': 'status-success',
          'processing': 'status-processing',
          'failed': 'status-failed'
        };
        return statusMap[status] || '';
      },
      getStatusText(status) {
        const textMap = {
          'completed': '已完成',
          'processing': '处理中',
          'failed': '失败'
        };
        return textMap[status] || status;
      },
      previewVideo(record) {
        alert(`预览视频: ${record.avatarName} - ${record.speakerName}`);
      },
      downloadVideo(record) {
        alert(`下载视频: ${record.id}`);
      },
      retryGeneration(record) {
        if (confirm(`确定要重新生成 "${record.id}" 吗？`)) {
          record.status = 'processing';
          record.submitTime = new Date().toLocaleString('zh-CN');
        }
      },
      deleteRecord(record) {
        if (confirm(`确定要删除 "${record.id}" 吗？`)) {
          const index = this.creationRecords.findIndex(r => r.id === record.id);
          if (index > -1) {
            this.creationRecords.splice(index, 1);
          }
        }
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

  .video-generation-page {
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .page-header {
    padding: 60px 0 40px;
    text-align: center;
    color: white;
  }

  .page-title {
    font-size: 2.5rem;
    font-weight: 600;
    margin-bottom: 10px;
  }

  .page-subtitle {
    font-size: 1.1rem;
    opacity: 0.9;
  }

  .tab-navigation {
    display: flex;
    background: white;
    border-radius: 12px;
    padding: 8px;
    margin-bottom: 30px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
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
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 500;
    color: #666;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .tab-btn svg {
    width: 18px;
    height: 18px;
  }

  .tab-btn.active {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
  }

  .tab-btn:hover:not(.active) {
    background: #f8f9ff;
    color: #667eea;
  }

  .main-content {
    padding-bottom: 60px;
  }

  .creation-section {
    animation: fadeIn 0.3s ease;
  }

  .form-card {
    background: white;
    border-radius: 16px;
    padding: 40px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }

  .form-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 30px;
  }

  .form-group {
    margin-bottom: 30px;
  }

  .form-label {
    display: block;
    font-size: 1rem;
    font-weight: 500;
    color: #333;
    margin-bottom: 12px;
  }

  .selection-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 15px;
    margin-bottom: 10px;
  }

  .selection-item {
    border: 2px solid #e1e5e9;
    border-radius: 12px;
    padding: 15px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
  }

  .selection-item:hover {
    border-color: #667eea;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
  }

  .selection-item.selected {
    border-color: #667eea;
    background: #f8f9ff;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
  }

  .item-preview {
    width: 60px;
    height: 60px;
    border-radius: 8px;
    overflow: hidden;
    margin: 0 auto 10px;
    background: #f3f4f6;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .avatar-placeholder {
    color: #9ca3af;
  }

  .avatar-placeholder svg {
    width: 30px;
    height: 30px;
  }

  .speaker-preview {
    color: #667eea;
  }

  .speaker-preview svg {
    width: 30px;
    height: 30px;
  }

  .item-info {
    text-align: center;
  }

  .item-name {
    font-weight: 500;
    color: #333;
    margin-bottom: 4px;
  }

  .item-status {
    font-size: 0.85rem;
    color: #666;
  }

  .play-demo-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
    border: none;
    background: #10b981;
    color: white;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.3s ease;
  }

  .play-demo-btn:hover {
    background: #059669;
  }

  .play-demo-btn svg {
    width: 14px;
    height: 14px;
  }

  .selection-hint {
    font-size: 0.85rem;
    color: #666;
  }

  .form-textarea {
    width: 100%;
    padding: 16px;
    border: 2px solid #e1e5e9;
    border-radius: 8px;
    font-size: 1rem;
    font-family: inherit;
    resize: vertical;
    min-height: 160px;
    transition: border-color 0.3s ease;
  }

  .form-textarea:focus {
    outline: none;
    border-color: #667eea;
  }

  .textarea-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 8px;
  }

  .char-count {
    font-size: 0.85rem;
    color: #666;
  }

  .char-count.warning {
    color: #ef4444;
  }

  .textarea-actions {
    display: flex;
    gap: 10px;
  }

  .action-btn {
    padding: 6px 12px;
    border: 1px solid #d1d5db;
    background: white;
    border-radius: 6px;
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .action-btn:hover {
    border-color: #667eea;
    color: #667eea;
  }

  .form-actions {
    margin-top: 30px;
    text-align: center;
  }

  .submit-btn {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    border: none;
    padding: 14px 40px;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    min-width: 120px;
  }

  .submit-btn:hover:not(:disabled) {
    background: linear-gradient(135deg, #5a67d8, #6b46c1);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }

  .submit-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  .records-section {
    animation: fadeIn 0.3s ease;
  }

  .records-card {
    background: white;
    border-radius: 16px;
    padding: 30px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }

  .records-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .records-title {
    font-size: 1.4rem;
    font-weight: 600;
    color: #333;
  }

  .records-filters {
    display: flex;
    gap: 10px;
  }

  .filter-select {
    padding: 8px 12px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 0.9rem;
    background: white;
    cursor: pointer;
  }

  .filter-select:focus {
    outline: none;
    border-color: #667eea;
  }

  .records-table-container {
    overflow-x: auto;
  }

  .records-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
  }

  .records-table th,
  .records-table td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #e1e5e9;
  }

  .records-table th {
    background: #f8f9fa;
    font-weight: 600;
    color: #333;
  }

  .record-id {
    font-family: 'Monaco', 'Consolas', monospace;
    color: #666;
  }

  .record-name,
  .record-speaker {
    font-weight: 500;
    color: #333;
  }

  .record-script {
    color: #666;
    max-width: 200px;
    word-break: break-word;
  }

  .record-time {
    color: #666;
    font-size: 0.9rem;
  }

  .status-badge {
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 500;
  }

  .status-success {
    background: #dcfce7;
    color: #166534;
  }

  .status-processing {
    background: #fef3c7;
    color: #92400e;
  }

  .status-failed {
    background: #fecaca;
    color: #991b1b;
  }

  .record-actions {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }

  .preview-btn {
    background: #8b5cf6;
    color: white;
  }

  .preview-btn:hover {
    background: #7c3aed;
  }

  .download-btn {
    background: #10b981;
    color: white;
  }

  .download-btn:hover {
    background: #059669;
  }

  .retry-btn {
    background: #f59e0b;
    color: white;
  }

  .retry-btn:hover {
    background: #d97706;
  }

  .delete-btn {
    background: #ef4444;
    color: white;
  }

  .delete-btn:hover {
    background: #dc2626;
  }

  .empty-state {
    text-align: center;
    padding: 60px 20px;
    color: #666;
  }

  .empty-icon {
    width: 80px;
    height: 80px;
    margin: 0 auto 20px;
    opacity: 0.3;
  }

  .empty-icon svg {
    width: 100%;
    height: 100%;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    .container {
      padding: 0 15px;
    }

    .form-card,
    .records-card {
      padding: 20px;
    }

    .page-title {
      font-size: 2rem;
    }

    .tab-btn {
      padding: 10px 15px;
      font-size: 0.9rem;
    }

    .selection-grid {
      grid-template-columns: 1fr;
      gap: 10px;
    }

    .selection-item {
      padding: 12px;
    }

    .records-header {
      flex-direction: column;
      gap: 15px;
      align-items: flex-start;
    }

    .records-table {
      font-size: 0.85rem;
    }

    .records-table th,
    .records-table td {
      padding: 8px 6px;
    }

    .record-actions {
      flex-direction: column;
      gap: 4px;
    }

    .action-btn {
      width: 100%;
      text-align: center;
    }

    .record-script {
      max-width: 120px;
    }
  }

  @media (max-width: 480px) {
    .tab-navigation {
      padding: 6px;
    }

    .tab-btn {
      padding: 8px 12px;
      font-size: 0.85rem;
    }

    .tab-btn svg {
      width: 16px;
      height: 16px;
    }

    .form-textarea {
      min-height: 120px;
    }

    .textarea-footer {
      flex-direction: column;
      gap: 10px;
      align-items: flex-start;
    }
  }
</style>
