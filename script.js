const $mensaje = document.querySelector('.mensaje'),
posiciones = ["", "", "", "", "", "", "", "", ""],
combinaciones = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ],
  mensajeGanador = () => `Felicidades jugador ${currentPlayer}<br>Has ¡Ganado!`,
  empate = () => `Una pena<br>Ha terminado en empate!`,
  turno = () => `Turno del jugador ${currentPlayer}`

let gameActive = true,
currentPlayer = "X"

function main() {
  mensajeJuego(turno())
  eventos()
}

function eventos() {
  document.querySelector('.tablero').addEventListener('click', eventoClick)
  document.querySelector('.game-restart').addEventListener('click', restartGame)
}

function mensajeJuego(message) {
  $mensaje.innerHTML = message
}

function restartGame() {
  gameActive = true
  currentPlayer = "X"
  restartGamePositions()
  mensajeJuego(turno())
  document.querySelectorAll('.celdas').forEach(celda => celda.innerHTML = "")
}


function eventoClick(e) {
  const clickCell = e.target;
  if (clickCell.classList.contains('celdas')) {
    const clickIndex = Array.from(clickCell.parentNode.children).indexOf(clickCell)
    if (posiciones[clickIndex] !== '' || !gameActive) {
      return false
    }

    agregarValores(clickCell, clickIndex);
    validacionResultado();
  }
}

function agregarValores(clickCell, clickIndex) {
  posiciones[clickIndex] = currentPlayer
  clickCell.innerHTML = currentPlayer
}

function validacionResultado() {
  let roundWon = false
  for (let i = 0; i < combinaciones.length; i++) {
    const winCondition = combinaciones[i] 
    let position1 = posiciones[winCondition[0]],
      position2 = posiciones[winCondition[1]],
      position3 = posiciones[winCondition[2]]

    if (position1 === '' || position2 === '' || position3 === '') {
      continue; 
    }
    if (position1 === position2 && position2 === position3) {
      roundWon = true
      break
    }
  }

  if (roundWon) {
    mensajeJuego(mensajeGanador())
    gameActive = false
    return
  }

  let roundDraw = !posiciones.includes("")
  if (roundDraw) {
    mensajeJuego(empate())
    gameActive = false
    return
  }

  cambioJugador()
}

function cambioJugador() {
  currentPlayer = currentPlayer === "X" ? "O" : "X"
  mensajeJuego(turno())
}

function restartGamePositions() {
  let i = posiciones.length
  while (i--) {
    posiciones[i] = ''
  }
}

main()