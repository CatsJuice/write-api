<template>
  <div class="projects">
    <div :class="['refresh-word', refreshing?'refreshing':'']">刷新中...</div>
    <div v-for="item in project_list" class="project-item" :key="item.project_id">
      <div class="pn">{{ item.project_name }}</div>
      <div class="pp">{{ item.project_prefix }}</div>
      <div class="pd">{{ item.project_description }}</div>
      <div class="enter-btn">
        <span>进入项目</span>
        <div class="icon"></div>
      </div>
    </div>

    <div class="zhanwei"></div>
    <div class="zhanwei"></div>
    <div class="zhanwei"></div>
    <div class="zhanwei"></div>

    <!-- <div style="height: 280px; width: 10px; flex-grow: 1;background: red;"></div> -->
  </div>
</template>

<script>
import global from "./global.vue";
export default {
  data() {
    return {
      project_list: [],
      refreshing: false
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
            console.log(res.body.data);
            if (res.body.status == 200) {
              // 请求成功
              this.project_list = res.body.data;
            }
          },
          () => console.log("请求失败")
        );
    },
    refreshProjects() {
      // Start Animation
      this.refreshing = true;
      // Do Some Params Inition

      // Then Reload
      this.load_projects();
      setTimeout(() => this.refreshing = false, 400);
    }
  },
  mounted() {
    this.load_projects();
  }
};
</script>

<style lang="scss" scoped>
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
</style>