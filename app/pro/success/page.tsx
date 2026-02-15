// app/pro-plan/success/simple/page.tsx
"use client"

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CheckCircle, ArrowRight, Coins, Home } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const SimpleProPlanSuccessPage = () => {
  const searchParams = useSearchParams()
  const isYearly = searchParams.get('year') === 'true'
  
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const benefits = isYearly
    ? [
        "Full year access to all premium courses",
        "Save 17% vs monthly",
        "Priority support",
        "Exclusive yearly events",
        "Early access to new courses",
      ]
    : [
        "Access to all premium courses",
        "Priority support",
        "Exclusive community",
        "Monthly Q&A sessions",
        "Course updates included",
      ]

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-white px-4 py-12">
        <div>
            <br/>
        </div>
      <div className="max-w-md mx-auto">
        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Pro Plan Activated
          </h1>
          <div className={`inline-flex items-center gap-2 px-4 py-1 rounded-full ${isYearly ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'} font-medium`}>
            {isYearly ? '🎉 Yearly Plan' : '🚀 Monthly Plan'}
          </div>
          <p className="text-gray-600 mt-4">
            Your subscription is now active. Start learning today.
          </p>
        </div>

        {/* Benefits */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <h3 className="font-semibold text-gray-900 mb-4">
            What you get:
          </h3>
          <ul className="space-y-3">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center bg-green-100 text-green-600 rounded-full text-xs mt-0.5">
                  ✓
                </div>
                <span className="text-gray-700">{benefit}</span>
              </li>
            ))}
          </ul>

          {isYearly && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800 text-sm">
                <span className="font-semibold">Yearly Bonus:</span> You&apos;re saving 17%!
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <Button asChild className="w-full h-12">
            <Link href="/courses" className="flex items-center justify-center">
              Start Learning
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>

          <div className="flex gap-4">
            <Button asChild variant="outline" className="flex-1 h-10">
              <Link href="/dashboard" className='flex gap-2'>
                <span><Home className='size-6'/></span><span>Home</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="flex-1 h-10">
              <Link href="/billing" className='flex gap-2'>
                <span className='inline-block'><Coins className='size-6'/></span>
                <span className='inline-block'>Billing</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            Subscription renews {isYearly ? 'yearly' : 'monthly'}. Cancel anytime.
          </p>
        </div>
      </div>
    </div>
  )
}

export default SimpleProPlanSuccessPage