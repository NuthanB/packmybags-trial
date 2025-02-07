import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t mt-8">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">About Us</h3>
            <p className="text-muted-foreground">
              TravelEase is your go-to platform for booking amazing vacation packages worldwide.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/packages">Packages</Link>
              </li>
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/contact">Contact Us</Link>
              </li>
              <li>
                <Link href="/terms">Terms and Conditions</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
            <p className="text-muted-foreground">
              Email: info@travelease.com
              <br />
              Phone: +1 (123) 456-7890
            </p>
          </div>
        </div>
        <div className="mt-8 text-center text-muted-foreground">
          &copy; {new Date().getFullYear()} TravelEase. All rights reserved.
        </div>
      </div>
    </footer>
  )
}