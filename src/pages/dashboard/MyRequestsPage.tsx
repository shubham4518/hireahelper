import { Users, Clock, CheckCircle, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const requests = [
  { id: 1, title: "Help with moving furniture", status: "pending", appliedDate: "Mar 13, 2026", budget: "$120", poster: "John D." },
  { id: 2, title: "Deep cleaning for apartment", status: "accepted", appliedDate: "Mar 11, 2026", budget: "$150", poster: "Sarah M." },
  { id: 3, title: "Assemble IKEA furniture", status: "rejected", appliedDate: "Mar 9, 2026", budget: "$95", poster: "Mike R." },
];

const statusConfig: Record<string, { label: string; className: string }> = {
  pending: { label: "Pending", className: "bg-accent/20 text-accent" },
  accepted: { label: "Accepted", className: "bg-green-100 text-green-700" },
  rejected: { label: "Rejected", className: "bg-destructive/10 text-destructive" },
};

const MyRequestsPage = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">My Requests</h1>
        <p className="text-sm text-muted-foreground">Tasks you've applied to help with</p>
      </div>

      {requests.length === 0 ? (
        <div className="text-center py-20">
          <Users className="mx-auto text-muted-foreground mb-4" size={48} />
          <h3 className="text-lg font-semibold text-foreground mb-2">No requests yet</h3>
          <p className="text-muted-foreground">Browse the feed and apply to tasks</p>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map(req => {
            const status = statusConfig[req.status];
            return (
              <div key={req.id} className="bg-card rounded-xl border border-border p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-shadow">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-foreground">{req.title}</h3>
                    <Badge className={status.className}>{status.label}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Posted by {req.poster}</span>
                    <span>Applied: {req.appliedDate}</span>
                    <span>Budget: {req.budget}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  View Task
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyRequestsPage;
