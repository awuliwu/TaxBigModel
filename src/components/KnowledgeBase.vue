<template>
  <div ref="knowledgeBase" class="main-content">
    <div class="history">
      <div v-for="(item, index) in history" :key="index">
        <user-input-history v-if="item.role === 'user'" :input="item.content"></user-input-history>
        <model-response-history v-else :response="item.content"></model-response-history>
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
  name: 'KnowledgeBase',
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


  methods: {
    async sendMessage() {
      if (this.userInput.trim() !== '') {
        const userMessage = { role: 'user', content: this.userInput };
        this.history.push(userMessage); // 添加用户输入到历史记录

        const payload = {
          query: this.userInput,
          knowledge_base_name: "samples", // 修改为接口所需字段
          top_k: 3, // 根据需要设置
          score_threshold: 1, // 根据需要设置
          history: this.history, // 保持历史记录
          stream: false,
          model_name: "chatglm3-6b",
          temperature: 0.7,
          max_tokens: 0,
          prompt_name: "default"
        };

        this.userInput = ''; // 清空输入框

        try {
          const response = await this.$axios.post('/chat/knowledge_base_chat', payload, {
            responseType: 'json'
          });

          const jsonResponse = response.data; // 直接解析JSON响应

          console.log(jsonResponse); // 检查解析后的数据结构
          if (jsonResponse && jsonResponse.answer) { // 根据实际返回的数据结构检查
            const modelResponseText = jsonResponse.answer;
            console.log("Model Response Text:", modelResponseText); // 检查 answer 字段
            const modelResponse = { role: 'assistant', content: modelResponseText };
            this.history.push(modelResponse); // 添加大模型回复到历史记录
          } else {
            console.error("Parsed response data is missing 'answer' field:", jsonResponse);
          }
        } catch (error) {
          console.error("Error sending message:", error);
        }
      }
    },

  }

};
</script>

<style>

.main-content {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  background-color: #222; /* 暗色背景 */
  height: 100vh;
  overflow: auto;
}

.history {
  display: flex;
  flex-direction: column;
  margin-bottom: auto;
}

.input-area {
  margin-top: auto;
  display: flex;
  justify-content: center; /* 居中输入区 */
}

.input-form {
  display: flex;
  width: 60%; /* 输入区占main content的60% */
}

.message-input {
  flex: 1;
  padding: 15px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 20px; /* 圆角样式 */
  margin-right: 5px;
}

.send-button {
  padding: 10px 15px;
  background-color: #444;
  color: white;
  border: none;
  border-radius: 50%; /* 发送按钮圆形样式 */
  cursor: pointer;
}

.send-button:hover {
  background-color: #555;
}
</style>
