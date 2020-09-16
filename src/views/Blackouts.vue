<template>
  <div class="blackouts">
    <div class="product" v-for="item in products" :key="item.id" >
        <h3>{{item.name}}</h3>
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
        <button @click="changeBlackout($event, item.id, item['range'])">Submit</button>
    </div>
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
<style lang="scss" scoped>
@import "@/styles/components/blackouts.scss";
</style>
