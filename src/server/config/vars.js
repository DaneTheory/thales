import path from 'path'
import dotenv from 'dotenv-safe'


dotenv.load({
  path: path.join(__dirname, `../../../.env`),
  sample: path.join(__dirname, `../../../.env.example`),
})

const envConfig = {
  "serviceName": process.env.SERVICE_NAME,
  "env": process.env.NODE_ENV,
  "port": process.env.PORT,
  "jwtSecret": process.env.JWT_SECRET,
  "jwtExpirationInterval": process.env.JWT_EXPIRATION_MINUTES,
  "mongo": {
    "uri": process.env.NODE_ENV === 'test' ? process.env.MONGO_URI_TESTS : process.env.MONGO_URI,
  },
  "responseMetrics": {
    "port": process.env.RESPONSE_METRICS_PORT,
    "route": process.env.RESPONSE_METRICS_ROUTE,
    "url": process.env.RESPONSE_METRICS_URL
  },
  "realtimeRouteMonitor": {
    "port": process.env.REALTIME_ROUTER_MONITOR_PORT,
    "user": process.env.REALTIME_ROUTER_MONITOR_USER,
    "password": process.env.REALTIME_ROUTER_MONITOR_PASSWORD,
    "url": process.env.REALTIME_ROUTER_MONITOR_URL
  },
  "serviceInfoMonitor": {
    "url": process.env.SERVICE_INFO_URL
  },
  "serviceMetricsMonitor": {
    "url": process.env.SERVICE_METRICS_URL
  },
  "serviceStatsEndpoint": {
    "url": process.env.SERVICE_STATS_ENDPOINT
  },
  "socketIO": {
    "port": process.env.SOCKET_IO_PORT
  },
  "serviceStatisticsGUI": {
    "url": process.env.SERVICE_STATISTICS_GUI_URL
  },
  "servicePing": {
    "route": process.env.SERVICE_PING_ROUTE,
    "url": process.env.SERVICE_PING_URL
  },
  "logs": process.env.NODE_ENV === 'production' ? 'combined' : 'development',
}


export default envConfig
