import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // 1. État pour stocker les widgets
  const [widgets, setWidgets] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. Fonction pour récupérer les données
  const fetchWidgets = () => {
    fetch('http://localhost:8080/api/dashboard/widgets')
      .then(response => response.json())
      .then(data => {
        setWidgets(data);
        setLoading(false);
      })
      .catch(error => console.error("Erreur API:", error));
  };

  // 3. Effet : Se lance au chargement du composant
  useEffect(() => {
    fetchWidgets();

    // Optionnel : Rafraîchir toutes les 5 secondes
    const interval = setInterval(fetchWidgets, 5000);
    return () => clearInterval(interval); // Nettoyage
  }, []);

  return (
    <div className="dashboard-container">
      <h1>🚀 Mon Dashboard React + Java</h1>

      {loading ? (
        <p>Chargement des données...</p>
      ) : (
        <div className="grid">
          {widgets.map((widget, index) => (
            <div key={index} className={`card status-${widget.status}`}>
              <h3>{widget.title}</h3>
              <p>{widget.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App