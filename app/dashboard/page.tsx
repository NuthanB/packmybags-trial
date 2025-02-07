import { cookies } from "next/headers"
import { createClient } from "@/lib/supabase"
import { Button } from "@/components/ui/button"

export default async function Dashboard() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return <div>Please sign in to view your dashboard.</div>
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  const { data: bookings } = await supabase.from("bookings").select("*, packages(*)").eq("user_id", user.id)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Welcome, {profile?.name || user.email}</h1>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Your Profile</h2>
        <p>Email: {user.email}</p>
        <p>Phone: {profile?.phone || "Not provided"}</p>
        <Button className="mt-4">Edit Profile</Button>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Your Bookings</h2>
        {bookings && bookings.length > 0 ? (
          <ul className="space-y-4">
            {bookings.map((booking) => (
              <li key={booking.id} className="border p-4 rounded-lg">
                <h3 className="font-semibold">{booking.packages.name}</h3>
                <p>Status: {booking.status}</p>
                <p>Price: ${booking.packages.price}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>You have no bookings yet.</p>
        )}
      </div>
    </div>
  )
}

//Now, let's create the admin panel:

tsx file="app/admin/page.tsx"
import { cookies } from "next/headers"
import { createClient } from "@/lib/supabase"
import { Button } from "@/components/ui/button"

export default async function AdminPanel() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || user.role !== 'admin') {
    return <div>Access denied. You must be an admin to view this page.</div>
  }

  const { data: bookings } = await supabase
    .from('bookings')
    .select('*, users(email), packages(name)')

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <div>
        <h2 className="text-xl font-semibold mb-2">All Bookings</h2>
        {bookings && bookings.length > 0 ? (
          <ul className="space-y-4">
            {bookings.map((booking) => (
              <li key={booking.id} className="border p-4 rounded-lg">
                <h3 className="font-semibold">{booking.packages.name}</h3>
                <p>User: {booking.users.email}</p>
                <p>Status: {booking.status}</p>
                <Button className="mt-2" onClick={() => handleUpdateBooking(booking.id)}>
                  Update Status
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No bookings found.</p>
        )}
      </div>
    </div>
  )
}

function handleUpdateBooking(id: string) {
  // Implement the logic to update booking status
  console.log(`Updating booking ${id}`)
}