import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Mail } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const handleVerify = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen gradient-brand flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="absolute rounded-full bg-primary-foreground/20" style={{
            width: `${150 + i * 100}px`, height: `${150 + i * 100}px`,
            top: `${Math.random() * 80}%`, left: `${Math.random() * 80}%`,
          }} />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-md text-center">
        <div className="mb-8 flex justify-center">
          <BrandLogo variant="light" />
        </div>

        <div className="mb-6">
          <div className="w-16 h-16 rounded-full bg-primary-foreground/20 flex items-center justify-center mx-auto mb-6">
            <Mail className="text-primary-foreground" size={28} />
          </div>
          <h1 className="text-3xl font-bold text-primary-foreground mb-2">Verify your email</h1>
          <p className="text-primary-foreground/80">
            Enter the 6-digit code we sent to your email
          </p>
        </div>

        <div className="flex flex-col items-center gap-6">
          <div>
            <p className="text-primary-foreground/70 text-sm mb-3">Verification Code</p>
            <InputOTP maxLength={6} value={otp} onChange={setOtp}>
              <InputOTPGroup className="gap-2">
                {[0, 1, 2, 3, 4, 5].map(i => (
                  <InputOTPSlot key={i} index={i} className="w-12 h-14 text-lg bg-primary-foreground/20 border-primary-foreground/30 text-primary-foreground rounded-lg" />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>

          <Button onClick={handleVerify} className="w-full max-w-xs bg-primary-foreground text-primary hover:bg-primary-foreground/90 h-12 text-base font-semibold">
            Verify
          </Button>

          <p className="text-primary-foreground/70 text-sm">
            Didn't receive the code?{" "}
            <button className="text-primary-foreground font-semibold underline">Resend</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
