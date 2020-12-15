<template>
  <div class="hello">
    <a href="#" @click.prevent="signout">登出</a>
  </div>
</template>

<script>




export default{
    created(){
    const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)someCookieName\s*=\s*([^;]*).*$)|^.*$/, '$1');//把cookie存到後端
    console.log('myCookie',myCookie);
    this.$http.defaults.headers.common.Authorization = myCookie; //套用axios >> 使用this.$http
    }
}
</script>>
