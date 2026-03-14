import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, ClipboardList, Users, CreditCard, Settings, LogOut, Search, Bell, Plus, MapPin, Clock, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import BrandLogo from "@/components/BrandLogo";

const navItems = [
  { icon: Home, label: "Feed", href: "#", active: true },
  { icon: ClipboardList, label: "My Tasks", href: "#" },
  { icon: Users, label: "My Requests", href: "#" },
  { icon: CreditCard, label: "My Payments", href: "#" },
  { icon: Settings, label: "Settings", href: "#" },
];

const tasks = [
  {
    id: 1, title: "Help with moving furniture", description: "Need someone to help move a couch and dining table to a new apartment. Must have a truck.", location: "Brooklyn, NY", time: "2 hours ago", budget: "$120", category: "Moving",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=300&h=200&fit=crop",
  },
  {
    id: 2, title: "Lawn mowing and garden cleanup", description: "Looking for someone to mow the lawn and trim hedges. Tools will be provided.", location: "Queens, NY", time: "4 hours ago", budget: "$80", category: "Garden",
    image: "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=300&h=200&fit=crop",
  },
  {
    id: 3, title: "Assemble IKEA furniture", description: "Need help assembling a wardrobe and bookshelf. All parts and tools included.", location: "Manhattan, NY", time: "1 day ago", budget: "$95", category: "Assembly",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=200&fit=crop",
  },
  {
    id: 4, title: "Deep cleaning for apartment", description: "3-bedroom apartment needs thorough cleaning before move-out. Supplies provided.", location: "Bronx, NY", time: "5 hours ago", budget: "$150", category: "Cleaning",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300&h=200&fit=crop",
  },
];

const Dashboard = () => {
  const [activeNav, setActiveNav] = useState("Feed");

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 gradient-brand flex-col p-6 text-primary-foreground">
        <div className="mb-10">
          <BrandLogo variant="light" />
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map(item => (
            <button
              key={item.label}
              onClick={() => setActiveNav(item.label)}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeNav === item.label
                  ? "bg-primary-foreground/20 text-primary-foreground"
                  : "text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
              }`}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-4 border-t border-primary-foreground/20">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 text-primary-foreground/70 hover:text-primary-foreground text-sm font-medium transition-colors">
            <LogOut size={20} />
            Logout
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Feed</h1>
            <p className="text-sm text-muted-foreground">Browse the latest task listings</p>
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
            <Button className="gradient-brand text-primary-foreground hover:opacity-90 gap-2">
              <Plus size={16} /> Post Task
            </Button>
          </div>
        </header>

        {/* Task grid */}
        <div className="p-6 flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {tasks.map(task => (
              <div key={task.id} className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer">
                <div className="relative h-44 overflow-hidden">
                  <img src={task.image} alt={task.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground border-0">{task.category}</Badge>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground mb-1 line-clamp-1">{task.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{task.description}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin size={12} /> {task.location}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {task.time}</span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                    <span className="flex items-center gap-1 text-primary font-bold text-lg">
                      <DollarSign size={16} />{task.budget.replace("$", "")}
                    </span>
                    <Button size="sm" variant="outline" className="text-xs border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                      Apply
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
