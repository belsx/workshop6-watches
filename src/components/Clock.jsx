import { useEffect, useState } from "react";

const Clock = ({ id, name, offset, removeClock }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval); // Убираем подписку при удалении компонента
  }, []);

  console.log(time.getTimezoneOffset());

  const utcTime = new Date(time.getTime() + time.getTimezoneOffset() * 60 * 1000); // Приводим текущее время к UTC
  const localTime = new Date(utcTime.getTime() + offset * 60 * 60 * 1000);

  const hours = localTime.getHours();
  const minutes = localTime.getMinutes();
  const seconds = localTime.getSeconds();

  console.log(seconds);

  return (
    <div className="clock">
      <div className="clock-header">
        <h2>{name}</h2>
        <button onClick={() => removeClock(id)}>✖</button>
      </div>
      <div className="clock-face">
        <div
          className="hand hour"
          style={{ transform: `rotate(${(hours % 12) * 30 + minutes / 2 - 90}deg)` }}
        />
        <div className="hand minute" style={{ transform: `rotate(${minutes * 6 - 90}deg)` }} />
        <div className="hand second" style={{ transform: `rotate(${seconds * 6 - 90}deg)` }} />
      </div>
    </div>
  );
};

export default Clock;
