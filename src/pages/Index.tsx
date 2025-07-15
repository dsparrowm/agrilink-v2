import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Truck,
  Shield,
  Globe,
  Users,
  Leaf,
  Star,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { sampleProducts, sampleFarmers } from '@/data/sampleData';

const Index = () => {
  const featuredProducts = sampleProducts.slice(0, 4);
  const featuredFarmers = sampleFarmers.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />

      {/* Featured Products */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4" variant="secondary">
              Fresh Harvest
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured Fresh Produce
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover premium quality produce from our verified farmers worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={(product) => console.log('Add to cart:', product)}
                onToggleFavorite={(id) => console.log('Toggle favorite:', id)}
              />
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" variant="default" onClick={() => window.location.href = '/marketplace'}>
              Browse All Products
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Agrilink?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We bridge the gap between rural farmers and global markets
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-fresh transition-all duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Global Reach</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Connect with farmers and buyers from over 50 countries worldwide.
                  Access fresh produce from every corner of the globe.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-fresh transition-all duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Verified Quality</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  All farmers are verified for quality and authenticity.
                  We ensure you get the freshest produce with full traceability.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-fresh transition-all duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Fast Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Efficient cold-chain logistics ensure your produce arrives fresh.
                  Track your orders from farm to your doorstep.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Farmers */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4" variant="secondary">
              Meet Our Farmers
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted Global Partners
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get to know the dedicated farmers who bring you the freshest produce
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredFarmers.map((farmer) => (
              <Card key={farmer.id} className="overflow-hidden hover:shadow-fresh transition-all duration-300">
                <div className="h-32 bg-gradient-fresh"></div>
                <CardContent className="relative -mt-8 pb-6">
                  <div className="w-16 h-16 bg-primary rounded-full border-4 border-background flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-primary-foreground">
                      {farmer.name.charAt(0)}
                    </span>
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold text-lg mb-1">{farmer.farmName}</h3>
                    <p className="text-sm text-muted-foreground mb-2">by {farmer.name}</p>
                    <div className="flex items-center justify-center gap-1 mb-3">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{farmer.rating}</span>
                    </div>
                    <div className="flex items-center justify-center gap-1 mb-4">
                      <Leaf className="w-4 h-4 text-primary" />
                      <span className="text-sm text-muted-foreground">{farmer.location}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 justify-center mb-4">
                      {farmer.specialties.slice(0, 2).map((specialty, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      View Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">10,000+</div>
              <p className="text-muted-foreground">Verified Farmers</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50+</div>
              <p className="text-muted-foreground">Countries</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">500K+</div>
              <p className="text-muted-foreground">Orders Delivered</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">98.5%</div>
              <p className="text-muted-foreground">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Connect?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of farmers and buyers creating a sustainable global food network
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="harvest" size="lg" className="px-8 py-3 text-lg">
              Start Selling
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-3 text-lg bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary">
              Start Buying
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="p-2 bg-primary rounded-lg">
                  <Leaf className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Agrilink</h3>
                  <p className="text-sm opacity-70">Global Harvest</p>
                </div>
              </div>
              <p className="text-sm opacity-70">
                Connecting farmers to global markets for a sustainable future.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <div className="space-y-2 text-sm opacity-70">
                <p>Marketplace</p>
                <p>For Farmers</p>
                <p>For Buyers</p>
                <p>Pricing</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2 text-sm opacity-70">
                <p>Help Center</p>
                <p>Contact Us</p>
                <p>Documentation</p>
                <p>API</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2 text-sm opacity-70">
                <p>About Us</p>
                <p>Blog</p>
                <p>Careers</p>
                <p>Press</p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm opacity-70">
            © 2024 Agrilink Global. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
