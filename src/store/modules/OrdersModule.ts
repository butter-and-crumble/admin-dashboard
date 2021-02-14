import { Module } from "vuex";
import * as fb from '@/plugins/firebase.ts'

function attachOrderModifiers(orders: any, orderLines: any){
    orders.forEach((order: any) => {

        const orderNumber = parseInt(order.orderNumber)
        fb.orders.where("orderId", "==", orderNumber)
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    const orderModifiers = doc.data();
                    order.lineItems.forEach((line: any) => {
                        const lineModifier = orderModifiers[line.id]
                        const options = { year: "numeric", month: "long", day: "numeric" }
                        const formattedOrderDate = new Date(order.createdOn).toLocaleDateString(undefined, options)
                        const formattedPickupDate = new Date(lineModifier.dateTime.value.date).toLocaleDateString(undefined, options)
                        orderLines.push({
                            id: line.id,
                            orderNumber: order.orderNumber,
                            item: line.productName,
                            quantity: line.quantity,
                            orderDate: formattedOrderDate,
                            pickupDate: formattedPickupDate,
                            modifier: lineModifier
                        })
                    })
                });
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });
    })
    return orderLines
}

async function getSquarespaceOrders(){
    const getOrders = fb.functions.httpsCallable('getOrders');
    return getOrders().then(result => result.data.result)
}

async function getOrdersWithModifiers(){
    let orderLines: Array<any> = []
    const sqsOrders = await getSquarespaceOrders()
    orderLines = await attachOrderModifiers(sqsOrders, orderLines)
    return orderLines
}

const ordersModule: Module<any, any> = {
    namespaced: true,
    state: {
        orders: Object
    },
    getters: {
        getOrders: state => {
            return state.orders
        }
    },
    mutations: {
        setOrders (state) {
          state.orders = getOrdersWithModifiers()
        },
    },
    actions: {
        async setOrders (context) {
            context.commit('setOrders')
        },
    }
}


export default ordersModule
