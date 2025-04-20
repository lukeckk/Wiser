'use client'
import Button from "./button"
import { fetchTransactions } from "@/lib/actions"
import { useState } from "react"
import TransactionItem from "./transaction"
import TransactionSummaryItem from "./transaction-summary"
import { groupAndSumTransactionsByDate } from "@/lib/utils"

export default function TransactionList({ range, initialTransactions }) {
  const [transactions, setTransactions] = useState(initialTransactions)
  const [offset, setOffset] = useState(initialTransactions.length)
  const grouped = groupAndSumTransactionsByDate(transactions)

  const handleClick = async (e) => {
    const nextTransactions = await fetchTransactions(range, offset, 3)
    setOffset(prevValue => prevValue + 3)
    setTransactions(prevTransactions => [
      ...prevTransactions,
      ...nextTransactions
    ])
  }

  return (
    <div className="space-y-8">
      {Object.entries(grouped)
        .map(([date, { transactions, amount }]) =>
          <div key={date}>
            <TransactionSummaryItem date={date} amount={amount} />
            <hr className="my-4 border-gray-200 dark:border-gray-800" />
            <section className="space-y-4">
              {transactions.map(transaction => <div key={transaction.id}>
                <TransactionItem {...transaction} />
              </div>)}
            </section>
          </div>
        )}
      <div className="flex justify-center">
        <Button variant="ghost" onClick={handleClick}>Load More</Button>
      </div>
    </div>
  )
}