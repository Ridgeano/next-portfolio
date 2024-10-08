import GlassShards from "./ui/glassShards";

export default function Hero() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <GlassShards/>
      <main className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="relative w-full max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-zinc-950 tracking-tight text-center">
              <span className="block">full stack web developer</span>
            </h1>
          </div>
        </div>
      </main>
    </div>
  )
}