import Link from 'next/link';

import { Counter } from '../Counter';

export default function HomePage(): React.JSX.Element {
  return (
    <main>
      <h1>Home</h1>
      <Counter label="Clicks" />
      <Link href="/about">About</Link>
    </main>
  );
}
