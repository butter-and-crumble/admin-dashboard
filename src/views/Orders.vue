<template>
	<v-data-table
		:headers="headers"
		:items="orders"
		:items-per-page="5"
		class="elevation-1"
	>
		<template v-slot:item.lineItems="{ item }">
			<span>{{item.id}}</span>
		</template>
		<!-- <template #item.id="{ item }">
			<router-link :to="{ name: 'Order', params: { id: item.id } }">
				<v-icon color="primary">article</v-icon>
			</router-link>
		</template> -->
	</v-data-table>
</template>

<script lang="js">
import { mapGetters } from 'vuex'

    export default {
        data() {
            return {
				orders: [],
				headers: [
					{
						text: 'Order Number',
						align: 'start',
						value: 'orderNumber',
					},
					{ text: 'Item', value: 'item' },
					{ text: 'Quantity', value: 'quantity' },
					{ text: 'Order Date', value: 'orderDate' },
					{ text: 'Pickup Date', value: 'pickupDate' },
					{ text: 'Pickup Time', value: 'modifier.dateTime.value.time' },
					{ text: 'Details', value: 'modifier.writing.value' },
				],
            }
        },
		computed: {
			...mapGetters('orders', ['getOrders'])
		},
		async created(){
			this.orders = await this.getOrders
			console.log(this.orders)
		}
    }
</script>
<!--
<style lang="scss" scoped>
@import "@/styles/components/orders.scss";
</style> -->
