import type { NextPage } from 'next';

import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <div>
      <Link href="/create">
        <a>create</a>
      </Link>
      <Link href="/invites">
        <a>invites</a>
      </Link>
    </div>
  );
};

export default Home;

// TODO:
// 2. TWORZENIE POSTOW
// 3. SYSTEM POWIADOMIEN
// 4. KOMENTOWANIE
