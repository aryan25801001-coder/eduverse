import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-[#030014] text-white overflow-hidden relative">
      {/* Background ambient light */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-purple/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-brand-blue/20 blur-[120px] pointer-events-none" />
      
      <Sidebar />
      
      <div className="flex-1 flex flex-col ml-64 relative z-10 h-screen overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
