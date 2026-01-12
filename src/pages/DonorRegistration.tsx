import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Droplet, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { indianDistricts, bloodGroups } from "@/data/indianDistricts";

const DonorRegistration = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    bloodGroup: "",
    mobileNumber: "",
    district: "",
    lastDonationDate: "",
    hasWhatsapp: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.bloodGroup || !formData.mobileNumber || !formData.district) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.from("donors").insert({
        full_name: formData.fullName,
        blood_group: formData.bloodGroup as "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-",
        mobile_number: formData.mobileNumber,
        district: formData.district,
        last_donation_date: formData.lastDonationDate || null,
        has_whatsapp: formData.hasWhatsapp,
      });

      if (error) throw error;

      toast({
        title: "Registration Successful!",
        description: "Thank you for registering as a blood donor. You're a lifesaver!",
      });
      
      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary py-4 px-6 shadow-md">
        <div className="container mx-auto flex items-center gap-3">
          <Droplet className="h-8 w-8 text-primary-foreground" />
          <h1 className="text-2xl font-bold text-primary-foreground">
            LifeFlow Blood Bank
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-card-foreground mb-2">
            Register as Blood Donor
          </h2>
          <p className="text-muted-foreground mb-6">
            Fill in your details to become a blood donor and save lives.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                required
              />
            </div>

            {/* Blood Group */}
            <div className="space-y-2">
              <Label htmlFor="bloodGroup">Blood Group *</Label>
              <Select
                value={formData.bloodGroup}
                onValueChange={(value) =>
                  setFormData({ ...formData, bloodGroup: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select blood group" />
                </SelectTrigger>
                <SelectContent>
                  {bloodGroups.map((group) => (
                    <SelectItem key={group} value={group}>
                      {group}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Mobile Number */}
            <div className="space-y-2">
              <Label htmlFor="mobileNumber">Mobile Number *</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="mobileNumber"
                  type="tel"
                  placeholder="Enter 10-digit mobile number"
                  className="pl-10"
                  value={formData.mobileNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, mobileNumber: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            {/* WhatsApp Checkbox */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="hasWhatsapp"
                checked={formData.hasWhatsapp}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, hasWhatsapp: checked as boolean })
                }
              />
              <Label htmlFor="hasWhatsapp" className="text-sm font-normal">
                This number has WhatsApp
              </Label>
            </div>

            {/* District */}
            <div className="space-y-2">
              <Label htmlFor="district">District *</Label>
              <Select
                value={formData.district}
                onValueChange={(value) =>
                  setFormData({ ...formData, district: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your district" />
                </SelectTrigger>
                <SelectContent>
                  {indianDistricts.map((district) => (
                    <SelectItem key={district} value={district}>
                      {district}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Last Donation Date */}
            <div className="space-y-2">
              <Label htmlFor="lastDonationDate">
                Last Donation Date (Optional)
              </Label>
              <Input
                id="lastDonationDate"
                type="date"
                value={formData.lastDonationDate}
                onChange={(e) =>
                  setFormData({ ...formData, lastDonationDate: e.target.value })
                }
              />
              <p className="text-xs text-muted-foreground">
                Helps us determine your eligibility (3-month gap required)
              </p>
            </div>

            {/* Submit Button */}
            <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
              {isLoading ? "Registering..." : "Register as Donor"}
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default DonorRegistration;
