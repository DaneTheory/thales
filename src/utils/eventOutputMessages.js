import envConfig from '../server/config/vars'


const startupMessageToDisplay = (env) => {
  let devMsg =
    ` ENV: ${envConfig.env}
   PORT: ${envConfig.port}
   URL: http://127.0.0.1:${envConfig.port}
   JWT_SECRET: ${envConfig.jwtSecret}
   JWT_EXPIRATION_INTERVAL: ${envConfig.jwtExpirationInterval} minutes
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
