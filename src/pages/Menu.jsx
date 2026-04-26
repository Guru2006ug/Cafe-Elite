import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import menuCoffee from "@/assets/menu-coffee.jpg";
import menuBrunch from "@/assets/menu-brunch.jpg";
import menuPastry from "@/assets/menu-pastry.jpg";

gsap.registerPlugin(ScrollTrigger);

/* ───────── MENU DATA ───────── */
const MENU = [
  {
    category: "Espresso Bar",
    description: "All espresso pulled on our La Marzocco Linea PB with house-roasted beans.",
    items: [
      { name: "Espresso", desc: "Single origin, double shot.", price: "4.50" },
      { name: "Long Black", desc: "Double ristretto over hot water.", price: "5.00" },
      { name: "Flat White", desc: "House blend, double shot, silky textured milk.", price: "5.50" },
      { name: "Cappuccino", desc: "Velvety foam, dusted with raw cacao.", price: "5.50" },
      { name: "Latte", desc: "Smooth, creamy, classic.", price: "5.50" },
      { name: "Mocha", desc: "Single origin espresso with Callebaut dark chocolate.", price: "6.50" },
      { name: "Macchiato", desc: "A shot of espresso, a dash of foam.", price: "4.50" },
      { name: "Piccolo", desc: "Ristretto topped with warm textured milk.", price: "5.00" },
      { name: "Affogato", desc: "Double espresso poured over house-made vanilla gelato.", price: "8.00" },
    ],
  },
  {
    category: "Filter & Brew",
    description: "Slow-brewed for the patient. Ask your barista about today's single origin.",
    items: [
      { name: "V60 Pour Over", desc: "Hand-poured, single cup. Today's rotating origin.", price: "7.00" },
      { name: "AeroPress", desc: "Inverted method. Clean, bright, full-bodied.", price: "7.00" },
      { name: "Batch Brew", desc: "Always on. Today's seasonal blend, black.", price: "4.50" },
      { name: "Cold Brew", desc: "Steeped 18 hours. Served over ice.", price: "6.50" },
      { name: "Cold Drip", desc: "Kyoto-style slow drip. Limited batches.", price: "7.50" },
    ],
  },
  {
    category: "Non-Coffee",
    description: "For those mornings that don't start with caffeine.",
    items: [
      { name: "Chai Latte", desc: "House-made spiced chai, textured milk.", price: "6.00" },
      { name: "Matcha Latte", desc: "Ceremonial grade Uji matcha, oat milk.", price: "6.50" },
      { name: "Golden Latte", desc: "Turmeric, ginger, cinnamon, honey, oat milk.", price: "6.50" },
      { name: "Hot Chocolate", desc: "Callebaut dark couverture, steamed milk.", price: "5.50" },
      { name: "Fresh Juice", desc: "Orange, apple, or watermelon. Pressed to order.", price: "8.00" },
      { name: "Smoothie Bowl", desc: "Açaí, banana, granola, seasonal fruit, coconut.", price: "16.00" },
      { name: "Kombucha", desc: "Locally brewed, rotating flavours on tap.", price: "7.00" },
    ],
  },
  {
    category: "All-Day Brunch",
    description: "Served from open until 2:30 pm. All bread baked in-house daily.",
    items: [
      { name: "Smashed Avo", desc: "Sourdough, lemon, chilli flakes, microherbs, poached egg.", price: "22.00" },
      { name: "Eggs Your Way", desc: "Two free-range eggs, sourdough, house relish. Add bacon +5.", price: "16.00" },
      { name: "The Full Byron", desc: "Eggs, bacon, haloumi, mushrooms, roasted tomato, sourdough.", price: "26.00" },
      { name: "Açaí Bowl", desc: "Organic açaí, banana, blueberries, granola, coconut flakes.", price: "18.00" },
      { name: "Ricotta Hotcakes", desc: "Lemon ricotta, berry compote, maple, whipped mascarpone.", price: "21.00" },
      { name: "Mushroom Toast", desc: "Mixed fungi, thyme, garlic butter, sourdough, truffle oil.", price: "19.00" },
      { name: "Salmon Bagel", desc: "Cured salmon, cream cheese, capers, dill, pickled onion.", price: "23.00" },
      { name: "Brekkie Burrito", desc: "Scrambled eggs, chorizo, beans, cheese, chipotle aioli.", price: "18.00" },
      { name: "Granola Bowl", desc: "House toasted granola, yoghurt, seasonal fruit, honey.", price: "14.00" },
    ],
  },
  {
    category: "Bakery & Sweets",
    description: "Baked fresh every morning with stone-milled flour from the Tablelands.",
    items: [
      { name: "Banana Bread", desc: "Browned butter, sea salt, toasted walnuts.", price: "8.00" },
      { name: "Croissant", desc: "Classic French butter croissant. Flaky, golden.", price: "6.50" },
      { name: "Almond Croissant", desc: "Filled with frangipane, topped with flaked almonds.", price: "7.50" },
      { name: "Blueberry Muffin", desc: "Bursting with local blueberries, lemon zest.", price: "6.50" },
      { name: "Sourdough Loaf", desc: "Whole loaf to take home. 48-hour ferment.", price: "12.00" },
      { name: "Cookie", desc: "Dark choc chip, sea salt, browned butter. Chunky.", price: "5.00" },
      { name: "Lemon Tart", desc: "Buttery shortcrust, tangy curd, Italian meringue.", price: "9.00" },
    ],
  },
  {
    category: "Sides & Extras",
    description: "Make it yours.",
    items: [
      { name: "Extra Shot", desc: "", price: "1.00" },
      { name: "Alt Milk", desc: "Oat, almond, soy, or coconut.", price: "1.00" },
      { name: "Bacon", desc: "Free-range, smoked.", price: "5.00" },
      { name: "Haloumi", desc: "Pan-fried, golden.", price: "5.00" },
      { name: "Avocado", desc: "Half, seasoned.", price: "5.00" },
      { name: "Poached Egg", desc: "Free-range.", price: "3.00" },
      { name: "Mushrooms", desc: "Sautéed, garlic, thyme.", price: "5.00" },
      { name: "Smoked Salmon", desc: "Cured in-house.", price: "6.00" },
    ],
  },
];

/* ───────── HERO IMAGES (cycling) ───────── */
const HERO_IMAGES = [menuCoffee, menuBrunch, menuPastry];

const Menu = () => {
  const root = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero
      gsap.from(".menu-hero-eyebrow", { y: 30, opacity: 0, duration: 0.8, delay: 0.3, ease: "power4.out" });
      gsap.from(".menu-hero-title span", { y: 100, opacity: 0, duration: 1.2, stagger: 0.12, ease: "power4.out", delay: 0.5 });
      gsap.from(".menu-hero-sub", { y: 20, opacity: 0, duration: 0.8, delay: 1, ease: "power3.out" });

      // Category blocks
      gsap.utils.toArray(".menu-category").forEach((el) => {
        gsap.from(el, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      // Individual items stagger
      gsap.utils.toArray(".menu-category").forEach((cat) => {
        const items = cat.querySelectorAll(".menu-item");
        gsap.from(items, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: { trigger: cat, start: "top 80%" },
        });
      });

      // Decorative dividers
      gsap.utils.toArray(".menu-divider").forEach((el) => {
        gsap.from(el, {
          scaleX: 0,
          transformOrigin: "left",
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  // Scroll to top on mount
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
          <Link to="/menu" className="text-clay">Menu</Link>
          <Link to="/#process" className="hover:text-clay transition-colors">Craft</Link>
          <Link to="/#voices" className="hover:text-clay transition-colors">Voices</Link>
          <Link to="/#visit" className="hover:text-clay transition-colors">Visit</Link>
        </nav>
        <Link to="/#visit" className="text-xs uppercase tracking-[0.2em] border border-current px-4 py-2 hover:bg-cream hover:text-espresso transition-colors">
          Find Us
        </Link>
      </header>

      {/* HERO */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 px-6 md:px-12 grain">
        <div className="max-w-[1400px] mx-auto">
          <p className="menu-hero-eyebrow text-xs uppercase tracking-[0.35em] text-clay mb-6">The Full Menu</p>
          <h1 className="font-display font-light text-6xl md:text-8xl leading-[1.02] mb-8 max-w-4xl text-balance">
            <span className="block overflow-hidden"><span className="inline-block">Everything we</span></span>
            <span className="block overflow-hidden -mt-2"><span className="inline-block italic text-clay">make & pour.</span></span>
          </h1>
          <p className="menu-hero-sub text-lg text-cream/70 max-w-lg leading-relaxed">
            Seasonal, local, made fresh. Our menu changes with the tides — ask your barista what's good today.
          </p>
        </div>
        {/* Decorative line */}
        <div className="menu-divider mt-16 h-px bg-cream/15 max-w-[1400px] mx-auto" />
      </section>

      {/* MENU CATEGORIES */}
      <section className="px-6 md:px-12 pb-24 md:pb-40 grain">
        <div className="max-w-[1400px] mx-auto">
          {MENU.map((cat, catIdx) => (
            <div key={cat.category} className="menu-category mb-20 last:mb-0">
              {/* Category Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.4em] text-clay mb-3">
                    {String(catIdx + 1).padStart(2, "0")}
                  </p>
                  <h2 className="font-display font-light text-4xl md:text-6xl leading-[1.02]">
                    {cat.category}
                  </h2>
                </div>
                <p className="text-cream/50 text-sm max-w-sm leading-relaxed md:text-right">
                  {cat.description}
                </p>
              </div>

              {/* Items */}
              <div className="space-y-0">
                {cat.items.map((item, i) => (
                  <div
                    key={item.name}
                    className="menu-item group flex items-baseline justify-between gap-4 py-5 border-b border-cream/10 last:border-b-0 hover:border-cream/25 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-4">
                        <h3 className="font-display text-xl md:text-2xl font-light group-hover:text-clay transition-colors duration-300">
                          {item.name}
                        </h3>
                        <div className="flex-1 border-b border-dotted border-cream/15 mb-1 hidden md:block" />
                        <span className="font-display text-lg text-cream/70 shrink-0">${item.price}</span>
                      </div>
                      {item.desc && (
                        <p className="text-cream/45 text-sm mt-1.5 leading-relaxed max-w-lg">{item.desc}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Divider between categories */}
              {catIdx < MENU.length - 1 && (
                <div className="menu-divider mt-16 h-px bg-gradient-to-r from-clay/40 via-cream/15 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM NOTE */}
      <section className="bg-cream text-espresso py-20 md:py-28 px-6 md:px-12 grain">
        <div className="max-w-[1400px] mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-clay mb-6">A note</p>
          <p className="font-display font-light text-2xl md:text-4xl leading-[1.3] max-w-2xl mx-auto text-balance mb-10">
            We're happy to accommodate dietary needs — just have a word with your server. Gluten-free, vegan and dairy-free options available.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-3 bg-espresso text-cream px-8 py-4 text-sm uppercase tracking-[0.25em] hover:bg-clay transition-colors duration-500"
            >
              ← Back home
            </Link>
            <Link
              to="/#visit"
              className="inline-flex items-center gap-3 border border-espresso px-8 py-4 text-sm uppercase tracking-[0.25em] hover:bg-espresso hover:text-cream transition-colors duration-500"
            >
              Find us →
            </Link>
          </div>
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

export default Menu;
