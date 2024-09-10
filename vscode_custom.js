function setupCanvas() {
  var oceanContainer = document.querySelector('#oceanContainer')
  var canvas = document.createElement('canvas')
  canvas.id = 'waveCanvas'
  oceanContainer.appendChild(canvas)

  initCanvas()
}

function fillWater() {
  var oceanContainer = document.querySelector('#oceanContainer')
  const water = document.createElement('div')
  water.className = 'water'

  const waterLayer = document.createElement('div')
  waterLayer.className = 'waterLayer'

  oceanContainer.appendChild(waterLayer)
  oceanContainer.appendChild(water)
}

function fillStar() {
  var oceanContainer = document.querySelector('#oceanContainer')

  const stars = document.createElement('div')
  stars.className = 'stars'

  let star = document.createElement('span')
  star.className = 'star'

  for (let i = 0; i < 10; i++) {
    var starDOM = star.cloneNode(true)
    let size = getRandom(0, 6)
    starDOM.style.width = `${size}px`
    starDOM.style.height = `${size}px`
    starDOM.style.top = `${getRandom(0, 100)}%`
    starDOM.style.left = `${getRandom(0, 100)}%`
    starDOM.style.animationDelay = `${getRandom(0, 5)}s`
    stars.appendChild(starDOM)
  }

  oceanContainer.appendChild(stars)
}

function getRandom(min, max) {
  return Math.random() * (max - min) + min
}

// function setupHorizon() {
//   var line = document.querySelector('div[data-editor-id="workbench.editors.files.textFileEditor"].editor-instance .monaco-mouse-cursor-text')
// }

function setupElement() {
  var oceanContainer = document.querySelector('#oceanContainer')
  const horizon = document.createElement('div')
  horizon.className = 'horizon'
  const personSvg = `<svg class="svg-person" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240.77 751.75"><defs><style>.bf202a4f-8ec6-4b60-b360-8095935114b7{stroke:#000;}.afc4ce61-e691-4039-a49c-bd77269d47e4,.bf202a4f-8ec6-4b60-b360-8095935114b7{stroke-miterlimit:10;}.afc4ce61-e691-4039-a49c-bd77269d47e4{stroke:#231f20;}</style></defs><g id="f779ba87-f7e0-4b2d-92b8-ae4709263151" data-name="Layer 2"><g id="a19933d3-f3c7-475e-ad5d-74bb5972479f" data-name="body"><path class="bf202a4f-8ec6-4b60-b360-8095935114b7" d="M57.73,86.63s-6.89,37.21-33.12,34.6a73.75,73.75,0,0,0-12.56,0c-5,.65,1.4,7.63,1.4,7.63s11.72,13.39,0,49.67c-5.58,27.35,46.32,41.86,68.65,48,0,0,10.6,6.7,0,37.4C92.7,274.53,141,267,141,267s-7-23.72,25.4-43.26c0,0,109.39-80.93,22.88-150.14C189.26,73.6,73-4.72,57.73,86.63Z"/><path class="afc4ce61-e691-4039-a49c-bd77269d47e4" d="M124.57,274.14s112,23.94,60.65,261.7c-18.05,16.75-32.76-1.67-32.76-1.67S178.8,398.54,127.9,336.58C80.84,266.72,124.57,274.14,124.57,274.14Z"/><path class="bf202a4f-8ec6-4b60-b360-8095935114b7" d="M181.78,527a24.87,24.87,0,0,1,.73,16.63c-3.9,12.78-11.73,35.43-18.71,37.62-9.76,3.07,7.82-15.47,7-22.24,0,0-9.49,22-12.84,24.2-6.69,2.51,8.1-22.89,8.37-28.19,0,0-7.81,23.23-15.62,28.36S163,548.3,163,548.3s-14.79,28.75-18.14,31c-7,3.35,11.25-24.12,7.25-27.26-2.39-1.88-4.46,3.82-6.14,5.77-5.18,6.58-1.14-19.94,5.58-32.25,2.91-5.31,7.37-5.61,11.82-6.12,5.32-.62,15.65.81,18.44,7.56Z"/><path class="bf202a4f-8ec6-4b60-b360-8095935114b7" d="M80.5,266.72c6-8.37-22.4,24.66-30.56,78.7-4.5,29.77-31.77,155.48-5.86,204.28,0,0,90.14,3.27,98.79,1.11,8.93-2.23,50.79-94.32,44.09-165.76-.81-12.47-8.37-75.17-45.76-114.89"/><path class="bf202a4f-8ec6-4b60-b360-8095935114b7" d="M152.39,233.38S137.27,245,141.2,270.16c-6.7,5.49-58.89,2.14-60.7-3.44s9.9-20.65.42-40.19C80.92,226.53,118.37,220.69,152.39,233.38Z"/><path class="bf202a4f-8ec6-4b60-b360-8095935114b7" d="M71.64,536.68c-1.08,7.6.77,13,.71,16.32-.1,6.79-2.93,17.26,3.3,75.68-7.07,13.4-3,22.7,7.55,25.21,9.79,2.33,48,4.07,64.76,2.87,8.93-13.49,16.59-92.32,12.12-118C141.65,541.74,71.64,536.68,71.64,536.68Z"/><path class="bf202a4f-8ec6-4b60-b360-8095935114b7" d="M40.7,536.88c-1.09,7.59.76,12.94.71,16.31-.11,6.79-2.94,17.27,3.29,75.69-7.07,13.39-3,22.69,7.56,25.21,9.78,2.33,31.93,4.4,50.52,1.3,5.6-2.51,30.82-90.76,26.36-116.43C110.71,541.93,40.7,536.88,40.7,536.88Z"/><path d="M61.93,648.58S58.72,674.32,58,703.74c-3.28,3-6.64,1.68-8.25,9.46-1.2,5.8-15.57,7.5-45.63,11.47-6.34.84-4.19,17.58-1.68,23.44s77.39,1.72,77.39,1.72,5.68-23.2,2.33-34.93c3.62-11,8.84-53.78,2.73-66.35C75.67,643.11,61.93,648.58,61.93,648.58Z"/><path d="M48.15,719.18s-3.35-11.9-8.56,0C42.2,724,48.15,719.18,48.15,719.18Z"/><path class="bf202a4f-8ec6-4b60-b360-8095935114b7" d="M124.14,648.58s-3.21,25.74-3.89,55.16c-3.27,3-6.63,1.68-8.24,9.46-1.2,5.8-15.57,7.5-45.64,11.47-6.33.84-4.18,17.58-1.67,23.44s77.38,1.72,77.38,1.72,5.69-23.2,2.34-34.93c3.62-11,8.84-53.78,2.73-66.35C137.88,643.11,124.14,648.58,124.14,648.58Z"/><path class="bf202a4f-8ec6-4b60-b360-8095935114b7" d="M104,719.18s-3.35-11.9-8.55,0C98,724,104,719.18,104,719.18Z"/><path class="bf202a4f-8ec6-4b60-b360-8095935114b7" d="M127.21,274.14s112,23.94,60.64,261.7c-18,16.75-32.76-1.67-32.76-1.67s26.34-135.63-24.56-197.59C83.47,266.72,127.21,274.14,127.21,274.14Z"/><path class="bf202a4f-8ec6-4b60-b360-8095935114b7" d="M184.41,527a24.94,24.94,0,0,1,.74,16.63c-3.91,12.78-11.74,35.43-18.72,37.62-9.76,3.07,7.82-15.47,7-22.24,0,0-9.49,22-12.84,24.2-6.69,2.51,8.1-22.89,8.38-28.19,0,0-7.82,23.23-15.63,28.36S165.6,548.3,165.6,548.3s-14.79,28.75-18.14,31c-7,3.35,11.25-24.12,7.25-27.26-2.39-1.88-4.46,3.82-6.14,5.77-5.18,6.58-1.14-19.94,5.59-32.25,2.9-5.31,7.36-5.61,11.81-6.12,5.32-.62,15.65.81,18.44,7.56Z"/><path class="bf202a4f-8ec6-4b60-b360-8095935114b7" d="M73.67,80.54c-4-5.07-14.78-12.66-36.07-2a.48.48,0,0,1-.68-.54c1.64-6.69,11.52-14,14-15.82a.43.43,0,0,0-.06-.75c-3-1.49-14,.36-30.77,7.44a.55.55,0,0,1-.69-.77c5.59-9.67,30.93-34,46.4-32.41h0c-13.3-1.83-24.72-14.4-19.89-13.29a59.56,59.56,0,0,0,33.65,1.4h0c-5.16-10.88,6-23,6-23h0c-3.54,5.3-2.41,20,9.26,24.61.27.11-.3,0,0,0,0,0,21.56,3,34.22,5.4,56,10.7,69.31,54,78.7,54.4h0s10.14,2,19.45-9.94c.34-.44-12.47,18.23-10.76,23.28a68.16,68.16,0,0,0,3.69,8.53c4.77.69,9.81-2.89,12.37-6.7.25-.37,1.7-3.45,1.68-3-.19,3.81-3.45,9-13.22,12.31-.13,0,1.58,8.83,19.13-1.29.16-.42.26-.37,0,0-1.92,4.26-22.57,12.73-33,10.68L82.74,86C79.75,85.09,75.32,82.66,73.67,80.54Z"/></g></g></svg>`
  const personDOM = new DOMParser().parseFromString(personSvg, 'text/html').body.childNodes[0]
  const rockSvg = ``
  //const rockDOM = new DOMParser().parseFromString(rockSvg, 'text/html').body.childNodes[0]
  //const rockSvgElement  = new DOMParser().parseFromString(personSvg, 'text/html').body.childNodes[0]
  horizon.appendChild(personDOM)
  //horizon.appendChild(rockDOM);
  oceanContainer.appendChild(horizon)
}

function setupBubbles() {
  var oceanContainer = document.querySelector('#oceanContainer')

  const oceanBubbles = document.createElement('div')
  oceanBubbles.className = 'bubbles'

  let buble = document.createElement('span')
  buble.className = 'bubble'

  for (let i = 0; i < 4; i++) {
    oceanBubbles.appendChild(buble.cloneNode(true))
  }

  oceanBubbles.width = oceanContainer.innerWidth
  oceanBubbles.height = oceanContainer.innerHeight

  oceanContainer.appendChild(oceanBubbles)
}

function initOcean() {
  setTimeout(function () {
    var oceanContainer = document.createElement('div')
    oceanContainer.id = 'oceanContainer'

    var editor = document.querySelector(
      '.split-view-container > .split-view-view > .monaco-grid-branch-node .editor-container'
    )

    editor.appendChild(oceanContainer)

    setupCanvas()
    fillWater()
    fillStar()
    setupBubbles()
    setupElement()
  }, 1000)
}

document.addEventListener('DOMContentLoaded', initOcean, false)
//document.addEventListener("DOMContentLoaded", setupBubbles, false)

var unit = 100,
  canvasList,
  info = {},
  colorList

/**
 * Init canvas
 *
 * Initialize variables and begin the animation.
 */
function initCanvas() {
  info.seconds = 0
  info.t = 0
  canvasList = []
  colorList = []
  // add wave into canvas list
  canvasList.push(document.getElementById('waveCanvas'))
  colorList.push(['rgba(11, 71, 93, 0.82)'])
  // set frame dimension and context for canvases
  for (var canvasIndex in canvasList) {
    var canvas = canvasList[canvasIndex]
    canvas.width = 1920
    canvas.height = 200
    canvas.contextCache = canvas.getContext('2d')
  }
  // update canvas actions
  updateCanvasActions()
}
