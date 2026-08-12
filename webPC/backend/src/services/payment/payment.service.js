/**
 * Payment Service Interface / Strategy
 */

class PaymentService {
  constructor(strategy) {
    this.strategy = strategy;
  }

  async createPaymentLink(orderInfo) {
    return this.strategy.createPaymentLink(orderInfo);
  }

  async verifyPayment(paymentData) {
    return this.strategy.verifyPayment(paymentData);
  }
}

module.exports = PaymentService;
