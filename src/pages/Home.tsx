import { Link } from "react-router-dom";
import { Heart, Search, Droplet } from "lucide-react";
import { Button } from "@/components/ui/button";

const Home = () => {
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

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Save Lives, Donate Blood
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with blood donors in your district. Every drop counts in saving precious lives.
            Join our community of life-savers today.
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Donate Blood Card */}
          <Link to="/donate" className="group">
            <div className="bg-card border border-border rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/50 h-full">
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 p-6 rounded-full mb-6 group-hover:bg-primary/20 transition-colors">
                  <Heart className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-card-foreground mb-3">
                  Donate Blood
                </h3>
                <p className="text-muted-foreground mb-6">
                  Register as a blood donor and help save lives in your community.
                  Your single donation can save up to 3 lives.
                </p>
                <Button size="lg" className="w-full">
                  Register as Donor
                </Button>
              </div>
            </div>
          </Link>

          {/* Need Blood Card */}
          <Link to="/search" className="group">
            <div className="bg-card border border-border rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/50 h-full">
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 p-6 rounded-full mb-6 group-hover:bg-primary/20 transition-colors">
                  <Search className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-card-foreground mb-3">
                  Need Blood
                </h3>
                <p className="text-muted-foreground mb-6">
                  Find blood donors in your area quickly. Search by blood group
                  and district to connect with donors.
                </p>
                <Button size="lg" variant="outline" className="w-full">
                  Search Donors
                </Button>
              </div>
            </div>
          </Link>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-3 gap-4 max-w-3xl mx-auto">
          <div className="text-center p-6 bg-muted/50 rounded-xl">
            <p className="text-3xl font-bold text-primary">24/7</p>
            <p className="text-sm text-muted-foreground">Available</p>
          </div>
          <div className="text-center p-6 bg-muted/50 rounded-xl">
            <p className="text-3xl font-bold text-primary">150+</p>
            <p className="text-sm text-muted-foreground">Districts</p>
          </div>
          <div className="text-center p-6 bg-muted/50 rounded-xl">
            <p className="text-3xl font-bold text-primary">Free</p>
            <p className="text-sm text-muted-foreground">Service</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-muted/30 py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            © 2025 LifeFlow Blood Bank. Together we save lives.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
