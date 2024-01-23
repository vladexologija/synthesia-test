import React, { useRef } from 'react'
import useCanvas from './useCanvas'
import Controls from './Controls'

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { reload, downloadImage, applyEffect } = useCanvas(canvasRef)

  return (
    <div className="flex flex-col justify-center items-center px-6 mx-auto h-screen xl:px-0 dark:bg-gray-900">
      <canvas ref={canvasRef} />
      <Controls applyEffect={applyEffect} downloadImage={downloadImage} reload={reload}/>
    </div>
  )
}

export default Canvas
