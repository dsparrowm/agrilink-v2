import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/Header";
import { 
  ShoppingCart, 
  Package, 
  Users, 
  TrendingDown,
  Heart,
  Calendar,
  DollarSign,
  Search,
  Plus,
  Star,
  MapPin,
  MessageSquare
} from "lucide-react";

const BuyerDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const buyerStats = {
    totalOrders: 24,
    activeSuppliers: 12,
    monthlySpending: 3200,
    savedSuppliers: 8,
    averageSavings: 15
  };

  const orderHistory = [
    { id: 1, farmer: "Green Valley Farm", product: "Organic Tomatoes", quantity: "100kg", amount: 250, date: "2024-01-15", status: "Delivered" },
    { id: 2, farmer: "Sunrise Orchards", product: "Fresh Apples", quantity: "75kg", amount: 180, date: "2024-01-10", status: "In Transit" },
    { id: 3, farmer: "Harvest Hills", product: "Sweet Corn", quantity: "50kg", amount: 150, date: "2024-01-08", status: "Processing" }
  ];

  const savedSuppliers = [
    { id: 1, name: "Green Valley Farm", location: "California, USA", rating: 4.8, products: 12, verified: true },
    { id: 2, name: "Sunrise Orchards", location: "Oregon, USA", rating: 4.9, products: 8, verified: true },
    { id: 3, name: "Harvest Hills", location: "Texas, USA", rating: 4.7, products: 15, verified: false }
  ];

  const bulkRequests = [
    { id: 1, product: "Organic Carrots", quantity: "500kg", targetPrice: 1.8, status: "Active", responses: 3 },
    { id: 2, product: "Sweet Potatoes", quantity: "300kg", targetPrice: 2.2, status: "Closed", responses: 7 },
    { id: 3, product: "Fresh Lettuce", quantity: "200kg", targetPrice: 3.5, status: "Active", responses: 1 }
  ];

  const favoriteProducts = [
    { id: 1, name: "Organic Tomatoes", farmer: "Green Valley Farm", price: 2.5, image: "/placeholder.svg" },
    { id: 2, name: "Sweet Corn", farmer: "Harvest Hills", price: 3.0, image: "/placeholder.svg" },
    { id: 3, name: "Fresh Apples", farmer: "Sunrise Orchards", price: 2.4, image: "/placeholder.svg" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Buyer Dashboard</h1>
          <p className="text-muted-foreground">Manage your orders, suppliers, and bulk purchasing</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{buyerStats.totalOrders}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Suppliers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{buyerStats.activeSuppliers}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Spending</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${buyerStats.monthlySpending}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Saved Suppliers</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{buyerStats.savedSuppliers}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Savings</CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{buyerStats.averageSavings}%</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="orders">Order History</TabsTrigger>
            <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
            <TabsTrigger value="bulk">Bulk Orders</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Order History Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>Track all your purchases and deliveries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orderHistory.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                          <Package className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{order.product}</h3>
                          <p className="text-sm text-muted-foreground">From {order.farmer}</p>
                          <p className="text-sm text-muted-foreground">{order.quantity} • {order.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${order.amount}</p>
                        <Badge variant={order.status === "Delivered" ? "default" : order.status === "In Transit" ? "secondary" : "outline"}>
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Suppliers Tab */}
          <TabsContent value="suppliers">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Saved Suppliers</CardTitle>
                    <CardDescription>Manage your preferred farmers and suppliers</CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Find Suppliers
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {savedSuppliers.map((supplier) => (
                    <div key={supplier.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                          <Users className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{supplier.name}</h3>
                            {supplier.verified && <Badge variant="default">Verified</Badge>}
                          </div>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {supplier.location}
                          </p>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-current" />
                              {supplier.rating}
                            </span>
                            <span>{supplier.products} products</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          View Profile
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bulk Orders Tab */}
          <TabsContent value="bulk">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Bulk Order Requests</CardTitle>
                    <CardDescription>Request quotes for large quantity purchases</CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    New Request
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bulkRequests.map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{request.product}</h3>
                        <p className="text-sm text-muted-foreground">
                          Quantity: {request.quantity} • Target: ${request.targetPrice}/kg
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant={request.status === "Active" ? "default" : "secondary"}>
                          {request.status}
                        </Badge>
                        <p className="text-sm text-muted-foreground mt-1">
                          {request.responses} responses
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites">
            <Card>
              <CardHeader>
                <CardTitle>Favorite Products</CardTitle>
                <CardDescription>Your saved products for quick reordering</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {favoriteProducts.map((product) => (
                    <div key={product.id} className="border rounded-lg p-4">
                      <div className="w-full h-32 bg-muted rounded-lg mb-3 flex items-center justify-center">
                        <Package className="h-12 w-12 text-muted-foreground" />
                      </div>
                      <h3 className="font-semibold">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">{product.farmer}</p>
                      <p className="text-lg font-bold text-primary mt-2">${product.price}/kg</p>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" className="flex-1">Add to Cart</Button>
                        <Button variant="outline" size="sm">
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Spending Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>This Month</span>
                      <span className="font-bold">$3,200</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Month</span>
                      <span>$2,800</span>
                    </div>
                    <div className="flex justify-between text-red-600">
                      <span>Change</span>
                      <span>+14.3%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Vegetables</span>
                      <span>65% ($2,080)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fruits</span>
                      <span>25% ($800)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Grains</span>
                      <span>10% ($320)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Savings by Direct Sourcing</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Market Price</span>
                      <span>$3,765</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Direct Price</span>
                      <span className="font-bold text-green-600">$3,200</span>
                    </div>
                    <div className="flex justify-between text-green-600 font-bold">
                      <span>Total Savings</span>
                      <span>$565 (15%)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Supplier Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>On-time Delivery</span>
                      <span>94%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Quality Rating</span>
                      <span>4.7/5</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Response Time</span>
                      <span>2.3 hours</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BuyerDashboard;