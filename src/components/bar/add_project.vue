<template>
  <div>
    <div class="container">
      <div class="left" alt="back">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div class="mid"></div>
      <div class="right">
        <div class="bar-btn bar-btn-2">
          <div class="btn-icon"></div>
          <span>确认</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  line-height: 60px;
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  //   background: yellow;
  padding: 0;

  .left {
    width: 40px;
    height: 40px;
    // background-color: yellowgreen;
    position: relative;
    cursor: pointer;

    span {
      display: inline-block;
      width: 20px;
      position: absolute;
      border-bottom: 2px solid #000;
      left: 50%;
      transform: translateX(-50%) rotate(0deg);
      transition: all 0.3s ease;
    }
    span:nth-child(1) {
      top: 12px;
    }
    span:nth-child(2) {
      top: 50%;
      transform: translate(-50%, -50%);
    }
    span:nth-child(3) {
      bottom: 12px;
    }
  }

  .left:hover {
    background-color: rgba(248, 240, 230, 0.5);

    span:nth-child(1) {
      top: 14px;
      left: 7px;
      width: 15px;
      transform: rotate(-45deg);
    }
    span:nth-child(2) {
      top: 50%;
      transform: translate(-50%, -50%);
    }
    span:nth-child(3) {
      bottom: 14px;
      left: 7px;
      width: 15px;
      transform: rotate(45deg);
    }
  }

  .mid {
    flex-grow: 1;
  }

  .right {
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

    .bar-btn-2 {
      color: #fff;
      border: 2px solid #52be80;
      background-color: #52be80;
      font-size: 0.7rem;

      .btn-icon {
        background-size: 50%;
        margin-top: -4px;
        background-image: url(../../images/icon/yes_bold.png);
        transform: rotate(0deg);
        transition: all 0.4s ease-in-out 0.1s;
      }
      span {
        margin-right: 5px;
      }
    }

    .bar-btn-2:hover {
      background-color: #229954;
      border-color: #229954;
      box-shadow: 0 5px 30px rgba(34, 153, 84, 0.541);

      .btn-icon {
        transform-origin: 50% 60%;
        animation: shake 0.5s ease 0s 1 normal;
      }
      @keyframes shake {
        0% {
          transform: rotate(0);
        }
        16% {
          transform: rotate(-20deg);
        }
        32% {
          transform: rotate(20deg);
        }
        48% {
          transform: rotate(-20deg);
        }
        64% {
          transform: rotate(20deg);
        }
        80% {
          transform: rotate(-20deg);
        }
        96% {
          transform: rotate(20deg);
        }
        100% {
          transform: rotate(0deg);
        }
      }
    }
  }
}
</style>