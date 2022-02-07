import type { NextPage } from 'next';

import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <div>
      <Link href="/create">
        <a>create</a>
      </Link>
    </div>
  );
};

export default Home;

// TODO:
// 1. STRONA DO TWORZENIA POSTA
// 2. POWIADOMIENIA WIDOK
// 3. FOR YOU WIDOK
