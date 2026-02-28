import { useQuery } from "@tanstack/react-query"

type User = {
    id: number,
    name: string,
}

const fetchUsers = async (): Promise<User[]> => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    if (!res.ok) {
        throw new Error('Failed to fetch users')
    }
    return res.json()
}

export default function UserPage() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
    })

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error instanceof Error) {
        return <div>Error: {error.message}</div>
    }

    return (
        <div>
            <h1>User Page</h1>
            <ul>
                {
                    data?.map((user) => (
                        <li key={user.id}>{user.name}</li>
                    ))
                }
            </ul>
        </div>
    )
}