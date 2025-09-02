<template>
  <div class="dashboard-page">
    <!-- 页面标题 -->
    <header class="page-header">
      <div class="header-content">
        <h1 class="page-title">工作台</h1>
        <p class="page-subtitle">欢迎使用 AIGC 智能内容生成平台</p>
      </div>
    </header>

    <!-- 数据统计卡片 -->
    <section class="stats-section">
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon success">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
            </svg>
          </div>
          <div class="stat-content">
            <div class="stat-value">2,847</div>
            <div class="stat-label">生成内容</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon primary">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="8.5" cy="7" r="4"/>
              <path d="M20 8v6M23 11h-6"/>
            </svg>
          </div>
          <div class="stat-content">
            <div class="stat-value">156</div>
            <div class="stat-label">活跃用户</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon warning">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
              <line x1="8" y1="21" x2="16" y2="21"/>
              <line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
          </div>
          <div class="stat-content">
            <div class="stat-value">98.2%</div>
            <div class="stat-label">成功率</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon info">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12,6 12,12 16,14"/>
            </svg>
          </div>
          <div class="stat-content">
            <div class="stat-value">24.7m</div>
            <div class="stat-label">处理时长</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 服务功能区域 -->
    <section class="services-section">
      <div class="section-header">
        <h2 class="section-title">核心服务</h2>
        <p class="section-subtitle">专业的 AI 内容生成工具集</p>
      </div>
      <div class="services-grid">
        <!-- 形象克隆卡片 -->
        <div class="service-card" @click="goToImageTraining">
          <div class="service-header">
            <div class="service-icon image">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <div class="service-badge hot">Hot</div>
          </div>
          <h3 class="service-title">形象克隆</h3>
          <p class="service-description">基于深度学习技术，快速生成高质量数字形象</p>
          <div class="service-stats">
            <span class="stat-item">✓ 支持多角度</span>
            <span class="stat-item">✓ 实时生成</span>
          </div>
        </div>

        <!-- 声音克隆卡片 -->
        <div class="service-card" @click="goToSpeakerTraining">
          <div class="service-header">
            <div class="service-icon voice">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                <line x1="12" y1="19" x2="12" y2="23"/>
                <line x1="8" y1="23" x2="16" y2="23"/>
              </svg>
            </div>
          </div>
          <h3 class="service-title">声音克隆</h3>
          <p class="service-description">智能语音合成，保留原声特色和情感表达</p>
          <div class="service-stats">
            <span class="stat-item">✓ 情感识别</span>
            <span class="stat-item">✓ 多语言</span>
          </div>
        </div>

        <!-- 数字分身卡片 -->
        <div class="service-card" @click="goToVideoGeneration">
          <div class="service-header">
            <div class="service-icon video">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="23,7 16,12 23,17 23,7"/>
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
              </svg>
            </div>
          </div>
          <h3 class="service-title">数字分身</h3>
          <p class="service-description">结合形象和声音，创造逼真的数字人视频</p>
          <div class="service-stats">
            <span class="stat-item">✓ 4K画质</span>
            <span class="stat-item">✓ 自然表情</span>
          </div>
        </div>

        <!-- 智能体卡片 -->
        <div class="service-card" @click="goToAgentManagement">
          <div class="service-header">
            <div class="service-icon agent">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="11" width="18" height="10" rx="2" ry="2"/>
                <circle cx="12" cy="5" r="2"/>
                <path d="M12 7v4"/>
                <line x1="8" y1="16" x2="8" y2="16"/>
                <line x1="16" y1="16" x2="16" y2="16"/>
              </svg>
            </div>
            <div class="service-badge new">New</div>
          </div>
          <h3 class="service-title">智能体</h3>
          <p class="service-description">构建专属AI助手，定制化知识库和对话能力</p>
          <div class="service-stats">
            <span class="stat-item">✓ 知识库</span>
            <span class="stat-item">✓ 自学习</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 最近活动 -->
    <section class="activity-section">
      <div class="section-header">
        <h2 class="section-title">最近活动</h2>
        <button class="btn btn-secondary">查看全部</button>
      </div>
      <div class="activity-list">
        <div class="activity-item">
          <div class="activity-icon success">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20,6 9,17 4,12"/>
            </svg>
          </div>
          <div class="activity-content">
            <div class="activity-title">形象克隆任务完成</div>
            <div class="activity-description">项目 "企业宣传片" 已成功生成数字形象</div>
            <div class="activity-time">2分钟前</div>
          </div>
        </div>
        <div class="activity-item">
          <div class="activity-icon primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12,6 12,12 16,14"/>
            </svg>
          </div>
          <div class="activity-content">
            <div class="activity-title">语音克隆处理中</div>
            <div class="activity-description">正在为客户 A 生成个性化语音模型</div>
            <div class="activity-time">15分钟前</div>
          </div>
        </div>
        <div class="activity-item">
          <div class="activity-icon info">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="8.5" cy="7" r="4"/>
              <path d="M20 8v6M23 11h-6"/>
            </svg>
          </div>
          <div class="activity-content">
            <div class="activity-title">新用户注册</div>
            <div class="activity-description">欢迎新用户 "张三" 加入平台</div>
            <div class="activity-time">1小时前</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goToImageTraining = () => {
  router.push('/imageTraining')
}

const goToSpeakerTraining = () => {
  router.push('/speaker-training')
}

const goToVideoGeneration = () => {
  router.push('/video-generation')
}

const goToAgentManagement = () => {
  router.push('/agent-management')
}
</script>

<style scoped>
.dashboard-page {
  min-height: 100vh;
  background: var(--color-background-secondary);
}

/* 页面标题 */
.page-header {
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  padding: 32px 0;
  margin-bottom: 32px;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
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

/* 统计卡片 */
.stats-section {
  max-width: 1200px;
  margin: 0 auto 40px;
  padding: 0 24px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
}

.stat-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-lg);
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.2s ease;
}

.stat-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--border-radius-base);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.stat-icon.success {
  background: var(--color-success);
}

.stat-icon.primary {
  background: var(--color-primary-600);
}

.stat-icon.warning {
  background: var(--color-warning);
}

.stat-icon.info {
  background: var(--color-info);
}

.stat-value {
  font-size: 24px;
  font-weight: 600;
  color: var(--color-text-primary);
  line-height: 1.2;
}

.stat-label {
  font-size: 14px;
  color: var(--color-text-secondary);
  line-height: 1.2;
}

/* 服务区域 */
.services-section {
  max-width: 1200px;
  margin: 0 auto 40px;
  padding: 0 24px;
}

.section-header {
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.section-subtitle {
  font-size: 14px;
  color: var(--color-text-secondary);
  margin-top: 4px;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.service-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-lg);
  padding: 24px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.service-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
  border-color: var(--color-primary-200);
}

.service-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 16px;
}

.service-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--border-radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.service-icon.image {
  background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600));
}

.service-icon.voice {
  background: linear-gradient(135deg, var(--color-success), #059669);
}

.service-icon.video {
  background: linear-gradient(135deg, var(--color-warning), #d97706);
}

.service-icon.agent {
  background: linear-gradient(135deg, var(--color-info), #0891b2);
}

.service-badge {
  font-size: 10px;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 12px;
  line-height: 1;
}

.service-badge.hot {
  background: var(--color-error);
  color: white;
}

.service-badge.new {
  background: var(--color-success);
  color: white;
}

.service-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 8px;
}

.service-description {
  font-size: 14px;
  color: var(--color-text-secondary);
  line-height: 1.5;
  margin-bottom: 16px;
}

.service-stats {
  display: flex;
  gap: 16px;
}

.stat-item {
  font-size: 12px;
  color: var(--color-text-tertiary);
}

/* 活动区域 */
.activity-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.activity-list {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
}

.activity-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 20px 24px;
  border-bottom: 1px solid var(--color-border);
  transition: background-color 0.2s ease;
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-item:hover {
  background: var(--color-background-secondary);
}

.activity-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.activity-icon.success {
  background: var(--color-success);
}

.activity-icon.primary {
  background: var(--color-primary-600);
}

.activity-icon.info {
  background: var(--color-info);
}

.activity-content {
  flex: 1;
}

.activity-title {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-primary);
  margin-bottom: 4px;
}

.activity-description {
  font-size: 13px;
  color: var(--color-text-secondary);
  line-height: 1.4;
  margin-bottom: 4px;
}

.activity-time {
  font-size: 12px;
  color: var(--color-text-tertiary);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header-content,
  .stats-section,
  .services-section,
  .activity-section {
    padding: 0 16px;
  }
  
  .page-title {
    font-size: 24px;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .services-grid {
    grid-template-columns: 1fr;
  }
  
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}
</style>
