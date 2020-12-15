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
            <div class="row justify-content-center">
            <div class="col-md-8">
                <h1 class="text-center mb-3 text-secondary">六角血拼 結帳完成</h1>
                <section class="form-row align-items-center text-center">
                <div class="col">
                        <div class="alert alert-light alert-rounded mb-0" role="alert">
                        1.輸入訂單資料
                        </div>
                    </div>
                    <div class="col" v-if="order.is_paid === false">
                        <div class="alert alert-success alert-rounded mb-0" role="alert" >
                        2.確認付款
                        </div>
                    </div>
                    <div class="col" v-if="order.is_paid === true">
                        <div class="alert alert-light alert-rounded mb-0" role="alert">
                        2.確認付款
                        </div>
                    </div>
                    <div class="col" v-if="order.is_paid === false">
                        <div class="alert alert-light alert-rounded mb-0" role="alert">
                        3.完成購買
                        </div>
                     </div>
                    <div class="col" v-if="order.is_paid === true">
                        <div class="alert alert-success alert-rounded mb-0" role="alert" >
                        3.完成購買
                        </div>
                    </div>
                    
                </section>
            <form  @submit.prevent="payOrder">

                <h4 class="text-center my-4">購買資訊</h4>
                <table class="table table-sm">
                <thead>
                    <tr>
                    <th width="100"></th>
                    <th>商品名稱</th>
                    <th width="100">數量</th>
                    <th width="80">小計</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in order.products" :key="item.id" >
                    
                    <td class="align-middle"></td>
                    <td class="align-middle">{{item.product.title}}</td>
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
                <hr>
                <h4 class="text-center my-4">個人資料</h4>
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