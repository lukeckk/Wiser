import TransactionList from "@/components/transaction-list"
import { Suspense } from "react"
import TransactionListFallback from "@/components/transaction-list-fallback"

export default function Dashboard() {
  return (
    <>
      <Suspense fallback={<TransactionListFallback />}>
        <TransactionList />
      </Suspense>
    </>
  )
}