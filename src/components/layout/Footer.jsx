import { Link } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';
import { useTheme } from '@/services/providers/theme-provider';

const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer className="container text-foreground py-8 mt-8 grid grid-flow-row gap-6">
      <hr className="border-muted" />

      <div className="flex items-center justify-center mb-4">
        <h5 className="text-3xl font-bold md:mb-6">Wikiciné</h5>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        <div>
          <h2 className="text-xl md:text-2xl font-semibold mb-2">Developers</h2>
          <div className="flex items-center mb-2 justify-center md:justify-start text-muted-foreground hover:underline">
            <FaGithub className="mr-2" />
            <a
              href="https://github.com/VincentVignaud"
              target="_blank"
              rel="noopener noreferrer"
            >
              Vincent Vignaud
            </a>
          </div>

          <div className="flex items-center mb-2 justify-center md:justify-start text-muted-foreground hover:underline">
            <FaGithub className="mr-2" />
            <a
              href="https://github.com/Thomas92230"
              target="_blank"
              rel="noopener noreferrer"
            >
              Icham BOUDEHANE
            </a>
          </div>

          <div className="flex items-center mb-2 justify-center md:justify-start text-muted-foreground hover:underline">
            <FaGithub className="mr-2" />
            <a
              href="https://github.com/JohanChereau"
              target="_blank"
              rel="noopener noreferrer"
            >
              Johan CHEREAU
            </a>
          </div>
        </div>

        <div className="md:justify-self-center">
          <h2 className="text-xl md:text-2xl font-semibold mb-2">Training Center</h2>
          <div className="text-muted-foreground hover:underline">
            <a
              href="https://www.dawan.fr/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Dawan
            </a>
          </div>
        </div>

        <div className="md:justify-self-end">
          <h2 className="text-xl md:text-2xl font-semibold mb-2">Legal</h2>
          <ul>
            <li className="text-muted-foreground hover:underline">
              <Link to="/terms-of-use">Terms of Use</Link>
            </li>
            <li className="text-muted-foreground hover:underline">
              <Link to="/privacy-policy">Privacy Policy</Link>
            </li>
            <li className="text-muted-foreground hover:underline">
              <Link to="/cookie-policy">Cookie Policy</Link>
            </li>
          </ul>
        </div>
      </div>

      <hr className="border-muted" />

      <div className="flex flex-col gap-6 text-center lg:flex-row lg:justify-between">
        <p>
          Made with <span className="text-yellow-500">&hearts;</span> at Dawan
        </p>
        <p className="text-muted-foreground">
          This product uses the TMDB API but is not endorsed or certified by{' '}
          <a
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:underline font-bold"
          >
            TMDB
          </a>
          .
        </p>
        <div className="inline-flex items-center gap-4 mx-auto lg:mx-0">
          {theme === 'dark' ? (
            <img
              className="min-w-12 max-w-16 w-full aspect-square object-contain"
              src="/wikicine_logo.svg"
              alt="Wikiciné logo"
            />
          ) : (
            <img
              className="min-w-12 max-w-16 w-full aspect-square object-contain"
              src="/wikicine_logo_dark.svg"
              alt="Wikiciné logo"
            />
          )}
          <img
            className="min-w-9 max-w-12 w-full aspect-square object-contain"
            src="https://www.dawan.fr/media/image/dawan-logo.svg"
            alt="Dawan logo"
          />
          <img
            className="min-w-9 max-w-32 w-full"
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
            alt="The Movie DB logo"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
