'use client'
import Select from "@/components/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Range() {
  const searchParams = useSearchParams()
  const pathname = usePathname()    //current URL /dashboard
  const { replace } = useRouter()
  const range = searchParams.get('range') ?? 'last30days' // set last30days as default

  const handleChange = (e) => {
    // 1. Create a new URLSearchParams object
    const params = new URLSearchParams()

    // 2. Set a query parameter named 'range' with the value from the event
    params.set('range', e.target.value)

    // 3. Update the URL with the new query parameter ( combine /dashboard with ?range=last30days )
    replace(`${pathname}?${params.toString()}`)
  }

  return <Select defaultValue={range} onChange={handleChange}>
    <option value="today">Today</option>
    <option value="last7days">Last 7 days</option>
    <option value="last30days">Last 30 days</option>
    <option value="last12months">Last 12 months</option>
  </Select>
}