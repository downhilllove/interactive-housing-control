import { useEffect, useRef } from 'react'

const useInterval = (fn, delay) => {
  const savedCallback = useRef()

  useEffect(() => {
    savedCallback.current = fn
  })

  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

export default useInterval
