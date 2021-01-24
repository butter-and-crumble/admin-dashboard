<template>
	<v-app id="products">
		<v-data-table
			:headers="headers"
			:items="products"
			:items-per-page="5"
			class="elevation-1"
		>
			<template #item.id="{ item }">
				<router-link :to="{ name: 'Product', params: { id: item.id } }">
					<v-icon color="primary">article</v-icon>
				</router-link>
			</template>
		</v-data-table>
	</v-app>
</template>

<script lang="js">
    import DatePicker from 'v-calendar/lib/components/date-picker.umd'
    import * as fb from '@/plugins/firebase.ts'
    export default {
        data() {
			return {
				headers: [
					{
						text: 'Product',
						align: 'start',
						value: 'name',
					},
					{ text: 'Type', value: 'name' },
					{ text: 'Detail Page', value: 'id' },
				],
                products: [],
                attrs: [
                    {
                        key: 'today',
                        highlight: true,
                    }
                ]
            }
        },
        created(){
            const getProducts = fb.functions.httpsCallable('getProducts');


            fb.blackouts.onSnapshot(querySnapshot => {
                const blackouts = {}

                querySnapshot.forEach(doc => {
                    blackouts[doc.id] = doc.data()
                })

                getProducts().then(function(result) {
                    this.products = result.data.products
					console.log(this.products)
                    this.products.forEach(function(product){
                        if(blackouts[product.id] !== undefined){
                            product['range'] = {
                                start: new Date(1000 * blackouts[product.id].start.seconds),
                                end: new Date(1000 * blackouts[product.id].end.seconds)
							}
                        } else {
                            product['range'] = {
                                start: new Date(),
                                end: new Date()
                            }
                        }

                    })
                }.bind(this))
            })

        }
    }
</script>
<style scoped>
#product {
	width: 50%;
}
</style>
<!--
<style lang="scss" scoped>
@import "@/styles/components/blackouts.scss";
</style> -->
