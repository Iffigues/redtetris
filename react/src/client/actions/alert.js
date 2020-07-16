export const ALERT_POP = 'ALERT_POP'

export const alert = (message, typeAlert) => {
  return {
    type: ALERT_POP,
    typeAlert,
    message
  }
}

