import React, { useState } from 'react'
import { ChevronDown, ChevronRight, Play, Clock } from 'lucide-react'
import CodeBlock from './CodeBlock'

const EndpointCard = ({ method, path, description, status, parameters, response, example }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeTab, setActiveTab] = useState('parameters')
  const [testResult, setTestResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const getMethodColor = (method) => {
    switch (method?.toUpperCase()) {
      case 'GET':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'POST':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'PUT':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'DELETE':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'PATCH':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'stable':
        return 'bg-green-100 text-green-800'
      case 'development':
        return 'bg-orange-100 text-orange-800'
      case 'deprecated':
        return 'bg-red-100 text-red-800'
      case 'beta':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleLiveTest = async () => {
    setIsLoading(true)
    try {
      const baseUrl = 'https://backend-integration-mauve.vercel.app'
      const fullUrl = `${baseUrl}${path}`
      
      const response = await fetch(fullUrl, {
        method: method?.toUpperCase() || 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()
      
      setTestResult({
        status: response.status,
        statusText: response.statusText,
        data: data,
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      setTestResult({
        status: 'error',
        statusText: 'Network Error',
        data: { error: error.message },
        timestamp: new Date().toISOString()
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
      <div 
        className="p-6 cursor-pointer hover:bg-slate-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getMethodColor(method)}`}>
              {method?.toUpperCase()}
            </span>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">{path}</h3>
              <p className="text-slate-600 text-sm">{description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
              {status === 'stable' ? '✅ Stable' : status === 'development' ? '🔧 Geliştiriliyor' : status}
            </span>
            {isExpanded ? (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            ) : (
              <ChevronRight className="w-5 h-5 text-slate-400" />
            )}
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-slate-200">
          <div className="flex border-b border-slate-200">
            <button
              className={`px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === 'parameters'
                  ? 'text-slate-900 border-b-2 border-slate-900 bg-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              onClick={() => setActiveTab('parameters')}
            >
              📋 Parametreler
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === 'response'
                  ? 'text-slate-900 border-b-2 border-slate-900 bg-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              onClick={() => setActiveTab('response')}
            >
              📤 Response
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === 'example'
                  ? 'text-slate-900 border-b-2 border-slate-900 bg-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              onClick={() => setActiveTab('example')}
            >
              💻 Örnek Kod
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === 'test'
                  ? 'text-slate-900 border-b-2 border-slate-900 bg-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              onClick={() => setActiveTab('test')}
            >
              🧪 Canlı Test
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'parameters' && (
              <div>
                <h4 className="text-lg font-semibold text-slate-900 mb-4">Parametreler</h4>
                {parameters && parameters.length > 0 ? (
                  <div className="space-y-4">
                    {parameters.map((param, index) => (
                      <div key={index} className="border border-slate-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <code className="text-sm font-mono bg-slate-100 px-2 py-1 rounded">
                              {param.name}
                            </code>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              param.required 
                                ? 'bg-red-100 text-red-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {param.required ? 'Zorunlu' : 'Opsiyonel'}
                            </span>
                          </div>
                          <span className="text-sm text-slate-600">{param.type}</span>
                        </div>
                        <p className="text-sm text-slate-600">{param.description}</p>
                        {param.example && (
                          <div className="mt-2">
                            <span className="text-xs text-slate-500">Örnek: </span>
                            <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">
                              {param.example}
                            </code>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-600">Bu endpoint için parametre bulunmuyor.</p>
                )}
              </div>
            )}

            {activeTab === 'response' && (
              <div>
                <h4 className="text-lg font-semibold text-slate-900 mb-4">Response Formatı</h4>
                {response ? (
                  <CodeBlock code={response} language="json" />
                ) : (
                  <p className="text-slate-600">Response örneği mevcut değil.</p>
                )}
              </div>
            )}

            {activeTab === 'example' && (
              <div>
                <h4 className="text-lg font-semibold text-slate-900 mb-4">Örnek Kullanım</h4>
                {example ? (
                  <CodeBlock code={example} language="bash" />
                ) : (
                  <p className="text-slate-600">Örnek kod mevcut değil.</p>
                )}
              </div>
            )}

            {activeTab === 'test' && (
              <div>
                <h4 className="text-lg font-semibold text-slate-900 mb-4">Canlı Test</h4>
                <div className="bg-slate-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded text-sm font-medium ${getMethodColor(method)}`}>
                        {method?.toUpperCase()}
                      </span>
                      <code className="text-sm bg-white px-2 py-1 rounded border">
                        https://backend-integration-mauve.vercel.app{path}
                      </code>
                    </div>
                    <button
                      onClick={handleLiveTest}
                      disabled={isLoading}
                      className="flex items-center space-x-2 bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-50"
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>Test Ediliyor...</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4" />
                          <span>Test Et</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {testResult && (
                  <div className="border border-slate-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="font-semibold text-slate-900">Test Sonucu</h5>
                      <div className="flex items-center space-x-2 text-sm text-slate-600">
                        <Clock className="w-4 h-4" />
                        <span>{new Date(testResult.timestamp).toLocaleTimeString('tr-TR')}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-slate-600">Status:</span>
                        <span className={`px-2 py-1 rounded text-sm font-medium ${
                          testResult.status === 200 || testResult.status === 'error' 
                            ? testResult.status === 200 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {testResult.status} {testResult.statusText}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm text-slate-600 block mb-2">Response:</span>
                        <CodeBlock 
                          code={JSON.stringify(testResult.data, null, 2)} 
                          language="json" 
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default EndpointCard