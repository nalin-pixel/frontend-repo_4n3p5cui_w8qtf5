import { ChevronDown } from 'lucide-react'

export default function ScrollHint() {
  return (
    <div className="w-full flex justify-center mt-10 mb-4" aria-hidden>
      <div className="flex flex-col items-center text-blue-500">
        <ChevronDown className="animate-bounce w-6 h-6" />
        <span className="text-xs text-blue-500/80">Scroll</span>
      </div>
    </div>
  )
}
