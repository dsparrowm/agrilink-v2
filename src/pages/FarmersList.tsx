import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  MapPin, 
  Star, 
  Shield, 
  Leaf, 
  Award, 
  Eye
} from 'lucide-react';
import { sampleFarmers } from '@/data/sampleData';

export default function FarmersList() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Meet Our Farmers</h1>
          <p className="text-muted-foreground">
            Discover verified farmers and their sustainable farming practices
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleFarmers.map((farmer) => (
            <Card key={farmer.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-32 bg-gradient-fresh"></div>
              <CardContent className="relative -mt-8 pb-6">
                {/* Avatar */}
                <div className="relative mb-4">
                  <div className="w-16 h-16 bg-primary rounded-full border-4 border-background flex items-center justify-center shadow-lg mx-auto">
                    <span className="text-xl font-bold text-primary-foreground">
                      {farmer.name.charAt(0)}
                    </span>
                  </div>
                  {farmer.verified && (
                    <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-1">
                      <Shield className="w-3 h-3 text-primary-foreground" />
                    </div>
                  )}
                </div>

                {/* Farmer Info */}
                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold text-foreground mb-1">
                    {farmer.farmName}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    by {farmer.name}
                  </p>
                  <div className="flex items-center justify-center gap-4 mb-3">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {farmer.location}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-medium">{farmer.rating}</span>
                    </div>
                  </div>
                  
                  {/* Certifications */}
                  <div className="flex flex-wrap justify-center gap-1 mb-3">
                    {farmer.certifications.slice(0, 2).map((cert, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        <Award className="w-2 h-2 mr-1" />
                        {cert}
                      </Badge>
                    ))}
                    {farmer.farmingMethods.includes('Organic') && (
                      <Badge className="bg-green-100 text-green-800 border-0 text-xs">
                        <Leaf className="w-2 h-2 mr-1" />
                        Organic
                      </Badge>
                    )}
                  </div>

                  {/* Farm Size */}
                  <p className="text-xs text-muted-foreground mb-4">
                    Farm Size: {farmer.farmSize}
                  </p>
                </div>

                {/* View Profile Button */}
                <Button asChild className="w-full" variant="outline">
                  <Link to={`/farmers/${farmer.id}`} className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    View Profile
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}