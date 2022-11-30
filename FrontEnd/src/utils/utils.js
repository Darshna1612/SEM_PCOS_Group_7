export function getTime(timeStamp) {
  let d = new Date(timeStamp).toString()
  let arr = d.split(' ')
  let month = arr[1]
  let day = arr[2]
  let year = arr[3]
  console.log(arr)
  return month + '/' + day + '/' + year
}