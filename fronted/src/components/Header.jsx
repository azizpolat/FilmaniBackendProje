import {Link} from 'react-router-dom'

function Header() {
  return (
    <header className="flex justify-between items-center px-5 border-b">
      <Link to="/" className="flex items-center">
        <img width={80} src="/movie-logo.png" />
        <h2 className="font-bold text-2xl max-sm:hidden">Filmania</h2>
      </Link>

      <Link
        to="/create"
        className="border rounded-full py-1 px-5 hover:bg-black hover:text-white transition"
      >
        Film Oluştur
      </Link>
    </header>
  )
}

export default Header