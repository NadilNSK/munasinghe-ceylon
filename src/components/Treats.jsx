import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from 'lucide-react';
import { business, whatsappUrl } from '../data/business.js';
import { Eyebrow, WhatsAppIcon } from './ui.jsx';
import './treats.css';

function ProductCard({ product, index, onOpenPhoto }) {
  const { photo } = product;
  const enquiry = whatsappUrl(product.name);
  return <article className="product-card" data-reveal>
    <div className="product-media">
      <button type="button" className="product-image-link" aria-label={`View full photo of ${product.name}`} aria-haspopup="dialog" onClick={(event) => onOpenPhoto(index, event.currentTarget)}>
        <img src={photo.src} srcSet={`${photo.smallSrc} ${photo.smallWidth}w, ${photo.src} ${photo.width}w`} sizes="(max-width: 767px) calc(100vw - 75px), (max-width: 1023px) calc((100vw - 115px) / 2), (max-width: 1199px) calc((100vw - 144px) / 3), 392px" width={photo.width} height={photo.height} alt={photo.alt} loading="lazy" decoding="async" className="product-image" style={{ objectPosition: photo.position }} />
        <span className="product-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
      </button>
      <a href={enquiry} target="_blank" rel="noopener noreferrer" className="product-image-arrow" aria-label={`Enquire about ${product.name} on WhatsApp`}><ArrowUpRight size={21} aria-hidden="true" /></a>
    </div>
    <p className="product-category">{product.category}</p>
    <h3>{product.name}</h3>
    <p className="product-description">{product.description}</p>
    <a href={enquiry} target="_blank" rel="noopener noreferrer" className="product-enquiry" aria-label={`Enquire on WhatsApp about ${product.name}`}><WhatsAppIcon size={18} /><span>Enquire on WhatsApp</span><ArrowUpRight size={17} aria-hidden="true" /></a>
  </article>;
}

function PhotoLightbox({ products, index, trigger, onChange, onClose }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const product = products[index];

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    closeRef.current?.focus({ preventScroll: true });
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (trigger?.isConnected) trigger.focus({ preventScroll: true });
    };
  }, [trigger]);

  const previous = () => onChange((index - 1 + products.length) % products.length);
  const next = () => onChange((index + 1) % products.length);
  const handleKey = (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === 'Tab') {
      const controls = dialogRef.current.querySelectorAll('button:not([disabled]), a[href]');
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      return;
    }
    if (event.key === 'ArrowLeft') { event.preventDefault(); previous(); }
    if (event.key === 'ArrowRight') { event.preventDefault(); next(); }
  };

  return <dialog ref={dialogRef} className="treats-lightbox" aria-modal="true" aria-labelledby="treats-photo-title" aria-describedby="treats-photo-help" onKeyDown={handleKey} onCancel={(event) => { event.preventDefault(); onClose(); }} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="treats-lightbox-content">
      <div className="treats-lightbox-header"><div><p className="eyebrow">A closer look</p><h3 id="treats-photo-title">{product.name}</h3></div><button ref={closeRef} type="button" className="treats-photo-control" aria-label="Close product photo" onClick={onClose}><X size={21} aria-hidden="true" /></button></div>
      <div className="treats-lightbox-photo"><img key={product.id} src={product.photo.src} width={product.photo.width} height={product.photo.height} alt={product.photo.alt} decoding="async" /></div>
      <div className="treats-lightbox-navigation"><button type="button" className="treats-photo-control" aria-label="Previous product photo" onClick={previous}><ArrowLeft size={20} aria-hidden="true" /></button><p role="status" aria-live="polite" aria-atomic="true"><span className="treats-sr-only">{product.name}, </span>Photo {index + 1} of {products.length}</p><button type="button" className="treats-photo-control" aria-label="Next product photo" onClick={next}><ArrowRight size={20} aria-hidden="true" /></button></div>
      <p id="treats-photo-help">Use the arrow keys to browse. Press Escape to close.</p>
    </div>
  </dialog>;
}

export default function Treats() {
  const [activeIndex, setActiveIndex] = useState(null);
  const triggerRef = useRef(null);
  const openPhoto = (index, trigger) => { triggerRef.current = trigger; setActiveIndex(index); };

  return <section id="treats" className="treats-section section-space" aria-labelledby="treats-title" tabIndex={-1}>
    <div className="container">
      <div className="section-heading-row" data-reveal><div><Eyebrow>Our treats</Eyebrow><h2 id="treats-title">Pick your little <em>happiness.</em></h2></div><p>For a quiet cup of tea.<br />For a table full of your favourite people.</p></div>
      <div className="products-grid">{business.products.map((product, index) => <ProductCard product={product} index={index} onOpenPhoto={openPhoto} key={product.id} />)}</div>
      <p className="photo-disclosure">{business.imagery.disclosure}</p>
    </div>
    {activeIndex !== null ? <PhotoLightbox products={business.products} index={activeIndex} trigger={triggerRef.current} onChange={setActiveIndex} onClose={() => setActiveIndex(null)} /> : null}
  </section>;
}
