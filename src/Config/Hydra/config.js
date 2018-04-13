import DefaultAppConfig from '../../../DefaultAppConfig'


const config = DefaultAppConfig()

const HydraConfigOptions = {
  appServiceName:                                 config.get('name'),
  cluster:                                        true,                           // Default is FALSE
  environment:                                    config.get('env'),
  maxSockets:                                     500,
  // logPath:                                        '',                             // TODO: Create Logging Instance or Plugin
  serviceVersion:                               config.get('version'),
  server : {
                                                  bindToServiceIP: true           // Default is FALSE
  },
  hydra: {
    serviceName:                                  config.get('name'),
    serviceDescription:                           config.get('description'),
    serviceIP:                                    config.get('ip'),               // If left as '', defaults to machines IP address
    serviceDNS:                                   '',                             // Configure for use in Production Docker envorinments (i.e. Docker Swarm)
    servicePort:                                  config.get(`port`),             // If left blank, random PORT is chosen
    serviceType:                                  'express',
    serviceVersion:                               config.get('version'),
    serviceWorker:                                true,                           // TODO: Enbale this option?
    redis: {
        // url:                                   config.get('redisUrl'),         // URL key will be overidden if HOST, PORT, and/or DB are present
        host:                                     config.get('ip'),
        port:                                     config.get('redisPort'),
        db:                                       config.get('redisID'),
        // path:                                  config.get('redisSocketPath'),
        retry_strategy: {
           maxReconnectionPeriod:                 15,                             // TODO: Determine best value
           maxDelayBetweenReconnections:          5                               // TODO: Determine best value
        }
      },
      "plugins": {
        logger: {
          // serviceName: config.get('name'),
          toConsole: true,
          // noFile: true,
          logPath: `./logs/services/${config.get('name').toUpperCase()}/Hydra/RawEventDataLog.json`,
          // "elasticsearch": {
          //   "host": "localhost",
          //   "port": 9200,
          //   "index": "asgard-dev"
          // }
        }
      }
    }
  }


export default HydraConfigOptions
