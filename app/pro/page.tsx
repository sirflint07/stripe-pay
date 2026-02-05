// "use client"

// import { api } from '@/convex/_generated/api'
// import { useUser } from '@clerk/nextjs'
// import { useQuery } from 'convex/react'
// import { CheckIcon } from 'lucide-react';
// import { useState, useEffect } from "react";
// import { FaCheck, FaStar } from "react-icons/fa";

// export default function ProPlanPage({ currentPlan = "", initialBilling = "" }) {

//   interface Plan {
//     id: string;
//     title: string;
//     tagline: string;
//     monthly: number;
//     yearly: number;
//     featured?: boolean;
//     features: string[];
//   }

//   const [billing, setBilling] = useState(initialBilling);
//   const [selectedPlan, setSelectedPlan] = useState("");

//   const { user, isLoaded } = useUser()
//   const userData = useQuery(api.users.getUserByClerkId, 
//     user && user.id ? { clerkId: user.id } : "skip"
//   )
  
//   // Fix: Corrected variable name and added proper conditional
//   const userSubscription = useQuery(api.subscriptions.getUserSubscription, 
//     userData && userData._id ? { userId: userData._id } : "skip"
//   )

//   // Debug logging with proper checks
//   useEffect(() => {
//     console.log('=== DEBUG INFO ===');
//     console.log('Clerk user loaded:', isLoaded);
//     console.log('Clerk user:', user);
//     console.log('User data from Convex:', userData);
//     console.log('User subscription data:', userSubscription);
//     console.log('Subscription planType:', userSubscription?.planType);
//     console.log('Subscription status:', userSubscription?.status);
//   }, [user, userData, userSubscription, isLoaded]);

//   const isYearlySubscriptionActive = userSubscription?.status === 'active' && userSubscription.planType === 'year'

//   const handlePlanSelection = (planId: string) => {
//     console.log("Selected plan:", planId);
//     setSelectedPlan(planId);
//   }

//   const plans = [
//     {
//       id: "month",
//       title: "Monthly",
//       tagline: "Good for individuals",
//       monthly: 9,
//       yearly: 90,
//       features: ["1 project", "Basic analytics", "Community support"],
//     },
//     {
//       id: "year",
//       title: "Yearly",
//       tagline: "Most popular",
//       monthly: 29,
//       yearly: 290,
//       featured: true,
//       features: ["10 projects", "Advanced analytics", "Priority support", "Integrations"],
//     }
//   ];

//   const formatPrice = (plan: Plan) => {
//     return billing === "monthly" ? `$${plan.monthly}` : `$${plan.yearly}`;
//   };

//   const billingLabel = billing === "monthly" ? "per month" : "per year (billed annually)";

//   // Show loading state while data is being fetched
//   if (!isLoaded) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
//           <p className="mt-4 text-slate-600">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      
//       <div className="max-w-6xl mx-auto">
//         <div className='bg-blue-100 text-purple-600 py-2 rounded-xl px-4 mb-9 flex items-center border border-l-4 border-purple-600'>
//         You have a <span className='font-semibold px-1'>{`${isYearlySubscriptionActive ? " yearly" : " monthly"}`}</span> subscription plan.
//       </div>
//         {/* Active subscription banner - only show if user has an active subscription */}
//         {userSubscription?.status === 'active' && (
//           <div className='bg-blue-100 text-blue-600 rounded-md px-4 py-2 flex items-center border border-l-4 border-blue-600 mb-2'>
//             <CheckIcon className='mr-2' size={20}/>
//             You have an active {userSubscription?.planType} subscription plan.
//           </div>
//         )}

//         {/* Header */}
//         <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
//           <div>
//             <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Choose your plan</h1>
//             <p className="mt-1 text-slate-600 max-w-xl">
//               Simple, transparent pricing — switch anytime. Pick monthly or yearly billing to save more.
//             </p>
//           </div>

//           <div className="flex items-center gap-4">
//             {/* Current subscription badge - only show if user has a subscription */}
//             {userSubscription && (
//               <div className="text-sm text-slate-700">
//                 <span className="block text-xs text-slate-500">Current subscription</span>
//                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white shadow-sm border">
//                   <span className="uppercase text-xs tracking-wider font-medium">
//                     {userSubscription.planType || 'None'}
//                   </span>
//                   <span className="text-xs text-slate-500">•</span>
//                   <span className="text-xs text-slate-600">{userSubscription.status || 'Inactive'}</span>
//                 </div>
//               </div>
//             )}

//             {/* Billing toggle */}
//             <div className="flex flex-col items-center text-sm">
//               <span className="text-xs text-slate-500 mb-1">Billing</span>
//               <div className="flex items-center gap-2 bg-slate-100 rounded-full p-1">
//                 <button
//                   onClick={() => setBilling("monthly")}
//                   aria-pressed={billing === "monthly"}
//                   className={`px-3 py-1 rounded-full text-sm font-medium transition ${
//                     billing === "monthly" ? "bg-white shadow-sm text-slate-900" : "text-slate-600"
//                   }`}
//                 >
//                   Monthly
//                 </button>
//                 <button
//                   onClick={() => setBilling("yearly")}
//                   aria-pressed={billing === "yearly"}
//                   className={`px-3 py-1 rounded-full text-sm font-medium transition ${
//                     billing === "yearly" ? "bg-white shadow-sm text-slate-900" : "text-slate-600"
//                   }`}
//                 >
//                   Yearly
//                 </button>
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Plans grid */}
//         <main>
//           <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
//             {plans.map((plan) => {
//               const isCurrent = userSubscription?.planType === plan.id && userSubscription?.status === 'active';
//               const isSelected = selectedPlan === plan.id;

//               return (
//                 <article
//                   key={plan.id}
//                   className={`relative rounded-2xl border ${
//                     plan.featured ? "border-indigo-200 shadow-lg" : "border-gray-200"
//                   } bg-white p-6 flex flex-col justify-between transition-transform hover:-translate-y-2`}
//                 >
//                   {/* Ribbon for featured */}
//                   {plan.featured && (
//                     <div className="absolute -top-3 left-6 inline-flex items-center gap-2 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow">
//                       <FaStar className="w-3 h-3" />
//                       Popular
//                     </div>
//                   )}

//                   <div>
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <h3 className="text-xl font-semibold text-slate-900">{plan.title}</h3>
//                         <p className="mt-1 text-sm text-slate-500">{plan.tagline}</p>
//                       </div>

//                       {/* Current plan label on card */}
//                       {isCurrent && (
//                         <span className="text-xs px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
//                           Current
//                         </span>
//                       )}
//                     </div>

//                     <div className="mt-6">
//                       <div className="flex items-baseline gap-3">
//                         <span className="text-3xl font-extrabold text-slate-900">{formatPrice(plan)}</span>
//                         <span className="text-sm text-slate-500">{billingLabel}</span>
//                       </div>

//                       <p className="mt-4 text-sm text-slate-600">
//                         {plan.title} plan includes:
//                       </p>

//                       <ul className="mt-4 space-y-2">
//                         {plan.features.map((f, i) => (
//                           <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
//                             <span className="w-5 h-5 inline-grid place-items-center rounded-full bg-emerald-50 text-emerald-600">
//                               <FaCheck className="w-3 h-3" />
//                             </span>
//                             <span>{f}</span>
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   </div>

//                   <div className="mt-6">
//                     <div className="flex items-center justify-between gap-3">
//                       <button
//                         onClick={() => handlePlanSelection(plan.id)}
//                         disabled={isCurrent}
//                         className={`flex-1 text-sm font-semibold px-4 py-2 rounded-lg transition ${
//                           isSelected
//                             ? "bg-indigo-700 text-white shadow-md"
//                             : isCurrent
//                             ? "bg-gray-100 text-gray-500 cursor-not-allowed"
//                             : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
//                         }`}
//                         aria-pressed={isSelected}
//                       >
//                         {isCurrent ? "Current Plan" : isSelected ? "Selected" : "Select plan"}
//                       </button>

//                       <button
//                         onClick={(e) => {
//                           e.preventDefault();
//                           if (isCurrent) {
//                             alert(`You're already on the ${plan.title} plan`);
//                             return;
//                           }
//                           alert(`Proceeding to checkout for the ${plan.title} plan (${billing})`);
//                         }}
//                         className="inline-flex items-center gap-2 px-4 py-2 border rounded-lg text-sm text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                         disabled={isCurrent}
//                       >
//                         {isCurrent ? "Current" : "Upgrade"}
//                       </button>
//                     </div>

//                     {/* small helper */}
//                     <p className="mt-3 text-xs text-slate-500">
//                       {plan.title === "enterprise"
//                         ? "Contact us for custom pricing and onboarding."
//                         : "No lock-in. Cancel anytime."}
//                     </p>
//                   </div>
//                 </article>
//               );
//             })}
//           </div>

          // {/* Compare / CTA area */}
          // <section className="mt-10 bg-gradient-to-r from-indigo-50 to-white rounded-2xl p-6 border border-indigo-100">
          //   <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          //     <div>
          //       <h4 className="text-lg font-semibold text-slate-900">Ready to grow?</h4>
          //       <p className="mt-1 text-sm text-slate-600 max-w-xl">
          //         Start your free trial for the Pro plan — no credit card required for the first 14 days.
          //       </p>
          //     </div>
          //     <div className="flex items-center gap-3">
          //       <button
          //         onClick={(e) => {
          //           e.preventDefault();
          //           if (!selectedPlan) {
          //             alert("Please choose a plan before starting a trial");
          //             return;
          //           }
          //           alert(`Started free trial for ${selectedPlan} (${billing})`);
          //         }}
          //         className="px-5 py-2 rounded-lg bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          //         disabled={!selectedPlan}
          //       >
          //         Start free trial
          //       </button>
          //       <button className="px-4 py-2 rounded-lg text-sm text-slate-700 border hover:bg-slate-50">
          //         Compare features
          //       </button>
          //     </div>
          //   </div>
          // </section>

          // {/* FAQ */}
          // <section className="mt-8">
          //   <h5 className="text-base font-semibold text-slate-900">Common questions</h5>
          //   <div className="mt-3 grid gap-3 sm:grid-cols-2">
          //     <div className="p-4 border rounded-lg bg-white">
          //       <p className="font-medium">Can I switch plans later?</p>
          //       <p className="mt-1 text-sm text-slate-600">Yes — upgrading or downgrading is instant and prorated.</p>
          //     </div>
          //     <div className="p-4 border rounded-lg bg-white">
          //       <p className="font-medium">Do you offer discounts for yearly billing?</p>
          //       <p className="mt-1 text-sm text-slate-600">Yes. Yearly billing gives you 2 months free in this example.</p>
          //     </div>
          //   </div>
          // </section>
//         </main>
//       </div>
//     </div>
//   );
// }



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
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      <div className='bg-blue-100 text-purple-600 py-2 rounded-xl px-4 mb-9 flex items-center border border-l-4 border-purple-600'>
      You have a <span className='font-semibold px-1'>{`${isYearlySubscriptionActive ? " yearly" : " monthly"}`}</span> subscription plan.
      </div>
			<h1 className='text-4xl font-bold text-center mb-4 text-gray-800'>Choose Your Pro Journey</h1>
			<p className='text-xl text-center mb-12 text-gray-600'>
				Unlock premium features and accelerate your learning
			</p>

			{isUserLoaded && userSubscription?.status === "active" && (
				<div className='bg-blue-50 border-l-4 border-blue-500 p-4 mb-8 rounded-md'>
					<p className='text-blue-700'>
						You have an active <span className='font-semibold'>{userSubscription.planType}</span>{" "}
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
									(userSubscription.planType === plan.id || isYearlySubscriptionActive)
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
								) : isUserLoaded && plan.id === "month" && isYearlySubscriptionActive ? (
									"Yearly Plan Active"
								) : (
									plan.ctaText
								)}
							</Button>
						</CardFooter>
					</Card>
				))}
			</div>

      {/* FAQ */}
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