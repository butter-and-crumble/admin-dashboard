<template>
    <div class="order">
        <h3>Order #{{details.orderNumber}}</h3>
        <div class="customer-info">
            <p><strong>Customer:</strong> {{details.billingAddress.firstName}} {{details.billingAddress.lastName}}</p>
            <p><strong>Email:</strong> {{details.customerEmail}}</p>
        </div>
        <div class="line-items" v-for="item in details.lineItems" :key="item.id">
        </div>
        <table class="line-item-table">
            <colgroup>
                <col width="10%">
                <col width="30%">
                <col width="10%">
                <col width="20%">
                <col width="20%">
                <col>
            </colgroup>
            <tr>
                <th></th>
                <th>Product</th>
                <th>QTY</th>
                <th>Pickup Day</th>
                <th>Pickup Time</th>
                <th></th>
            </tr>
            <tr class="line-item" v-for="item in details.lineItems" :key="item.id">
                <td><img width="50px" :src="item.imageUrl"/></td>
                <td>{{item.productName}}</td>
                <td>{{item.quantity}}</td>
                <td>August 12</td>
                <td>12:30</td>
                <td>
                    <button class="order-detail-button">
                        <img height="100%" src="@/assets/toc-24px.svg"/>
                    </button>
                </td>
                <!-- <td><button>...</button></td> -->
            </tr>
        </table>
        <button @click="orderCompleted($event)">Mark Completed</button>
    </div>
</template>

<script>
    export default {
        name: 'order',
        props:  ['details'],
        methods: {
            orderCompleted: function(e){
                console.log(this.details)
                this.$el.classList.toggle('completed')
                e.target.innerText = "Completed"
                setTimeout(function(){
                    e.target.innerText = "Mark Incomplete"
                }, 3000)
            }
        }
    }
</script>

<style lang="scss" scoped>
@import "@/styles/components/order.scss";
</style>
