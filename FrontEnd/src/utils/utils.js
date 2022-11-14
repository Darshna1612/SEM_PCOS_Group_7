export function getTime(timeStamp) {
  let d = new Date(timeStamp).toString()
  let arr = d.split(' ')
  let month = arr[0]
  let day = arr[1]
  let year = arr[2]
  // let time = arr[3]
  return month + '/' + day + '/' + year
}