// convex/email.ts
"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";
import { Resend } from 'resend';
import { render } from '@react-email/render';
import WelcomeEmail from '../components/emails/WelcomeEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendWelcomeEmail = action({
  args: {
    email: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      
      const emailHtml = await render(
        WelcomeEmail({ 
          name: args.name, 
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/courses` 
        })
      );

      const { data, error } = await resend.emails.send({
        from: 'CourseKingdom <onboarding@resend.dev>',
        to: [args.email],
        subject: 'Welcome to CourseKingdom!',
        html: emailHtml,
      });

      console.log('Resend API response:', { data, error });

      if (error) {
        console.error('Resend API error:', error);
        return { success: false, error: error.message };
      }

      console.log('✅ Welcome email sent successfully');
      return { success: true };
    } catch (error: any) {
      console.error('Failed to send welcome email:', error);
      return { success: false, error: error.message };
    }
  },
});