import { MapPin, Clock, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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

const FeedPage = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Feed</h1>
        <p className="text-sm text-muted-foreground">Browse the latest task listings</p>
      </div>
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
  );
};

export default FeedPage;
