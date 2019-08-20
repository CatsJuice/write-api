<template>
  <div class="root-container" onselectstart="return false">
    <!-- 删除控制按钮 -->
    <div class="delete-control-contanier">
      <div class="title">API List</div>
      <div
        :class="['del-box', module_delete_mode?'module-delete-mode':'']"
        @click="module_delete_mode=!module_delete_mode"
      >
        <div class="txt">{{ module_delete_mode?'完成':'删除' }}</div>
        <div class="icon"></div>
      </div>
    </div>

    <!-- 搜索 -->
    <div ref="search" class="search">
      <div class="icon"></div>
      <input type="text" placeholder="Search Api" />
    </div>

    <!-- 模块为空 -->
    <div class="module-empty" v-if="mod_api_list.length==0">No Modules Found</div>

    <!-- 模块列表 -->
    <div :class="['module-list', module_delete_mode?'module-delete-mode':'']">
      <div
        :class="['module-item', current_module==mod.module_id ? 'module-checked' : '']"
        v-for="mod in mod_api_list"
        :key="mod.module_id"
      >
        <div class="mod-name" @click="module_name_click(mod.module_id)">
          <!-- 删除按钮 -->
          <div
            class="module-delete-btn"
            @click="deleteModule(mod.module_id, mod.module_name, false)"
          >
            <span></span>
          </div>
          <span>{{ mod.module_name }}</span>
          <div class="icon"></div>
        </div>

        <!-- API 列表 -->
        <div class="api-list">
          <div
            :class="['api-item', current_api_id==api.api_id?'cur-api-checked':'']"
            v-for="api in mod.apis"
            :key="api.api_id"
            @click="current_api_id = api.api_id"
          >{{ api.api_name }}</div>
          <!-- 添加api -->
          <div :class="['add-api-container', adding_api?'adding':'']">
            <div class="input">
              <input
                type="text"
                @keyup.enter="addNewApi(mod.module_id)"
                maxlength="40"
                v-model="add_api_txt"
              />
            </div>
            <div class="add-api-btns">
              <div @click="adding_api=false;add_api_txt=''" class="left-btn">Cancel</div>
              <div class="mid"></div>
              <div
                class="right-btn"
                @click="addNewApi(mod.module_id)"
              >{{ adding_api ? 'Add' : 'new API' }}</div>
            </div>
          </div>

          <div v-if="mod.apis.length==0" class="api-empty">
            <div class="icon"></div>
            <span>No API Found</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 添加模块 -->
    <transition-group tag="div" class="add-module-container" name="add-mod">
      <div key="add-mod-form" v-if="adding_module" class="form-container">
        <input
          maxlength="16"
          @keyup.enter="addModule()"
          type="text"
          placeholder="Create Module ..."
          v-model="add_module_txt"
        />
        <div class="mod-btns">
          <div @click="adding_module=false;add_module_txt='';" class="cancel mod-btn">
            <div class="icon"></div>
            <span>取消</span>
          </div>
          <div class="confirm mod-btn" @click="addModule()">
            <div class="icon"></div>
            <span>添加</span>
          </div>
        </div>
      </div>
      <div key="add-mod-btn" @click="adding_module=true" v-else class="add-btn">
        <span></span>
        <span></span>
      </div>
    </transition-group>
  </div>
</template>

<script>
import global from "./global.vue";

export default {
  data() {
    return {
      mod_api_list: [],
      current_module: -1,
      adding_module: false,
      adding_api: false,
      add_api_txt: "",
      add_module_txt: "",

      add_module_lock: false, // 防止重复点击
      add_api_lock: false, // 防止重复点击
      module_delete_mode: false, // 删除模块模式

      current_api_id: -1 // 标记当前的api id
    };
  },
  methods: {
    // 加载api列表
    loadApis(cur_api_id) {
      console.log("LOADING APIS ...")
      this.$http
        .get(`${global.url_prefix}/write-api/api/retrive`, {
          params: {
            project_id: this.$parent.$route.params.project_id,
            module: 1
          },
          emulateJSON: true,
          credentials: true
        })
        .then(
          res => {
            //   console.log(res.body)
            if (res.body.status == 200) {
              this.mod_api_list = res.body.data;
              // 页面跳转
              this.routeToApi(cur_api_id);
            } else {
              console.log(res.body.msg);
              this.mod_api_list = [];
            }
          },
          () => console.log("获取api列表请求失败")
        );
    },

    // 模块名被点击时
    module_name_click(id) {
      if (this.current_module != id) {
        this.current_module = id;
        this.adding_api = false;
        this.add_api_txt = "";
      } else {
        this.current_module = -1;
      }
    },

    // 添加新的 api
    addNewApi(module_id) {
      if (this.adding_api) {
        // 请求添加 api
        if (this.add_api_lock) return;

        let api = this.add_api_txt;
        if (api.length == 0) {
          this.$parent.$parent.$parent.showToast({
            icon: "!.png",
            msg: "请填写api名称",
            time: 2000
          });
          return;
        }
        this.add_api_lock = true;
        // 发起请求来 添加 api
        this.$http
          .post(
            `${global.url_prefix}/write-api/api/create`,
            {
              module_id: module_id,
              api_name: api
            },
            {
              emulateJSON: true,
              credentials: true
            }
          )
          .then(
            res => {
              if (res.body.status == 200) {
                this.$parent.$parent.$parent.showToast({
                  icon: "yes_grey.png",
                  msg: "创建成功",
                  time: 2000
                });
                // console.log(res.body)
                this.loadApis(res.body.data.api_id);
                this.add_api_txt = "";
                this.adding_api = false;
              } else {
                this.$parent.$parent.$parent.showToast({
                  icon: "!.png",
                  msg: `创建失败， 错误代码${res.body.status}`,
                  time: 2000
                });
              }
            },
            () => {
              this.$parent.$parent.$parent.showToast({
                icon: "!.png",
                msg: `请求发起失败`,
                time: 2000
              });
            }
          );

        this.add_api_lock = false;
      } else {
        this.adding_api = true;
      }
    },

    // 添加新模块
    addModule() {
      if (this.add_module_lock) return;
      // 1. 上锁， 以防止重复点击导致重复请求
      this.add_module_lock = true;
      let project_id = this.$parent.$route.params.project_id;
      let module_name = this.add_module_txt;
      // 2. 字段校验
      if (this.add_module_txt.length == 0 || this.add_module_txt.length > 16) {
        this.$parent.$parent.$parent.showToast({
          icon: "!.png",
          msg: "请完善表单",
          time: 2000
        });
      } else {
        // 3. 执行请求，
        this.$http
          .post(
            `${global.url_prefix}/write-api/module/create`,
            {
              project_id: project_id,
              module_name: module_name
            },
            {
              emulateJSON: true,
              credentials: true
            }
          )
          .then(
            res => {
              if (res.body.status == 200) {
                this.$parent.$parent.$parent.showToast({
                  icon: "yes_grey.png",
                  msg: "成功创建模块",
                  time: 2000
                });
                this.add_module_txt = "";
                this.adding_module = false;
                this.loadApis(this.current_api_id);
              } else {
                this.$parent.$parent.$parent.showToast({
                  icon: "!.png",
                  msg: res.body.msg,
                  time: 2000
                });
              }
            },
            () => console.log("添加模块时请求失败")
          );
      }
      // 释放锁
      this.add_module_lock = false;
    },

    // 删除模块
    deleteModule(module_id, module_name, confirm) {
      if (confirm) {
        // do delete
        // console.log("bingo")
        this.$http
          .get(`${global.url_prefix}/write-api/module/delete`, {
            params: {
              module_id
            },
            emulateJSON: true,
            credentials: true
          })
          .then(
            res => {
              if (res.body.status == 200) {
                this.$parent.$parent.$parent.showToast({
                  icon: "yes_grey.png",
                  msg: `已删除`,
                  time: 2000
                });
                this.loadApis();
              } else {
                this.$parent.$parent.$parent.showToast({
                  icon: "!.png",
                  msg: `删除失败，错误代码${res.body.status}`,
                  time: 2000
                });
              }
            },
            () => {
              this.$parent.$parent.$parent.showToast({
                icon: "!.png",
                msg: "请求失败",
                time: 2000
              });
            }
          );
      } else {
        this.$parent.$parent.$parent.$parent.showConfirm(
          {
            title: `确认删除模块吗`,
            content: `将永久删除模块"${module_name}"的所有数据, 不可恢复`,
            module_id: module_id
          },
          2
        );
      }
    },

    routeToApi(cur_api_id) {
      
      if (cur_api_id < 0) {
        //
        if (
          this.mod_api_list.length == 0 ||
          this.mod_api_list[0].apis.length == 0
        )
          return;
          this.current_api_id = this.mod_api_list[0].apis[0].api_id;
      } else if(this.$parent.$route.params.project_id != undefined){
         this.$router
          .push(
            `/project/${this.$parent.$route.params.project_id}/${cur_api_id}`
          )
          .catch(err => {
            // console.log(`/project/${this.$parent.$route.params.project_id}/${cur_api_id}`);
          });
          this.current_api_id = cur_api_id;
      }
    }
  },
  mounted() {
    this.loadApis(-1);
  },
  watch: {
    current_api_id(val, old_val) {
      this.routeToApi(val);
    }
  },
};
</script>

<style lang="scss" scoped>
// 切换动画
.add-mod-enter-to,
.add-mod-leave {
  opacity: 1;
  transform: translateY(0%);
}
.add-mod-enter,
.add-mod-leave-to {
  opacity: 0;
  transform: translateY(100%);
}
.add-mod-enter-active,
.add-mod-leave-active {
  transition: all 0.2s ease-in-out;
  position: absolute;
}

* {
  transition: all 0.3s ease-in-out;
}
.root-container {
  width: 100%;
  background: #fff;
  padding-top: 10px;
  // height: 300px;
  border-radius: 5px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column !important;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
  overflow: hidden;

  .search {
    padding: 0 10px;
    width: 100%;
    flex-shrink: 0;
    input {
      width: 100%;
      height: 30px;
      border-radius: 15px;
      background-color: #f6f6f6;
      border: none;
      padding: 0 15px;
      font-size: 1.4rem;
      font-weight: 700;
      color: #505050;
    }
    input:focus {
      outline: none;
    }
  }

  .module-empty {
    flex-shrink: 0;
    width: 100%;
    font-weight: 700;
    margin-top: 20px;
    font-size: 1.4rem;
    color: #bfbfbf;
    padding-left: 10px;
    border-left: 5px solid rgb(27, 28, 76);
  }

  // 模块列表样式
  .module-list {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;

    .module-item {
      width: 100%;
      border-bottom: 1px solid #f0f0f0;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      position: relative;

      div.mod-name {
        display: block;
        width: 100%;
        overflow: hidden; //超出一行文字自动隐藏
        text-overflow: ellipsis; //文字隐藏后添加省略号
        white-space: nowrap; //强制不换行
        padding: 0 20px;
        height: 48px;
        line-height: 48px;
        position: relative;
        transition: all 0.2s ease-in-out;
        font-weight: 600;

        .icon {
          width: 48px;
          height: 48px;
          position: absolute;
          background-image: url(../images/icon/down_arrow_grey.png);
          background-size: 40%;
          background-position: center;
          background-repeat: no-repeat;
          right: 0;
          top: 0;
        }
      }
      div.mod-name:hover {
        background-color: #f1efee;
      }

      // api 列表样式
      .api-list {
        display: flex;
        flex-direction: column;
        background-color: #fafafa;
        margin: 0px !important;

        width: 100%;
        .api-empty {
          width: 100%;
          padding: 0 20px;
          height: 40px;
          line-height: 40px;
          height: 0;
          overflow: hidden;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;

          .icon {
            width: 20px;
            height: 20px;
            background-image: url(../images/icon/warn_3f.png);
            background-size: 100%;
            background-position: center;
            background-repeat: no-repeat;
            margin-right: 10px;
          }
          span {
            font-weight: bold;
            color: #dadada;
          }
        }
        .api-item {
          width: 100%;
          padding: 0 20px;
          height: 40px;
          line-height: 40px;
          height: 0;
          overflow: hidden;
          font-weight: 600;
          color: #aaaaaa;
          cursor: pointer;
          border-left: 5px solid #1a1b4c00;
        }
        .api-item:hover {
          background-color: rgb(27, 28, 76);
          color: #fff;
          font-weight: 700;
          padding-left: 30px;
        }
        .cur-api-checked {
          background-color: #f9f9f9;
          color: #1a1b4c;
          border-left: 5px solid #1a1b4c;
          padding-left: 30px;
           font-weight: bold;
        }.cur-api-checked:hover {
        }

        // 添加 api 样式
        .add-api-container {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;

          .input {
            // height: 40px;
            height: 0px;
            width: 100%;
            overflow: hidden;

            input {
              width: 90%;
              height: 30px;
              margin: 5px 5%;
              background-color: #fff;
              border: 1px solid #eeeeee;
              border-radius: 6px;
              padding: 0 7px;
              font-weight: 600;
              color: #1a008d;
            }
            input:focus {
              outline: none;
              border: 1px solid #1f1fb3;
              box-shadow: 0px 0px 10px rgba(73, 17, 177, 0.267);
            }
          }

          .add-api-btns {
            display: flex;
            flex-direction: row;
            align-items: center;
            width: 100%;
            padding: 0 5%;
            height: 0px;
            overflow: hidden;

            .left-btn {
              width: 0;
              cursor: pointer;
              // width: 50px;
              text-align: center;
              overflow: hidden;
              height: 30px;
              font-size: 0.9rem;
              line-height: 30px;
              border-radius: 5px;
              background-color: #cd6155;
              color: #fff;
              flex-shrink: 0;
            }
            .left-btn:hover {
              background-color: #b03a2e;
              color: #fff;
            }
            .mid {
              flex-grow: 1;
            }
            .right-btn {
              cursor: pointer;
              // width: 70px;
              width: 100%;
              text-align: center;
              overflow: hidden;
              height: 30px;
              font-size: 0.9rem;
              line-height: 30px;
              background-color: #7dcea0;
              border-radius: 5px;
              color: #fff;
              flex-shrink: 0;
            }
            .right-btn:hover {
              background-color: #1d9c83;
            }
          }
        }
      }
    }
    .module-item:nth-last-child(1) {
      border: none;
    }
    .module-checked {
      border-bottom: 1px solid rgba(0, 0, 0, 0);
      div.mod-name {
        box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.04);
        .icon {
          transform: rotate(180deg);
        }
      }
      .api-list {
        .api-item,
        .api-empty {
          height: 40px;
        }
        .api-empty {
          .icon {
            animation: apiEmptyShake 0.8s ease 0.3s 1 normal !important;
          }
          @keyframes apiEmptyShake {
            0% {
              transform: translateX(0px);
            }
            10% {
              transform: translateX(-10px);
            }
            20% {
              transform: translateX(10px);
            }
            30% {
              transform: translateX(-8px);
            }
            40% {
              transform: translateX(8px);
            }
            50% {
              transform: translateX(-6px);
            }
            60% {
              transform: translateX(6px);
            }
            70% {
              transform: translateX(-4px);
            }
            80% {
              transform: translateX(4px);
            }
            90% {
              transform: translateX(-2px);
            }
            100% {
              transform: translateX(0px);
            }
          }
        }

        .add-api-container {
          .add-api-btns {
            height: 40px;
          }

          .adding {
            .left-btn {
              width: 50px;
            }
          }
        }
        .adding {
          .input {
            height: 40px;
          }
          .left-btn {
            width: 50px !important;
          }
          .right-btn {
            width: 60px !important;
          }
        }
      }
    }
    .module-checked + .module-item {
      box-shadow: 0px -5px 5px rgba(0, 0, 0, 0.04);
    }
  }

  .add-module-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    // background: #45b39d;
    height: 100px;

    .add-btn {
      background-color: #f3f3f3;
      width: 80%;
      height: 32px;
      border-radius: 5px;
      box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.07);
      position: relative;
      cursor: pointer;

      span {
        position: absolute;
        display: inline-block;
        width: 20px;
        height: 6px;
        background-color: #dfdfdf;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        transition: all 0.6s ease-in-out;
        border-radius: 1px;
      }
      span:nth-child(1) {
        transform: translate(-50%, -50%) rotate(90deg);
      }
    }
    .add-btn:hover {
      background-color: #f3f3f3;
      span:nth-child(1) {
        transform: translate(-50%, -50%) rotate(180deg);
      }
      span:nth-child(2) {
        transform: translate(-50%, -50%) rotate(90deg);
      }
    }

    .form-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding-bottom: 10px;
      width: 100%;

      input {
        width: 90%;
        height: 36px;
        background-color: #f6f6f6;
        border-radius: 4px;
        border: none;
        padding: 0 10px;
        font-weight: 600;
        color: rgb(7, 9, 116);
      }
      input:focus {
        outline: none;
      }
      .mod-btns {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 90%;
        margin-top: 6px;

        .mod-btn {
          width: 60px;
          height: 30px;
          line-height: 30px;
          border-radius: 4px;
          color: #fff;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          font-size: 1rem;

          span {
            text-align: center;
          }
          .icon {
            width: 20px;
            height: 20px;
            background-position: center;
            background-repeat: no-repeat;
          }
        }
        .cancel {
          background-color: #cd6155;
          .icon {
            background-image: url(../images/icon/cancel_white.png);
            background-size: 60%;
          }
        }
        .cancel:hover {
          background-color: #aa473c;
          box-shadow: 0 10px 20px rgba(170, 71, 60, 0.2);
          .icon {
            transform: rotate(90deg);
          }
        }
        .confirm {
          background-color: #45b39d;
          .icon {
            background-image: url(../images/icon/yes_bold.png);
            background-size: 60%;
          }
        }
        .confirm:hover {
          background-color: #1d9c83;
          box-shadow: 0 10px 20px rgba(29, 156, 131, 0.25);
        }
      }
    }
  }
}

.module-list {
  .module-delete-btn {
    position: absolute !important;
    background-color: #cd6155;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    left: -100px;
    top: 14px;
    z-index: 9999999;
    transition: all 0.6s ease-in-out;

    span {
      display: block;
      width: 12px;
      height: 3px;
      background-color: #fff;
      margin-left: 50%;
      margin-top: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
.module-delete-mode {
  .module-delete-btn {
    left: 10px;
    animation: shake 0.2s ease 0s infinite;
    transform-origin: 100% 100%;
    cursor: pointer;
  }
  @keyframes shake {
    0% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(-5deg);
    }
    50% {
      transform: rotate(0deg);
    }
    75% {
      transform: rotate(5deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }

  .mod-name {
    padding-left: 36px !important;
  }
}

// 删除模块
.delete-control-contanier {
  width: 100%;
  padding: 0 10px 0 20px;
  height: 40px;
  // background-color: #1a008d;
  margin-bottom: 10px;
  // width: 80%;
  // margin-left: 10%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  .title {
    font-size: 2rem;
    font-weight: 100;
    opacity: 1;
  }
  @media screen and (max-width: 800px) {
    .title {
      opacity: 0;
    }
  }

  .del-box {
    width: 30px;
    height: 30px;
    border-radius: 15px;
    overflow: hidden;
    // background-color: yellow;
    position: relative;
    cursor: pointer;

    .icon {
      top: 3px;
      right: 3px;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background-image: url(../images/icon/delete_grey.png);
      background-size: 80%;
      background-position: center;
      background-repeat: no-repeat;
      position: absolute;
    }
    .txt {
      width: 0;
      height: 30px;
      line-height: 30px;
      position: absolute;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 1rem;
      text-align: right;
      color: #fff;
      right: 34px;
    }
  }
  .del-box:hover {
    background-color: #cd6155;
    width: 70px;
    .icon {
      background-color: #fff;
      background-size: 66%;
      background-image: url(../images/icon/delete_red.png);
    }
    .txt {
      width: 58px;
      // background-color: #1d9c83;
    }
  }

  .del-box.module-delete-mode {
    background-color: #cd6155;
    width: 70px;
    .icon {
      right: 43px;
      background-color: #fff;
      background-size: 66%;
      background-image: url(../images/icon/delete_red.png);
    }
    .txt {
      width: 58px;
      right: 14px;
      // background-color: #1d9c83;
    }
  }
}
</style>