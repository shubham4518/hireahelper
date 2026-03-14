import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import BrandLogo from "@/components/BrandLogo";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left form panel */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 lg:p-16">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-between mb-2">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">← Back to website</Link>
            <div className="lg:hidden"><BrandLogo /></div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Log in to your account</h1>
          <p className="text-muted-foreground mb-8">Welcome back! Enter your credentials</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Email Address" value={email} required
                onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Password" value={password} required
                onChange={e => setPassword(e.target.value)} />
            </div>

            <Button type="submit" disabled={loading} className="w-full gradient-brand text-primary-foreground hover:opacity-90 h-12 text-base font-semibold">
              {loading ? "Logging in..." : "Login"}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary font-semibold hover:underline">Sign Up</Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right gradient panel */}
      <div className="hidden lg:flex lg:w-[45%] gradient-brand flex-col justify-center items-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="absolute rounded-full bg-primary-foreground/20" style={{
              width: `${100 + i * 80}px`, height: `${100 + i * 80}px`,
              top: `${10 + i * 15}%`, right: `${-5 + i * 10}%`,
            }} />
          ))}
        </div>
        <div className="relative z-10 text-center">
          <div className="mb-8"><BrandLogo variant="light" /></div>
          <h2 className="text-4xl font-bold text-primary-foreground mb-4">Welcome Back!</h2>
          <p className="text-primary-foreground/80 text-lg max-w-sm">
            Log in to your Hire-a-Helper account
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
