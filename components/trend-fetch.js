import Trend from "./trend"
import { createClient } from "@/lib/supabase/server"

export default async function TrendFetch({ type, range }) {
  const supabase = await createClient()
  let { data, error } = await supabase
    .rpc('calculate_total', {
      range_arg: range,
      type_arg: type
    })
  if (error) throw new Error("Could not fetch the trend data")
  const amounts = data[0]

  return <Trend type={type} amount={amounts.current_amount} prevAmount={amounts.previous_amount} />
}