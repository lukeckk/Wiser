import PageHeader from "@/components/page-header";
import Trend from "@/components/trend";
import TransactionItem from "@/components/transaction";
import TransactionSummaryItem from "@/components/transaction-summary";

export default function Page() {
  return (
    <main className="space-y-8">
      <h1 className="text-4xl mt-8">Playground</h1>

      <div>
        <h2 className="mb-4 text-lg font-mono">Page Header</h2>
        <hr className="mb-4 border-gray-200 dark:border-blue-300 border-2" />
        <div><PageHeader /></div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-mono">Trend</h2>
        <hr className="mb-4 border-gray-200 dark:border-blue-300 border-2" />
        <div className="flex space-x-8">
          <Trend type="Income" amount={750} prevAmount={500} />
          <Trend type="Expense" amount={2000} prevAmount={4000} />
          <Trend type="Investment" amount={3000} prevAmount={2500} />
          <Trend type="Saving" amount={4000} prevAmount={3000} />
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-mono">Transaction Item</h2>
        <hr className="mb-4 border-gray-200 dark:border-blue-300 border-2" />
        <div className="space-y-4">
          <TransactionItem type="Income" description="Salary" amount={2000} />
          <TransactionItem type="Expense" category="Food" description="Going out to eat" amount={29} />
          <TransactionItem type="Saving" description="For children" amount={500} />
          <TransactionItem type="Investment" description="In Microsoft" amount={9000} />
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-mono">Transaction Item + Summary</h2>
        <hr className="mb-4 border-gray-200 dark:border-blue-300 border-2" />
        <div className="space-y-4">
          <TransactionSummaryItem date="2025-1-02" amount={2000} />
          <hr className="mb-4 border-gray-200 dark:border-stone-500 border-2" />
          <TransactionItem type="Income" description="Salary" amount={2000} />
          <TransactionItem type="Expense" category="Food" description="Going out to eat" amount={29} />
          <TransactionItem type="Saving" description="For children" amount={500} />
          <TransactionItem type="Investment" description="In Microsoft" amount={9000} />
        </div>
      </div>
    </main>
  )
}
