export const mockLaggyResponse = (lagTime = 3000) => new Promise(resolve => setTimeout(resolve, lagTime))
