const Footer = () => {
  return (
    <footer className="mt-20 py-12 border-t border-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-card-foreground mb-2">
            Nextup Tools
          </h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Professional web tools designed to boost your productivity. 
            Built with care by developers, for developers.
          </p>
        </div>
        
        <div className="border-t border-border pt-6">
          <p className="text-sm text-muted-foreground">
            &copy; 2025 <a 
              href="https://vanshubhai.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-medium text-primary hover:text-primary-glow transition-colors duration-300 cursor-pointer"
            >
              Nextup Studio
            </a> | All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;