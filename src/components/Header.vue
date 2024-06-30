<template>
  <header class="header">
    <div class="logo">
      <img src="@/assets/img/Fudan_University_Logo.png" alt="Logo">
    </div>
    <div class="title">税务大模型</div>
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
  align-items: center; /* 使所有子项垂直居中 */
  justify-content: space-between;
  padding: 10px;
  overflow: hidden;
  z-index: -1; /* 确保背景在内容后面 */
  background-color: rgba(255, 255, 255, 0.5); /* 透明白色背景 */
  border-radius: 15px; /* 圆角 */
  margin: 0px 0 0 20px; /* 留有一定间距 */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* 轻微阴影效果 */
}

.logo img {
  height: 50px;
  width: 50px;
}

.title {
  font-family: "STXingkai", "华文行楷", cursive;
  font-size: 28px;
  font-weight: normal;
  color: #333;
  margin-left: 10px;
}

.collapse-button {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
}
</style>
