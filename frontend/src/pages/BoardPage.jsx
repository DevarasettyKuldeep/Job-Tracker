import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import api from '../lib/api';
import toast from 'react-hot-toast';
import JobModal from '../components/JobModal';
import JobCard from '../components/JobCard';

const COLUMNS = [
  { status: 'Applied', color: 'border-sky/40', dot: 'bg-sky' },
  { status: 'Interview', color: 'border-amber/40', dot: 'bg-amber' },
  { status: 'Offer', color: 'border-jade/40', dot: 'bg-jade' },
  { status: 'Rejected', color: 'border-rose/40', dot: 'bg-rose' },
];

export default function BoardPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editJob, setEditJob] = useState(null);

  const fetchJobs = async () => {
    try {
      const res = await api.get('/jobs');
      setJobs(res.data);
    } catch {
      toast.error('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchJobs(); }, []);

  const handleStatusChange = async (jobId, newStatus) => {
    try {
      await api.put(`/jobs/${jobId}`, { status: newStatus });
      setJobs(prev => prev.map(j => j._id === jobId ? { ...j, status: newStatus } : j));
      toast.success(`Moved to ${newStatus}`);
    } catch {
      toast.error('Update failed');
    }
  };

  const handleDelete = async (jobId) => {
    if (!confirm('Delete this application?')) return;
    try {
      await api.delete(`/jobs/${jobId}`);
      setJobs(prev => prev.filter(j => j._id !== jobId));
      toast.success('Deleted');
    } catch {
      toast.error('Delete failed');
    }
  };

  return (
    <div className="animate-fadeUp">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-3xl text-white">Board</h1>
          <p className="text-gray-500 text-sm mt-1">Move cards between columns to update status</p>
        </div>
        <button onClick={() => { setEditJob(null); setShowModal(true); }} className="btn-primary flex items-center gap-2">
          <Plus size={15} /> Add Job
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {COLUMNS.map(col => {
          const colJobs = jobs.filter(j => j.status === col.status);
          return (
            <div key={col.status} className={`card border-t-2 ${col.color} p-4`}>
              <div className="flex items-center gap-2 mb-4">
                <div className={`w-2 h-2 rounded-full ${col.dot}`} />
                <span className="font-display font-semibold text-sm text-white">{col.status}</span>
                <span className="ml-auto text-xs text-gray-500 font-mono">{colJobs.length}</span>
              </div>
              {loading ? (
                <div className="space-y-2">{[...Array(2)].map((_, i) => <div key={i} className="rounded-xl h-20 skeleton" />)}</div>
              ) : (
                <div className="space-y-2 min-h-[80px]">
                  {colJobs.map(job => (
                    <JobCard
                      key={job._id}
                      job={job}
                      onEdit={() => { setEditJob(job); setShowModal(true); }}
                      onDelete={() => handleDelete(job._id)}
                      onStatusChange={handleStatusChange}
                      statuses={COLUMNS.map(c => c.status)}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {showModal && (
        <JobModal
          job={editJob}
          onClose={() => { setShowModal(false); setEditJob(null); }}
          onSave={() => { setShowModal(false); setEditJob(null); fetchJobs(); }}
        />
      )}
    </div>
  );
}