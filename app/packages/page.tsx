import { cookies } from "next/headers"
import { createClient } from "@/lib/supabase"
import PackageCard from "@/components/PackageCard"
import { NextPage } from "next"

interface PackagesPageProps {
  searchParams?: Record<string, string | string[] | undefined>
}

const PackagesPage: NextPage<PackagesPageProps> = async ({ searchParams }) => {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  let query = supabase.from("packages").select("*")

  if (searchParams?.query && typeof searchParams.query === "string") {
    query = query.ilike("name", `%${searchParams.query}%`)
  }

  if (searchParams?.type && typeof searchParams.type === "string") {
    query = query.eq("type", searchParams.type)
  }

  const { data: packages, error } = await query

  if (error) {
    console.error("Error fetching packages:", error)
    return <div>Error loading packages. Please try again later.</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Travel Packages</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages && packages.length > 0 ? (
          packages.map((pkg) => <PackageCard key={pkg.id} pkgData={pkg} />)
        ) : (
          <p>No packages found.</p>
        )}
      </div>
    </div>
  )
}

export default PackagesPage
