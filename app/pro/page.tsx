import { api } from '@/convex/_generated/api'
import { useUser } from '@clerk/nextjs'
import { useQuery } from 'convex/react'
import { useState } from "react";
import { FaCheck, FaStar } from "react-icons/fa";

/**
 * ProPlanPage
 * Props (optional):
 * - currentPlan: string ("starter" | "pro" | "enterprise") -> will be shown as current subscription
 * - initialBilling: "monthly" | "yearly"
 *
 * Example: <ProPlanPage currentPlan="pro" initialBilling="monthly" />
 */
export default function ProPlanPage({ currentPlan = "starter", initialBilling = "monthly" }) {
  const [billing, setBilling] = useState(initialBilling); // "monthly" | "yearly"
  const [selectedPlan, setSelectedPlan] = useState(null); // allow selecting a plan before confirming

  const {user, isLoaded} = useUser()
  const userData = useQuery(api.users.getUserByClerkId, user ? {clerkId: user?.id} : "skip")
  const userSubcription = useQuery(api.subscriptions.getUserSubscription, userData? {userId: userData._id} : "skip")

  const isYearlySubscriptionActive = userSubcription?.status === 'active' && userSubcription.planType === 'year'

  const plans = [
    {
      id: "starter",
      title: "Starter",
      tagline: "Good for individuals",
      monthly: 9,
      yearly: 90, // 2 months free (example)
      features: ["1 project", "Basic analytics", "Community support"],
    },
    {
      id: "pro",
      title: "Pro",
      tagline: "Most popular",
      monthly: 29,
      yearly: 290,
      featured: true,
      features: ["10 projects", "Advanced analytics", "Priority support", "Integrations"],
    },
    {
      id: "enterprise",
      title: "Enterprise",
      tagline: "For teams & agencies",
      monthly: 99,
      yearly: 990,
      features: ["Unlimited projects", "SLA & onboarding", "Dedicated account manager", "Custom integrations"],
    },
  ];

  const formatPrice = (plan) => {
    return billing === "monthly" ? `$${plan.monthly}` : `$${plan.yearly}`;
  };

  const billingLabel = billing === "monthly" ? "per month" : "per year (billed annually)";

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Choose your plan</h1>
            <p className="mt-1 text-slate-600 max-w-xl">
              Simple, transparent pricing — switch anytime. Pick monthly or yearly billing to save more.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Current subscription badge */}
            <div className="text-sm text-slate-700">
              <span className="block text-xs text-slate-500">Current subscription</span>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white shadow-sm border">
                <span className="uppercase text-xs tracking-wider font-medium">{currentPlan}</span>
                <span className="text-xs text-slate-500">•</span>
                <span className="text-xs text-slate-600">{initialBilling}</span>
              </div>
            </div>

            {/* Billing toggle */}
            <div className="flex flex-col items-center text-sm">
              <span className="text-xs text-slate-500 mb-1">Billing</span>
              <div className="flex items-center gap-2 bg-slate-100 rounded-full p-1">
                <button
                  onClick={() => setBilling("monthly")}
                  aria-pressed={billing === "monthly"}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                    billing === "monthly" ? "bg-white shadow-sm text-slate-900" : "text-slate-600"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBilling("yearly")}
                  aria-pressed={billing === "yearly"}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                    billing === "yearly" ? "bg-white shadow-sm text-slate-900" : "text-slate-600"
                  }`}
                >
                  Yearly
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Plans grid */}
        <main>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
            {plans.map((plan) => {
              const isCurrent = currentPlan === plan.id;
              const isSelected = selectedPlan === plan.id;

              return (
                <article
                  key={plan.id}
                  className={`relative rounded-2xl border ${
                    plan.featured ? "border-indigo-200 shadow-lg" : "border-gray-200"
                  } bg-white p-6 flex flex-col justify-between transition-transform hover:-translate-y-2`}
                >
                  {/* Ribbon for featured */}
                  {plan.featured && (
                    <div className="absolute -top-3 left-6 inline-flex items-center gap-2 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow">
                      <FaStar className="w-3 h-3" />
                      Popular
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-slate-900">{plan.title}</h3>
                        <p className="mt-1 text-sm text-slate-500">{plan.tagline}</p>
                      </div>

                      {/* Current plan label on card */}
                      {isCurrent && (
                        <span className="text-xs px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                          Current
                        </span>
                      )}
                    </div>

                    <div className="mt-6">
                      <div className="flex items-baseline gap-3">
                        <span className="text-3xl font-extrabold text-slate-900">{formatPrice(plan)}</span>
                        <span className="text-sm text-slate-500">{billingLabel}</span>
                      </div>

                      <p className="mt-4 text-sm text-slate-600">
                        {plan.title} plan includes:
                      </p>

                      <ul className="mt-4 space-y-2">
                        {plan.features.map((f, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                            <span className="w-5 h-5 inline-grid place-items-center rounded-full bg-emerald-50 text-emerald-600">
                              <FaCheck className="w-3 h-3" />
                            </span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="flex items-center justify-between gap-3">
                      <button
                        onClick={() => setSelectedPlan(plan.id)}
                        className={`flex-1 text-sm font-semibold px-4 py-2 rounded-lg transition ${
                          isSelected
                            ? "bg-indigo-700 text-white shadow-md"
                            : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                        }`}
                        aria-pressed={isSelected}
                      >
                        {isSelected ? "Selected" : "Select plan"}
                      </button>

                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          // In a real app you'd proceed to checkout/upgrade flow
                          alert(`Proceeding to checkout for the ${plan.title} plan (${billing})`);
                        }}
                        className="inline-flex items-center gap-2 px-4 py-2 border rounded-lg text-sm text-slate-700 hover:bg-slate-50"
                        role="button"
                      >
                        Upgrade
                      </a>
                    </div>

                    {/* small helper */}
                    <p className="mt-3 text-xs text-slate-500">
                      {plan.title === "enterprise"
                        ? "Contact us for custom pricing and onboarding."
                        : "No lock-in. Cancel anytime."}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Compare / CTA area */}
          <section className="mt-10 bg-gradient-to-r from-indigo-50 to-white rounded-2xl p-6 border border-indigo-100">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h4 className="text-lg font-semibold text-slate-900">Ready to grow?</h4>
                <p className="mt-1 text-sm text-slate-600 max-w-xl">
                  Start your free trial for the Pro plan — no credit card required for the first 14 days.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (!selectedPlan) {
                      alert("Please choose a plan before starting a trial");
                      return;
                    }
                    alert(`Started free trial for ${selectedPlan} (${billing})`);
                  }}
                  className="px-5 py-2 rounded-lg bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700"
                >
                  Start free trial
                </a>
                <a href="#" className="px-4 py-2 rounded-lg text-sm text-slate-700 border hover:bg-slate-50">
                  Compare features
                </a>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mt-8">
            <h5 className="text-base font-semibold text-slate-900">Common questions</h5>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div className="p-4 border rounded-lg bg-white">
                <p className="font-medium">Can I switch plans later?</p>
                <p className="mt-1 text-sm text-slate-600">Yes — upgrading or downgrading is instant and prorated.</p>
              </div>
              <div className="p-4 border rounded-lg bg-white">
                <p className="font-medium">Do you offer discounts for yearly billing?</p>
                <p className="mt-1 text-sm text-slate-600">Yes. Yearly billing gives you 2 months free in this example.</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

