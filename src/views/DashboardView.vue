<template>
  <div class="homepage">
    <!-- 头部标题 -->
    <header class="header">
      <div class="container">
        <h1 class="title">
          <span class="brand">术天 AI</span>
          为您提供最新的数字人技术服务
        </h1>
        <div class="header-decoration"></div>
      </div>
    </header>

    <!-- 服务卡片区域 -->
    <main class="main-content">
      <div class="container">
        <div class="services-grid">
          <!-- 形象克隆卡片 -->
          <div class="service-card">
            <div class="card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <h3 class="card-title">形象克隆</h3>
            <p class="card-description">轻松制作您的数字形象</p>
            <div class="card-footer">
              <button class="learn-more-btn" @click="goToImageTraining">了解更多</button>
            </div>
          </div>

          <!-- 声音克隆卡片 -->
          <div class="service-card">
            <div class="card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="11 5,6 9,2 9,2 15,6 15,11 19,11 5"/>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
              </svg>
            </div>
            <h3 class="card-title">声音克隆</h3>
            <p class="card-description">音色、语气、节奏通近真人</p>
            <div class="card-footer">
              <button class="learn-more-btn" @click="goToSpeakerTraining">了解更多</button>
            </div>
          </div>

          <!-- 数字分身卡片 -->
          <div class="service-card">
            <div class="card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                <line x1="8" y1="21" x2="16" y2="21"/>
                <line x1="12" y1="17" x2="12" y2="21"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <h3 class="card-title">数字分身</h3>
            <p class="card-description">利用声音(文字)和形象创作数字人作品</p>
            <div class="card-footer">
              <button class="learn-more-btn" @click="goToVideoGeneration">了解更多</button>
            </div>
          </div>

          <!-- 智能体卡片 -->
          <div class="service-card">
            <div class="card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 12l2 2 4-4"/>
                <path d="M21 12c.552 0 1-.448 1-1V5c0-.552-.448-1-1-1H3c-.552 0-1 .448-1 1v6c0 .552.448 1 1 1h9l4 4v-4z"/>
                <circle cx="12" cy="12" r="3"/>
                <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
              </svg>
            </div>
            <h3 class="card-title">智能体</h3>
            <p class="card-description">定制专属知识库</p>
            <div class="card-footer">
              <button class="learn-more-btn" @click="goToAgentManagement">了解更多</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  export default {
    name: 'HomePage',
    data() {
      return {
        // 可以在这里添加动态数据
      }
    },
    methods: {
      // 可以在这里添加方法
      goToImageTraining(){
        this.$router.push('/imageTraining')
      },
      goToSpeakerTraining(){
        this.$router.push('/speaker-training')
      },
      goToVideoGeneration(){
        this.$router.push('/video-generation')
      },
      goToAgentManagement(){
        this.$router.push('/agent-management')
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

  .homepage {
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
  }

  .container {
    max-width: 1600px;
    margin: 0 auto;
    padding: 0 40px;
  }

  /* 头部样式 */
  .header {
    padding: 100px 0 80px;
    text-align: center;
    color: white;
  }

  .title {
    font-size: 3.5rem;
    font-weight: 300;
    margin-bottom: 40px;
    line-height: 1.2;
  }

  .brand {
    font-weight: 700;
    color: #ffd700;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }

  .header-decoration {
    width: 100px;
    height: 3px;
    background: linear-gradient(90deg, #ffd700, #ffed4a);
    margin: 0 auto;
    border-radius: 2px;
  }

  /* 主要内容区域 */
  .main-content {
    padding: 60px 0 100px;
  }

  .services-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 50px;
    margin-top: 60px;
  }

  /* 服务卡片样式 */
  .service-card {
    background: white;
    border-radius: 16px;
    padding: 35px 25px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    text-align: center;
    position: relative;
    overflow: hidden;
    min-height: 320px;
  }

  .service-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #667eea, #764ba2);
  }

  .service-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }

  .card-icon {
    width: 80px;
    height: 80px;
    margin: 0 auto 20px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }

  .card-icon svg {
    width: 40px;
    height: 40px;
  }

  .card-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 15px;
  }

  .card-description {
    font-size: 1rem;
    color: #666;
    line-height: 1.6;
    margin-bottom: 25px;
  }

  .card-footer {
    margin-top: auto;
  }

  .learn-more-btn {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    border: none;
    padding: 12px 30px;
    border-radius: 25px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .learn-more-btn:hover {
    background: linear-gradient(135deg, #5a67d8, #6b46c1);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }

  /* 响应式设计 */
  @media (max-width: 1640px) {
    .container {
      max-width: 1400px;
      padding: 0 30px;
    }

    .services-grid {
      gap: 40px;
    }
  }

  @media (max-width: 1400px) {
    .services-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 30px;
    }
  }

  @media (max-width: 1200px) {
    .services-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 30px;
    }

    .title {
      font-size: 3rem;
    }
  }

  @media (max-width: 768px) {
    .title {
      font-size: 2rem;
    }

    .services-grid {
      grid-template-columns: 1fr;
      gap: 20px;
    }

    .service-card {
      padding: 30px 20px;
      min-height: auto;
    }

    .header {
      padding: 60px 0 40px;
    }

    .container {
      padding: 0 20px;
    }
  }

  @media (max-width: 480px) {
    .title {
      font-size: 1.5rem;
    }

    .container {
      padding: 0 15px;
    }
  }
</style>
