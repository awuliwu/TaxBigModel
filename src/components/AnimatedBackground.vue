<template>
  <div class="background">
    <div v-for="n in numParticles" :key="n" class="particle" :style="particleStyle(n)"></div>
  </div>
</template>

<script>
export default {
  name: 'AnimatedBackground',
  data() {
    return {
      numParticles: 50 // 粒子的数量，可以根据需要调整
    };
  },
  methods: {
    particleStyle(n) {
      const colors = ['#FF7F50', '#FFD700', '#7FFF00', '#00FFFF', '#8A2BE2'];
      const size = Math.random() * 10 + 5 + 'px'; // 粒子大小随机
      const color = colors[n % colors.length]; // 循环使用颜色
      return {
        backgroundColor: color,
        width: size,
        height: size,
        animationDelay: `${Math.random() * 5}s`, // 随机动画延迟
        left: `${Math.random() * 100}vw`, // 随机水平位置
        top: `${Math.random() * 100}vh` // 随机垂直位置
      };
    }
  }
};
</script>

<style scoped>
.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  z-index: -1; /* 确保背景在内容后面 */
  background: rgba(173, 216, 230, 0.2); /* 略有透明度的背景 */
}

.particle {
  position: absolute;
  border-radius: 50%;
  animation: float 10s ease-in-out infinite;
  opacity: 0.7; /* 粒子的透明度 */
}

@keyframes float {
  0% {
    transform: translateY(0) translateX(0);
    opacity: 1;
  }
  50% {
    transform: translateY(-200px) translateX(200px);
    opacity: 0.5;
  }
  100% {
    transform: translateY(0) translateX(0);
    opacity: 1;
  }
}
</style>
