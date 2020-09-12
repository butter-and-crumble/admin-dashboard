<template>
  <div class="blackouts">
    <div class="product" v-for="item in products" :key="item.id" >
        <h3>{{item.name}}</h3>
        <div class="calendar-container">
            <DatePicker
              :attributes='attrs'
              :value="null"
              v-model="range"
              mode='range'
              color="indigo"
              is-expanded
              is-inline
              />
        </div>
        <button>Submit</button>
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
                range: {
                    start: new Date(2020, 8, 16),
                    end: new Date(2020, 8, 20)
                },
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
        created(){
            const getProducts = fb.functions.httpsCallable('getProducts');
            getProducts().then(function(result) {
                this.products = result.data.products
            }.bind(this))

            fb.blackouts.onSnapshot(querySnapshot => {
                const blackoutsObj = {}

                querySnapshot.forEach(doc => {
                    blackoutsObj[doc.id] = doc.data()
                })
            })
        }
    }
</script>
<style lang="scss" scoped>
@import "@/styles/components/blackouts.scss";
</style>
