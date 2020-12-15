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
        </head>

        <body>
            <!-- headers -->
            
            <nav class="navbar navbar-light bg-light">
                <a class="navbar-brand" href="shoppingCart.html">
                <i class="fa fa-heart text-info" aria-hidden="true"></i>
                六角血拼賣賣
                </a>
            </nav>
            <div class="container main-contant py-5">
                <h1 class="text-center mb-3 text-secondary">六角血拼 結帳</h1>
                <section class="form-row align-items-center text-center">
                    <div class="col">
                        <div class="alert alert-success alert-rounded mb-0" role="alert">
                        1.輸入訂單資料
                        </div>
                    </div>
                    <div class="col">
                        <div class="alert alert-light alert-rounded mb-0" role="alert">
                        2.確認付款
                        </div>
                    </div>
                    <div class="col">
                        <div class="alert alert-light alert-rounded mb-0" role="alert">
                        3.完成購買
                        </div>
                    </div>
                </section>

                <section class="row justify-content-center mt-5">
                <div class="col-md-8">
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

                    <h5 class="py-3 mt-5 mb-2 text-center bg-light">
                    訂購人資訊
                    </h5>
                   
                   
                    <!-- 客戶表單填寫 -->
                    <div class="container">
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

                </div>
                </section>

            </div>
            <footer class="bg-light text-muted py-5">
                <div class="container">
                <ul class="list-inline text-center">
                    <li class="list-inline-item">© Copright 2017 六角血拼賣賣</li>
                    <li class="list-inline-item">
                    <a class="text-info" href="#">
                        <i class="fa fa-instagram" aria-hidden="true"></i> Instagrame</a>
                    </li>
                    <li class="list-inline-item">
                    <a class="text-info" href="#">
                        <i class="fa fa-facebook-square" aria-hidden="true"></i> Facebook</a>
                    </li>
                    <li class="list-inline-item">
                    <a class="text-info" href="#">About</a>
                    </li>
                </ul>
                <p class="text-center">Made with Bootstrap4</p>
                </div>
            </footer>

            <div class="modal fade" id="removeModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header bg-danger text-white">
                    <h5 class="modal-title">刪除商品</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                    <div class="modal-body">
                    <p>是否確認刪除商品</p>
                    </div>
                    <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">否</button>
                    <button type="button" class="btn btn-outline-danger px-5">是</button>
                    </div>
                </div>
                </div>
            </div>

            
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