<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <div class="row mb-4 mt-4">
            <div class="col-md-4 mb-4" v-for="item in products" :key="item.id" >
                <div class="card border-0 shadow-sm">
                    <div style="height: 150px; background-size: cover; background-position: center"
                    :style="{backgroundImage:`url(${item.imageUrl})`}"
                    >
                    </div>
                    <div class="card-body">
                    <span class="badge badge-secondary float-right ml-2">{{item.category}}</span>
                    <h5 class="card-title">
                        <a href="#" class="text-dark">{{item.title}}</a>
                    </h5>
                    <p class="card-text">{{item.content}}</p>
                    <div class="d-flex justify-content-between align-items-baseline">
                        <!-- <div class="h5">2,800 元</div> -->
                        <del class="h6">原價 {{item.origin_price}} 元</del>
                        <div class="h5">現在只要 {{item.price}} 元</div>
                    </div>
                    </div>
                    <div class="card-footer d-flex">
                    <button type="button" class="btn btn-outline-secondary btn-sm" @click="getProduct(item.id)">
                        <i class="fas fa-spinner fa-spin"  v-if="status.loadingItem === product.id"></i>
                        查看更多
                    </button>
                    <button type="button" class="btn btn-outline-danger btn-sm ml-auto" @click="addtoCart(item.id)">
                        <i class="fas fa-spinner fa-spin"></i>
                        加到購物車
                    </button>
                    </div>
                </div>
            </div>
        </div>
        <table class="table mt-4">
         <thead>
          <tr>
            <th></th>
            <th class="align-middle">購買商品</th>
            <th class="align-middle">數量</th>
            <th class="align-middle text-right">價錢</th>
          </tr>
         </thead>
            <tbody>
                <tr v-for="item in cart.carts" :key="item.id" v-if="cart.carts">
                  <button type="button" class="btn btn-outline-danger btn-sm mt-4" @click="deleteCart(item.id)">
                    <td><i class="fas fa-trash-alt"></i></td>
                  </button>
                  <td class="align-middle">
                    {{ item.product.title }}
                    <!-- <div class="text-success" v-if="item.coupon">
                      已套用優惠券
                    </div> -->
                  </td>
                  <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                  <td class="align-middle text-right">{{ item.final_total }}</td> 
                </tr>
            </tbody>
            <tfoot>
              <tr>
                  <td class="text-right">總計{{cart.total}}</td>
              </tr>
            </tfoot>
        </table>
        <!-- 優化表單 -->
        <table class="table">
          <thead>
            <th></th>
            <th>品名</th>
            <th>數量</th>
            <th>單價</th>
          </thead>
          <tbody>
            <tr v-for="item in cart.carts">
              <td class="align-middle">
                <button type="button" class="btn btn-outline-danger btn-sm" @click="deleteCart(item.id)">
                  <i class="far fa-trash-alt"></i>
                </button>
              </td>
              <td class="align-middle">
                {{ item.product.title }}
                <!-- <div class="text-success" v-if="item.coupon">
                  已套用優惠券
                </div> -->
              </td>
              <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
              <td class="align-middle text-right">{{ item.final_total }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" class="text-right">總計</td>
              <td class="text-right">{{ cart.total }}</td>
            </tr>
          </tfoot>
        </table>
       

        <!-- Modal -->
        <div class="modal fade" id="productModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">{{product.title}}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <select name="" class="form-control mt-3" v-model="product.num">
                      <option :value="num" v-for="num in 10" :key="num">
                        選購{{num}} {{product.unit}}
                      </option>
                    </select>
                </div>
                <div class="modal-footer">
                  <div class="text-muted text-nowrap mr-3">
                    小計
                    <strong>
                      {{product.price * product.num}}
                    </strong>
                    元
                  </div>
                  <button type="button" class="btn btn-primary" @click="addtoCart(product.id, product.num)">
                    <i class="fas fa-spinner fa-spin"  v-if="status.loadingItem === product.id"></i>
                    加到購物車
                  </button>
                </div>
                </div>
            </div>
        </div>
        <!-- 客戶表單填寫 -->
        <div class="my-5 row justify-content-center">
          <validation-observer v-slot="{ invalid }" class="col-md-6">
            <form  @submit.prevent="createOrder">
              <div class="form-group">
                <label for="useremail">Email</label>
                <input type="email" class="form-control" name="email" id="useremail"
                  v-model="form.user.email" placeholder="請輸入 Email" required v-validate="'required|email'">
                <span class="text-danger" v-if="errors.has('email')">{{errors.first('email')}}</span>
              </div>

              <validation-provider rules="required|email" v-slot="{ errors,classes }"> <!--從元件導出內容給內層slot使用可用v-slot-->
                <!-- 輸入框 -->
                <label for="email">Email</label>
                <input id="email" type="email" name="email" v-model="form.user.email"
                    class="form-control" :class="classes">
                <!-- 錯誤訊息 -->
                <span class="invalid-feedback">{‌{ errors[0] }}</span>
              </validation-provider>
            
              <div class="form-group">
                <label for="username">收件人姓名</label>
                <input type="text" class="form-control" name="name" id="username"
                  v-model="form.user.name" placeholder="輸入姓名" v-validate="'required'"
                  :class="{'is-invalid':errors.has('name')}">
                <span class="text-danger" v-if="errors.has('name')">必須輸入姓名</span>
              </div>

              <div class="text-right">
                <button class="btn btn-danger" :disabled="invalid">
                送出訂單
                </button>
              </div>
            
            </form>

          </validation-observer>
          
        </div>
    </div>
</template>

<script>
import $ from 'jquery'; //載入modal

export default {
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
      // vm.isLoading = true;
      vm.status.loadingItem = id;
      this.$http.get(url).then((response) => {
        vm.product = response.data.product; //先讀取完資料後
        $('#productModal').modal('show'); //再將Modal打開
        console.log(response);
        // vm.isLoading = false;  
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
      // vm.isLoading = true;
      this.$http.delete(url).then((response) => {
         vm.getCart(); //這部我會忘記做 >> 刪除後重新取得購物車
        console.log(response);
        // vm.isLoading = false;
    });
    },
    createOrder(){ //到上方綁定 >> @submit.prevent="createOrder"
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
      const order = vm.form; //這部會忘記做
      // vm.isLoading = true;
      this.$validator.validate().then((result)=>{
        if (result){
            this.$http.post(url,{data:order}).then((response) => {
            // vm.getCart(); 
            console.log('訂單已建立',response);
            // vm.isLoading = false;
          })
          }
          else{
            console.log('欄位不完整');
          }
      
      
    });
    },
  },
  created() { //取得資料要在這邊設定
    this.getProducts();
    this.getCart(); //把購物車取得回來
  },
};
</script>