import kuikka1 from '../images/kuikka1.webp'
import kuikka2 from '../images/kuikka2.webp'
import kuikka3 from '../images/kuikka3.webp'
import '../styles/header.css'
import HeaderImage from './HeaderImage'

function Header() {
  return (
    <header className="header">
      <h1 className="headerTitle">Birdnest Solution</h1>
      <div className="imageContainer">
        <HeaderImage imageSource={kuikka1} />
        <HeaderImage imageSource={kuikka3} />
        <HeaderImage imageSource={kuikka2} />
      </div>
    </header>
  )
}

export default Header
