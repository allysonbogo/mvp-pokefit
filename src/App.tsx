import githubLogo  from './assets/github.svg'
import linkedinLogo from './assets/linkedin.svg'
import pokefitLogo from './assets/pokefit.png'
import './App.css'
import PokemonFilter from './components/PokemonFilter';

function App() {
  return (
    <>
      <div>
        <a target="_blank">
          <img src={pokefitLogo} className="logo" alt="PokeFit logo" />
        </a>
        <PokemonFilter />
      </div>
      <div className="footer">
          <p>Developed by</p>
          <a className="credits" href="https://github.com/allysonbogo" target="_blank">@allysonbogo</a>
          <a className="credits" href="https://linkedin.com/in/allysonbogo" title="LinkedIn" target="_blank">
            <img src={linkedinLogo} />
          </a>
          <a className="credits" href="https://github.com/allysonbogo" title="GitHub" target="_blank">
            <img src={githubLogo} />
          </a>
      </div>
    </>
  )
}

export default App
