"use client";

import { useUser } from "@clerk/nextjs";
import { useAction, useQuery } from "convex/react";
import { toast } from "react-toastify";
import { PRO_PLANS } from "@/constants";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast as ToastContainer} from "sonner";
import { api } from "@/convex/_generated/api";
import { FaStar } from "react-icons/fa";

const ProPlanPage = () => {
	const [loadingPlan, setLoadingPlan] = useState("");
	const { user, isLoaded: isUserLoaded } = useUser();

	const userData = useQuery(api.users.getUserByClerkId, user ? { clerkId: user?.id } : "skip");
	const userSubscription = useQuery(
		api.subscriptions.getUserSubscription,
		userData ? { userId: userData?._id } : "skip"
	);

	const isYearlySubscriptionActive = userSubscription?.status === "active" && userSubscription.planType === "year";
	const createProPlanCheckoutSession = useAction(api.stripe.createProPlanCheckoutSession);

	const handlePlanSelection = async (planId: "month" | "year") => {
		if (!user) {
			ToastContainer.error("Please log in to select a plan.", {
				id: "login-error",
				position: "top-center",
				duration: 3000,
			});
			return;
		}

		setLoadingPlan(planId);
		try {
			const result = await createProPlanCheckoutSession({ planId });
			if (result?.checkoutUrl) {
				window.location.href = result.checkoutUrl;
			}
		} catch (error: any) {
			if (error.message.includes("Rate limit exceeded")) {
				toast.error("You've tried too many times. Please try again later.");
			} else {
				toast.error("There was an error initiating your purchase. Please try again.");
			}
			console.log(error);
		} finally {
			setLoadingPlan("");
		}
	};

	return (
		<div className='container mx-auto px-4 py-16 max-w-6xl h-auto'>
      <div className="hidden md:block"><br /><br /><br /></div>
      {
		isUserLoaded && userSubscription?.status !== 'active' && (
			<div className='bg-blue-100 text-purple-600 py-2 rounded-xl px-4 mb-9 flex items-center border border-l-4 border-purple-600'>
      You have a subscription plan that is active. Please choose a plan to upgrade or change your current plan.
      </div>
		)
	  }
			<h1 className='text-4xl font-bold text-center mb-4 text-gray-800'>Choose Your Pro Journey</h1>
			<p className='text-xl text-center mb-12 text-gray-600'>
				Unlock premium features and accelerate your learning
			</p>

			{isUserLoaded && userSubscription?.status === "active" && (
				<div className='bg-blue-50 border-l-4 border-blue-500 p-4 mb-8 rounded-md'>
					<p className='text-blue-700'>
						You have an active <span className='font-semibold'>{userSubscription.planType}ly</span>{" "}
						subscription.
					</p>
				</div>
			)}

			<div className='grid md:grid-cols-2 gap-8 items-stretch'>
        

				{PRO_PLANS.map((plan) => (
          
					<Card
						key={plan.id}
						className={`
               flex flex-col transition-all duration-300 relative ${
					plan.highlighted
						? "border-purple-400 shadow-lg hover:shadow-xl"
						: "hover:border-purple-200 hover:shadow-md"
				}
          `}
					>
            {plan.featured && (
                    <div className="absolute -top-3 left-6 inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-full text-xs font-semibold shadow">
                      <FaStar className="w-3 h-3" />
                      Popular
                    </div>
                  )}
						<CardHeader className='flex-grow'>
							<CardTitle className={`text-2xl ${plan.highlighted ? "text-purple-600" : "text-gray-800"}`}>
								{plan.title}
							</CardTitle>

							<CardDescription className='mt-2'>
								<span className='text-3xl font-bold text-gray-900'>{plan.price}</span>
								<span className='text-gray-600 ml-1'>{plan.period}</span>
							</CardDescription>
						</CardHeader>

						<CardContent>
							<ul className='space-y-3'>
								{plan.features.map((feature, fIdx) => (
									<li key={fIdx} className='flex items-center'>
										<Check
											className={`h-5 w-5 ${plan.highlighted ? "text-purple-500" : "text-green-500"} mr-2 flex-shrink-0`}
										/>
										<span className='text-gray-700'>{feature}</span>
									</li>
								))}
							</ul>
						</CardContent>

						<CardFooter className='mt-auto'>
							<Button
								className={`w-full py-6 text-lg ${
									plan.highlighted
										? "bg-purple-600 hover:bg-purple-700 text-white"
										: "bg-white text-purple-600 border-2 border-purple-600 hover:bg-purple-50"
								}`}
								onClick={() => handlePlanSelection(plan.id as "month" | "year")}
								disabled={
									userSubscription?.status === "active" &&
									(userSubscription.planType === plan.id)
								}
							>
								{loadingPlan === plan.id ? (
									<>
										<Loader2Icon className='mr-2 size-4 animate-spin' />
										Processing...
									</>
								) : isUserLoaded &&
								  userSubscription?.status === "active" &&
								  userSubscription.planType === plan.id ? (
									"Current Plan"
								) : isUserLoaded && plan.id === "year" && isYearlySubscriptionActive ? (
									"Yearly Plan Active"
								) : (
									plan.ctaText
								)}
							</Button>
						</CardFooter>
					</Card>
				))}
			</div>

          <section className="mt-8">
            <h5 className="text-base font-semibold text-slate-900">Common questions</h5>
            <div className="mt-3 grid gap-5 sm:grid-cols-2">
              <div className="p-4 border rounded-lg bg-slate-200/45">
                <p className="font-medium">Can I switch plans later?</p>
                <p className="mt-1 text-sm text-slate-600">Yes — upgrading or downgrading is instant and prorated.</p>
              </div>
              <div className="p-4 border rounded-lg bg-slate-200/45">
                <p className="font-medium">Do you offer discounts for yearly billing?</p>
                <p className="mt-1 text-sm text-slate-600">Yes. Yearly billing gives you 2 months free in this example.</p>
              </div>
              <div className="p-4 border rounded-lg bg-slate-200/45">
                <p className="font-medium">Can I switch plans later?</p>
                <p className="mt-1 text-sm text-slate-600">Yes — upgrading or downgrading is instant and prorated.</p>
              </div>
              <div className="p-4 border rounded-lg bg-slate-200/45">
                <p className="font-medium">Do you offer discounts for yearly billing?</p>
                <p className="mt-1 text-sm text-slate-600">Yes. Yearly billing gives you 2 months free in this example.</p>
              </div>
            </div>
          </section>
		</div>
	);
};

export default ProPlanPage;