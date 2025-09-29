import Razorpay from "razorpay"

let razorpayInstance: Razorpay | null = null

export function getRazorpayInstance() {
  if (!razorpayInstance) {
    const keyId = process.env.RAZORPAY_KEY_ID
    const keySecret = process.env.RAZORPAY_KEY_SECRET

    if (keyId && keySecret) {
      razorpayInstance = new Razorpay({
        key_id: keyId,
        key_secret: keySecret,
      })
    } else {
      console.error("Razorpay credentials are not set.")
    }
  }
  return razorpayInstance
}