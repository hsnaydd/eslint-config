import { useEffect, useState } from 'react';

interface CounterProps {
  initialCount?: number;
  label: string;
}

export function Counter({ initialCount = 0, label }: CounterProps): React.JSX.Element {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    document.title = `${label}: ${count}`;
  }, [count, label]);

  return (
    <button type="button" onClick={() => setCount(count + 1)}>
      {label}: {count}
    </button>
  );
}
