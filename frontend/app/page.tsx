import React from 'react';
import Link from 'next/link';
import {
  Menu,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Clock,
  Calendar,
  CheckCircle,
  GraduationCap
} from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-white text-gray-800 font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-blue-900">Excellence College</div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="#home" className="text-gray-700 hover:text-blue-900 transition-colors">Home</Link>
              <Link href="#about" className="text-gray-700 hover:text-blue-900 transition-colors">About Us</Link>
              <Link href="#courses" className="text-gray-700 hover:text-blue-900 transition-colors">Courses</Link>
              <Link href="#admissions" className="text-gray-700 hover:text-blue-900 transition-colors">Admissions</Link>
              <Link href="#faculty" className="text-gray-700 hover:text-blue-900 transition-colors">Faculty</Link>
              <Link href="#contact" className="text-gray-700 hover:text-blue-900 transition-colors">Contact</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-gray-700 hover:text-blue-900 font-medium">Login</Link>
              <button className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors">Apply Now</button>
              <button className="md:hidden">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section id="home" className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white overflow-hidden min-h-[600px] flex items-center">
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <img
            src="https://cdn.ailandingpage.ai/landingpage_io/user-generate/3fdaefd9-dac4-4130-85d4-98d3dd7702a3/3fdaefd9-dac4-4130-85d4-98d3dd7702a3/hero/hero-main-3d0b7a6af8c14c4a8b1f8164d859cfc8.png"
            alt="College campus with students"
            width="1200"
            height="675"
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
          />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">Empowering Students Through Quality Education</h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed">A trusted institution dedicated to academic excellence and holistic development.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="#admissions" className="inline-flex items-center justify-center px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg">
                  Apply Now
                </Link>
                <Link href="#courses" className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-900 font-semibold rounded-lg transition-all duration-200">
                  Explore Courses
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 lg:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">About Our College</h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">Our college is committed to providing quality education, experienced faculty, and a supportive learning environment. We focus on academic growth, practical knowledge, and student success.</p>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">With decades of excellence in education, we have built a reputation for nurturing talented individuals who go on to make meaningful contributions to society. Our comprehensive approach combines theoretical knowledge with practical application.</p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-900 mb-2">25+</div>
                    <div className="text-gray-600">Years of Excellence</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-900 mb-2">5000+</div>
                    <div className="text-gray-600">Alumni Network</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-900 mb-2">150+</div>
                    <div className="text-gray-600">Expert Faculty</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-900 mb-2">95%</div>
                    <div className="text-gray-600">Placement Rate</div>
                  </div>
                </div>
              </div>
              <div>
                <img
                  src="https://cdn.ailandingpage.ai/landingpage_io/user-generate/3fdaefd9-dac4-4130-85d4-98d3dd7702a3/3fdaefd9-dac4-4130-85d4-98d3dd7702a3/about/about-college-50be41ec3d7d4559bfb98a433ab85202.png"
                  alt="College building and campus life"
                  width="800"
                  height="600"
                  className="w-full rounded-2xl object-cover shadow-lg"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Courses Section */}
        <section id="courses" className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Programs</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">Choose from our comprehensive range of academic programs designed to meet diverse career aspirations and educational goals.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Undergraduate Programs",
                  description: "Comprehensive bachelor's degree programs across various disciplines with strong foundation in core subjects.",
                  img: "https://cdn.ailandingpage.ai/landingpage_io/user-generate/3fdaefd9-dac4-4130-85d4-98d3dd7702a3/3fdaefd9-dac4-4130-85d4-98d3dd7702a3/courses/courses-1-a3a9d96482a444a9bdff30282743e308.png"
                },
                {
                  title: "Postgraduate Programs",
                  description: "Advanced master's and doctoral programs for specialized knowledge and research opportunities.",
                  img: "https://cdn.ailandingpage.ai/landingpage_io/user-generate/3fdaefd9-dac4-4130-85d4-98d3dd7702a3/3fdaefd9-dac4-4130-85d4-98d3dd7702a3/courses/courses-2-7adb0daf791144788e493f9c5cfb6026.png"
                },
                {
                  title: "Diploma & Certification",
                  description: "Short-term diploma and certification courses for quick skill development and career enhancement.",
                  img: "https://cdn.ailandingpage.ai/landingpage_io/user-generate/3fdaefd9-dac4-4130-85d4-98d3dd7702a3/3fdaefd9-dac4-4130-85d4-98d3dd7702a3/courses/courses-3-f994f1114de14cfa9bde4c4fc005a177.png"
                },
                {
                  title: "Professional Skills",
                  description: "Industry-focused skill development courses designed to meet current market demands and trends.",
                  img: "https://cdn.ailandingpage.ai/landingpage_io/user-generate/3fdaefd9-dac4-4130-85d4-98d3dd7702a3/3fdaefd9-dac4-4130-85d4-98d3dd7702a3/courses/courses-4-c2547d50aa6845729d0866de59a4e0a5.png"
                }
              ].map((course, idx) => (
                <div key={idx} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-200">
                  <img
                    src={course.img}
                    alt={course.title}
                    width="400"
                    height="225"
                    className="w-full rounded-lg object-cover mb-4 h-48"
                    loading="lazy"
                  />
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{course.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{course.description}</p>
                  <a href="#" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
                    View Details
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Admissions Section */}
        <section id="admissions" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Admissions Open</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">Learn about eligibility, admission process, important dates, and how to apply.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Admission Process</h3>
                  <ul className="space-y-2 text-gray-600">
                    {["Submit online application with required documents", "Appear for entrance examination (if applicable)", "Attend counseling session and document verification", "Complete admission formalities and fee payment"].map((step, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Application Deadline</h4>
                    <p className="text-gray-600">March 31, 2024</p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Session Starts</h4>
                    <p className="text-gray-600">July 2024</p>
                  </div>
                </div>

                <div className="text-center lg:text-left">
                  <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    Apply for Admission
                  </button>
                </div>
              </div>

              <div>
                <img
                  src="https://cdn.ailandingpage.ai/landingpage_io/user-generate/3fdaefd9-dac4-4130-85d4-98d3dd7702a3/3fdaefd9-dac4-4130-85d4-98d3dd7702a3/admissions/admissions-main-dfbf92dde3f2488b8f697f1a1df2a458.png"
                  alt="College admissions office"
                  width="800"
                  height="600"
                  className="w-full rounded-2xl object-cover shadow-sm"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">Discover what makes our college the right choice for your educational journey</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "Qualified Faculty", desc: "Learn from industry experts and experienced educators.", img: "https://cdn.ailandingpage.ai/landingpage_io/user-generate/3fdaefd9-dac4-4130-85d4-98d3dd7702a3/3fdaefd9-dac4-4130-85d4-98d3dd7702a3/why-choose/benefits-1-b136778a70744db3ac49e02010f5a004.png" },
                { title: "Modern Infrastructure", desc: "State-of-the-art facilities including smart classrooms and labs.", img: "https://cdn.ailandingpage.ai/landingpage_io/user-generate/3fdaefd9-dac4-4130-85d4-98d3dd7702a3/3fdaefd9-dac4-4130-85d4-98d3dd7702a3/why-choose/benefits-2-fa67988aa04a4c8fbe5f37fe5582e97f.png" },
                { title: "Student-Centric", desc: "Personalized attention and interactive teaching methods.", img: "https://cdn.ailandingpage.ai/landingpage_io/user-generate/3fdaefd9-dac4-4130-85d4-98d3dd7702a3/3fdaefd9-dac4-4130-85d4-98d3dd7702a3/why-choose/benefits-3-bcca6d81a4a64f038594c06a9a07dd6d.png" },
                { title: "Career Guidance", desc: "Comprehensive counseling and placement assistance.", img: "https://cdn.ailandingpage.ai/landingpage_io/user-generate/3fdaefd9-dac4-4130-85d4-98d3dd7702a3/3fdaefd9-dac4-4130-85d4-98d3dd7702a3/why-choose/benefits-4-bd063c5c2cf140168c9e3813eb186f1d.png" },
                { title: "Safe Campus", desc: "A secure and welcoming environment that celebrates diversity.", img: "https://cdn.ailandingpage.ai/landingpage_io/user-generate/3fdaefd9-dac4-4130-85d4-98d3dd7702a3/3fdaefd9-dac4-4130-85d4-98d3dd7702a3/why-choose/benefits-5-643f2bc5faf7434c8d81e8481616a889.png" },
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="mb-6">
                    <img src={item.img} alt={item.title} width="400" height="400" className="w-full rounded-2xl object-cover shadow-sm h-64" loading="lazy" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">Get in touch with us for admissions, inquiries, or any questions</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">College Address</h3>
                    <p className="text-gray-600">123 Education Boulevard<br />Academic District, City 12345</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Phone className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone Number</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Mail className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Address</h3>
                    <p className="text-gray-600">info@excellencecollege.edu</p>
                  </div>
                </div>

                <div className="mt-8">
                  <img src="https://cdn.ailandingpage.ai/landingpage_io/user-generate/3fdaefd9-dac4-4130-85d4-98d3dd7702a3/3fdaefd9-dac4-4130-85d4-98d3dd7702a3/contact/contact-main-c7a8b0635a044bafbcb85faf25c53838.png" alt="College Campus" width="1200" height="675" className="w-full rounded-lg object-cover shadow-sm" loading="lazy" />
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Send us a Message</h3>
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input type="text" id="name" name="name" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter your full name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input type="email" id="email" name="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter your email address" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea id="message" name="message" rows={5} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter your message here..."></textarea>
                  </div>
                  <button type="submit" className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition duration-200">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="text-2xl font-bold mb-4">Excellence College</div>
              <p className="text-gray-300 mb-4">A trusted educational institution dedicated to academic excellence and holistic development of students.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="#about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="#courses" className="text-gray-300 hover:text-white transition-colors">Courses</Link></li>
                <li><Link href="#admissions" className="text-gray-300 hover:text-white transition-colors">Admissions</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center"><MapPin className="w-4 h-4 mr-2" /> 123 Education Street</li>
                <li className="flex items-center"><Phone className="w-4 h-4 mr-2" /> +1 (555) 123-4567</li>
                <li className="flex items-center"><Mail className="w-4 h-4 mr-2" /> info@excellencecollege.edu</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-300">
            <p>© 2024 Excellence College. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
