import React, { useEffect, useRef } from 'react'
import { PuzzleAbsPath } from '../assets/PuzzlePath';

const viewBox = 75;
const origine = viewBox / 2;
const path = new Path2D(PuzzleAbsPath);


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
