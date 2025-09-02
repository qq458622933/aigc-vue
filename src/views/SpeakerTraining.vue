<template>
  <div class="speaker-training-page">
    <!-- 页面标题 -->
    <header class="page-header">
      <div class="container">
        <h1 class="page-title">声音复刻</h1>
        <p class="page-subtitle">上传音频，让AI学习您独特的声音特征</p>
      </div>
    </header>

    <!-- 表单区域 -->
    <main class="main-content">
      <div class="container">
        <div class="form-section">
          <div class="form-card">
            <h2 class="form-title">创建声音模型</h2>

            <!-- 声音名称输入 -->
            <div class="form-group">
              <label class="form-label">声音名称</label>
              <input
                type="text"
                class="form-input"
                placeholder="请输入声音名称"
                v-model="formData.voiceName"
                maxlength="50"
              />
              <div class="input-hint">最多50个字符</div>
            </div>

            <!-- 音频上传 -->
            <div class="form-group">
              <label class="form-label">上传音频</label>
              <div class="upload-area" @click="triggerFileUpload" :class="{ 'has-file': formData.audioFile }">
                <input
                  type="file"
                  ref="fileInput"
                  accept=".wav"
                  @change="handleFileUpload"
                  style="display: none"
                />
                <div class="upload-content" v-if="!formData.audioFile">
                  <div class="upload-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polygon points="11 5,6 9,2 9,2 15,6 15,11 19,11 5"/>
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
                    </svg>
                  </div>
                  <p class="upload-text">点击上传音频文件</p>
                  <p class="upload-hint">支持WAV格式，文件大小不超过20MB</p>
                  <p class="upload-hint">建议音频时长为3-10秒，以获得最佳效果</p>
                </div>
                <div class="file-info" v-else>
                  <div class="file-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polygon points="11 5,6 9,2 9,2 15,6 15,11 19,11 5"/>
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
                    </svg>
                  </div>
                  <div class="file-details">
                    <p class="file-name">{{ formData.audioFile.name }}</p>
                    <p class="file-size">{{ formatFileSize(formData.audioFile.size) }}</p>
                    <p class="file-duration" v-if="audioDuration">时长: {{ formatDuration(audioDuration) }}</p>
                  </div>
                  <div class="audio-controls">
                    <button type="button" class="play-btn" @click.stop="toggleAudioPlay">
                      <svg v-if="!isPlaying" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polygon points="5 3,19 12,5 21,5 3"/>
                      </svg>
                      <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="6" y="4" width="4" height="16"/>
                        <rect x="14" y="4" width="4" height="16"/>
                      </svg>
                    </button>
                    <button type="button" class="remove-file" @click.stop="removeFile">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div class="upload-progress" v-if="uploadProgress > 0 && uploadProgress < 100">
                <div class="progress-bar">
                  <div class="progress-fill" :style="{ width: uploadProgress + '%' }"></div>
                </div>
                <span class="progress-text">{{ uploadProgress }}%</span>
              </div>
              <!-- 音频时长警告 -->
              <div class="duration-warning" v-if="showDurationWarning">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                  <line x1="12" y1="9" x2="12" y2="13"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
                <span>建议使用3-10秒的音频以获得最佳声音复刻效果</span>
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
                <th>声音名称</th>
                <th>提交时间</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="record in uploadRecords" :key="record.id">
                <td class="record-id">{{ record.id }}</td>
                <td class="record-name">{{ record.voiceName }}</td>
                <td class="record-time">{{ formatTime(record.submitTime) }}</td>
                <td class="record-status">
                    <span class="status-badge" :class="getStatusClass(record.status)">
                      {{ getStatusText(record.status) }}
                    </span>
                </td>
                <td class="record-actions">
                  <button
                    class="action-btn listen-btn"
                    @click="listenRecord(record)"
                    v-if="record.status === 'completed'"
                  >
                    试听
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
                  <polygon points="11 5,6 9,2 9,2 15,6 15,11 19,11 5"/>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
                </svg>
              </div>
              <p>暂无上传记录</p>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- 隐藏的音频播放器 -->
    <audio ref="audioPlayer" @loadedmetadata="onAudioLoaded" @ended="onAudioEnded"></audio>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'SpeakerTraining',
    data() {
      return {
        formData: {
          voiceName: '',
          audioFile: null
        },
        uploadProgress: 0,
        isSubmitting: false,
        isPlaying: false,
        audioDuration: 0,
        uploadRecords: [
          {
            id: 'VOI_001',
            voiceName: '我的专属声音',
            submitTime: '2024-01-15 14:30:25',
            status: 'completed'
          },
          {
            id: 'VOI_002',
            voiceName: '客服语音模板',
            submitTime: '2024-01-14 10:15:42',
            status: 'processing'
          },
          {
            id: 'VOI_003',
            voiceName: '播报员声音',
            submitTime: '2024-01-13 16:45:18',
            status: 'failed'
          }
        ]
      }
    },
    computed: {
      canSubmit() {
        return this.formData.voiceName.trim() && this.formData.audioFile;
      },
      showDurationWarning() {
        return this.audioDuration > 0 && (this.audioDuration < 3 || this.audioDuration > 10);
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
        if (!file.name.toLowerCase().endsWith('.wav')) {
          alert('请上传WAV格式的音频文件');
          return;
        }

        // 检查文件大小 (20MB = 20 * 1024 * 1024 bytes)
        const maxSize = 20 * 1024 * 1024;
        if (file.size > maxSize) {
          alert('文件大小不能超过20MB');
          return;
        }

        this.formData.audioFile = file;
        this.uploadProgress = 0;
        this.audioDuration = 0;

        // 加载音频获取时长
        this.loadAudioDuration(file);

        // 模拟上传进度
        this.simulateUpload();
      },
      loadAudioDuration(file) {
        const url = URL.createObjectURL(file);
        this.$refs.audioPlayer.src = url;
        this.$refs.audioPlayer.load();
      },
      onAudioLoaded() {
        this.audioDuration = this.$refs.audioPlayer.duration;
      },
      onAudioEnded() {
        this.isPlaying = false;
      },
      toggleAudioPlay() {
        if (this.isPlaying) {
          this.$refs.audioPlayer.pause();
          this.isPlaying = false;
        } else {
          this.$refs.audioPlayer.play();
          this.isPlaying = true;
        }
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
        this.formData.audioFile = null;
        this.uploadProgress = 0;
        this.audioDuration = 0;
        this.isPlaying = false;
        this.$refs.fileInput.value = '';
        this.$refs.audioPlayer.src = '';
      },
      formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
      },
      formatDuration(seconds) {
        if (seconds < 60) {
          return `${seconds.toFixed(1)}秒`;
        } else {
          const minutes = Math.floor(seconds / 60);
          const remainingSeconds = (seconds % 60).toFixed(1);
          return `${minutes}分${remainingSeconds}秒`;
        }
      },
      async submitForm() {
        if (!this.canSubmit) return;

        this.isSubmitting = true;

        try {
          // 模拟API调用
          await new Promise(resolve => setTimeout(resolve, 2000));

          // 添加新记录
          const newRecord = {
            id: `VOI_${String(Date.now()).slice(-3)}`,
            voiceName: this.formData.voiceName,
            submitTime: new Date().toLocaleString('zh-CN'),
            status: 'processing'
          };

          this.uploadRecords.unshift(newRecord);

          // 重置表单
          this.formData = {
            voiceName: '',
            audioFile: null
          };
          this.uploadProgress = 0;
          this.audioDuration = 0;
          this.isPlaying = false;
          this.$refs.fileInput.value = '';
          this.$refs.audioPlayer.src = '';

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
      listenRecord(record) {
        alert(`试听声音: ${record.voiceName}`);
      },
      downloadRecord(record) {
        alert(`下载声音模型: ${record.voiceName}`);
      },
      deleteRecord(record) {
        if (confirm(`确定要删除 "${record.voiceName}" 吗？`)) {
          const index = this.uploadRecords.findIndex(r => r.id === record.id);
          if (index > -1) {
            this.uploadRecords.splice(index, 1);
          }
        }
      }
    },
    beforeUnmount() {
      // 清理音频资源
      if (this.$refs.audioPlayer && this.$refs.audioPlayer.src) {
        URL.revokeObjectURL(this.$refs.audioPlayer.src);
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

  .speaker-training-page {
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
    margin-bottom: 3px;
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
    margin-bottom: 2px;
  }

  .file-duration {
    font-size: 0.9rem;
    color: #667eea;
    font-weight: 500;
  }

  .audio-controls {
    display: flex;
    gap: 10px;
  }

  .play-btn {
    width: 40px;
    height: 40px;
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

  .play-btn:hover {
    background: #059669;
  }

  .play-btn svg {
    width: 18px;
    height: 18px;
  }

  .remove-file {
    width: 40px;
    height: 40px;
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
    width: 18px;
    height: 18px;
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

  /* 时长警告 */
  .duration-warning {
    margin-top: 10px;
    padding: 10px 15px;
    background: #fef3c7;
    border: 1px solid #f59e0b;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.9rem;
    color: #92400e;
  }

  .duration-warning svg {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
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

  .listen-btn {
    background: #8b5cf6;
    color: white;
  }

  .listen-btn:hover {
    background: #7c3aed;
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

    .file-info {
      flex-direction: column;
      gap: 10px;
      text-align: center;
    }

    .audio-controls {
      justify-content: center;
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
