"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { useState } from "react";

import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { api } from '@/convex/_generated/api'
import Link from "next/link";
import { toast } from "sonner";
import { 
  CheckCircle2, 
  CreditCard, 
  Loader2, 
  Calendar,
  Receipt,
  Shield,
  Sparkles,
  Clock,
  ArrowRight,
  Circle,
  Gem
} from "lucide-react";

const BillingPage = () => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const userData = useQuery(api.users.getUserByClerkId, user ? { clerkId: user?.id } : "skip");
  const subscription = useQuery(api.subscriptions.getUserSubscription, userData ? { userId: userData?._id } : "skip");

  const handleManageBilling = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/create-billing-portal", { method: "POST" });
      const { url } = await response.json();
      if (url) window.location.href = url;
      else throw new Error("Failed to create billing portal");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getPlanBadge = () => {
    if (!subscription) return null;
    
    const isYearly = subscription.planType === 'year';
    return {
      label: isYearly ? 'Yearly Pro' : 'Monthly Pro',
      badge: isYearly ? 'bg-gradient-to-r from-amber-500 to-orange-500' : 'bg-gradient-to-r from-blue-500 to-purple-500',
      icon: isYearly ? Gem : Sparkles
    };
  };

  if (!userData || subscription === undefined) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="absolute inset-0 animate-ping">
              <Circle className="h-12 w-12 text-purple-400 opacity-20" />
            </div>
            <Loader2 className="h-12 w-12 animate-spin text-purple-600 relative" />
          </div>
          <p className="mt-4 text-gray-600">Loading your billing information...</p>
        </div>
      </div>
    );
  }

  const planDetails = getPlanBadge();
  const PlanIcon = planDetails?.icon || Sparkles;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-2 bg-purple-100 rounded-full mb-4">
            <CreditCard className="h-6 w-6 text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Billing
          </h1>
          <p className="text-gray-600 max-w-md mx-auto">
            Manage your subscription, view billing details, and update payment methods
          </p>
        </div>

       
        <Card className="border border-gray-200/60 shadow-xl rounded-2xl overflow-hidden">
          {subscription ? (
            <>
             
              <div className="px-6 py-4 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <CheckCircle2 className="h-6 w-6 text-green-600" />
                      <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full animate-pulse" />
                    </div>
                    <div>
                      <p className="font-semibold text-green-800">Active Subscription</p>
                      <p className="text-xs text-green-700">Your account is in good standing</p>
                    </div>
                  </div>
                  {planDetails && (
                    <Badge className={`${planDetails.badge} text-white border-0 px-3 py-1.5`}>
                      <PlanIcon className="h-3.5 w-3.5 mr-1.5" />
                      {planDetails.label}
                    </Badge>
                  )}
                </div>
              </div>

              <CardHeader className="pb-0 pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold text-gray-900">
                      {subscription.planType === 'year' ? 'Yearly Plan' : 'Monthly Plan'}
                    </CardTitle>
                    <CardDescription className="text-gray-600 mt-1.5">
                      {subscription.planType === 'year' 
                        ? 'Billed annually. Save 17% compared to monthly.'
                        : 'Billed monthly. Cancel anytime.'
                      }
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-white text-gray-700 border-gray-300 px-3 py-1.5">
                    <Clock className="h-3.5 w-3.5 mr-1.5" />
                    {subscription.status}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-6 pt-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Calendar className="h-4 w-4 text-blue-600" />
                      </div>
                      <p className="text-sm font-medium text-gray-600">Current Period</p>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">
                      {formatDate(subscription.currentPeriodStart)} - {formatDate(subscription.currentPeriodEnd)}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Receipt className="h-4 w-4 text-purple-600" />
                      </div>
                      <p className="text-sm font-medium text-gray-600">Next Billing Date</p>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">
                      {formatDate(subscription.currentPeriodEnd)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1.5">
                      {subscription.planType === 'year' ? 'Annual renewal' : 'Monthly renewal'}
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-5 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                        <CreditCard className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-300">Current Plan Amount</p>
                        <p className="text-2xl font-bold mt-0.5">
                          {subscription.planType === 'year' ? '$290.00' : '$29.00'}
                          <span className="text-sm font-normal text-gray-400 ml-1.5">
                            / {subscription.planType === 'year' ? 'year' : 'month'}
                          </span>
                        </p>
                      </div>
                    </div>
                    {subscription.planType === 'year' && (
                      <Badge className="bg-amber-500/20 text-amber-300 border-0 px-3 py-1.5">
                        <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                        Save 17%
                      </Badge>
                    )}
                  </div>
                </div>

                {subscription.cancelAtPeriodEnd && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <div className="p-1.5 bg-amber-100 rounded-lg flex-shrink-0">
                        <div className="h-2 w-2 bg-amber-500 rounded-full animate-pulse" />
                      </div>
                      <div>
                        <p className="font-semibold text-amber-800 text-sm">
                          Subscription Ending Soon
                        </p>
                        <p className="text-xs text-amber-700 mt-1">
                          Your subscription will be cancelled on {formatDate(subscription.currentPeriodEnd)}. 
                          You can reactivate anytime before this date.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>

              <CardFooter className="bg-gray-50/80 px-6 py-5 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row gap-3 w-full justify-end">
                  <Button
                    variant="outline"
                    className="border-gray-300 hover:bg-white hover:border-gray-400"
                    asChild
                  >
                    <Link href="/pro">
                      Change Plan
                    </Link>
                  </Button>
                  <Button
                    onClick={handleManageBilling}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Shield className="mr-2 h-4 w-4" />
                        Manage Billing
                      </>
                    )}
                  </Button>
                </div>
              </CardFooter>
            </>
          ) : (
            <>
              
              <div className="px-6 py-12 text-center">
                <div className="inline-flex items-center justify-center p-3 bg-purple-100 rounded-full mb-6">
                  <CreditCard className="h-8 w-8 text-purple-600" />
                </div>
                
                <CardTitle className="text-3xl font-bold text-gray-900 mb-3">
                  No Active Subscription
                </CardTitle>
                <CardDescription className="text-gray-600 text-lg max-w-md mx-auto mb-8">
                  Upgrade to Pro and unlock premium courses, priority support, and exclusive features.
                </CardDescription>

                <div className="flex flex-wrap justify-center gap-2 mb-10">
                  {['Unlimited courses', 'Priority support', 'Certificates', 'Community access'].map((feature) => (
                    <Badge key={feature} variant="secondary" className="bg-gray-100 text-gray-700 px-4 py-2 text-sm">
                      {feature}
                    </Badge>
                  ))}
                </div>

                <div className="space-y-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                  >
                    <Link href="/pro">
                      <Sparkles className="mr-2 h-5 w-5" />
                      Explore Pro Plans
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  
                  <p className="text-sm text-gray-500">
                    14-day free trial • Cancel anytime • No hidden fees
                  </p>
                </div>
              </div>
            </>
          )}
        </Card>

        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-gray-500 bg-white px-4 py-2 rounded-full border border-gray-200">
            <Shield className="h-4 w-4 text-gray-400" />
            Secure payments powered by Stripe
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingPage;