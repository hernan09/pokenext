import Head from 'next/head';
import Link from 'next/link';
import '../styles/global.css';

const Homepage = () => {
  return (
    <div className="container">
      <ul>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/pokecards">
            <a>POKEMONS</a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Homepage;
