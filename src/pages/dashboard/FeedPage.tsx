import { MapPin, Clock, DollarSign, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";

const categoryImages: Record<string, string> = {
  Moving: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=300&h=200&fit=crop",
  Garden: "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=300&h=200&fit=crop",
  Assembly: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=200&fit=crop",
  Cleaning: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300&h=200&fit=crop",
  Delivery: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=300&h=200&fit=crop",
  Handyman: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=300&h=200&fit=crop",
};

const defaultImage = "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300&h=200&fit=crop";

const fetchTasks = async () => {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("status", "open")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
};

const FeedPage = () => {
  const { data: tasks, isLoading, error } = useQuery({
    queryKey: ["tasks-feed"],
    queryFn: fetchTasks,
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Feed</h1>
        <p className="text-sm text-muted-foreground">Browse the latest task listings</p>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {error && (
        <p className="text-center text-destructive py-10">Failed to load tasks. Please try again.</p>
      )}

      {tasks && tasks.length === 0 && (
        <p className="text-center text-muted-foreground py-10">No tasks posted yet. Be the first to post one!</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {tasks?.map(task => (
          <div key={task.id} className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer">
            <div className="relative h-44 overflow-hidden">
              <img
                src={categoryImages[task.category] || defaultImage}
                alt={task.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground border-0">{task.category}</Badge>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-foreground mb-1 line-clamp-1">{task.title}</h3>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{task.description}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin size={12} /> {task.location}</span>
                <span className="flex items-center gap-1"><Clock size={12} /> {formatDistanceToNow(new Date(task.created_at), { addSuffix: true })}</span>
              </div>
              <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                <span className="flex items-center gap-1 text-primary font-bold text-lg">
                  <DollarSign size={16} />{task.budget}
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
