import { cookies } from "next/headers"
import { createClient } from "@/lib/supabase"

function handleUpdateBooking(id: string) {
  // Implement the logic to update booking status
  console.log(`Updating booking ${id}`)
}

export default async function AdminPanel() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || user.role !== "admin") {
    return <div>Access denied. You must be an admin to view this page.</div>
  }

  const { data: bookings } = await supabase
    .from("bookings")
    .select("*, users(email), packages(name)")

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
                <button
                  className="mt-2 px-4 py-2 border rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                  onClick={() => handleUpdateBooking(booking.id)}
                >
                  Update Status
                </button>
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
