'use server'
import { revalidateTag } from 'next/cache'
import { createClient } from './supabase/server'

export async function purgeTransactionListCache() {
  revalidateTag('transaction-list')
}

export async function createTransaction(formData) {
  console.log(formData)
  const supabase = await createClient()
  const { error } = await supabase.from('transactions').insert(formData)
}