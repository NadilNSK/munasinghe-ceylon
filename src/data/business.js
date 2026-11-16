// Edit bakery information, products, reviews, and photography here.
// Details below come from the supplied brief; confirm them before public launch.
import { products } from './products.js';

export const business = {
  name: 'Munasinghe Ceylon Biscuits & Cake',
  shortName: 'Munasinghe Ceylon',
  location: 'Maggona, Sri Lanka',
  address: 'Susiri Niwasa, Elagawatta, Maggona, Sri Lanka',
  structuredAddress: { streetAddress: 'Susiri Niwasa, Elagawatta', addressLocality: 'Maggona', addressCountry: 'LK' },
  phoneDisplay: '072 400 9414',
  phoneHref: 'tel:+94724009414',
  whatsapp: 'https://wa.me/94724009414',
  defaultMessage: 'Hello! I would like to enquire about your biscuits and cakes. Could you share the available options, prices, and availability?',
  services: ['Takeaway Available', 'Delivery Available'],
  rating: { value: 5.0, count: 6, source: 'Google', suppliedByOwner: true },
  navigation: [
    { label: 'Home', id: 'home' },
    { label: 'Our Treats', id: 'treats' },
    { label: 'About', id: 'about' },
    { label: 'Reviews', id: 'reviews' },
    { label: 'Contact', id: 'contact' },
  ],
  hero: {
    headline: 'A Little Sweetness, Made for Your Day.',
    description: 'Discover delicious biscuits and cakes from Munasinghe Ceylon in Maggona.',
  },
  about: {
    title: 'A sweet little corner of Maggona.',
    paragraphs: [
      'Welcome to Munasinghe Ceylon Biscuits & Cake, a local bakery in Maggona, Sri Lanka. From biscuits to cakes, there’s a little something to make your day sweeter.',
      'Whether it’s a treat for yourself or something to share, we’d love to hear from you. Get in touch to explore your options and arrange takeaway or delivery.',
    ],
  },
  products,
  reviews: [
    { name: 'Kanishka Jayaweera', initials: 'KJ', text: 'Excellent quality and absolutely delicious.' },
    { name: 'Gihan Munasinghe', initials: 'GM', text: 'Good quality and nice taste cookie and cake in kalutara' },
  ],
  orderSteps: [
    { title: 'Find your little treat', description: 'Explore our biscuits and cakes, and see what catches your eye.', icon: 'cookie' },
    { title: 'Say hello on WhatsApp', description: 'Message us to confirm options, prices, and availability.', icon: 'message' },
    { title: 'Make it a sweet day', description: 'Arrange takeaway or delivery directly with the bakery.', icon: 'bag' },
  ],
  imagery: {
    disclosure: 'Photos of our bakery’s treats. Message us to confirm current options and availability.',
    credit: 'AI-generated illustrative placeholders created for this website. They do not depict the bakery, its premises, or its actual products.',
    photos: {
      hero: { src: '/images/hero.webp', width: 1536, height: 1024, alt: 'Illustrative scene of golden butter cookies and a cream-topped pineapple cake on a warm wooden table.' },
      cookies: { src: '/images/cookies.webp', width: 1024, height: 768, alt: 'Illustrative butter cookies with golden piped swirls on a ceramic plate; not an actual product photograph.' },
      pineapple: { src: '/images/pineapple.webp', width: 1024, height: 768, alt: 'Illustrative pineapple cake with a slice served beside it; not an actual product photograph.' },
      cupcakes: { src: '/images/cupcakes.webp', width: 1024, height: 768, alt: 'Illustrative cupcakes with cream swirls in paper cases; not an actual product photograph.' },
    },
  },
  seo: {
    title: 'Munasinghe Ceylon Biscuits & Cake | Bakery in Maggona',
    description: 'Discover Butter Cookies, Pineapple Cake, and Cupcakes at Munasinghe Ceylon in Maggona, Sri Lanka. Enquire on WhatsApp and arrange takeaway or delivery.',
    siteUrl: 'https://munasinghe-ceylon-maggona.peachykoala256.chatgpt.site',
    socialImage: '/images/hero-social.jpg',
  },
};

export function whatsappUrl(productName) {
  const message = productName
    ? `Hello! I’m interested in your ${productName}. Could you please share the price, available sizes or quantities, and availability?`
    : business.defaultMessage;
  return `${business.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function directionsUrl() {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${business.name}, ${business.address}`)}`;
}

export function ratingText() {
  return `${business.rating.value.toFixed(1)} / 5 from ${business.rating.count} ${business.rating.source} reviews`;
}
