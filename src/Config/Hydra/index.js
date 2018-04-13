import { HydraServiceFactory } from 'hydra-integration'

import DefaultAppConfig from '../../../DefaultAppConfig'


const config = DefaultAppConfig()

const HydraConfigOptions = {
  appServiceName:                                 config.get('name'),
  cluster:                                        true,                           // Default is FALSE
  environment:                                    config.get('env'),
  maxSockets:                                     500,
  logPath:                                        '',                             // TODO: Create Logging Instance or Plugin
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
      }
    }
  }

const HydraFactory = new HydraServiceFactory(HydraConfigOptions)

HydraFactory
  .on('hydra:initialized',
    hydra => {
      console.log(`${config.get('name')} SERVICE INSTANCE: INITITIALIZED`)
      // console.log(hydra)
      console.log(`____________________________________________________`)
    }
  )

HydraFactory
    .on('hydra:registered',
      info => {
        console.log(`${config.get('name')} SERVICE INSTANCE: REGISTERED`)
        // console.log(info)
        console.log(`____________________________________________________`)
      }
    )

HydraFactory
    .on('hydra:log',
      entry => {
        console.log(`${config.get('name')} SERVICE INSTANCE: LOG`)
        // console.log(entry)
        console.log(`____________________________________________________`)
      }
    )

HydraFactory
    .on('hydra:message',
      message => {
        console.log(`${config.get('name')} SERVICE INSTANCE: MESSAGE`)
        // console.log(message)
        console.log(`____________________________________________________`)
      }
    )

HydraFactory
    .on('hydra:beforeShutdown',
      hydra => {
        console.log(`${config.get('name')} SERVICE INSTANCE: SHUTDOWN DETECTED. INVOKE PRE-SHUTDOWN CMDS`)
        // console.log(hydra)
        console.log(`____________________________________________________`)
      }
    )

HydraFactory
    .on('hydra:afterShutdown',
      hydra => {
        console.log(`${config.get('name')} SERVICE INSTANCE: SHUTDOWN COMPLETE. INVOKE POST-SHUTDOWN CMDS`)
        // console.log(hydra)
        console.log(`____________________________________________________`)
      }
    )

HydraFactory
    .on('service:ready',
      (service, hydra) => {
        console.log(`${config.get('name')} SERVICE INSTANCE: SERVICE IS READY`)
        // console.log(service)
        // console.log(hydra)
        console.log(`____________________________________________________`)
      }
    )


export default HydraFactory
