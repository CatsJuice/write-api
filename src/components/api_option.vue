<template>
  <div :class="['api-option-root-container', show_input_err?'SHOW-INPUT-ERR':'']">
    <!-- 当前API id: {{ current_api_id }} -->
    <div class="infact-display-area">
      <!-- <router-view></router-view> -->

      <div :class="['btn-bar', editting_mode?'editting-mod-btn':'']">
        <div class="center">Edit API</div>
        <div class="right" :style="{right: editting_mode?0:'24.6%'}" @click="deleteAPI(false)">
          <span>删除接口</span>
          <div class="icon"></div>
        </div>

        <div :class="['submit-edit',submit_lock?'SUBMITING':'']" @click="submitForm()">
          <div class="icon"></div>
          <span>{{submit_lock?'正在提交':'确定修改'}}</span>
        </div>
        <div class="cancel-edit" @click="cancelEdit()">
          <div class="icon"></div>
          <span>取消修改</span>
        </div>
      </div>

      <!-- 外部盒子 -->
      <div class="outer-box">
        <div id="end-icon"></div>

        <!-- 基本信息容器 -->
        <div class="form-block base-info-container">
          <div class="left-line-icon"></div>
          <input type="checkbox" />
          <div class="title-bar">
            <div class="left">
              <span>Base Info</span>
              <span>Manage The Base Info Of The Api</span>
            </div>
            <div class="right"></div>
          </div>
          <hr />
          <div class="content">
            <!-- API 名称 -->
            <span class="item-label">API Name</span>
            <div class="api-name-in">
              <!-- <input type="text" maxlength="255" v-model="" /> -->
              <input
                :class="[api_name_in.length>0?'':'INPUT-ERR']"
                type="text"
                maxlength="255"
                v-model="api_name_in"
                @change="dataChange('base', -1, 'api_name', $event) "
              />
            </div>

            <!-- API地址 -->
            <div class="item-label">API Address</div>
            <div class="url">
              <span>http://api.catsjuice.cn/write-api/</span>
              <span>+</span>
              <input
                type="text"
                maxlength="200"
                v-model="api_address_in"
                :class="[api_address_in.length>0?'':'INPUT-ERR']"
                @change="dataChange('base', -1, 'api_address', $event) "
              />
            </div>

            <!-- API 描述 -->
            <div class="item-label">API Description</div>
            <div class="api-description">
              <span
                :class="['ad-word-count',api_descpiption.length>255?'word-count-err':'']"
              >{{api_descpiption.length}} / 255</span>
              <textarea
                maxlength="255"
                v-model="api_descpiption"
                :class="[api_descpiption.length>0?'':'INPUT-ERR']"
                @change="dataChange('base', -1, 'api_introduction', $event) "
              ></textarea>
            </div>
          </div>
        </div>

        <!-- 传参容器 -->
        <div class="form-block param-send-container">
          <div class="left-line-icon"></div>

          <input type="checkbox" />
          <div class="title-bar">
            <div class="left">
              <span>Request Params</span>
              <span>Configure The Params That Should Be Posted</span>
            </div>
            <div class="right"></div>
          </div>
          <hr />
          <div class="content" :style="{height: request_height+'px'}">
            <table>
              <thead>
                <tr>
                  <th>参数名</th>
                  <th>说明</th>

                  <th>例子</th>
                  <th>数据类型</th>
                  <th>是否必须</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in api_info.request" :key="row.param_id">
                  <td>
                    <input
                      type="text"
                      :class="[row.param_name.length>0?'':'INPUT-ERR']"
                      @change="dataChange('request',row.param_id, 'param_name', $event)"
                      :value="row.param_name"
                      placeholder="param name"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      :class="[row.param_description.length>0?'':'INPUT-ERR']"
                      @change="dataChange('request',row.param_id, 'param_description', $event)"
                      :value="row.param_description"
                      placeholder="param introduction"
                    />
                  </td>

                  <td>
                    <input
                      type="text"
                      :class="[row.param_example.length>0?'':'INPUT-ERR']"
                      @change="dataChange('request',row.param_id, 'param_example', $event)"
                      :value="row.param_example"
                      placeholder="example"
                    />
                  </td>
                  <td>
                    <select
                      @change="dataChange('request',row.param_id, 'param_data_type', $event)"
                      :value="row.param_data_type"
                    >
                      <option value="1">string</option>
                      <option value="2">int</option>
                      <option value="3">boolean</option>
                    </select>
                  </td>
                  <td>
                    <div class="ckbox-con">
                      <input
                        type="checkbox"
                        @change="dataChange('request',row.param_id, 'is_necessary', $event)"
                        :checked="row.is_necessary==1?true:false"
                      />
                      <div></div>
                    </div>
                  </td>
                  <td>
                    <div class="del-icon" @click="deleteParam(row.param_id)">删除</div>
                  </td>
                </tr>

                <tr>
                  <td id="add-param-btn" colspan="6">
                    <div class="add-btn" @click="addParam('request')">&nbsp;&nbsp;添加参数</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- 接受参数容器 -->
        <div class="form-block param-get-container">
          <div class="left-line-icon"></div>
          <input type="checkbox" />
          <div class="title-bar">
            <div class="left">
              <span>Response Params</span>
              <span>Configure The Params To Feedback</span>
            </div>
            <div class="right"></div>
          </div>

          <hr />
          <div class="content" :style="{height: response_height+'px'}">
            <table>
              <thead>
                <tr>
                  <th>参数名</th>
                  <th>说明</th>

                  <th>例子</th>
                  <th>数据类型</th>
                  <th>是否必须</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in api_info.response" :key="row.param_id">
                  <td>
                    <input
                      type="text"
                      :class="[row.param_name.length>0?'':'INPUT-ERR']"
                      @change="dataChange('response',row.param_id, 'param_name', $event)"
                      :value="row.param_name"
                      placeholder="param name"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      :class="[row.param_example.length>0?'':'INPUT-ERR']"
                      @change="dataChange('response',row.param_id, 'param_description', $event)"
                      :value="row.param_example"
                      placeholder="param introduction"
                    />
                  </td>

                  <td>
                    <input
                      type="text"
                      :class="[row.param_example.length>0?'':'INPUT-ERR']"
                      @change="dataChange('response',row.param_id, 'param_example', $event)"
                      :value="row.param_example"
                      placeholder="example"
                    />
                  </td>
                  <td>
                    <select
                      @change="dataChange('response',row.param_id, 'param_data_type', $event)"
                      :value="row.param_data_type"
                    >
                      <option value="1">string</option>
                      <option value="2">int</option>
                      <option value="3">boolean</option>
                    </select>
                  </td>
                  <td>
                    <div class="ckbox-con">
                      <input
                        type="checkbox"
                        @change="dataChange('response',row.param_id, 'is_necessary', $event)"
                        :checked="row.is_necessary==1?true:false"
                      />
                      <div></div>
                    </div>
                  </td>
                  <td>
                    <div class="del-icon" @click="deleteParam(row.param_id)">删除</div>
                  </td>
                </tr>

                <tr>
                  <td id="add-param-btn" colspan="6">
                    <div class="add-btn" @click="addParam('response')">&nbsp;&nbsp;添加参数</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import global from "./global.vue";

export default {
  data() {
    return {
      api_info_old: {},
      api_info: {},

      // form
      api_name_in: "",
      api_address_in: "",
      api_descpiption: "",
      request_adding: false,
      editting_mode: false, // 编辑模式
      submit_lock: false,
      show_input_err: false,
      delete_param_ids: []
    };
  },
  mounted() {
    console.log("MOUNTED");
    if (JSON.stringify(this.api_info) == "{}") this.load_api_info();
  },
  methods: {
    // 删除api
    deleteAPI(confirm) {
      //   if (this.delete_api_lock) return;
      //   this.delete_api_lock = true;
      if (confirm) {
        // do delete
        console.log("DO DELETE");
        this.$http
          .get(`${global.url_prefix}/write-api/api/delete`, {
            params: {
              api_id: this.current_api_id
            },
            emulateJSON: true,
            credentials: true
          })
          .then(
            res => {
              if (res.body.status == 200) {
                this.$parent.$parent.$parent.showToast({
                  icon: "yes_grey.png",
                  msg: "已删除接口",
                  time: 2000
                });
              } else {
                this.$parent.$parent.$parent.showToast({
                  icon: "!.png",
                  msg: res.body.msg,
                  time: 3000
                });
              }
            },
            () => console.log("在删除接口时， 发起请求失败")
          );
        this.$parent.$parent.$refs.api_list.loadApis(-1);
      } else {
        let api_name = "";
        this.$parent.$parent.$parent.$parent.showConfirm(
          {
            title: "删除接口?",
            content: `确认删除接口"${api_name}"的所有内容吗， 这将不可恢复`
          },
          3
        );
      }
    },

    // 加载 api 的所有信息
    load_api_info(api_id) {
      if (!api_id) api_id = this.current_api_id;
      this.$http
        .get(`${global.url_prefix}/write-api/api/retrive/detail`, {
          params: {
            api_id: api_id
          },
          emulateJSON: true,
          credentials: true
        })
        .then(res => {
          if (res.body.status == 200) {
            console.log(res.body);
            this.api_info = res.body.data;
            this.api_info_old = JSON.parse(JSON.stringify(this.api_info));
            this.updateForm();
          } else {
            console.log("获取api详情时出错，错误信息:" + res.body.msg);
          }
        });
    },

    // 使用数据填充
    updateForm() {
      this.api_name_in = this.api_info.base.api_name || "";
      this.api_address_in = this.api_info.base.api_address || "";
      this.api_descpiption = this.api_info.base.api_introduction || "";
    },

    // 动态生成随机的id
    createTempId() {
      let lower = "abcdefghijklmopqrstuvwxyz";
      let upper = lower.toUpperCase();
      let letters = lower + upper;

      var length = 0;
      while (length < 5) {
        length = Math.random() * 10;
      }

      let res = "";
      for (let i = 0; i < length; i++) {
        res += letters[Math.floor(Math.random() * letters.length)];
      }
      return res;
    },

    // 添加参数
    addParam(name) {
      if (!this.editting_mode) this.editting_mode = true;
      this.api_info[name].push({
        api_id: this.current_api_id,
        is_necessary: 0,
        param_data_type: 1,
        param_description: "",
        param_example: "",
        param_id: this.createTempId(),
        param_name: "",
        param_type: name == "request" ? 0 : 1,
        project_id: null
      });
    },

    // 监听数据变化
    dataChange(form, id, name, event) {
      if (!this.editting_mode) this.editting_mode = true;
      if (form == "base") {
        this.api_info.base[name] = event.target.value;
        return;
      }

      // 请求参数表单
      this.api_info[form].forEach(item => {
        if (item.param_id == id) {
          if (name == "is_necessary") item[name] = event.target.checked ? 1 : 0;
          else item[name] = event.target.value;
        }
      });

      // console.log(this.api_info);
    },

    // 取消更改
    cancelEdit() {
      this.$parent.$parent.showLeftBar();
      this.api_info = JSON.parse(JSON.stringify(this.api_info_old));
      this.api_name_in = this.api_info_old.base.api_name;
      this.api_address_in = this.api_info_old.base.api_address;
      this.api_descpiption = this.api_info_old.base.api_introduction;
      this.editting_mode = false;
      // console.log(this.api_info_old);
    },

    deleteParam(id) {
      if (!this.editting_mode) this.editting_mode = true;
      this.api_info.request = this.api_info.request.filter(
        el => el.param_id != id
      );
      this.api_info.response = this.api_info.response.filter(
        el => el.param_id != id
      );

      this.delete_param_ids.push(id);
    },

    submitForm() {
      if (this.submit_lock) return;
      this.submit_lock = true;

      // 1. 查询是否有字段没有填写
      let err_base =
        this.api_info.base.api_name &&
        this.api_info.base.api_address &&
        this.api_info.base.api_introduction.length &&
        this.api_info.base.api_name.length > 0 &&
        this.api_info.base.api_address.length > 0 &&
        this.api_info.base.api_introduction.length > 0;
      err_base = !err_base;

      let err_request = this.api_info.request.some(el => {
        return (
          el.param_name.length == 0 ||
          el.param_description.length == 0 ||
          el.param_example.length == 0
        );
      });
      let err_response = this.api_info.response.some(el => {
        return (
          el.param_name.length == 0 ||
          el.param_description.length == 0 ||
          el.param_example.length == 0
        );
      });
      if (err_base || err_request || err_response) {
        this.submit_lock = false;
        this.show_input_err = true;
        this.$parent.$parent.$parent.showToast({
          icon: "!.png",
          msg: "请完善表单",
          time: 1300
        });
        setTimeout(() => (this.show_input_err = false), 1000);
        return;
      }
      // 2. 直接把新对象传递给后端
      // console.log(JSON.stringify(this.api_info));
      this.$http
        .post(
          `${global.url_prefix}/write-api/param/upload`,
          {
            data: JSON.stringify(this.api_info)
          },
          {
            emulateJSON: true,
            credentials: true
          }
        )
        .then(
          res => {
            if (res.body.status == 200) {
              this.submitDelete();
            } else {
              this.$parent.$parent.$parent.showToast({
                icon: "!.png",
                msg: res.body.msg,
                time: 2000
              });
              this.submit_lock = false;
            }
          },
          () => {
            this.submit_lock = false;
          }
        );
    },
    submitDelete() {
      let param_ids = this.delete_param_ids.filter(
        el => parseInt(el).toString() != "NaN"
      );
      let api_id = this.api_info.base.api_id;
      if (param_ids.length == 0) {
        this.$parent.$parent.$parent.showToast({
          icon: "yes_bold.png",
          msg: "数据更新成功",
          time: 2000
        });
        this.submit_lock = false;
        this.$parent.$parent.$refs.api_list.loadApis(api_id);
        this.load_api_info();
      }

      param_ids = param_ids.join("_");
      // console.log(param_ids);
      this.$http
        .get(`${global.url_prefix}/write-api/param/delete`, {
          params: {
            param_ids,
            api_id
          },
          emulateJSON: true,
          credentials: true
        })
        .then(res => {
          if (res.body.status == 200) {
            this.$parent.$parent.$parent.showToast({
              icon: "yes_bold.png",
              msg: "数据更新成功",
              time: 2000
            });
            this.submit_lock = false;
            this.$parent.$parent.$refs.api_list.loadApis(api_id);
            this.load_api_info();
          } else {
            this.$parent.$parent.$parent.showToast({
              icon: "!.png",
              msg: res.body.msg,
              time: 2000
            });
            this.submit_lock = false;
          }
        }, () => this.submit_lock = false );
    }
  },
  computed: {
    current_project_id() {
      return this.$parent.$parent.$route.params.project_id;
    },

    current_api_id() {
      return this.$route.params.api_id || -1;
    },

    request_height() {
      if (this.api_info.request) return 100 + this.api_info.request.length * 40;
      return 100;
    },
    response_height() {
      if (this.api_info.response)
        return 100 + this.api_info.response.length * 40;
      return 100;
    }
  },
  watch: {
    current_api_id(val, oldval) {
      this.load_api_info(val);
    },
    editting_mode(val) {
      if (val) this.$parent.$parent.hideLeftBar();
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  transition: all 0.3s ease-in-out;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.api-option-root-container {
  width: 100%;
  //   padding: 50px 0;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}
.infact-display-area {
  //   background-color: yellowgreen;
  margin-left: 50%;
  transform: translateX(-50%);
  @media screen and (max-width: 1200px) {
    width: 100%;
  }
  @media screen and (min-width: 1200px) {
    width: 860px;
  }

  // 头部按钮条
  .btn-bar {
    height: 60px;
    width: 200%;
    margin-left: -50%;
    background-color: #808b96;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    position: relative;

    .left {
    }
    .center {
      color: #fff;
      font-size: 1.8rem;
      font-weight: 700;
      letter-spacing: 1px;
      text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    }
    .submit-edit {
      transition: all 0.5s ease-in-out;
      position: absolute !important;
      right: 0%;
      margin-right: 10px;
      width: 100px;
      line-height: 40px;
      cursor: pointer;
      height: 40px;
      border-radius: 5px;
      background-color: #7dcea0;
      color: #ffffff;
      text-align: center;
      font-size: 1.2rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      .icon {
        width: 20px;
        height: 20px;
        background-image: url(../images/icon/yes_bold.png);
        background-size: 90%;
        background-repeat: no-repeat;
        background-position: 50%;
        margin-right: 8px;
        margin-top: -2px;
      }
    }
    .submit-edit:hover {
      background-color: #64b185;
    }
    .cancel-edit {
      transition: all 0.5s ease-in-out;
      position: absolute;
      left: 0%;
      margin-left: 10px;
      width: 100px;
      line-height: 40px;
      cursor: pointer;
      height: 40px;
      border-radius: 5px;
      background-color: #cd6155;
      color: #f3f3f3;
      text-align: center;
      font-size: 1.2rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      .icon {
        width: 20px;
        height: 20px;
        background-image: url(../images/icon/cancel_white.png);
        background-size: 90%;
        background-repeat: no-repeat;
        background-position: center;
        margin-right: 8px;
      }
    }
    .cancel-edit:hover {
      background-color: #994238;
    }
    .submit-edit {
      position: absolute;
    }
    .right {
      position: absolute;
      right: 24.6%;
      margin-right: 20px;
      display: flex;
      align-items: center;
      width: 34px;
      height: 34px;
      border-radius: 17px;
      cursor: pointer;
      justify-content: flex-end;
      padding: 0 2px;
      overflow: hidden;

      .icon {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-image: url(../images/icon/delete_white.png);
        background-size: 80%;
        background-repeat: no-repeat;
        background-position: 55% 50%;
        flex-shrink: 0;
      }
      span {
        color: #808b96;
        width: 80px;
        right: 0;
        margin-right: 10px;
        font-size: 1rem;
        font-weight: 600;
        position: absolute;
      }
    }
    .right:hover {
      width: 110px;
      background-color: #fff;
      .icon {
        background-color: #ec7063;
        background-size: 55%;
      }
      span {
        transition: all 0.1s ease-in-out 0.2;
      }
    }
  }
  .outer-box {
    padding: 10px 15px;
    padding-left: 50px;
    width: 100%;
    position: relative;
    // overflow: hidden;
    border-radius: 5px;

    .form-block {
      //
      position: relative;
      width: 100%;

      .left-line-icon {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        position: absolute;
        left: -40px;
        top: 15px;
        background-color: #7dcea0;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 45%;
      }

      input[type="checkbox"] {
        position: absolute;
        right: 10px;
        top: 18px;
        width: 24px;
        height: 24px;
        margin: 0;
        border-radius: 50%;
        opacity: 0;
        cursor: pointer;
        z-index: 999;
      }
      input[type="checkbox"]:hover + .title-bar > .right {
        background-color: #52be80;
        background-image: url(../images/icon/down_arrow_white.png);
      }
      input[type="checkbox"]:checked + .title-bar {
        .right {
          transform: rotate(0deg);
        }
      }

      .title-bar {
        height: 60px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 0 10px;

        .left {
          display: flex;
          flex-direction: column;
          span:nth-child(1) {
            font-size: 2rem;
            font-weight: bold;
          }
          span:nth-child(2) {
            font-size: 1.4rem;
            color: #bdbdbd;
            font-weight: 100;
          }
        }
        .right {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 2px solid #52be80;
          background-image: url(../images/icon/down_arrow_green.png);
          background-size: 80%;
          background-position: center;
          background-repeat: no-repeat;
          transform: rotate(180deg);
          cursor: pointer;
        }
        .right:hover {
        }
      }

      .content {
        //   height: auto;
        padding: 0 10px;
        // height: 300px;
        overflow: hidden;
        transform-origin: top;
        transition: all 0.5s ease-in-out;
      }
      hr {
        margin: 5px 10px 20px 10px;
      }
      input[type="checkbox"]:checked ~ .content {
        //   transition: all 10s ease-out;
        height: 0 !important;
      }
    }

    .base-info-container {
      .left-line-icon {
        background-image: url(../images/icon/base_info_white.png);
      }

      .content {
        display: flex;
        height: 550px;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;

        .item-label {
          font-size: 2.4rem;
          font-weight: 800;
          padding-left: 10px;
          line-height: 24px;
          border-left: 8px solid #1b1c4c;
        }
        .api-name-in {
          width: 100%;
          margin: 10px 0 20px 0;
          input {
            width: 100%;
            height: 44px;
            border-radius: 5px;
            background-color: #f1f1f1;
            border: none;
            padding: 0 10px;
            font-size: 2rem;
            font-weight: bold;
          }
          input:focus {
            outline: none;
            background-color: #b0bbc5;
            color: rgb(26, 7, 71);
          }
        }
        .url {
          display: flex;
          margin: 10px 0 20px 0;
          width: 100%;

          span:nth-child(1) {
            display: inline-block;
            flex-shrink: 0;
            height: 30px;
            line-height: 30px;
            padding: 0 8px;
            color: #919191;
            font-weight: 400;
            border-radius: 5px;
            background-color: #f1f1f1;
          }
          span:nth-child(2) {
            line-height: 30px;
            margin: 0 3px;
          }
          input {
            height: 30px;
            flex-grow: 1;
            border-radius: 5px;
            background-color: #f1f1f1;
            border: none;
            padding: 0 10px;
          }
          input:focus {
            outline: none;
            background-color: #b0bbc5;
            color: #1a0747;
          }
          @media screen and (max-width: 600px) {
            flex-direction: column;
            justify-content: center;
            align-items: stretch;
            span:nth-child(2) {
              text-align: center;
            }
          }
        }
        .api-description {
          width: 100%;
          position: relative;
          textarea {
            width: 100%;
            height: 250px;
            background-color: #f1f1f1;
            border-radius: 5px;
            resize: none;
            margin: 10px 0;
            border: none;
            padding: 20px;
            font-size: 1.7rem;
            overflow: hidden;
          }
          textarea:focus {
            outline: none;
            background-color: #b0bbc5;
            color: #1a0747;
          }
          .ad-word-count {
            position: absolute;
            right: 10px;
            bottom: 20px;
            font-size: 1.2rem;
            font-weight: 600;
          }
          .word-count-err {
            color: #ec7063;
          }
        }
      }
    }
    .param-get-container,
    .param-send-container {
      .left-line-icon {
        background-image: url(../images/icon/send_white.png);
      }
      .content {
        width: 100%;
        overflow-x: scroll;
        table {
          width: 100%;
          flex-grow: 0;
          border-radius: 5px;
          overflow: hidden;
          text-align: center;
          border: 1px;
          margin-bottom: 10px;
          border-spacing: 0;

          th {
            border: 2px solid #808b96;
            margin-bottom: 10px;
            text-align: center;
            min-width: 80px;
            max-height: 40px;
            padding: 10px 0;
            background-color: #808b96;
            color: #fff;
            border: 0px solid transparent;
          }
          th:nth-child(1) {
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;
          }
          th:nth-last-child(1) {
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
          }
          tr td {
            text-align: center;
            padding: 5px;
            height: 40px;
            max-height: 40px;
            input[type="text"] {
              height: 30px;
              line-height: 30px;
              background: rgba(0, 0, 0, 0);
              border: none;
              padding: 0 5px;
              text-align: center;
              transition: none;
              transition: background 0.5s ease-in-out !important;
              border-radius: 5px;
            }
            input::-webkit-input-placeholder {
              color: #dbdbdb;
            }
            input:-moz-placeholder {
              color: #dbdbdb;
            }
            input:-ms-input-placeholder {
              color: #dbdbdb;
            }

            input[type="text"]:focus {
              outline: #c2c2c2 solid thin;
            }
            select {
              width: 75px;
              padding: 0 5px;
              height: 28px;
              background-color: transparent;
              border: none;
              appearance: none;
              -moz-appearance: none;
              -webkit-appearance: none;
              background-image: url(../images/icon/down_arrow_grey.png);
              background-size: 15px 15px;
              background-repeat: no-repeat;
              background-position: 55px 7px;
              border-style: none;
              transition: none;
              option:selected {
                background-color: #808b96;
                color: #fff;
              }
            }
            select:focus {
              outline: #808b96 solid thin;
              border-style: none;
            }
            .ckbox-con {
              width: 100%;
              height: 100%;
              position: relative;
              input[type="checkbox"] {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                opacity: 0;
                z-index: 1;
              }

              div {
                content: "";
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                position: absolute;
                width: 20px;
                height: 20px;
                border-radius: 5px;
                // background-color: #808b96;
                border: 2px solid #808b96;
                z-index: 0;
                background-size: 15px 15px;
                background-position: 50% 30%;
                background-repeat: no-repeat;
              }
              input[type="checkbox"]:checked + div {
                content: "*";
                background-image: url(../images/icon/yes_bold.png);
                background-color: #808b96;

                // background-color: #ff5e00;
              }
            }
            .del-icon {
              margin-left: 50%;
              transform: translateX(-50%);
              cursor: pointer;
              font-size: 1rem;
              color: #900c3f;
              width: 50px;
              height: 24px;
              line-height: 20px;
              border-radius: 5px;
              border: 2px solid #900c3f;
            }
            .del-icon:hover {
              background-color: #900c3f;
              color: #fff;
            }
          }
          tr:nth-child(even) td {
            background-color: #f6f6f6;
          }
          tr:nth-child(even) > td:nth-child(1) {
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;
          }
          tr:nth-child(even) > td:nth-last-child(1) {
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
          }
          #add-param-btn {
            .add-btn {
              width: 120px;
              height: 30px;
              line-height: 30px;
              margin-left: 50%;
              transform: translateX(-50%);
              border-radius: 5px;
              background-color: #7dcea0;
              background-image: url(../images/icon/add_white.png);
              background-size: 15px 15px;
              background-repeat: no-repeat;
              background-position: 12.5px 7.5px;
              color: #fff;
              font-size: 1.2rem;
              cursor: pointer;
              text-align: center;
            }
          }
        }
      }
    }
    .param-get-container {
      .left-line-icon {
        background-image: url(../images/icon/receive_white.png);
      }
    }
  }

  .outer-box::before {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 30px;
    height: 50px;
    background-color: #fff;
    z-index: -1;
  }
  .outer-box::after {
    content: "";
    position: absolute;
    height: 100%;
    border-left: 1px solid #dbdbdb;
    top: 55px;
    left: 25px;
    z-index: -2;
  }
  #end-icon {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    position: absolute;
    left: 11px;
    bottom: 51px;
    background-color: #ec7063;
    background-repeat: no-repeat;
    background-position: 60% 50%;
    background-size: 50%;
    background-image: url(../images/icon/location_white.png);
  }
}

.editting-mod-btn {
  .cancel-edit {
    left: 25% !important;
  }
  .submit-edit {
    right: 25% !important;
  }
}
.SHOW-INPUT-ERR .INPUT-ERR {
  background-color: #cf8179 !important;
}
.SHOW-INPUT-ERR {
  input.INPUT-ERR::-webkit-input-placeholder {
    color: #fff !important;
  }
  input.INPUT-ERR:-moz-placeholder {
    color: #fff !important;
  }
  input.INPUT-ERR:-ms-input-placeholder {
    color: #fff !important;
  }
}

.SUBMITING {
  width: 130px !important;
  background-color: #a9dfbf !important;

  .icon {
    background-image: url(../images/icon/loading_white.png) !important;
    animation: loading 1s linear 0s infinite normal;
  }
  @keyframes loading {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
}
</style>