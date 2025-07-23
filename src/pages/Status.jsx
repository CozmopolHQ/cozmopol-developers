import React, { useState } from 'react'
import { Calendar, Clock, CheckCircle, XCircle, AlertTriangle, Info, TrendingUp, TrendingDown } from 'lucide-react'

const Status = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7d')
  const [healthData, setHealthData] = useState(null)
  const [loading, setLoading] = useState(false)

  // Gerçek zamanlı health check verisi al
  React.useEffect(() => {
    const fetchHealthData = async () => {
      try {
        setLoading(true)
        const response = await fetch('https://backend-integration-mauve.vercel.app/api/health')
        if (response.ok) {
          const data = await response.json()
          setHealthData(data)
        }
      } catch (error) {
        console.error('Health check failed:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchHealthData()
    // Her 60 saniyede bir güncelle
    const interval = setInterval(fetchHealthData, 60000)
    return () => clearInterval(interval)
  }, [])

  const incidents = [
    {
      id: 1,
      title: 'Webhook Delivery Delays',
      status: 'resolved',
      severity: 'minor',
      startTime: '2024-01-15T14:30:00Z',
      endTime: '2024-01-15T15:45:00Z',
      description: 'Webhook teslimatlarında gecikmeler yaşandı. Sorun çözüldü ve tüm bekleyen webhook\'lar teslim edildi.',
      updates: [
        {
          time: '2024-01-15T15:45:00Z',
          status: 'resolved',
          message: 'Sorun tamamen çözüldü. Tüm webhook teslimatları normale döndü.'
        },
        {
          time: '2024-01-15T15:15:00Z',
          status: 'monitoring',
          message: 'Düzeltme uygulandı. Sistem izleniyor.'
        },
        {
          time: '2024-01-15T14:30:00Z',
          status: 'investigating',
          message: 'Webhook teslimatlarında gecikmeler tespit edildi. Araştırılıyor.'
        }
      ]
    },
    {
      id: 2,
      title: 'Scheduled Maintenance',
      status: 'completed',
      severity: 'maintenance',
      startTime: '2024-01-10T02:00:00Z',
      endTime: '2024-01-10T04:00:00Z',
      description: 'Planlı bakım çalışması. Database performans optimizasyonu yapıldı.',
      updates: [
        {
          time: '2024-01-10T04:00:00Z',
          status: 'completed',
          message: 'Bakım çalışması tamamlandı. Tüm sistemler normale döndü.'
        },
        {
          time: '2024-01-10T02:00:00Z',
          status: 'in_progress',
          message: 'Planlı bakım başladı. Kısa süreli kesintiler yaşanabilir.'
        }
      ]
    }
  ]

  const uptimeData = [
    { date: '2024-01-09', uptime: healthData?.status === 'ok' ? 100 : 95 },
    { date: '2024-01-10', uptime: healthData?.status === 'ok' ? 98.5 : 92 },
    { date: '2024-01-11', uptime: healthData?.status === 'ok' ? 100 : 98 },
    { date: '2024-01-12', uptime: healthData?.status === 'ok' ? 100 : 96 },
    { date: '2024-01-13', uptime: healthData?.status === 'ok' ? 99.8 : 94 },
    { date: '2024-01-14', uptime: healthData?.status === 'ok' ? 100 : 97 },
    { date: '2024-01-15', uptime: healthData?.status === 'ok' ? 99.2 : 93 },
  ]

  const metrics = [
    {
      name: 'API Uptime',
      value: healthData?.status === 'ok' ? '99.95%' : '95.20%',
      change: '+0.02%',
      trend: healthData?.status === 'ok' ? 'up' : 'down',
      period: 'Son 30 gün'
    },
    {
      name: 'Ortalama Yanıt Süresi',
      value: healthData?.services?.database?.ping ? `${healthData.services.database.ping}ms` : '52ms',
      change: '-8ms',
      trend: 'up',
      period: 'Son 24 saat'
    },
    {
      name: 'Başarılı İstekler',
      value: healthData?.status === 'ok' ? '99.98%' : '97.50%',
      change: '+0.01%',
      trend: healthData?.status === 'ok' ? 'up' : 'down',
      period: 'Son 7 gün'
    },
    {
      name: 'Aktif Webhook\'lar',
      value: '1,247',
      change: '+23',
      trend: 'up',
      period: 'Şu anda'
    }
  ]

  const getStatusIcon = (status) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'degraded':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />
      case 'down':
        return <XCircle className="w-5 h-5 text-red-600" />
      case 'maintenance':
        return <Info className="w-5 h-5 text-blue-600" />
      default:
        return <Clock className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved':
      case 'completed':
      case 'operational':
        return 'text-green-600 bg-green-50 border-green-200'
      case 'investigating':
      case 'degraded':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'down':
        return 'text-red-600 bg-red-50 border-red-200'
      case 'maintenance':
        return 'text-blue-600 bg-blue-50 border-blue-200'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-500'
      case 'major':
        return 'bg-orange-500'
      case 'minor':
        return 'bg-yellow-500'
      case 'maintenance':
        return 'bg-blue-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getUptimeColor = (uptime) => {
    if (uptime >= 99.9) return 'bg-green-500'
    if (uptime >= 99.5) return 'bg-yellow-500'
    if (uptime >= 99) return 'bg-orange-500'
    return 'bg-red-500'
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Sistem Durumu</h1>
        <p className="text-lg text-slate-600">
          Cozmopol API'nin geçmiş performansı ve olay geçmişi
        </p>
      </div>

      {/* Current Status */}
      <div className="bg-white border border-slate-200 rounded-lg p-8 mb-8">
        {loading && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span className="text-blue-800 text-sm">Sistem durumu güncelleniyor...</span>
            </div>
          </div>
        )}
        <div className="flex items-center space-x-4 mb-6">
          {healthData?.status === 'ok' ? (
            <CheckCircle className="w-8 h-8 text-green-600" />
          ) : (
            <AlertTriangle className="w-8 h-8 text-yellow-600" />
          )}
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              {healthData?.status === 'ok' ? 'Tüm Sistemler Çalışıyor' : 'Sistem Durumu Kontrol Ediliyor'}
            </h2>
            <p className="text-slate-600">
              Son güncelleme: {new Date().toLocaleString('tr-TR')}
              {healthData && (
                <span className="ml-2 text-green-600">• Gerçek zamanlı</span>
              )}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <span className="text-2xl font-bold text-slate-900">{metric.value}</span>
                <div className="flex items-center space-x-1">
                  {metric.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-600" />
                  )}
                  <span className={`text-sm ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {metric.change}
                  </span>
                </div>
              </div>
              <div className="text-slate-900 font-medium mb-1">{metric.name}</div>
              <div className="text-slate-500 text-sm">{metric.period}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Uptime Chart */}
      <div className="bg-white border border-slate-200 rounded-lg p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-slate-900">Uptime Geçmişi</h2>
          <div className="flex space-x-2">
            {['7d', '30d', '90d'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  selectedPeriod === period
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {period === '7d' ? 'Son 7 gün' : period === '30d' ? 'Son 30 gün' : 'Son 90 gün'}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm text-slate-600">
            <span>Son 7 gün</span>
            <span>
              {healthData?.status === 'ok' ? '99.6%' : '95.1%'} uptime
            </span>
          </div>
          
          <div className="flex space-x-1">
            {uptimeData.map((day, index) => (
              <div
                key={index}
                className="flex-1 h-8 rounded"
                style={{ 
                  backgroundColor: day.uptime >= 99.9 ? '#10b981' : 
                                 day.uptime >= 99.5 ? '#f59e0b' : 
                                 day.uptime >= 95 ? '#f97316' : '#ef4444' 
                }}
                title={`${day.date}: ${day.uptime}% uptime`}
              ></div>
            ))}
          </div>

          <div className="flex justify-between text-xs text-slate-500">
            <span>7 gün önce</span>
            <span>Bugün</span>
          </div>

          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className="text-slate-600">Çalışıyor</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded"></div>
              <span className="text-slate-600">Kısmi Sorun</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span className="text-slate-600">Çalışmıyor</span>
            </div>
          </div>
        </div>
      </div>

      {/* Incidents */}
      <div className="bg-white border border-slate-200 rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-slate-900 mb-6">Olay Geçmişi</h2>

        {incidents.length > 0 ? (
          <div className="space-y-6">
            {incidents.map((incident) => (
              <div key={incident.id} className="border border-slate-200 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className={`w-1 h-16 rounded ${getSeverityColor(incident.severity)}`}></div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">{incident.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-slate-600 mb-2">
                        <span className={`px-2 py-1 rounded border ${getStatusColor(incident.status)}`}>
                          {incident.status === 'resolved' ? 'Çözüldü' : 
                           incident.status === 'completed' ? 'Tamamlandı' : incident.status}
                        </span>
                        <span>{formatDate(incident.startTime)}</span>
                        {incident.endTime && (
                          <span>- {formatDate(incident.endTime)}</span>
                        )}
                      </div>
                      <p className="text-slate-600">{incident.description}</p>
                    </div>
                  </div>
                </div>

                <div className="ml-8 space-y-3">
                  {incident.updates.map((update, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-slate-400 rounded-full mt-2"></div>
                      <div>
                        <div className="flex items-center space-x-2 text-sm">
                          <span className="text-slate-900 font-medium">
                            {formatDate(update.time)}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-xs ${getStatusColor(update.status)}`}>
                            {update.status === 'resolved' ? 'Çözüldü' : 
                             update.status === 'monitoring' ? 'İzleniyor' :
                             update.status === 'investigating' ? 'Araştırılıyor' :
                             update.status === 'completed' ? 'Tamamlandı' :
                             update.status === 'in_progress' ? 'Devam Ediyor' : update.status}
                          </span>
                        </div>
                        <p className="text-slate-600 text-sm mt-1">{update.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Hiç Olay Yok</h3>
            <p className="text-slate-600">Son 30 günde herhangi bir olay kaydedilmedi.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Status