import React, { useEffect, useRef } from 'react'

const puzzlePath = "M26.9224 60.0224C19.889 60.5679 5.23874 61.8965 2.90532 62.8467C1.82619 57.1892 -0.25152 44.4695 0.0707311 38.8507C0.192312 38.6683 0.682049 38.413 1.66835 38.8507C2.51722 39.5137 4.75176 40.8448 6.89895 40.8647C9.58295 40.8896 15.0064 38.6766 14.946 32.82C14.8857 26.9634 9.48551 24.8496 6.89895 24.8496C4.31239 24.8496 2.5497 26.0183 1.66835 26.8038C1.43843 26.9827 0.573742 27.7795 0.0972364 26.8038C-0.447183 25.6892 1.40455 6.61614 2.91448 2.8649C8.61771 1.78277 21.4106 -0.298016 26.9563 0.0358393C27.1572 0.144033 27.4385 0.587628 26.9563 1.49646C26.3535 2.63249 24.8697 5.11322 24.8697 6.89842C24.8697 8.68362 26.5389 14.8738 32.9378 14.8507C39.3367 14.8275 40.9133 9.42552 40.9596 6.89842C41.006 4.37132 39.8004 2.42383 38.9194 1.49646C38.5175 1.17188 37.9549 0.425342 38.9194 0.0358438C45.3028 0.607722 59.0388 1.96941 62.9153 2.84115C61.9492 9.67281 60.0311 24.0456 60.0868 26.8834C60.0923 27.1641 60.7011 27.8065 61.5979 26.8834C62.3384 26.1878 64.4362 24.806 66.903 24.8431C69.9865 24.8895 74.9016 27.092 74.9016 32.8649C74.9016 38.6378 69.917 40.8867 66.903 40.8404C63.889 40.794 62.3689 39.5581 61.5979 38.8199C61.2384 38.3142 60.3007 37.8282 60.1052 38.8199C60.0929 44.5796 60.6342 57.4442 62.8971 62.8253C56.1632 61.8453 41.9337 59.9127 38.8867 60.0224C38.6046 60.1846 38.2096 60.6916 38.8867 61.4221C39.5698 61.979 40.9403 63.8454 40.9581 66.8568C40.9804 70.6209 37.929 74.8528 32.9175 74.8973C27.9061 74.9419 24.877 70.3314 24.877 66.8568C24.877 64.0771 26.2406 62.1542 26.9224 61.5401C27.3232 61.1792 27.7249 60.1153 26.9224 60.0224Z"
const viewBox = 75;
const origine = viewBox / 2;
const path = new Path2D(puzzlePath);


//===génère et retourne un tableau de n pièces puzzle===
function buildPuzzle(w, h, n = 500) {
    function seeded(seed) {
        let s = seed * 9973 + 1
        return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646 }
    }

    const rand = seeded(42)
    const palette = ['#FC29E4, #BC60E7, #888DEA, #54B4EC, #15F0F0']
    const pieces = []

    for (let i = 0; i < n; i++) {
        //Taille finale de la pièce à l'écran (par rapport aux 75px naturels)
        const displaySize = 30 + rand() * 35
        const scale = displaySize / viewBox

        //Position cible : là où la pièce se pose sur la section
        const tx = rand() * w
        const ty = rand() * h

        //Position de départ : sous l'écran, dispersées en X
        const sx = tx + (rand() - 0.5) * w * 0.25
        const sy = h + displaySize + rand() * h * 0.5

        //Position de sortie : au-dessus de l'écran
        const ex = tx + (rand() - 0.5) * 80
        const ey = -displaySize * 2 - rand() * h * 0.3

        pieces.push({
            tx, ty, sx, sy, ex, ey,
            scale,
            color: palette[Math.floor(rand() * palette.length)],
            rotStart: (rand() - 0.5) * Math.PI * 1.5,
            rotTarget: (rand() - 0.5) * 0.4,
            rotExit: (rand() - 0.5) * Math.PI,
            delay: rand() * 0.4,
        })
    }

    return pieces
}

//===Dessine une pièce selon la progresson
function drawPuzzle(ctx, piece, arriveProgress, exitProgress) {
    const localArrive = Math.max(0, Math.min(1, (arriveProgress - piece.delay) / (1 - piece.delay + 0.001)))
    const ea = easeInOut(localArrive)
    const ee = easeIn(exitProgress)

    let x, y, rot, alpha
    if (exitProgress <= 0) {
      x = piece.sx + (piece.tx - piece.sx) * ea
      y = piece.sy + (piece.ty - piece.sy) * ea
      rot = piece.rotStart * (1 - ea) + piece.rotTarget * ea
      alpha = ea * 0.92
    }
    else {
      x = piece.tx + (piece.ex - piece.tx) * ee
      y = piece.ty + (piece.ey - piece.ty) * ee
      rot = piece.rotTarget + piece.rotExit * ee
      alpha = (1 - ee) * 0.92
    }

    if (alpha < 0.01) return

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);
  ctx.scale(piece.scale, piece.scale);
  ctx.translate(-origine, -origine);

  ctx.globalAlpha = alpha
  ctx.fillstyle = piece.color
  ctx.fill(path);

  ctx.strokeStyle = 'rgba(255,255,255,0.15)';
  ctx.lineWidth = 1 / piece.scale
  ctx.stroke(path)

  ctx.restore();
}

//===Easings===
function easeInOut(t) {return t < 0.5 ? 2*t*t : -1+(4-2*t)*t }
function easeIn(t) {return t*t*t }

//===Composant React===
export default function Canvas({progress}) {

  const canvasRef = useRef(null);
  const puzzleRef = useRef([])

  //Génération des pièces + taille canvas au montage et au resize
  useEffect(() => {
      const canvas = canvasRef.current

      function init() {
        canvas.width = canvas.offsetWidth
        canvas.height = canvas.offsetHeight
        puzzleRef.current = buildPuzzle(canvas.width, canvas.height)
      }

      init()
      window.addEventListener('resize', init)
      return () => window.removeEventListener('resize', init)
  }, [])

  //Rendu à chaque changement de progress
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const arrive = 0.55
    const exit = 0.55

    const arriveP = Math.min(1, progress / arrive)
    const exitP = Math.max(0, (progress - exit) / (1 - exit))

    ctx.clearRect(0, 0, canvas.width, canvas.height) // efface le frame précédent
    // claude : ici tu boucles tes pièces et tu dessines chacune selon la valeur de progress (0 -> 1)
    puzzleRef.current.forEach(p => drawPuzzle(ctx, p, arriveP, exitP))
  }, [progress])

  return (
    <canvas ref={canvasRef}
            style={{position: 'absolute',
                    inset: 0, 
                    width: '100%',
                    height: '100%',
                    zIndex: 10,
                    pointerEvents: 'none',
                  }}
    />
  )
}
