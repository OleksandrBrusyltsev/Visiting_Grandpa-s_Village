import { RefObject, useEffect } from 'react'

export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T>,
  callback: Function,
): void {
  const handleClick = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      callback()
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClick)
    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [])
}
