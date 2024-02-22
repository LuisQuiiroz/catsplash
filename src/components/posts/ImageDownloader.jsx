'use client'
export function ImageDownloader ({ imageUrl, fileName }) {
  const handleDownload = () => {
    fetch(imageUrl)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = fileName
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
      })
  }
  return (
    <button
      onClick={handleDownload}
      className='text-white focus:ring-4 hover:opacity-70 font-medium rounded-lg text-sm px-4 py-2 text-center'
    >
      <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
        <path strokeLinecap='round' strokeLinejoin='round' d='M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3' />
      </svg>
    </button>
  )
}
