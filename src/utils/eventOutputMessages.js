import DefaultAppConfig from '../../DefaultAppConfig'
import envConfig from '../server/config/vars'


const config = DefaultAppConfig()

const startupMessageToDisplay = (env) => {
  let devMsg =
    ` SERVICE_NAME: ${config.get('name')}
   ENV: ${config.get('env')}
   PORT: ${config.get('port')}
   SOCKET_IO_PORT: ${config.get('socketIOPort')}
   JWT_SECRET: ${config.get('jwtSecret')}
   JWT_EXPIRATION_INTERVAL: ${config.get('jwtExpiration')} minutes
   URL: http://${config.get('ip')}:${config.get('port')}
   SERVICE_STATISTICS_GUI_URL: ${envConfig.serviceStatisticsGUI.url}
   SERVICE_INFO_URL: ${envConfig.serviceInfoMonitor.url}
   SERVICE_METRICS_URL: ${envConfig.serviceMetricsMonitor.url}
   REALTIME_ROUTER_MONITOR_URL: ${envConfig.realtimeRouteMonitor.url}
   RESPONSE_METRICS_URL: ${envConfig.responseMetrics.url}
   SERVICE_STATS_ENDPOINT: ${envConfig.serviceStatsEndpoint.url} ( curl http://127.0.0.1:3000/stats )
   SERVICE_PING_ENDPOINT: ${envConfig.servicePing.url} ( curl http://127.0.0.1:3000/ping )
   MONGODB_URI: ${config.get('dbUrl')}`
  let defaultMsg =
    ` ENV: ${config.get('env')}
   PORT: ${config.get('port')}`
  return env === 'development' ? devMsg : defaultMsg
}

const msgText =
  `________________________________________________________________________________________

  ----------------------
  *** SERVER STARTED ***
  ----------------------

  Application Info
  ============================================
  ${startupMessageToDisplay(config.get('env'))}
  ============================================

________________________________________________________________________________________`


export const onAppLaunchMessage = () => msgText
