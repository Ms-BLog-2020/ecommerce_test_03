<template>
<div>
    
    <Navbar></Navbar>
    <Alert></Alert>
    <div class="container-fluid">
      <div class="row">
       
        <Sidebar></Sidebar>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
          <router-view></router-view>
        </main>
      </div>
    </div>
</div>
</template>

<script>
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Alert from './Alert';

export default {
    components: {
        Navbar,
        Sidebar,
        Alert
    },
    created(){
    const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)someCookieName\s*=\s*([^;]*).*$)|^.*$/, '$1');//把cookie存到後端
    console.log('myCookie',myCookie);
    this.$http.defaults.headers.common.Authorization = myCookie; //套用axios >> 使用this.$http
    }
}
</script>>