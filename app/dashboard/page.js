import TransactionList from "@/components/transaction-list"
import { Suspense } from "react"
import TransactionListFallback from "@/components/transaction-list-fallback"
import TrendFetch from "@/components/trend-fetch"

export default function Dashboard() {
  return (
    <>
      <section className="mb-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
        <Suspense>
          <TrendFetch type="Income" />
        </Suspense>
        <Suspense>
          <TrendFetch type="Expense" />
        </Suspense>
        <Suspense>
          <TrendFetch type="Saving" />
        </Suspense>
        <Suspense>
          <TrendFetch type="Investment" />
        </Suspense>
      </section>
      <Suspense fallback={<TransactionListFallback />}>
        <TransactionList />
      </Suspense>
    </>
  )
}