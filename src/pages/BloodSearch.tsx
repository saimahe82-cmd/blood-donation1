import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Droplet, Search, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { indianDistricts, bloodGroups, urgencyLevels } from "@/data/indianDistricts";
import DonorCard from "@/components/DonorCard";
import type { Tables } from "@/integrations/supabase/types";

type Donor = Tables<"donors">;

const BloodSearch = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [donors, setDonors] = useState<Donor[]>([]);
  const [searchParams, setSearchParams] = useState({
    bloodGroup: "",
    district: "",
    urgency: "normal",
  });

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchParams.bloodGroup || !searchParams.district) {
      toast({
        title: "Missing Information",
        description: "Please select both blood group and district.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setHasSearched(true);

    try {
      const { data, error } = await supabase
        .from("donors")
        .select("*")
        .eq("blood_group", searchParams.bloodGroup as "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-")
        .eq("district", searchParams.district)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setDonors(data || []);
      
      if (data?.length === 0) {
        toast({
          title: "No Donors Found",
          description: "Try searching in nearby districts or with compatible blood groups.",
        });
      }
    } catch (error) {
      console.error("Search error:", error);
      toast({
        title: "Search Failed",
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

      <main className="container mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="max-w-xl mx-auto">
          <div className="bg-card border border-border rounded-2xl p-8 shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-card-foreground mb-2">
              Find Blood Donors
            </h2>
            <p className="text-muted-foreground mb-6">
              Search for available blood donors in your district.
            </p>

            <form onSubmit={handleSearch} className="space-y-5">
              {/* Blood Group */}
              <div className="space-y-2">
                <Label htmlFor="bloodGroup">Required Blood Group *</Label>
                <Select
                  value={searchParams.bloodGroup}
                  onValueChange={(value) =>
                    setSearchParams({ ...searchParams, bloodGroup: value })
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

              {/* District */}
              <div className="space-y-2">
                <Label htmlFor="district">District *</Label>
                <Select
                  value={searchParams.district}
                  onValueChange={(value) =>
                    setSearchParams({ ...searchParams, district: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select district" />
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

              {/* Urgency Level */}
              <div className="space-y-3">
                <Label>Urgency Level</Label>
                <RadioGroup
                  value={searchParams.urgency}
                  onValueChange={(value) =>
                    setSearchParams({ ...searchParams, urgency: value })
                  }
                  className="flex flex-wrap gap-4"
                >
                  {urgencyLevels.map((level) => (
                    <div key={level.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={level.value} id={level.value} />
                      <Label
                        htmlFor={level.value}
                        className="flex items-center gap-2 font-normal cursor-pointer"
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${level.color}`}
                        />
                        {level.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Search Button */}
              <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                <Search className="h-4 w-4 mr-2" />
                {isLoading ? "Searching..." : "Search Donors"}
              </Button>
            </form>
          </div>

          {/* Search Results */}
          {hasSearched && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                {donors.length > 0
                  ? `Found ${donors.length} donor${donors.length > 1 ? "s" : ""}`
                  : "No donors found"}
              </h3>

              {donors.length === 0 ? (
                <div className="bg-muted/50 rounded-xl p-8 text-center">
                  <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    No donors found matching your criteria.
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Try searching in nearby districts or with compatible blood groups.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {donors.map((donor) => (
                    <DonorCard key={donor.id} donor={donor} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default BloodSearch;
