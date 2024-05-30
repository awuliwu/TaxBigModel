<template>
  <div class="model-dialogue">
    <img src="@/assets/img/ai-avatar.png" alt="Ai Avatar" class="avatar">
    <div class="model-response-history" ref="responseText">
      <div>{{ response }}</div>
      <div class="feedback-section" v-if="showFeedback">
        <button @click="giveFeedback('positive')" class="feedback-button positive">&#128077;</button>
        <button @click="giveFeedback('negative')" class="feedback-button negative">&#128078;</button>
      </div>
      <div v-if="feedbackReason" class="feedback-reason">
        <input v-model="reason" type="text" placeholder="欢迎反馈您打分的理由" class="reason-input">
        <button @click="submitFeedback" class="submit-button">SUBMIT</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModelResponseHistory',
  props: {
    response: String
  },
  data() {
    return {
      showFeedback: true,
      feedbackReason: false,
      reason: '',
      feedbackType: null,
    };
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
    },
    giveFeedback(type) {
      this.showFeedback = false;
      this.feedbackReason = true;
      this.feedbackType = type;
    },
    submitFeedback() {
      // 处理反馈提交逻辑
      console.log(`Feedback: ${this.feedbackType}, Reason: ${this.reason}`);
      this.feedbackReason = false;
      this.reason = '';
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
  flex-direction: column;
  align-items: flex-start;
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

.feedback-section {
  margin-top: 10px;
}

.feedback-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  margin-right: 5px;
}

.feedback-button.positive {
  color: green;
}

.feedback-button.negative {
  color: gray;
}

.feedback-reason {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.reason-input {
  flex: 1;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
}

.submit-button {
  padding: 5px 10px;
  background-color: green;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
