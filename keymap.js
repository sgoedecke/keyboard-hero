"use strict";

var keyMap = {
  q: [0,0],
  w: [1,0],
  e: [2,0],
  r: [3,0],
  t: [4,0],
  y: [5,0],
  u: [6,0],
  i: [7,0],
  o: [8,0],
  p: [9,0],
  a: [0,1],
  s: [1,1],
  d: [2,1],
  f: [3,1],
  g: [4,1],
  h: [5,1],
  j: [6,1],
  k: [7,1],
  l: [8,1],
  z: [0,2],
  x: [1,2],
  c: [2,2],
  v: [3,2],
  b: [4,2],
  n: [5,2],
  m: [6,2]
}

function keyCoords(key) {
  return {
    x: keyMap[key][0],
    y: keyMap[key][1]
  }
}
