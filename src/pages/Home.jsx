import React from 'react'
import { BASE_URL } from '../config'
import { Link } from 'react-router-dom'
import { ArrowRight, Zap, Shield, Globe, Clock, Users, TrendingUp } from 'lucide-react'

const Home = () => {
  const stats = [
    { label: 'Uptime', value: '99.9%', icon: TrendingUp },
    { label: 'Response Time', value: '~50ms', icon: Clock },
    { label: 'Active Partners', value: '1000+', icon: Users },
  ]

  const features = [
    {
      icon: Zap,
      title: 'Hızlı Entegrasyon',
      description: 'RESTful API ile dakikalar içinde entegre olun'
    },
    {
      icon: Shield,
      title: 'Güvenli',
      description: 'Enterprise seviye güvenlik ve şifreleme'
    },
    {
      icon: Globe,
      title: 'Ölçeklenebilir',
      description: 'Yüksek trafikli uygulamalar için optimize edilmiş'
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Cozmopol Pazaryeri
              <span className="block gradient-text">API Dökümantasyonu</span>
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-3xl mx-auto">
              Güçlü ve esnek API'miz ile Cozmopol pazaryerine entegre olun.
              Ürün yönetimi, sipariş takibi, stok kontrolü ve daha fazlası için kapsamlı çözümler.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link
                to="/quickstart"
                className="btn-primary flex items-center justify-center space-x-2"
              >
                <span>Hızlı Başlangıç</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/endpoints"
                className="btn-secondary"
              >
                API Referansı
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-100 rounded-lg mb-4">
                    <stat.icon className="w-6 h-6 text-slate-600" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900 mb-2">{stat.value}</div>
                  <div className="text-slate-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Neden Cozmopol API?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Modern e-ticaret ihtiyaçlarınız için tasarlanmış, güvenilir ve performanslı API çözümleri
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-100 rounded-lg mb-6">
                  <feature.icon className="w-6 h-6 text-slate-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Start Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Dakikalar İçinde Başlayın
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Basit REST API çağrıları ile hemen entegrasyona başlayın.
                Kapsamlı dökümantasyon ve örneklerle her adımda yanınızdayız.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                    1
                  </div>
                  <span className="text-slate-700">API anahtarınızı alın</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                    2
                  </div>
                  <span className="text-slate-700">İlk API çağrısını yapın</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                    3
                  </div>
                  <span className="text-slate-700">Ürünlerinizi yükleyin</span>
                </div>
              </div>
              <Link
                to="/quickstart"
                className="btn-primary inline-flex items-center space-x-2"
              >
                <span>Detaylı Rehber</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="bg-slate-900 rounded-lg p-6 text-slate-100 font-mono text-sm overflow-x-auto">
              <div className="text-green-400 mb-2"># İlk API çağrınız</div>
              <div className="text-blue-400">curl</div>
              <div className="ml-2 text-slate-300">-X GET \</div>
              <div className="ml-2 text-yellow-400">{BASE_URL}/test/ping \</div>
              <div className="ml-2 text-slate-300">-H <span className="text-green-400">'Authorization: Bearer YOUR_API_KEY'</span> \</div>
              <div className="ml-2 text-slate-300">-H <span className="text-green-400">'Content-Type: application/json'</span></div>
              <div className="mt-4 text-green-400"># Yanıt</div>
              <div className="text-slate-300">{'{'}</div>
              <div className="ml-2 text-blue-400">"message"<span className="text-slate-300">:</span> <span className="text-green-400">"pong"</span></div>
              <div className="text-slate-300">{'}'}</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6">
            Entegrasyona Hazır mısınız?
          </h2>
          <p className="text-lg text-slate-300 mb-8">
            Binlerce partner zaten Cozmopol API'sini kullanıyor.
            Siz de pazaryeri entegrasyonunuzu bugün başlatın.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/quickstart"
              className="bg-white text-slate-900 px-6 py-3 rounded-lg font-medium hover:bg-slate-100 transition-colors"
            >
              Hemen Başla
            </Link>
            <a
              href="#"
              className="border border-slate-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors"
            >
              Partner Portal
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home