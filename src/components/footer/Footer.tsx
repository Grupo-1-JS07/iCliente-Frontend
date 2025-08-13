import { GithubLogoIcon } from '@phosphor-icons/react';

function Footer() {
  const data = new Date().getFullYear();
  return (
    <footer className="w-full bg-gradient-to-r from-[#0f0026] via-[#1a0a3c] to-[#0a0026] text-cyan-100 shadow-inner py-4 mt-8">
      <div className="container mx-auto flex flex-col items-center gap-2">
        <div className="flex items-center gap-2 mb-1">
          <img
            src="/baixados.png"
            alt="Logo iCliente"
            className="w-8 h-8 drop-shadow-[0_2px_10px_rgba(0,255,255,0.7)] select-none"
            draggable="false"
          />
          <span className="text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 tracking-widest">
            iCliente
          </span>
        </div>
        <p className="text-base font-bold">
          &copy; {data} iCliente. Todos os direitos reservados.
        </p>
        <p className="text-sm">Acesse nossas redes sociais:</p>
        <div className="flex gap-3 mt-1">
          <a
            href="https://github.com/Grupo-1-JS07/iCliente-Frontend"
            target="_blank"
            rel="noopener noreferrer"
            className="neon-link"
          >
            <GithubLogoIcon size={36} weight="bold" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
