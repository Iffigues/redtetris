export const ALERT_POP = 'ALERT_POP'

// typeAlert can be: error, warning, info or successs
export const alert = (message, typeAlert) => {
  return {
    type: ALERT_POP,
    typeAlert,
    message
  }
}


