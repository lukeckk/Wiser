import { fetchTransactions, analyzeTransactions } from "@/lib/actions"
import TransactionList from "./transaction-list"
import AiOutput from "./ai-output"

export default async function TransactionListWrapper({ range }) {
  const transactions = await fetchTransactions(range)
  const analysis = await analyzeTransactions(transactions)
  return (
    <div>
      <AiOutput output={analysis} />
      <TransactionList initialTransactions={transactions} key={range} range={range} />
    </div>
  )

}