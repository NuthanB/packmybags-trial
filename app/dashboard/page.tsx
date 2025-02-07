import { cookies } from "next/headers"
import { createClient } from "@/lib/supabase"

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
