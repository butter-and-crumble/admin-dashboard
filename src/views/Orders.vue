<template>
	<v-data-table
		:headers="headers"
		:items="orders"
		:items-per-page="5"
		class="elevation-1"
	></v-data-table>
</template>

<script lang="js">
    import * as fb from '@/plugins/firebase.ts'
    export default {
        data() {
            return {
				headers: [
					{
						text: 'Order Number',
						align: 'start',
						value: 'orderNumber',
					},
					{ text: 'Item', value: 'createdOn' },
					{ text: 'Quantity', value: 'createdOn' },
					{ text: 'Order Date', value: 'createdOn' },
					{ text: 'Pickup Date', value: 'fat' },
					{ text: 'Details', value: 'carbs' },
				],
                orders: [],
            }
        },
        // components: {
        //     Order
        // },
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
				console.log(this.orders)
            }
        },
        created(){
            this.getOrdersWithModifiers()
        }
    }
</script>
<!--
<style lang="scss" scoped>
@import "@/styles/components/orders.scss";
</style> -->
