<template>
  <div>
    <router-view ref='app_root'></router-view>

    <transition name="fade">
      <div id="toast-container" v-if="show_toast">
        <div :class="['icon', toast_icon]"></div>
        <span class="msg">{{ toast_msg }}</span>
      </div>
    </transition>

    <transition name="fade">
      <div v-if="show_confirm" class="confirm-container">
        <div class="mask">
          <div class="title">
            <div class="icon"></div>
            {{ confirm_title.length>0? confirm_title: 'Attention!' }}
          </div>
          <div class="content">
            {{ confirm_content }}
          </div>

          <div class="confirm-btns">
            <div @click='show_confirm=false' class="confirm-btn">&nbsp;取消</div>
            <div @click='confirm_yes()' class="confirm-btn">&nbsp;确认</div>
          </div>
        </div>
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
      show_toast: false,

      confirm_title: '',
      confirm_content: '',
      show_confirm: false,
      delete_project_id: -1,
      module_id: -1,

      current_confirm_id: -1
    };
  },
  computed: {
    // toast_style() {
    //   return {
    //     backgroundImage: `url(./images/icon/${this.toast_icon})`
    //   };
    // }
  },
  methods: {
    global_toast(params) {
      this.toast_msg = params.msg;
      if (params.icon == "!.png") this.toast_icon = "icon1";
      else if (params.icon == "yes_grey.png") this.toast_icon = "icon2";
      else this.toast_icon = "icon1";

      this.show_toast = true;
      setTimeout(() => this.show_toast=false, params.time);
    },
    showConfirm(params, current_confirm_id){
      
      this.module_id = params.module_id || -1
      this.confirm_title = params.title
      this.confirm_content = params.content
      this.show_confirm = true
      this.current_confirm_id = current_confirm_id
    },
    delete_project(id, name) {
      
      this.delete_project_id = id
      this.showConfirm({
        title: "确认删除项目吗",
        content: `将永久删除项目【${name}】的所有数据， 不可恢复`
      }, 1)
    },
    confirm_yes() {
      // 判断当前 confirm 的是什么
      this.show_confirm = false
      if (this.current_confirm_id == 1){
        this.$refs.app_root.$refs.content.do_delete(this.delete_project_id);
        this.current_confirm_id = -1;
      } else if (this.current_confirm_id == 2) {
        // console.log(this.$refs.app_root.$refs.content.$refs.api_list);
        this.$refs.app_root.$refs.content.$refs.api_list.deleteModule(this.module_id, '', true);
      } else if (this.current_confirm_id == 3) {
        this.$refs.app_root.$refs.content.$refs.api_op_content.deleteAPI(true);
      }
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

  .icon1 {
    background-image: url(./images/icon/warn.png);
  }
  .icon2 {
    background-image: url(./images/icon/yes_grey.png);
  }
}

.confirm-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.1);
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;

  .mask {
    
    height: 240px;
    padding: 20px 50px;
    background-color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);

    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

    .title {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      height: 30px;
      line-height: 30px;

      font-size: 2.4rem;
      font-weight: 700;

      .icon {
        width: 30px;
        height: 30px;
        background-image: url(./images/icon/warn_blue.png);
        background-size: 80%;
        background-repeat: no-repeat;
        background-position: center;
        margin-right: 20px;
      }
    }
    .content {
      padding-left: 50px;
      font-size: 1.5rem;
      margin-top: 10px;
    }

    .confirm-btns {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      margin-top: 30px;

      .confirm-btn {
        width: 80px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        border-radius: 5px;
        margin-left: 10px;
        cursor: pointer;
        font-size: 1.2rem;
        font-weight: bold;
        letter-spacing: 5px;
      }

      .confirm-btn:nth-child(1) {
        border: 1px solid #7c7c7c;
        color: #7c7c7c;
        transition: all 0.2s ease-in-out;
      }
      .confirm-btn:nth-child(1):hover {
        border: 1px solid #d4d4d4;
        background-color: #d4d4d4;
      }
      .confirm-btn:nth-child(2) {
        transition: all 0.2s ease-in-out;
        border: 1px solid #CD5C5C;
        background-color: #CD5C5C;
        color: #fff;
      }
      .confirm-btn:nth-child(2):hover {
        border: 1px solid #9e3535;
        background-color: #9e3535;
      }
    }
  }

  @media screen and (max-width: 800px){
    .mask {
      width: 80%;
    }
  }
  @media screen and (min-width: 800px) {
    .mask {
      width: 640px;
    }
  }
}
</style>