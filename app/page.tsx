import { Star, Check, TrendingUp, Shield, Zap, ChevronDown, Phone, Mail, Heart, Eye, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { LandingHero } from "@/components/landing-hero"
import Link from "next/link"
// OpenDashboardButton is now handled in layout.tsx via DashboardButtonWrapper
// ElevenLabs AI conversation is now handled by FloatingAiButton in layout.tsx

export default function Home() {
  const trendingInfluencers = [
    {
      name: "Sarah Chen",
      flag: "🇺🇸",
      followers: "2.4M",
      category: "Beauty",
      authenticity: 94,
      avatar: "SC",
      gradient: "from-pink-400 to-purple-600",
    },
    {
      name: "Alex Rodriguez",
      flag: "🇪🇸",
      followers: "1.8M",
      category: "Tech",
      authenticity: 91,
      avatar: "AR",
      gradient: "from-blue-400 to-cyan-600",
    },
    {
      name: "Priya Sharma",
      flag: "🇮🇳",
      followers: "3.2M",
      category: "Lifestyle",
      authenticity: 88,
      avatar: "PS",
      gradient: "from-green-400 to-emerald-600",
    },
    {
      name: "Marcus Johnson",
      flag: "🇬🇧",
      followers: "1.5M",
      category: "Fitness",
      authenticity: 92,
      avatar: "MJ",
      gradient: "from-orange-400 to-red-600",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Landing Hero Section */}
      <LandingHero />
      {/* Trending Influencers Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Trending Influencers</h2>
            <p className="text-xl md:text-2xl font-semibold text-gray-800 max-w-3xl mx-auto leading-relaxed">
              Discover the most engaging creators in your niche
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {trendingInfluencers.map((influencer, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-8 hover:scale-105 cursor-pointer border border-gray-100 hover:border-[#5A31F4]/20"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#5A31F4]/10 to-[#942FFF]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl"></div>

                <div className="relative z-10">
                  {/* Profile Section */}
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={`w-16 h-16 rounded-full bg-gradient-to-r ${influencer.gradient} flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      {influencer.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900 group-hover:text-[#5A31F4] transition-colors duration-300">
                          {influencer.name}
                        </h3>
                        <span className="text-lg">{influencer.flag}</span>
                      </div>
                      <p className="text-gray-600 font-medium">{influencer.followers} followers</p>
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="mb-4">
                    <Badge className="bg-gradient-to-r from-[#5A31F4] to-[#942FFF] text-white border-0 group-hover:scale-105 transition-transform duration-300">
                      {influencer.category}
                    </Badge>
                  </div>

                  {/* Authenticity Score */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Authenticity Score</span>
                      <span className="text-lg font-bold text-gray-900">{influencer.authenticity}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#5A31F4] to-[#942FFF] rounded-full transition-all duration-1000 group-hover:animate-pulse"
                        style={{ width: `${influencer.authenticity}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-gray-200 hover:border-[#5A31F4] hover:text-[#5A31F4] transition-all duration-300 hover:scale-105 hover:shadow-md"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      AI Call
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-gray-200 hover:border-[#942FFF] hover:text-[#942FFF] transition-all duration-300 hover:scale-105 hover:shadow-md"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      AI Mail
                    </Button>
                  </div>

                  {/* Hover overlay with additional info */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#5A31F4]/95 to-[#942FFF]/95 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                    <div className="text-center text-white p-4">
                      <div className="flex justify-center gap-6 mb-4">
                        <div className="text-center">
                          <Heart className="h-6 w-6 mx-auto mb-1" />
                          <div className="text-sm font-medium">98.2K</div>
                        </div>
                        <div className="text-center">
                          <Eye className="h-6 w-6 mx-auto mb-1" />
                          <div className="text-sm font-medium">2.1M</div>
                        </div>
                        <div className="text-center">
                          <MessageCircle className="h-6 w-6 mx-auto mb-1" />
                          <div className="text-sm font-medium">15.3K</div>
                        </div>
                      </div>
                      <Link href="/influencers">
                        <Button className="bg-white text-[#5A31F4] hover:bg-gray-100 transition-all duration-300 hover:scale-105">
                          View Profile
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="bg-gradient-to-b from-white to-gray-50/50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose InfluAI?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful AI-driven tools to find, analyze, and connect with the perfect influencers for your brand.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "AI-Powered Search",
                description: "Find influencers instantly using natural language queries and advanced AI algorithms.",
                color: "from-yellow-400 to-orange-500",
              },
              {
                icon: Shield,
                title: "Verified Profiles",
                description: "All influencer profiles are verified and updated with real-time engagement metrics.",
                color: "from-green-400 to-emerald-500",
              },
              {
                icon: TrendingUp,
                title: "Analytics Dashboard",
                description: "Get detailed insights on reach, engagement, and ROI for data-driven decisions.",
                color: "from-blue-400 to-purple-500",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-4 hover:scale-105 cursor-pointer group relative overflow-hidden"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#5A31F4]/5 to-[#942FFF]/5 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <CardHeader className="text-center pb-4 relative z-10">
                  <div
                    className={`mx-auto h-16 w-16 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg`}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold group-hover:text-[#5A31F4] transition-colors duration-300">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-gray-600 text-center">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* Reviews Section */}
      <section id="reviews" className="py-20 bg-gradient-to-b from-gray-50/50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-600">Trusted by thousands of brands and marketers worldwide</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Marketing Director at TechCorp",
                content:
                  "InfluAI revolutionized our influencer marketing strategy. We found perfect creators in minutes instead of weeks!",
                rating: 5,
                avatar: "SJ",
                gradient: "from-pink-400 to-purple-600",
              },
              {
                name: "Mike Chen",
                role: "Brand Manager at StyleCo",
                content:
                  "The AI search is incredibly accurate. It understands exactly what we're looking for and delivers amazing results.",
                rating: 5,
                avatar: "MC",
                gradient: "from-blue-400 to-cyan-600",
              },
              {
                name: "Emily Rodriguez",
                role: "Social Media Manager",
                content:
                  "Best investment we've made for our marketing team. The analytics and insights are game-changing.",
                rating: 5,
                avatar: "ER",
                gradient: "from-green-400 to-emerald-600",
              },
            ].map((review, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-4 hover:scale-105 cursor-pointer group relative overflow-hidden"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#5A31F4]/5 to-[#942FFF]/5 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <CardContent className="p-6 relative z-10">
                  <div className="flex mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-current hover:scale-125 transition-transform duration-300"
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic group-hover:text-gray-900 transition-colors duration-300">
                    "{review.content}"
                  </p>
                  <div className="flex items-center">
                    <div
                      className={`h-12 w-12 rounded-full bg-gradient-to-r ${review.gradient} flex items-center justify-center text-white font-bold mr-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      {review.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 group-hover:text-[#5A31F4] transition-colors duration-300">
                        {review.name}
                      </div>
                      <div className="text-sm text-gray-600">{review.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* Pricing Section */}
      <section id="pricing" className="bg-gradient-to-b from-white to-gray-50/50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600">Choose the perfect plan for your business needs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Starter",
                price: "$29",
                period: "/month",
                description: "Perfect for small businesses and startups",
                features: [
                  "Up to 50 searches per month",
                  "Basic influencer profiles",
                  "Email support",
                  "Standard analytics",
                ],
                popular: false,
              },
              {
                name: "Professional",
                price: "$99",
                period: "/month",
                description: "Ideal for growing marketing teams",
                features: [
                  "Unlimited searches",
                  "Advanced AI filtering",
                  "Priority support",
                  "Detailed analytics",
                  "Campaign tracking",
                  "Team collaboration",
                ],
                popular: true,
              },
              {
                name: "Enterprise",
                price: "$299",
                period: "/month",
                description: "For large organizations and agencies",
                features: [
                  "Everything in Professional",
                  "Custom AI models",
                  "Dedicated account manager",
                  "API access",
                  "White-label options",
                  "Advanced integrations",
                ],
                popular: false,
              },
            ].map((plan, index) => (
              <Card
                key={index}
                className={`relative border-0 shadow-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-4 cursor-pointer group overflow-hidden ${plan.popular ? "ring-2 ring-[#5A31F4] scale-105" : "hover:scale-105"}`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#5A31F4]/5 to-[#942FFF]/5 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                    <Badge className="bg-gradient-to-r from-[#5A31F4] to-[#942FFF] text-white border-0 px-4 py-1 animate-bounce-gentle">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-4 relative z-10">
                  <CardTitle className="text-2xl font-bold group-hover:text-[#5A31F4] transition-colors duration-300">
                    {plan.name}
                  </CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900 group-hover:bg-gradient-to-r group-hover:from-[#5A31F4] group-hover:to-[#942FFF] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                      {plan.price}
                    </span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 relative z-10">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center group/item">
                        <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300" />
                        <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full mt-6 transition-all duration-500 hover:shadow-lg hover:scale-105 ${
                      plan.popular
                        ? "bg-gradient-to-r from-[#5A31F4] to-[#942FFF] hover:opacity-90"
                        : "bg-gray-900 hover:bg-gradient-to-r hover:from-[#5A31F4] hover:to-[#942FFF]"
                    }`}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* FAQs Section */}
      <section id="faqs" className="py-20 bg-gradient-to-b from-gray-50/50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Everything you need to know about InfluAI</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                question: "How does the AI search work?",
                answer:
                  "Our AI uses natural language processing and machine learning to understand your search queries and match them with the most relevant influencers based on content, audience, engagement, and other key metrics.",
              },
              {
                question: "Can I try InfluAI for free?",
                answer:
                  "Yes! We offer a 14-day free trial with access to all features. No credit card required to get started.",
              },
              {
                question: "How accurate are the influencer metrics?",
                answer:
                  "We update our database in real-time and verify all metrics through multiple data sources. Our accuracy rate is over 95% for engagement and follower data.",
              },
              {
                question: "Do you support international influencers?",
                answer:
                  "Our platform includes influencers from over 150 countries and supports content in 50+ languages.",
              },
              {
                question: "Can I export influencer data?",
                answer:
                  "Yes, all plans include data export functionality. You can export influencer profiles, contact information, and analytics in CSV or PDF format.",
              },
              {
                question: "What kind of support do you offer?",
                answer:
                  "We provide email support for all users, priority support for Professional plans, and dedicated account managers for Enterprise customers.",
              },
            ].map((faq, index) => (
              <Collapsible key={index}>
                <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg bg-white p-6 text-left hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-md border border-gray-100 hover:border-[#5A31F4]/20 group">
                  <span className="font-semibold text-gray-900 group-hover:text-[#5A31F4] transition-colors duration-300">
                    {faq.question}
                  </span>
                  <ChevronDown className="h-5 w-5 text-gray-500 transition-transform duration-300 ui-open:rotate-180 group-hover:text-[#5A31F4]" />
                </CollapsibleTrigger>
                <CollapsibleContent className="px-6 pb-6 bg-white border-x border-b border-gray-100 rounded-b-lg">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section id="contact" className="bg-gradient-to-r from-[#5A31F4] to-[#942FFF] py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of brands already using InfluAI to discover and connect with top influencers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-[#5A31F4] hover:bg-gray-100 transition-all duration-500 hover:shadow-2xl hover:scale-105 transform"
            >
              Start Free Trial
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#5A31F4] transition-all duration-500 hover:scale-105"
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-[#5A31F4] to-[#942FFF] bg-clip-text text-transparent mb-4">
                InfluAI
              </div>
              <p className="text-gray-400">The future of influencer discovery, powered by AI.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    API
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 InfluAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
      {/* OpenDashboardButton is now handled by DashboardButtonWrapper */}
    </div>
  )
}
