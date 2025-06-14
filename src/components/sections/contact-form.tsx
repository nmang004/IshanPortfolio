'use client'

import { useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, Mail, MessageSquare,
  FileText, Send, Check, Upload, X 
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils/cn'

const contactSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  inquiryType: z.enum([
    'research',
    'speaking',
    'consultation',
    'mentorship',
    'media',
    'general'
  ]),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
  meetingRequest: z.boolean().optional(),
  preferredTimes: z.string().optional(),
  urgency: z.enum(['low', 'medium', 'high']).default('medium'),
  newsletter: z.boolean().default(false),
})

type ContactFormData = z.infer<typeof contactSchema>

const inquiryTypes = [
  { value: 'research', label: 'Research Collaboration', icon: FileText },
  { value: 'speaking', label: 'Speaking Engagement', icon: MessageSquare },
  { value: 'consultation', label: 'Business Consultation', icon: User },
  { value: 'mentorship', label: 'Mentorship', icon: User },
  { value: 'media', label: 'Media Inquiry', icon: MessageSquare },
  { value: 'general', label: 'General Inquiry', icon: Mail },
]

const urgencyLevels = [
  { value: 'low', label: 'Low Priority', color: 'bg-green-100 text-green-800' },
  { value: 'medium', label: 'Medium Priority', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'high', label: 'High Priority', color: 'bg-red-100 text-red-800' },
]

export function ContactForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    trigger,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onChange',
    defaultValues: {
      urgency: 'medium',
      newsletter: false,
      meetingRequest: false,
    },
  })

  const watchedValues = watch()

  const nextStep = useCallback(async () => {
    let fieldsToValidate: (keyof ContactFormData)[] = []
    
    if (currentStep === 1) {
      fieldsToValidate = ['firstName', 'lastName', 'email']
    } else if (currentStep === 2) {
      fieldsToValidate = ['inquiryType', 'subject']
    }

    const isStepValid = await trigger(fieldsToValidate)
    if (isStepValid && currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }, [currentStep, trigger])

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log('Form submitted:', data)
      console.log('Uploaded files:', uploadedFiles)
      
      setIsSubmitted(true)
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setUploadedFiles(prev => [...prev, ...files])
  }

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Message Sent Successfully!</h3>
        <p className="text-muted-foreground mb-6">
          Thank you for reaching out. I&apos;ll get back to you within 24 hours.
        </p>
        <Button onClick={() => {
          setIsSubmitted(false)
          setCurrentStep(1)
        }}>
          Send Another Message
        </Button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Progress Indicator */}
      <div className="flex items-center justify-between mb-8">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
                step <= currentStep
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              )}
            >
              {step < currentStep ? <Check className="w-4 h-4" /> : step}
            </div>
            {step < 3 && (
              <div
                className={cn(
                  'h-1 w-16 mx-2',
                  step < currentStep ? 'bg-primary' : 'bg-muted'
                )}
              />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Personal Information */}
        {currentStep === 1 && (
          <motion.div
            key="step1"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            className="space-y-4"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-gray-900 dark:text-white font-medium">First Name *</Label>
                  <Input
                    id="firstName"
                    {...register('firstName')}
                    className={`bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 ${errors.firstName ? 'border-red-500' : ''}`}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-gray-900 dark:text-white font-medium">Last Name *</Label>
                  <Input
                    id="lastName"
                    {...register('lastName')}
                    className={`bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 ${errors.lastName ? 'border-red-500' : ''}`}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="text-gray-900 dark:text-white font-medium">Email Address *</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                className={`bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 ${errors.email ? 'border-red-500' : ''}`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="phone" className="text-gray-900 dark:text-white font-medium">Phone Number (Optional)</Label>
              <Input
                id="phone"
                type="tel"
                {...register('phone')}
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
              />
            </div>
          </motion.div>
        )}

        {/* Step 2: Inquiry Details */}
        {currentStep === 2 && (
          <motion.div
            key="step2"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            className="space-y-4"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Inquiry Details</h3>
              
              <div className="space-y-4">
                <div>
                  <Label className="text-gray-900 dark:text-white font-medium">Type of Inquiry *</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                    {inquiryTypes.map((type) => (
                      <label
                        key={type.value}
                        className={cn(
                          'flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors',
                          watchedValues.inquiryType === type.value
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        )}
                      >
                        <input
                          type="radio"
                          value={type.value}
                          {...register('inquiryType')}
                          className="sr-only"
                        />
                        <type.icon className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">{type.label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.inquiryType && (
                    <p className="text-red-500 text-sm mt-1">{errors.inquiryType.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="subject" className="text-gray-900 dark:text-white font-medium">Subject *</Label>
                  <Input
                    id="subject"
                    {...register('subject')}
                    className={`bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 ${errors.subject ? 'border-red-500' : ''}`}
                    placeholder="Brief description of your inquiry"
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                  )}
                </div>

                <div>
                  <Label className="text-gray-900 dark:text-white font-medium">Priority Level</Label>
                  <div className="flex gap-2 mt-2">
                    {urgencyLevels.map((level) => (
                      <label
                        key={level.value}
                        className={cn(
                          'flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors text-sm',
                          watchedValues.urgency === level.value
                            ? level.color
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        )}
                      >
                        <input
                          type="radio"
                          value={level.value}
                          {...register('urgency')}
                          className="sr-only"
                        />
                        {level.label}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3: Message and Options */}
        {currentStep === 3 && (
          <motion.div
            key="step3"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            className="space-y-4"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Your Message</h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="message" className="text-gray-900 dark:text-white font-medium">Message *</Label>
                  <Textarea
                    id="message"
                    rows={6}
                    {...register('message')}
                    className={`bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 ${errors.message ? 'border-red-500' : ''}`}
                    placeholder="Please provide details about your inquiry..."
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>

                {/* File Upload */}
                <div>
                  <Label className="text-gray-900 dark:text-white font-medium">Attachments (Optional)</Label>
                  <div className="mt-2">
                    <input
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                      accept=".pdf,.doc,.docx,.txt"
                    />
                    <label
                      htmlFor="file-upload"
                      className="flex items-center gap-2 px-4 py-2 border border-dashed border-muted-foreground/50 rounded-lg cursor-pointer hover:border-primary transition-colors"
                    >
                      <Upload className="w-4 h-4" />
                      <span className="text-sm">Upload files</span>
                    </label>
                    
                    {uploadedFiles.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {uploadedFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                            <span className="text-sm">{file.name}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(index)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Meeting Request */}
                <div className="space-y-3">
                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      {...register('meetingRequest')}
                      className="mt-1"
                    />
                    <div>
                      <span className="font-medium">Request a meeting</span>
                      <p className="text-sm text-muted-foreground">
                        I&apos;d like to schedule a call or video meeting to discuss this further
                      </p>
                    </div>
                  </label>

                  {watchedValues.meetingRequest && (
                    <div>
                      <Label htmlFor="preferredTimes" className="text-gray-900 dark:text-white font-medium">Preferred Times</Label>
                      <Textarea
                        id="preferredTimes"
                        rows={3}
                        {...register('preferredTimes')}
                        className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                        placeholder="Please provide 2-3 preferred time slots (include your time zone)"
                      />
                    </div>
                  )}
                </div>

                {/* Newsletter Signup */}
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    {...register('newsletter')}
                    className="mt-1"
                  />
                  <div>
                    <span className="font-medium">Subscribe to updates</span>
                    <p className="text-sm text-muted-foreground">
                      Receive occasional updates about my research and projects
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        <Button
          type="button"
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1}
        >
          Previous
        </Button>

        {currentStep < 3 ? (
          <Button type="button" onClick={nextStep}>
            Next
          </Button>
        ) : (
          <Button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="min-w-[120px]"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Sending...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4" />
                Send Message
              </div>
            )}
          </Button>
        )}
      </div>
    </form>
  )
}