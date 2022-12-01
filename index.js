document.addEventListener('DOMContentLoaded', () => {
  const w = 30
  const h = 30
  const d = 400

  const field = document.getElementById('field')

  let interval;

  let clicked;

  const neighborsForLive = (cell) => {
    let count = 0;
    let cellId = Number(cell.id.replace('td',''));
    let row = cell.parentElement;
    let topRow = field.querySelector(`#tr${row.id.replace('tr','') - 1}`);
    let downRow = field.querySelector(`#tr${Number(row.id.replace('tr','')) + 1}`);

    if (cellId != 0) {
      if(row.querySelector(`#td${cellId - 1}`).classList.contains('alive')) {
        count++;
      }
      if(topRow) {
        if(topRow.querySelector(`#td${cellId - 1}`).classList.contains('alive')) {
          count++;
        }
      }
      if(downRow) {
        if(downRow.querySelector(`#td${cellId - 1}`).classList.contains('alive')){
          count++;
        }
      }
    }

    if (cellId != (w - 1)) {
      if(row.querySelector(`#td${cellId + 1}`).classList.contains('alive')) {
        count++;
      }
      if(topRow) {
        if(topRow.querySelector(`#td${cellId + 1}`).classList.contains('alive')) {
          count++;
        }
      }
      if(downRow) {
        if(downRow.querySelector(`#td${cellId + 1}`).classList.contains('alive')) {
          count++;
        }
      }
    }

    if(topRow) {
      if(topRow.querySelector(`#td${cellId}`).classList.contains('alive')) {
        count++;
      }
    }
    if(downRow) {
      if(downRow.querySelector(`#td${cellId}`).classList.contains('alive')) {
        count++;
      }
    }

    return count
  }

  for (let i = 0; i < w; i++) {
    let row = field.insertRow()
    row.setAttribute('id',`tr${i}`)

    for (let j = 0; j < h; j++) {
      let cell = row.insertCell()
      cell.classList.add('slot')
      cell.addEventListener('click', (e) => {
        e.target.classList.add('alive')
      })
      cell.addEventListener('mouseup', (e) => {
        clicked = false
      });
      cell.addEventListener('mousedown', (e) => {
        e.target.classList.add('alive')
        clicked = true
      });
      cell.addEventListener('mouseover', (e) => {
        if (clicked) e.target.classList.add('alive')
      })
      cell.setAttribute('id', `td${j}`)
    }
  }

  document.getElementById('random').addEventListener('click', () => {
    [].slice.call(field.getElementsByClassName('alive')).forEach(e => e.classList.remove('alive'));

    for (let i = 0; i < d; i++) {
      let x = Math.floor(Math.random() * w)
      let y = Math.floor(Math.random() * h)

      let row  = field.querySelector(`#tr${x}`)
      let cell = row.querySelector(`#td${y}`)

      cell.classList.add('alive')
    }
  })

  const start = () => {
    interval = setInterval(() => { 
      const alives = document.getElementById('field').getElementsByClassName('slot')
  
      let dead = []
      let born = []
  
      for (let i = 0; i < alives.length; i++) {
        let result = neighborsForLive(alives[i])
        let el = alives[i]
        if (alives[i].classList.contains('alive')) {
          if (!(result > 1 && result < 4)) {
            dead.push(el)
          }
        } else {
          if (result == 3) {
            born.push(el)
          }
        }
      }
  
      dead.forEach(e => e.classList.remove('alive'))
      born.forEach(e => e.classList.add('alive'))
    }, 30)
  }

  const stop = () => { clearInterval(interval) }

  document.getElementById('start').addEventListener('click',  start)
  document.getElementById('stop').addEventListener('click',  stop)
})
