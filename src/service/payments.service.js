const Stripe = require("stripe")
const { configObje } = require("../config/config")


class PaymentsService {
    constructor(){
        this.stripe = new Stripe(configObje.stripe_secret_key)
    }
    createPaymentIntent = async (data) => {
        const paymentIntent = this.stripe.paymentIntents.create(data)
        return paymentIntent 
    }
}

module.exports = new PaymentsService();