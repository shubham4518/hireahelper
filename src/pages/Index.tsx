import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Users, Briefcase, Shield } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";

const features = [
  { icon: Briefcase, title: "Post Any Task", desc: "From moving to cleaning, post any task you need help with" },
  { icon: Users, title: "Find Helpers", desc: "Browse verified helpers ready to assist you on demand" },
  { icon: Shield, title: "Secure Payments", desc: "Pay securely through the platform with full protection" },
  { icon: CheckCircle, title: "Get It Done", desc: "Track progress and mark tasks complete with confidence" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 lg:px-16 py-5 border-b border-border">
        <BrandLogo />
        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost" className="text-foreground font-medium">Login</Button>
          </Link>
          <Link to="/signup">
            <Button className="gradient-brand text-primary-foreground hover:opacity-90 font-semibold">Sign Up</Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 lg:px-16 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl lg:text-7xl font-extrabold text-foreground mb-6 leading-tight">
            Get Help with
            <span className="gradient-brand-text"> Any Task</span>
            <br />On Demand
          </h1>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            HireHelper connects you with skilled people ready to help with moving, cleaning, assembly, and more. Post a task, get matched, get it done.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup">
              <Button size="lg" className="gradient-brand text-primary-foreground hover:opacity-90 text-lg px-8 h-14 font-semibold gap-2">
                Get Started <ArrowRight size={20} />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="outline" className="text-lg px-8 h-14 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold">
                Browse Tasks
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 lg:px-16 py-20 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-foreground mb-4">How It Works</h2>
          <p className="text-center text-muted-foreground mb-14 max-w-xl mx-auto">Simple steps to get the help you need</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <div key={i} className="bg-card rounded-2xl p-6 border border-border hover:shadow-xl transition-shadow group text-center">
                <div className="w-14 h-14 rounded-xl gradient-brand flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform">
                  <f.icon className="text-primary-foreground" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-16 py-20">
        <div className="max-w-4xl mx-auto gradient-brand rounded-3xl p-12 lg:p-16 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">Ready to get started?</h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
            Join thousands of people getting tasks done every day
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 text-lg px-10 h-14 font-semibold">
              Create Free Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 lg:px-16 py-8 text-center text-sm text-muted-foreground">
        © 2026 HireHelper. All rights reserved.
      </footer>
    </div>
  );
};

export default Index;
