<script>
const url_prefix = 'http://localhost:3000'
// const url_prefix = 'http://api.catsjuice.cn'
function commonFun() {
    console.log("global func demo")
}
export default {
    url_prefix,
    commonFun
}
</script>