import { cookies } from 'next/headers'

export async function isAuthenticated() {
  return !!(await cookies()).get('saas-token')?.value
}
