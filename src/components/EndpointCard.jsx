import React, { useState } from 'react'
import { ChevronDown, ChevronRight, CheckCircle, Clock, Wrench } from 'lucide-react'
import CodeBlock from './CodeBlock'

const EndpointCard = ({ method, path, description, parameters = [], response, example, status = 'development' }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeTab, setActiveTab] = useState('parameters')

  const methodColors = {
    GET: 'endpoint-get',
    POST: 'endpoint-post',
    PUT: 'endpoint-put',
    DELETE: 'endpoint-delete'
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'stable':
        return (
          <div className="flex items-center space-x-1 bg-green-50 text-green-700 px-2 py-1 rounded-full text-xs font-medium border border-green-200">
            <CheckCircle className="w-3 h-3" />
            <span>Stable</span>
          </div>
        )
      case 'beta':
        return (
          <div className="flex items-center space-x-1 bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium border border-blue-200">
            <Clock className="w-3 h-3" />
            <span>Beta</span>
          </div>
        )
      case 'development':
        return (
          <div className="flex items-center space-x-1 bg-orange-50 text-orange-700 px-2 py-1 rounded-full text-xs font-medium border border-orange-200">
            <Wrench className="w-3 h-3" />
            <span>Geliştiriliyor</span>
          </div>
        )
      default:
        return null
    }
  }
  return (
    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden hover:border-slate-300 hover:shadow-sm transition-all duration-200">
      <div 
        className="p-4 cursor-pointer hover:bg-slate-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className={`endpoint-badge ${methodColors[method]}`}>
              {method}
            </span>
            <code className="text-slate-900 font-mono text-sm">{path}</code>
            <div className="flex items-center space-x-2">
              <span className="text-slate-600 hidden sm:block">{description}</span>
              {getStatusBadge(status)}
            </div>
          </div>
          {isExpanded ? (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronRight className="w-4 h-4 text-slate-400" />
          )}
        </div>
        <div className="sm:hidden mt-2">
          <div className="flex items-center justify-between">
            <span className="text-slate-600 text-sm">{description}</span>
            {getStatusBadge(status)}
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-slate-200">
          <div className="flex border-b border-slate-200">
            <button
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'parameters'
                  ? 'text-slate-900 border-b-2 border-slate-900'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
              onClick={() => setActiveTab('parameters')}
            >
              Parametreler
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'response'
                  ? 'text-slate-900 border-b-2 border-slate-900'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
              onClick={() => setActiveTab('response')}
            >
              Yanıt
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'example'
                  ? 'text-slate-900 border-b-2 border-slate-900'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
              onClick={() => setActiveTab('example')}
            >
              Örnek
            </button>
          </div>

          <div className="p-4">
            {activeTab === 'parameters' && (
              <div className="space-y-4">
                {parameters.length > 0 ? (
                  parameters.map((param, index) => (
                    <div key={index} className="bg-slate-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2 flex-wrap gap-2">
                        <code className="text-sm font-mono bg-slate-900 text-slate-100 px-2 py-1 rounded">
                          {param.name}
                        </code>
                        <span className={param.required ? 'parameter-required' : 'parameter-optional'}>
                          {param.required ? 'gerekli' : 'opsiyonel'}
                        </span>
                        <span className="parameter-type">{param.type}</span>
                      </div>
                      <p className="text-slate-600 text-sm">{param.description}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-500">Bu endpoint için parametre bulunmuyor.</p>
                )}
              </div>
            )}

            {activeTab === 'response' && response && (
              <CodeBlock code={response} language="json" />
            )}

            {activeTab === 'example' && example && (
              <CodeBlock code={example} language="bash" />
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default EndpointCard