'create client'
import TransactionItem from "./transaction"
import TransactionSummaryItem from "./transaction-summary"
import { groupAndSumTransactionsByDate } from "@/lib/utils"

export default async function TransactionList({ initialTransactions }) {
  const grouped = groupAndSumTransactionsByDate(initialTransactions)

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
    </div>
  )
}