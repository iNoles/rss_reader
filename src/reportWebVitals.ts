/* eslint-disable @typescript-eslint/no-floating-promises */
import { type ReportCallback } from 'web-vitals'

const reportWebVitals = () => (onPerfEntry: ReportCallback) => {
  if ((onPerfEntry != null) && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry)
      getFID(onPerfEntry)
      getFCP(onPerfEntry)
      getLCP(onPerfEntry)
      getTTFB(onPerfEntry)
    })
  }
}

export default reportWebVitals
