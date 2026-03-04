import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, TrendingUp, MessageSquare, Trophy, Plus, ArrowRight } from 'lucide-react';
import api from '../lib/api';
import { useAuth } from '../context/AuthContext';
import JobModal from '../components/JobModal';
import toast from 'react-hot-toast';

const STATUS_COLORS = {
  Applied: 'text-sky bg-sky/10 border-sky/20',
  Interview: 'text-amber bg-amber/10 border-amber/20',
  Offer: 'text-jade bg-jade/10 border-jade/20',
  Rejected: 'text-rose bg-rose/10 border-rose/20',
};

export default function DashboardPage() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const fetchData = async () => {
    try {
      const [jobsRes, statsRes] = await Promise.all([
        api.get('/jobs'),
        api.get('/jobs/stats'),
      ]);
      setJobs(jobsRes.data);
      setStats(statsRes.data);
    } catch {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const statCards = stats ? [
    { label: 'Total Applied', value: stats.total, icon: Briefcase, color: 'text-accent' },
    { label: 'Interviews', value: stats.interview, icon: MessageSquare, color: 'text-amber' },
    { label: 'Offers', value: stats.offer, icon: Trophy, color: 'text-jade' },
    { label: 'Response Rate', value: stats.total ? `${Math.round(((stats.interview + stats.offer) / stats.total) * 100)}%` : '0%', icon: TrendingUp, color: 'text-sky' },
  ] : [];

  return (
    <div className="max-w-5xl mx-auto animate-fadeUp">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-3xl text-white">Hey, {user?.name?.split(' ')[0]} 👋</h1>
          <p className="text-gray-500 text-sm mt-1">Here's your job hunt overview</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-2">
          <Plus size={15} /> Add Job
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[...Array(4)].map((_, i) => <div key={i} className="card p-5 h-24 skeleton" />)}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {statCards.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="card p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-gray-500 font-body">{label}</span>
                <Icon size={14} className={color} />
              </div>
              <div className={`font-display font-bold text-3xl ${color}`}>{value}</div>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 mb-8">
        <Link to="/board" className="card p-5 hover:border-accent/40 transition-colors group cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-display font-semibold text-white mb-1">Kanban Board</div>
              <div className="text-xs text-gray-500">Track status visually</div>
            </div>
            <ArrowRight size={16} className="text-gray-600 group-hover:text-accent transition-colors" />
          </div>
        </Link>
      </div>

      <div>
        <h2 className="font-display font-semibold text-lg mb-4">Recent Applications</h2>
        {loading ? (
          <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="card h-16 skeleton" />)}</div>
        ) : jobs.length === 0 ? (
          <div className="card p-10 text-center">
            <Briefcase size={28} className="text-gray-700 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">No applications yet. Add your first one!</p>
            <button onClick={() => setShowModal(true)} className="btn-primary mt-4 inline-flex items-center gap-2">
              <Plus size={14} /> Add Job
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {jobs.slice(0, 6).map(job => (
              <div key={job._id} className="card px-5 py-4 flex items-center justify-between hover:border-ink-600 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-lg bg-ink-700 flex items-center justify-center text-xs font-display font-bold text-gray-300">
                    {job.company[0]}
                  </div>
                  <div>
                    <div className="font-body font-medium text-sm text-white">{job.role}</div>
                    <div className="text-xs text-gray-500">{job.company} {job.location && `· ${job.location}`}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`status-badge border ${STATUS_COLORS[job.status]}`}>{job.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && <JobModal onClose={() => setShowModal(false)} onSave={() => { setShowModal(false); fetchData(); }} />}
    </div>
  );
}