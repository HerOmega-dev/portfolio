import { PuzzleRelPath, PuzzleAbsPath } from "../assets/PuzzlePath"
import { cn } from "../lib/utils"
import { cva } from "class-variance-authority"

const puzzleVariants = cva(
  "absolute pointer-event-none",
  {
    variants: {
      variant: {
        purple: "text-purple",
        blue: "text-blue",
        pink: "text-pink"
      },

      size: {
        md: "w-100 h-100"
      }
    }
  }
)

export function PuzzleSVG({className, variant, size}) {
  return (
    <svg
      viewBox="0 0 75 75"
      className={cn(puzzleVariants({variant, size}), className)}>
          <path 
            d={PuzzleAbsPath}
            className="fill-current"
          />
    </svg>
  )
}

export function PuzzleClipPath() {
  return (
    <svg
      //Pas besoin de viewbox car la taille n'importe pas, on veut seulement définir la géométrie. Idem pour les variantes, ce sera déterminé sur le conteneur parent.
      className= "absolute w-0 h-0 aria-hidden">
      <defs>
        <clipPath id='puzzle-clipPath' clipPathUnits="objectBoundingBox">
          <path 
            d={PuzzleRelPath}
          />
        </clipPath>
      </defs>
    </svg>
  )
}
