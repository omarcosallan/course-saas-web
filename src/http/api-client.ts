import { getCookie } from 'cookies-next'
import ky from 'ky'

export const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  hooks: {
    beforeRequest: [
      async (request) => {
        // biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
        let token

        if (typeof window === 'undefined') {
          const { cookies } = await import('next/headers')
          const cookieStore = await cookies()
          token = cookieStore.get('saas-token')?.value
        } else {
          token = getCookie('token')
        }

        if (token != null && !(token === '')) {
          request.headers.set('Authorization', `Bearer ${token}`)
        }
      },
    ],
  },
})
