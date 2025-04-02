import PageHeader from "@/components/page-header";
import Trend from "@/components/trend";
import TransactionItem from "@/components/transaction";
import TransactionSummaryItem from "@/components/transaction-summary";
import Button from "@/components/button";
import Input from "@/components/input";
import Label from "@/components/label";
import Select from "@/components/select";
import Separator from "@/components/separator";
import Skeleton from "@/components/skeleton";

export const metadata = {
  title: "Playground"
}

export default function Page() {
  return (
    <main className="space-y-8">
      <h1 className="text-4xl mt-8">Playground</h1>

      <div>
        <h2 className="mb-4 text-lg font-mono">Page Header</h2>
        <Separator />
        <div><PageHeader /></div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-mono">Trend</h2>
        <Separator />
        <div className="flex space-x-8">
          <Trend type="Income" amount={750} prevAmount={500} />
          <Trend type="Expense" amount={2000} prevAmount={4000} />
          <Trend type="Investment" amount={3000} prevAmount={2500} />
          <Trend type="Saving" amount={4000} prevAmount={3000} />
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-mono">Transaction Item</h2>
        <Separator />
        <div className="space-y-4">
          <TransactionItem type="Income" description="Salary" amount={2000} />
          <TransactionItem type="Expense" category="Food" description="Going out to eat" amount={29} />
          <TransactionItem type="Saving" description="For children" amount={500} />
          <TransactionItem type="Investment" description="In Microsoft" amount={9000} />
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-mono">Transaction Item + Summary</h2>
        <Separator />
        <div className="space-y-4">
          <TransactionSummaryItem date="2025-1-02" amount={2000} />
          <hr className="mb-4 border-gray-200 dark:border-stone-500 border-2" />
          <TransactionItem type="Income" description="Salary" amount={2000} />
          <TransactionItem type="Expense" category="Food" description="Going out to eat" amount={29} />
          <TransactionItem type="Saving" description="For children" amount={500} />
          <TransactionItem type="Investment" description="In Microsoft" amount={9000} />
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-mono">Buttons</h2>
        <Separator />
        <div className="space-x-4">
          <Button>Hello</Button>
          <Button variant="outline">Hello</Button>
          <Button variant="ghost">Hello</Button>

          <Button size="xs">Hello</Button>
          <Button size="sm">Hello</Button>
          <Button size="lg">Hello</Button>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-mono">Forms</h2>
        <Separator />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="mb-1">Your name</Label>
            <Input type="text" placeholder="Type something in here..." />
          </div>

          <div>
            <Label className="mb-1">City</Label>
            <Select>
              <option>Warsaw</option>
              <option>Berlin</option>
              <option>London</option>
            </Select>
          </div>

          <div className="flex items-center">
            <Input type="checkbox" id="terms" />
            <Label className="ml-2" htmlFor="terms">Accept terms</Label>
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-mono">Loading Skeleton</h2>
        <Separator />
        <div className="space-y-8">
          <div className="flex space-x-4">
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>

          <div className="space-y-4">
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        </div>
      </div>

    </main>
  )
}
