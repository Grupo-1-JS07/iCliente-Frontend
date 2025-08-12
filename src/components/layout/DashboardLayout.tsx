import Sidebar from './Sidebar';
import Topbar from './Topbar';
import type { ReactNode } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
}

function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div
      className="min-h-screen flex animate-bg-move"
      style={{
        background: 'linear-gradient(120deg, #0f2027 0%, #2c5364 100%)',
        backgroundSize: '200% 200%',
      }}
    >
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen ml-0 md:ml-64">
        <Topbar />
        <main
          className="flex-1 pt-24 pb-6 px-2 md:px-6 lg:px-10"
          style={{ minHeight: 'calc(100vh - 5rem)' }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
