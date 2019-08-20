<template>
  <div :class="[edit_project || create_new_api?'editting':'']">
    <div class="container">
      <div class="left" @click="$router.push('/project')">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div class="mid"></div>

      <div class="right">
        <!-- 新建API 按钮 -->
        <!-- <div class="tool-bar-btn btn-add-api" @click="switchCreateMode()">
          <div class="icon"></div>
          <span>{{ create_new_api ? '确认新建' : '新建API'}}</span>
        </div> -->

        <!-- 取消按钮 -->
        <div class="tool-bar-btn btn-edit-cancel" @click="cancelEdit()">
          <div class="icon"></div>
          <span>取消</span>
        </div>

        <!-- 修改按钮 -->
        <div class="tool-bar-btn btn-edit" @click="switchEditMode()">
          <div class="icon"></div>
          <span>{{ edit_project ? '确认修改' : '编辑项目'}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      edit_project: false,
      create_new_api: false
    };
  },
  methods: {
    switchEditMode() {
      if (!this.edit_project) {
        this.$parent.$refs.content.create_new_api = false;
        this.create_new_api = false;
        this.$parent.$refs.content.edit_project = true;
        this.edit_project = true;
      } else {
        // do
        // console.log("确认修改");
        this.$parent.$refs.content.updateProjectInfo();
      }
    },

    // // 切换到新建 API
    // switchCreateMode() {
    //   if (!this.create_new_api) {
    //     this.$parent.$refs.content.edit_project = false;
    //     this.edit_project = false;
    //     this.$parent.$refs.content.create_new_api = true;
    //     this.create_new_api = true;
    //   } else {
    //     this.$parent.$refs.content.creatAapi();
    //   }
    // },
    
    cancelEdit() {
      if (this.edit_project) {
        this.$parent.$refs.content.edit_project = false;
        this.edit_project = false;
      } else if (this.create_new_api) {
        this.$parent.$refs.content.create_new_api = false;
        this.create_new_api = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  line-height: 60px;
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  //   background: yellow;
  padding: 0;

  .left {
    width: 40px;
    height: 40px;
    // background-color: yellowgreen;
    position: relative;
    cursor: pointer;

    span {
      display: inline-block;
      width: 20px;
      position: absolute;
      border-bottom: 2px solid #000;
      left: 50%;
      transform: translateX(-50%) rotate(0deg);
      transition: all 0.3s ease;
    }
    span:nth-child(1) {
      top: 12px;
    }
    span:nth-child(2) {
      top: 50%;
      transform: translate(-50%, -50%);
    }
    span:nth-child(3) {
      bottom: 12px;
    }
  }

  .left:hover {
    background-color: rgba(248, 240, 230, 0.5);

    span:nth-child(1) {
      top: 14px;
      left: 7px;
      width: 15px;
      transform: rotate(-45deg);
    }
    span:nth-child(2) {
      top: 50%;
      transform: translate(-50%, -50%);
    }
    span:nth-child(3) {
      bottom: 14px;
      left: 7px;
      width: 15px;
      transform: rotate(45deg);
    }
  }

  .mid {
    flex-grow: 1;
  }

  .right {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;

    .tool-bar-btn {
      flex-shrink: 0;
      margin-left: 10px;
      padding: 0px 10px;
      padding-right: 10px;
      cursor: pointer;
      height: 40px;
      border-radius: 5px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease-in-out;
      font-size: 0.9rem;

      .icon {
        width: 20px;
        height: 20px;
        background-repeat: no-repeat;
        background-position: center;
      }
      span {
      }
    }
    .btn-edit {
      background-color: #45b39d;

      .icon {
        background-image: url(../../images/icon/edit_white_2.png);
        background-size: 50%;
        margin-right: 5px;
        transform-origin: 60% 40%;
      }
    }
    .btn-edit:hover {
      background-color: #319984;
      .icon {
        animation: edit_shake 1s ease 0s 1 normal;
      }
      @keyframes edit_shake {
        0% {
          transform: rotate(0deg);
        }
        20% {
          transform: rotate(10deg);
        }
        40% {
          transform: rotate(-10deg);
        }
        60% {
          transform: rotate(10deg);
        }
        80% {
          transform: rotate(-10deg);
        }
        100% {
          transform: rotate(0deg);
        }
      }
    }

    .btn-edit-cancel {
      background-color: #cd6155;
      width: 0;
      overflow: hidden;
      padding: 0;

      .icon {
        background-image: url(../../images/icon/cancel_white.png);
        background-size: 75%;
        margin-right: 5px;
        margin-top: -2px;
        transition: all 0.3s ease-in-out;
      }
    }
    .btn-edit-cancel:hover {
      background-color: #a93226;
      .icon {
        transform: rotate(90deg);
      }
    }

    .btn-add-api {
      background-color: #233e7c;

      .icon {
        background-image: url(../../images/icon/add_white.png);
        background-size: 65%;
        margin-top: -3px;
        margin-right: 5px;
        transition: all 0.3s ease-in-out;
      }
    }
    .btn-add-api:hover {
      background-color: #0e296a;
      box-shadow: 0 10px 30px rgba(14, 42, 106, 0.349);

      .icon {
        margin-right: 15px;
      }
    }
  }
}

.editting .btn-edit-cancel {
  width: auto !important;
  padding: 0 10px !important;
}
</style>