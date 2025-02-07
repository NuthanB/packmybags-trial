import Image from "next/image"

interface PackageCardProps {
  pkgData: {
    id: string
    name: string
    image_url?: string
    description: string
    price: number
  }
}

export default function PackageCard({ pkgData }: PackageCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <Image
        src={pkgData.image_url || "/placeholder.svg"}
        alt={pkgData.name}
        width={400}
        height={200}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{pkgData.name}</h2>
        <p className="text-gray-600 mb-4">{pkgData.description}</p>
        <p className="font-bold mb-4">${pkgData.price}</p>
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
