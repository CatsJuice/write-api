<template>
  <div>
    <router-view></router-view>

    <transition name="fade">
      <div id="toast-container" v-if="show_toast">
        <div class="icon" :style="toast_style"></div>
        <span class="msg">{{ toast_msg }}</span>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      toast_msg: "",
      toast_icon: "",
      show_toast: false
    };
  },
  computed: {
    toast_style() {
      return {
        backgroundImage: `url(./images/icon/${this.toast_icon})`
      };
    }
  },
  methods: {
    global_toast(params) {
      this.toast_msg = params.msg;
      this.toast_icon = params.icon;
      this.show_toast = true;
      setTimeout(() => (this.show_toast = false), params.time);
    }
  }
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}

#toast-container {
  width: 170px;
  height: 170px;
  padding: 10px;
  overflow: hidden;
  border-radius: 10px;
  background-color: #fff;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 9999;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  font-size: 1.2rem;
  font-weight: 700;

  .icon {
    width: 80px;
    height: 80px;
    background-size: 60%;
    background-position: center;
    background-repeat: no-repeat;
    margin-bottom: 20px;
  }
}
</style>