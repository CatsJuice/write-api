<template>
  <div id="main">
    <!-- header -->
    <div :class="['header-bg', header_animi?'header-animi':'']" @mouseover="headerAnimi"></div>
    <div class="header">
      <div class="con">
        <div class="container">
          <div class="left">
            <div :class="['dot', dot_animi?'dot-animi':'']"></div>
            <span>
              <span style="position:relative; color:#1b1c4c; font-weight: 500; z-index: 2;">CAT</span>SJUICE@API DOC
            </span>
          </div>

          <div class="mid"></div>
          <div class="right">
            <div :class="['search', search_active?'search-active':'']">
              <input
                type="text"
                :placeholder="search_active?'Search Here ...' : ''"
                @focus="search_active=true"
                @blur="search_active=search.length>0?true:false"
                v-model="search"
              />
              <div class="search-icon"></div>
            </div>
            <span>{{ username }}</span>
            <p @click="logout">logout</p>
          </div>
        </div>
        <input type="checkbox" />
        <div class="top-tool-bar">
          <router-view ref="bar_btns" name="bar_btns"></router-view>
          <div class="arrow"></div>
        </div>
      </div>
    </div>

    <!-- content -->
    <div class="content-container">
      <router-view name="content" ref='content'></router-view>
    </div>

    <!-- footer -->
    <div class="footer"></div>
  </div>
</template>

<script>
import global from "./global.vue";

export default {
  data() {
    return {
      search: "",
      username: "请登录",
      search_active: false,
      header_animi: false,
      dot_animi: false,
    };
  },
  methods: {
    getUserInfo() {
      this.$http
        .get(`${global.url_prefix}/write-api/user/retrive`, {
          credentials: true,
          emulateJSON: true
        })
        .then(
          res => {
            // console.log(res.body);
            if (res.body.status != 200) this.$router.push({ path: "/login" });
            this.username = res.body.data.user_name;
          },
          () => console.log("请求失败")
        );
    },

    logout() {
      this.$http
        .get(`${global.url_prefix}/write-api/logout`, {
          credentials: true
        })
        .then(
          res => {
            // console.log(res.body);
            if (res.body.status == 200 || res.body.status == 201)
              this.$router.push({ path: "/login" });
            else console.log("退出失败");
          },
          () => console.log("退出接口请求失败")
        );
    },

    headerAnimi() {
      this.header_animi = true;
      this.dot_animi = true;
      setTimeout(() => (this.dot_animi = this.header_animi = false), 600);
    },

    // 供 tool-bar 调用的方法 
    // 新建工程
    emit_create_project() {
      this.$refs.content.create_project();
    },
    // 供 tool-bar 调用的方法 
    // 刷新项目列表
    refreshProjects() {
      this.$refs.content.refreshProjects();
    },
    // 供 tool-bar 调用的方法
    // 启用编辑模式
    switch_delete_mode() {
      this.$refs.content.switch_delete_mode();
    },
    // 供 project_list 调用
    // 删除指定id的工程
    delete_project(id, name) {
      this.$parent.delete_project(id, name)
    },

    showToast(params) {
      this.$parent.global_toast(params)
      // this.$parent.showToast(params);
    }
  },
  mounted() {
    this.getUserInfo();
  },
  watch: {}
};
</script>

<style scoped lang='scss'>
* {
  margin: 0;
  padding: 0;
}
#main {
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: scroll;
  background-color: #f6f6f6;
}
.header-bg {
  width: 100vw;
  height: 60px;
  background-color: #1b1c4c;
  background-image: url(../images/bg1.png);
  background-size: 300px auto;
  z-index: 888;
  position: relative;
}
// .header-bg:hover,
.header-animi {
  animation: top_bg_animi 0.6s ease 0s 1 normal forwards;
}
@keyframes top_bg_animi {
  0% {
  }
  100% {
    background-position: 300px 0;
  }
}
.dot-animi {
  animation: dot_animi 0.6s ease 0s 1 alternate;
}
@keyframes dot_animi {
  0%{}
  50%{
    left: 50px;
  }
  100% {
    left: -5px;
  }
}
.header {
  // background: #1b1c4c;
  // box-shadow: 0px 2px 15px rgba(27, 28, 76, 0.2);
  width: 100vw;
  height: 60px;
  position: sticky;
  top: 0;
  color: #fff;
  padding: 0;
  z-index: 999;

  .con {
    width: 100vw;
    height: 60px;
    background: #1b1c4c;
    box-shadow: 0px 2px 15px rgba(27, 28, 76, 0.2);

    .top-tool-bar {
      transition: all 0.3s ease;
      background-color: #fff;
      height: 100px;
      box-shadow: 0px 10px 15px rgba(120, 120, 120, 0.1);
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      position: absolute;
      top: 0px;
      left: 50%;
      
      z-index: -1;
      padding: 0 20px;

      // margin-top: -70px;
      .arrow {
        background-image: url(../images/icon/down_arrow_grey.png);
        background-size: 50%;
        background-position: center;
        background-repeat: no-repeat;
        width: 40px;
        height: 40px;
        padding: 0;

        position: absolute;
        bottom: 0;
        right: 50%;
        margin-right: -20px;
        transform: translateX(50%);
        transition: all 0.3s ease-in-out;
        transform: rotate(0deg);
        transform-origin: 50% 50%;
        z-index: 10;
      }
    }

    .container {
      height: 100%;
      margin: 0 auto;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      // background-color: rebeccapurple;
      .left {
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        font-size: 1.4rem;
        font-weight: 100;
        flex-shrink: 0;
        position: relative;

        .dot {
          position: absolute;
          width: 30px;
          height: 30px;
          background-color: #e9bf02;
          border-radius: 50%;
          z-index: 0;
          top: -8px;
          left: -5px;
        }
        span {
          position: relative;
          z-index: 2;
        }
      }
      .mid {
        flex-grow: 1;
      }
      .right {
        flex-shrink: 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        .search {
          position: relative;
          transition: all 0.3s ease-in-out;

          input {
            transition: all 0.3s ease-in-out;
            color: #1b1c4c;
            width: 30px;
            height: 30px;
            padding: 0 15px;
            border-radius: 15px;
            border: none;
            background-color: #1b1c4c;
          }
          input:focus {
            outline: none;
          }
          .search-icon {
            position: absolute;
            right: 2px;
            top: 2px;
            z-index: 9;
            width: 26px;
            height: 26px;
            border-radius: 50%;
            overflow: hidden;
            background-image: url(../images/icon/search_light.png);
            background-size: 50%;
            background-position: center;
            background-repeat: no-repeat;
            background-color: #1b1c4c;
          }
        }
        .search:hover,
        .search-active {
          input {
            background-color: #f0f0f0;
            width: 200px;
          }
        }
        span {
          cursor: default;
          line-height: 60px;
          padding: 0 20px;
          transition: all 0.2s ease-in-out;
          position: relative;
        }
        span:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }
        p {
          font-size: 0.9rem;
          padding: 5px 10px;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
          border-radius: 2px;
        }
        p:hover {
          color: #1b1c4c;
          background-color: #fff;
          padding: 5px 30px;
          font-weight: bold;
        }
      }
      @media screen and (max-width: 600px) {
        .left {
          display: none;
        }
      }
    }
    @media screen and (min-width: 1600px) {
      .container {
        width: 1440px;
        // padding: 0 72px;
      }
      .top-tool-bar {
        width: 1440px;
        transform: translateX(-50.5%);
      }
    }
    @media screen and (max-width: 1600px) {
      .container {
        width: 90vw;
        // padding: 0 5%;
      }
      .top-tool-bar {
        width: 90vw;
        transform: translateX(-51%);
      }
    }
    @media screen and (max-width: 550px){
      .top-tool-bar {
        width: 90vw;
        transform: translateX(-52%);
      }
    }

    input[type="checkbox"] {
      width: 100%;
      height: 40px;
      position: absolute;
      background-color: yellow;
      display: block;
      border: none;
      // visibility: hidden;
      opacity: 0;
      bottom: -40px;
      transition: all 0.3s ease-in-out;
    }
    input[type="checkbox"]:checked {
      bottom: -100px;
    }
    input[type="checkbox"]:checked + .top-tool-bar {
      margin-top: 60px !important;
      transition: all 0.3s ease;

      .arrow {
        transform: rotate(180deg);
        transform-origin: 50% 50%;
      }
    }
    input[type="checkbox"]:hover + .top-tool-bar {
      .arrow {
        // background-image: url(../images/icon/down_arrow_white.png);
      }
    }
    input[type="checkbox"]:hover + .top-tool-bar::after {
      content: " ";
      position: absolute;
      z-index: -1;
      width: 100%;
      height: 40px;
      // background-color: #eeeeeea6;
      background-color: rgba(255, 235, 205, 0.295);
      left: 0;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      transition: all 0.2s ease-in-out;
    }
    input[type="checkbox"]:hover + .top-tool-bar {
      box-shadow: 0 10px 12px rgba(0, 0, 0, 0.07);
    }
  }
}
.content-container {
  // padding: 0 20px;
  flex-shrink: 0;
  flex-grow: 0;
  padding-bottom: 100px;
  margin: 0;
  margin-left: 50%;
  transform: translateX(-50%);
  margin-top: 110px;
  overflow: hidden;
  // border-radius: 5px;
}
@media screen and (min-width: 1600px) {
  .content-container {
    width: 1440px;
  }
}
@media screen and (max-width: 1600px) {
  .content-container {
    width: 90vw;
  }
}
</style>