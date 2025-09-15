import nextupLogo from "@/assets/nextup-logo.png";

const Header = () => {
  return (
    <header className="relative overflow-hidden">
      <div className="hero-gradient py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <img 
              src={nextupLogo} 
              alt="Nextup Tools Logo" 
              className="w-16 h-16 rounded-2xl shadow-lg"
            />
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                Nextup Tools
              </h1>
              <p className="text-xl text-white/90 font-medium">
                All Webtools in One Place
              </p>
            </div>
          </div>
          
          <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            Professional web tools for developers, designers, and creators. 
            Fast, reliable, and always free to use.
          </p>
        </div>
      </div>
      
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary-glow/20 pointer-events-none" />
    </header>
  );
};

export default Header;