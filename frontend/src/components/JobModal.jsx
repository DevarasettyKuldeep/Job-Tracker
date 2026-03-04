import { useState } from 'react';
import { X } from 'lucide-react';
import api from '../lib/api';
import toast from 'react-hot-toast';

const STATUSES = ['Applied', 'Interview', 'Offer', 'Rejected'];

export default function JobModal({ job, onClose, onSave }) {
  const [form, setForm] = useState({
    company: job?.company || '',
    role: job?.role || '',
    status: job?.status || 'Applied',
    location: job?.location || '',
    salary: job?.salary || '',
    link: job?.link || '',
    notes: job?.notes || '',
    jobDescription: job?.jobDescription || '',
  });
  const [loading, setLoading] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handle = async () => {
    if (!form.company || !form.role) {
      toast.error('Company and role are required');
      return;
    }
    setLoading(true);
    try {
      if (job) {
        await api.put(`/jobs/${job._id}`, form);
        toast.success('Updated!');
      } else {
        await api.post('/jobs', form);
        toast.success('Job added!');
      }
      onSave();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="card w-full max-w-lg p-6 animate-fadeUp">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display font-bold text-lg">{job ? 'Edit Application' : 'Add Application'}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Company *</label>
              <input className="input" placeholder="e.g., Apple" value={form.company} onChange={e => set('company', e.target.value)} />
            </div>
            <div>
              <label className="label">Role *</label>
              <input className="input" placeholder="e.g., Software Engineer" value={form.role} onChange={e => set('role', e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Status</label>
              <select className="input" value={form.status} onChange={e => set('status', e.target.value)}>
                {STATUSES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Location</label>
              <input className="input" placeholder="e.g., Remote" value={form.location} onChange={e => set('location', e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Salary / Stipend</label>
              <input className="input" placeholder="e.g., ₹10,00,000/yr" value={form.salary} onChange={e => set('salary', e.target.value)} />
            </div>
            <div>
              <label className="label">Job Link</label>
              <input className="input" placeholder="https://..." value={form.link} onChange={e => set('link', e.target.value)} />
            </div>
          </div>

          <div>
            <label className="label">Job Description</label>
            <textarea className="input min-h-[80px] resize-none" placeholder="Job description..." value={form.jobDescription} onChange={e => set('jobDescription', e.target.value)} />
          </div>

          <div>
            <label className="label">Notes</label>
            <textarea className="input min-h-[60px] resize-none" placeholder="Referral, contact name, interview tips..." value={form.notes} onChange={e => set('notes', e.target.value)} />
          </div>
        </div>

        <div className="flex gap-3 mt-5 pt-4 border-t border-ink-700">
          <button onClick={onClose} className="btn-ghost flex-1">Cancel</button>
          <button onClick={handle} disabled={loading} className="btn-primary flex-1 flex items-center justify-center gap-2">
            {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : (job ? 'Save Changes' : 'Add Job')}
          </button>
        </div>
      </div>
    </div>
  );
}