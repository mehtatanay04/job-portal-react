function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 dark:bg-gray-900">
      <div className="container mx-auto px-4 text-center">
        <p>© {new Date().getFullYear()} Job Portal. All rights reserved.</p>
        <div className="mt-2 space-x-4">
          <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-accent transition-colors">Contact Us</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;