const serviceNameFormatValidation = (serviceNameValue) => {
  if (!/^[a-z]/.test(serviceNameValue)) {
    throw new Error('Service name improperly formatted. Must be lowercase. Check name key value package.json located in project root');
  }
};


export default serviceNameFormatValidation;
