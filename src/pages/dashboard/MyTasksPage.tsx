import { ClipboardList, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const myTasks = [
  { id: 1, title: "Fix leaking faucet", status: "in_progress", date: "Mar 12, 2026", budget: "$75", applicants: 3 },
  { id: 2, title: "Paint bedroom walls", status: "completed", date: "Mar 10, 2026", budget: "$200", applicants: 5 },
  { id: 3, title: "Install ceiling fan", status: "open", date: "Mar 14, 2026", budget: "$90", applicants: 1 },
];

const statusConfig: Record<string, { label: string; icon: typeof Clock; className: string }> = {
  open: { label: "Open", icon: AlertCircle, className: "bg-accent text-accent-foreground" },
  in_progress: { label: "In Progress", icon: Clock, className: "bg-primary/10 text-primary" },
  completed: { label: "Completed", icon: CheckCircle, className: "bg-green-100 text-green-700" },
};

const MyTasksPage = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">My Tasks</h1>
        <p className="text-sm text-muted-foreground">Tasks you've posted for helpers</p>
      </div>

      {myTasks.length === 0 ? (
        <div className="text-center py-20">
          <ClipboardList className="mx-auto text-muted-foreground mb-4" size={48} />
          <h3 className="text-lg font-semibold text-foreground mb-2">No tasks yet</h3>
          <p className="text-muted-foreground">Post your first task to get started</p>
        </div>
      ) : (
        <div className="space-y-4">
          {myTasks.map(task => {
            const status = statusConfig[task.status];
            return (
              <div key={task.id} className="bg-card rounded-xl border border-border p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-shadow">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-foreground">{task.title}</h3>
                    <Badge className={status.className}>{status.label}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{task.date}</span>
                    <span>Budget: {task.budget}</span>
                    <span>{task.applicants} applicant{task.applicants !== 1 ? "s" : ""}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  View Details
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyTasksPage;
