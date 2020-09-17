<template>
  <div class="orders">
      <Order
        v-for="order in orders"
        v-bind:details="order"
        :key="order.id"
        />
  </div>
</template>

<script lang="js">
    import * as fb from '@/plugins/firebase.ts'
    import Order from '@/components/Order.vue'
    export default {
        data() {
            return {
                orders: [],
            }
        },
        components: {
            Order
        },
        methods: {
            attachOrderModifiers: function(orders){
                orders.forEach((order) => {
                    const orderNumber = parseInt(order.orderNumber)
                    fb.orders.where("orderId", "==", orderNumber)
                        .get()
                        .then(function(querySnapshot) {
                            querySnapshot.forEach(function(doc) {
                                order.modifiers = doc.data();
                            });
                        })
                        .catch(function(error) {
                            console.log("Error getting documents: ", error);
                        });
                })
                return orders
            },
            getSquarespaceOrders: function(){
                const getOrders = fb.functions.httpsCallable('getOrders');
                return getOrders().then(result => result.data.result)
            },
            getOrdersWithModifiers: async function(){
                const sqsOrders = await this.getSquarespaceOrders()
                this.orders  = await this.attachOrderModifiers(sqsOrders)
            }
        },
        created(){
            this.getOrdersWithModifiers()
        }
    }
</script>
<style lang="scss" scoped>
@import "@/styles/components/orders.scss";
</style>
