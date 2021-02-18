<template>
    <v-card
      elevation="2"
      v-if="data.item"
    >
        <v-card-title>{{data.item}}</v-card-title>
        <v-card-subtitle>Order Number: {{data.orderNumber}}</v-card-subtitle>

        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Customer</v-list-item-title>
            <v-list-item-subtitle>{{data.sqs.firstName}} {{data.sqs.lastName}}</v-list-item-subtitle>
            <v-list-item-subtitle>{{data.sqs.customerEmail}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line v-if="data.modifier.dateTime.needed">
          <v-list-item-content>
            <v-list-item-title>Pickup</v-list-item-title>
            <v-list-item-subtitle>{{data.pickupDate}}</v-list-item-subtitle>
            <v-list-item-subtitle>{{data.modifier.dateTime.value.time}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line v-if="data.modifier.writing.needed">
          <v-list-item-content>
            <v-list-item-title>Custom Writing</v-list-item-title>
            <v-list-item-subtitle>{{data.modifier.writing.value}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>{{data.variants.find(e => e.optionName === "Meri Meri Candles").optionName}}</v-list-item-title>
            <v-list-item-subtitle>{{data.variants.find(e => e.optionName === "Meri Meri Candles").value}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
    </v-card>
</template>

<script>
    export default {
        name: 'order',
        data() {
            return {
                data: {}
            }
        },
        async created(){
            this.data = this.$route.params.order
        },
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
<!--
<style lang="scss" scoped>
@import "@/styles/components/order.scss";
</style> -->
