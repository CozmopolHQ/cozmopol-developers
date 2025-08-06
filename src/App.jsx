import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import DocLayout from './components/DocLayout'
import Home from './pages/Home'
import QuickStart from './pages/QuickStart'
import Authentication from './pages/Authentication'
import Endpoints from './pages/Endpoints'
import Webhooks from './pages/Webhooks'
import SDKs from './pages/SDKs'
import HealthCheck from './pages/HealthCheck'
import Status from './pages/Status'
import IntegrationGuide from './pages/IntegrationGuide'
import ErrorCodes from './pages/ErrorCodes'
import PostmanCollections from './pages/PostmanCollections'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quickstart" element={<DocLayout><QuickStart /></DocLayout>} />
        <Route path="/authentication" element={<DocLayout><Authentication /></DocLayout>} />
        <Route path="/endpoints" element={<DocLayout><Endpoints /></DocLayout>} />
        <Route path="/webhooks" element={<DocLayout><Webhooks /></DocLayout>} />
        <Route path="/sdks" element={<DocLayout><SDKs /></DocLayout>} />
        <Route path="/health" element={<DocLayout><HealthCheck /></DocLayout>} />
        <Route path="/status" element={<DocLayout><Status /></DocLayout>} />
        <Route path="/integration-guide" element={<DocLayout><IntegrationGuide /></DocLayout>} />
        <Route path="/error-codes" element={<DocLayout><ErrorCodes /></DocLayout>} />
        <Route path="/postman" element={<DocLayout><PostmanCollections /></DocLayout>} />
      </Routes>
    </Layout>
  )
}

export default App