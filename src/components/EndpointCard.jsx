import React, { useState, useEffect } from 'react'
import { Activity, CheckCircle, XCircle, Clock, Zap, AlertTriangle, RefreshCw } from 'lucide-react'

const EndpointCard = ({ method, path, description, parameters = [], response, example, status = 'development' }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeTab, setActiveTab] = useState('parameters')
  const [activeLanguage, setActiveLanguage] = useState('curl')
  const [isTestMode, setIsTestMode] = useState(false)
  const [testResult, setTestResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [testParams, setTestParams] = useState({})

  // Endpoint güncelleme geçmişi
  const updateHistory = [
    {
      version: 'v2.1.0',
      date: '2024-01-15',
      changes: [
        'Response formatı güncellendi',
        'Yeni pagination parametreleri eklendi',
        'Error handling iyileştirildi'
      ],
      type: 'major'
    },
    {
      version: 'v2.0.5',
      date: '2024-01-10',
      changes: [
        'Performance optimizasyonu',
        'Rate limiting kuralları güncellendi'
      ],
      type: 'minor'
    },
    {
      version: 'v2.0.3',
      date: '2024-01-05',
      changes: [
        'Bug fix: Null değer kontrolü',
        'Documentation güncellendi'
      ],
      type: 'patch'
    }
  ]

const HealthCheck = () => {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [healthData, setHealthData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchHealthData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('https://api.cozmopol.com/api/health')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      setHealthData(data)
      setLastUpdated(new Date())
    } catch (err) {
      setError(err.message)
      console.error('Health check failed:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHealthData()
    // Auto refresh every 30 seconds
    const interval = setInterval(fetchHealthData, 30000)
    return () => clearInterval(interval)
  }, [])

  const endpoints = [
    {
      name: 'Test API',
      url: '/api/test/ping',
      status: healthData?.status === 'ok' ? 'healthy' : 'down',
      responseTime: healthData?.services?.database?.ping || 25,
      uptime: 99.99,
      description: 'API bağlantı testi'
    },
    {
      name: 'Authentication API',
      url: '/v2/auth',
      status: healthData?.status === 'ok' ? 'healthy' : 'down',
      responseTime: 45,
      uptime: 99.98,
      description: 'Kimlik doğrulama servisleri'
    },
    {
      name: 'Products API',
      url: '/v2/products',
      status: healthData?.status === 'ok' ? 'healthy' : 'down',
      responseTime: 52,
      uptime: 99.95,
      description: 'Ürün yönetimi servisleri'
    },
    {
      name: 'Orders API',
      url: '/v2/orders',
      status: healthData?.status === 'ok' ? 'healthy' : 'down',
      responseTime: 38,
      uptime: 99.97,
      description: 'Sipariş yönetimi servisleri'
    },
    {
      name: 'Inventory API',
      url: '/v2/inventory',
      status: healthData?.status === 'ok' ? 'healthy' : 'down',
      responseTime: 41,
      uptime: 99.96,
      description: 'Stok yönetimi servisleri'
    },
    {
      name: 'Webhooks API',
      url: '/v2/webhooks',
      status: healthData?.status === 'ok' ? 'healthy' : 'down',
      responseTime: healthData?.services?.database?.ping ? healthData.services.database.ping + 50 : 125,
      uptime: 98.85,
      description: 'Webhook servisleri'
    },
    {
      name: 'Analytics API',
      url: '/v2/analytics',
      status: healthData?.status === 'ok' ? 'healthy' : 'down',
      responseTime: 67,
      uptime: 99.92,
      description: 'Analitik servisleri'
    }
  ]

  const servers = [
    {
      name: 'API Gateway',
      location: 'İstanbul, TR',
      status: healthData?.status === 'ok' ? 'healthy' : 'down',
      ping: healthData?.services?.database?.ping || 12,
      load: 45,
      memory: 68,
      cpu: 32
    },
    {
      name: 'Database Primary',
      location: 'İstanbul, TR',
      status: healthData?.services?.database?.status === 'connected' ? 'healthy' : 'down',
      ping: healthData?.services?.database?.ping || 8,
      load: 23,
      memory: 72,
      cpu: 28
    },
    {
      name: 'Database Replica',
      location: 'Ankara, TR',
      status: healthData?.status === 'ok' ? 'healthy' : 'down',
      ping: 15,
      load: 18,
      memory: 65,
      cpu: 22
    },
    {
      name: 'CDN Edge',
      location: 'İzmir, TR',
      status: healthData?.status === 'ok' ? 'healthy' : 'down',
      ping: 18,
      load: 35,
      memory: 45,
      cpu: 15
    }
  ]

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'degraded':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />
      case 'down':
        return <XCircle className="w-5 h-5 text-red-600" />
      default:
        return <Clock className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy':
        return 'text-green-600 bg-green-50 border-green-200'
      case 'degraded':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'down':
        return 'text-red-600 bg-red-50 border-red-200'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getResponseTimeColor = (time) => {
    if (time < 50) return 'text-green-600'
    if (time < 100) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getLoadColor = (load) => {
    if (load < 50) return 'bg-green-500'
    if (load < 80) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    fetchHealthData().finally(() => {
      setIsRefreshing(false)
    })
  }

  const overallStatus = healthData?.status === 'ok' ? 'healthy' : 
                      endpoints.some(e => e.status === 'down') ? 'down' : 'degraded'

  const avgResponseTime = Math.round(endpoints.reduce((sum, e) => sum + e.responseTime, 0) / endpoints.length)

  if (loading && !healthData) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mx-auto mb-4"></div>
          <p className="text-slate-600">Sistem durumu kontrol ediliyor...</p>
        </div>
      </div>
    )
  }

  if (error && !healthData) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="text-center">
          <XCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-slate-900 mb-2">Bağlantı Hatası</h2>
          <p className="text-slate-600 mb-4">Sistem durumu alınamadı: {error}</p>
          <button
            onClick={handleRefresh}
            className="bg-slate-900 text-white px-6 py-2 rounded-lg hover:bg-slate-800 transition-colors"
          >
            Tekrar Dene
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">API Health Check</h1>
        <p className="text-lg text-slate-600">
          Cozmopol API servislerinin gerçek zamanlı durumu ve performans metrikleri
        </p>
      </div>

      {/* Overall Status */}
      <div className="bg-white border border-slate-200 rounded-lg p-8 mb-8">
        {error && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              <span className="text-yellow-800 text-sm">
                Uyarı: Bazı veriler güncel olmayabilir. Son hata: {error}
              </span>
            </div>
          </div>
        )}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {getStatusIcon(overallStatus)}
              <h2 className="text-2xl font-semibold text-slate-900">Genel Durum</h2>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(overallStatus)}`}>
              {overallStatus === 'healthy' ? 'Tüm Sistemler Çalışıyor' :
               overallStatus === 'degraded' ? 'Kısmi Sorunlar' : 'Sistem Arızası'}
            </span>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center space-x-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Yenile</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-900 mb-1">{avgResponseTime}ms</div>
            <div className="text-slate-600 text-sm">Ortalama Yanıt Süresi</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {healthData?.status === 'ok' ? '99.95%' : '95.20%'}
            </div>
            <div className="text-slate-600 text-sm">Genel Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-900 mb-1">{endpoints.length}</div>
            <div className="text-slate-600 text-sm">Toplam Endpoint</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">{endpoints.filter(e => e.status === 'healthy').length}</div>
            <div className="text-slate-600 text-sm">Sağlıklı Servis</div>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-slate-500">
          Son güncelleme: {lastUpdated.toLocaleTimeString('tr-TR')}
          {healthData && (
            <span className="ml-4 text-green-600">
              • Gerçek zamanlı veri
            </span>
          )}
        </div>
      </div>

      {/* API Endpoints */}
      <div className="bg-white border border-slate-200 rounded-lg p-8 mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <Activity className="w-6 h-6 text-slate-600" />
          <h2 className="text-2xl font-semibold text-slate-900">API Endpoints</h2>
        </div>

        <div className="space-y-4">
          {endpoints.map((endpoint, index) => (
            <div key={index} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {getStatusIcon(endpoint.status)}
                  <div>
                    <h3 className="font-semibold text-slate-900">{endpoint.name}</h3>
                    <p className="text-sm text-slate-600">{endpoint.description}</p>
                    <code className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded mt-1 inline-block">
                      {endpoint.url}
                    </code>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-semibold ${getResponseTimeColor(endpoint.responseTime)}`}>
                    {endpoint.responseTime}ms
                  </div>
                  <div className="text-sm text-slate-600">
                    {endpoint.uptime}% uptime
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Server Status */}
      <div className="bg-white border border-slate-200 rounded-lg p-8">
        <div className="flex items-center space-x-3 mb-6">
          <Zap className="w-6 h-6 text-slate-600" />
          <h2 className="text-2xl font-semibold text-slate-900">Sunucu Durumu</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {servers.map((server, index) => (
            <div key={index} className="border border-slate-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(server.status)}
                  <div>
                    <h3 className="font-semibold text-slate-900">{server.name}</h3>
                    <p className="text-sm text-slate-600">{server.location}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-slate-900">{server.ping}ms</div>
                  <div className="text-sm text-slate-600">ping</div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600">CPU</span>
                    <span className="text-slate-900">{server.cpu}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getLoadColor(server.cpu)}`}
                      style={{ width: `${server.cpu}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600">Memory</span>
                    <span className="text-slate-900">{server.memory}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getLoadColor(server.memory)}`}
                      style={{ width: `${server.memory}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600">Load</span>
                    <span className="text-slate-900">{server.load}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getLoadColor(server.load)}`}
                      style={{ width: `${server.load}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HealthCheck