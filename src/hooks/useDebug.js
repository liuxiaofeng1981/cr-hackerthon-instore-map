import { useEffect } from 'react'

export default (componentName = '') => {
  useEffect(() => {
    console.log(`============== Mounted ${componentName} ============== at ${Date.now()}`)
    
    return () => {
      console.log(`============== Unmounted ${componentName} ============== at ${Date.now()}`)
    };
  })
}