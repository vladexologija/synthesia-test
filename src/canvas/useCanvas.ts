import React, { useCallback, useEffect, useState } from 'react';
import CanvasRenderer from './CanvasRenderer';
import { useParams, useSearchParams } from 'react-router-dom';;

const useCanvas = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
  let { imageId } = useParams();
  let [searchParams, setSearchParams] = useSearchParams();
  const [renderer, setRenderer] = useState<CanvasRenderer | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      setRenderer(new CanvasRenderer(canvasRef.current))
    }
  }, [canvasRef])

  useEffect(() => {
    async function loadImage() {
      if (!renderer || !imageId) return
      
      await renderer.loadImage(imageId)

      const blur = searchParams.get('blur')
      if (blur) renderer.blurImage(Number(blur))

      const grayscale = searchParams.get('grayscale')
      if (grayscale) renderer.convertToGrayscale()

      const resize = searchParams.get('resize')
      if (resize) {
        const values = resize.split('/')
        renderer.resizeImage(Number(values[0]), Number(values[1]))
      }
    }
    loadImage()
  }, [imageId, renderer, searchParams])

  const reload = useCallback(
    async () => {
      if (!renderer || !imageId) return
      
      await renderer.loadImage(imageId)
      setSearchParams({})
    },
    [imageId, renderer, setSearchParams],
  )

  const applyEffect = useCallback(
    (effect: 'blur' | 'resize' | 'grayscale', value: string) => {
      setSearchParams(searchParams => {
        searchParams.set(effect, value);
        return searchParams;
      });
    },
    [setSearchParams],
  )

  return {
    reload,
    applyEffect,
    downloadImage: renderer?.downloadImage
  }
}

export default useCanvas;