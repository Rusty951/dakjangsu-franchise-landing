import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import leadHandler from './api/leads.js'

const createVercelLikeResponse = (response) => ({
  setHeader(name, value) {
    response.setHeader(name, value)
  },
  status(statusCode) {
    response.statusCode = statusCode
    return this
  },
  json(body) {
    response.setHeader('Content-Type', 'application/json; charset=utf-8')
    response.end(JSON.stringify(body))
  },
  end(body = '') {
    response.end(body)
  },
})

const leadApiDevPlugin = () => ({
  name: 'dakjangsu-lead-api-dev',
  configureServer(server) {
    server.middlewares.use('/api/leads', async (request, response) => {
      try {
        await leadHandler(request, createVercelLikeResponse(response))
      } catch (error) {
        server.config.logger.error(error)
        response.statusCode = 500
        response.setHeader('Content-Type', 'application/json; charset=utf-8')
        response.end(JSON.stringify({ ok: false, message: '문의 접수 연결을 확인 중입니다.' }))
      }
    })
  },
})

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const serverEnv = loadEnv(mode, process.cwd(), '')

  Object.entries(serverEnv).forEach(([key, value]) => {
    if (process.env[key] === undefined) {
      process.env[key] = value
    }
  })

  return {
    plugins: [react(), leadApiDevPlugin()],
  }
})
