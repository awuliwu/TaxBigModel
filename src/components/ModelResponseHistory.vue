<template>
  <div class="model-dialogue">
    <img src="@/assets/img/ai-avatar.png" alt="Ai Avatar" class="avatar">
    <div class="model-response-history" ref="responseText">
      <div>{{ response }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModelResponseHistory',
  props: {
    response: String
  },
  mounted() {
    this.typeWriter();
  },
  methods: {
    typeWriter() {
      const element = this.$refs.responseText;
      const text = this.response;
      element.innerText = '';
      let i = 0;

      const type = () => {
        if (i < text.length) {
          element.innerHTML += text.charAt(i);
          i++;
          setTimeout(type, 10); // 调整此值以加快或减慢打字速度
        }
      };

      type();
    }
  }
};
</script>

<style>
.model-dialogue {
  display: flex;
}

.model-response-history {
  display: flex;
  align-items: center;
  padding: 10px;
  margin-right: auto; /* 向左对齐 */
  max-width: 75%; /* 最大宽度不超过容器的3/4 */
  width: fit-content; /* 宽度根据内容调整，但不超过最大宽度 */
  border: 1px solid #555;
  border-radius: 15px; /* 添加圆角 */
  background-color: #555; /* 轻色背景增加对比 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* 添加阴影提升立体感 */
  word-wrap: break-word; /* 允许长单词换行 */
  overflow-wrap: break-word; /* 在必要时换行 */
}

.avatar {
  width: 50px; /* 调整头像大小 */
  height: 50px; /* 调整头像大小 */
  border-radius: 50%; /* 圆形头像 */
  margin-right: 10px; /* 保持原有间距 */
  margin-left: 10px;
  object-fit: cover; /* 确保图片内容被正确裁剪填充 */
}
</style>
