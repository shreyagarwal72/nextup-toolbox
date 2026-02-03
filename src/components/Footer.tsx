const Footer = () => {
  return (
    <footer className="mt-12 py-8 border-t border-border/50">
      <div className="container mx-auto px-4 text-center">
        <div className="glass-card inline-block px-8 py-6 mx-auto">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Nextup Tools
          </h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto mb-4">
            Professional web tools designed to boost your productivity. 
            Built with care by developers, for developers.
          </p>
          
          <div className="pt-4 border-t border-border/30">
            <p className="text-xs text-muted-foreground">
              © 2025{" "}
              <a 
                href="https://vanshubhai.vercel.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-medium text-primary hover:text-primary-dark transition-colors duration-300"
              >
                Nextup Studio
              </a>
              {" "}| All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
