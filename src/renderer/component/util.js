'use strict'

function nearM(a, b) {
  return absM(subM(a, b)) < 0.01
}

function subM(a, b) {
  return [
    a[0] - b[0],
    a[1] - b[1],
  ]
}

function absM(a) {
  return Math.sqrt(a[0]*a[0] + a[1]*a[1])
}

// a != b, a != c, b != c であること
function interiorArg(a, b, c) {
  const ba = absM(subM(a, b))
  const bc = absM(subM(c, b))
  const ac = absM(subM(c, a))
  return Math.acos((ba*ba+bc*bc-ac*ac)/(2*ba*bc))
}

function* take(a,b) {
  if (a.length == 0 || b.length == 0) return
  yield [a[0], b[0]]
  yield* take(a.slice(1), b.slice(1))
}

function pointWithinFrame(point, frame) {
  // Winding Number Algorithm
  // 頂点のどれかが point の近く
  if ( frame.reduce((acc,cur)=>(acc||nearM(cur,point)), false) ) return true

  var arg = []

  for (let [a, b] of take(frame, frame.concat([frame[0]]).slice(1)) ) {
    //console.log('a,b,c:', a, point, b)
    arg.push(interiorArg(a, point, b))
  }
  //console.log('arg:', arg)
  
  /*
  arg.push(interiorArg(frame[0], point, frame[1]))
  arg.push(interiorArg(frame[1], point, frame[2]))
  arg.push(interiorArg(frame[2], point, frame[3]))
  arg.push(interiorArg(frame[3], point, frame[0]))
  */

  return arg.reduce((acc,cur)=>(acc+cur))/(Math.PI*2) > 0.99
}

function test() {
  const frame = [
    [0,0],
    [10,0],
    [10,10],
    [0,10],
  ]
  console.log('Rectangle')
  console.log('case 1:', pointWithinFrame([1,9],      frame))
  console.log('case 2:', pointWithinFrame([1,9.9999], frame))
  console.log('case 3:', pointWithinFrame([0.11111,9.9999], frame))
  console.log('case 4:', pointWithinFrame([0,0],      frame))
  console.log('case 5:', pointWithinFrame([0,0],      frame))

  const pentagon = [
    [1,0],
    [0.31,0.95],
    [-0.81,0.59],
    [-0.81,-0.59],
    [0.3,-0.95],
  ]
  console.log('Pentagon')
  console.log('case 1:', pointWithinFrame([1,9],pentagon))
  console.log('case 2:', pointWithinFrame([0,0],pentagon))
  console.log('case 3:', pointWithinFrame([1,0],pentagon))
  console.log('case 4:', pointWithinFrame([0.5,0.5],pentagon))
}

module.exports = {
  pointWithinFrame
}
