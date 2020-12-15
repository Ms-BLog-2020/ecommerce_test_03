<template>
    <div>
        <loading :active.sync="isLoading"></loading>
       <div class="text-right mt-4">
        <button class="btn btn-primary" @click="openModal(true)">建立新的產品</button> 
       </div>
       <table class="table mt-4">
         <thead>
          <tr>
            <th width="120">分類</th>
            <th>產品名稱</th>
            <th width="120">原價</th>
            <th width="120">售價</th>
            <th width="100">是否啟用</th>
            <th width="80">編輯</th>
          </tr>
         </thead>
            <tbody>
                <tr v-for="(item, key) in products" :key="item.id">
                    <td>{{item.category}}</td>
                    <td>{{item.title}}</td>
                    <td class="text-right">{{item.origin_price | currency }}</td>
                    <td class="text-right">{{item.price | currency }}</td>
                    <td>
                     <span v-if="item.is_enabled" class="text-success">啟用</span>
                     <span v-else>未啟用</span>
                    </td>
                    <td>
                     <button class="btn btn-outline-success btn-sm" @click="openModal(false,item)">編輯</button>
                    </td>
                </tr>
            </tbody>

       </table>
       <!--分頁標籤-->
       <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item" :class="{'disabled':!pagination.has_pre}">
                <a class="page-link" href="#" aria-label="Previous" @click.prevent="getProducts(pagination.current_page - 1)">
                    <span aria-hidden="true">&laquo;</span>
                    <span class="sr-only">Previous</span>
                </a>
                </li>
                <li class="page-item" v-for="page in pagination.total_pages" :key="page" 
                :class="{'active':pagination.current_page===page}"
                @click.prevent="getProducts(page)">
                <a class="page-link" href="#">{{page}}</a>
                </li>
                <li class="page-item" :class="{'disabled':!pagination.has_next}">
                <a class="page-link" href="#" aria-label="Next" @click.prevent="getProducts(pagination.current_page + 1)">
                    <span aria-hidden="true">&raquo;</span>
                    <span class="sr-only">Next</span>
                </a>
                </li>
            </ul>
        </nav>
       <!-- Modal -->
       <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
  aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content border-0">
            <div class="modal-header bg-dark text-white">
                <h5 class="modal-title" id="exampleModalLabel">
                <span>新增產品</span>
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                <div class="col-sm-4">
                    <div class="form-group">
                    <label for="image">輸入圖片網址</label>
                    <input type="text" class="form-control" id="image"
                        placeholder="請輸入圖片連結" v-model="tempProduct.imageUrl">
                    </div>
                    <div class="form-group">
                    <label for="customFile">或 上傳圖片
                        <i class="fas fa-spinner fa-spin" v-if="status.fileUploading"></i>
                    </label>
                    <input type="file" id="customFile" class="form-control"
                        ref="files" @change="uploadFile">
                    </div>
                    <img img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                    class="img-fluid" alt="" :src="tempProduct.imageUrl">
                </div>
                <div class="col-sm-8">
                    <div class="form-group">
                    <label for="title">標題</label>
                    <input type="text" class="form-control" id="title"
                        placeholder="請輸入標題" v-model="tempProduct.title">
                    </div>

                    <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="category">分類</label>
                        <select class="form-control" id="category"
                        placeholder="請輸入分類" v-model="tempProduct.category">
                            <option>茶道體驗</option>
                            <option>必備茶具</option>
                            <option>相關書籍</option>
                        </select>
                    </div>
                    <div class="form-group col-md-6">
                        <label for="price">單位</label>
                        <input type="unit" class="form-control" id="unit"
                        placeholder="請輸入單位" v-model="tempProduct.unit" >
                    </div>
                    </div>

                    <div class="form-row">
                    <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                        <input type="number" class="form-control" id="origin_price"
                        placeholder="請輸入原價" v-model="tempProduct.origin_price">
                    </div>
                    <div class="form-group col-md-6">
                        <label for="price">售價</label>
                        <input type="number" class="form-control" id="price"
                        placeholder="請輸入售價" v-model="tempProduct.price">
                    </div>
                    </div>
                    <hr>

                    <div class="form-group">
                    <label for="description">產品描述</label>
                    <textarea type="text" class="form-control" id="description"
                        placeholder="請輸入產品描述" v-model="tempProduct.description"></textarea>
                    </div>
                    <div class="form-group">
                    <label for="content">說明內容</label>
                    <textarea type="text" class="form-control" id="content"
                        placeholder="請輸入產品說明內容" v-model="tempProduct.content"></textarea>
                    </div>
                    <div class="form-group">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox"
                        id="is_enabled" v-model="tempProduct.is_enabled" :true-value="1" :false-value="0">
                        <label class="form-check-label" for="is_enabled">
                        是否啟用
                        </label>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
            </div>
            </div>
        </div>
        </div>
        <div class="modal fade" id="delProductModal" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content border-0">
            <div class="modal-header bg-danger text-white">
                <h5 class="modal-title" id="exampleModalLabel">
                <span>刪除產品</span>
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                是否刪除 <strong class="text-danger"></strong> 商品(刪除後將無法恢復)。
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-danger"
                >確認刪除</button>
            </div>
            </div>
        </div>
      </div>
      
    </div>  
</template>

<script>
import $ from 'jquery'; //在main.js只有載入bootstrap 沒有載入jquery 所以這邊他不認得 要載入

export default {
    data(){
        return{
            products: [], //新增的資料都會存到products
            tempProduct: {}, //要送出的新產品欄位內容 欄位名稱對應api設定的欄位標題
            isNew: false,
            isLoading: false, //預設為停下來的狀態
            status: { //宣告變數來使用loading
                fileUploading: false, //需要到上方綁定icon
            },
            pagination: {}, //去console看它的結構資料就知道他是個物件
        }
    },
    methods: {
        getProducts(page=1){ //取得遠端資料的方法 //把Products存到宣告的products裡面 //將page傳進來 >> getProducts(page=1) 預設值帶第一頁進來
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products?page=${page}`; //${page} 設定變數
            const vm = this; //確保資料存到vm裡面
            console.log(process.env.APIPATH,process.env.CUSTOMPATH);
            vm.isLoading = true;
            this.$http.get(api).then((response) => {
            console.log(response.data);
            vm.isLoading = false;
            vm.products = response.data.products; //可以用Vue檢查一下資料有沒有get到
            vm.pagination = response.data.pagination;
            })
        },
        openModal(isNew, item){ //決定這份資歷是新的還是舊的
            if (isNew){
                this.tempProduct={};
                this.isNew=true
            }else{
                this.tempProduct=Object.assign({},item); //ES6寫法 將item寫入一個空的{}裡面 而this.temProduct不會直接和item有參考關係
                this.isNew=false
            }
            $('#productModal').modal('show');  //用methods的方式開啟Modal可以決定在什麼情況下才可以打開(原本是直接按按鈕就跳出Modal)
        },
        uploadFile(){
            console.log(this);
            const uploadedFile = this.$refs.files.files[0];
            const vm = this;
            const formData = new FormData();
            formData.append('file-to-upload',uploadedFile); //用append新增欄位file-to-upload 上傳檔案uploadFile
            const  api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/upload`;
            vm.status.fileUploading = true;
            this.$http.post(api, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((response)=>{
                console.log(response.data);
                vm.status.fileUploading = false;
                if (response.data.success){
                    vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl); //在vm.tempProduct強制寫入imageUrl這個欄位和response.data.imageUrl這個路徑
                }else{
                     this.$bus.$emit('message:push',response.data.message,'danger');

                }
            })
        },
        updateProduct(){
            let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product`; //更改為取得商品的api
            let httpMethod= 'post';
            const vm = this; //確保資料存到vm裡面
            if (!vm.isNew){ //假如資料不是新的就來改api
                api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
                httpMethod= 'put'
            }
            console.log(process.env.APIPATH,process.env.CUSTOMPATH);
            this.$http[httpMethod](api, {data: vm.tempProduct }).then((response) => { //post是將資料寫入 get是取得資料 
            console.log(response.data);
            // vm.products = response.data.products; //可以用Vue檢查一下資料有沒有get到
            if (response.data.success){ //如果成功的話
                $('#productModal').modal('hide'); //就會將modal關掉
                vm.getProducts();  //並重新取得一次資料
            }else{
                $('#productModal').modal('hide');
                vm.getProducts();
                console.log('新增失敗'); //console跳出錯誤訊息
            }
            })
        }
    },
    created(){
        this.getProducts();
    }
}
</script>



<style>
button.btn.btn-primary {
    background-color: green;
    border-radius: 20px 20px 20px 20px;
    padding: 5px 20px;
}
button.btn.btn-outline-secondary {
    border-radius: 20px 20px 20px 20px;
    padding: 5px 20px;
}
button.btn.btn-outline-success.btn-sm{
    border-radius: 20px 20px 20px 20px;
    padding: 5px 15px;
    
}
</style>
