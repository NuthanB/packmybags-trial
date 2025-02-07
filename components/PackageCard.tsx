import Image from "next/image"

export default function PackageCard({ package: pkg }) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <Image
        src={pkg.image_url || "/placeholder.svg"}
        alt={pkg.name}
        width={400}
        height={200}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{pkg.name}</h2>
        <p className="text-muted-foreground mb-4">{pkg.description}</p>
        <p className="font-bold mb-4">${pkg.price}</p>
        <div className="flex justify-between">
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition">Enquire</button>
          <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
            Book Now
          </button>
        </div>
      </div>
    </div>
  )
}
