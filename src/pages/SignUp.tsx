import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import BrandLogo from "@/components/BrandLogo";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", phone: "", email: "", password: "", confirmPassword: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          full_name: `${form.firstName} ${form.lastName}`,
          phone: form.phone,
        },
        emailRedirectTo: window.location.origin,
      },
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Account created! Check your email to verify, or log in now.");
      navigate("/login");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left gradient panel */}
      <div className="hidden lg:flex lg:w-[45%] gradient-brand flex-col justify-center items-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="absolute rounded-full bg-primary-foreground/20" style={{
              width: `${100 + i * 80}px`, height: `${100 + i * 80}px`,
              top: `${10 + i * 15}%`, left: `${-5 + i * 10}%`,
            }} />
          ))}
        </div>
        <div className="relative z-10 text-center">
          <div className="mb-8"><BrandLogo variant="light" /></div>
          <h2 className="text-4xl font-bold text-primary-foreground mb-4">Hello Friend!</h2>
          <p className="text-primary-foreground/80 text-lg max-w-sm">
            Join Hire-a-Helper community by creating an account
          </p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 lg:p-16">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-between mb-2">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">← Back to website</Link>
            <div className="lg:hidden"><BrandLogo /></div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-8">Create Account</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="First Name" value={form.firstName} required
                  onChange={e => setForm({ ...form, firstName: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Last Name" value={form.lastName} required
                  onChange={e => setForm({ ...form, lastName: e.target.value })} />
              </div>
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" placeholder="Phone Number" value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Email Address" value={form.email} required
                onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Password" value={form.password} required
                onChange={e => setForm({ ...form, password: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" type="password" placeholder="Confirm Password" value={form.confirmPassword} required
                onChange={e => setForm({ ...form, confirmPassword: e.target.value })} />
            </div>

            <Button type="submit" disabled={loading} className="w-full gradient-brand text-primary-foreground hover:opacity-90 h-12 text-base font-semibold">
              {loading ? "Creating Account..." : "Sign Up"}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-semibold hover:underline">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
