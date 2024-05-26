<template>
  <div className="main-content">
    <div className="history">
      <user-input-history></user-input-history>
      <br>
      <model-response-history></model-response-history>
    </div>
    <div className="input-area">
      <form @submit.prevent="sendMessage" class="input-form">
        <input type="text" v-model="query" placeholder="请输入对话内容，换行请使用shift*enter，输入help查看自定义命令" className="message-input" @keyup.enter="sendRequest">
        <button type="submit" className="send-button" @click="sendRequest">&#10148;</button> <!-- 使用右箭头符号作为发送按钮 -->
        <div v-if="response">
            <p>服务器响应: {{ response }}</p>
        </div>
        <div v-if="error">
            <p>错误信息: {{ error }}</p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import UserInputHistory from './UserInputHistory.vue';
import ModelResponseHistory from './ModelResponseHistory.vue';
import axios from 'axios';

export default {
  name: 'MainContent',
  components: {
    UserInputHistory,
    ModelResponseHistory,
  },
  data() {
      return {
          query: '',
          response: null,
          error: null,
          history: []
      };
  },
    methods: {
        sendRequest() {
            // 添加用户输入到历史记录
            this.addToHistory('user', this.query);

            const data = {
                // query: this.query,
                query: "恼羞成怒",
                conversation_id: "",
                // history_len: this.history.length,
                history_len: -1,
                // history: this.history,
                history: [
                    {
                        "role": "user",
                        "content": "我们来玩成语接龙，我先来，生龙活虎"
                    },
                    {
                        "role": "assistant",
                        "content": "虎头虎脑"
                    }
                ],
                stream: false,
                model_name: "chatglm3-6b",
                temperature: 0.7,
                max_tokens: 0,
                prompt_name: "default"
            };

            axios.post('/chat/chat', data)
                .then(res => {
                    this.response = res.data;
                    this.error = null;
                    // 添加模型回答到历史记录
                    // this.addToHistory('assistant', response.data);
                })
                .catch(err => {
                    this.error = err.response ? err.response.data.detail : '请求错误';
                    this.response = null;
                });
        },
        addToHistory(role, content) {
            this.history.push({ role, content });
        }
    }
};
</script>

<style>
.main-content {
  flex: 1;
  padding: 20px;
  color: white;
  display: flex;
  flex-direction: column;
  background-color: #222; /* 暗色背景 */
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
