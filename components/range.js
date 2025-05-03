'use client'
import DateRangeSelect from "./data-range-select";
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

  return <DateRangeSelect value={range} onChange={handleChange} />
}