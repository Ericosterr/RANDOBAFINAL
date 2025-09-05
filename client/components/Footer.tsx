import { Link } from "react-router-dom";
import { Music } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export function Footer() {
  const { language } = useLanguage();
  const isEs = language === "es";

  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center mb-4">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F1bb0735706c241e9b62c93ae763e081d%2F3a207f81af8d4572b2e13f02fbdd85f3?format=webp&width=800"
                alt="RANDOBA Logo"
                className="h-8 w-auto filter invert"
              />
            </Link>
            <p className="text-gray-400 mb-4 max-w-md">
              {isEs
                ? "Domina el arte del DJ con cursos profesionales impartidos por expertos de la industria. Reserva eventos exclusivos y eleva tu trayectoria musical."
                : "Master the art of DJing with professional courses from industry experts. Book exclusive events and elevate your music journey."}
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/randoba_marbella?igsh=MWhwdTZyc212a3lkeg=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-400 transition-colors"
              >
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F33a10b8b72914eabaac30eb18944f9db%2F76ef6462a59f40a2b6724edc9915a8b2?format=webp&width=800"
                  alt="Instagram"
                  className="w-5 h-5"
                />
              </a>
              <a
                href="https://open.spotify.com/user/313qjwwp4i7f4feqkmmgl4h7ossi?si=3ryRCefYQneOzeLjBRPlKQ"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-400 transition-colors"
              >
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F33a10b8b72914eabaac30eb18944f9db%2F5460e2b2ea964d06827cfa98f9ab3b14?format=webp&width=800"
                  alt="Spotify"
                  className="w-5 h-5"
                />
              </a>
              <a
                href="https://m.soundcloud.com/randoba"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange-400 transition-colors"
              >
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F33a10b8b72914eabaac30eb18944f9db%2Fed0b6ee1d56041088f525e7713d9b61b?format=webp&width=800"
                  alt="SoundCloud"
                  className="w-5 h-5"
                />
              </a>
              <a
                href="https://youtube.com/@randoba?si=ZVioI4Xk12-ijE0-"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-400 transition-colors"
              >
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F33a10b8b72914eabaac30eb18944f9db%2F936c2dff1cd44b47becd3952ab43aa6c?format=webp&width=800"
                  alt="YouTube"
                  className="w-5 h-5"
                />
              </a>
              <a
                href="https://www.tiktok.com/@randobamarbella?_t=ZN-8zN5K28VFji&_r=1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#6efff8] transition-colors"
              >
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F9ae4f8bb777b484ea86c90bc465c2232%2Fe074263f22094f828a12c86b4ab67d8d?format=webp&width=800"
                  alt="TikTok"
                  className="w-5 h-5"
                />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              {isEs ? "Formación" : "Learn"}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/courses"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {isEs ? "Cursos de DJ" : "DJ Courses"}
                </Link>
              </li>
              <li>
                <Link
                  to="/playlists"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {isEs ? "Listas de reproducción" : "Sample Playlists"}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              {isEs ? "Eventos" : "Events"}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/events"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {isEs ? "Próximos eventos" : "Upcoming Events"}
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {isEs ? "Reservas privadas" : "Private Bookings"}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {isEs ? "Eventos corporativos" : "Corporate Events"}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              {isEs ? "© 2025 RANDOBA. Todos los derechos reservados." : "© 2025 RANDOBA. All rights reserved."}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                to="/privacy"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                {isEs ? "Política de privacidad" : "Privacy Policy"}
              </Link>
              <Link
                to="/terms"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                {isEs ? "Términos del servicio" : "Terms of Service"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
