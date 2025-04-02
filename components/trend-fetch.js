import Trend from "./trend"

export default async function TrendFetch({ type }) {
  const response = await fetch(`http://localhost:3003/trends/${type}`)
  // destruturing applied below, works the same as response.amount, response.prevAmount
  const { amount, prevAmount } = await response.json()
  return <Trend type={type} amount={amount} prevAmount={prevAmount} />
}