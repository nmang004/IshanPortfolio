import { Metadata } from 'next'
import { Mail, Phone, MapPin, Clock, Calendar, MessageSquare } from 'lucide-react'
import { ContactForm } from '@/components/sections/contact-form'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'Contact Ishan Perera',
  description: 'Get in touch with Ishan Perera for collaboration opportunities, research inquiries, or professional connections.',
  keywords: ['contact', 'collaboration', 'research', 'medical student', 'consultation'],
}

const contactMethods = [
  {
    icon: Mail,
    title: 'Email',
    value: 'ishan.perera@vcom.edu',
    description: 'Best for detailed inquiries and formal communication',
    responseTime: 'Within 24 hours',
    href: 'mailto:ishan.perera@vcom.edu',
  },
  {
    icon: Phone,
    title: 'Phone',
    value: '+1 (555) 123-4567',
    description: 'For urgent matters and direct consultation',
    responseTime: 'Business hours',
    href: 'tel:+15551234567',
  },
  {
    icon: MapPin,
    title: 'Location',
    value: 'Virginia, USA',
    description: 'Edward Via College of Osteopathic Medicine',
    responseTime: 'Available for meetings',
    href: '#',
  },
]

const availabilitySlots = [
  { day: 'Monday', times: ['9:00 AM - 12:00 PM', '2:00 PM - 5:00 PM'] },
  { day: 'Tuesday', times: ['10:00 AM - 1:00 PM', '3:00 PM - 6:00 PM'] },
  { day: 'Wednesday', times: ['9:00 AM - 11:00 AM', '1:00 PM - 4:00 PM'] },
  { day: 'Thursday', times: ['10:00 AM - 12:00 PM', '2:00 PM - 5:00 PM'] },
  { day: 'Friday', times: ['9:00 AM - 1:00 PM'] },
]

const inquiryTypes = [
  {
    title: 'Research Collaboration',
    description: 'Opportunities for joint research projects or academic partnerships',
    icon: MessageSquare,
    popular: true,
  },
  {
    title: 'Speaking Engagements',
    description: 'Presentations, conferences, or academic speaking opportunities',
    icon: Calendar,
  },
  {
    title: 'Business Consultation',
    description: 'Strategic consulting for healthcare or business ventures',
    icon: Clock,
  },
  {
    title: 'Mentorship',
    description: 'Guidance for students or early-career professionals',
    icon: MessageSquare,
  },
  {
    title: 'Media Inquiries',
    description: 'Interviews, articles, or press-related requests',
    icon: MessageSquare,
  },
  {
    title: 'General Inquiry',
    description: 'Any other questions or collaboration opportunities',
    icon: MessageSquare,
  },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header Section */}
      <section className="py-20 lg:py-32 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Professional Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-6 border border-blue-200 dark:border-blue-800">
              <Mail className="w-4 h-4" />
              Contact Me
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Let&apos;s Connect
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
              I&apos;m always interested in new opportunities, collaborations, and meaningful 
              conversations. Whether you&apos;re looking to discuss research, explore business 
              partnerships, or simply connect, I&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-20">

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-8">
              {/* Contact Methods */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Get in Touch</h2>
                <div className="space-y-4">
                  {contactMethods.map((method, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                          <method.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{method.title}</h3>
                          <a 
                            href={method.href}
                            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                          >
                            {method.value}
                          </a>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {method.description}
                          </p>
                          <span className="inline-block mt-3 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium">
                            {method.responseTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            {/* Availability */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Availability</h2>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Weekly Schedule</h3>
                </div>
                <div className="space-y-4">
                  {availabilitySlots.map((slot, index) => (
                    <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-3 last:border-b-0 last:pb-0">
                      <div className="font-medium text-gray-900 dark:text-white mb-2">{slot.day}</div>
                      <div className="space-y-1">
                        {slot.times.map((time, timeIndex) => (
                          <div key={timeIndex} className="text-sm text-gray-600 dark:text-gray-400 pl-4">
                            • {time}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      * Times shown in Eastern Time (ET)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Inquiry Types */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">What I Can Help With</h2>
              <div className="space-y-3">
                {inquiryTypes.map((type, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:shadow-sm transition-all duration-300">
                    <div className="flex items-start gap-3">
                      <type.icon className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-gray-900 dark:text-white">{type.title}</h3>
                          {type.popular && (
                            <span className="px-2 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-medium">
                              Popular
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {type.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Send a Message</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Fill out the form below and I&apos;ll get back to you as soon as possible.
                </p>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 text-center shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <MessageSquare className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Response Time</h3>
            <p className="text-gray-600 dark:text-gray-400">
              I typically respond to emails within 24 hours during business days.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 text-center shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="w-16 h-16 bg-purple-50 dark:bg-purple-900/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Meeting Requests</h3>
            <p className="text-gray-600 dark:text-gray-400">
              For meetings, please provide 2-3 preferred time slots in your message.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 text-center shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Clock className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Time Zone</h3>
            <p className="text-gray-600 dark:text-gray-400">
              I&apos;m based in Virginia, USA (Eastern Time) but happy to accommodate different time zones.
            </p>
          </div>
        </div>
        
        </div>
      </div>
    </div>
  )
}