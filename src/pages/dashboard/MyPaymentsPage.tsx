import { CreditCard, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const payments = [
  { id: 1, title: "Help with moving furniture", amount: "$120", type: "earned", date: "Mar 13, 2026", status: "completed" },
  { id: 2, title: "Deep cleaning for apartment", amount: "$150", type: "paid", date: "Mar 11, 2026", status: "completed" },
  { id: 3, title: "Assemble IKEA furniture", amount: "$95", type: "earned", date: "Mar 9, 2026", status: "pending" },
];

const MyPaymentsPage = () => {
  const totalEarned = payments.filter(p => p.type === "earned" && p.status === "completed").reduce((sum, p) => sum + parseInt(p.amount.replace("$", "")), 0);
  const totalSpent = payments.filter(p => p.type === "paid" && p.status === "completed").reduce((sum, p) => sum + parseInt(p.amount.replace("$", "")), 0);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">My Payments</h1>
        <p className="text-sm text-muted-foreground">Track your earnings and expenses</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-card rounded-xl border border-border p-5">
          <p className="text-sm text-muted-foreground mb-1">Total Earned</p>
          <p className="text-2xl font-bold text-green-600">${totalEarned}</p>
        </div>
        <div className="bg-card rounded-xl border border-border p-5">
          <p className="text-sm text-muted-foreground mb-1">Total Spent</p>
          <p className="text-2xl font-bold text-primary">${totalSpent}</p>
        </div>
        <div className="bg-card rounded-xl border border-border p-5">
          <p className="text-sm text-muted-foreground mb-1">Net Balance</p>
          <p className="text-2xl font-bold text-foreground">${totalEarned - totalSpent}</p>
        </div>
      </div>

      {/* Transactions */}
      <h2 className="text-lg font-semibold text-foreground mb-4">Transaction History</h2>
      {payments.length === 0 ? (
        <div className="text-center py-20">
          <CreditCard className="mx-auto text-muted-foreground mb-4" size={48} />
          <h3 className="text-lg font-semibold text-foreground mb-2">No payments yet</h3>
          <p className="text-muted-foreground">Your payment history will appear here</p>
        </div>
      ) : (
        <div className="space-y-3">
          {payments.map(payment => (
            <div key={payment.id} className="bg-card rounded-xl border border-border p-4 flex items-center justify-between hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${payment.type === "earned" ? "bg-green-100" : "bg-primary/10"}`}>
                  {payment.type === "earned" ? <ArrowDownLeft className="text-green-600" size={18} /> : <ArrowUpRight className="text-primary" size={18} />}
                </div>
                <div>
                  <p className="font-medium text-foreground">{payment.title}</p>
                  <p className="text-xs text-muted-foreground">{payment.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-bold ${payment.type === "earned" ? "text-green-600" : "text-primary"}`}>
                  {payment.type === "earned" ? "+" : "-"}{payment.amount}
                </p>
                <Badge variant={payment.status === "completed" ? "default" : "secondary"} className="text-xs">
                  {payment.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPaymentsPage;
