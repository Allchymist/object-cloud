import './footer.css'

export function Footer() {
  return (
    <footer className="Footer">
      <p>Object Panel&reg; &copy; 2022 - {new Date().getUTCFullYear()}</p>
    </footer>
  )
}