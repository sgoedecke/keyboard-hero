"use strict";

var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
var tick = 0
var gameLoopInterval
var WORLD_WIDTH = canvas.width
var WORLD_HEIGHT = canvas.height
var world = {
  width: WORLD_WIDTH,
  height: WORLD_HEIGHT,
  player: {
    x: 250,
    y: 480,
    accelX: 0,
    accelY: 0
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
  player.x += player.accelX
  player.y += player.accelY
  if (player.x+10 > world.width || player.x < 0 || player.y+10 > world.height || player.y < 0) {
    endGame()
  }
}

function endGame() {
  alert("You died!")
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

$('html').keydown(function(e) {
  var player = world.player
  if (e.key == "ArrowDown") {
    if (player.accelY < 0) { player.accelY = 0 }
    player.accelY += 1
  } else if (e.key == "ArrowUp") {
    if (player.accelY > 0) { player.accelY = 0 }
    player.accelY -= 1
  } else if (e.key == "ArrowLeft") {
    if (player.accelX > 0) { player.accelX = 0 }
    player.accelX -= 1
  } else if (e.key == "ArrowRight") {
    if (player.accelX < 0) { player.accelX = 0 }
    player.accelX += 1
  }
})

function drawLoop() {
  draw()
  window.requestAnimationFrame(drawLoop)
}

drawLoop()

gameLoopInterval = setInterval(gameLoop, 25)
