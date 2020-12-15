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
            <!-- 購物車內的數量 (Button 內包含 icon, 數量 badge) -->
            <div class="dropdown ml-auto">
            <button class="btn btn-sm btn-cart" data-toggle="dropdown" data-flip="false">
                <i class="fa fa-shopping-cart text-dark fa-2x" aria-hidden="true"></i>
                <span class="badge badge-pill badge-danger">9</span>
                <span class="sr-only">unread messages</span>
            </button>
            <div class="dropdown-menu dropdown-menu-right p-3" style="min-width: 300px" data-offset="400">
                <h6>已選擇商品</h6>
                <table class="table table-sm">
                <tbody>
                    <tr>
                    <td class="align-middle text-center">
                        <a href="#removeModal" class="text-muted" data-toggle="modal" data-title="刪除 金牌西裝 1 件">
                        <i class="fa fa-trash-o" aria-hidden="true"></i>
                        </a>
                    </td>
                    <td class="align-middle">金牌西裝</td>
                    <td class="align-middle">1 件</td>
                    <td class="align-middle text-right">$520</td>
                    </tr>
                    <tr>
                    <td class="align-middle text-center">
                        <a href="#removeModal" class="text-muted" data-toggle="modal" data-title="刪除 金牌女裝 1 件">
                        <i class="fa fa-trash-o" aria-hidden="true"></i>
                        </a>
                    </td>
                    <td class="align-middle">金牌女裝</td>
                    <td class="align-middle">1 件</td>
                    <td class="align-middle text-right">$480</td>
                    </tr>
                </tbody>
                </table>
                <a href="shoppingCart-checkout.html" class="btn btn-primary btn-block">
                <i class="fa fa-cart-plus" aria-hidden="true"></i> 結帳去
                </a>
            </div>
            </div>
        </nav>
        <div class="container main-contant mb-1">
            <nav aria-label="breadcrumb" role="navigation">
            <ol class="breadcrumb bg-transparent pl-0">
                <li class="breadcrumb-item">
                <a href="#">首頁</a>
                </li>
                <li class="breadcrumb-item">
                <a href="#">金牌專賣店</a>
                </li>
                <li class="breadcrumb-item active" aria-current="page">金牌西裝</li>
            </ol>
            </nav>
            <div class="row">
            <div class="col-md-4 mb-5">
                <div class="sticky-top" style="top: 10px;">
                <h1 class="h2">金牌西裝
                    <small class="text-muted">(加拉哈德版)</small>
                </h1>
                <div class="d-flex my-3 align-items-end justify-content-end">
                    <del class="text-muted">售價 $1299</del>
                    <div class="h3 mb-0 ml-auto text-danger">
                    <small>網路價 NT$</small>
                    <strong>520</strong>
                    </div>
                </div>
                <hr> 尺寸:
                <div class="btn-group btn-group-sm btn-group-toggle" data-toggle="buttons">
                    <label class="btn btn-outline-secondary active">
                    <input type="radio" name="size" checked> SM
                    </label>
                    <label class="btn btn-outline-secondary">
                    <input type="radio" name="size"> M
                    </label>
                    <label class="btn btn-outline-secondary disabled">
                    <input type="radio" name="size" disabled> L
                    </label>
                    <label class="btn btn-outline-secondary">
                    <input type="radio" name="size"> XL
                    </label>
                </div>

                <div class="input-group mt-3">
                    <select name="" class="form-control mr-1" id="">
                    <option value="1">1 件</option>
                    <option value="2">2 件</option>
                    <option value="3">3 件</option>
                    </select>
                    <a href="shoppingCart-checkout.html" class="btn btn-primary">
                    <i class="fa fa-cart-plus" aria-hidden="true"></i> 加入購物車
                    </a>
                </div>

                <div class="mt-2 text-right text-muted">
                    <i class="fa fa-cc-visa" aria-hidden="true"></i>
                    <i class="fa fa-cc-jcb" aria-hidden="true"></i>
                    <i class="fa fa-cc-paypal" aria-hidden="true"></i>
                </div>

                </div>


            </div>
            <div class="col-md-8">
                <h2>帥氣的西裝無人能敵</h2>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little
                bit longer.</p>

                <h3 class="mt-5 text-center">合身剪裁</h3>
                <img src="https://images.unsplash.com/photo-1472417583565-62e7bdeda490?w=634" class="w-100" alt="">

                <h3 class="mt-5 text-center">簡單就好</h3>
                <img src="https://images.unsplash.com/photo-1497339100210-9e87df79c218?w=1500" class="w-100" alt="">

                <h3 class="mt-5 text-center">不佔空間</h3>
                <img src="https://images.unsplash.com/photo-1475530060488-75a6de1dca6f?w=675" class="w-100" alt="">
                <div class="alert alert-secondary mt-4" role="alert">
                <h2 class="text-center">購物說明</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, at! Totam, exercitationem repellat. Saepe facere
                    amet expedita perferendis voluptatem dicta dignissimos tempora ut atque, rerum doloribus? Magni, blanditiis.
                    Assumenda, distinctio!</p>
                </div>
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
        }

    }
</script>