<template>
  <header class="header">
    <div class="logo">
      <img src="@/assets/img/logo.png" alt="Logo">
    </div>
    <button class="collapse-button" @click="toggleCollapse">&#9664;</button>

  </header>
</template>

<script>
export default {
  name: 'HeaderComponent',
  data() {
    return {
      isCollapsed: false // 控制折叠状态
    };
  },
  methods: {
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed;
      this.$emit('toggle', this.isCollapsed); // 向父组件发出状态变化
    }
  }
};
</script>

<style>
.header {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #333;
  color: white;
}

.logo img {
  height: 50px; /* 或根据您的具体需求调整高度和宽度 */
  width: 160px; /* 保持图像宽高比 */
}

.collapse-button {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
}
</style>
