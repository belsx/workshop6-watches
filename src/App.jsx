import { useState } from 'react';
import Clock from './components/Clock';
import './clock.css';


function App() {
  const [clocks, setClocks] = useState([]);
  const [name, setName] = useState('');
  const [timezone, setTimezone] = useState('');

  // Добавить часы
  const addClock = () => {
    if (!name || isNaN(Number(timezone))) return;
    const offset = parseInt(timezone, 10);
    setClocks([...clocks, { id: Date.now(), name, offset }]);
    setName('');
    setTimezone('');
  };

  // Удалить часы
  const removeClock = (id) => {
    setClocks((prevClocks) => prevClocks.filter((clock) => clock.id !== id));
  };

  return (
    <div className="clock-app">
      <h1>Часы</h1>
      <div>
        <input
          type="text"
          placeholder="Название"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Временная зона"
          value={timezone}
          onChange={(e) => setTimezone(e.target.value)}
        />
        <button onClick={addClock}>Добавить</button>
      </div>
      <div className="clocks-container">
        {clocks.map((clock) => (
          <Clock
            key={clock.id}
            id={clock.id}
            name={clock.name}
            offset={clock.offset}
            removeClock={removeClock}
          />
        ))}
      </div>
    </div>
  )
}

export default App
