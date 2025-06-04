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
    <div className="min-h-screen py-12">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Let&apos;s Connect
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            I&apos;m always interested in new opportunities, collaborations, and meaningful 
            conversations. Whether you&apos;re looking to discuss research, explore business 
            partnerships, or simply connect, I&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            {/* Contact Methods */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <method.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">{method.title}</h3>
                          <a 
                            href={method.href}
                            className="text-primary hover:underline font-medium"
                          >
                            {method.value}
                          </a>
                          <p className="text-sm text-muted-foreground mt-1">
                            {method.description}
                          </p>
                          <Badge variant="secondary" className="mt-2 text-xs">
                            {method.responseTime}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Availability</h2>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Weekly Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {availabilitySlots.map((slot, index) => (
                    <div key={index}>
                      <div className="font-medium text-sm mb-1">{slot.day}</div>
                      <div className="space-y-1">
                        {slot.times.map((time, timeIndex) => (
                          <div key={timeIndex} className="text-sm text-muted-foreground">
                            {time}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  <div className="pt-3 border-t">
                    <p className="text-xs text-muted-foreground">
                      * Times shown in Eastern Time (ET)
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Inquiry Types */}
            <div>
              <h2 className="text-2xl font-bold mb-6">What I Can Help With</h2>
              <div className="space-y-3">
                {inquiryTypes.map((type, index) => (
                  <Card key={index} className="hover:shadow-sm transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <type.icon className="w-4 h-4 text-primary mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium text-sm">{type.title}</h3>
                            {type.popular && (
                              <Badge variant="default" className="text-xs">Popular</Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {type.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
                <p className="text-muted-foreground">
                  Fill out the form below and I&apos;ll get back to you as soon as possible.
                </p>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card>
            <CardContent className="p-6 text-center">
              <MessageSquare className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Response Time</h3>
              <p className="text-sm text-muted-foreground">
                I typically respond to emails within 24 hours during business days.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Calendar className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Meeting Requests</h3>
              <p className="text-sm text-muted-foreground">
                For meetings, please provide 2-3 preferred time slots in your message.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Time Zone</h3>
              <p className="text-sm text-muted-foreground">
                I&apos;m based in Virginia, USA (Eastern Time) but happy to accommodate different time zones.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}