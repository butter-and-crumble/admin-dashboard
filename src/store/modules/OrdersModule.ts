import { Module } from "vuex";
import * as fb from '@/plugins/firebase.ts'

const months = [ "January", "February", "March", "April", "May", "June",
           "July", "August", "September", "October", "November", "December" ];

function formatDate(date: string){
    const parts = date.split("-")
    const month = months[Number(parts[1]) - 1]
    const day = String(Number(parts[2].substring(0,2)))
    const formattedDate = month + ' ' + day + ', ' + parts[0]
    return formattedDate
}

function attachOrderModifiers(orders: any, orderLines: any){
    orders.forEach((order: any) => {

        const orderNumber = parseInt(order.orderNumber)
        fb.orders.where("orderId", "==", orderNumber)
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    const orderModifiers = doc.data();
                    order.lineItems.forEach((line: any) => {
                        try {
                            const lineModifier = orderModifiers[line.id]
                            const orderDate = formatDate(order.createdOn)
                            const pickupDate = formatDate(lineModifier.dateTime.value.date)
                            orderLines.push({
                                id: line.id,
                                orderNumber: order.orderNumber,
                                item: line.productName,
                                quantity: line.quantity,
                                orderDate: orderDate,
                                pickupDate: pickupDate,
                                modifier: lineModifier
                            })
                        } catch {
                            console.log("Error")
                        }

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
