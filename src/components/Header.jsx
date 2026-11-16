import { useEffect, useRef, useState } from 'react';
import { MapPin, Menu, X } from 'lucide-react';
import { business } from '../data/business.js';
import { Brand, WhatsAppButton } from './ui.jsx';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  const headerRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
    }, { rootMargin: '-12% 0px -70% 0px' });
    business.navigation.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)');
    const closeForDesktop = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener('change', closeForDesktop);
    return () => desktop.removeEventListener('change', closeForDesktop);
  }, []);

  useEffect(() => {
    if (!open) return;
    const escape = (event) => {
      if (event.key === 'Escape') { setOpen(false); toggleRef.current?.focus(); }
    };
    const outside = (event) => { if (!headerRef.current?.contains(event.target)) setOpen(false); };
    document.addEventListener('keydown', escape);
    document.addEventListener('pointerdown', outside);
    return () => {
      document.removeEventListener('keydown', escape);
      document.removeEventListener('pointerdown', outside);
    };
  }, [open]);

  const navigate = (id) => { setActive(id); setOpen(false); };
  const links = business.navigation.map(({ id, label }) => <a key={id} href={`#${id}`} className={active === id ? 'nav-link is-active' : 'nav-link'} aria-current={active === id ? 'location' : undefined} onClick={() => navigate(id)}>{label}</a>);

  return <>
    <a href="#main" className="skip-link">Skip to content</a>
    <div className="topbar"><div className="container flex items-center justify-between gap-4"><span>Little treats. Lovely moments.</span><span className="flex items-center gap-2"><MapPin size={12} aria-hidden="true" />{business.location}</span></div></div>
    <header ref={headerRef} className="site-header">
      <div className="container header-inner">
        <Brand onClick={() => navigate('home')} />
        <nav aria-label="Main navigation" className="desktop-nav">{links}</nav>
        <WhatsAppButton className="header-order" />
        <button ref={toggleRef} type="button" className="menu-toggle" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen((value) => !value)}>{open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button>
      </div>
      <nav id="mobile-navigation" aria-label="Mobile navigation" className="mobile-nav" hidden={!open}>
        <div className="container flex flex-col">{links}<WhatsAppButton onClick={() => setOpen(false)} /></div>
      </nav>
    </header>
  </>;
}
