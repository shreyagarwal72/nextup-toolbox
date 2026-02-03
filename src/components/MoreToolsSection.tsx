import { ExternalLink, ArrowRight, Sparkles } from "lucide-react";

const MoreToolsSection = () => {
  return (
    <section className="container mx-auto px-4 py-12">
      <a 
        href="https://nextuptool2.vercel.app" 
        target="_blank" 
        rel="noopener noreferrer"
        className="block"
      >
        <div className="more-tools-card group cursor-pointer hover:scale-[1.01] transition-transform duration-500">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Content */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-white/80" />
                <span className="text-white/80 text-sm font-medium uppercase tracking-wider">
                  Discover More
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Explore More Tools
              </h3>
              <p className="text-white/80 max-w-md">
                Image tools, converters, formatters, and much more. 
                Visit our extended toolkit for additional utilities.
              </p>
            </div>
            
            {/* CTA */}
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 group-hover:bg-white/20 transition-colors duration-300">
              <span className="text-white font-semibold">Visit Nextup Tools 2</span>
              <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </a>
    </section>
  );
};

export default MoreToolsSection;
