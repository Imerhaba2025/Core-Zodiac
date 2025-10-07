import Head from 'next/head'
import Link from 'next/link'
import { Sparkles, Zap, ShoppingBag, BarChart3, MessageCircle, Layout } from 'lucide-react'

export default function Home() {
  return (
    <>
      <Head>
        <title>Core-Zodiac - AI Landing Page Generator Platform</title>
        <meta name="description" content="Create stunning landing pages, manage products, and engage customers with AI-powered tools" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">Core-Zodiac</span>
              </div>
              <div className="flex space-x-4">
                <Link href="/login" className="text-gray-600 hover:text-gray-900">
                  Login
                </Link>
                <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Get Started
                </Link>
              </div>
            </div>
          </nav>
        </header>

        {/* Hero Section */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-5xl font-extrabold text-gray-900 sm:text-6xl md:text-7xl">
              AI-Powered
              <span className="text-blue-600"> Landing Page </span>
              Generator
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
              Create stunning landing pages, manage your online store, and engage customers with AI-powered chatbots - all in one platform.
            </p>
            <div className="mt-10 flex justify-center space-x-4">
              <Link href="/register" className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition">
                Start Free Trial
              </Link>
              <Link href="/demo" className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition">
                View Demo
              </Link>
            </div>
          </div>

          {/* Features */}
          <div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Layout className="h-12 w-12 text-blue-600" />}
              title="Landing Page Generator"
              description="Create professional landing pages in minutes with AI-powered templates and customization."
            />
            <FeatureCard
              icon={<MessageCircle className="h-12 w-12 text-blue-600" />}
              title="AI Sales Chatbot"
              description="Engage customers 24/7 with intelligent chatbots that understand and respond naturally."
            />
            <FeatureCard
              icon={<ShoppingBag className="h-12 w-12 text-blue-600" />}
              title="Mini Shop"
              description="Set up your online store quickly with inventory management and payment processing."
            />
            <FeatureCard
              icon={<BarChart3 className="h-12 w-12 text-blue-600" />}
              title="Admin Panel"
              description="Manage multiple tenants, users, and permissions from a centralized dashboard."
            />
            <FeatureCard
              icon={<Zap className="h-12 w-12 text-blue-600" />}
              title="Auto-Ads Generator"
              description="Generate marketing campaigns automatically with AI-powered content creation."
            />
            <FeatureCard
              icon={<Sparkles className="h-12 w-12 text-blue-600" />}
              title="AI Automation"
              description="Automate repetitive tasks and workflows with intelligent AI assistance."
            />
          </div>

          {/* Roles Section */}
          <div className="mt-24 bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              Built for Every Role
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <RoleCard role="Super Admin" description="Full platform control" />
              <RoleCard role="Admin" description="Manage vendors" />
              <RoleCard role="Vendor" description="Sell products" />
              <RoleCard role="Agent" description="Support customers" />
              <RoleCard role="Customer" description="Shop & engage" />
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white mt-24 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p>&copy; 2024 Core-Zodiac. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

function RoleCard({ role, description }: { role: string, description: string }) {
  return (
    <div className="text-center p-4 rounded-lg bg-blue-50">
      <h4 className="font-semibold text-gray-900">{role}</h4>
      <p className="text-sm text-gray-600 mt-1">{description}</p>
    </div>
  )
}
