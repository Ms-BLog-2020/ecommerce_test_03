<template>
    <div>

        <loading :active.sync="isLoading"></loading>
        <div class="row mb-4 mt-4 ">
            <div class="col-md-4 mb-4 card-body " v-for="item in products" :key="item.id"  v-if="item.category==='必備茶具'">
                <div class="card border-0 shadow-sm">
                    <div class="card_img" style="height: 150px; background-size: cover; background-position: center"
                    :style="{backgroundImage:`url(${item.imageUrl})`}"
                    >
                    </div>
                    <div class="card-body ">
                    <h5 class="card-title">
                        <a href="#" class="text-dark">{{item.title}}</a>
                    </h5>
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
        
        

        <!-- Modal -->
        <div class="modal fade" id="productModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog shadow-longer">
                
                <div class="modal-content">
                
                
                <div class="modal-body top">
                    <div class="product-image" style="height: 250px; background-size: cover; background-position: center"
                    :style="{backgroundImage:`url(${product.imageUrl})`}">
                    </div>
                </div>
                
                <div class="text-center">
                <img class="circle" src="https://i.imgur.com/5e6ZLkp.png">
                <img class="tea-logo" src="https://i.imgur.com/bbK9tdf.png">
                </div>
                
                <div class="modal-body bottom">
                    
                    
                    
                    <div class="text-center title">
                    <h3 class="modal-title" id="exampleModalLabel">{{product.title}}</h3>
                    <h6 class="modal-text">{{product.description}}</h6>
                    <div class="badge badge-pill badge-secondary float-middle ml-2">{{product.category}}</div>
                    </div>
                    <p class="modal-text content">{{product.content}}</p>
                    <select name="" class="form-control mt-3" v-model="product.num">
                      <option :value="num" v-for="num in 10" :key="num">
                        選購{{num}} {{product.unit}}
                      </option>
                    </select>
                    <div class="text-muted text-nowrap mr-3">
                    小計 NTD
                    <strong>
                      {{product.price * product.num}}
                    </strong>
                      元
                    </div>
                    <div class="text-center">
                    <button type="button" class="btn btn-primary add-to-cart" @click="addtoCart(product.id, product.num)">
                      <i class="fas fa-spinner fa-spin"  v-if="status.loadingItem === product.id"></i>
                      加到購物車
                    </button>
                    </div>
                </div>
               
                </div>
            </div>
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
      
      
    },
    created() { //取得資料要在這邊設定
          this.getProducts();
          this.getCart(); //把購物車取得回來
        },
      };
</script>

<style>
.modal-body.top {
  padding: 0px;
}
section.button.sticky-top {
  padding-bottom: 15px;
}
.card_img {
  border-radius: 8px 8px 0px 0px;
}
.text-muted.text-nowrap.mr-3 {
  padding: 20px 0px;
  text-align: center;
}
button.btn.btn-primary.add-to-cart {
  border-radius: 25px 25px 25px 25px;
  background-color: rgba(83, 71, 65, 1);
  position: relative;
  margin-right: auto;
  margin-left: auto;
  border: none;
  text-align: center;
}
.text-center.title {
  padding: 15px 25px;
  padding-top:50px;
}
.modal-text.content {
  line-height: 32px;
  letter-spacing: 1px;
}
.modal-body.bottom {
  padding: 0px 30px;
  padding-top: -50px;
  padding-bottom: 20px;
}
h3#exampleModalLabel.modal-title {
  letter-spacing: 1px;
}
.circle {
  width: 80px;
  height: 80px;
  border-radius: 100%;
  position: absolute;
  background-color: white;
  transform: translate(-50%,-30%);
}
img.tea-logo {
  width: 13%;
  position: absolute;
  text-align: center;
  transform: translate(-50%,-25%);
}
.product-image {
  border-radius: 8px 8px 0px 0px;
}
.modal-content {
  border-radius: 50px 50px 0px 0px;
}
button.btn.btn-outline-secondary.btn-sm {
  border-radius: 30px;
}
button.btn.btn-outline-danger.btn-sm.ml-auto {
  border-radius: 30px;
}
.badge.badge-pill.badge-secondary.float-middle.ml-2 {
  font-weight: 500;
  letter-spacing: 1px;
}

</style>