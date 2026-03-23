export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#090e1c] py-8 border-t border-[#1a1f2f]">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[#bbc9cf] text-sm">
          © {currentYear} Monu Rajput. All rights reserved.
        </p>

        <div className="flex items-center gap-6">
          <a
            href="https://github.com/monu8909"
            target="_blank"
            rel="noreferrer"
            className="text-[#bbc9cf] hover:text-[#00d4ff] text-sm transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/monu-rajput-2b3b55150/"
            target="_blank"
            rel="noreferrer"
            className="text-[#bbc9cf] hover:text-[#00d4ff] text-sm transition-colors"
          >
            LinkedIn
          </a>
         
        </div>
      </div>
    </footer>
  );
}
