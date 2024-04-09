'use client'
import { useEffect, useRef } from 'react'

export function Modal ({ openModal, closeModal, children }) {
  const ref = useRef()
  useEffect(() => {
    if (openModal) {
      ref.current?.showModal()
    } else {
      ref.current?.close()
    }
  }, [openModal])
  return (
    <dialog ref={ref} onCancel={closeModal} className='bg-transparent backdrop:bg-black backdrop:opacity-50'>
      {children}
    </dialog>
  )
}
