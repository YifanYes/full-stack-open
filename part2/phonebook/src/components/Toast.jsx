import { useEffect, useState } from 'react'

const Toast = ({ message, severity, duration, setToastData }) => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setVisible(false)
      setToastData(null)
    }, duration)
    return () => clearTimeout(timeoutId)
  }, [duration, setToastData])

  return (
    visible && (
      <div className={`toast ${severity}`} style={{ position: 'fixed', top: 10, right: 10 }}>
        <p>{message}</p>
      </div>
    )
  )
}

export default Toast
