'use client'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils/formatting'
import { ShareButtons } from '@/components/ui/share-buttons'
import { ReadingProgress } from '@/components/ui/reading-progress'
import { ArrowLeft, Clock, User, Calendar } from 'lucide-react'

const blogPosts = [
  {
    id: 1,
    slug: 'advances-in-minimally-invasive-neurosurgery',
    title: 'Advances in Minimally Invasive Neurosurgery: A New Era of Precision',
    excerpt: 'Exploring the latest developments in keyhole neurosurgery techniques that reduce patient trauma while maintaining surgical precision.',
    content: `The field of neurosurgery has witnessed remarkable transformations with the advent of minimally invasive techniques. These approaches have revolutionized how we perform complex brain and spine surgeries, offering patients better outcomes with reduced recovery times.

## The Evolution of Surgical Techniques

Traditional open neurosurgery, while effective, often required large incisions and extensive tissue manipulation. Modern minimally invasive approaches utilize advanced imaging, robotics, and precision instruments to access target areas through smaller openings.

### Key Technologies Driving Change

**Endoscopic Surgery**: Using high-definition cameras and specialized instruments, surgeons can now navigate complex anatomical structures with unprecedented visualization.

**Stereotactic Navigation**: Computer-guided systems provide real-time positioning, allowing for millimeter-precise targeting of lesions.

**Intraoperative Imaging**: Advanced MRI and CT scanning during surgery ensures optimal results and reduces the need for repeat procedures.

## Clinical Applications

These techniques are particularly beneficial for:
- Pituitary tumor removal
- Brain aneurysm clipping
- Spinal disc procedures
- Deep brain stimulation electrode placement

## Patient Benefits

The advantages are significant:
- Reduced surgical trauma
- Shorter hospital stays
- Faster recovery times
- Lower infection rates
- Improved cosmetic outcomes

## Future Directions

As technology continues to advance, we anticipate even more sophisticated approaches, including AI-assisted surgery and enhanced robotic systems that will further improve patient outcomes.`,
    author: 'Dr. Ishan Perera',
    publishedAt: '2024-06-10',
    readingTime: '8 min read',
    category: 'Surgical Innovation',
    tags: ['Minimally Invasive', 'Technology', 'Patient Care'],
    featured: true
  },
  {
    id: 2,
    slug: 'understanding-brain-tumors',
    title: 'Understanding Brain Tumors: Classification, Diagnosis, and Treatment Options',
    excerpt: 'A comprehensive guide to brain tumor types, modern diagnostic approaches, and treatment strategies.',
    content: `Brain tumors represent one of the most complex challenges in neurosurgery, requiring a multidisciplinary approach and cutting-edge diagnostic techniques for optimal patient outcomes.

## Classification of Brain Tumors

Brain tumors are broadly classified into two main categories:

### Primary Brain Tumors
These originate within the brain tissue itself:
- **Gliomas**: Including astrocytomas, oligodendrogliomas, and glioblastomas
- **Meningiomas**: Arising from the protective membranes surrounding the brain
- **Pituitary Adenomas**: Benign tumors of the pituitary gland
- **Acoustic Neuromas**: Affecting the auditory nerve

### Secondary (Metastatic) Brain Tumors
These spread to the brain from other parts of the body, commonly from:
- Lung cancer
- Breast cancer
- Melanoma
- Kidney cancer

## Modern Diagnostic Approaches

### Advanced Imaging Techniques
**MRI with Spectroscopy**: Provides detailed tissue characterization
**Functional MRI (fMRI)**: Maps critical brain functions before surgery
**Diffusion Tensor Imaging (DTI)**: Visualizes white matter tracts
**PET Scanning**: Assesses metabolic activity and tumor aggressiveness

### Molecular Diagnostics
Modern pathology now includes genetic profiling of tumors, providing crucial information for:
- Prognosis determination
- Treatment selection
- Clinical trial eligibility

## Treatment Strategies

### Surgical Intervention
The gold standard for most brain tumors involves:
- **Maximal Safe Resection**: Removing as much tumor as possible while preserving neurological function
- **Awake Craniotomy**: For tumors in eloquent brain areas
- **Intraoperative Monitoring**: Real-time assessment of brain function during surgery

### Adjuvant Therapies
**Radiation Therapy**: 
- Stereotactic radiosurgery for small lesions
- Fractionated radiation for larger tumors

**Chemotherapy**:
- Temozolomide for glioblastomas
- Targeted therapies based on molecular markers

### Emerging Treatments
- Immunotherapy approaches
- Tumor treating fields (TTFields)
- CAR-T cell therapy trials
- Personalized medicine based on tumor genetics

## The Multidisciplinary Approach

Successful brain tumor treatment requires collaboration between:
- Neurosurgeons
- Neuro-oncologists
- Radiation oncologists
- Pathologists
- Neurologists
- Rehabilitation specialists

## Patient Support and Quality of Life

Beyond medical treatment, comprehensive care includes:
- Neuropsychological support
- Physical and occupational therapy
- Palliative care when appropriate
- Family counseling and support groups

## Research and Future Directions

Current research focuses on:
- Liquid biopsies for early detection
- Nanotechnology drug delivery systems
- AI-assisted surgical planning
- Novel therapeutic targets

The field continues to evolve rapidly, offering hope for improved outcomes and quality of life for patients facing these challenging diagnoses.`,
    author: 'Dr. Ishan Perera',
    publishedAt: '2024-05-28',
    readingTime: '12 min read',
    category: 'Neuro-oncology',
    tags: ['Brain Tumors', 'Diagnosis', 'Treatment', 'Oncology'],
    featured: false
  },
  {
    id: 3,
    slug: 'pediatric-neurosurgery-considerations',
    title: 'Pediatric Neurosurgery: Special Considerations and Unique Challenges',
    excerpt: 'Examining the distinct aspects of neurosurgical care for children, from anatomical differences to developmental considerations.',
    content: `Pediatric neurosurgery represents a highly specialized field that addresses the unique neurological needs of children, from newborns to adolescents. The developing brain presents distinct challenges and opportunities that require specialized expertise and techniques.

## Anatomical and Physiological Differences

### Brain Development
Children's brains undergo continuous development, which impacts surgical planning:
- **Neuroplasticity**: Enhanced ability to recover and reorganize after injury
- **Growth Patterns**: Consideration of how surgery may affect future development
- **Vascular Differences**: Unique blood supply patterns in developing brains

### Skull Characteristics
- **Fontanelles**: Open sutures in infants allowing for brain growth
- **Bone Thickness**: Thinner skull bones requiring modified surgical techniques
- **Suture Fusion**: Timing of suture closure affects surgical approaches

## Common Pediatric Neurosurgical Conditions

### Congenital Malformations
**Spina Bifida**: 
- Myelomeningocele repair
- Shunt placement for associated hydrocephalus
- Tethered cord release procedures

**Craniosynostosis**:
- Early suture fusion requiring surgical correction
- Endoscopic techniques for younger infants
- Complex reconstruction for syndromic cases

### Hydrocephalus
- Most common neurosurgical condition in children
- Shunt systems and endoscopic third ventriculostomy
- Long-term management and monitoring

### Brain Tumors
Pediatric brain tumors differ significantly from adult tumors:
- **Medulloepithelioma**: Rare embryonal tumors
- **Pilocytic Astrocytoma**: Most common pediatric brain tumor
- **Ependymoma**: Often arising from the fourth ventricle

## Surgical Techniques and Considerations

### Anesthesia Management
- Specialized pediatric anesthesiology
- Airway management in infants
- Temperature regulation
- Fluid and electrolyte balance

### Surgical Positioning
- Age-appropriate positioning devices
- Pressure point protection
- Cardiovascular considerations

### Instrumentation
- Pediatric-sized instruments
- Microsurgical techniques adapted for smaller anatomy
- Specialized implants and devices

## Pre-operative Planning

### Imaging Considerations
- Sedation requirements for younger children
- Age-appropriate protocols
- Radiation exposure minimization
- Advanced imaging interpretation in developing brains

### Family-Centered Care
- Age-appropriate explanations
- Family involvement in decision-making
- Psychological preparation for surgery
- Support for siblings and parents

## Post-operative Care

### Intensive Care Management
- Pediatric neurocritical care
- Intracranial pressure monitoring
- Seizure management
- Nutritional support

### Rehabilitation
- Early mobilization protocols
- Physical and occupational therapy
- Speech and language therapy
- Educational support planning

## Long-term Outcomes and Follow-up

### Developmental Monitoring
- Cognitive assessments
- Motor development tracking
- Educational accommodations
- Psychosocial support

### Growth Considerations
- Impact on normal development
- Hormonal function monitoring
- Nutritional assessments
- Activity restrictions and modifications

## Ethical Considerations

Pediatric neurosurgery involves unique ethical challenges:
- **Informed Consent**: Involving minors in age-appropriate decision-making
- **Quality of Life**: Balancing intervention with functional outcomes
- **Family Dynamics**: Supporting families through difficult decisions
- **Resource Allocation**: Ensuring access to specialized care

## Research and Innovation

Current research areas include:
- Fetal neurosurgery techniques
- Stem cell therapy applications
- Minimally invasive approaches
- Bioengineering solutions for pediatric devices

## Multidisciplinary Team Approach

Successful pediatric neurosurgical care requires:
- Pediatric neurosurgeons
- Pediatric anesthesiologists
- Pediatric intensivists
- Child life specialists
- Social workers
- Educational liaisons
- Rehabilitation specialists

## Future Directions

The field continues to advance with:
- Improved surgical techniques
- Better understanding of developmental neurobiology
- Enhanced diagnostic capabilities
- Novel therapeutic approaches
- Improved long-term outcome prediction

Pediatric neurosurgery remains a challenging but rewarding field, offering the opportunity to profoundly impact young lives and their families while contributing to our understanding of the developing nervous system.`,
    author: 'Dr. Ishan Perera',
    publishedAt: '2024-05-15',
    readingTime: '10 min read',
    category: 'Pediatric Care',
    tags: ['Pediatrics', 'Child Health', 'Development', 'Surgery'],
    featured: false
  },
  {
    id: 4,
    slug: 'spinal-surgery-innovations',
    title: 'Innovations in Spinal Surgery: From Fusion to Motion Preservation',
    excerpt: 'Exploring modern spinal surgery techniques that prioritize both stability and natural movement.',
    content: `Spinal surgery has undergone a revolutionary transformation over the past two decades, evolving from traditional fusion techniques to innovative motion-preserving approaches that maintain spinal biomechanics while addressing pathology.

## Evolution of Spinal Surgery

### Traditional Approaches
Historically, spinal fusion was the gold standard for treating degenerative conditions:
- **Anterior Cervical Discectomy and Fusion (ACDF)**
- **Posterior Lumbar Interbody Fusion (PLIF)**
- **Transforaminal Lumbar Interbody Fusion (TLIF)**

### Modern Philosophy
Contemporary spinal surgery emphasizes:
- Preserving normal anatomy when possible
- Maintaining natural motion
- Minimizing surgical morbidity
- Addressing root causes rather than symptoms alone

## Motion Preservation Technologies

### Cervical Disc Replacement
Artificial cervical discs offer several advantages:
- **Maintained Range of Motion**: Preserves natural neck movement
- **Adjacent Segment Protection**: Reduces stress on neighboring levels
- **Faster Recovery**: Often shorter rehabilitation periods
- **Improved Patient Satisfaction**: Better functional outcomes

#### Selection Criteria
Ideal candidates include:
- Single or two-level cervical disc disease
- Preserved facet joint anatomy
- Adequate bone quality
- Absence of instability

### Lumbar Disc Replacement
For appropriate candidates, lumbar artificial discs provide:
- **Biomechanical Advantage**: Maintains natural load distribution
- **Reduced Adjacent Level Disease**: Lower risk of neighboring segment degeneration
- **Improved Quality of Life**: Better functional outcomes compared to fusion

## Minimally Invasive Techniques

### Endoscopic Spinal Surgery
Revolutionary visualization allows:
- **Full Endoscopic Discectomy**: Treating herniated discs through tiny incisions
- **Endoscopic Foraminotomy**: Decompressing nerve roots with minimal tissue disruption
- **Endoscopic Fusion**: Performing fusion procedures through small access points

### Lateral Approaches
- **Lateral Lumbar Interbody Fusion (LLIF)**: Accessing the spine from the side
- **Oblique Lumbar Interbody Fusion (OLIF)**: Utilizing natural anatomical corridors
- **Benefits**: Reduced muscle damage, preserved posterior structures

## Advanced Imaging and Navigation

### Intraoperative Imaging
- **O-arm Navigation**: Real-time 3D imaging during surgery
- **Stealth Navigation**: Computer-guided surgical precision
- **Augmented Reality**: Overlaying digital information on surgical field

### Pre-operative Planning
- **3D Modeling**: Patient-specific anatomical models
- **Virtual Reality**: Surgical rehearsal and planning
- **AI-Assisted Planning**: Computer-aided surgical strategy development

## Biomaterials and Implant Technology

### Next-Generation Materials
- **Titanium Alloys**: Enhanced biocompatibility and strength
- **PEEK (Polyetheretherketone)**: Radiolucent material with bone-like elasticity
- **Carbon Fiber**: Lightweight, strong, and imaging-friendly

### Smart Implants
- **Load-Sharing Devices**: Adapting to patient anatomy and activity
- **Bioactive Surfaces**: Promoting bone integration
- **Modular Systems**: Allowing customization for individual patients

## Biologics and Regenerative Medicine

### Bone Graft Alternatives
- **Bone Morphogenetic Proteins (BMPs)**: Stimulating bone formation
- **Stem Cell Therapy**: Harnessing regenerative potential
- **Platelet-Rich Plasma (PRP)**: Accelerating healing processes

### Disc Regeneration
Emerging therapies include:
- **Injectable Biologics**: Restoring disc height and function
- **Cellular Therapies**: Regenerating disc tissue
- **Growth Factor Delivery**: Stimulating natural repair mechanisms

## Robotic-Assisted Surgery

### Advantages of Robotic Systems
- **Enhanced Precision**: Sub-millimeter accuracy in implant placement
- **Reduced Radiation Exposure**: Optimized imaging protocols
- **Improved Ergonomics**: Better surgeon comfort and control
- **Standardized Techniques**: Consistent surgical execution

### Current Applications
- **Pedicle Screw Placement**: Automated, precise screw insertion
- **Disc Space Preparation**: Robotic disc removal and preparation
- **Implant Positioning**: Optimal device placement

## Patient Selection and Outcomes

### Decision-Making Framework
Modern spinal surgery requires careful consideration of:
- **Patient Age and Activity Level**
- **Anatomical Factors**
- **Comorbidity Profile**
- **Patient Expectations and Goals**

### Outcome Measures
Success is evaluated through:
- **Functional Improvement**: Activities of daily living
- **Pain Reduction**: Validated pain scales
- **Quality of Life**: Patient-reported outcome measures
- **Return to Activity**: Work and recreational function

## Complications and Management

### Prevention Strategies
- **Thorough Pre-operative Assessment**
- **Appropriate Patient Selection**
- **Meticulous Surgical Technique**
- **Comprehensive Post-operative Care**

### Complication Management
- **Early Recognition**: Prompt identification of issues
- **Conservative Management**: Non-surgical approaches when appropriate
- **Revision Surgery**: When conservative measures fail

## Future Directions

### Emerging Technologies
- **Artificial Intelligence**: Predictive modeling and outcome optimization
- **Nanotechnology**: Targeted drug delivery systems
- **3D Printing**: Patient-specific implants and instruments
- **Bioengineering**: Living tissue replacements

### Research Areas
- **Disc Regeneration**: Biological repair of damaged discs
- **Neural Interface Technology**: Direct spinal cord interaction
- **Personalized Medicine**: Genetic profiling for treatment selection
- **Preventive Strategies**: Early intervention to prevent degeneration

## Conclusion

The future of spinal surgery lies in personalized, motion-preserving approaches that combine advanced technology with biological understanding. As we continue to innovate, the goal remains constant: restoring function, reducing pain, and improving quality of life for patients with spinal disorders.

This evolution represents not just technological advancement, but a fundamental shift in how we understand and treat spinal pathology, offering hope for better outcomes and improved patient experiences.`,
    author: 'Dr. Ishan Perera',
    publishedAt: '2024-05-05',
    readingTime: '15 min read',
    category: 'Spinal Surgery',
    tags: ['Spine', 'Innovation', 'Technology', 'Motion Preservation'],
    featured: true
  },
  {
    id: 5,
    slug: 'neurosurgical-training-evolution',
    title: 'The Evolution of Neurosurgical Training: Embracing Technology and Simulation',
    excerpt: 'How modern neurosurgical education integrates virtual reality, simulation, and traditional mentorship.',
    content: `Neurosurgical training has undergone a dramatic transformation in recent years, incorporating cutting-edge technologies while maintaining the fundamental principles of surgical education. This evolution reflects both the complexity of modern neurosurgery and the need to optimize learning outcomes for the next generation of neurosurgeons.

## Traditional Neurosurgical Training

### The Halstedian Model
For over a century, surgical training followed the principles established by William Halsted:
- **See One, Do One, Teach One**: Progressive responsibility model
- **Apprenticeship System**: Close mentorship relationships
- **Graduated Autonomy**: Increasing independence over time
- **Case Volume Requirements**: Exposure to diverse pathology

### Challenges in Traditional Training
- **Limited Case Diversity**: Not all residents see rare pathologies
- **Variable Quality**: Inconsistent learning experiences
- **Patient Safety Concerns**: Learning on actual patients
- **Time Constraints**: Pressure to reduce training duration

## Modern Training Innovations

### Simulation-Based Learning

#### Virtual Reality Systems
Advanced VR platforms offer:
- **Immersive Environments**: Realistic surgical scenarios
- **Haptic Feedback**: Tactile sensation during procedures
- **Risk-Free Learning**: Practice without patient consequences
- **Repeatable Scenarios**: Multiple attempts at challenging cases

#### Physical Simulators
- **Cadaveric Training**: Enhanced preservation techniques
- **Synthetic Models**: Realistic tissue properties
- **3D Printed Anatomy**: Patient-specific practice models
- **Hybrid Simulators**: Combining virtual and physical elements

### Augmented Reality in Training
- **Overlay Information**: Real-time anatomical guidance
- **Surgical Navigation**: Enhanced visualization during procedures
- **Remote Mentoring**: Expert guidance from distant locations
- **Performance Analytics**: Objective skill assessment

## Competency-Based Education

### Milestones and Entrustable Professional Activities (EPAs)
Modern training emphasizes:
- **Specific Competencies**: Defined skills and knowledge areas
- **Observable Behaviors**: Measurable performance indicators
- **Progressive Achievement**: Structured advancement through levels
- **Outcome-Based Assessment**: Focus on competency attainment

### Assessment Methods
- **Direct Observation**: Structured evaluation during procedures
- **Portfolio Development**: Comprehensive case documentation
- **Multi-Source Feedback**: Input from multiple team members
- **Standardized Examinations**: Consistent evaluation criteria

## Technology Integration

### Surgical Planning Software
- **3D Visualization**: Advanced case preparation
- **Trajectory Planning**: Optimal surgical approaches
- **Risk Assessment**: Predicting potential complications
- **Outcome Prediction**: Modeling expected results

### Intraoperative Technology Training
- **Navigation Systems**: Real-time surgical guidance
- **Robotic Surgery**: Next-generation surgical techniques
- **Advanced Imaging**: Intraoperative MRI and CT
- **Neurophysiological Monitoring**: Real-time brain function assessment

## Global Training Initiatives

### International Exchange Programs
- **Knowledge Sharing**: Cross-cultural surgical experiences
- **Resource Optimization**: Leveraging global expertise
- **Standardization Efforts**: Consistent training worldwide
- **Collaborative Research**: Multi-institutional projects

### Telemedicine and Remote Learning
- **Virtual Conferences**: Accessible continuing education
- **Remote Surgery Observation**: Learning from distant experts
- **Online Case Discussions**: Collaborative problem-solving
- **Digital Libraries**: Comprehensive educational resources

## Subspecialty Training Evolution

### Pediatric Neurosurgery
- **Developmental Considerations**: Age-specific training modules
- **Family Communication**: Specialized counseling skills
- **Ethical Training**: Complex decision-making scenarios
- **Long-term Outcome Focus**: Developmental impact assessment

### Neuro-oncology Training
- **Multidisciplinary Approach**: Team-based care models
- **Molecular Understanding**: Genetic and biological factors
- **Clinical Trials**: Research methodology and ethics
- **Palliative Care**: End-of-life considerations

### Vascular Neurosurgery
- **Endovascular Techniques**: Minimally invasive approaches
- **Advanced Imaging**: Sophisticated diagnostic methods
- **Emergency Management**: Time-critical decision making
- **Microsurgical Skills**: Enhanced dexterity training

## Research Integration

### Translational Research Training
- **Basic Science Foundation**: Laboratory research experience
- **Clinical Application**: Bench-to-bedside translation
- **Data Analysis**: Statistical and computational skills
- **Publication Skills**: Scientific writing and presentation

### Innovation and Entrepreneurship
- **Technology Development**: Creating new surgical tools
- **Intellectual Property**: Patent and licensing understanding
- **Business Principles**: Healthcare economics and management
- **Leadership Development**: Administrative and management skills

## Challenges and Solutions

### Work-Hour Restrictions
Impact on training:
- **Reduced Case Exposure**: Fewer surgical opportunities
- **Fragmented Learning**: Interrupted educational experiences
- **Compensation Strategies**: Simulation and accelerated learning

### Patient Safety Requirements
Balancing education and safety:
- **Graduated Responsibility**: Structured progression of autonomy
- **Supervision Standards**: Appropriate oversight levels
- **Quality Metrics**: Monitoring educational outcomes
- **Patient Communication**: Transparency about training involvement

## Assessment and Feedback

### Objective Performance Metrics
- **Surgical Skill Assessment**: Standardized evaluation tools
- **Knowledge Testing**: Comprehensive examination systems
- **Professional Behavior**: Communication and teamwork skills
- **Continuous Improvement**: Regular feedback and adjustment

### Technology-Enhanced Assessment
- **Video Analysis**: Detailed surgical technique review
- **Motion Tracking**: Objective skill measurement
- **Eye Tracking**: Attention and focus assessment
- **Physiological Monitoring**: Stress and performance correlation

## Future Directions

### Artificial Intelligence in Training
- **Personalized Learning**: AI-adapted curricula
- **Performance Prediction**: Identifying struggling trainees
- **Optimal Scheduling**: Efficient case allocation
- **Outcome Optimization**: Data-driven training improvements

### Advanced Simulation Technologies
- **Holographic Displays**: Next-generation visualization
- **Brain-Computer Interfaces**: Direct neural feedback
- **Nanotechnology**: Microscopic skill training
- **Quantum Computing**: Complex scenario modeling

## Global Perspectives

### Resource-Limited Settings
Training adaptations for different environments:
- **Local Pathology Focus**: Region-specific conditions
- **Resource Optimization**: Efficient use of available tools
- **Capacity Building**: Training local trainers
- **Sustainable Programs**: Long-term educational sustainability

### Cultural Considerations
- **Communication Styles**: Culturally appropriate patient interaction
- **Ethical Variations**: Regional ethical considerations
- **Healthcare Systems**: Understanding local medical infrastructure
- **Language Skills**: Effective multilingual communication

## Conclusion

The evolution of neurosurgical training represents a fundamental shift toward more efficient, safe, and comprehensive education. By combining traditional mentorship with cutting-edge technology, we can prepare the next generation of neurosurgeons to meet the challenges of increasingly complex medical care.

This transformation ensures that future neurosurgeons will be equipped not only with technical skills but also with the critical thinking, communication abilities, and adaptability necessary for lifelong learning and professional growth in this rapidly evolving field.

The goal remains unchanged: to train competent, compassionate neurosurgeons who can provide the highest quality care to patients while advancing the field through research, innovation, and teaching.`,
    author: 'Dr. Ishan Perera',
    publishedAt: '2024-04-22',
    readingTime: '11 min read',
    category: 'Medical Education',
    tags: ['Training', 'Education', 'Technology', 'Simulation'],
    featured: false
  }
]

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find(p => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id && (
      p.category === post.category || 
      p.tags.some(tag => post.tags.includes(tag))
    ))
    .slice(0, 3)

  const formatContent = (content: string) => {
    return content.split('\n').map((paragraph, index) => {
      if (paragraph.startsWith('## ')) {
        return <h2 key={index} className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">{paragraph.replace('## ', '')}</h2>
      } else if (paragraph.startsWith('### ')) {
        return <h3 key={index} className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">{paragraph.replace('### ', '')}</h3>
      } else if (paragraph.startsWith('#### ')) {
        return <h4 key={index} className="text-lg font-semibold text-gray-900 dark:text-white mt-4 mb-2">{paragraph.replace('#### ', '')}</h4>
      } else if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
        return <p key={index} className="font-semibold text-gray-900 dark:text-white mb-3">{paragraph.replace(/\*\*/g, '')}</p>
      } else if (paragraph.startsWith('- ')) {
        return <li key={index} className="text-gray-700 dark:text-gray-300 mb-1 ml-4">{paragraph.replace('- ', '')}</li>
      } else if (paragraph.trim() === '') {
        return <div key={index} className="mb-4"></div>
      } else {
        return <p key={index} className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">{paragraph}</p>
      }
    })
  }

  return (
    <>
      <ReadingProgress />
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8">
          {/* Back Navigation */}
          <div className="mb-8">
            <Link href="/blog">
              <Button variant="ghost" className="hover:bg-gray-100 dark:hover:bg-gray-800">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </div>

          {/* Article Header */}
          <article className="max-w-4xl mx-auto">
            <header className="mb-12">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 mb-4">
                {post.category}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                {post.title}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                {post.excerpt}
              </p>
              
              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-300 mb-8">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.readingTime}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-sm">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Share Buttons */}
              <ShareButtons 
                url={`${window.location.origin}/blog/${post.slug}`}
                title={post.title}
                description={post.excerpt}
              />
            </header>

            {/* Article Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none mb-16">
              <div className="text-lg leading-relaxed">
                {formatContent(post.content)}
              </div>
            </div>

            {/* Author Bio */}
            <Card className="mb-16 dark:bg-gray-800 border-0 shadow-lg">
              <div className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    IP
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {post.author}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      Dr. Ishan Perera is a board-certified neurosurgeon specializing in minimally invasive brain and spine surgery. 
                      With over a decade of experience, he combines clinical expertise with a passion for advancing neurosurgical 
                      techniques through research and education.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Related Articles</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {relatedPosts.map((relatedPost) => (
                    <Card key={relatedPost.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300 dark:bg-gray-800">
                      <div className="p-6">
                        <Badge variant="secondary" className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 mb-4">
                          {relatedPost.category}
                        </Badge>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          <Link href={`/blog/${relatedPost.slug}`}>
                            {relatedPost.title}
                          </Link>
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed line-clamp-3">
                          {relatedPost.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                          <span>{formatDate(relatedPost.publishedAt)}</span>
                          <span>{relatedPost.readingTime}</span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            )}
          </article>
        </div>
      </div>
    </>
  )
}