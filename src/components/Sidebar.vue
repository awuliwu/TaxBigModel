<template>
  <aside class="sidebar">
    <router-link to="/main-content" class="menu-button gradient-green">
      <font-awesome-icon icon="comments" /> 对话
    </router-link>
    <router-link to="/knowledge-base" class="menu-button gradient-blue">
      <font-awesome-icon icon="book" /> 知识库对话
    </router-link>
    <div v-if="isKnowledgeBasePath" class="menu-select">
      <label for="knowledge-base-select" class="knowledge-base-label">选择知识库</label>
      <select id="knowledge-base-select" v-model="selectedKnowledgeBase" @change="updateKnowledgeBase">
        <option value="税务案例库">税务案例库</option>
        <option value="税务相关法规库">税务相关法规库</option>
        <option value="税务基础知识库">税务基础知识库</option>
      </select>
    </div>
    <button class="menu-button gradient-purple" @click="exportHistory">导出记录</button>
    <button class="menu-button gradient-red" @click="clearHistory">清空记录</button>
  </aside>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faComments, faBook } from '@fortawesome/free-solid-svg-icons'
import fileSaver from 'file-saver' // 需要安装 file-saver 库： npm install file-saver
library.add(faComments, faBook)

export default {
  name: 'SidebarComponent',
  components: {
    FontAwesomeIcon
  },

  data() {
    return {
      selectedKnowledgeBase: '税务案例库', // 添加选中的知识库
    };
  },

  props: {
    history: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    isKnowledgeBasePath() {
      return this.$route.path === '/knowledge-base';
    }
  },
  methods: {
    updateKnowledgeBase() {
      this.$emit('update:knowledgeBase', this.selectedKnowledgeBase);
    },
    exportHistory() {
      const history = this.history;
      console.log(history)
      let mdContent = '# 对话记录\n\n';
      history.forEach(item => {
        mdContent += `**${item.role}**: ${item.content}\n\n`;
      });
      const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8' });
      fileSaver.saveAs(blob, 'history.md');
    },
    clearHistory() {
      this.$emit('clear-history'); // 触发事件让父组件清空 history
      this.$router.go(); // 刷新当前路由
    }
  }
};
</script>

<style>
.sidebar {
  flex: 1;
  display: flex;
  flex-direction: column;
  color: white;
  height: 100vh;
  overflow: auto;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.5); /* 透明白色背景 */
  border-radius: 15px; /* 圆角 */
  margin: 20px 0 0 20px; /* 留有一定间距 */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* 轻微阴影效果 */
}

.menu-button, .menu-select, .menu-slider {
  margin: 10px 0;
}

.menu-button {
  padding: 10px;
  text-align: center;
  border: none;
  border-radius: 4px;
  text-decoration: none;
  color: white;
  transition: transform 0.3s;
}

.menu-button:hover,
.menu-button-active {
  transform: scale(1.05);
  cursor: pointer;
}

.menu-select {
  display: flex;
  flex-direction: column;
  align-items: center; /* 居中对齐 */
}

.knowledge-base-label {
  color: darkgrey;
  margin-bottom: 5px;
  text-align: center; /* 居中对齐 */
}

.menu-select select {
  width: 100%;
  padding: 10px;
  background-color: lightskyblue;
  color: white;
  border: none;
  border-radius: 4px;
  text-align: center; /* 居中对齐 */
}

.menu-select select:focus {
  outline: none;
  background-color: skyblue;
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

/* 新增的渐变色样式 */
.gradient-green {
  background: linear-gradient(to right, #6dd5ed, #2193b0); /* 从浅绿色到深绿色 */
}

.gradient-blue {
  background: linear-gradient(to right, #a1c4fd, #c2e9fb); /* 从浅蓝色到深蓝色 */
}

.gradient-purple {
  background: linear-gradient(to right, #d4fc79, #96e6a1); /* 从浅紫色到深紫色 */
}

.gradient-yellow {
  background: linear-gradient(to right, #fbc2eb, #a6c1ee); /* 从浅黄色到深黄色 */
}

.gradient-orange {
  background: linear-gradient(to right, #ffecd2, #fcb69f); /* 从浅橙色到深橙色 */
}

.gradient-red {
  background: linear-gradient(to right, #fbc2eb, #a18cd1); /* 从浅红色到深红色 */
}
</style>
