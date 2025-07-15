import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Eye,
    EyeOff,
    Mail,
    Lock,
    User,
    Phone,
    MapPin,
    Building,
    Leaf,
    UserCheck,
    ShoppingCart
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('buyer');
    const [agreementChecked, setAgreementChecked] = useState(false);

    const [buyerData, setBuyerData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        company: '',
        businessType: '',
        location: ''
    });

    const [farmerData, setFarmerData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        farmName: '',
        farmSize: '',
        location: '',
        primaryCrops: '',
        farmingMethod: '',
        experience: '',
        description: ''
    });

    const navigate = useNavigate();
    const { toast } = useToast();

    const handleBuyerInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setBuyerData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleFarmerInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFarmerData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleBuyerSelectChange = (name: string, value: string) => {
        setBuyerData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFarmerSelectChange = (name: string, value: string) => {
        setFarmerData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!agreementChecked) {
            toast({
                title: "Agreement required",
                description: "Please accept the terms and conditions to continue.",
                variant: "destructive",
            });
            return;
        }

        setIsLoading(true);
        const currentData = activeTab === 'buyer' ? buyerData : farmerData;

        // Validate passwords match
        if (currentData.password !== currentData.confirmPassword) {
            toast({
                title: "Password mismatch",
                description: "Passwords do not match. Please try again.",
                variant: "destructive",
            });
            setIsLoading(false);
            return;
        }

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Mock registration success
            localStorage.setItem('authToken', 'mock-token');
            localStorage.setItem('userType', activeTab);

            toast({
                title: "Registration successful",
                description: `Welcome to Agrilink! Your ${activeTab} account has been created.`,
            });

            // Redirect based on user type
            if (activeTab === 'farmer') {
                navigate('/farmer-dashboard');
            } else {
                navigate('/buyer-dashboard');
            }
        } catch (error) {
            toast({
                title: "Registration failed",
                description: "Something went wrong. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-fresh flex items-center justify-center p-4">
            <div className="w-full max-w-2xl">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center space-x-2">
                        <div className="p-3 bg-gradient-hero rounded-lg">
                            <Leaf className="w-8 h-8 text-primary-foreground" />
                        </div>
                        <div className="text-left">
                            <h1 className="text-2xl font-bold text-primary">Agrilink</h1>
                            <p className="text-sm text-muted-foreground">Global Harvest</p>
                        </div>
                    </Link>
                </div>

                <Card className="shadow-fresh">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl text-center">Create Your Account</CardTitle>
                        <CardDescription className="text-center">
                            Join thousands of farmers and buyers worldwide
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="buyer" className="w-full" onValueChange={setActiveTab}>
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="buyer" className="flex items-center space-x-2">
                                    <ShoppingCart className="w-4 h-4" />
                                    <span>Buyer</span>
                                </TabsTrigger>
                                <TabsTrigger value="farmer" className="flex items-center space-x-2">
                                    <UserCheck className="w-4 h-4" />
                                    <span>Farmer</span>
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="buyer" className="space-y-4 mt-6">
                                <div className="text-center text-sm text-muted-foreground mb-4">
                                    Access fresh produce from verified farmers worldwide
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="buyerFirstName">First Name</Label>
                                            <Input
                                                id="buyerFirstName"
                                                name="firstName"
                                                type="text"
                                                placeholder="John"
                                                value={buyerData.firstName}
                                                onChange={handleBuyerInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="buyerLastName">Last Name</Label>
                                            <Input
                                                id="buyerLastName"
                                                name="lastName"
                                                type="text"
                                                placeholder="Doe"
                                                value={buyerData.lastName}
                                                onChange={handleBuyerInputChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="buyerEmail">Email</Label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="buyerEmail"
                                                name="email"
                                                type="email"
                                                placeholder="john@example.com"
                                                value={buyerData.email}
                                                onChange={handleBuyerInputChange}
                                                className="pl-10"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="buyerPhone">Phone Number</Label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="buyerPhone"
                                                name="phone"
                                                type="tel"
                                                placeholder="+1 (555) 000-0000"
                                                value={buyerData.phone}
                                                onChange={handleBuyerInputChange}
                                                className="pl-10"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="buyerCompany">Company (Optional)</Label>
                                            <div className="relative">
                                                <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                <Input
                                                    id="buyerCompany"
                                                    name="company"
                                                    type="text"
                                                    placeholder="Company Name"
                                                    value={buyerData.company}
                                                    onChange={handleBuyerInputChange}
                                                    className="pl-10"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="buyerBusinessType">Business Type</Label>
                                            <Select onValueChange={(value) => handleBuyerSelectChange('businessType', value)}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select business type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="restaurant">Restaurant</SelectItem>
                                                    <SelectItem value="retailer">Retailer</SelectItem>
                                                    <SelectItem value="distributor">Distributor</SelectItem>
                                                    <SelectItem value="wholesaler">Wholesaler</SelectItem>
                                                    <SelectItem value="individual">Individual</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="buyerLocation">Location</Label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="buyerLocation"
                                                name="location"
                                                type="text"
                                                placeholder="City, State, Country"
                                                value={buyerData.location}
                                                onChange={handleBuyerInputChange}
                                                className="pl-10"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="buyerPassword">Password</Label>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                <Input
                                                    id="buyerPassword"
                                                    name="password"
                                                    type={showPassword ? 'text' : 'password'}
                                                    placeholder="Enter password"
                                                    value={buyerData.password}
                                                    onChange={handleBuyerInputChange}
                                                    className="pl-10 pr-10"
                                                    required
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    className="absolute right-1 top-1 h-8 w-8"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="buyerConfirmPassword">Confirm Password</Label>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                <Input
                                                    id="buyerConfirmPassword"
                                                    name="confirmPassword"
                                                    type={showConfirmPassword ? 'text' : 'password'}
                                                    placeholder="Confirm password"
                                                    value={buyerData.confirmPassword}
                                                    onChange={handleBuyerInputChange}
                                                    className="pl-10 pr-10"
                                                    required
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    className="absolute right-1 top-1 h-8 w-8"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                >
                                                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </TabsContent>

                            <TabsContent value="farmer" className="space-y-4 mt-6">
                                <div className="text-center text-sm text-muted-foreground mb-4">
                                    Connect with global buyers and grow your business
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="farmerFirstName">First Name</Label>
                                            <Input
                                                id="farmerFirstName"
                                                name="firstName"
                                                type="text"
                                                placeholder="John"
                                                value={farmerData.firstName}
                                                onChange={handleFarmerInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="farmerLastName">Last Name</Label>
                                            <Input
                                                id="farmerLastName"
                                                name="lastName"
                                                type="text"
                                                placeholder="Doe"
                                                value={farmerData.lastName}
                                                onChange={handleFarmerInputChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="farmerEmail">Email</Label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="farmerEmail"
                                                name="email"
                                                type="email"
                                                placeholder="john@example.com"
                                                value={farmerData.email}
                                                onChange={handleFarmerInputChange}
                                                className="pl-10"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="farmerPhone">Phone Number</Label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="farmerPhone"
                                                name="phone"
                                                type="tel"
                                                placeholder="+1 (555) 000-0000"
                                                value={farmerData.phone}
                                                onChange={handleFarmerInputChange}
                                                className="pl-10"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="farmName">Farm Name</Label>
                                            <Input
                                                id="farmName"
                                                name="farmName"
                                                type="text"
                                                placeholder="Green Valley Farm"
                                                value={farmerData.farmName}
                                                onChange={handleFarmerInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="farmSize">Farm Size</Label>
                                            <Select onValueChange={(value) => handleFarmerSelectChange('farmSize', value)}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select farm size" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="small">Small (1-10 acres)</SelectItem>
                                                    <SelectItem value="medium">Medium (11-50 acres)</SelectItem>
                                                    <SelectItem value="large">Large (51-200 acres)</SelectItem>
                                                    <SelectItem value="commercial">Commercial (200+ acres)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="farmerLocation">Farm Location</Label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="farmerLocation"
                                                name="location"
                                                type="text"
                                                placeholder="City, State, Country"
                                                value={farmerData.location}
                                                onChange={handleFarmerInputChange}
                                                className="pl-10"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="primaryCrops">Primary Crops</Label>
                                            <Input
                                                id="primaryCrops"
                                                name="primaryCrops"
                                                type="text"
                                                placeholder="Tomatoes, Corn, Wheat"
                                                value={farmerData.primaryCrops}
                                                onChange={handleFarmerInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="farmingMethod">Farming Method</Label>
                                            <Select onValueChange={(value) => handleFarmerSelectChange('farmingMethod', value)}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select method" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="organic">Organic</SelectItem>
                                                    <SelectItem value="conventional">Conventional</SelectItem>
                                                    <SelectItem value="hydroponic">Hydroponic</SelectItem>
                                                    <SelectItem value="sustainable">Sustainable</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="experience">Years of Experience</Label>
                                        <Select onValueChange={(value) => handleFarmerSelectChange('experience', value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select experience" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1-2">1-2 years</SelectItem>
                                                <SelectItem value="3-5">3-5 years</SelectItem>
                                                <SelectItem value="6-10">6-10 years</SelectItem>
                                                <SelectItem value="11-20">11-20 years</SelectItem>
                                                <SelectItem value="20+">20+ years</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="description">Farm Description (Optional)</Label>
                                        <Textarea
                                            id="description"
                                            name="description"
                                            placeholder="Tell us about your farm, practices, and specialties..."
                                            value={farmerData.description}
                                            onChange={handleFarmerInputChange}
                                            className="min-h-[80px]"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="farmerPassword">Password</Label>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                <Input
                                                    id="farmerPassword"
                                                    name="password"
                                                    type={showPassword ? 'text' : 'password'}
                                                    placeholder="Enter password"
                                                    value={farmerData.password}
                                                    onChange={handleFarmerInputChange}
                                                    className="pl-10 pr-10"
                                                    required
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    className="absolute right-1 top-1 h-8 w-8"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="farmerConfirmPassword">Confirm Password</Label>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                <Input
                                                    id="farmerConfirmPassword"
                                                    name="confirmPassword"
                                                    type={showConfirmPassword ? 'text' : 'password'}
                                                    placeholder="Confirm password"
                                                    value={farmerData.confirmPassword}
                                                    onChange={handleFarmerInputChange}
                                                    className="pl-10 pr-10"
                                                    required
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    className="absolute right-1 top-1 h-8 w-8"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                >
                                                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </TabsContent>
                        </Tabs>

                        <div className="flex items-center space-x-2 mt-6">
                            <Checkbox
                                id="agreement"
                                checked={agreementChecked}
                                onCheckedChange={(checked) => setAgreementChecked(checked === true)}
                            />
                            <label htmlFor="agreement" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                I agree to the{' '}
                                <Link to="/terms" className="text-primary hover:text-primary/80">
                                    Terms of Service
                                </Link>{' '}
                                and{' '}
                                <Link to="/privacy" className="text-primary hover:text-primary/80">
                                    Privacy Policy
                                </Link>
                            </label>
                        </div>

                        <Button
                            type="submit"
                            className="w-full mt-6"
                            disabled={isLoading || !agreementChecked}
                            onClick={handleSubmit}
                        >
                            {isLoading ? 'Creating Account...' : 'Create Account'}
                        </Button>

                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <Separator className="w-full" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-background px-2 text-muted-foreground">
                                        Or continue with
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-6">
                                <Button variant="outline" disabled>
                                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                    Google
                                </Button>
                                <Button variant="outline" disabled>
                                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                    Facebook
                                </Button>
                            </div>
                        </div>

                        <div className="mt-6 text-center text-sm">
                            <span className="text-muted-foreground">Already have an account? </span>
                            <Link
                                to="/login"
                                className="text-primary hover:text-primary/80 transition-colors font-medium"
                            >
                                Sign in
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Register;
