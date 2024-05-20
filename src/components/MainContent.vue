<template>
  <div className="main-content">
    <div className="history">
      <user-input-history></user-input-history>
      <br>
      <model-response-history></model-response-history>
    </div>
    <div className="input-area">
      <form @submit.prevent="sendMessage" class="input-form">
        <input type="text" v-model="userInput" placeholder="请输入对话内容，换行请使用shift*enter，输入help查看自定义命令" className="message-input">
        <button type="submit" className="send-button">&#10148;</button> <!-- 使用右箭头符号作为发送按钮 -->
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
      userInput: ''
    };
  },
  methods: {
    sendMessage() {
      console.log("发送的消息:", this.userInput); // 示例：在此处可以加入实际的发送逻辑
      this.userInput = ''; // 清空输入框
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