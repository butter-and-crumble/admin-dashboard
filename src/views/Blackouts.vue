<template>
	<div class="blackouts">
		<v-card
			class="d-flex flex-wrap justify-space-around"
			color="lighten-2"
			flat
			tile
		>
			<v-card
				v-for="item in products"
				:key="item.id"
				class="pa-md-4 ma-2 mt-md-4 lg text-center rounded-lg"
				outlined
				:elevation="1"
				tile
			>
				<p class="text-center font-weight-bold">{{item.name}}</p>
				<div class="calendar-container">
					<DatePicker
					:attributes='attrs'
					:value="null"
					:min-date='new Date()'
					v-model="item['range']"
					mode='range'
					color="indigo"
					is-expanded
					is-inline
					/>
				</div>
				<v-btn color="mt-md-4 primary" @click="changeBlackout($event, item.id, item['range'])">Submit</v-btn>
			</v-card>
		</v-card>
  </div>
</template>

<script lang="js">
    import DatePicker from 'v-calendar/lib/components/date-picker.umd'
    import * as fb from '@/plugins/firebase.ts'
    export default {
        data() {
            return {
                products: null,
                attrs: [
                    {
                        key: 'today',
                        highlight: true,
                    }
                ]
            }
        },
        components: {
            DatePicker
        },
        methods: {
            changeBlackout: function(e, id, range){
                fb.blackouts.doc(id).set({
                    start: range.start,
                    end: range.end
                })
                .then(function(){
                    e.target.innerText = "Submitted"
                    setTimeout(function(){
                        e.target.innerText = "Submit"
                    }, 1000)
                })
                .catch(function(error){
                    console.error("Error writing document: ", error);
                })
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
