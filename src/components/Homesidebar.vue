<template>
    <div>
        <section class="button sticky-top">
              <div class="container">
                <div class="row  ">
                  <div class="col-md-12 ">

                    <router-link class="col-md-3 col-category" to="/home" tag="div">
                      <h4>茶道體驗</h4>
                      <div class="line"></div>
                    </router-link>

                    <router-link class="col-md-3 col-category" to="/customer_orders_b" tag="div">
                      <h4>必備茶具</h4>
                      <div class="line"></div>
                    </router-link>

                    <router-link class="col-md-3 col-category" to="/customer_orders_c" tag="div">
                      <h4>相關書籍</h4>
                      <div class="line"></div>
                    </router-link>

                  </div>
                </div>
              </div>
            </section>
    </div>
</template>

<style>
  h4 {
    letter-spacing: 1px;
    padding-top: 5px;
    margin-bottom: 0px;
    cursor: pointer;
  }
</style>

