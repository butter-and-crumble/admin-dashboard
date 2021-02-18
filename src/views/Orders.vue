<template>
	<v-data-table
		:headers="headers"
		:items="orders"
		:items-per-page="5"
		class="elevation-1"
	>
		<template #item.id="{ item }">
			<router-link :to="{ name: 'Order', params: { id: item.id, order: item} }">
				<v-icon color="primary">article</v-icon>
			</router-link>
		</template>
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
					{ text: 'Details', value: 'id' },
				],
            }
        },
		computed: {
			...mapGetters('orders', ['getOrders'])
		},
		async created(){
			this.orders = await this.getOrders
		}
    }
</script>
