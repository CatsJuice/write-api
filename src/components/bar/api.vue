<template>
  <div class="bar-btns">
    <div class="bar-btn">按钮</div>
    <div class="bar-btn">按钮</div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    methods: {
        
    },
    mounted() {
        console.log(this.$route.params.project_id);
    },
};
</script>

<style scoped lang='scss'>
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
</style>