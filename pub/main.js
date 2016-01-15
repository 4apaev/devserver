let log = window.log = console.log.bind(console)

document.addEventListener('DOMContentLoaded', e => {
  log('READY')
})