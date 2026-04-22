import { useState, useEffect } from "react";
import axios from "axios";
import type { InteractionResponse } from "../types/types";

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (interaction: InteractionResponse) => void;
}

function HistoryDrawer({ isOpen, onClose, onSelect }: HistoryDrawerProps) {
  const [interactions, setInteractions] = useState<InteractionResponse[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchInteractions = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/interactions`);
      setInteractions(res.data.interactions || []);
    } catch (err) {
      console.error("Failed to fetch interactions", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchInteractions();
    }
  }, [isOpen]);

  const handleDeleteAll = async () => {
    if (window.confirm("Are you sure you want to delete all interaction history? This cannot be undone.")) {
      try {
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/interactions`);
        setInteractions([]);
      } catch (err) {
        console.error("Failed to delete history", err);
      }
    }
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity z-40 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div className={`fixed top-0 left-0 h-full w-[380px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-[#f8fafc]">
          <div>
            <h2 className="text-lg font-bold text-[#1e293b]">Interaction History</h2>
            <p className="text-xs text-[#64748b] mt-1">Select a past interaction to load</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
          {loading ? (
            <div className="flex justify-center p-8 text-blue-500">
              <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          ) : interactions.length === 0 ? (
            <div className="text-center p-8 text-[#64748b]">
              <p className="text-sm">No interaction history found.</p>
            </div>
          ) : (
            interactions.map((interaction) => (
              <div 
                key={interaction.id}
                onClick={() => {
                  onSelect(interaction);
                  onClose();
                }}
                className="p-4 rounded-xl border border-gray-100 hover:border-blue-300 hover:shadow-md hover:bg-blue-50 cursor-pointer transition-all bg-white group"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-[#1e293b] text-sm group-hover:text-blue-700 transition-colors">
                    {interaction.hcp_name || "Unknown HCP"}
                  </h3>
                  <span className="text-[11px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                    {interaction.date || "No date"}
                  </span>
                </div>
                
                <p className="text-xs text-[#475569] line-clamp-2 leading-relaxed mb-3">
                  {interaction.topics || "No topics discussed."}
                </p>
                
                <div className="flex items-center gap-2">
                  {interaction.sentiment && (
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-md border border-gray-100 bg-gray-50 text-gray-600 capitalize">
                      {interaction.sentiment}
                    </span>
                  )}
                  {interaction.interaction_type && (
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-md border border-gray-100 bg-gray-50 text-gray-600">
                      {interaction.interaction_type}
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {interactions.length > 0 && (
          <div className="p-4 border-t border-gray-100 bg-white">
            <button 
              onClick={handleDeleteAll}
              className="w-full py-2.5 px-4 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors flex justify-center items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Clear All History
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default HistoryDrawer;
