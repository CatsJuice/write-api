<template>
  <div class="bg-container">
    <div class="login-container">
      <div class="header">
        <h1>Login</h1>
        <p>API后台管理</p>
      </div>

      <div class="input-item">
        <div class="err-msg">{{ usr_err }}</div>
        <label :class="[usr_label]">用户名</label>
        <input
          :class="[usr_style]"
          type="text"
          name="username"
          v-model="username"
          @focus="usr_label='up'"
          @blur="usernameBlur"
        />
      </div>
      <div class="input-item">
        <div class="err-msg">{{ pwd_err }}</div>
        <label :class="[pwd_label]">密码</label>
        <input
          :class="[pwd_style]"
          :type="show_pwd?'text':'password'"
          name="password"
          v-model="password"
          @focus="pwd_label='up'"
          @blur="passwordBlur"
          @keyup.enter='login'
        />
        <div id="show-pwd" :class="[show_pwd?'show-pwd':'hide-pwd']" @click="show_pwd = !show_pwd"></div>
      </div>
      <input type="submit" @click="login" value="登录" />
    </div>
  </div>
</template>

<script>
import global from "./global.vue";
export default {
  data() {
    return {
      username: "",
      password: "",
      show_pwd: false,
      usr_label: "down",
      pwd_label: "down",
      usr_style: "normal",
      pwd_style: "normal",
      usr_err: "",
      pwd_err: ""
    };
  },

  methods: {
    passwordBlur() {
      if (!this.password.length > 0) this.pwd_label = "down";
    },
    usernameBlur() {
      if (!this.username.length > 0) this.usr_label = "down";
    },
    login() {
      if (this.username.length == 0) {
        this.usr_err = "用户名不能为空";
        this.usr_style = "error";
        setTimeout(() => (this.usr_style = "normal"), 600);
      }
      if (this.password.length == 0) {
        this.pwd_err = "密码不能为空";
        this.pwd_style = "error";
        setTimeout(() => (this.pwd_style = "normal"), 600);
      }

      // do login
      let data = {
        username: this.username,
        password: this.password
      };
      this.$http
        .get(`${global.url_prefix}/write-api/login`, {
          params: data,
          credentials: true,
          emulateJSON: true
        })
        .then(
          res => {
            // console.log(res.body);
            if (res.body.status == 200 || res.body.status == 201) {
              this.$router.push({ path: "/project" });
            } else if (res.body.status == 300) {
              this.pwd_err = "密码错误";
              this.pwd_style = "error";
              setTimeout(() => (this.pwd_style = "normal"), 600);
            } else if (res.body.status == 400) {
              this.usr_err = "用户名不存在";
              this.usr_style = "error";
              setTimeout(() => (this.usr_style = "normal"), 600);
            } else {
              console.log("unexcpted error");
            }
          },
          () => console.log("请求失败")
        );
    },
    check_username(username) {
      return true;
    },
    check_password(password) {
      return true;
    }
  },

  watch: {
    usr_err() {},
    username() {
      this.usr_err = "";
    },
    password() {
      this.pwd_err = "";
    }
  }
};
</script>

<style scoped lang='scss'>
* {
  margin: 0;
  padding: 0;
}
.bg-container {
  width: 100vw;
  height: 100vh;
  background-image: url(../images/bg.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  .login-container {
    width: 300px;
    height: 500px;
    background-color: #fff;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    padding: 10px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .header {
      // background-color: #8484ad;
      padding: 0 20px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-family: sans-serif;

      h1 {
        font-weight: 600;
        position: relative;
        animation: login_title 4s ease 0s infinite normal;
      }
      h1::before {
        content: "Login";
        position: absolute;
        left: 150%;
      }
      @keyframes login_title {
        0% {
          transform: translate(0, 0);
          // margin-left: 0;
        }
        25% {
          transform: translate(-150%, 0);
          // margin-left: -200px;
        }
        100% {
          transform: translate(-150%, 0);
        }
      }
      p {
        line-height: 40px;
      }
    }

    .input-item {
      width: 300px;
      height: 80px;
      // background-color: bisque;
      position: relative;

      label {
        position: absolute;
        transition: all 0.2s ease-in-out;

        z-index: 9;
      }
      label.down {
        bottom: 10px;
        left: 50px;
        color: #8484ad;
      }
      label.up {
        bottom: 42px;
        left: 40px;
        color: #292980;
      }

      .err-msg {
        color: #d34545;
        font-size: 0.8rem;
        position: absolute;
        right: 40px;
        bottom: 40px;
      }
      input {
        color: #151579 !important;
        font-weight: bold;
        position: absolute;
        border: none;
        width: 250px;
        padding: 0 15px;
        height: 40px;
        line-height: 40px;
        border-radius: 20px;
        transition: all 0.6s ease-in-out;

        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
      }
      input.normal {
        background: #f3f3f3;
      }
      input.error {
        background: #e28585;
      }
      input:focus {
        outline: none;
        box-shadow: 0 1px 3px rgba(41, 41, 128, 0.1);
      }
      #show-pwd {
        position: absolute;
        z-index: 9;
        right: 30px;
        width: 40px;
        height: 40px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: 50%;
        bottom: 0;
        transition: all 0.1s ease-in-out;
      }
      .hide-pwd {
        background-image: url(../images/icon/cant_see.png);
      }
      .show-pwd {
        background-image: url(../images/icon/can_see.png);
      }
    }
    input[type="submit"] {
      flex-shrink: 0;
      width: 250px;
      height: 40px;
      border-radius: 20px;
      margin-top: 40px;
      outline: none;
      border: none;
      background: #292980;
      color: #fff;
      transition: all 0.2s ease-in-out;
    }
    input[type="submit"]:focus {
      outline: none;
    }
    input[type="submit"]:hover {
      box-shadow: 0 2px 10px rgba(25, 25, 182, 0.2);
    }
  }
}
</style>