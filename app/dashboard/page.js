import TransactionList from "@/components/transaction-list"
import { Suspense } from "react"
import TransactionListFallback from "@/components/transaction-list-fallback"
import TrendFetch from "@/components/trend-fetch"
import TrendFallback from "@/components/trend-fallback"

export default function Dashboard() {
  return (
    <>
      <section className="mb-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
        <Suspense fallback={<TrendFallback />}>
          <TrendFetch type="Income" />
        </Suspense>
        <Suspense fallback={<TrendFallback />}>
          <TrendFetch type="Expense" />
        </Suspense>
        <Suspense fallback={<TrendFallback />}>
          <TrendFetch type="Saving" />
        </Suspense>
        <Suspense fallback={<TrendFallback />}>
          <TrendFetch type="Investment" />
        </Suspense>
      </section>
      <Suspense fallback={<TransactionListFallback />}>
        <TransactionList />
      </Suspense>
    </>
  )
}