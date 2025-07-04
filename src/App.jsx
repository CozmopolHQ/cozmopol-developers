import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import QuickStart from './pages/QuickStart'
import Authentication from './pages/Authentication'
import Endpoints from './pages/Endpoints'
import Webhooks from './pages/Webhooks'
import SDKs from './pages/SDKs'
import HealthCheck from './pages/HealthCheck'
import Status from './pages/Status'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quickstart" element={<QuickStart />} />
        <Route path="/authentication" element={<Authentication />} />
        <Route path="/endpoints" element={<Endpoints />} />
        <Route path="/webhooks" element={<Webhooks />} />
        <Route path="/sdks" element={<SDKs />} />
        <Route path="/health" element={<HealthCheck />} />
        <Route path="/status" element={<Status />} />
      </Routes>
    </Layout>
  )
}

export default App