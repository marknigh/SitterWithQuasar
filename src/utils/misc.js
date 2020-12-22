
function convertTime (time) {
  let justTheHour = time.substring(0, 2)
  if (justTheHour > 12) {
    const twelveHour = justTheHour - 12
    const startTime = '0' + twelveHour + time.substring(2) + ' pm'
    return startTime
  } else {
    const startTime = time + ' am'
    return startTime
  }
}

export { convertTime }
