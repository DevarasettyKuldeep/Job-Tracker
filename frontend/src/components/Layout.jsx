import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Kanban, LogOut, Briefcase } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/board', icon: Kanban, label: 'Board' },
];

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out');
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen">
      <aside className="w-60 bg-ink-900 border-r border-ink-700 flex flex-col fixed top-0 left-0 h-full z-10">
        <div className="px-6 py-6 border-b border-ink-700">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <Briefcase size={15} className="text-white" />
            </div>
            <span className="font-display font-bold text-lg text-white">JobTracker</span>
          </div>
        </div>

        <nav className="flex-1 px-3 py-5 space-y-1">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-body font-medium transition-all duration-150 ${isActive
                  ? 'bg-accent-glow text-accent border border-accent/20'
                  : 'text-gray-400 hover:text-white hover:bg-ink-700'
                }`
              }
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-ink-700">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl">
            <div className="w-7 h-7 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center">
              <span className="text-xs font-display font-bold text-accent">
                {user?.name?.[0]?.toUpperCase()}
              </span>
            </div>
            <span className="text-sm font-body text-gray-300 flex-1 truncate">{user?.name}</span>
            <button onClick={handleLogout} className="text-gray-500 hover:text-rose transition-colors">
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 ml-60 p-8 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}