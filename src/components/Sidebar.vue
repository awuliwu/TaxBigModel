<template>
  <aside class="sidebar">
    <router-link to="/" class="menu-button">
      <font-awesome-icon icon="comments" /> 对话
    </router-link>
    <router-link to="/knowledge-base" class="menu-button">
      <font-awesome-icon icon="book" /> 知识库管理
    </router-link>

    <div class="menu-select">
      <label for="dialogue-mode">请选择对话模式：</label>
      <select id="dialogue-mode" v-model="selectedDialogueMode">
        <option value="default">default</option>
        <option value="other">其他选项</option>
      </select>
    </div>
    <div class="menu-select">
      <label for="llm-model">请选择 LLM 模型：</label>
      <select id="llm-model" v-model="selectedLLMModel">
        <option value="LLM模型">LLM模型</option>
        <option value="Llama3-8B">Llama3-8B-chat-chinese-v2</option>
      </select>
    </div>
    <div class="menu-slider">
      <label for="temperature">Temperature:</label>
      <div class="slider-container">
        <span class="min-max">0.00</span>
        <span class="min-max">2.00</span>
        <br>
        <input type="range" id="temperature" min="0" max="2" step="0.01" v-model="temperature" @input="updateTemperature">

        <div class="current-value">{{ temperature }}</div>
      </div>
    </div>
  </aside>
</template>

<script>

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faComments, faBook } from '@fortawesome/free-solid-svg-icons'

library.add(faComments, faBook)
export default {
  name: 'SidebarComponent',
  components: {
    FontAwesomeIcon
  },

  data() {
    return {
      selectedDialogueMode: 'default',
      selectedLLMModel: 'LLM模型',
      temperature: 0 // 初始化温度为 0
    };
  },

  methods: {
    updateTemperature() {
      console.log(`Temperature now: ${this.temperature}`);  // Debug 输出当前温度值
      // this.$forceUpdate();  // 尝试手动触发更新
    }
  }
};
</script>

<style>
.sidebar {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  color: white;
}

.menu-button, .menu-select, .menu-slider {
  margin: 10px 0;
}

.menu-button {
  padding: 10px;
  background-color: #333;
  text-align: center;
  border: none;
  border-radius: 4px;
  text-decoration: none;
  color: white;
  transition: background-color 0.3s, transform 0.3s;
}

.menu-button:hover,
.menu-button-active {
  background-color: #555;
  transform: scale(1.05);
  cursor: pointer;
}

.menu-select select, .menu-slider input {
  width: 100%;
  padding: 8px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 4px;
}

.menu-select select:focus, .menu-slider input:focus {
  outline: none;
  background-color: #444;
}

.slider-container {
  position: relative;
}

.min-max {
  position: absolute;
  color: #aaa;
  font-size: 0.75rem;
}

.min-max:first-of-type {
  left: 0;
}

.min-max:last-of-type {
  right: 0;
}

.current-value {
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 0.85rem;
  background-color: #333;
  padding: 2px 8px;
  border-radius: 4px;
}
</style>
