<template>
  <div class="welcome-container">
    <div class="welcome-text">欢迎使用复旦大学税务大模型！</div>
  </div>
</template>

<script>
export default {
  name: "WelcomePage"
}
</script>

<style scoped>
.welcome-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; /* 使容器高度为视口高度 */
  background-color: rgba(255, 255, 255, 0.5); /* 透明白色背景 */
  border-radius: 15px; /* 圆角 */
  padding: 20px;
  margin: 0 20px 20px 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* 轻微阴影效果 */
}

.welcome-text {
  font-size: 3em; /* 较大的字体尺寸 */
  font-weight: bold;
  background: linear-gradient(45deg, #00c6ff, #0072ff);
  -webkit-background-clip: text;
  color: transparent;
  animation: textAnimation 5s infinite, bubbleEffect 2s ease-out;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
  padding: 10px;
  border-radius: 15px;
  text-align: center; /* 文字居中 */
  font-family: '黑体', 'SimHei', 'Arial', sans-serif; /* 字体设置为黑体 */
}

@keyframes textAnimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes bubbleEffect {
  0% {
    opacity: 0;
    transform: scale(0.5) translateY(50px); /* 缩小并向下移动 */
  }
  50% {
    opacity: 1;
    transform: scale(1.2); /* 放大 */
  }
  100% {
    opacity: 1;
    transform: scale(1); /* 正常大小 */
  }
}
</style>
