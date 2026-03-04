import { useState } from 'react';
import { MoreHorizontal, Edit2, Trash2, ExternalLink, ChevronRight } from 'lucide-react';

const STATUS_COLORS = {
  Applied: 'text-sky',
  Interview: 'text-amber',
  Offer: 'text-jade',
  Rejected: 'text-rose',
};

export default function JobCard({ job, onEdit, onDelete, onStatusChange, statuses }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-ink-900 border border-ink-700 rounded-xl p-3.5 hover:border-ink-600 transition-colors group">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex-1 min-w-0">
          <div className="font-body font-medium text-sm text-white truncate">{job.role}</div>
          <div className="text-xs text-gray-500 truncate">{job.company}</div>
        </div>
        <div className="relative">
          <button
            onClick={() => setOpen(o => !o)}
            className="text-gray-600 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
          >
            <MoreHorizontal size={14} />
          </button>
          {open && (
            <div className="absolute right-0 top-5 bg-ink-800 border border-ink-700 rounded-xl py-1.5 z-10 min-w-[140px] shadow-xl">
              <button onClick={() => { setOpen(false); onEdit(); }} className="flex items-center gap-2 px-3 py-1.5 w-full text-xs text-gray-300 hover:text-white hover:bg-ink-700 transition-colors">
                <Edit2 size={11} /> Edit
              </button>
              {job.link && (
                <a href={job.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-1.5 w-full text-xs text-gray-300 hover:text-white hover:bg-ink-700 transition-colors">
                  <ExternalLink size={11} /> Open link
                </a>
              )}
              <div className="border-t border-ink-700 my-1" />
              <div className="px-3 py-1 text-xs text-gray-600 font-mono">Move to...</div>
              {statuses.filter(s => s !== job.status).map(s => (
                <button key={s} onClick={() => { setOpen(false); onStatusChange(job._id, s); }} className={`flex items-center gap-2 px-3 py-1.5 w-full text-xs hover:bg-ink-700 transition-colors ${STATUS_COLORS[s]}`}>
                  <ChevronRight size={10} /> {s}
                </button>
              ))}
              <div className="border-t border-ink-700 my-1" />
              <button onClick={() => { setOpen(false); onDelete(); }} className="flex items-center gap-2 px-3 py-1.5 w-full text-xs text-rose hover:bg-rose/10 transition-colors">
                <Trash2 size={11} /> Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        {job.location && <span className="text-xs text-gray-600 font-mono">{job.location}</span>}
      </div>
    </div>
  );
}