'use server'
import { revalidatePath } from 'next/cache'
import { createClient } from './supabase/server'
import { transactionSchema } from './validation'
import { redirect } from 'next/navigation'
import { Groq } from 'groq-sdk'

export async function analyzeTransactions(transactions) {
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `
      I want you to act as a financial advisor to analyze a person's transactions. 
      Summarize the overall financial situation in just one sentence—either a compliment if things are going well, or a piece of advice if there are issues. 
      Then, provide exactly three bullet points: each bullet should be a specific, actionable suggestion for what to work on or what to keep doing. 
      Do not give separate summaries or bullet lists for each category. 
      Do not repeat the summary sentence in the bullet points. 
      Keep the response concise and focused on the overall picture, not individual categories.
      
      Example output format:
      Great job on consistently bringing in a steady weekly salary and supplementing it with online sales income, which is showing a promising increase.
      
      Here are three areas to focus on for further improvement:
      * Consider allocating a portion of the online sales income towards savings to maximize the benefits of the extra earnings.
      * Review and potentially adjust the rent expenses to ensure it's reasonable and explore possible options for reduction.
      * Think about setting a more specific savings goal to maintain consistency in monthly savings.
      `
      },
      {
        role: "user",
        content: JSON.stringify(transactions)
      }
    ],
    model: "llama3-8b-8192",
    temperature: 1,
    max_completion_tokens: 1024,
    top_p: 1,
    stream: false
  });

  return chatCompletion.choices[0]?.message?.content || '';
}

export async function createTransaction(formData) {
  const validated = transactionSchema.safeParse(formData)
  if (!validated.success) {
    throw new Error('Invalid data')
  }

  const supabase = await createClient()
  const { data, error } = await supabase.from('transactions').insert(formData)

  if (error) {
    throw new Error('Failed creating the transaction')
  }

  revalidatePath('/dashboard')

}

export async function updateTransaction(id, formData) {
  const validated = transactionSchema.safeParse(formData)
  if (!validated.success) {
    throw new Error('Invalid data')
  }

  const supabase = await createClient()
  const { error } = await supabase.from('transactions')
    .update(formData)
    .eq('id', id)

  if (error) {
    throw new Error('Failed creating the transaction')
  }

  revalidatePath('/dashboard')
}

export async function fetchTransactions(range, offset = 0, limit = 1000) {
  const supabase = await createClient()
  let { data, error } = await supabase
    .rpc('fetch_transactions', {
      limit_arg: limit,
      offset_arg: offset,
      range_arg: range
    })
  if (error) throw new Error("We can't fetch transactions")
  return data
}

export async function deleteTransaction(id) {
  const supabase = await createClient()
  const { error } = await supabase.from('transactions')
    .delete()
    .eq('id', id)
  if (error) throw new Error(`Could not delete the transaction ${id}`)
  revalidatePath('/dashboard')
}

export async function login(prevState, formData) {
  const supabase = await createClient()
  const email = formData.get('email')
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
      // emailRedirectTo: "http://localhost:3000/dashboard"
    }
  })
  if (error) {
    return {
      error: true,
      message: 'Error authenticating!'
    }
  }
  return {
    message: `Email sent to ${email}`

  }
}

export async function signOut() {
  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()
  redirect('/')
}

export async function uploadAvatar(prevState, formData) {
  const file = formData.get('file')

  // Validate that a file was selected
  if (!file || file.size === 0) {
    return {
      error: true,
      message: 'Please select a file to upload'
    }
  }

  const supabase = await createClient()
  const fileExt = file.name.split('.').pop()
  const fileName = `${Math.random()}.${fileExt}`
  const { error } = await supabase.storage
    .from('avatars')
    .upload(fileName, file)
  if (error) {
    return {
      error: true,
      message: 'Error uploading avatar'
    }
  }

  // Removing the old file
  const { data: userData, userError } = await supabase.auth.getUser()
  if (userError) {
    return {
      error: true,
      message: 'Something went wrong, try again'
    }
  }

  const avatar = userData.user.user_metadata.avatar
  if (avatar) {
    const { error } = await supabase.storage
      .from('avatars')
      .remove([avatar])

    if (error) {
      return {
        error: true,
        message: 'Something went wrong, try again'
      }
    }
  }

  // update metadata to link image to user
  const { error: dataUpdateError } = await supabase.auth
    .updateUser({
      data: {
        avatar: fileName
      }
    })
  if (dataUpdateError) {
    return {
      error: true,
      message: 'Error associating the avatar with the user'
    }
  }

  return {
    message: 'Updated the user avatar'
  }
}

export async function updateSettings(prevState, formData) {
  const supabase = await createClient()
  const { error } = await supabase.auth
    .updateUser({
      data: {
        fullName: formData.get('fullName'),
        defaultView: formData.get('defaultView')
      }
    })

  if (error) {
    return {
      error: true,
      message: 'Failed updating setting'
    }
  }

  return {
    message: 'Updated user settings'
  }
}