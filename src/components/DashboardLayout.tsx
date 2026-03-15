import { Link, useLocation, Outlet } from "react-router-dom";
import { Home, ClipboardList, Users, CreditCard, Settings, LogOut, Search, Bell, Plus, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BrandLogo from "@/components/BrandLogo";
import PostTaskDialog from "@/components/PostTaskDialog";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

const navItems = [
  { icon: Home, label: "Feed", href: "/dashboard" },
  { icon: ClipboardList, label: "My Tasks", href: "/dashboard/my-tasks" },
  { icon: Users, label: "My Requests", href: "/dashboard/my-requests" },
  { icon: CreditCard, label: "My Payments", href: "/dashboard/my-payments" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

const DashboardLayout = () => {
  const { signOut } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [postTaskOpen, setPostTaskOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-foreground/40 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed md:static z-50 inset-y-0 left-0 w-64 gradient-brand flex flex-col p-6 text-primary-foreground transform transition-transform md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="mb-10">
          <BrandLogo variant="light" />
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map(item => {
            const isActive = location.pathname === item.href || 
              (item.href === "/dashboard" && location.pathname === "/dashboard");
            return (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : "text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
                }`}
              >
                <item.icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-4 border-t border-primary-foreground/20">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-primary-foreground/70 hover:text-primary-foreground text-sm font-medium transition-colors w-full">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-card border-b border-border px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button size="icon" variant="ghost" className="md:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu size={20} />
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <Input placeholder="Search tasks..." className="pl-9 w-64" />
            </div>
            <Button size="icon" variant="ghost" className="relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary" />
            </Button>
            <Button onClick={() => setPostTaskOpen(true)} className="gradient-brand text-primary-foreground hover:opacity-90 gap-2">
              <Plus size={16} /> Post Task
            </Button>
          </div>
        </header>

        <div className="flex-1 p-4 md:p-6">
          <Outlet />
        </div>
      </main>

      <PostTaskDialog open={postTaskOpen} onOpenChange={setPostTaskOpen} />
    </div>
  );
};

export default DashboardLayout;
