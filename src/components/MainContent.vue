<template>
  <div ref="mainContent" class="main-content">
    <div class="history">
      <div v-for="(item, index) in history" :key="index">
        <user-input-history v-if="item.role === 'user'" :input="item.content"></user-input-history>
        <model-response-history v-else :response="item.content" :isLatest="index === history.length - 1"></model-response-history>
        <br>
      </div>
    </div>
    <div class="input-area">
      <form @submit.prevent="sendMessage" class="input-form">
        <input type="text" v-model="userInput" placeholder="请输入对话内容，换行请使用shift*enter，输入help查看自定义命令" class="message-input">
        <button type="submit" class="send-button">&#10148;</button> <!-- 使用右箭头符号作为发送按钮 -->
      </form>
    </div>
  </div>
</template>

<script>
import UserInputHistory from './UserInputHistory.vue';
import ModelResponseHistory from './ModelResponseHistory.vue';

export default {
  name: 'MainContent',
  components: {
    UserInputHistory,
    ModelResponseHistory,
  },
  data() {
    return {
      userInput: '',
      history: [],
    };
  },
  watch: {
    history(newHistory) {
      this.$emit('update-history', newHistory); // 通过事件通知父组件更新 history
    }
  },
  methods: {
    async sendMessage() {
      if (this.userInput.trim() !== '') {
        const userMessage = { role: 'user', content: this.userInput };
        this.history.push(userMessage); // 添加用户输入到历史记录
        this.$emit('update-history', userMessage);
        console.log(this.history)

        const payload = {
          query: this.userInput,
          conversation_id: "",
          history_len: this.history.length,
          history: this.history,
          stream: false,
          model_name: "tax_model",
          temperature: 0.7,
          max_tokens: 0,
          prompt_name: "default"
        };

        this.userInput = ''; // 清空输入框

        try {
          const response = await this.$axios.post('/chat/chat', payload, {
            responseType: 'text'
          });

          const eventData = response.data.trim().substring(5); // 去掉前缀 "data: "
          const jsonResponse = JSON.parse(eventData); // 解析JSON

          console.log(jsonResponse); // 检查解析后的数据结构
          if (jsonResponse && jsonResponse.text) {
            const modelResponseText = jsonResponse.text;
            console.log("Model Response Text:", modelResponseText); // 检查 text 字段
            const modelResponse = { role: 'assistant', content: modelResponseText };
            this.history.push(modelResponse); // 添加大模型回复到历史记录
            this.$emit('update-history', modelResponse);
          } else {
            console.error("Parsed response data is missing 'text' field:", jsonResponse);
          }
        } catch (error) {
          console.error("Error sending message:", error);
        }

      }
    },
  }
};
</script>

<style scoped>
.main-content {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 100vh; /* 页面高度 */
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.5) !important; /* 透明白色背景 */
  border-radius: 15px !important; /* 圆角 */
  margin: 0 20px 20px 20px !important; /* 取消上间距，保留其他间距 */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1) !important; /* 轻微阴影效果 */
  position: relative;
}

.history {
  flex: 1;
  overflow-y: auto;
  padding-bottom: 70px; /* 为了腾出空间显示输入区 */
}

.input-area {
  position: absolute;
  bottom: 20px; /* 距离底部一定距离 */
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 800px;
  display: flex;
  justify-content: center; /* 居中输入区 */
  padding: 10px 20px;
  background-color: rgba(255, 255, 255, 0.5); /* 透明背景 */
  border-radius: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* 轻微阴影效果 */
}

.input-form {
  display: flex;
  width: 100%;
}

.message-input {
  flex: 1;
  padding: 15px;
  background-color: rgba(255, 255, 255, 0.9); /* 透明白色背景 */
  color: #333;
  border: 1px solid #ccc;
  border-radius: 20px; /* 圆角样式 */
  margin-right: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* 轻微阴影效果 */
}

.send-button {
  padding: 10px 15px;
  background-color: #4CAF50; /* 按钮背景色 */
  color: white;
  border: none;
  border-radius: 50%; /* 发送按钮圆形样式 */
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* 轻微阴影效果 */
}

.send-button:hover {
  background-color: #45a049;
}
</style>
