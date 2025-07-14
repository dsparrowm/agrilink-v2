import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  MapPin, 
  Star, 
  Shield, 
  Leaf, 
  Award, 
  MessageCircle,
  Heart,
  Share2,
  Calendar,
  Users,
  Truck,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { sampleFarmers, sampleProducts } from '@/data/sampleData';

export default function FarmerProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Get farmer by ID from URL, default to first farmer if no ID
  const farmerIndex = id ? sampleFarmers.findIndex(f => f.id === id) : 0;
  const farmer = sampleFarmers[farmerIndex] || sampleFarmers[0];
  const farmerProducts = sampleProducts.filter(p => p.farmerId === farmer.id);
  
  const handlePreviousFarmer = () => {
    const prevIndex = farmerIndex > 0 ? farmerIndex - 1 : sampleFarmers.length - 1;
    navigate(`/farmers/${sampleFarmers[prevIndex].id}`);
  };
  
  const handleNextFarmer = () => {
    const nextIndex = farmerIndex < sampleFarmers.length - 1 ? farmerIndex + 1 : 0;
    navigate(`/farmers/${sampleFarmers[nextIndex].id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="outline"
            onClick={handlePreviousFarmer}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous Farmer
          </Button>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Farmer {farmerIndex + 1} of {sampleFarmers.length}
            </p>
          </div>
          
          <Button
            variant="outline"
            onClick={handleNextFarmer}
            className="flex items-center gap-2"
          >
            Next Farmer
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Farmer Header */}
        <div className="mb-8">
          <Card className="overflow-hidden">
            <div className="h-48 bg-gradient-fresh"></div>
            <CardContent className="relative -mt-16 pb-8">
              <div className="flex flex-col md:flex-row md:items-end gap-6">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-32 h-32 bg-primary rounded-full border-4 border-background flex items-center justify-center shadow-lg">
                    <span className="text-4xl font-bold text-primary-foreground">
                      {farmer.name.charAt(0)}
                    </span>
                  </div>
                  {farmer.verified && (
                    <div className="absolute -bottom-2 -right-2 bg-primary rounded-full p-2">
                      <Shield className="w-5 h-5 text-primary-foreground" />
                    </div>
                  )}
                </div>

                {/* Farmer Info */}
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div>
                      <h1 className="text-3xl font-bold text-foreground mb-2">
                        {farmer.farmName}
                      </h1>
                      <p className="text-lg text-muted-foreground mb-2">
                        by {farmer.name}
                      </p>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {farmer.location}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{farmer.rating}</span>
                          <span className="text-sm text-muted-foreground">(150+ reviews)</span>
                        </div>
                      </div>
                      
                      {/* Certifications */}
                      <div className="flex flex-wrap gap-2">
                        {farmer.certifications.map((cert, index) => (
                          <Badge key={index} variant="secondary" className="flex items-center gap-1">
                            <Award className="w-3 h-3" />
                            {cert}
                          </Badge>
                        ))}
                        {farmer.farmingMethods.includes('Organic') && (
                          <Badge className="bg-green-100 text-green-800 border-0">
                            <Leaf className="w-3 h-3 mr-1" />
                            Organic Certified
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Heart className="w-4 h-4 mr-1" />
                        Follow
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="w-4 h-4 mr-1" />
                        Share
                      </Button>
                      <Button variant="default">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        Contact
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle>About Our Farm</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {farmer.description}
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-foreground">Farm Size:</span>
                    <span className="text-muted-foreground ml-2">{farmer.farmSize}</span>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Est.:</span>
                    <span className="text-muted-foreground ml-2">1985</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Specialties */}
            <Card>
              <CardHeader>
                <CardTitle>Our Specialties</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {farmer.specialties.map((specialty, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                      <Leaf className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">{specialty}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Products */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">Our Products</h2>
                <Badge variant="secondary">{farmerProducts.length} products</Badge>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {farmerProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={(product) => console.log('Add to cart:', product)}
                    onToggleFavorite={(id) => console.log('Toggle favorite:', id)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Farm Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Member Since</span>
                  </div>
                  <span className="text-sm font-medium">Jan 2024</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Total Orders</span>
                  </div>
                  <span className="text-sm font-medium">1,247</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Delivery Time</span>
                  </div>
                  <span className="text-sm font-medium">2-5 days</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Satisfaction</span>
                  </div>
                  <span className="text-sm font-medium">98.5%</span>
                </div>
              </CardContent>
            </Card>

            {/* Farming Methods */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Farming Practices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {farmer.farmingMethods.map((method, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm">{method}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Get in Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="default">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
                <Button className="w-full" variant="outline">
                  Request Quote
                </Button>
                <div className="text-center text-xs text-muted-foreground pt-2">
                  Usually responds within 2 hours
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}