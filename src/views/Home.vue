<template>
	<div id="home">
		{{orders}}
	</div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
	data() {
		return {
			orders: null
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
