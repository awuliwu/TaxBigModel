<template>
  <div id="app">
    <div class="container">
      <!-- 右箭头按钮，仅当侧边栏和头部被收起时显示 -->
      <button v-show="isCollapsed" class="expand-button" @click="toggleCollapse(false)">&#9654;</button>
      <div class="left-sidebar" v-show="!isCollapsed">
        <header-component @toggle="toggleCollapse"></header-component>
        <sidebar-component></sidebar-component>
      </div>
      <router-view class="main-content" :class="{ 'full-width': isCollapsed }"></router-view>
    </div>
  </div>
</template>

<script>
import HeaderComponent from './components/Header.vue';
import SidebarComponent from './components/Sidebar.vue';

export default {
  name: 'App',
  components: {
    HeaderComponent,
    SidebarComponent,
  },
  data() {
    return {
      isCollapsed: false // 控制侧边栏和头部的折叠状态，初始显示
    };
  },
  methods: {
    toggleCollapse(collapsed) {
      this.isCollapsed = collapsed;
    }
  }
};
</script>

<style>
.container {
  display: flex;
  height: 100vh;
  width: 100%;
  position: relative;
}

.left-sidebar {
  width: 16.67%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #444;
}

.main-content {
  height: 100%;
  flex: 1;
  background-color: #222;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.full-width {
  flex: 1;
}

.expand-button {
  position: absolute;
  left: 0;
  top: 0;
  background-color: #444;
  color: white;
  border: none;
  cursor: pointer;
  padding: 10px;
  font-size: 24px;
  border-radius: 0 10px 10px 0;
}
</style>
