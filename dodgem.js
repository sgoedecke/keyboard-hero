"use strict";

var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
var tick = 0
var gameLoopInterval
var WORLD_WIDTH = canvas.width
var WORLD_HEIGHT = canvas.height
var MAX_ACCEL = 10
var world = {
  width: WORLD_WIDTH,
  height: WORLD_HEIGHT,
  player: {
    x: WORLD_WIDTH/2,
    y: WORLD_HEIGHT-50,
    accelX: 0,
    accelY: 0,
    target: {
      x: WORLD_WIDTH/2,
      y: WORLD_HEIGHT-50
    }
  },
  boulders: [
    { x: Math.floor(Math.random() * WORLD_WIDTH), y: 0},
    { x: Math.floor(Math.random() * WORLD_WIDTH), y: 0}
  ]
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "black";
  ctx.fillRect(world.player.x, world.player.y, 10, 10);

  ctx.fillStyle = "red"
  world.boulders.forEach((boulder) => {
    ctx.fillRect(boulder.x, boulder.y, 20, 20)
  })
}

function placeBoulder() {
  if (world.boulders.length > 30) { return }
  world.boulders.push(
    { x: Math.floor(Math.random() * WORLD_WIDTH), y: 0}
  )
}

function moveBoulders() {
  world.boulders.forEach((boulder) => {
    boulder.y += 1

    // if player overlaps with the boulder
    if (Math.max(boulder.x, world.player.x) <= Math.min(boulder.x + 20, world.player.x + 10)) {
      if (Math.max(boulder.y, world.player.y) <= Math.min(boulder.y + 20, world.player.y + 10)) {
        endGame()
      }
    }

    // if the boulder is off-screen, wrap it back to the top
    if (boulder.y > world.height + 100) {
      boulder.y = 0
      boulder.x = Math.floor(Math.random() * world.width)
    }
  })
}

function movePlayer() {
  var player = world.player
  accelPlayerTowards(player.target.x, player.target.y)
  var newX = player.x + player.accelX
  var newY = player.y + player.accelY
  if (newX + 10 > world.width || newX < 0 || newY+10 > world.height || newY < 0) {
    player.accelX = 0
    player.accelY = 0
  } else {
    player.x = newX
    player.y = newY
  }
}

function endGame() {
  window.clearInterval(gameLoopInterval)
}

function gameLoop() {
  movePlayer()
  moveBoulders()
  tick++
  if (tick > 50) {
    tick = 0
    placeBoulder()
  }
}

function accelPlayerTowards(x, y) {
  var player = world.player

  if (Math.abs(player.x - x) < 10) {
    player.accelX = 0
  }
  if (Math.abs(player.y - y) < 10) {
    player.accelY = 0
  }

  if (player.x < x) {
    player.accelX += 1
  } else if (player.x > x) {
    player.accelX -= 1
  } else {
    player.accelX = 0
  }

  if (player.y < y) {
    player.accelY += 1
  } else if (player.y > y) {
    player.accelY -= 1
  } else {
    player.accelY = 0
  }

  if (player.accelX > MAX_ACCEL) {
    player.accelX = MAX_ACCEL
  } else if (player.accelX < MAX_ACCEL * -1) {
    player.accelX = MAX_ACCEL * -1
  }
  if (player.accelY > MAX_ACCEL) {
    player.accelY = MAX_ACCEL
  } else if (player.accelY < MAX_ACCEL * -1) {
    player.accelY = MAX_ACCEL * -1
  }
}

$('html').keydown(function(e) {
  var player = world.player
  if (/[a-z]/.test(e.key)) {
    var coords = keyCoords(e.key)
    var scaleX = WORLD_WIDTH / 10
    var scaleY = 80
    player.target = {
      x: 100 + (coords.x * scaleX),
      y: (WORLD_HEIGHT - scaleY*3) + (coords.y * scaleY)
    }
  }
})

function drawLoop() {
  draw()
  window.requestAnimationFrame(drawLoop)
}

drawLoop()

gameLoopInterval = setInterval(gameLoop, 25)
