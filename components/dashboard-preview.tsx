import { Square, Circle, MinusSquare } from "lucide-react"

export function DashboardPreview() {
  return (
    <div className="relative w-full max-w-3xl mx-auto aspect-[4/3] rounded-3xl bg-gradient-to-br from-[#5A31F4] via-[#6A8DFF] to-[#942FFF] p-3 shadow-2xl">
      <div className="bg-white rounded-2xl h-full w-full p-6 relative overflow-hidden">
        {/* Window Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-[#5A31F4] to-[#942FFF] flex items-center justify-center">
            <Square className="h-5 w-5 text-white" />
          </div>
          <div className="flex space-x-2">
            <Circle className="h-4 w-4 text-green-500 fill-current" />
            <MinusSquare className="h-4 w-4 text-blue-500 fill-current" />
          </div>
        </div>

        {/* Header Placeholder */}
        <div className="space-y-2 mb-8">
          <div className="h-3 w-3/4 bg-gray-200 rounded-full"></div>
          <div className="h-3 w-1/2 bg-gray-200 rounded-full"></div>
        </div>

        {/* Grid of Cards */}
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="aspect-square rounded-xl bg-gray-50 p-4 flex flex-col justify-between">
              <div className="h-6 w-6 rounded-lg bg-gradient-to-r from-[#5A31F4] to-[#942FFF]"></div>
              <div className="space-y-2">
                <div className="h-2 w-full bg-gray-200 rounded-full"></div>
                <div className="h-2 w-3/4 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
