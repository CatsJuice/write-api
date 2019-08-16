<template  ref='create_project_form'>
  <div class="container">
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
</template>

<script>
import global from "../global.vue";
export default {
  data() {
    return {
      pn_txt: "",
      pp_txt: "http://",
      pd_txt: "",
      //   pn_had_input: 0,
      pn_max: 40,
      //   pp_had_input: 0,
      pp_max: 50,
      //   pd_had_input: 0,
      pd_max: 255
    };
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
    }
  },
  methods: {
    create_project() {
      // check form items
      if (
        this.pn_had_input > this.pn_max ||
        this.pp_had_input > this.pp_max ||
        this.pd_had_input > this.pd_max
      ) {
        this.$parent.showToast({
          icon: "!.png",
          msg: "请勿超出字数限制",
          time: 2000
        });
        return;
      }

      if (
        this.pn_had_input <= 0 ||
        this.pp_had_input <= 0 ||
        this.pd_had_input <= 0
      ) {
        this.$parent.showToast({
          icon: "!.png",
          msg: "请先完善表单",
          time: 2000
        });
        return;
      }

      // 发送请求
      var data = {
        pn: this.pn_txt,
        pp: this.pp_txt,
        pd: this.pd_txt
      };
      this.$http
        .post(`${global.url_prefix}/write-api/project/create`, data, {
          emulateJSON: true,
          credentials: true
        })
        .then(
          res => {
            // console.log(res);
            if (res.body.status == 200) {
              // 插入成功
              this.$parent.showToast({
                icon: "yes_grey.png",
                msg: `创建成功, 项目id为${res.body.data.project_id}`,
                time: 2000
              });
              this.$router.push({ path: "/project" });
            } else if (res.body.status == 101 || res.body.status == 102) {
              // 登录已过期
              this.$parent.showToast({
                icon: "!.png",
                msg: "登录已过期，请重新登录",
                time: 2000
              });
              this.$router.push("/login");
            } else {
              this.$parent.showToast({
                icon: "!.png",
                msg: "未知错误",
                time: 2000
              });
            }
          },
          () => console.log("请求失败")
        );
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  padding: 20px 0;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 2px 15px rgba(120, 120, 120, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

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
</style>