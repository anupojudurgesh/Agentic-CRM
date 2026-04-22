import { useState, useRef, useEffect } from "react"
import axios from "axios"
import { useDispatch } from "react-redux"
import { updateForm, clearForm } from "../store/formSlice"
import type { ChatResponse, Message } from "../types/types"

interface ChatPanelProps {
  onActionComplete?: () => void
}

function ChatPanel({ onActionComplete }: ChatPanelProps) {
  const [inputMessage, setInputMessage] = useState("")
  const [chatHistory, setChatHistory] = useState<Message[]>([
    { role: "ai", content: "Log interaction details here (e.g., \"Met Dr. Smith, discussed Prodo-X efficacy, positive sentiment, shared brochure\") or ask for help." }
  ])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chatHistory, isTyping])

  const sendMessage = async () => {
    const trimmedMessage = inputMessage.trim()
    if (!trimmedMessage || isTyping) return

    setChatHistory((prev) => [...prev, { role: "user", content: trimmedMessage }])
    setInputMessage("")
    setIsTyping(true)

    try {
      const res = await axios.post<ChatResponse>(
        "http://127.0.0.1:8000/chat",
        { message: trimmedMessage }
      )

      const data = res.data

      setChatHistory((prev) => [
        ...prev,
        { role: "ai", content: data.message, action: data.action }
      ])

      if (
        data.action === "log_interaction" ||
        data.action === "edit_interaction" ||
        data.action === "add_attendee"
      ) {
        dispatch(updateForm(data.data))
        if (onActionComplete) onActionComplete()
      }

      if (data.action === "clear_form") {
        dispatch(clearForm())
        if (onActionComplete) onActionComplete()
      }

    } catch (err) {
      console.error(err)
      setChatHistory((prev) => [
        ...prev,
        { role: "ai", content: "Sorry, I encountered an error. Please try again." }
      ])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="flex flex-col h-full bg-[#f8fafc] relative">
      
      {/* HEADER */}
      <div className="pt-4 pb-3 px-5 border-b border-gray-200 bg-[#f8fafc] relative z-10 shrink-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lg leading-none">🤖</span>
          <h2 className="text-[14px] font-semibold text-[#1e293b] leading-none">
            AI Assistant
          </h2>
        </div>
        <p className="text-[12px] text-[#64748b]">Log interaction via chat</p>
      </div>

      {/* CHAT HISTORY */}
      <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4 scroll-smooth custom-scrollbar bg-[#f8fafc]">
        {chatHistory.map((msg, index) => {
          
          if (msg.role === "user") {
            return (
              <div key={index} className="flex w-full justify-end animate-in fade-in duration-300">
                <div className="relative max-w-[85%] px-4 py-3 bg-blue-600 rounded-lg shadow-sm">
                  <p className="text-[13px] leading-relaxed text-white whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            )
          }

          // AI Message styles
          return (
            <div key={index} className="flex w-full justify-start animate-in fade-in duration-300">
              <div className="relative max-w-[90%] px-4 py-3 bg-white border border-gray-200 rounded-md shadow-sm">
                <p className="text-[13px] leading-relaxed text-[#334155] whitespace-pre-wrap">
                  {msg.content}
                </p>
              </div>
            </div>
          )
        })}
        
        {isTyping && (
          <div className="flex w-full justify-start animate-in fade-in duration-300">
            <div className="bg-white border border-gray-200 rounded-md px-4 py-3 shadow-sm flex items-center gap-2">
              <div className="flex space-x-1.5 items-center h-2">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} className="h-1" />
      </div>

      {/* INPUT */}
      <div className="p-4 bg-[#f8fafc] border-t border-gray-200 z-10 flex items-stretch gap-2">
        <textarea
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          className="flex-1 max-h-[100px] bg-white border border-gray-200 rounded-md resize-none py-2.5 px-3 text-[13px] text-[#334155] placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
          placeholder="Describe interaction..."
          disabled={isTyping}
          style={{ minHeight: '40px' }}
        />
        <button
          onClick={sendMessage}
          disabled={!inputMessage.trim() || isTyping}
          className="shrink-0 px-4 bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:opacity-50 disabled:hover:bg-gray-500 transition-colors flex items-center justify-center gap-1.5 font-medium"
        >
          <span className="text-[14px] uppercase font-bold tracking-widest">A</span>
          <span className="text-[13px]">Log</span>
        </button>
      </div>

    </div>
  )
}

export default ChatPanel