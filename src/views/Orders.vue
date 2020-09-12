<template>
  <div class="orders">
    <h1>This is the orders page</h1>
    <label>Filter by Name:</label>
    <input class="form-control" v-model="filters.orderNumber.value"/>
    <v-table :filters="filters" :data="orders">
        <thead slot="head">
            <v-th sortKey="orderNumber">Order Number</v-th>
            <v-th sortKey="createdOn">Order Date</v-th>
            <th>Products</th>
            <th>Details</th>
        </thead>
        <tbody slot="body" slot-scope="{displayData}">
            <tr v-for="row in displayData" :key="row.id">
              <td>{{ row.orderNumber }}</td>
              <td>{{ new Date(row.createdOn).toLocaleDateString("en-US") }}</td>
              <td>
                  <li v-for="item in row.lineItems" :key="item.id">
                      {{item.productName}} | {{item.quantity}}
                  </li>
              </td>
              <td>{{ row.customerEmail }}</td>
            </tr>
        </tbody>
      </v-table>
  </div>
</template>

<script lang="js">
    import * as fb from '@/plugins/firebase.ts'
    export default {
        data() {
            return {
                orders: [],
                filters: {
                    orderNumber: { value: '', keys: ['orderNumber'] }
                }
            }
        },
        components: {
        },
        created(){
            const getOrders = fb.functions.httpsCallable('getOrders');
            getOrders().then(function(result) {
                this.orders = result.data.result
            }.bind(this));
        }
    }
</script>
<style lang="scss" scoped>
@import "@/styles/components/orders.scss";
</style>
