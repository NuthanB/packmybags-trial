"use client"
import Link from "next/link"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl font-bold mb-4">Discover Your Next Adventure</h1>
            <p className="text-xl mb-6">Explore our curated travel packages and book your dream vacation today.</p>
            <Link href="/packages">
              <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
                Browse Packages
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Add more sections for featured packages, testimonials, etc. */}
    </div>
  )
}
