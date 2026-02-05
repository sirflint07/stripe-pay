"use client"

import { api } from '@/convex/_generated/api'
import { useUser } from '@clerk/nextjs'
import { useAction, useQuery } from 'convex/react'
import { Button } from './ui/button'
import { Id } from '@/convex/_generated/dataModel'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'react-toastify'

const PurchaseButton = ({courseId}: {courseId: Id<"courses">}) => {
    const [isLoading, setIsLoading] = useState(false)
    const createCheckOutSession = useAction(api.stripe.createCheckoutSession)

    const handlePurchase = async () => {
        if (!user) {
            return toast.error("Please sign in to purchase the course")
        }

        setIsLoading(true)
        try {
            const {checkoutUrl} = await createCheckOutSession({courseId})
            if (checkoutUrl) {
                window.location.href = checkoutUrl
            } else {
                return toast.error("Failed to create checkout session")
            }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {

            if (error.message.includes('Rate limit exceeded')) {
                toast.error("Rate limit exceeded. Please try again later in 2 minutes")
            } else {
                toast.error("An unexpected error occurred. Please try again later.")
            }
           
        } finally {
            setIsLoading(false)
        }
    }

    const { user } = useUser()
    const userData = useQuery(api.users.getUserByClerkId, user ? {clerkId: user?.id} : "skip")

    const userAccess = useQuery(api.users.getUserAccess, userData ? {userId: userData?._id, courseId} : "skip") || {hasAccess: false}

    if (isLoading) {
        return <Button disabled={isLoading}>
            <Loader2 className="animate-spin mr-2" />
            Processing...
        </Button>
    }

    if (!userAccess.hasAccess) {
    return <Button variant={'secondary'} onClick={handlePurchase} disabled={isLoading}>
        Enroll Now
    </Button>
    }

    if (userAccess.hasAccess) {
        return <Button variant={'outline'} disabled={isLoading}>
            <a href={`courses/${courseId}`} >
            View Course
            </a>
            </Button>
    }

    
}

export default PurchaseButton
