'use client'
import Button from "./button"
import { fetchTransactions } from "@/lib/actions"
import { useState } from "react"
import TransactionItem from "./transaction"
import TransactionSummaryItem from "./transaction-summary"
import { groupAndSumTransactionsByDate } from "@/lib/utils"
import { Loader } from "lucide-react"

export default function TransactionList({ range, initialTransactions }) {
  const [transactions, setTransactions] = useState(initialTransactions)
  const [buttonHidden, setButtonHidden] = useState(initialTransactions.length === 0)
  const [loading, setLoading] = useState(false)
  const grouped = groupAndSumTransactionsByDate(transactions)

  const handleClick = async () => {
    setLoading(true)
    let nextTransactions = null
    try {
      nextTransactions = await fetchTransactions(range, transactions.length, 10)
      setButtonHidden(nextTransactions.length === 0)
      setTransactions(prevTransactions => [
        ...prevTransactions,
        ...nextTransactions
      ])
    } finally {
      setLoading(false)
    }
  }

  // update the local React state by filtering out the deleted transaction:
  const handleRemoved = (id) => () => {
    setTransactions(prev => [...prev].filter(t => t.id !== id))
  }

  return (
    <div className="space-y-8 mb-8">
      {Object.entries(grouped)
        .map(([date, { transactions, amount }]) =>
          <div key={date}>
            <TransactionSummaryItem date={date} amount={amount} />
            <hr className="my-4 border-gray-200 dark:border-gray-800" />
            <section className="space-y-4">
              {transactions.map(transaction => <div key={transaction.id}>
                <TransactionItem {...transaction} onRemoved={handleRemoved(transaction.id)} />
              </div>)}
            </section>
          </div>
        )}
      {transactions.length === 0 && <div className="text-center text-gray-400 dark:text-gray-500">No transactions found</div>}
      {!buttonHidden && <div className="flex justify-center">
        <Button variant="ghost" onClick={handleClick} disabled={loading}>
          <div className="flex items-center space-x-1">
            {loading && <Loader className="animate-spin" />}
            <div>Load More</div>
          </div>
        </Button>
      </div>}
    </div>
  )
}