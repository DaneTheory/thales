import fs from 'fs'


const SSLConfig = () => {
  const privateKey = fs.readFileSync('configs/ssl/private.key')
  const cert = fs.readFileSync( 'configs/ssl/valhalla.dev.crt' )
  return {
    key: privateKey,
    cert: cert,
    // requestCert: false,
    // rejectUnauthorized: false
  }
}


export default SSLConfig
