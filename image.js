const canvas = document.createElement('canvas')
canvas.width = 1686
canvas.height = 1190
const context = canvas.getContext('2d')

const background = context.createLinearGradient(0, 0, canvas.width, canvas.height)
background.addColorStop(0.2, '#31302B')
background.addColorStop(1, '#008')

const foreground = context.createLinearGradient(0, 0, canvas.width, canvas.height)
foreground.addColorStop(0.2, '#31302B')
foreground.addColorStop(1, '#00f')

context.fillStyle = background
context.fillRect(0, 0, canvas.width, canvas.height)

const size = 50
const bytes = []
for (let byte = 0; byte < canvas.height / size; byte++) {
  bytes.push([])
  for (let i = 0; i < 8; i++) {
    bytes[byte].push(Math.random() < 0.5)
  }
}
context.fillStyle = foreground
context.font = `${size}pt monospace`
let line = 0
bytes.forEach(byte => {
  const text = byte.map(bit => bit ? 1 : 0).join('')
  context.fillText(text, canvas.width - context.measureText(text).width, canvas.height - ((bytes.length - line - 1) * size))
  line++
})

document.body.style.background = `url(${canvas.toDataURL('image/png')})`
