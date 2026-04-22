import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { FormData } from "../types/types"

const initialState: FormData = {
  id: undefined,
  hcp_name: "",
  interaction_type: "",
  date: "",
  time: "",
  sentiment: "",
  attendees: [],
  topics: "",
  materials_shared: [],
  samples_distributed: [],
  outcomes: "",
  follow_up_actions: ""
}

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateForm: (state, action: PayloadAction<Partial<FormData>>) => {
      return { ...state, ...action.payload }
    },
    clearForm: () => initialState
  }
})

export const { updateForm, clearForm } = formSlice.actions
export default formSlice.reducer