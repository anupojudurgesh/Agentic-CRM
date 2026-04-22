import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import axios from "axios"
import ChatPanel from "./components/ChatPanel"
import Form from "./components/Form"
import LandingPage from "./components/LandingPage"
import HistoryDrawer from "./components/HistoryDrawer"
import { updateForm } from "./store/formSlice"
import type { InteractionResponse, FormData } from "./types/types"

function App() {
  const [isStarted, setIsStarted] = useState(false)
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (isStarted) {
      const fetchLatestInteraction = async () => {
        try {
          const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/interactions/latest`)
          if (res.data && res.data.interaction) {
            dispatch(updateForm(res.data.interaction as unknown as Partial<FormData>))
          }
        } catch (err) {
          console.error("Failed to fetch latest interaction:", err)
        }
      }
      fetchLatestInteraction()
    }
  }, [dispatch, isStarted])

  const handleSelectHistory = (interaction: InteractionResponse) => {
    dispatch(updateForm(interaction as unknown as Partial<FormData>))
  }

  if (!isStarted) {
    return <LandingPage onStart={() => setIsStarted(true)} />
  }

  return (
    <div className="flex flex-col w-screen h-screen bg-[#f3f4f6] font-sans overflow-hidden">
      
      {/* Top Navbar */}
      <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0 z-20">
        <div className="flex items-center gap-2">
          <span className="text-xl leading-none">🤖</span>
          <span className="font-bold text-[#0f172a] tracking-tight">Agentic<span className="text-blue-600">-CRM</span></span>
        </div>
        <button 
          onClick={() => setIsHistoryOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 bg-[#f8fafc] hover:bg-[#f1f5f9] border border-gray-200 rounded-md text-[#475569] text-sm font-semibold transition-colors shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Interaction History
        </button>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Pane - Form */}
        <div className="flex-[1.5] h-full p-6 pr-3">
          <div className="h-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <Form />
          </div>
        </div>

        {/* Right Pane - Chat */}
        <div className="flex-1 h-full p-6 pl-3 max-w-[500px]">
          <div className="h-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <ChatPanel />
          </div>
        </div>
      </div>

      {/* Slide-out History Drawer */}
      <HistoryDrawer 
        isOpen={isHistoryOpen} 
        onClose={() => setIsHistoryOpen(false)} 
        onSelect={handleSelectHistory} 
      />

    </div>
  )
}

export default App