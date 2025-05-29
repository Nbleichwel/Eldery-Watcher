import { useState, useEffect } from 'react';
import './App.css';
import content from './content.json';

// Importando imagens
import frontImage from './assets/images/eldery_watcher_frente.png';
import backImage from './assets/images/eldery_watcher_tras.png';

function App() {
  const [activeSection, setActiveSection] = useState('conceito');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Mapeia os caminhos das imagens
  const images = {
    'eldery_watcher_frente.png': frontImage,
    'eldery_watcher_tras.png': backImage
  };

  // Efeito para fechar o menu ao clicar em uma seção em telas pequenas
  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [activeSection]);

  return (
    <div className="app">
      <header>
        <div className="container">
          <h1>{content.title}</h1>
          <p className="tagline">{content.tagline}</p>
          
          <button 
            className="menu-toggle" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          
          <nav className={isMenuOpen ? 'open' : ''}>
            <ul>
              {content.sections.map(section => (
                <li key={section.id}>
                  <button 
                    className={activeSection === section.id ? 'active' : ''}
                    onClick={() => setActiveSection(section.id)}
                  >
                    {section.title}
                  </button>
                </li>
              ))}
              <li>
                <button 
                  className={activeSection === 'galeria' ? 'active' : ''}
                  onClick={() => setActiveSection('galeria')}
                >
                  Galeria
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <div className="container">
          {activeSection === 'galeria' ? (
            <section id="galeria" className="gallery-section">
              <h2>Galeria</h2>
              <div className="gallery">
                {content.gallery.map(item => (
                  <div key={item.id} className="gallery-item">
                    <img 
                      src={images[item.image as keyof typeof images]} 
                      alt={item.title} 
                      loading="lazy"
                    />
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : (
            content.sections
              .filter(section => section.id === activeSection)
              .map(section => (
                <section key={section.id} id={section.id}>
                  <h2>{section.title}</h2>
                  {section.content && <p>{section.content}</p>}
                  
                  {section.features && (
                    <div className="features">
                      {section.features.map((feature, index) => (
                        <div key={index} className="feature-card">
                          <h3>{feature.name}</h3>
                          <p>{feature.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              ))
          )}
        </div>
      </main>

      <footer>
        <div className="container">
          <p>{content.footer.copyright}</p>
          <p>Contato: {content.footer.contact}</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
