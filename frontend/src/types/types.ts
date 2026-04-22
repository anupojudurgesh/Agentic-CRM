export interface FormData {
  id?: number
  hcp_name: string
  interaction_type: string
  date: string
  time: string
  sentiment: string
  attendees: string[]
  topics: string
  materials_shared: string[]
  samples_distributed: string[]
  outcomes: string
  follow_up_actions: string
}

export interface InteractionResponse {
  id: number
  hcp_name: string | null
  interaction_type: string | null
  date: string | null
  time: string | null
  sentiment: string | null
  attendees: string[]
  topics: string | null
  materials_shared: string[]
  samples_distributed: string[]
  outcomes: string | null
  follow_up_actions: string | null
  created_at: string | null
}

export interface ChatResponse {
  action: string
  data: Partial<FormData>
  message: string
}

export interface Message {
  role: "user" | "ai"
  content: string
}