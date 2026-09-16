export default function Loading({ label = 'Loading...', fullScreen = false }) {
  return (
    <div className={fullScreen ? 'loading-screen' : 'loading-inline'} role="status" aria-live="polite">
      <span className="spinner" aria-hidden="true" />
      <span>{label}</span>
    </div>
  )
}
