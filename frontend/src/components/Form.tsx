import { useSelector, useDispatch } from "react-redux"
import { updateForm } from "../store/formSlice"
import type { RootState } from "../store/store"

function Form() {
  const form = useSelector((state: RootState) => state.form)
  const dispatch = useDispatch()

  const handleUpdate = (field: string, value: any) => {
    dispatch(updateForm({ [field]: value }))
  }

  return (
    <div className="h-full bg-[#f8fafc] flex flex-col relative">
      {/* Header */}
      <div className="pt-4 pb-3 px-6 sticky top-0 bg-[#f8fafc] z-10 shrink-0">
        <h1 className="text-xl font-bold text-[#334155]">Log HCP Interaction</h1>
      </div>

      {/* Scrollable Form Body */}
      <div className="flex-1 overflow-y-auto px-6 pb-8 space-y-6 custom-scrollbar bg-white mx-6 mb-6 rounded-lg border border-gray-200 shadow-sm pt-6">

        {/* Interaction Details */}
        <section>
          <h3 className="text-[13px] font-semibold text-[#1e293b] mb-3">Interaction Details</h3>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <label className="block text-[12px] font-medium text-[#475569] mb-1.5">HCP Name</label>
              <input
                type="text"
                placeholder="Search or select HCP..."
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-[#334155] text-[13px] focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors"
                value={form.hcp_name || ""}
                onChange={(e) => handleUpdate("hcp_name", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-[#475569] mb-1.5">Interaction Type</label>
              <select
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-[#334155] text-[13px] focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors appearance-none"
                value={form.interaction_type || ""}
                onChange={(e) => handleUpdate("interaction_type", e.target.value)}
              >
                <option value="">Meeting</option>
                <option value="Meeting">Meeting</option>
                <option value="Call">Call</option>
                <option value="Email">Email</option>
                <option value="Event">Event</option>
              </select>
            </div>
            <div>
              <label className="block text-[12px] font-medium text-[#475569] mb-1.5">Date</label>
              <div className="relative">
                <input
                  type="date"
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-[#334155] text-[13px] focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors"
                  value={form.date || ""}
                  onChange={(e) => handleUpdate("date", e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-[12px] font-medium text-[#475569] mb-1.5">Time</label>
              <div className="relative">
                <input
                  type="time"
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-[#334155] text-[13px] focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors"
                  value={form.time || ""}
                  onChange={(e) => handleUpdate("time", e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Attendees */}
        <section>
          <label className="block text-[13px] font-semibold text-[#1e293b] mb-1.5">Attendees</label>
          <div className="relative flex items-center">
             <input
                type="text"
                placeholder="Enter names or search... (Press Enter)"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-[#334155] text-[13px] focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                    e.preventDefault();
                    const newAttendees = [...(form.attendees || []), e.currentTarget.value.trim()];
                    handleUpdate("attendees", newAttendees);
                    e.currentTarget.value = "";
                  }
                }}
             />
          </div>
          {form.attendees && form.attendees.length > 0 && (
             <div className="flex flex-wrap gap-2 mt-2">
               {form.attendees.map((attendee, idx) => (
                 <span key={idx} className="px-2 py-1 bg-[#f1f5f9] border border-gray-200 text-[#475569] rounded text-[12px] font-medium">
                   {attendee}
                 </span>
               ))}
             </div>
          )}
        </section>

        {/* Topics Discussed */}
        <section>
          <label className="block text-[13px] font-semibold text-[#1e293b] mb-1.5">Topics Discussed</label>
          <textarea
            rows={3}
            placeholder="Enter key discussion points..."
            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-[#334155] text-[13px] leading-relaxed focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors resize-y"
            value={form.topics || ""}
            onChange={(e) => handleUpdate("topics", e.target.value)}
          />
          <button className="flex items-center gap-1.5 mt-2 px-3 py-1.5 bg-[#f1f5f9] border border-gray-200 rounded text-[#475569] hover:bg-gray-100 transition-colors w-fit">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            <span className="text-[12px] font-medium">Summarize from Voice Note (Requires Consent)</span>
          </button>
        </section>

        {/* Materials / Samples */}
        <section>
          <h3 className="text-[13px] font-semibold text-[#1e293b] mb-3">Materials Shared / Samples Distributed</h3>
          
          <div className="mb-4 p-3 border border-gray-200 rounded-md bg-white flex justify-between items-center">
            <div>
              <h4 className="text-[13px] font-medium text-[#334155] mb-1">Materials Shared</h4>
              <p className="text-[12px] text-gray-400 italic">
                {form.materials_shared && form.materials_shared.length > 0 ? form.materials_shared.join(", ") : "No materials added."}
              </p>
            </div>
            <button 
              onClick={() => {
                const item = window.prompt("Enter material to add:");
                if (item && item.trim()) {
                  handleUpdate("materials_shared", [...(form.materials_shared || []), item.trim()]);
                }
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded bg-white text-[#475569] text-[12px] font-medium hover:bg-gray-50 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search/Add
            </button>
          </div>

          <div className="p-3 border border-gray-200 rounded-md bg-white flex justify-between items-center">
            <div>
              <h4 className="text-[13px] font-medium text-[#334155] mb-1">Samples Distributed</h4>
              <p className="text-[12px] text-gray-400 italic">
                {form.samples_distributed && form.samples_distributed.length > 0 ? form.samples_distributed.join(", ") : "No samples added."}
              </p>
            </div>
            <button 
              onClick={() => {
                const item = window.prompt("Enter sample to add:");
                if (item && item.trim()) {
                  handleUpdate("samples_distributed", [...(form.samples_distributed || []), item.trim()]);
                }
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded bg-white text-[#475569] text-[12px] font-medium hover:bg-gray-50 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Sample
            </button>
          </div>
        </section>

        {/* Sentiment */}
        <section>
          <h3 className="text-[13px] font-semibold text-[#1e293b] mb-2">Observed/Inferred HCP Sentiment</h3>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="radio" name="sentiment" value="positive" className="w-3.5 h-3.5 text-blue-600 focus:ring-blue-500" checked={form.sentiment?.toLowerCase() === 'positive'} onChange={() => handleUpdate("sentiment", "positive")} />
              <span className="flex items-center gap-1.5 text-[13px] font-medium text-[#475569]">
                <span>😊</span> Positive
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="radio" name="sentiment" value="neutral" className="w-3.5 h-3.5 text-blue-600 focus:ring-blue-500" checked={form.sentiment?.toLowerCase() === 'neutral'} onChange={() => handleUpdate("sentiment", "neutral")} />
              <span className="flex items-center gap-1.5 text-[13px] font-medium text-[#475569]">
                <span>😐</span> Neutral
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="radio" name="sentiment" value="negative" className="w-3.5 h-3.5 text-blue-600 focus:ring-blue-500" checked={form.sentiment?.toLowerCase() === 'negative'} onChange={() => handleUpdate("sentiment", "negative")} />
              <span className="flex items-center gap-1.5 text-[13px] font-medium text-[#475569]">
                <span>😞</span> Negative
              </span>
            </label>
          </div>
        </section>

        {/* Outcomes */}
        <section>
          <label className="block text-[13px] font-semibold text-[#1e293b] mb-1.5">Outcomes</label>
          <textarea
            rows={2}
            placeholder="Key outcomes or agreements..."
            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-[#334155] text-[13px] focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors resize-y"
            value={form.outcomes || ""}
            onChange={(e) => handleUpdate("outcomes", e.target.value)}
          />
        </section>

        {/* Follow-up Actions */}
        <section>
          <label className="block text-[13px] font-semibold text-[#1e293b] mb-1.5">Follow-up Actions</label>
          <textarea
            rows={2}
            placeholder="Enter next steps or tasks..."
            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-[#334155] text-[13px] focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors resize-y mb-3"
            value={form.follow_up_actions || ""}
            onChange={(e) => handleUpdate("follow_up_actions", e.target.value)}
          />
          
          <div className="bg-[#f8fafc] p-3 rounded-md">
            <h4 className="text-[11px] font-semibold text-[#64748b] uppercase tracking-wider mb-2">AI Suggested Follow-ups:</h4>
            <ul className="space-y-1">
              <li><button className="text-blue-600 hover:text-blue-700 text-[12px] font-medium hover:underline">+ Schedule follow-up meeting in 2 weeks</button></li>
              <li><button className="text-blue-600 hover:text-blue-700 text-[12px] font-medium hover:underline">+ Send OncoBoost Phase III PDF</button></li>
              <li><button className="text-blue-600 hover:text-blue-700 text-[12px] font-medium hover:underline">+ Add Dr. Sharma to advisory board invite list</button></li>
            </ul>
          </div>
        </section>

      </div>
    </div>
  )
}

export default Form