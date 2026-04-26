import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import featuredRoast from "@/assets/featured-roast.png";
import lightBeans from "@/assets/light_beans.png";
import mediumBeans from "@/assets/medium_beans.png";
import darkBeans from "@/assets/dark_beans.png";
import { Minus, Plus, ShoppingBag, Truck, Leaf, Award } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ───────── PRODUCT DATA ───────── */
const PRODUCTS = [
  {
    id: "byron-blend",
    name: "The Byron Blend",
    tagline: "Our signature house blend",
    description: "Developed for the slow mornings of the Northern Rivers. Smooth enough for a flat white, bold enough for a long black. Notes of caramel, macadamia, and dark chocolate with a velvety finish.",
    origin: "PNG & Atherton Tablelands",
    roast: "Medium",
    process: "Washed / Natural blend",
    tasting: "Caramel · Macadamia · Dark Chocolate",
    image: featuredRoast,
    sizes: [
      { weight: "250g", price: 22 },
      { weight: "500g", price: 38 },
      { weight: "1kg", price: 68 },
    ],
    featured: true,
  },
  {
    id: "sunrise-light",
    name: "Sunrise Light",
    tagline: "Bright & floral single origin",
    description: "A washed Ethiopian Yirgacheffe that sparkles with jasmine, bergamot and stone fruit. Best brewed as a V60 or AeroPress to let the delicate florals sing.",
    origin: "Ethiopia, Yirgacheffe",
    roast: "Light",
    process: "Washed",
    tasting: "Jasmine · Bergamot · Peach",
    image: lightBeans,
    sizes: [
      { weight: "250g", price: 24 },
      { weight: "500g", price: 42 },
      { weight: "1kg", price: 74 },
    ],
    featured: false,
  },
  {
    id: "headland-dark",
    name: "Headland Dark",
    tagline: "Bold & smoky for espresso lovers",
    description: "Our darkest roast — a Sumatran Mandheling that rumbles with smoky cacao, cedar and molasses. Designed for those who take their coffee seriously and their mornings slow.",
    origin: "Sumatra, Mandheling",
    roast: "Dark",
    process: "Wet-hulled",
    tasting: "Smoky Cacao · Cedar · Molasses",
    image: darkBeans,
    sizes: [
      { weight: "250g", price: 23 },
      { weight: "500g", price: 40 },
      { weight: "1kg", price: 70 },
    ],
    featured: false,
  },
  {
    id: "coastal-decaf",
    name: "Coastal Decaf",
    tagline: "All the flavour, none of the buzz",
    description: "Swiss Water Process decaf from Colombia. Sweet, clean, and surprisingly complex with notes of brown sugar, almond and dried apricot. Perfect for evening flat whites.",
    origin: "Colombia, Huila",
    roast: "Medium",
    process: "Swiss Water Decaf",
    tasting: "Brown Sugar · Almond · Apricot",
    image: mediumBeans,
    sizes: [
      { weight: "250g", price: 24 },
      { weight: "500g", price: 42 },
      { weight: "1kg", price: 74 },
    ],
    featured: false,
  },
];

const GRIND_OPTIONS = ["Whole Bean", "Espresso", "Filter", "Plunger", "Stovetop"];

/* ───────── PRODUCT CARD ───────── */
const ProductCard = ({ product, onAddToCart, index }) => {
  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedGrind, setSelectedGrind] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart({
      ...product,
      size: product.sizes[selectedSize],
      grind: GRIND_OPTIONS[selectedGrind],
      quantity,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className={`product-card grid md:grid-cols-2 gap-10 md:gap-16 items-center ${index % 2 === 1 ? "md:direction-rtl" : ""}`}>
      {/* Image */}
      <div className={`relative overflow-hidden rounded-sm shadow-2xl ${index % 2 === 1 ? "md:order-2" : ""}`}>
        <div className="aspect-square">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>
        {product.featured && (
          <div className="absolute top-4 left-4 bg-clay text-cream px-3 py-1 text-[10px] uppercase tracking-[0.3em]">
            Signature
          </div>
        )}
      </div>

      {/* Details */}
      <div className={index % 2 === 1 ? "md:order-1" : ""}>
        <p className="text-[10px] uppercase tracking-[0.4em] text-clay mb-3">{product.tagline}</p>
        <h2 className="font-display font-light text-4xl md:text-5xl leading-[1.05] mb-6">{product.name}</h2>
        <p className="text-cream/65 leading-relaxed mb-8 max-w-md">{product.description}</p>

        {/* Details grid */}
        <div className="grid grid-cols-2 gap-4 mb-8 border-y border-cream/10 py-6">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-clay mb-1">Origin</p>
            <p className="font-display text-lg">{product.origin}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-clay mb-1">Roast</p>
            <p className="font-display text-lg">{product.roast}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-clay mb-1">Process</p>
            <p className="font-display text-lg">{product.process}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-clay mb-1">Tasting Notes</p>
            <p className="font-display text-lg">{product.tasting}</p>
          </div>
        </div>

        {/* Size selector */}
        <div className="mb-6">
          <p className="text-[10px] uppercase tracking-widest text-cream/50 mb-3">Size</p>
          <div className="flex gap-3">
            {product.sizes.map((s, i) => (
              <button
                key={s.weight}
                onClick={() => setSelectedSize(i)}
                className={`px-5 py-2.5 text-sm border transition-all duration-300 ${
                  selectedSize === i
                    ? "bg-cream text-espresso border-cream"
                    : "border-cream/20 text-cream/70 hover:border-cream/50"
                }`}
              >
                {s.weight}
              </button>
            ))}
          </div>
        </div>

        {/* Grind selector */}
        <div className="mb-8">
          <p className="text-[10px] uppercase tracking-widest text-cream/50 mb-3">Grind</p>
          <div className="flex flex-wrap gap-2">
            {GRIND_OPTIONS.map((g, i) => (
              <button
                key={g}
                onClick={() => setSelectedGrind(i)}
                className={`px-4 py-2 text-xs uppercase tracking-widest border transition-all duration-300 ${
                  selectedGrind === i
                    ? "bg-clay text-cream border-clay"
                    : "border-cream/15 text-cream/60 hover:border-cream/40"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity + Add to Cart */}
        <div className="flex items-center gap-6">
          <div className="flex items-center border border-cream/20">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-3 text-cream/60 hover:text-cream transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-4 py-3 font-display text-lg min-w-[3rem] text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-3 py-3 text-cream/60 hover:text-cream transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={handleAdd}
            className={`flex-1 inline-flex items-center justify-center gap-3 py-4 text-sm uppercase tracking-[0.25em] transition-all duration-500 ${
              added
                ? "bg-green-700 text-cream"
                : "bg-cream text-espresso hover:bg-clay hover:text-cream"
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            {added ? "Added ✓" : `Add to Cart — $${(product.sizes[selectedSize].price * quantity).toFixed(2)}`}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ───────── SHOP PAGE ───────── */
const Shop = () => {
  const root = useRef(null);
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.size.price * item.quantity, 0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.from(".shop-hero-eyebrow", { y: 30, opacity: 0, duration: 0.8, delay: 0.3, ease: "power4.out" });
      gsap.from(".shop-hero-title span", { y: 80, opacity: 0, duration: 1.2, stagger: 0.12, ease: "power4.out", delay: 0.5 });
      gsap.from(".shop-hero-sub", { y: 20, opacity: 0, duration: 0.8, delay: 1, ease: "power3.out" });
      gsap.from(".shop-feature", { y: 30, opacity: 0, stagger: 0.1, duration: 0.8, delay: 1.2, ease: "power3.out" });

      // Product cards
      gsap.utils.toArray(".product-card").forEach((el) => {
        gsap.from(el, {
          y: 80,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div ref={root} className="min-h-screen bg-espresso text-cream overflow-x-hidden">
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 px-6 md:px-12 py-4 flex items-center justify-between text-cream bg-espresso/80 backdrop-blur-md border-b border-cream/10 transition-all duration-500">
        <Link to="/" className="font-display text-xl tracking-tight">
          Café<span className="text-clay">.</span>&nbsp;Élite
        </Link>
        <nav className="hidden md:flex items-center gap-10 text-xs uppercase tracking-[0.2em]">
          <Link to="/#story" className="hover:text-clay transition-colors">Story</Link>
          <Link to="/menu" className="hover:text-clay transition-colors">Menu</Link>
          <Link to="/#process" className="hover:text-clay transition-colors">Craft</Link>
          <Link to="/#voices" className="hover:text-clay transition-colors">Voices</Link>
          <Link to="/#visit" className="hover:text-clay transition-colors">Visit</Link>
        </nav>
        <div className="flex items-center gap-6">
          {cart.length > 0 && (
            <div className="relative text-xs uppercase tracking-[0.2em] text-cream/70">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-2 bg-clay text-cream text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            </div>
          )}
          <Link to="/#visit" className="text-xs uppercase tracking-[0.2em] border border-current px-4 py-2 hover:bg-cream hover:text-espresso transition-colors">
            Find Us
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="relative pt-32 pb-16 md:pt-44 md:pb-24 px-6 md:px-12 grain">
        <div className="max-w-[1400px] mx-auto">
          <p className="shop-hero-eyebrow text-xs uppercase tracking-[0.35em] text-clay mb-6">Small Batch Roastery</p>
          <h1 className="font-display font-light text-6xl md:text-8xl leading-[1.02] mb-8 max-w-4xl text-balance">
            <span className="block overflow-hidden"><span className="inline-block">Buy the</span></span>
            <span className="block overflow-hidden -mt-2"><span className="inline-block italic text-clay">bag.</span></span>
          </h1>
          <p className="shop-hero-sub text-lg text-cream/70 max-w-lg leading-relaxed mb-12">
            Roasted weekly in small batches on our 12kg drum. Shipped fresh to your door within 48 hours of roasting.
          </p>

          {/* Feature badges */}
          <div className="flex flex-wrap gap-6 md:gap-10">
            {[
              { icon: <Truck className="w-5 h-5" />, text: "Free shipping over $50" },
              { icon: <Leaf className="w-5 h-5" />, text: "Direct trade sourced" },
              { icon: <Award className="w-5 h-5" />, text: "Roasted to order" },
            ].map((f) => (
              <div key={f.text} className="shop-feature flex items-center gap-3 text-sm text-cream/60">
                <span className="text-clay">{f.icon}</span>
                {f.text}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 h-px bg-cream/15 max-w-[1400px] mx-auto" />
      </section>

      {/* PRODUCTS */}
      <section className="px-6 md:px-12 pb-24 md:pb-40 grain">
        <div className="max-w-[1400px] mx-auto space-y-24 md:space-y-36">
          {PRODUCTS.map((product, idx) => (
            <ProductCard key={product.id} product={product} onAddToCart={addToCart} index={idx} />
          ))}
        </div>
      </section>

      {/* SUBSCRIPTION CTA */}
      <section className="bg-cream text-espresso py-20 md:py-28 px-6 md:px-12 grain">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-clay mb-6">Subscribe & Save</p>
            <h2 className="font-display font-light text-4xl md:text-6xl leading-[1.05] mb-6 text-balance">
              Never run out of <span className="italic text-clay">good coffee.</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-md">
              Set up a recurring order and save 15% on every bag. Choose your roast, grind and frequency — we'll handle the rest. Pause or cancel anytime.
            </p>
            <div className="space-y-4">
              {["Delivery every 2, 3 or 4 weeks", "15% off every order", "Free shipping always", "Swap roasts anytime"].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-clay shrink-0" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center md:text-right">
            <p className="font-display text-8xl md:text-9xl text-clay/20 font-light leading-none">15%</p>
            <p className="font-display text-3xl mt-4">off every bag</p>
            <p className="text-muted-foreground mt-2 mb-8">when you subscribe</p>
            <button className="inline-flex items-center gap-3 bg-espresso text-cream px-8 py-4 text-sm uppercase tracking-[0.25em] hover:bg-clay transition-colors duration-500">
              Start a subscription →
            </button>
          </div>
        </div>
      </section>

      {/* BOTTOM NAV */}
      <section className="bg-espresso text-cream py-16 px-6 md:px-12 grain border-t border-cream/10">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <Link
            to="/"
            className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.25em] text-cream/60 hover:text-clay transition-colors"
          >
            ← Back to Café Élite
          </Link>
          <Link
            to="/menu"
            className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.25em] border border-cream/30 px-8 py-4 hover:bg-cream hover:text-espresso transition-colors duration-500"
          >
            See the menu →
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-espresso text-cream/60 py-10 px-6 md:px-12 border-t border-cream/10">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs uppercase tracking-[0.25em]">
          <p className="font-display text-2xl text-cream normal-case tracking-tight">
            Café<span className="text-clay">.</span>&nbsp;Élite
          </p>
          <p>© {new Date().getFullYear()} — Made with flat whites in Byron Bay</p>
        </div>
      </footer>
    </div>
  );
};

export default Shop;
