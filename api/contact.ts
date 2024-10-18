'use server'

import { z } from 'zod'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY);

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
})

type FormState = {
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
  message?: string;
}

export async function submitContactForm(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = schema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  })

  if (!validatedFields.success) {
    return { 
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { name, email, message } = validatedFields.data;

  if (!process.env.RECIPIENT_EMAIL) {
    console.error('RECIPIENT_EMAIL is not set in environment variables');
    return {
      message: "There was an error sending your message. Please try again later."
    }
  }

  try {
    await resend.emails.send({
      from: 'Your Portfolio <onboarding@resend.dev>',
      to: process.env.RECIPIENT_EMAIL,
      subject: 'New Contact Form Submission',
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
    });

    return { 
      message: "Thank you for your message. We'll be in touch soon!"
    }
  } catch (error) {
    console.error('Error sending email:', error);
    return { 
      message: "There was an error sending your message. Please try again later."
    }
  }
}