import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Globe, Users, Leaf, ShieldCheck } from 'lucide-react';
import heroImage from '@/assets/hero-farm.jpg';

export function Hero() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Navigate to marketplace with search query
      window.location.href = `/marketplace?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Connect
            <span className="text-accent block md:inline md:ml-4">
              Farms to Tables
            </span>
            <span className="block">Worldwide</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
            Direct marketplace connecting rural farmers with global buyers.
            Fresh produce, fair prices, sustainable agriculture.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex flex-col sm:flex-row gap-3 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/70" />
                <Input
                  type="text"
                  placeholder="Search for fresh produce, specific farmers, or locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-3 bg-white/20 border-white/30 text-white placeholder:text-white/70 text-lg"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <Button
                variant="hero"
                size="lg"
                onClick={handleSearch}
                className="px-8 py-3 text-lg font-semibold"
              >
                Search Fresh
              </Button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              variant="hero"
              size="lg"
              className="px-8 py-4 text-lg font-semibold"
              onClick={() => window.location.href = '/marketplace'}
            >
              Explore Marketplace
            </Button>
            <Button
              variant="harvest"
              size="lg"
              className="px-8 py-4 text-lg font-semibold"
              onClick={() => window.location.href = '/farmers'}
            >
              Join as Farmer
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 mb-3 inline-block">
                <Globe className="w-8 h-8 text-accent mx-auto" />
              </div>
              <p className="text-sm font-medium">50+ Countries</p>
              <p className="text-xs text-white/70">Global Network</p>
            </div>
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 mb-3 inline-block">
                <Users className="w-8 h-8 text-accent mx-auto" />
              </div>
              <p className="text-sm font-medium">10,000+ Farmers</p>
              <p className="text-xs text-white/70">Verified Suppliers</p>
            </div>
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 mb-3 inline-block">
                <Leaf className="w-8 h-8 text-accent mx-auto" />
              </div>
              <p className="text-sm font-medium">100% Fresh</p>
              <p className="text-xs text-white/70">Quality Guaranteed</p>
            </div>
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 mb-3 inline-block">
                <ShieldCheck className="w-8 h-8 text-accent mx-auto" />
              </div>
              <p className="text-sm font-medium">Secure Trading</p>
              <p className="text-xs text-white/70">Protected Payments</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div> */}
    </section>
  );
}