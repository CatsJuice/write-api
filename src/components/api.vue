<template>
  <transition-group name="ep">
    <div v-if="edit_project" key="edit_pro_mode" class="edit-project-con">
      <table>
        <tr>
          <td id="pn">
            <span>项目名称</span>
          </td>
        </tr>
        <tr>
          <td id="pn-in">
            <input type="text" v-model="pn_txt" />
            <div
              :class="['check-words', pn_had_input>pn_max?'check-words-err':'']"
            >{{ pn_had_input }} / {{ pn_max }}</div>
          </td>
        </tr>
        <tr>
          <td id="pp">
            <span>项目地址前缀:</span>
            <input type="text" v-model="pp_txt" />
            <div
              :class="['check-words', pp_had_input>pp_max?'check-words-err':'']"
            >{{ pp_had_input }} / {{ pp_max }}</div>
          </td>
        </tr>
        <tr>
          <td id="pd">
            <span>项目描述:</span>
          </td>
        </tr>
        <tr>
          <td id="pd-in">
            <textarea name id cols="30" rows="10" v-model="pd_txt"></textarea>
            <div
              :class="['check-words', pd_had_input>pd_max?'check-words-err':'']"
            >{{ pd_had_input }} / {{ pd_max }}</div>
          </td>
        </tr>
      </table>
    </div>

    <div v-else-if="create_new_api" key="create_new_api" class="add-api-con">
      <span id="api-name">API Name</span>
      <div class="rel-el">
        <input type="text" id="api-name-input" v-model="an_txt" />
        <div
          :class="['add-api-count', an_txt.length > max_an ? 'in-err' : '']"
        >{{an_txt.length}} / {{max_an}}</div>
      </div>

      <span id="url">接口地址</span>
      <div class="row">
        <div class="prefix">{{ latest_prefix }}</div>
        <div class="url rel-el">
          <input type="text" v-model="au_txt" placeholder="url address" />
          <div
            :class="['add-api-count', au_txt.length > max_au ? 'in-err' : '']"
          >{{au_txt.length}} / {{max_au}}</div>
        </div>
      </div>

      <div class="col">
        <span id="url">接口简介</span>
        <div class="rel-el">
          <textarea name cols="30" rows="10" v-model="ai_txt"></textarea>
          <div
            :class="['add-api-count', ai_txt.length > max_ai ? 'in-err' : '']"
          >{{ai_txt.length}} / {{max_ai}}</div>
        </div>
      </div>
    </div>

    <div class="root-container" v-else key="edit_api_mode">
      <!-- 左侧侧边栏 -->
      <input type="checkbox" />

      <div class="left">
        <api-list></api-list>
      </div>
      <div class="switch-left-btn">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <!-- 右侧content -->
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </transition-group>
</template>

<script>
import api_list from "./api_list.vue";
import global from "./global.vue";

export default {
  data() {
    return {
      edit_project: false,
      create_new_api: false,

      // 编辑基本信息
      pn_txt: "",
      pp_txt: "http://",
      pd_txt: "",
      pn_max: 40,
      pp_max: 50,
      pd_max: 255,

      // 新建api 表单
      an_txt: "",
      au_txt: "",
      ai_txt: "",

      max_an: 40,
      max_ai: 255,

      latest_prefix: "" // 保存最新的前缀
    };
  },
  components: {
    "api-list": api_list
  },

  methods: {
    getProjectInfo() {
      // console.log(this.$route.params.project_id)
      this.$http
        .get(global.url_prefix + "/write-api/project/retrive", {
          params: {
            project_id: this.$route.params.project_id
          },
          emulateJSON: true,
          credentials: true
        })
        .then(
          res => {
            // console.log(res.body);
            if (res.body.status == 200) {
              this.pn_txt = res.body.data.project_name;
              this.pp_txt = res.body.data.project_prefix;
              this.pd_txt = res.body.data.project_description;
              this.latest_prefix = res.body.data.project_prefix;
            }
          },
          () => console.log("请求项目基本信息出错")
        );
    },
    updateProjectInfo() {
      let data = {
        pp: this.pp_txt,
        pn: this.pn_txt,
        pd: this.pd_txt,
        id: this.$route.params.project_id
      };
      this.$http
        .post(global.url_prefix + "/write-api/project/update", data, {
          emulateJSON: true,
          credentials: true
        })
        .then(
          res => {
            if (res.body.status == 200) {
              this.$parent.showToast({
                icon: "yes_grey.png",
                msg: "项目信息更新成功",
                time: 2000
              });
              this.latest_prefix = this.pp_txt;
            } else {
              this.$parent.showToast({
                icon: "!.png",
                msg: "项目信息更新失败" + res.body.msg,
                time: 2000
              });
            }
            this.$parent.$refs.bar_btns.cancelEdit();
          },
          () => console.log("更新项目基本信息失败")
        );
    },

    creatAapi() {
      // 1. 校验是否为空
      if (
        this.an_txt.length == 0 ||
        this.au_txt.length == 0 ||
        this.ai_txt.length == 0
      ) {
        this.$parent.showToast({
          icon: "!.png",
          msg: "请先完善表单",
          time: 2000
        });
        return;
      }

      // 2. 校验是否超出长度
      if (
        this.an_txt.length > this.max_an ||
        this.au_txt.length > this.max_au ||
        this.ai_txt.length > this.max_ai
      ) {
        this.$parent.showToast({
          icon: "!.png",
          msg: "请勿超出字数限制",
          time: 2000
        });
        return;
      }

      let data = {
        an: this.an_txt,
        au: this.au_txt,
        ai: this.ai_txt,
        project_id: this.$route.params.project_id
      }
      console.log(data)
      // 3. 执行新建
      this.$http.post(global.url_prefix + '/write-api/api/create', data, {
        emulateJSON: true,
        credentials: true
      }).then(res => {
        if (res.body.status == 200) {
          this.$parent.showToast({
            icon: 'yes_grey.png',
            msg: '新建API成功',
            time: 2000
          });
          this.$parent.$refs.bar_btns.cancelEdit();
        } else {
          this.$parent.showToast({
            icon: '!.png',
            msg: '新建失败，' + res.body.msg,
            time: 2000
          });
        }
      }, ()=>{});
    }
  },
  computed: {
    pn_had_input() {
      return this.pn_txt.length;
    },
    pp_had_input() {
      return this.pp_txt.length;
    },
    pd_had_input() {
      return this.pd_txt.length;
    },
    max_au() {
      return 255 - this.latest_prefix.length;
    }
  },

  mounted() {
    this.getProjectInfo();
  }
};
</script>

<style lang="scss" scoped>
.ep-enter {
  opacity: 0;
  transform: translateX(-100%);
}
.ep-enter-to,
.ep-leave {
  opacity: 1;
  transform: translateX(0%);
}
.ep-leave-to {
  opacity: 0;
  position: absolute;
  transform: translateX(100%);
}
.ep-enter-active,
.ep-leave-active {
  transition: all 0.8s ease-in-out;
}

.root-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  overflow-x: hidden;

  input[type="checkbox"] {
    position: fixed;
    left: 10px;
    top: 10px;
    width: 40px;
    height: 40px;
    z-index: 10;
    opacity: 0;
  }
  input[type="checkbox"]:checked + .left {
    left: 0px;
  }
  input[type="checkbox"]:checked ~ .switch-left-btn {
    span:nth-child(1) {
      top: 35%;
      transform: translate(-100%, 0%) rotate(-45deg);
      width: 14px;
    }
    span:nth-child(2) {
      top: 50%;
      width: 22px;
    }
    span:nth-child(3) {
      top: 65%;
      transform: translate(-100%, -100%) rotate(45deg);
      width: 14px;
    }
  }

  .switch-left-btn {
    position: fixed;
    width: 40px;
    position: fixed;
    left: 10px;
    top: 10px;
    width: 40px;
    height: 40px;
    z-index: 9;
    // background-color: rgba(211, 194, 46, 0.945);

    span {
      display: inline-block;
      width: 20px;
      height: 0;
      border-bottom: 2px solid;
      border-color: #000;
      position: absolute;
      left: 50%;
      // top: 50%;
      transform: translate(-50%, -50%);
      transition: all 0.3s ease-in-out;
    }
    span:nth-child(1) {
      top: 35%;
    }
    span:nth-child(2) {
      top: 50%;
    }
    span:nth-child(3) {
      top: 65%;
    }
  }

  .left {
    height: 500px;
    width: 180px;
    // background-color: rgb(0, 150, 105);
    // padding: 20px 5px;
    // padding-top: 60px;
    flex-shrink: 0;
    left: -200px;
    transition: all 0.5s ease-in-out;
    z-index: 8;
  }
  @media screen and (max-width: 600px) {
    //   移动设备
    .left {
      position: fixed;
    }
    input[type="checkbox"],
    .switch-left-btn {
      display: block;
    }
  }
  @media screen and (min-width: 600px) {
    input[type="checkbox"],
    .switch-left-btn {
      display: none;
    }
    .left {
      margin-right: 20px;
    }
  }
  .content {
    flex-shrink: 0;
    flex-grow: 1;
    // background-color: rgb(151, 52, 52);
    height: 500px;
  }
}

.edit-project-con {
  width: 100%;
  padding: 20px;
  // height: 100px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

  table {
    // border: 1px solid #f6f6f6;
    border-radius: 5px;
    width: 90%;
    margin: 20px auto;
  }
  input,
  textarea {
    padding: 0 10px;
    width: 100%;
    border: none;
    border-radius: 5px;
    height: 100%;
    background-color: #eeeeee;
    transition: all 0.2s ease-in-out;
  }
  input:focus,
  textarea:focus {
    outline: none;
    background-color: #eaeaea;
  }
  textarea {
    padding: 10px;
  }
  td {
    padding: 10px;
    position: relative;
  }
  tr:nth-child(2) {
    height: 70px;
    display: block;
  }
  tr:nth-child(3) {
    height: 60px;
    display: block;
    // background: yellow;
  }

  .check-words {
    position: absolute;
    right: 20px;
    bottom: 20px;
    font-size: 1.1rem;
    font-weight: bold;
    color: #888888;
  }
  #pn {
    font-size: 3rem;
    font-family: "Microsofy Yahei";
    letter-spacing: 0px;
    font-weight: bold;
    span {
      display: inline;
      border-left: 6px solid #1b1c4c;
      padding-left: 10px;
    }
  }
  #pn-in {
    display: block;
    width: 100%;
    height: 100%;

    input {
      font-size: 2rem;
      font-weight: bold;
    }
    .check-words {
      bottom: 23px;
    }
  }

  #pp {
    font-size: 1.5rem;
    font-weight: bold;
    width: auto;
    height: 100%;
    //   background-color: #1b1c4c;
    display: flex;
    align-items: center;

    span {
      width: 140px;
      padding-left: 10px;
      border-left: 5px solid #1b1c4c;
      flex-shrink: 0;
    }
    input {
      flex-grow: 1;
    }
  }

  #pd {
    font-size: 1.5rem;
    font-weight: bold;

    span {
      width: 140px;
      padding-left: 10px;
      border-left: 5px solid #1b1c4c;
      flex-shrink: 0;
    }
  }
  #pd-in {
    textarea {
      width: 100%;
      height: 200px;
      resize: none;
    }
  }
  .check-words-err {
    color: #e74c3c;
  }
}

.add-api-con {
  width: 100%;
  padding: 20px;
  // height: 100px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 30px 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

  input,
  textarea {
    background-color: #f0f0f0;
    border: none;
    border-radius: 5px;
    margin: 20px 0;
    border: none;
    border-radius: 5px;
    padding: 0 10px;
    resize: none;
  }
  input:focus,
  textarea:focus {
    outline: none;
  }

  span#api-name {
    font-size: 3rem;
    line-height: 30px;
    height: 30px;
    font-weight: 800;

    padding-left: 20px;
    border-left: 10px solid rgb(27, 28, 76);
  }

  #api-name-input {
    width: 100%;
    height: 40px;
    font-size: 2rem;
    font-weight: 700;
    color: #1b1c4c;
  }
  #api-name-input:focus {
    outline: none;
  }

  #url {
    margin-top: 20px;
    font-size: 2rem;
    font-weight: bold;
    padding-left: 10px;
    border-left: 8px solid rgb(27, 28, 76);
    line-height: 20px;
  }
  .row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    margin: 0 !important;

    .prefix {
      padding: 0 10px;
      background-color: #f0f0f0;
      border-radius: 5px;
      height: 40px;
      line-height: 40px;
      color: #757575;
      font-size: 1.5rem;
      font-weight: 700;
      flex-shrink: 0;
      flex-grow: 0;
    }
    .url {
      margin-left: 10px;
      flex-grow: 1;
      input {
        width: 100%;
        height: 40px;
        font-size: 1.6rem;
        font-weight: 600;
        color: #414141;
      }
    }
  }

  .col {
    display: flex;
    flex-direction: column;
    width: 100%;

    textarea {
      padding: 20px;
      width: 100%;
      height: 200px;
      font-size: 1.6rem;
      font-weight: 500;
    }
  }

  .rel-el {
    position: relative;
    width: 100%;

    .add-api-count {
      position: absolute;
      right: 0;
      bottom: 0;
      font-size: 1rem;
      font-weight: 700;
      color: #414141;
    }
  }
}
.in-err {
  color: #e74c3c !important;
  animation: shake 1s ease 0s 1 normal;
}
@keyframes shake {
  0% {
    right: 0;
  }
  10% {
    right: 10px;
  }
  20% {
    right: -10px;
  }
  30% {
    right: 8px;
  }
  40% {
    right: -8px;
  }
  50% {
    right: 6px;
  }
  60% {
    right: -6px;
  }
  70% {
    right: 4px;
  }
  80% {
    right: -4px;
  }
  90% {
    right: 2px;
  }
  100% {
    right: 0;
  }
}
</style>