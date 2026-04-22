import type { InteractionResponse } from "../types/types"

interface SidebarProps {
  interactions: InteractionResponse[]
  selectedId: number | null
  onSelect: (interaction: InteractionResponse) => void
  onClearHistory: () => void
}

export default function Sidebar({ interactions, selectedId, onSelect, onClearHistory }: SidebarProps) {
  const getSentimentEmoji = (sentiment: string | null) => {
    switch (sentiment?.toLowerCase()) {
      case "positive": return "😊"
      case "negative": return "😞"
      case "neutral": return "😐"
      default: return "📝"
    }
  }

  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h2 className="text-[15px] font-bold text-gray-800 tracking-tight">History</h2>
          <p className="text-[11px] text-gray-500 font-medium uppercase tracking-wider mt-0.5">Recent interactions</p>
        </div>
        {interactions.length > 0 && (
          <button 
            onClick={onClearHistory}
            className="text-xs font-semibold text-rose-500 hover:text-rose-600 hover:bg-rose-50 px-3 py-1.5 rounded-full transition-all duration-200 ease-out"
          >
            Clear All
          </button>
        )}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2 relative">
        {interactions.length === 0 ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 opacity-60">
             <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-4 shadow-sm border border-gray-100">
               <span className="text-2xl">⏳</span>
             </div>
             <p className="text-sm font-semibold text-gray-600">No History Yet</p>
             <p className="text-xs text-gray-400 mt-1">Interactions will appear here</p>
          </div>
        ) : (
          interactions.map((interaction) => (
            <div
              key={interaction.id}
              onClick={() => onSelect(interaction)}
              className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 ease-out border ${
                selectedId === interaction.id
                  ? "bg-gradient-to-br from-indigo-50/80 to-blue-50/50 border-indigo-200/60 shadow-sm"
                  : "bg-transparent border-transparent hover:bg-white hover:border-gray-200 hover:shadow-sm"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-800 text-[15px] truncate pr-2">
                  {interaction.hcp_name || "Unknown HCP"}
                </h3>
                <span className="text-lg leading-none" title={interaction.sentiment || "Unknown"}>
                  {getSentimentEmoji(interaction.sentiment)}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 opacity-70">
                  <path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clipRule="evenodd" />
                </svg>
                {interaction.date || "No date"}
              </div>
              {interaction.topics && (
                <p className="text-xs text-gray-400 mt-2 truncate line-clamp-1">
                  {interaction.topics}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
