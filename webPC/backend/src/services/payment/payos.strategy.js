const PayOS =
  require("@payos/node").default ||
  require("@payos/node").PayOS ||
  require("@payos/node");

class PayOSStrategy {
  constructor() {
    this.payos = new PayOS(
      process.env.PAYOS_CLIENT_ID || "CLIENT_ID",
      process.env.PAYOS_API_KEY || "API_KEY",
      process.env.PAYOS_CHECKSUM_KEY || "CHECKSUM_KEY",
    );
  }

  async createPaymentLink(orderInfo) {
    const { orderCode, amount, description, items, cancelUrl, returnUrl } =
      orderInfo;

    const body = {
      orderCode,
      amount,
      description,
      items,
      cancelUrl: cancelUrl || `${process.env.CLIENT_URL}/checkout/cancel`,
      returnUrl: returnUrl || `${process.env.CLIENT_URL}/checkout/success`,
    };

    try {
      // Mock payment link if using dummy keys for testing
      if (
        !process.env.PAYOS_CLIENT_ID ||
        process.env.PAYOS_CLIENT_ID.includes("dummy") ||
        process.env.PAYOS_CLIENT_ID === "CLIENT_ID"
      ) {
        console.log("Using Mock PayOS Checkout because of dummy API keys.");
        return {
          checkoutUrl: `http://localhost:5173/mock-payment?orderCode=${body.orderCode}&amount=${body.amount}`,
          paymentLinkId: "mock-payment-link-id",
        };
      }

      const paymentLinkRes = await this.payos.createPaymentLink(body);
      return {
        checkoutUrl: paymentLinkRes.checkoutUrl,
        paymentLinkId: paymentLinkRes.paymentLinkId,
      };
    } catch (error) {
      console.error("PayOS createPaymentLink Error:", error);
      throw new Error("Cannot create PayOS payment link");
    }
  }

  async verifyPayment(webhookData) {
    try {
      const verifiedData = this.payos.verifyPaymentWebhookData(webhookData);
      return verifiedData;
    } catch (error) {
      console.error("PayOS verifyPayment Error:", error);
      throw new Error("Invalid payment verification");
    }
  }
}

module.exports = PayOSStrategy;
