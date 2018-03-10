import envConfig from '../server/config/vars'


const startupMessageToDisplay = (env) => {
  let devMsg =
    ` SERVICE_NAME: ${envConfig.serviceName}
   ENV: ${envConfig.env}
   PORT: ${envConfig.port}
   SOCKET_IO_PORT: ${envConfig.socketIO.port}
   JWT_SECRET: ${envConfig.jwtSecret}
   JWT_EXPIRATION_INTERVAL: ${envConfig.jwtExpirationInterval} minutes
   URL: http://127.0.0.1:${envConfig.port}
   SERVICE_STATISTICS_GUI_URL: ${envConfig.serviceStatisticsGUI.url}
   SERVICE_INFO_URL: ${envConfig.serviceInfoMonitor.url}
   SERVICE_METRICS_URL: ${envConfig.serviceMetricsMonitor.url}
   REALTIME_ROUTER_MONITOR_URL: ${envConfig.realtimeRouteMonitor.url}
   RESPONSE_METRICS_URL: ${envConfig.responseMetrics.url}
   SERVICE_STATS_ENDPOINT: ${envConfig.serviceStatsEndpoint.url} ( curl http://127.0.0.1:3000/stats )
   SERVICE_PING_ENDPOINT: ${envConfig.servicePing.url} ( curl http://127.0.0.1:3000/ping )
   MONGODB_URI: ${Object.values(envConfig.mongo)}`
  let defaultMsg =
    ` ENV: ${envConfig.env}
   PORT: ${envConfig.port}`
  return env === 'development' ? devMsg : defaultMsg
}

const msgText =
  `________________________________________________________________________________________

  ----------------------
  *** SERVER STARTED ***
  ----------------------

  Application Info
  ============================================
  ${startupMessageToDisplay(envConfig.env)}
  ============================================

________________________________________________________________________________________`


export const onAppLaunchMessage = () => msgText
