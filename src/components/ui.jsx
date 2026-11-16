import { ArrowUpRight, Star, Wheat } from 'lucide-react';
import { business, whatsappUrl } from '../data/business.js';

export function WhatsAppIcon({ size = 20, ...props }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.45L3 20.5l1.34-4.85A8.5 8.5 0 1 1 20.5 11.7Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="m8.25 7.4 1.3 2.25-.8 1.1a7.4 7.4 0 0 0 3.9 3.45l.9-.95 2.25 1.1c.1 1.5-1.1 2.15-2.35 1.9-3.45-.7-6.5-3.7-7-6.25-.2-1.25.6-2.6 1.8-2.6Z" fill="currentColor" />
  </svg>;
}

export function Brand({ light = false, onClick }) {
  return <a href="#home" className={`brand ${light ? 'brand-light' : ''}`} aria-label={`${business.name} — home`} onClick={onClick}>
    <Wheat size={36} strokeWidth={1.15} aria-hidden="true" className="brand-wheat" />
    <span><span className="brand-name">{business.shortName}</span><span className="brand-subtitle">BISCUITS & CAKE</span></span>
  </a>;
}

export function Button({ href, children, variant = 'primary', className = '', external = false, ...props }) {
  return <a href={href} className={`button button-${variant} ${className}`} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...props}>{children}</a>;
}

export function WhatsAppButton({ children = 'Order on WhatsApp', product, variant = 'primary', className = '', ...props }) {
  return <Button href={whatsappUrl(product)} external variant={variant} className={className} {...props}><WhatsAppIcon /><span>{children}</span></Button>;
}

export function Stars({ className = '' }) {
  return <span className={`stars ${className}`} aria-hidden="true">{Array.from({ length: 5 }, (_, i) => <Star key={i} size={15} fill="currentColor" strokeWidth={0} />)}</span>;
}

export function Photo({ name, className = '', priority = false, sizes = '(max-width: 767px) 92vw, 33vw' }) {
  const photo = business.imagery.photos[name];
  return <img src={photo.src} srcSet={`${photo.src.replace('.webp', '-640.webp')} 640w, ${photo.src} ${photo.width}w`} sizes={sizes} alt={photo.alt} width={photo.width} height={photo.height} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding="async" className={className} />;
}

export function Eyebrow({ children, className = '' }) {
  return <p className={`eyebrow ${className}`}><span className="eyebrow-line" aria-hidden="true" />{children}</p>;
}

export function TextLink({ href, children, external = false, className = '', ...props }) {
  return <a href={href} className={`text-link ${className}`} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...props}>{children}<ArrowUpRight size={18} aria-hidden="true" /></a>;
}
