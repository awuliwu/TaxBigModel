<template>
    <div class="model-dialogue">
        <img src="@/assets/img/ai-avatar.png" alt="Ai Avatar" class="avatar">
        <div class="model-response-container">
            <div class="model-response-history" ref="responseText">
                <div>{{ response }}</div>
            </div>
            <div v-if="isLatest" class="reaction-buttons">
                <button @click="likeResponse">
                    <svg
                        v-if="!liked"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#333"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="reaction-icon"
                    >
                        <path d="M14 9V5a3 3 0 0 0-3-3 4.35 4.35 0 0 0-.88.09 1.73 1.73 0 0 0-1.29 1.91v5.5H3.3A1.3 1.3 0 0 0 2 10.7v8.6A1.3 1.3 0 0 0 3.3 20h6.41a4.33 4.33 0 0 0 4.29-3.7l.38-3A1.73 1.73 0 0 0 14 12h-1V9z"></path>
                    </svg>
                    <svg
                        v-else
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ff0"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="reaction-icon"
                    >
                        <path d="M14 9V5a3 3 0 0 0-3-3 4.35 4.35 0 0 0-.88.09 1.73 1.73 0 0 0-1.29 1.91v5.5H3.3A1.3 1.3 0 0 0 2 10.7v8.6A1.3 1.3 0 0 0 3.3 20h6.41a4.33 4.33 0 0 0 4.29-3.7l.38-3A1.73 1.73 0 0 0 14 12h-1V9z"></path>
                    </svg>
                </button>
                <button @click="dislikeResponse">
                    <svg
                        v-if="!disliked"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#333"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="reaction-icon"
                    >
                        <path d="M10 15v4a3 3 0 0 0 3 3 4.35 4.35 0 0 0 .88-.09 1.73 1.73 0 0 0 1.29-1.91V13h5.1a1.3 1.3 0 0 0 1.3-1.3V3.1A1.3 1.3 0 0 0 19.3 2h-6.41a4.33 4.33 0 0 0-4.29 3.7l-.38 3A1.73 1.73 0 0 0 10 12h1v3z"></path>
                    </svg>
                    <svg
                        v-else
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ff0"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="reaction-icon"
                    >
                        <path d="M10 15v4a3 3 0 0 0 3 3 4.35 4.35 0 0 0 .88-.09 1.73 1.73 0 0 0 1.29-1.91V13h5.1a1.3 1.3 0 0 0 1.3-1.3V3.1A1.3 1.3 0 0 0 19.3 2h-6.41a4.33 4.33 0 0 0-4.29 3.7l-.38 3A1.73 1.73 0 0 0 10 12h1v3z"></path>
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ModelResponseHistory',
    props: {
        response: String,
        isLatest: Boolean
    },
    data() {
        return {
            likes: 0,
            dislikes: 0,
            liked: false,
            disliked: false
        };
    },
    mounted() {
        this.typeWriter();
    },
    methods: {
        typeWriter() {
            const element = this.$refs.responseText;
            const text = this.response;
            element.innerText = '';
            let i = 0;

            const type = () => {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, 10); // 调整此值以加快或减慢打字速度
                }
            };

            type();
        },
        likeResponse() {
            this.liked = !this.liked;
            if (this.liked) {
                this.likes += 1;
                if (this.disliked) {
                    this.disliked = false;
                    this.dislikes -= 1;
                }
            } else {
                this.likes -= 1;
            }
        },
        dislikeResponse() {
            this.disliked = !this.disliked;
            if (this.disliked) {
                this.dislikes += 1;
                if (this.liked) {
                    this.liked = false;
                    this.likes -= 1;
                }
            } else {
                this.dislikes -= 1;
            }
        }
    }
};
</script>

<style>
.model-dialogue {
    display: flex;
}

.model-response-container {
    display: flex;
    flex-direction: column;
}

.model-response-history {
    display: flex;
    align-items: center;
    padding: 10px;
    margin-right: auto; /* 向左对齐 */
    max-width: 75%; /* 最大宽度不超过容器的3/4 */
    width: fit-content; /* 宽度根据内容调整，但不超过最大宽度 */
    border: 1px solid #555;
    border-radius: 15px; /* 添加圆角 */
    background-color: #555; /* 轻色背景增加对比 */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* 添加阴影提升立体感 */
    word-wrap: break-word; /* 允许长单词换行 */
    overflow-wrap: break-word; /* 在必要时换行 */
}

.reaction-buttons {
    display: flex;
    gap: 10px;
    margin-top: 10px;
}

.reaction-buttons button {
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
}

.reaction-buttons .reaction-icon {
    width: 24px; /* 调整图标的宽度 */
    height: 24px; /* 调整图标的高度 */
    margin-right: 5px; /* 图标和文字之间的间距 */
}

.avatar {
    width: 50px; /* 调整头像大小 */
    height: 50px; /* 调整头像大小 */
    border-radius: 50%; /* 圆形头像 */
    margin-right: 10px; /* 保持原有间距 */
    margin-left: 10px;
    object-fit: cover; /* 确保图片内容被正确裁剪填充 */
}

.feedback-section {
  margin-top: 10px;
}

.feedback-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  margin-right: 5px;
}

.feedback-button.positive {
  color: green;
}

.feedback-button.negative {
  color: gray;
}

.feedback-reason {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.reason-input {
  flex: 1;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
}

.submit-button {
  padding: 5px 10px;
  background-color: green;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
