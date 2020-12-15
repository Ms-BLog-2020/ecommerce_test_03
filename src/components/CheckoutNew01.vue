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
            <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@300&display=swap">
        </head>

        <body>
           
         
          <header class="jumbotron">
            <div class="container">
              <div class="row">
                <div class="block"></div>
                <div class="col-md-12 col-icon"><img src="https://i.imgur.com/YiEgjNa.png" alt=""/></div>
                <div class="col-md-12 col-navigation">
                  <div class="navigation">
                    <div class="home">
                      <div class="japanese">ホーム </div>
                      <div class="chinese">    首頁     </div>
                    </div><i class="fa fa-caret-right"> </i>
                    <div class="checkout_form">
                      <div class="japanese">支払い</div>
                      <div class="chinese"> 付款</div>
                    </div><i class="fa fa-caret-right"></i>
                    <div class="finish_order">
                      <div class="japanese">実施する</div>
                      <div class="chinese">完成</div>
                    </div>
                  </div>
                </div>
                <div class="col-md-12 col-checkout">
                <div class="row">
                  <div class="col-md-6 col-sm-12 col-buy">
                      <h4>測試</h4>
                      <hr/>
                      <ValidationObserver v-slot="{ invalid }">
                        <form @submit.prevent="createOrder">
                          <ValidationProvider rules="required|email" name="email" class="form-group" tag="div" v-slot="{ errors, classes, passed }">
                            <!-- 輸入框 -->
                            <label for="email">Email</label>
                            <input id="email" type="email" name="email" v-model="form.user.email"
                                  class="form-control" :class="classes">
                            <!-- 錯誤訊息 -->
                            <span class="invalid-feedback">{{ errors[0] }}</span>
                            <span v-if="passed" class="valid-feedback">Email 正確</span>
                          
                          </ValidationProvider>
                          <ValidationProvider rules="required" name="name" class="form-group" tag="div" v-slot="{ errors, classes, passed }">
                            <!-- 輸入框 -->
                            <label for="name">姓名</label>
                            <input id="name" type="text" name="name" v-model="form.user.name"
                                  class="form-control" :class="classes">
                            <!-- 錯誤訊息 -->
                            <span class="invalid-feedback">{{ errors[0] }}</span>
                            <span v-if="passed" class="valid-feedback">成功輸入</span>
                          </ValidationProvider>
                          <ValidationProvider rules="required" name="tel" class="form-group" tag="div" v-slot="{ errors, classes, passed }">
                            <!-- 輸入框 -->
                            <label for="tel">電話</label>
                            <input id="tel" type="text" name="tel" v-model="form.user.tel"
                                  class="form-control" :class="classes">
                            <!-- 錯誤訊息 -->
                            <span class="invalid-feedback">{{ errors[0] }}</span>
                            <span v-if="passed" class="valid-feedback">成功輸入</span>
                          </ValidationProvider>
                          <ValidationProvider rules="required" name="address" class="form-group" tag="div" v-slot="{ errors, classes, passed }">
                            <!-- 輸入框 -->
                            <label for="address">地址</label>
                            <input id="address" type="text" name="address" v-model="form.user.address"
                                  class="form-control" :class="classes">
                            <!-- 錯誤訊息 -->
                            <span class="invalid-feedback">{{ errors[0] }}</span>
                            <span v-if="passed" class="valid-feedback">成功輸入</span>
                          </ValidationProvider>
                          <div class="text-right">
                            <router-link to="/home" class="btn btn-secondary">繼續選購</router-link>
                            <button type="submit" class="btn btn-primary" :disabled="invalid">送出表單</button>
                          </div>
                        </form>
                      </ValidationObserver>
                  </div>
                  
                  <div class="col-md-6 col-sm-12 col-buy">
                        <h4>測試</h4>
                        <hr/>
                        <div class="card">
                        <div class="card-header" id="headingOne">
                            <h6 class="mb-0 d-flex align-items-center">
                            <a data-toggle="collapse" href="#collapseOne">
                                顯示購物車細節
                                <i class="fa fa-angle-down" aria-hidden="true"></i>
                            </a>
                            <span class="h3 ml-auto mb-0">{{ cart.total }}元</span>
                            </h6>
                        </div>
                        </div>
                        <div id="collapseOne" class="collapse mt-3">
                        <table class="table table-sm">
                            <thead>
                            <tr>
                                <th width="30"></th>
                                <th width="100"></th>
                                <th>商品名稱</th>
                                <th width="100">數量</th>
                                <th width="80">小計</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="item in cart.carts">
                                <td class="align-middle text-center">
                                <a class="text-muted" data-toggle="modal" data-title="刪除 金牌西裝 1 件" @click="deleteCart(item.id)">
                                    <i class="fa fa-trash-o" aria-hidden="true"></i>
                                </a>
                                </td>
                                <td class="align-middle">
                                </td>
                                <td class="align-middle">{{ item.product.title }}</td>
                                <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                                <td class="align-middle text-right">{{ item.final_total }}</td>
                            </tr>
                            <tr>
                                
                            </tr>
                            <tr>
                                <td colspan="4" class="text-right">合計</td>
                                <td class="text-right">
                                <strong>{{ cart.total }}元</strong>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        </div>
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
 
    
import $ from 'jquery'; //載入modal


// $('.dropdown-toggle').dropdown();


export default {
  
  mounted(){
      $(document).ready(function () {
      $('#removeModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget) // 選則當初觸發事件的按鈕
        var title = button.data('title') // 使用 data-* 來取得特定內容

        var modal = $(this)
        modal.find('.modal-title').text('確認' + title) // 寫入資料
      })
    });
  },
  data() {
    return {
      products: [],
      product: {}, //存放查看更多的Modal資料
      isLoading: false,
      status: {
        loadingItem: '', //存放產品id
      },
      cart: {},
      form: { //結構直接參考api設定的資料結構 存放顧客填寫的個人資料
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: ''
      }
    }
  },
  methods: {
    getProducts() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      vm.isLoading = true;
      this.$http.get(url).then((response) => {
        vm.products = response.data.products;
        console.log(response);
        vm.isLoading = false;
      });
    },
    getProduct(id) {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
      vm.isLoading = true;
      vm.status.loadingItem = id;
      this.$http.get(url).then((response) => {
        vm.product = response.data.product; //先讀取完資料後
        $('#productModal').modal('show'); //再將Modal打開
        console.log(response);
        vm.isLoading = false;  
        vm.status.loadingItem = ''; //Modal打開後將值替換成空的
      });
    },
    addtoCart(id,qty=1){ //ES6 預設值設定方法 qty=1
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      vm.status.loadingItem = id;
      const cart = { //定義資料結構
        product_id: id,
        qty,
      };
      this.$http.post(url, {data: cart}).then((response) => {
        console.log(response);
        vm.status.loadingItem = ''; //Modal打開後將值替換成空的
        vm.getCart(); //把購物車取得回來
        $('#productModal').modal('hide'); //加到購物車後關掉Modal
      });
    },
    getCart(){
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      vm.isLoading = true;
      this.$http.get(url).then((response) => {
        vm.cart= response.data.data;
        console.log(response);
        vm.isLoading = false;
      });
    },
    deleteCart(id){
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
      vm.isLoading = true;
      this.$http.delete(url).then((response) => {
         vm.getCart(); //這部我會忘記做 >> 刪除後重新取得購物車
        console.log(response);
        vm.isLoading = false;
    });
    },
    createOrder(){ //到上方綁定 >> @submit.prevent="createOrder"
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
      const order = vm.form; //這部會忘記做
      this.$http.post(url, { data: order }).then((response) => {
            console.log('訂單已建立', response);
            if (response.data.success) {
              vm.$router.push(`/customer_finish_pay/${response.data.orderId}`);
            }
          });
    }
  },
  created() { //取得資料要在這邊設定
    this.getProducts();
    this.getCart(); //把購物車取得回來
  },
};
               

</script>

<style>
  * {
  font-family: "Noto Serif JP", "Noto Serif TC";
  }

  h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6 {
    font-weight: bold;
  }

  header.jumbotron {
    text-align: center;
    background-image: url(https://res.klook.com/images/fl_lossy.progressive,q_65/c_fit,w_1295,h_720,f_auto/w_80,x_15,y_15,g_south_west,l_klook_water/activities/q75bagntcomdftmlz0pr/TeaCeremonyinHokkaido.webp);
    background-size: cover;
    background-position: center center;
    padding: 60px;
    color: green;
    height: 800px;
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
  header.jumbotron .col-icon img {
    width: 70px;
    padding-top: 15px;
    margin-bottom: 10px;
  }
  header.jumbotron .col-navigation .navigation {
    color: gray;
    opacity: 0.5;
    font-weight: 800;
    letter-spacing: 1px;
  }
  header.jumbotron .col-navigation .navigation .home, header.jumbotron .col-navigation .navigation i.fa.fa-caret-right, header.jumbotron .col-navigation .navigation .finish_order, header.jumbotron .col-navigation .navigation .checkout_form {
    display: inline-block;
    margin: 5px;
    letter-spacing: 2px;
  }
  header.jumbotron .col-navigation .navigation .japanese {
    font-size: 5px;
  }
  header.jumbotron .col-navigation .navigation .checkout_form {
    color: green;
    font-weight: 900;
  }


</style>