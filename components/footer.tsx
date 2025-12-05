export default function Footer() {
  return (
    <footer className="bg-black py-8">
      <div className="container max-w-6xl mx-auto flex flex-col lg:flex-row space-y-4 lg:space-y-0 justify-between items-center">
        <div className="flex justify-center space-x-4">
          <a href="https://commercn.com" className="text-primary">
            CommerCN
          </a>
          <a href="https://twitter.com/ariflogs" className="text-primary">
            Twitter
          </a>
          <a
            href="https://github.com/Logging-Stuff/retroui"
            className="text-primary"
          >
            GitHub
          </a>
          <a href="/docs" className="text-primary">
            Documentation
          </a>
        </div>

        <p className="text-gray-300 text-sm">
          Built by{" "}
          <a href="https://twitter.com/ariflogs" className="text-primary">
            Arif Hossain
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
