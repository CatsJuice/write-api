<template>
  <!-- <transition-group :duration="1000" name='pro_list' tag="div" class="projects"> -->
  <div v-if="project_list.length>0" class="projects">
    <div :class="['refresh-word', refreshing?'refreshing':'']" :key="'refreshing'">刷新中...</div>

      <div v-for="item in project_list" 
          class="project-item" 
          :key="item.project_id">
        <div class="pn">{{ item.project_name }}</div>
        <div class="pp">{{ item.project_prefix }}</div>
        <div class="pd">{{ item.project_description }}</div>
        <div class="enter-btn" @click="$router.push('/project/' + item.project_id)">
          <span>进入项目</span>
          <div class="icon"></div>
        </div>
        <div
          @click="delete_project(item.project_id, item.project_name)"
          :class="['delete-btn', delete_mode?'del-btn-show':'del-btn-hide']"
        >
          <span></span>
          <span></span>
        </div>
      </div>

    <div class="zhanwei" key="-1"></div>
    <div class="zhanwei" key="-2"></div>
    <div class="zhanwei" key="-3"></div>
    <div class="zhanwei" key="-4"></div>

  </div>

  <div v-else class="empty">
    <div class="icon"></div>
    <span class="words">It's Empty Here</span>

    <router-link to="/project/add" tag="div" class="start-btn">
      <span>Start Here !</span>
      <div class="btn-icon"></div>
    </router-link>
  </div>
  <!-- </transition-group> -->
</template>

<script>
import global from "./global.vue";
export default {
  data() {
    return {
      project_list: [],
      refreshing: false,
      delete_mode: false
    };
  },
  methods: {
    load_projects() {
      this.$http
        .get(`${global.url_prefix}/write-api/project/retrive`, {
          params: {
            limit: 100
          },
          emulateJSON: true,
          credentials: true
        })
        .then(
          res => {
            // console.log(res.body.data);
            if (res.body.status == 200) {
              // 请求成功
              this.project_list = res.body.data;
            }
            setTimeout(() => (this.refreshing = false), 600);
          },
          () => {
            console.log("请求失败");
            setTimeout(() => (this.refreshing = false), 600);
          }
        );
    },
    refreshProjects() {
      // Start Animation
      this.refreshing = true;

      // Do Some Params Inition
      // this.project_list = [];

      // Then Reload
      this.load_projects();
      // setTimeout(() => (, 400);
    },

    switch_delete_mode() {
      this.delete_mode = !this.delete_mode;
    },

    // 删除id
    delete_project(id, name) {
      this.$parent.delete_project(id, name);
    },

    do_delete(id) {
      this.$http
        .get(`${global.url_prefix}/write-api/project/delete`, {
          params: {
            id: id
          },
          emulateJSON: true,
          credentials: true
        })
        .then(
          res => {
            // console.log(res.body);
            if (res.body.status == 200) {
              this.$parent.showToast({
                icon: "yes_grey.png",
                msg: "删除成功",
                time: 2000
              });

              this.project_list = this.project_list.filter(
                e => e.project_id != id
              );
            }
          },
          () => {}
        );
    }
  },
  mounted() {
    this.load_projects();
  }
};
</script>

<style lang="scss" scoped>
.pro_list-enter-active,
.pro_list-leave-active {
}
.pro_list-enter {
  // transform: translateY(20%);
  margin-top: 20px;
}
.pro_list-enter-to,
.pro_list-leave {
  // transform: translateY(0%);
  margin-top: 0px;
}
.pro_list-leave-to {
  // transform: translateY(-20%);
  margin-top: -20px;
}

.projects {
  width: 100%;
  //   background-color: cadetblue;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;

  .refresh-word {
    width: 100%;
    height: 0px;
    text-align: center;
    font-size: 1.4rem;
    font-weight: bold;
    color: #bdbdbd;
    transition: all 0.3s ease-in-out;
    overflow: hidden;
  }
  .refreshing {
    height: 50px;
  }
  .zhanwei {
    // background-color: aqua;
    height: 10px;
  }
  .project-item {
    padding: 20px;
    background: #fff;
    flex-shrink: 0;
    position: relative;
    overflow: hidden;
    // width: 220px;
    margin: 10px 0;
    height: 280px;
    border-radius: 5px;
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.08);
    transition: all 0.25s ease-in-out;

    display: flex;
    flex-direction: column;
    align-items: flex-start;

    cursor: pointer;

    .pn {
      padding-left: 20px;
      width: 100%;
      font-size: 2rem;
      font-weight: 800;
      position: relative;
      transition: all 0.3s ease-in-out;
      //   overflow: hidden;

      display: inline-block;
      white-space: nowrap;
      text-overflow: ellipsis;
      transition: all 0.2s ease;
      flex-shrink: 0;
    }
    .pn::before {
      content: "";
      position: absolute;
      left: -20px;
      top: 50%;
      transform: translateY(-50%);
      width: 7px;
      height: 28px;
      background-color: #1b1c4c;
    }

    .pp {
      width: 100%;
      height: 40px;
      line-height: 40px;
      border-radius: 5px;
      background-color: #f6f6f6;
      overflow: hidden;
      margin: 20px 0;
      padding: 0 10px;
      color: #c0392b;
      font-size: 1.4rem;
      font-weight: 700;

      display: inline-block;
      white-space: nowrap;
      text-overflow: ellipsis;
      transition: all 0.2s ease;
      flex-shrink: 0;
    }

    .pd {
      width: 100%;
      height: 120px;
      border-radius: 5px;
      background-color: #f6f6f6;
      overflow: hidden;
      padding: 10px;
      box-shadow: 0px 0px 2px rgba($color: #000000, $alpha: 0.05) inset;
      transition: all 0.5s ease;
      font-size: 1.5rem;
      font-weight: 650;
      color: #171866;
      flex-shrink: 0;
    }

    .enter-btn {
      background-color: #52be80;
      flex-shrink: 0;
      width: 44px;
      height: 44px;
      border-radius: 22px;
      margin-top: 50px;
      overflow: hidden;
      margin-left: 50%;
      transform: translateX(-50%);
      transition: all 0.4s ease-in-out;

      display: flex;
      flex-direction: rwo;
      align-items: center;
      justify-content: center;

      span {
        display: block;
        height: 44px;
        line-height: 44px;
        color: #fff;
        font-weight: 800;
        width: 0;
        overflow: hidden;
        transition: all 0.4s ease-in-out;
        text-align: right;
      }

      .icon {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        overflow: hidden;
        background-image: url(../images/icon/arrow_r_white.png);
        background-size: 33%;
        background-position: 40% 50%;
        background-repeat: no-repeat;
        transition: all 0.2s ease-in-out;
      }
    }
    .enter-btn:hover {
      .icon {
        transform: translateX(10px);
      }
    }

    .delete-btn {
      position: absolute;
      // right: 20px;
      top: 22px;
      width: 25px;
      height: 25px;
      border-radius: 50%;
      overflow: hidden;
      background-color: #cd5c5c;
      transition: all 0.5s ease-in-out;
      // box-shadow: 0 0 10px rgba(0,0,0,.1) inset;

      span {
        width: 14px;
        position: absolute;
        display: block;
        border-bottom: 2px solid #fff;
        left: 50%;
        top: 50%;
        transition: all 0.2s ease-in-out;
      }
      span:nth-child(1) {
        transform: translate(-50%, -50%) rotate(45deg);
      }
      span:nth-child(2) {
        transform: translate(-50%, -50%) rotate(-45deg);
        transition: all 0.3s ease-in-out;
      }
    }
    .delete-btn:hover {
      span:nth-child(1) {
        transform: translate(-50%, -50%) rotate(135deg);
      }
      span:nth-child(2) {
        transform: translate(-50%, -50%) rotate(-135deg);
      }
    }
    .del-btn-hide {
      right: -40px;
      transform: rotate(90deg);
    }
    .del-btn-show {
      right: 20px;
      transform: rotate(0deg);
    }
  }
  .project-item:hover {
    transform: translateY(-10px);
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);

    .pn {
      padding-left: 10px;
    }
    .pp {
      margin: 10px 0;
    }
    .pd {
      height: 80px;
    }
    .enter-btn {
      margin-top: 20px;
      width: 100%;
      transition: width 0.4s ease 0.3s;
      box-shadow: 0px 5px 12px rgba(82, 190, 129, 0.55);

      span {
        width: 80px;
        transition: width 0.4s ease 0.6s;
      }
    }
  }

  @media screen and (max-width: 450px) {
    // 1 列
    .project-item,
    .zhanwei {
      width: 100%;
    }
  }
  @media screen and (min-width: 450px) and (max-width: 720px) {
    // 2 列
    .project-item,
    .zhanwei {
      width: 48%;
    }
  }
  @media screen and (min-width: 720px) and (max-width: 1000px) {
    // 3 列
    .project-item,
    .zhanwei {
      width: 31.5%;
    }
  }
  @media screen and (min-width: 1000px) and (max-width: 1250px) {
    .project-item,
    .zhanwei {
      width: 23.5%;
    }
  }
  @media screen and (min-width: 1250px) {
    .project-item,
    .zhanwei {
      width: 18.5%;
    }
  }
}

.empty {
  width: 100%;
  height: 500px;

  .icon {
    width: 100%;
    height: 200px;
    background-image: url(../images/icon/empty_grey.png);
    background-size: auto 200px;
    background-repeat: no-repeat;
    background-position: 50% 0px;
    animation: empty_icon 2s ease 0s 1 normal;
    transform-origin: 50% 100%;
  }
  @keyframes empty_icon {
    0% {
      transform: rotate(0deg);
    }
    10% {
      transform: rotate(10deg);
    }
    20% {
      transform: rotate(-10deg);
    }
    30% {
      transform: rotate(10deg);
    }
    40% {
      transform: rotate(-10deg);
    }
    50% {
      transform: rotate(10deg);
    }
    60% {
      transform: rotate(-10deg);
    }
    70% {
      transform: rotate(10deg);
    }
    80% {
      transform: rotate(-10deg);
    }
    90% {
      transform: rotate(-10deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }

  span.words {
    font-size: 2rem;
    font-weight: 800;
    color: #d1d1d1;
    width: 100%;
    display: block;
    text-align: center;
    animation: empty_words 1s ease 0s 1 normal forwards;
    // letter-spacing:
  }
  @keyframes empty_words {
    0% {
      letter-spacing: 0px;
    }
    50% {
      letter-spacing: 10px;
    }
    100% {
      letter-spacing: 1px;
    }
  }

  @keyframes start_btn {
    0% {
      margin-top: 100px;
      width: 50px;
    }
    50% {
      margin-top: 20px;
      width: 50px;
    }
    100% {
      margin-top: 20px;
      width: 200px;
    }
  }
  .start-btn {
    height: 50px;
    line-height: 50px;
    border-radius: 25px;
    color: #fff;
    font-weight: 700;
    margin: 0 auto;
    cursor: pointer;
    background-image: linear-gradient(
      to right,
      rgb(27, 28, 76) 0%,
      rgb(27, 28, 76) 100%
    );
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    animation: start_btn 1s ease 0s 1 normal forwards;
    transition: all 0.3s ease;

    span {
      display: inline-block;
      width: 0;
      height: 50px;
      overflow: hidden;
      animation: btn_word 1s ease 0s 1 normal forwards;
      text-align: right;
      transition: all 0.3s ease;
    }
    @keyframes btn_word {
      0% {
        width: 0;
      }
      50% {
        width: 0;
      }
      100% {
        width: 80px;
      }
    }

    .btn-icon {
      background-image: none;
      width: 50px;
      height: 50px;
      background-image: url(../images/icon/arrow_r_white.png);
      background-size: 37%;
      background-position: 40% 50%;
      background-repeat: no-repeat;
      transition: all 0.3s ease;
    }
  }

  .start-btn:hover {
    box-shadow: 0 15px 40px rgba(21, 22, 107, 0.33);

    .btn-icon {
      margin-left: 20px;
    }
  }
}
</style>