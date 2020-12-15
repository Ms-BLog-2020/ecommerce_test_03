
<template>

  <div>
    <head>
        <meta charset="utf-8">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@300&display=swap">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@300&family=Noto+Serif+JP&family=Noto+Serif+TC:wght@300&display=swap" >
        <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@300&display=swap" rel="stylesheet">
        <link href="/css/phone.css" rel="stylesheet" type="text/css" media="screen and (max-width: 600px)" />
    </head>





  
  <header class="jumbotron">
   <form class="form-signin" @submit.prevent="signin">
      <h1 class="h3 mb-3 font-weight-normal">後台登入</h1>
      <div class="form-group">
        <label for="inputEmail" class="sr-only">Email address</label>
        <input type="email" id="inputEmail" v-model="user.username" class="form-control" placeholder="請輸入 szheng10431122@gmail.com" required autofocus>
      </div>
      <div class="form-group">
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" id="inputPassword" v-model="user.password" class="form-control" placeholder="請輸入 ecommerceproject" required>
      </div>
      <div class="text-center">
        <button class="btn btn-primary btn-sm" type="submit">我要登入</button>
      </div>
      
    </form>
    </header>
  </div>   
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      user: {
          username: '',
          password: ''
      }
    }
  },
  methods: {
      signin(){
        const api = `${process.env.APIPATH}/admin/signin`; 
        const vm = this;
        this.$http.post(api, vm.user).then((response) => { //post>>把用戶的資料傳進來
        console.log(response.data);
        if (response.data.success){
          const token = response.data.token; //寫入cookie前先把值取出來(token 和 expired的值) (登入後打開Network 會有token 和 expired這兩個值)
          const expired = response.data.expired;
          console.log(token, expired);//把這兩個值寫到cookie裡面
          document.cookie = `someCookieName=${token}; expires=${new Date(expired)};`; //存取、寫入cookie
            vm.$router.push('/admin/products');
        }
      });
    }
    }
}
</script>

<style scoped>
html,
body {
  height: 100%;
  
}

body {
  display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  -ms-flex-align: center;
  -ms-flex-pack: center;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: 0px auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
header.jumbotron {
    background-image: url(https://i.imgur.com/ArAhKSL.jpg);
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    color: green;
    margin-bottom: 0px;
    height: 720px;
    padding: 80px;
  }
input#inputEmail.form-control {
  padding: 8px;
  border-radius: 8px 8px 8px 8px;
  background-color: rgba(255, 255, 255, 0.3);
  border: solid 1px white;
  
}
input#inputPassword.form-control {
  margin-top: 20px;
  margin-bottom: 40px;
  padding: 8px;
  border-radius: 8px 8px 8px 8px;
  background-color: rgba(255, 255, 255, 0.3);
  border: solid 1px white;
}
button.btn.btn-primary.btn-sm {
  background-color: rgba(237, 28, 36, 1);
  border: none;
  border-radius: 20px 20px 20px 20px;
  padding: 8px 20px;
  letter-spacing: 2px;
  text-align: center;
}
h1.h3.mb-3.font-weight-normal{
  color: white;
  font-family: 'Noto Serif TC', serif;
  text-align: center;
  letter-spacing: 2px;
}
@media screen and (max-width: 600px){
     header.jumbotron {
          padding-top: 25%;
      }
  }

</style>

