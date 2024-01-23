import API from '../utils/API'

class CanvasRenderer {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D | null
  img: HTMLImageElement

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d', { willReadFrequently: true })
    this.img = new Image()
  }

  loadImage = async (imageId: string) => {
    try {
      const response = await API.getImage(imageId)
      const blob = await response.data
      
      const imageUrl = URL.createObjectURL(blob)      
      await this.drawImage(imageUrl)
      URL.revokeObjectURL(imageUrl);
    } catch (error) {
      console.error('Error loading image:', error)
    }
  }

  drawImage = (imageUrl: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!this.ctx) {
        reject('Canvas context not available')
        return
      }

      this.img.src = imageUrl

      this.img.onload = () => {
        this.canvas.width = this.img.width
        this.canvas.height = this.img.height

        this.ctx?.drawImage(this.img, 0, 0)
        resolve()
      }
    })
  }

  blurImage = (blurLevel: number) => {
    if (!this.ctx) return

    // Get image data from the canvas
    const imageData = this.ctx.getImageData(
      0,
      0,
      this.canvas.width,
      this.canvas.height,
    )
    // Pixels array [Red (R), Green (G), Blue (B), and Alpha (A)]
    const componentsCount = 4
    const data = imageData.data

    // Define the blur radius 
    const radius = blurLevel
    const length = data.length

    for (let i = 0; i < length; i += componentsCount) {
      let avgR = 0
      let avgG = 0
      let avgB = 0
      let count = 0

      // iterate over the neighboring pixels within the specified radius to find out average RGB
      for (let j = -radius; j <= radius; j++) {
        for (let k = -radius; k <= radius; k++) {
          // Calculate the index of the neighboring pixel
          const pixelIndex = i + (j * this.canvas.width + k) * componentsCount

          if (pixelIndex >= 0 && pixelIndex < length) {
            avgR += data[pixelIndex]
            avgG += data[pixelIndex + 1]
            avgB += data[pixelIndex + 2]
            count++
          }
        }
      }

      // Calculate the average values for R, G, and B, and update the pixel data
      data[i] = avgR / count
      data[i + 1] = avgG / count
      data[i + 2] = avgB / count
    }

    // Put the modified image data back to the canvas
    this.ctx.putImageData(imageData, 0, 0)
  }

  convertToGrayscale = () => {
    if (!this.ctx) return

    const imageData = this.ctx.getImageData(
      0,
      0,
      this.canvas.width,
      this.canvas.height,
    )
    const data = imageData.data
    
    // go through each pixel and calculate average value
    for (let i = 0; i < data.length; i += 4) {
      // Set red, green, and blue channels to the average value
      const average = (data[i] + data[i + 1] + data[i + 2]) / 3
      data[i] = average
      data[i + 1] = average
      data[i + 2] = average
    }

    this.ctx.putImageData(imageData, 0, 0)
  }

  resizeImage = (height: number, width: number) => {
    if (!width || !height) return

    if (!this.ctx) return

    // We need a temporary canvas to load previous changes and re-apply them to a resized canvas
    // otherwise we'll have to constantly check if resize runs first
    const imageData = this.ctx.getImageData(
      0,
      0,
      this.canvas.width,
      this.canvas.height,
    )
    const tempCanvas = document.createElement('canvas')
    const tempCtx = tempCanvas.getContext('2d')
    if (!tempCtx) return

    tempCanvas.width = this.canvas.width
    tempCanvas.height = this.canvas.height
    tempCtx.putImageData(imageData, 0, 0)

    this.canvas.width = width
    this.canvas.height = height

    this.ctx.drawImage(tempCanvas, 0, 0, width, height)
  }

  downloadImage = () => {
    const link = document.createElement('a')
    link.download = 'image.png'
    link.href = this.canvas.toDataURL()
    link.click()
  }
}

export default CanvasRenderer
