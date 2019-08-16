<template>
  <div class="bar-btns">
    <div class="left">
      <div class="refresh" @click="refreshProjects()">
        <div class="icon"></div>
        <span>刷新</span>
      </div>
    </div>
    <div class="right">
      <div class="bar-btn bar-btn-2" @click="switch_del_mode">
        <div class="btn-icon"></div>
        <span>{{ delete_mode ? '取消' : '删除项目'}}</span>
      </div>
      <router-link to="/project/add" tag="div" class="bar-btn bar-btn-1">
        <div class="btn-icon"></div>
        <span>添加项目</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      delete_mode: false
    }
  },
  methods: {
    refreshProjects() {
      this.$parent.refreshProjects();
    },
    switch_del_mode() {
      this.delete_mode = !this.delete_mode
      this.$parent.switch_delete_mode()
    }
  }
};
</script>

<style lang="scss" scoped>
.bar-btns {
  width: 100%;
  line-height: 60px;
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  .left {
    .refresh {
      display: flex;
      flex-direction: row;
      width: 40px;
      height: 40px;
      border-radius: 20px;
      overflow: hidden;
      transition: all 0.3s ease-in-out;
      // background-color: #52BE80;
      cursor: pointer;

      .icon {
        margin-top: 4px;
        margin-left: 4px;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        // background-color: #52BE80;
        background-image: url(../../images/icon/refresh_grey.png);
        background-size: 70%;
        background-position: center;
        background-repeat: no-repeat;
        transition: all 0.6s ease-in-out;
      }
      span {
        display: block;
        width: 0;
        line-height: 40px;
        height: 40px;
        overflow: hidden;
        transition: all 0.3s ease-in-out;
      }
    }
    .refresh:hover {
      background-color: #52be80;
      width: 100px;
      box-shadow: 0px 2px 13px rgba(82, 190, 129, 0.475);

      .icon {
        background-image: url(../../images/icon/refresh_green.png);
        background-color: #fff;
        transform: rotate(180deg);
      }
      span {
        width: 50px;
        padding: 0 10px;
      }
    }
  }

  .right {
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    align-items: center;
    justify-content: flex-end;

    .bar-btn {
      flex-grow: 0;
      flex-shrink: 0;
      width: 100px;
      height: 40px;
      border-radius: 5px;
      // background-color: #14165f;
      cursor: pointer;
      margin-left: 15px;
      // border: 1px solid #14165f;
      transition: all 0.4s ease-in-out;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      font-size: 1rem;

      .btn-icon {
        width: 30px;
        height: 30px;
        flex-shrink: 0;
        flex-grow: 0;
        background-position: center;
        background-repeat: no-repeat;
        transition: all 0.2s ease-in-out;
      }
      span {
        flex-shrink: 0;
        flex-grow: 0;
      }
    }
    .bar-btn:hover {
      // background-color: #181957;
      // border: 1px solid #181957;
      // box-shadow: 0 5px 20px rgba(24, 25, 87, 0.5);
    }

    .bar-btn-1 {
      color: #14165f;
      border: 2px solid #202483;

      .btn-icon {
        background-size: 36%;
        background-image: url(../../images/icon/add_dark.png);
        transform: rotate(0deg);
        transition: all 0.4s ease-in-out 0.1s;
      }
      span {
        margin-right: 5px;
      }
    }

    .bar-btn-1:hover {
      color: #fff;
      background-color: #202483;

      .btn-icon {
        background-image: url(../../images/icon/add_light.png);
        transform: rotate(90deg);
      }
    }
    .bar-btn-2 {
      color: #fff;
      border: 2px solid #cd5c5c;
      background-color: #cd5c5c;

      .btn-icon {
        margin-top: -2px;
        background-size: 55%;
        background-image: url(../../images/icon/delete_white.png);
        transform: rotate(0deg);
        transition: all 0.4s ease-in-out 0.1s;
      }
      span {
        display: inline-block;
        width: 50px;
        text-align: center;
        transition: all 0.3s ease-in-out;
        margin-right: 5px;
      }
    }

    .bar-btn-2:hover {
      background-color: rgb(168, 58, 58);
      border: 2px solid rgb(168, 58, 58);
      box-shadow: 0 5px 30px rgba(205, 92, 92, 0.589);

      .btn-icon {
        transform: rotateY(180deg);
      }
    }
  }
}
</style>