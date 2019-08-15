<template>
  <div class="bar-btns">
    <div class="bar-btn bar-btn-2">
      <div class="btn-icon"></div>
      <span>编辑</span>
    </div>
    <router-link to="/project/add" tag="div" class="bar-btn bar-btn-1">
        <div class="btn-icon"></div>
        <span>添加项目</span>
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.bar-btns {
  width: 100%;
  line-height: 60px;
  height: 60px;
  display: flex;
  flex-direction: row;
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
    font-size: 0.7rem;

    .btn-icon {
      background-size: 33%;
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
    border: 2px solid #202483;
    background-color: #202483;
    font-size: 0.7rem;

    .btn-icon {
      background-size: 55%;
      background-image: url(../../images/icon/edit_white.png);
      transform: rotate(0deg);
      transition: all 0.4s ease-in-out 0.1s;
    }
    span {
      margin-right: 5px;
    }
  }

  .bar-btn-2:hover {
    background-color: #0a0d6d;
    box-shadow: 0 5px 30px rgba(20, 22, 95, 0.55);

    .btn-icon {
      transform: rotateY(180deg);
    }
  }
}
</style>