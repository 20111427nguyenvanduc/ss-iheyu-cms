export const loadState = (stateName) => {
 try {
  const serialState = localStorage.getItem(stateName)
  if (serialState === null) {
   return undefined
  }
  return JSON.parse(serialState)
 } catch (err) {
  return undefined
 }
}

export const saveState = (stateName, state) => {
 try {
  const serialState = JSON.stringify(state)
  localStorage.setItem(stateName, serialState)
 } catch (err) {
  console.log(err)
 }
}
