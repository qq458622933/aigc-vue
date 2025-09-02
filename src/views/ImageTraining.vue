<template>
  <div class="image-training-page">
    <!-- 页面标题 -->
    <header class="page-header">
      <div class="container">
        <h1 class="page-title">形象复刻</h1>
        <p class="page-subtitle">上传视频，轻松制作您的数字形象</p>
      </div>
    </header>

    <!-- 表单区域 -->
    <main class="main-content">
      <div class="container">
        <div class="form-section">
          <div class="form-card">
            <h2 class="form-title">创建形象</h2>

            <!-- 形象名称输入 -->
            <div class="form-group">
              <label class="form-label">形象名称</label>
              <input
                type="text"
                class="form-input"
                placeholder="请输入形象名称"
                v-model="formData.imageName"
                maxlength="50"
              />
              <div class="input-hint">最多50个字符</div>
            </div>

            <!-- 视频上传 -->
            <div class="form-group">
              <label class="form-label">上传视频</label>
              <div class="upload-area" @click="triggerFileUpload" :class="{ 'has-file': formData.videoFile }">
                <input
                  type="file"
                  ref="fileInput"
                  accept=".mp4"
                  @change="handleFileUpload"
                  style="display: none"
                />
                <div class="upload-content" v-if="!formData.videoFile">
                  <div class="upload-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="7,10 12,15 17,10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                  </div>
                  <p class="upload-text">点击上传视频文件</p>
                  <p class="upload-hint">支持MP4格式，文件大小不超过1GB</p>
                </div>
                <div class="file-info" v-else>
                  <div class="file-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14,2 14,8 20,8"/>
                      <path d="M12 18v-6m-3 3l3 3 3-3"/>
                    </svg>
                  </div>
                  <div class="file-details">
                    <p class="file-name">{{ formData.videoFile.name }}</p>
                    <p class="file-size">{{ formatFileSize(formData.videoFile.size) }}</p>
                  </div>
                  <button type="button" class="remove-file" @click.stop="removeFile">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <line x1="18" y1="6" x2="6" y2="18"/>
                      <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </div>
              </div>
              <div class="upload-progress" v-if="uploadProgress > 0 && uploadProgress < 100">
                <div class="progress-bar">
                  <div class="progress-fill" :style="{ width: uploadProgress + '%' }"></div>
                </div>
                <span class="progress-text">{{ uploadProgress }}%</span>
              </div>
            </div>

            <!-- 提交按钮 -->
            <div class="form-actions">
              <button
                type="button"
                class="submit-btn"
                @click="submitForm"
                :disabled="!canSubmit || isSubmitting"
              >
                <span v-if="isSubmitting">生成中...</span>
                <span v-else>提交生成</span>
              </button>
            </div>
          </div>
        </div>

        <!-- 上传记录 -->
        <div class="records-section">
          <h2 class="records-title">上传记录</h2>
          <div class="records-table-container">
            <table class="records-table">
              <thead>
              <tr>
                <th>记录ID</th>
                <th>形象名称</th>
                <th>提交时间</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="record in uploadRecords" :key="record.id">
                <td class="record-id">{{ record.id }}</td>
                <td class="record-name">{{ record.imageName }}</td>
                <td class="record-time">{{ formatTime(record.submitTime) }}</td>
                <td class="record-status">
                    <span class="status-badge" :class="getStatusClass(record.status)">
                      {{ getStatusText(record.status) }}
                    </span>
                </td>
                <td class="record-actions">
                  <button
                    class="action-btn view-btn"
                    @click="viewRecord(record)"
                    v-if="record.status === 'completed'"
                  >
                    查看
                  </button>
                  <button
                    class="action-btn download-btn"
                    @click="downloadRecord(record)"
                    v-if="record.status === 'completed'"
                  >
                    下载
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
            <div class="empty-state" v-if="uploadRecords.length === 0">
              <div class="empty-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M8 12h8M12 8v8"/>
                </svg>
              </div>
              <p>暂无上传记录</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'ImageTraining',
    data() {
      return {
        formData: {
          imageName: '',
          videoFile: null
        },
        uploadProgress: 0,
        isSubmitting: false,
        uploadRecords: [
          {
            id: 'IMG_001',
            imageName: '我的数字形象',
            submitTime: '2024-01-15 14:30:25',
            status: 'completed'
          },
          {
            id: 'IMG_002',
            imageName: '企业形象代言人',
            submitTime: '2024-01-14 10:15:42',
            status: 'processing'
          },
          {
            id: 'IMG_003',
            imageName: '产品介绍人',
            submitTime: '2024-01-13 16:45:18',
            status: 'failed'
          }
        ]
      }
    },
    computed: {
      canSubmit() {
        return this.formData.imageName.trim() && this.formData.videoFile;
      }
    },
    methods: {
      triggerFileUpload() {
        this.$refs.fileInput.click();
      },
      handleFileUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        // 检查文件格式
        if (!file.type.includes('mp4')) {
          alert('请上传MP4格式的视频文件');
          return;
        }

        // 检查文件大小 (1GB = 1024 * 1024 * 1024 bytes)
        const maxSize = 1024 * 1024 * 1024;
        if (file.size > maxSize) {
          alert('文件大小不能超过1GB');
          return;
        }

        this.formData.videoFile = file;
        this.uploadProgress = 0;

        // 模拟上传进度
        this.simulateUpload();
      },
      simulateUpload() {
        const interval = setInterval(() => {
          this.uploadProgress += 10;
          if (this.uploadProgress >= 100) {
            clearInterval(interval);
          }
        }, 200);
      },
      removeFile() {
        this.formData.videoFile = null;
        this.uploadProgress = 0;
        this.$refs.fileInput.value = '';
      },
      formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
      },
      async submitForm() {
        if (!this.canSubmit) return;

        this.isSubmitting = true;

        try {
          // 模拟API调用
          await new Promise(resolve => setTimeout(resolve, 2000));

          // 添加新记录
          const newRecord = {
            id: `IMG_${String(Date.now()).slice(-3)}`,
            imageName: this.formData.imageName,
            submitTime: new Date().toLocaleString('zh-CN'),
            status: 'processing'
          };

          this.uploadRecords.unshift(newRecord);

          // 重置表单
          this.formData = {
            imageName: '',
            videoFile: null
          };
          this.uploadProgress = 0;
          this.$refs.fileInput.value = '';

          alert('提交成功！');

        } catch {
          alert('提交失败，请重试');
        } finally {
          this.isSubmitting = false;
        }
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
      viewRecord(record) {
        alert(`查看记录: ${record.imageName}`);
      },
      downloadRecord(record) {
        alert(`下载记录: ${record.imageName}`);
      },
      deleteRecord(record) {
        if (confirm(`确定要删除 "${record.imageName}" 吗？`)) {
          const index = this.uploadRecords.findIndex(r => r.id === record.id);
          if (index > -1) {
            this.uploadRecords.splice(index, 1);
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

  .image-training-page {
    min-height: 100vh;
    background: var(--color-background-secondary);
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
  }

  /* 页面标题 */
  .page-header {
    background: var(--color-surface);
    border-bottom: 1px solid var(--color-border);
    padding: 32px 0;
    margin-bottom: 32px;
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

  /* 主要内容 */
  .main-content {
    max-width: 1200px;
    margin: 0 auto 40px;
    padding: 0 24px;
  }

  /* 表单区域 */
  .form-section {
    margin-bottom: 40px;
  }

  .form-card {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-lg);
    padding: 24px;
    transition: all 0.2s ease;
  }

  .form-card:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }

  .form-title {
    font-size: 20px;
    font-weight: 600;
    color: var(--color-text-primary);
    margin-bottom: 24px;
  }

  .form-group {
    margin-bottom: 25px;
  }

  .form-label {
    display: block;
    font-size: 14px;
    font-weight: 500;
    color: var(--color-text-primary);
    margin-bottom: 8px;
  }

  .form-input {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-base);
    font-size: 14px;
    color: var(--color-text-primary);
    background: var(--color-surface);
    transition: all 0.2s ease;
  }

  .form-input:focus {
    outline: none;
    border-color: var(--color-primary-500);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }

  .input-hint {
    font-size: 12px;
    color: var(--color-text-tertiary);
    margin-top: 4px;
  }

  /* 上传区域 */
  .upload-area {
    border: 2px dashed #d1d5db;
    border-radius: 12px;
    padding: 40px 20px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
    background: #fafafa;
  }

  .upload-area:hover {
    border-color: #667eea;
    background: #f8f9ff;
  }

  .upload-area.has-file {
    border-color: #667eea;
    background: #f8f9ff;
  }

  .upload-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .upload-icon {
    width: 60px;
    height: 60px;
    color: #667eea;
    margin-bottom: 15px;
  }

  .upload-icon svg {
    width: 100%;
    height: 100%;
  }

  .upload-text {
    font-size: 1.1rem;
    font-weight: 500;
    color: #333;
    margin-bottom: 5px;
  }

  .upload-hint {
    font-size: 0.9rem;
    color: #666;
  }

  .file-info {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 10px;
  }

  .file-icon {
    width: 40px;
    height: 40px;
    color: #667eea;
  }

  .file-icon svg {
    width: 100%;
    height: 100%;
  }

  .file-details {
    flex: 1;
    text-align: left;
  }

  .file-name {
    font-weight: 500;
    color: #333;
    margin-bottom: 2px;
  }

  .file-size {
    font-size: 0.9rem;
    color: #666;
  }

  .remove-file {
    width: 30px;
    height: 30px;
    border: none;
    background: #ef4444;
    color: white;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.3s ease;
  }

  .remove-file:hover {
    background: #dc2626;
  }

  .remove-file svg {
    width: 16px;
    height: 16px;
  }

  /* 上传进度 */
  .upload-progress {
    margin-top: 15px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .progress-bar {
    flex: 1;
    height: 6px;
    background: #e1e5e9;
    border-radius: 3px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: #667eea;
    transition: width 0.3s ease;
  }

  .progress-text {
    font-size: 0.9rem;
    color: #666;
    min-width: 40px;
  }

  /* 表单操作 */
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

  /* 记录区域 */
  .records-section {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
  }

  .records-section > div {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-lg);
    padding: 24px;
    transition: all 0.2s ease;
  }

  .records-title {
    font-size: 20px;
    font-weight: 600;
    color: var(--color-text-primary);
    margin-bottom: 24px;
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
    background: var(--color-background-secondary);
    font-weight: 600;
    color: var(--color-text-primary);
  }

  .record-id {
    font-family: 'Monaco', 'Consolas', monospace;
    color: var(--color-text-secondary);
  }

  .record-name {
    font-weight: 500;
    color: var(--color-text-primary);
  }

  .record-time {
    color: var(--color-text-secondary);
    font-size: 14px;
  }

  .status-badge {
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 500;
  }

  .status-success {
    background: var(--color-success-light);
    color: var(--color-success);
  }

  .status-processing {
    background: var(--color-warning-light);
    color: var(--color-warning);
  }

  .status-failed {
    background: var(--color-error-light);
    color: var(--color-error);
  }

  .record-actions {
    display: flex;
    gap: 8px;
  }

  .action-btn {
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .view-btn {
    background: #3b82f6;
    color: white;
  }

  .view-btn:hover {
    background: #2563eb;
  }

  .download-btn {
    background: #10b981;
    color: white;
  }

  .download-btn:hover {
    background: #059669;
  }

  .delete-btn {
    background: #ef4444;
    color: white;
  }

  .delete-btn:hover {
    background: #dc2626;
  }

  /* 空状态 */
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

  /* 响应式设计 */
  @media (max-width: 768px) {
    .container {
      padding: 0 15px;
    }

    .form-card {
      padding: 20px;
    }

    .page-title {
      font-size: 2rem;
    }

    .records-table {
      font-size: 0.9rem;
    }

    .records-table th,
    .records-table td {
      padding: 8px;
    }

    .record-actions {
      flex-direction: column;
      gap: 4px;
    }

    .action-btn {
      width: 100%;
    }
  }
</style>
