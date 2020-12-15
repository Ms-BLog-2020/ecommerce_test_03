<template>
    <div>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
            <title>六角血拼賣賣</title>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
            <!-- Bootstrap CSS -->
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB"
                crossorigin="anonymous">
            <link rel="stylesheet" href="custom.css">
            <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@300&display=swap">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@300&family=Noto+Serif+JP&family=Noto+Serif+TC:wght@300&display=swap" >
            <link href="/css/phone.css" rel="stylesheet" type="text/css" media="screen and (max-width: 600px)" />
        </head>

        <body>
           
         
          <header class="jumbotron">
            <div class="container">
              <div class="row">
                <div class="block"></div>
                <div class="col-md-12 col-icon">
                  <div class="navigation">
                    <img class="tea" src="https://i.imgur.com/YiEgjNa.png" alt=""/>
                    <div class="home">
                      <div class="japanese">ホーム </div>
                      <div class="chinese">首頁     </div>
                    </div><i class="fa fa-caret-right"> </i>
                    <div class="checkout_form">
                      <div class="japanese">入る</div>
                      <div class="chinese">輸入</div>
                    </div><i class="fa fa-caret-right"></i>
                    <div class="finish_order">
                      <div class="japanese">支払い</div>
                      <div class="chinese">付款</div>
                    </div>
                  </div>
                </div>
                <div class="col-md-12 col-checkout">
                <div class="row">
                  <div class="col-md-6 col-sm-12 col-buy-left">
                    <h4>確認購物清單</h4>
                    <form  @submit.prevent="payOrder">
                      <table class="table table-sm">
                      <thead>
                          <tr>
                          <th width="80">商品名稱</th>
                          <th></th>
                          <th width="100">數量</th>
                          <th width="80">小計</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr v-for="item in order.products" :key="item.id" >
                          
                          <td class="align-middle">{{item.product.title}}</td>
                          <td class="align-middle"></td>
                          <td class="align-middle">{{item.product.num}}/{{item.product.unit}}</td>
                          <td class="align-middle text-right">${{ item.final_total }}元</td>
                          </tr>
                          <tr>
                          <td colspan="3" class="text-right">合計</td>
                          <td class="text-right">
                              <strong>${{order.total}}元</strong>
                          </td>
                          </tr>
                      </tbody>
                      </table>
                      
                  </form>
                  </div>
                  <div class="col-md-6 col-sm-12 col-buy-right">
                      <h4>確認個人資料</h4>
                      <form @submit.prevent="payOrder">
                          <table class="table">
                            <tbody>
                                <tr>
                                <th width="200">Email</th>
                                <td>{{order.user.email}}</td>
                                </tr>
                                <tr>
                                <th>姓名 </th>
                                <td>{{order.user.name}}</td>
                                </tr>
                                <tr>
                                <th>電話 </th>
                                <td>{{order.user.tel}}</td>
                                </tr>
                                <tr>
                                <th>地址 </th>
                                <td>{{order.user.address}}</td>
                                </tr>
                            </tbody>
                            </table>
                            <div class="text-right" v-if="order.is_paid === false">
                                <button type="submit" class="btn btn-danger" >確認付款</button>
                            </div>
                      </form>
                  </div>
                  
                  
                  </div>
                </div>




              </div>
            </div>
          </header>

            
        </body>
    </div>
</template>

<script>
export default {
    data(){
          return{
              orderId: '',
              order: {
                  user:{}
              },
              
          }
      },
      methods:{
          getOrder(){
              const vm = this;
              const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order/${vm.orderId}`;
              vm.isLoading = true;
              this.$http.get(url).then((response) => {
                  vm.order= response.data.order;
                  console.log(response);
                  vm.isLoading = false;
          });
          },
          payOrder(){
              const vm = this;
              const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/pay/${vm.orderId}`;
              vm.isLoading = true;
              this.$http.post(url).then((response) => {
                  console.log(response);
                  if (response.data.success){
                      vm.getOrder();
                  }
                  vm.isLoading = false;
          });
          }
      },
      created(){
          this.orderId=this.$route.params.orderId;
          console.log(this.orderId);
          this.getOrder();
      }
  }
</script>



<style>
  
  * {
    font-family: "M PLUS Rounded 1c", "Noto Serif TC";
  }
  html {
  height: 100%; }

 
  h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6 {
    font-weight: bold;
  }

  header.jumbotron {
    background-image: url(https://res.klook.com/images/fl_lossy.progressive,q_65/c_fit,w_1295,h_720,f_auto/w_80,x_15,y_15,g_south_west,l_klook_water/activities/q75bagntcomdftmlz0pr/TeaCeremonyinHokkaido.webp);
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    color: green;
    margin-bottom: 0px;
    height: 720px;
    
  }
  header.jumbotron .block {
    padding: 300px;
    width: 80%;
    background-color: white;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    margin-top: 0%;
    box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.5);
    opacity: 0.9;
  }
  header.jumbotron .col-icon {
    height: 100px;
  }
  header.jumbotron .col-icon img.tea, header.jumbotron .col-icon .home, header.jumbotron .col-icon i.fa.fa-caret-right, header.jumbotron .col-icon .finish_order, header.jumbotron .col-icon .checkout_form {
    display: inline-block;
    margin: 5px;
    letter-spacing: 2px;
  }
  header.jumbotron .col-icon .navigation {
    color: gray;
    font-weight: 700;
    letter-spacing: 1px;
    margin-top: 20px;
  }
  header.jumbotron .col-icon .navigation .japanese {
    font-size: 5px;
  }
  header.jumbotron .col-icon .navigation .finish_order {
    color: green;
    font-weight: 900;
  }
  header.jumbotron .col-icon img {
    width: 70px;
    padding-bottom: 20px;
    opacity: 1;
  }
  
  header.jumbotron .col-checkout .col-buy-left {
    padding: 25px
  }
  header.jumbotron .col-checkout .col-buy-right {
    padding: 25px
  }
  button.btn.btn-danger {
    border-radius: 20px 20px 20px 20px;
    padding: 5px 20px;
    margin: 0px 3px;
  }
  @media screen and (max-width: 600px){
      header.jumbotron {
          height: 2000px;
          background-size: auto 100%;
      }
      header.jumbotron .block{
          height: 2300px;
          padding: 0px;
          width: 95%;
          margin-bottom: 0%
          
      }
  }


</style>