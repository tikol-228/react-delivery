import { Bell, Camera, CreditCard, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const Profile = () => {

  const handleAddAddress = () => {
      
  };

  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <Card className="overflow-hidden border-none bg-gradient-to-r from-primary/90 via-primary to-primary/70 text-primary-foreground shadow-lg">
          <CardContent className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between md:p-8">
            <div className="flex items-start gap-4">
              <Avatar className="h-24 w-24 border-2 border-primary-foreground/30">
                <AvatarImage src="https://i.pravatar.cc/300?img=24" alt="Profile avatar" />
                <AvatarFallback className="text-xl font-semibold text-foreground">TK</AvatarFallback>
              </Avatar>

              <div className="space-y-2">
                <Badge className="bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20">
                  Premium
                </Badge>
                <h1 className="text-3xl font-bold">Tim K.</h1>
                <p className="text-sm text-primary-foreground/90">Product designer and food enthusiast</p>
                <div className="flex flex-wrap gap-4 text-sm text-primary-foreground/90">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    Minsk, Belarus
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Mail className="h-4 w-4" />
                    tim@example.com
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button variant="secondary" className="gap-2 bg-primary-foreground text-foreground hover:bg-primary-foreground/90">
                <Camera className="h-4 w-4" />
                Change photo
              </Button>
              <Button variant="outline" className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
                View public profile
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Personal Information</CardTitle>
              <CardDescription>Layout only. Add your own state and submit logic.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input id="first-name" placeholder="Enter first name" defaultValue="Tim" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input id="last-name" placeholder="Enter last name" defaultValue="Kovalev" />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@example.com" defaultValue="tim@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" placeholder="+375 (__) ___-__-__" defaultValue="+375 (29) 999-00-00" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Write a short bio..."
                  className="min-h-[120px]"
                  defaultValue="I love great UI, smart delivery flows, and trying new restaurants every week."
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Account Snapshot</CardTitle>
              <CardDescription>Static blocks for future dynamic data.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border bg-secondary/40 p-4">
                <p className="text-sm text-muted-foreground">Orders this month</p>
                <p className="mt-2 text-2xl font-bold">24</p>
              </div>

              <div className="rounded-lg border bg-secondary/40 p-4">
                <p className="text-sm text-muted-foreground">Saved addresses</p>
                <p className="mt-2 text-2xl font-bold">3</p>
              </div>

              <div className="rounded-lg border bg-secondary/40 p-4">
                <p className="text-sm text-muted-foreground">Account status</p>
                <p className="mt-2 text-2xl font-bold">Verified</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <MapPin className="h-5 w-5 text-primary" />
                Delivery Addresses
              </CardTitle>
              <CardDescription>Prepare UI for managing multiple addresses.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4">
                <p className="font-medium">Home</p>
                <p className="text-sm text-muted-foreground">Nezavisimosti Ave 35, Minsk</p>
              </div>
              <div className="rounded-lg border p-4">
                <p className="font-medium">Office</p>
                <p className="text-sm text-muted-foreground">Pobediteley Ave 7A, Minsk</p>
              </div>
              <Button variant="outline" className="w-full" onClick={handleAddAddress}>
                Add new address
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <ShieldCheck className="h-5 w-5 text-primary" />
                Security & Notifications
              </CardTitle>
              <CardDescription>Static controls where you can wire handlers later.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4">
                <p className="font-medium">Change password</p>
                <p className="text-sm text-muted-foreground">Last update: 21 days ago</p>
              </div>

              <div className="space-y-2 rounded-lg border p-4">
                <p className="font-medium">Preferred contact</p>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="secondary" className="gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </Button>
                  <Button size="sm" variant="outline" className="gap-2">
                    <Phone className="h-4 w-4" />
                    Phone
                  </Button>
                  <Button size="sm" variant="outline" className="gap-2">
                    <Bell className="h-4 w-4" />
                    Push
                  </Button>
                </div>
              </div>

              <div className="space-y-2 rounded-lg border p-4">
                <p className="font-medium">Payment method</p>
                <p className="text-sm text-muted-foreground">Visa •••• 0349</p>
                <Button variant="outline" size="sm" className="gap-2">
                  <CreditCard className="h-4 w-4" />
                  Update payment details
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Button variant="outline">Cancel</Button>
          <Button>Save changes</Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
