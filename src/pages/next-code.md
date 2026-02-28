# Next.js + TypeScript (App Router, 2026 Standard)

## Create Providers Component

#### app/providers.tsx
```bash
'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, useState } from 'react'

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60,
            gcTime: 1000 * 60 * 5,
            retry: 2,
            refetchOnWindowFocus: false,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
```

## Wrap It in layout.tsx

#### app/layout.tsx
```bash
import Providers from './providers'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
```

## Client Component Example

#### app/users/page.tsx
```bash
'use client'

import { useQuery } from '@tanstack/react-query'

type User = {
  id: number
  name: string
}

async function fetchUsers(): Promise<User[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  if (!res.ok) throw new Error('Failed to fetch')
  return res.json()
}

export default function UsersPage() {
  const { data, isLoading, error } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })

  if (isLoading) return <p>Loading...</p>
  if (error instanceof Error) return <p>{error.message}</p>

  return (
    <div>
      {data?.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  )
}
```

## Note 
In Next.js you must also think about:
- When to fetch on server (RSC)
- When to fetch on client
- Avoiding duplicate fetching
- Using prefetch + hydration (advanced topic next)