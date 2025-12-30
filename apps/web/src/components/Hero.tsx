import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Hero = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-backgroundLight font-sans">
      {/* Full background image */}
      <Image
        src="/background/hero/img-0.jpg"
        alt="Hero Background"
        fill
        priority
        className="object-cover object-right absolute inset-0 z-0"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-l from-backgroundLight/90 via-backgroundLight/70 to-backgroundLight/40 z-10 pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-20 flex flex-col md:flex-row items-center justify-between w-full max-w-7xl mx-auto px-6 md:px-12 pt-24 md:pt-32 pb-12 gap-8">
        {/* Left */}
        <div className="flex-1 max-w-4xl space-y-6 mt-40">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-text leading-tight mb-4">
            Find Your Perfect
            <br />
            Dream Job With <span className="text-success">Jobpath</span>
          </h1>

          <p className="text-lg md:text-xl text-textMuted mb-8 font-medium leading-relaxed">
            Looking for a new job can be both exciting and daunting. Navigating
            the job market involves exploring various avenues, including online
            job boards.
          </p>

          {/* Search Box - Glassmorphism Style */}
          <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 w-full max-w-5xl border border-white/10 shadow-2xl">
            {/* Title */}
            <h2 className="text-white text-xl font-semibold mb-5 italic">
              Find Your Dream Job
            </h2>

            <form className="space-y-5">
              {/* Main Search Row */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Looking for Input */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-gray-300">
                    Looking for
                  </label>
                  <input
                    type="text"
                    placeholder="Enter type"
                    className="w-full bg-white/90 backdrop-blur-sm rounded-full px-4 py-2.5 text-sm text-gray-900 focus:ring-2 focus:ring-success/50 outline-none transition-all duration-200 placeholder:text-gray-500"
                  />
                </div>

                {/* Price Select */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-gray-300">
                    Price
                  </label>
                  <Select>
                    <SelectTrigger className="w-full bg-white/90 backdrop-blur-sm rounded-full px-4 py-2.5 text-sm text-gray-900 border-0 h-auto focus:ring-2 focus:ring-success/50">
                      <SelectValue placeholder="Price" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-50k">R0 - R50,000</SelectItem>
                      <SelectItem value="50k-100k">
                        R50,000 - R100,000
                      </SelectItem>
                      <SelectItem value="100k+">R100,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Location Select */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-gray-300">
                    Locations
                  </label>
                  <Select>
                    <SelectTrigger className="w-full bg-white/90 backdrop-blur-sm rounded-full px-4 py-2.5 text-sm text-gray-900 border-0 h-auto focus:ring-2 focus:ring-success/50">
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="johannesburg">Johannesburg</SelectItem>
                      <SelectItem value="cape-town">Cape Town</SelectItem>
                      <SelectItem value="pretoria">Pretoria</SelectItem>
                      <SelectItem value="durban">Durban</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Job Type Select */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-gray-300">
                    Job Type
                  </label>
                  <Select>
                    <SelectTrigger className="w-full bg-white/90 backdrop-blur-sm rounded-full px-4 py-2.5 text-sm text-gray-900 border-0 h-auto focus:ring-2 focus:ring-success/50">
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full Time</SelectItem>
                      <SelectItem value="part-time">Part Time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="remote">Remote</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Filter Chips and Search Button Row */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-2">
                {/* Filter Chips */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-medium text-gray-300">
                    Filter:
                  </span>
                  <button
                    type="button"
                    className="px-4 py-1.5 rounded-full bg-white text-gray-800 text-xs font-semibold hover:bg-gray-100 transition-colors shadow-sm"
                  >
                    All Jobs
                  </button>
                  <button
                    type="button"
                    className="px-4 py-1.5 rounded-full bg-white/80 text-gray-700 text-xs font-semibold hover:bg-white transition-colors"
                  >
                    Featured
                  </button>
                  <button
                    type="button"
                    className="px-4 py-1.5 rounded-full bg-white/80 text-gray-700 text-xs font-semibold hover:bg-white transition-colors"
                  >
                    Remote
                  </button>
                  <button
                    type="button"
                    className="px-4 py-1.5 rounded-full bg-white/80 text-gray-700 text-xs font-semibold hover:bg-white transition-colors"
                  >
                    Urgent
                  </button>
                </div>

                {/* Search Button */}
                <Button
                  type="submit"
                  className="bg-success hover:bg-success/90 text-white font-semibold rounded-full px-8 py-2.5 text-sm shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Search Jobs
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
