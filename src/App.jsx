import { useEffect, useRef } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Cookie, Heart, MapPin, MessageCircle, Navigation, Phone, ShoppingBag, Truck, Wheat } from 'lucide-react';
import { business, directionsUrl, ratingText, whatsappUrl } from './data/business.js';
import Header from './components/Header.jsx';
import { Brand, Button, Eyebrow, Photo, Stars, TextLink, WhatsAppButton, WhatsAppIcon } from './components/ui.jsx';

function useScrollReveal(root) {
  useEffect(() => {
    const elements = root.current?.querySelectorAll('[data-reveal]') ?? [];
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let observer;
    const refresh = () => {
      observer?.disconnect();
      elements.forEach((element) => element.classList.remove('reveal-ready'));
      if (preference.matches) return;
      observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
      }), { threshold: 0.08 });
      elements.forEach((element) => {
        if (element.getBoundingClientRect().top > window.innerHeight) element.classList.add('reveal-ready');
        observer.observe(element);
      });
    };
    refresh();
    preference.addEventListener('change', refresh);
    return () => { observer?.disconnect(); preference.removeEventListener('change', refresh); };
  }, [root]);
}

function Hero() {
  return <section id="home" className="hero container" aria-labelledby="hero-title" tabIndex={-1}>
    <div className="hero-copy">
      <Eyebrow>A warm welcome from Maggona</Eyebrow>
      <h1 id="hero-title" aria-label={business.hero.headline}>A Little <em>Sweetness,</em><br />Made for<br className="desktop-break" /> Your Day.</h1>
      <p className="hero-description">{business.hero.description}</p>
      <div className="hero-actions flex flex-wrap gap-3">
        <Button href="#treats">Explore Our Treats<ArrowUpRight size={18} aria-hidden="true" /></Button>
        <WhatsAppButton variant="outline" />
      </div>
      <div className="service-badges flex flex-wrap items-center gap-x-6 gap-y-3">
        <span><ShoppingBag size={16} aria-hidden="true" />{business.services[0]}</span>
        <span><Truck size={18} aria-hidden="true" />{business.services[1]}</span>
      </div>
      <div className="hero-rating"><span className="rating-number">{business.rating.value.toFixed(1)}</span><div><Stars /><p>From {business.rating.count} Google reviews</p></div><span className="rating-divider" /><span className="rating-note">A little love from<br />our customers.</span></div>
    </div>
    <div className="hero-visual">
      <div className="hero-photo-wrap"><Photo name="hero" priority sizes="(max-width: 767px) 92vw, 50vw" className="hero-photo" /><span className="image-label">Illustrative bakery image</span></div>
      <div className="sweet-seal" aria-hidden="true"><Wheat size={23} strokeWidth={1.15} /><span>A LITTLE<br /><b>sweet</b><br />ESCAPE</span></div>
      <div className="hero-note"><span className="hero-note-icon"><Cookie size={30} strokeWidth={1.2} /></span><div><p>Good days start</p><span>with something sweet.</span></div><Heart size={19} strokeWidth={1.2} className="note-heart" aria-hidden="true" /></div>
      <span className="hero-sparkle" aria-hidden="true">✳</span>
    </div>
    <a href="#treats" className="hero-scroll"><span>SCROLL FOR SOMETHING SWEET</span><ArrowDown size={15} aria-hidden="true" /></a>
  </section>;
}

function ProductCard({ product, index }) {
  return <article className="product-card" data-reveal>
    <a href={whatsappUrl(product.name)} target="_blank" rel="noopener noreferrer" className="product-image-link" aria-label={`Enquire about ${product.name} on WhatsApp`}>
      <Photo name={product.image} className="product-image" />
      <span className="product-number" aria-hidden="true">0{index + 1}</span><span className="product-image-arrow"><ArrowUpRight size={21} aria-hidden="true" /></span>
    </a>
    <p className="product-category">{product.category}</p>
    <h3>{product.name}</h3>
    <p className="product-description">{product.description}</p>
    <a href={whatsappUrl(product.name)} target="_blank" rel="noopener noreferrer" className="product-enquiry" aria-label={`Enquire on WhatsApp about ${product.name}`}><WhatsAppIcon size={18} /><span>Enquire on WhatsApp</span><ArrowUpRight size={17} aria-hidden="true" /></a>
  </article>;
}

function Treats() {
  return <section id="treats" className="treats-section section-space" aria-labelledby="treats-title" tabIndex={-1}>
    <div className="container">
      <div className="section-heading-row" data-reveal><div><Eyebrow>Our treats</Eyebrow><h2 id="treats-title">Pick your little <em>happiness.</em></h2></div><p>For a quiet cup of tea.<br />For a table full of your favourite people.</p></div>
      <div className="products-grid">{business.products.map((product, index) => <ProductCard product={product} index={index} key={product.id} />)}</div>
      <p className="photo-disclosure">{business.imagery.disclosure}</p>
    </div>
  </section>;
}

function About() {
  return <section id="about" className="about-section section-space" aria-labelledby="about-title" tabIndex={-1}>
    <div className="container about-grid">
      <div className="about-visual" data-reveal><Photo name="cookies" sizes="(max-width: 767px) 92vw, 45vw" className="about-photo" /><span className="image-label">Illustrative bakery image</span><div className="about-location"><MapPin size={23} strokeWidth={1.3} aria-hidden="true" /><span>A little sweetness,<br /><strong>right here in Maggona.</strong></span></div></div>
      <div className="about-copy" data-reveal><Eyebrow>Meet your local bakery</Eyebrow><h2 id="about-title">A sweet little corner<br />of <em>Maggona.</em></h2>{business.about.paragraphs.map((text) => <p className="body-copy" key={text}>{text}</p>)}<div className="about-services"><span><Cookie size={22} strokeWidth={1.3} aria-hidden="true" />Biscuits & cakes</span><span><Heart size={22} strokeWidth={1.3} aria-hidden="true" />Moments to share</span></div><TextLink href="#contact">Come say hello</TextLink></div>
    </div>
  </section>;
}

function Reviews() {
  return <section id="reviews" className="reviews-section section-space" aria-labelledby="reviews-title" tabIndex={-1}>
    <div className="container"><div className="center-heading" data-reveal><Eyebrow>Kind words, happy hearts</Eyebrow><h2 id="reviews-title">Sweet words from <em>you.</em></h2><div className="review-summary"><Stars /><p>{ratingText()}</p></div></div>
      <div className="reviews-grid">{business.reviews.map((review) => <figure className="review-card" key={review.name} data-reveal><span className="quote-mark" aria-hidden="true">“</span><Stars /><blockquote>“{review.text}”</blockquote><figcaption><span className="review-avatar" aria-hidden="true">{review.initials}</span><span><strong>{review.name}</strong><span className="review-source">Google review</span></span><span className="google-mark" aria-label="Google">G</span></figcaption></figure>)}</div>
      <p className="review-source-note">Rating and review excerpts from the supplied Google listing.</p>
    </div>
  </section>;
}

const orderIcons = { cookie: Cookie, message: MessageCircle, bag: ShoppingBag };

function HowToOrder() {
  return <section id="how-to-order" className="order-section section-space" aria-labelledby="order-title" tabIndex={-1}>
    <div className="container"><div className="center-heading" data-reveal><Eyebrow>From a little craving to a lovely moment</Eyebrow><h2 id="order-title">Something sweet is<br />just a <em>message away.</em></h2></div>
      <ol className="order-steps">{business.orderSteps.map((step, index) => { const Icon = orderIcons[step.icon]; return <li key={step.title} data-reveal><div className="step-icon"><Icon size={30} strokeWidth={1.25} aria-hidden="true" /><span>0{index + 1}</span></div><h3>{step.title}</h3><p>{step.description}</p>{index < 2 ? <ArrowRight className="step-arrow" size={24} strokeWidth={1} aria-hidden="true" /> : null}</li>; })}</ol>
      <div className="text-center" data-reveal><WhatsAppButton variant="cream">Let’s talk treats</WhatsAppButton><p className="order-footnote">Options, prices, and availability are confirmed by the bakery.</p></div>
    </div>
  </section>;
}

function Contact() {
  return <section id="contact" className="contact-section section-space" aria-labelledby="contact-title" tabIndex={-1}>
    <div className="container contact-grid"><div className="contact-copy" data-reveal><Eyebrow>We’d love to hear from you</Eyebrow><h2 id="contact-title">Let’s make your day<br />a little <em>sweeter.</em></h2><p className="body-copy">Planning a little treat or something to share? Give us a call or send a message. We’ll help you take it from there.</p><div className="contact-details"><div><MapPin size={21} strokeWidth={1.5} aria-hidden="true" /><div><span className="detail-label">Find us in Maggona</span><address>{business.address}</address></div></div><div><Phone size={20} strokeWidth={1.5} aria-hidden="true" /><div><span className="detail-label">Give us a call</span><a href={business.phoneHref} className="phone-link">{business.phoneDisplay}</a></div></div></div><div className="flex flex-wrap gap-3"><WhatsAppButton>WhatsApp Us</WhatsAppButton><Button href={business.phoneHref} variant="outline"><Phone size={17} aria-hidden="true" />Call Now</Button></div></div>
      <div className="location-panel" data-reveal><div className="location-top"><span className="eyebrow">Your next sweet stop</span><ArrowUpRight size={21} aria-hidden="true" /></div><div className="location-art" aria-hidden="true"><span className="location-ring ring-one" /><span className="location-ring ring-two" /><span className="location-ring ring-three" /><div className="location-pin"><MapPin size={42} strokeWidth={1.1} /></div><span className="location-dot dot-one" /><span className="location-dot dot-two" /><span className="location-spark">✳</span></div><p className="location-name">Maggona, <em>Sri Lanka.</em></p><p className="location-address">{business.address}</p><Button href={directionsUrl()} external variant="outline" className="directions-button"><Navigation size={16} aria-hidden="true" />Get Directions<ArrowUpRight size={16} aria-hidden="true" /></Button><span className="location-note">Opens a business search in Google Maps</span></div>
    </div>
  </section>;
}

function Footer() {
  return <footer className="site-footer"><div className="container"><div className="footer-main"><div className="footer-brand"><Brand light /><p>A little sweetness, made for your day.</p></div><nav aria-label="Footer navigation"><span className="footer-label">A little look around</span>{business.navigation.filter(({ id }) => id !== 'home').map(({ id, label }) => <a key={id} href={`#${id}`}>{label}</a>)}</nav><div className="footer-contact"><span className="footer-label">Come say hello</span><address>{business.address}</address><a href={business.phoneHref}>{business.phoneDisplay}<ArrowUpRight size={15} aria-hidden="true" /></a><a href={whatsappUrl()} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={17} />Message on WhatsApp</a></div></div><div className="footer-bottom"><p>© {new Date().getFullYear()} {business.name}. All rights reserved.</p><details className="photo-credits"><summary>About the images</summary><p>{business.imagery.credit}</p></details><a href="#home" className="back-top">Back to top<ArrowUpRight size={15} aria-hidden="true" /></a></div></div></footer>;
}

export default function App() {
  const root = useRef(null);
  useScrollReveal(root);
  return <div ref={root}><Header /><main id="main" tabIndex={-1}><Hero /><Treats /><About /><Reviews /><HowToOrder /><Contact /></main><Footer /><a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="floating-whatsapp" aria-label="Chat with the bakery on WhatsApp"><WhatsAppIcon size={25} /><span className="floating-label">Let’s talk treats</span></a></div>;
}
