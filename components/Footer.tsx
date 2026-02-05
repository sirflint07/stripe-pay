// components/footer.tsx
"use client"

import Link from 'next/link'
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin,
  BookOpen,
  Users,
  Award,
  Globe,
  GraduationCap
} from 'lucide-react'
import { motion } from 'framer-motion'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    courses: [
      { name: 'Web Development', href: '/courses/web-development' },
      { name: 'Data Science', href: '/courses/data-science' },
      { name: 'UI/UX Design', href: '/courses/ui-ux-design' },
      { name: 'Business Analytics', href: '/courses/business-analytics' },
      { name: 'Mobile Development', href: '/courses/mobile-development' },
      { name: 'Cloud Computing', href: '/courses/cloud-computing' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
      { name: 'Blog', href: '/blog' },
      { name: 'Affiliate Program', href: '/affiliate' },
      { name: 'Contact Us', href: '/contact' },
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'FAQ', href: '/faq' },
      { name: 'System Requirements', href: '/requirements' },
      { name: 'Accessibility', href: '/accessibility' },
      { name: 'Refund Policy', href: '/refund-policy' },
      { name: 'Terms of Service', href: '/terms' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'GDPR Compliance', href: '/gdpr' },
      { name: 'Security', href: '/security' },
      { name: 'Sitemap', href: '/sitemap' },
    ],
  }

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/coursekingdom', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com/coursekingdom', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com/coursekingdom', label: 'Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com/company/coursekingdom', label: 'LinkedIn' },
    { icon: Youtube, href: 'https://youtube.com/coursekingdom', label: 'YouTube' },
  ]

  const contactInfo = [
    { icon: Mail, text: 'support@coursekingdom.com', href: 'mailto:support@coursekingdom.com' },
    { icon: Phone, text: '+1 (555) 123-4567', href: 'tel:+15551234567' },
    { icon: MapPin, text: '123 Learning St, Education City, EC 10101', href: 'https://maps.google.com' },
  ]

  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      
      <div className="container w-[88vw] md:w-[90vw] mx-auto px-4 py-12 lg:py-16">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={footerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12"
        >
          
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  CourseKingdom
                </h2>
                <p className="text-sm text-gray-400">Learn Without Limits</p>
              </div>
            </Link>
            
            <p className="text-gray-400 mb-6 max-w-md">
              Empowering learners worldwide with high-quality courses, expert instructors, 
              and flexible learning paths to help you achieve your goals.
            </p>
            
            
            <div className="space-y-3 mb-6">
              {contactInfo.map((contact, index) => (
                <motion.a
                  key={index}
                  variants={itemVariants}
                  href={contact.href}
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <contact.icon className="h-5 w-5" />
                  <span>{contact.text}</span>
                </motion.a>
              ))}
            </div>
            
            
            <motion.div variants={itemVariants} className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 hover:bg-gray-700 p-2 rounded-lg transition-all duration-300 hover:scale-110 group"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5 text-gray-400 group-hover:text-white" />
                </a>
              ))}
            </motion.div>
          </motion.div>

         
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Courses
            </h3>
            <ul className="space-y-3">
              {footerLinks.courses.map((link, index) => (
                <motion.li 
                  key={index} 
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link 
                    href={link.href} 
                    className="text-gray-400 hover:text-white transition-colors duration-200 block"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Users className="h-5 w-5" />
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <motion.li 
                  key={index} 
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link 
                    href={link.href} 
                    className="text-gray-400 hover:text-white transition-colors duration-200 block"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Award className="h-5 w-5" />
              Support
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <motion.li 
                  key={index} 
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link 
                    href={link.href} 
                    className="text-gray-400 hover:text-white transition-colors duration-200 block"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Trust Badges Section */}
        <motion.div 
          variants={itemVariants}
          className="mt-12 pt-8 border-t border-gray-800"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h4 className="text-lg font-semibold text-white mb-2">Trusted By</h4>
              <p className="text-sm text-gray-400">Over 100,000+ learners worldwide</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg">
                <Globe className="h-5 w-5 text-blue-400" />
                <span className="text-sm">Global Community</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg">
                <Award className="h-5 w-5 text-yellow-400" />
                <span className="text-sm">Certified Courses</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg">
                <Users className="h-5 w-5 text-green-400" />
                <span className="text-sm">Expert Instructors</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      
      <div className="bg-gray-950 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-500 text-sm">
                &copy; {currentYear} CourseKingdom. All rights reserved.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6">
              {footerLinks.legal.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-gray-500 hover:text-gray-300 text-sm transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-gray-500 text-sm">
                Made with ❤️ for learners worldwide
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer