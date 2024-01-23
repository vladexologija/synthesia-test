import { useState } from 'react'

interface Props {
  reload: () => void 
  downloadImage: (() => void) | undefined
  applyEffect: (effect: 'blur' | 'resize' | 'grayscale', value: string) => void 
}

const Controls = ({ reload, downloadImage, applyEffect }: Props) => {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [blur, setBlur] = useState(0)
  
  return (
    <div className="text-center xl:max-w-4xl">
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Width
        </label>
        <input
          type="number"
          className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={width}
          onChange={(e) => setWidth(Number(e.target.value))}
        />
      </div>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Height
      </label>
      <input
        type="number"
        className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={height}
        onChange={(e) => setHeight(Number(e.target.value))}
      />
      <br />
      <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        htmlFor="slider"
      >
        Blur value: {blur}
      </label>
      <input
        type="range"
        id="slider"
        name="slider"
        min={1}
        max={10}
        value={blur}
        onChange={(e) => setBlur(Number(e.target.value))}
      />

      <div className="flex justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => applyEffect('blur', `${blur}`)}
        >
          Blur
        </button>
        <br />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => applyEffect('grayscale', 'true')}
        >
          Grayscale
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => applyEffect('resize', `${width}/${height}`)}
        >
          Resize
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={reload}
        >
          Reload
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={downloadImage}
        >
          Download
        </button>
      </div>
    </div>
  )
}

export default Controls
