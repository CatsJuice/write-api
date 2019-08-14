<template>
  <div id="main">
    <!-- header -->
    <div class="header-bg"></div>
    <div class="header">
      <div class="con">
        <div class="container">
          <div class="left">
            <div class="dot"></div>
            <span>
              <span style="position:relative; color:#1b1c4c; font-weight: 500; z-index: 2;">CAT</span>SJUICE@API DOC
            </span>
          </div>

          <div class="mid"></div>
          <div class="right">
            <div :class="['search', search.length>0?'search-active':'']">
              <input type="text" v-model="search" />
              <div class="search-icon"></div>
            </div>
            <span>
              {{ username }}
              <p @click="logout">Logout</p>
            </span>
          </div>
        </div>
        <div class="bar">
          <div class="bar-btns">
            <div class="bar-btn">按钮</div>
            <div class="bar-btn">按钮</div>
            <div class="bar-btn">按钮</div>
          </div>
          <div class="arrow"></div>
        </div>
      </div>
    </div>

    <!-- content -->
    <div class="content-container">
      <router-view></router-view>
      <div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
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
      username: "请登录"
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
            console.log(res.body);
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
            console.log(res.body);
            if (res.body.status == 200 || res.body.status == 201)
              this.$router.push({ path: "/login" });
            else console.log("退出失败");
          },
          () => console.log("退出接口请求失败")
        );
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
  background-size: auto 155px;
  background-position: top;
  z-index: 1;
  position: relative;
}
.header {
  // background: #1b1c4c;
  // box-shadow: 0px 2px 15px rgba(27, 28, 76, 0.2);
  width: 100vw;
  height: 60px;
  position: sticky;
  top: 0;
  color: #fff;

  .con {
    width: 100vw;
    height: 60px;
    background: #1b1c4c;
    box-shadow: 0px 2px 15px rgba(27, 28, 76, 0.2);

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

          p {
            position: absolute;
            line-height: 20px;
            background: #1b1c4c;
            border-radius: 5px;
            padding: 5px 30px;
            top: 68px;
            left: 50%;
            transform: translateX(-50%);
            visibility: hidden;
            transition: all 0.3s ease-in-out;
            cursor: pointer;
          }
          p::after {
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            z-index: 9;
            content: "";
            border-width: 6px;
            border-style: solid;
            border-color: transparent transparent #1b1c4c transparent;
          }
        }
        span:hover {
          background-color: rgba(255, 255, 255, 0.1);
          p {
            visibility: visible;
          }
          p:hover {
            padding: 5px 36px;
          }
        }
      }
      @media screen and (max-width: 600px) {
        .left {
          display: none;
        }
      }
    }
    @media screen and (min-width: 1600px) {
      .container,
      .bar {
        width: 1600px;
        padding: 0 0;
      }
    }
    @media screen and (max-width: 1600px) {
      .container,
      .bar {
        width: 90%;
        padding: 0 5%;
      }
    }
  }
}
.content-container {
  padding-bottom: 100px;
  // background-color: #e9bf02;
  margin: 0 auto;
}
@media screen and (min-width: 1600px) {
  .content-container {
    width: 1600px;
    padding-left: 0;
    padding-right: 0;
  }
}
@media screen and (max-width: 1600px) {
  .content-container {
    width: 90%;
    padding-left: 5%;
    padding-right: 5%;
  }
}

.bar {
  transition: all 0.3s ease 0.5s;
  background-color: #fff;
  height: 100px;
  box-shadow: 0px 2px 15px rgba(120, 120, 120, 0.1);
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  position: absolute;
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
  z-index: -1;
  // margin-top: -70px;

  .bar-btns {
    width: 100%;
    // background-color: #e9bf02;
    line-height: 60px;
    height: 60px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;

    .bar-btn {
      flex-grow: 0;
      flex-shrink: 0;
      width: 80px;
      height: 40px;
      line-height: 40px;
      border-radius: 5px;
      background-color: #14165f;
      text-align: center;
      cursor: pointer;
      margin-left: 10px;
      border: 1px solid #14165f;
      transition: all 0.4s ease-in-out;
    }
    .bar-btn:hover {
      background-color: #181957;
      border: 1px solid #181957;
      box-shadow: 0 5px 20px rgba(24, 25, 87, 0.5);
    }
  }

  .arrow {
    background-image: url(../images/icon/down_arrow.png);
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
  }
}
.bar:hover {
  margin-top: 60px;
  transition: all 0.3s ease;

  .arrow {
    transform: rotate(180deg);
    transform-origin: 50% 50%;
  }
}
@media screen and (min-width: 1600px) {
  .bar {
    width: 1600px;
    padding-left: 0;
    padding-right: 0;
  }
}
@media screen and (max-width: 1600px) {
  .bar {
    width: 90%;
  }
}
</style>