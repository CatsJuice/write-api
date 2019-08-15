<template>
  <div class="projects">
    <div class="project-item"></div>

    <div class="project-item"></div>

    <div class="project-item"></div>

    <div class="project-item"></div>

    <div class="project-item"></div>

    <div class="project-item"></div>

    <div class="project-item"></div>

    <div class="zhanwei"></div>
    <div class="zhanwei"></div>
    <div class="zhanwei"></div>
    <div class="zhanwei"></div>

    <!-- <div style="height: 280px; width: 10px; flex-grow: 1;background: red;"></div> -->
  </div>
</template>

<script>
export default {};
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

  .zhanwei {
    // background-color: aqua;
    height: 10px;
  }
  .project-item {
    background: #fff;
    flex-shrink: 0;
    // width: 220px;
    margin: 10px 0;
    height: 280px;
    border-radius: 5px;
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.08);
    transition: all 0.25s ease-in-out;
  }
  .project-item:hover {
    transform: translateY(-10px);
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
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