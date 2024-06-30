<template>
  <div class="user-dialogue">
    <div class="user-input-history">
      <div>
        {{ input }}
      </div>
    </div>
    <img src="@/assets/img/user-avatar.png" alt="User Avatar" class="avatar">
  </div>
</template>

<script>
export default {
  name: 'UserInputHistory',
  props: {
    input: String
  }
};
</script>

<style scoped>
.user-dialogue {
  display: flex;
  align-items: center;
  margin: 10px 0; /* 增加上下间距 */
}

.user-input-history {
  display: flex;
  align-items: center;
  padding: 15px;
  margin-left: auto; /* 向右对齐 */
  max-width: 75%; /* 最大宽度不超过容器的3/4 */
  width: fit-content; /* 宽度根据内容调整，但不超过最大宽度 */
  border: 1px solid rgba(0, 128, 0, 0.3); /* 边框颜色调整为半透明绿色 */
  border-radius: 20px; /* 圆角增加柔和感 */
  background-color: rgba(144, 238, 144, 0.7); /* 半透明淡绿色背景 */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2); /* 添加阴影提升立体感 */
  word-wrap: break-word; /* 允许长单词换行 */
  overflow-wrap: break-word; /* 在必要时换行 */
  color: #333; /* 调整文字颜色 */
}

.avatar {
  width: 50px; /* 调整头像大小 */
  height: 50px; /* 调整头像大小 */
  border-radius: 50%; /* 圆形头像 */
  margin-left: 10px; /* 保持原有间距 */
  object-fit: cover; /* 确保图片内容被正确裁剪填充 */
}
</style>
