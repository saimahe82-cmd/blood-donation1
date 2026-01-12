import { Phone, MessageCircle, MapPin, Calendar, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Tables } from "@/integrations/supabase/types";

type Donor = Tables<"donors">;

interface DonorCardProps {
  donor: Donor;
}

const DonorCard = ({ donor }: DonorCardProps) => {
  const isEligible = () => {
    if (!donor.last_donation_date) return true;
    
    const lastDonation = new Date(donor.last_donation_date);
    const today = new Date();
    const diffMonths =
      (today.getFullYear() - lastDonation.getFullYear()) * 12 +
      (today.getMonth() - lastDonation.getMonth());
    
    return diffMonths >= 3;
  };

  const eligible = isEligible();

  const handleCall = () => {
    window.open(`tel:${donor.mobile_number}`, "_self");
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hello ${donor.full_name}, I found your contact on LifeFlow Blood Bank. I need ${donor.blood_group} blood. Can you please help?`
    );
    window.open(`https://wa.me/91${donor.mobile_number}?text=${message}`, "_blank");
  };

  return (
    <div className="bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="font-semibold text-card-foreground text-lg">
            {donor.full_name}
          </h4>
          <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
            <MapPin className="h-3 w-3" />
            {donor.district}
          </div>
        </div>
        <Badge
          variant="secondary"
          className="bg-primary/10 text-primary font-bold text-lg px-3 py-1"
        >
          {donor.blood_group}
        </Badge>
      </div>

      {/* Eligibility Status */}
      <div className="flex items-center gap-2 mb-4">
        {eligible ? (
          <div className="flex items-center gap-1.5 text-green-600 text-sm">
            <CheckCircle className="h-4 w-4" />
            <span>Eligible to donate</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-amber-600 text-sm">
            <XCircle className="h-4 w-4" />
            <span>Recently donated</span>
          </div>
        )}
        {donor.last_donation_date && (
          <div className="flex items-center gap-1 text-muted-foreground text-sm ml-auto">
            <Calendar className="h-3 w-3" />
            Last: {new Date(donor.last_donation_date).toLocaleDateString("en-IN")}
          </div>
        )}
      </div>

      {/* Contact Buttons */}
      <div className="flex gap-3">
        <Button
          variant="outline"
          className="flex-1"
          onClick={handleCall}
        >
          <Phone className="h-4 w-4 mr-2" />
          Call
        </Button>
        {donor.has_whatsapp && (
          <Button
            className="flex-1 bg-green-600 hover:bg-green-700"
            onClick={handleWhatsApp}
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            WhatsApp
          </Button>
        )}
      </div>
    </div>
  );
};

export default DonorCard;
