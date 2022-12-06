import kuikka0 from '../images/kuikka0.webp'
import kuikka1 from '../images/kuikka1.webp'
import kuikka2 from '../images/kuikka2.webp'
import kuikka3 from '../images/kuikka3.webp'
import '../styles/header.css'

function Header() {
  return (
    <header className="header">
      <h1 className="headerTitle">Birdnest Solution</h1>
      <div className="imageContainer">

        <div className="imageWrapper">
          <img className="headerImage" src={kuikka1} alt="kuikka" draggable="false"/>
        </div>

        <div className="imageWrapper">
          <img className="headerImage" src={kuikka3} alt="kuikka" draggable="false"/>
        </div>

        <div className="imageWrapper">
          <img className="headerImage" src={kuikka2} alt="kuikka" draggable="false"/>
        </div>

        <div className="imageWrapper">
          <img className="headerImage" src={kuikka0} alt="kuikka" draggable="false"/>
        </div>
      </div>
    </header>
  )
}

export default Header
