function Footer() {
  return (
    <footer className='border-t border-dark-border py-6 mt-12 text-center text-xs text-slate-500'>
      <div className='container mx-auto px-4'>
        <p>My Blog &copy; {new Date().getFullYear()}. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
