<template>
  <div class="root-container">
      <div class="search">
          <div class="icon"></div>
          <input type="text" placeholder="Search Api">
      </div>

      <div class="empty">
          There is No Items
      </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>

.root-container {
  width: 100%;
  background: #fff;
  padding: 40px 10px;
  
    // height: 300px;
  border-radius: 5px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column !important;
  align-items: flex-start;
  justify-content: flex-start;

  .search {
      width: 100%;
      flex-shrink: 0;
      input {
          width: 100%;
          height: 30px;
          border-radius: 15px;
          background-color: #f6f6f6;
          border: none;
          padding: 0 15px;
          font-size: 1.4rem;
          font-weight: 700;
          color: #505050;
      }
      input:focus {
          outline: none;
      }
  }

  .empty {
      flex-shrink: 0;
      width: 100%;
      font-weight: 700;
      margin: 20px 0;
      font-size: 1.4rem;
      color: #bfbfbf;
      padding-left: 10px;
      border-left: 5px solid rgb(27, 28, 76);
  }
}

@media screen and (max-width: 600px){
    .root-container {
        padding-top: 60px;
    }
}
@media screen and (min-width: 600px){
    .root-container {
        padding-top: 20px;
    }
}
</style>