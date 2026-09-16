import { useRef } from 'react'

export default function OtpInput({ length = 6, value, onChange, disabled = false }) {
  const inputsRef = useRef([])
  const digits = value.padEnd(length, ' ').split('').slice(0, length)

  function setDigit(index, char) {
    const chars = value.padEnd(length, '').split('')
    chars[index] = char
    onChange(chars.join('').slice(0, length))
  }

  function handleChange(index, event) {
    const raw = event.target.value.replace(/\D/g, '')

    if (!raw) {
      setDigit(index, '')
      return
    }

    if (raw.length > 1) {
      const chars = value.padEnd(length, '').split('')
      for (let i = 0; i < raw.length && index + i < length; i++) {
        chars[index + i] = raw[i]
      }
      onChange(chars.join('').slice(0, length))
      inputsRef.current[Math.min(index + raw.length, length - 1)]?.focus()
      return
    }

    setDigit(index, raw)
    if (index < length - 1) {
      inputsRef.current[index + 1]?.focus()
    }
  }

  function handleKeyDown(index, event) {
    if (event.key === 'Backspace' && !digits[index]?.trim() && index > 0) {
      inputsRef.current[index - 1]?.focus()
    }
  }

  function handlePaste(event) {
    event.preventDefault()
    const pasted = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, length)
    if (!pasted) return
    onChange(pasted)
    inputsRef.current[Math.min(pasted.length, length - 1)]?.focus()
  }

  return (
    <div className="otp-input-group" onPaste={handlePaste}>
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => { inputsRef.current[index] = el }}
          type="text"
          inputMode="numeric"
          autoComplete={index === 0 ? 'one-time-code' : 'off'}
          maxLength={length}
          className="otp-box"
          value={digits[index]?.trim() ?? ''}
          onChange={(event) => handleChange(index, event)}
          onKeyDown={(event) => handleKeyDown(index, event)}
          disabled={disabled}
          aria-label={`OTP digit ${index + 1}`}
        />
      ))}
    </div>
  )
}
