<template>
  <aside class="sidebar">
    <router-link to="/main-content" class="menu-button">
      <font-awesome-icon icon="comments" /> 对话
    </router-link>
    <router-link to="/knowledge-base" class="menu-button">
      <font-awesome-icon icon="book" /> 知识库对话
    </router-link>
    <div v-if="isKnowledgeBasePath" class="menu-select">
      <label for="knowledge-base-select">选择知识库</label>
      <select id="knowledge-base-select" v-model="selectedKnowledgeBase" @change="updateKnowledgeBase">
        <option value="税务案例库">税务案例库</option>
        <option value="税务相关法规库">税务相关法规库</option>
        <option value="税务基础知识库">税务基础知识库</option>
        <!-- 添加更多选项 -->
      </select>
    </div>
      <button class="menu-button" @click="exportHistory">导出记录</button>
      <button class="menu-button" @click="clearHistory">清空记录</button>
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
  margin: 20px; /* 留有一定间距 */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* 轻微阴影效果 */
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

.menu-select {
  display: flex;
  flex-direction: column;
  align-items: center; /* 居中对齐 */
}

.knowledge-base-label {
  color: white;
  margin-bottom: 5px;
  text-align: center; /* 居中对齐 */
}

.menu-select select {
  width: 100%;
  padding: 8px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 4px;
  text-align: center; /* 居中对齐 */
}

.menu-select select:focus {
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


updateKnowledgeBase() {
this.$emit('update:knowledgeBase', this.selectedKnowledgeBase);
},
