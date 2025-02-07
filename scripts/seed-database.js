const { createClient } = require("@supabase/supabase-js")
require("dotenv").config({ path: ".env.local" })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error("Missing Supabase environment variables")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)

async function seedDatabase() {
  // Create tables
  const { error: profilesError } = await supabase
    .from("profiles")
    .upsert([{ id: "example-user-id", name: "John Doe", phone: "1234567890" }])
  if (profilesError) console.error("Error seeding profiles:", profilesError)

  const { error: packagesError } = await supabase.from("packages").upsert([
    {
      id: 1,
      name: "Paris Getaway",
      description: "Romantic 5-day trip to Paris",
      price: 1500,
      type: "international",
      image_url: "https://example.com/paris.jpg",
    },
    {
      id: 2,
      name: "Tokyo Adventure",
      description: "Exciting 7-day tour of Tokyo",
      price: 2000,
      type: "international",
      image_url: "https://example.com/tokyo.jpg",
    },
    {
      id: 3,
      name: "New York City Break",
      description: "4-day city break in the Big Apple",
      price: 1200,
      type: "international",
      image_url: "https://example.com/nyc.jpg",
    },
    {
      id: 4,
      name: "Grand Canyon Explorer",
      description: "3-day tour of the Grand Canyon",
      price: 800,
      type: "domestic",
      image_url: "https://example.com/grand-canyon.jpg",
    },
  ])
  if (packagesError) console.error("Error seeding packages:", packagesError)

  const { error: bookingsError } = await supabase
    .from("bookings")
    .upsert([{ id: 1, user_id: "example-user-id", package_id: 1, status: "confirmed" }])
  if (bookingsError) console.error("Error seeding bookings:", bookingsError)

  console.log("Database seeded successfully")
}

seedDatabase()