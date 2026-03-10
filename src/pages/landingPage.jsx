import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import {
  Star,
  Zap,
  Shield,
  Clock,
  Leaf,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  MapPin,
  ChevronRight,
  Phone,
  Mail,
  ChevronDown,
  Heart,
  Utensils,
  Award,
  Users,
} from "lucide-react";
import { throttle } from "lodash";
import HapticButton from "../components/HapticButton";

/* ================= SWADISHT LANDING PAGE ================= */
export default function LandingPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const restaurantId = id || "demo";

  const API_BASE_URL = "https://dishpop-restro-side-backend.onrender.com";

  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantData, setRestaurantData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showFloatingMenu, setShowFloatingMenu] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [animatedStats, setAnimatedStats] = useState(false);

  /* ================= FETCH RESTAURANT DATA ================= */
  useEffect(() => {
    let mounted = true;
    setIsLoading(true);

    const fetchRestaurantData = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/auth/${restaurantId}/landing`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (!mounted) return;

        setRestaurantName("Swadisthz");

        setRestaurantData({
          profilePhoto: data?.profilePhoto || data?.photo || data?.image,
          galleryImages: data?.galleryImages || [],
          description: data?.description || data?.about,
          restaurantType: data?.restaurantType || data?.cuisine,
          city: data?.city,
          state: data?.state,
          stats: {
            rating: data?.rating || data?.stats?.rating,
            reviews: data?.reviewCount || data?.stats?.reviews || 0,
            dishes: data?.dishCount || data?.stats?.dishes || 0,
          },
        });
      } catch (err) {
        console.error("❌ Restaurant fetch failed:", err);
        if (mounted) {
          setRestaurantName("Swadisthz");
          setRestaurantData({
            profilePhoto: null,
            galleryImages: [],
            description: null,
            restaurantType: null,
            city: null,
            state: null,
            stats: { rating: null, reviews: 0, dishes: 0 },
          });
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    fetchRestaurantData();

    return () => {
      mounted = false;
    };
  }, [restaurantId, API_BASE_URL]);

  /* ================= SCROLL HANDLERS ================= */
  const handleScroll = useCallback(
    throttle(() => {
      const y = window.scrollY;
      setShowFloatingMenu(y > 300);
      setShowNavbar(y > 50);
      if (y > 600) setAnimatedStats(true);
    }, 100),
    []
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  /* ================= NAVIGATION ================= */
  const goToMenu = () => navigate(`/menu/${restaurantId}`);
  const handleOrderStatusClick = () => {
    navigate(`/${restaurantId}/order-status`);
  };
  const goToOrders = () => navigate(`/orders/${restaurantId}`);
  const goToReviews = () => navigate(`/reviews/${restaurantId}`);

  /* ================= INLINE STYLES ================= */
  const styles = {
    /* Fixed background */
    fixedBg: {
      backgroundImage: "url('/background.jpg')",
      backgroundAttachment: "fixed",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "repeat",
    },

    /* Decorative mandala-like border */
    mandalaBorder: {
      borderImage:
        "linear-gradient(135deg, #166534, #86efac, #166534) 1",
    },

    /* Glass card effect */
    glassCard: {
      background: "rgba(255, 255, 255, 0.92)",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
    },

    /* Green glass */
    greenGlass: {
      background: "rgba(22, 101, 52, 0.88)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
    },

    /* Rangoli pattern overlay */
    rangoliOverlay: {
      backgroundImage: `radial-gradient(circle at 20% 50%, rgba(22,101,52,0.04) 0%, transparent 50%),
        radial-gradient(circle at 80% 50%, rgba(22,101,52,0.04) 0%, transparent 50%),
        radial-gradient(circle at 50% 20%, rgba(22,101,52,0.03) 0%, transparent 40%)`,
    },
  };

  return (
    <div className="swadisht-landing" style={styles.fixedBg}>
      {/* ===== CUSTOM CSS ===== */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400;1,600&family=Poppins:wght@300;400;500;600;700&display=swap');

        .swadisht-landing {
          min-height: 100vh;
          overflow-x: hidden;
          font-family: 'Poppins', sans-serif;
          color: #1a1a1a;
        }

        .swadisht-landing h1,
        .swadisht-landing h2,
        .swadisht-landing h3 {
          font-family: 'Playfair Display', serif;
        }

        /* ===== ANIMATIONS ===== */
        @keyframes floatIn {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeInScale {
          0% { opacity: 0; transform: scale(0.92); }
          100% { opacity: 1; transform: scale(1); }
        }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        @keyframes gentlePulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.04); }
        }

        @keyframes slideInLeft {
          0% { opacity: 0; transform: translateX(-60px); }
          100% { opacity: 1; transform: translateX(0); }
        }

        @keyframes slideInRight {
          0% { opacity: 0; transform: translateX(60px); }
          100% { opacity: 1; transform: translateX(0); }
        }

        @keyframes borderDance {
          0% { border-image-source: linear-gradient(0deg, #166534, #86efac, #166534); }
          50% { border-image-source: linear-gradient(180deg, #166534, #86efac, #166534); }
          100% { border-image-source: linear-gradient(360deg, #166534, #86efac, #166534); }
        }

        @keyframes countUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .animate-float-in { animation: floatIn 0.8s ease-out both; }
        .animate-float-in-d1 { animation: floatIn 0.8s ease-out 0.15s both; }
        .animate-float-in-d2 { animation: floatIn 0.8s ease-out 0.3s both; }
        .animate-float-in-d3 { animation: floatIn 0.8s ease-out 0.45s both; }
        .animate-fade-scale { animation: fadeInScale 0.9s ease-out both; }
        .animate-slide-left { animation: slideInLeft 0.8s ease-out both; }
        .animate-slide-right { animation: slideInRight 0.8s ease-out 0.2s both; }
        .animate-count-up { animation: countUp 0.6s ease-out both; }

        .shimmer-text {
          background: linear-gradient(90deg, #23bd5eff 0%, #4ade80 25%, #23bd5eff 50%, #4ade80 75%, #23bd5eff 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 7s linear infinite;
        }

        /* ===== DECORATIVE DIVIDER ===== */
        .indian-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin: 20px 0;
        }
        .indian-divider::before,
        .indian-divider::after {
          content: '';
          height: 2px;
          width: 60px;
          background: linear-gradient(90deg, transparent, #166534, transparent);
        }
        .indian-divider-icon {
          width: 10px;
          height: 10px;
          border: 2px solid #166534;
          transform: rotate(45deg);
        }

        /* ===== LEAF PATTERN ===== */
        .leaf-pattern {
          position: relative;
        }
        .leaf-pattern::before {
          content: '🌿';
          position: absolute;
          font-size: 24px;
          opacity: 0.15;
          top: -10px;
          left: -20px;
        }
        .leaf-pattern::after {
          content: '🌿';
          position: absolute;
          font-size: 24px;
          opacity: 0.15;
          bottom: -10px;
          right: -20px;
          transform: scaleX(-1);
        }

        /* ===== FEATURE CARD ===== */
        .feature-card {
          transition: all 0.4s cubic-bezier(.2,.9,.2,1);
        }
        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(22,101,52,0.15);
        }

        /* ===== FOOD IMAGE HOVER ===== */
        .food-image-wrapper {
          overflow: hidden;
          border-radius: 20px;
          box-shadow: 0 8px 30px rgba(0,0,0,0.12);
          transition: all 0.5s ease;
        }
        .food-image-wrapper:hover {
          transform: scale(1.02);
          box-shadow: 0 16px 48px rgba(22,101,52,0.2);
        }
        .food-image-wrapper img {
          transition: transform 0.7s ease;
        }
        .food-image-wrapper:hover img {
          transform: scale(1.08);
        }

        /* ===== SCROLL INDICATOR ===== */
        @keyframes scrollBounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(12px); }
        }
      `}</style>

      {/* ================= NAVBAR ================= */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${showNavbar
          ? "shadow-lg"
          : "bg-transparent"
          }`}
        style={
          showNavbar
            ? {
              ...styles.glassCard,
              borderBottom: "2px solid rgba(22,101,52,0.12)",
            }
            : {}
        }
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div
              className="w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md"
              style={{ background: "linear-gradient(135deg, #166534, #22c55e)" }}
            >
              स
            </div>
            <h1
              className={`text-xl md:text-2xl font-bold tracking-tight ${showNavbar ? "text-green-800" : "text-white"
                }`}
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {restaurantName || "Swadisthz"}
            </h1>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 md:gap-3">
            <HapticButton
              onClick={handleOrderStatusClick}
              className="text-white px-4 py-2.5 rounded-full font-semibold text-sm whitespace-nowrap transition-all hover:scale-105 shadow-md"
              style={{
                background: "linear-gradient(135deg, #166534, #15803d)",
              }}
            >
              Order Status
            </HapticButton>
          </div>
        </div>
      </header>

      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-screen bg-[#000000aa] flex items-center justify-center">
        {/* Dark overlay on the fixed background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(22,101,52,0.4) 50%, rgba(0,0,0,0.65) 100%)",
          }}
        />

        {/* Decorative corner elements */}
        <div
          className="absolute top-20 left-4 md:left-8 w-20 h-20 md:w-32 md:h-32 border-l-2 border-t-2 opacity-30"
          style={{ borderColor: "#86efac" }}
        />
        <div
          className="absolute bottom-20 right-4 md:right-8 w-20 h-20 md:w-32 md:h-32 border-r-2 border-b-2 opacity-30"
          style={{ borderColor: "#86efac" }}
        />

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 text-center py-20">
          {/* Hindi Tagline */}
          <p
            className="text-green-300 text-sm md:text-base tracking-widest uppercase mb-4 animate-float-in"
            style={{ fontFamily: "'Poppins', sans-serif", letterSpacing: "4px" }}
          >
            ✦ घर जैसा स्वाद ✦
          </p>

          {/* Main Heading */}
          <h1
            className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight animate-float-in-d1"
            style={{
              textShadow: "0 4px 20px rgba(0,0,0,0.4)",
            }}
          >
            Welcome to{" "}
            <span
              className="shimmer-text"
              style={{
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {restaurantName || "Swadisthz"}
            </span>
          </h1>

          {/* Decorative Divider */}
          <div className="indian-divider animate-float-in-d1">
            <div className="indian-divider-icon" />
          </div>

          {/* Description */}
          <p className="text-base md:text-xl text-white/85 max-w-3xl mx-auto mb-10 leading-relaxed animate-float-in-d2">
            Your daily dose of homemade happiness — authentic Indian tiffin service delivering
            fresh, wholesome, and lovingly prepared meals straight to your doorstep. Experience the
            warmth of a home-cooked thali, every single day.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-float-in-d3">
            <HapticButton
              onClick={goToMenu}
              className="text-green-900 px-8 py-4 rounded-full font-bold text-base md:text-lg transition-all shadow-xl hover:shadow-2xl hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #ffffff, #dcfce7)",
              }}
            >
              🍽️ Explore Our Menu
            </HapticButton>
            <HapticButton
              onClick={goToReviews}
              className="text-white px-8 py-4 rounded-full font-bold text-base md:text-lg transition-all hover:scale-105 border-2 border-white/30 hover:border-white/60"
              style={{ background: "rgba(255,255,255,0.08)" }}
            >
              ⭐ Read Reviews
            </HapticButton>
          </div>

          {/* Scroll indicator */}
          <div
            className="absolute bottom-6 left-1/2"
            style={{ animation: "scrollBounce 2s ease-in-out infinite" }}
          >
            <ChevronDown className="w-7 h-7 text-white/50" />
          </div>
        </div>
      </section>

      {/* ================= ABOUT SWADISHT SECTION ================= */}
      <section className="relative py-20 md:py-28">
        {/* Semi-transparent white overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "rgba(255,255,255,0.93)" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <p
              className="text-green-700 text-xs md:text-sm tracking-widest uppercase mb-3"
              style={{ letterSpacing: "3px" }}
            >
              About Us
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              The <span className="text-green-700">Swadisthz</span> Story
            </h2>
            <div className="indian-divider">
              <div className="indian-divider-icon" />
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left — Image */}
            <div className="food-image-wrapper animate-slide-left">
              <img
                src="/download.jpg"
                alt="Authentic Indian Tiffin by Swadisthz"
                className="w-full h-[320px] md:h-[440px] object-cover"
                style={{ borderRadius: "20px" }}
              />
              {/* Floating badge */}
              <div
                className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2"
                style={{
                  background: "linear-gradient(135deg, #166534, #22c55e)",
                }}
              >
                <Heart className="w-4 h-4" /> Made with Love
              </div>
            </div>

            {/* Right — Text */}
            <div className="animate-slide-right">
              <h3
                className="text-2xl md:text-3xl font-bold text-gray-900 mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Homemade Goodness,
                <br />
                <span className="text-green-700">Delivered Daily</span>
              </h3>

              <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6">
                {restaurantData?.description ||
                  `At Swadisthz, we believe every meal should feel like home. Our tiffin service
                  brings you the authentic flavors of traditional Indian cooking — from aromatic
                  dals and freshly made rotis to seasonal sabzis and comforting rice dishes.
                  Every ingredient is handpicked, every spice is freshly ground, and every meal
                  is prepared with the same love and care as a mother's kitchen.`}
              </p>

              <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
                We understand that good food is not just about taste — it's about nutrition,
                hygiene, and consistency. That's why our kitchen follows strict quality standards
                while preserving the old-world charm of homestyle Indian cooking. Whether you're
                a student away from home, a busy professional, or a family looking for hassle-free
                meals, Swadisthz is your trusted tiffin partner.
              </p>

              <div className="flex flex-wrap gap-3">
                {["100% Hygienic", "Fresh Ingredients", "Daily Menu", "Home Delivery"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 rounded-full text-sm font-medium text-green-800 border border-green-200"
                      style={{ background: "rgba(22,101,52,0.06)" }}
                    >
                      ✓ {tag}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= OUR THALI SECTION ================= */}
      <section className="relative py-20 md:py-28">
        {/* Slightly green tinted overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "rgba(240,253,244,0.92)" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left — Text */}
            <div>
              <p
                className="text-green-700 text-xs md:text-sm tracking-widest uppercase mb-3"
                style={{ letterSpacing: "3px" }}
              >
                Our Specialty
              </p>
              <h2
                className="text-3xl md:text-5xl font-bold text-gray-900 mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                The Complete{" "}
                <span className="text-green-700">Indian Thali</span>
              </h2>
              <div className="indian-divider" style={{ justifyContent: "flex-start" }}>
                <div className="indian-divider-icon" />
              </div>

              <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6 mt-6">
                Our signature thali is a celebration of Indian culinary heritage. Each thali
                is thoughtfully composed with a balanced mix of flavors — sweet, sour, spicy,
                and savory — ensuring a complete and satisfying meal experience.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  {
                    icon: Utensils,
                    title: "Balanced Nutrition",
                    desc: "Carbs, proteins, vitamins — every thali is a wholesome meal",
                  },
                  {
                    icon: Leaf,
                    title: "Seasonal Ingredients",
                    desc: "Fresh vegetables and seasonal produce used daily",
                  },
                  {
                    icon: Heart,
                    title: "Traditional Recipes",
                    desc: "Age-old recipes passed down through generations",
                  },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-4">
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(22,101,52,0.1)" }}
                    >
                      <Icon className="w-5 h-5 text-green-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-base">{title}</h4>
                      <p className="text-gray-500 text-sm">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <HapticButton
                onClick={goToMenu}
                className="text-white px-7 py-3.5 rounded-full font-bold text-base transition-all hover:scale-105 shadow-lg"
                style={{
                  background: "linear-gradient(135deg, #166534, #15803d)",
                }}
              >
                View Today's Menu →
              </HapticButton>
            </div>

            {/* Right — Image */}
            <div className="food-image-wrapper relative">
              <img
                src="/images.jpg"
                alt="Swadisthz Complete Indian Thali"
                className="w-full h-[320px] md:h-[480px] object-cover"
                style={{ borderRadius: "20px" }}
              />
              {/* Decorative corner accent */}
              <div
                className="absolute -top-3 -right-3 w-16 h-16 border-t-3 border-r-3 rounded-tr-2xl"
                style={{ borderColor: "#166534", borderWidth: "3px", borderStyle: "solid", borderLeft: "none", borderBottom: "none" }}
              />
              <div
                className="absolute -bottom-3 -left-3 w-16 h-16 border-b-3 border-l-3 rounded-bl-2xl"
                style={{ borderColor: "#166534", borderWidth: "3px", borderStyle: "solid", borderRight: "none", borderTop: "none" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE SWADISHT ================= */}
      <section className="relative py-20 md:py-28">
        <div
          className="absolute inset-0"
          style={{ background: "rgba(255,255,255,0.95)", ...styles.rangoliOverlay }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <p
              className="text-green-700 text-xs md:text-sm tracking-widest uppercase mb-3"
              style={{ letterSpacing: "3px" }}
            >
              Why Us
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose{" "}
              <span className="text-green-700">Swadisthz</span>?
            </h2>
            <div className="indian-divider">
              <div className="indian-divider-icon" />
            </div>
            <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto mt-4">
              We don't just deliver food — we deliver trust, taste, and tradition in every tiffin.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                icon: Shield,
                title: "100% Hygienic",
                text: "Our FSSAI certified kitchen maintains the highest standards of cleanliness and food safety at every step.",
                color: "#166534",
              },
              {
                icon: Clock,
                title: "On-Time Delivery",
                text: "Hot and fresh meals delivered right on schedule — because we know your time matters as much as your taste.",
                color: "#166534",
              },
              {
                icon: Leaf,
                title: "Farm Fresh",
                text: "We source ingredients directly from local farms to ensure maximum freshness and authentic flavors.",
                color: "#166534",
              },
              {
                icon: Award,
                title: "Maa Ke Haath Ka",
                text: "Every dish is made with traditional recipes and love, just like your mother would make at home.",
                color: "#166534",
              },
            ].map(({ icon: Icon, title, text, color }) => (
              <div
                key={title}
                className="feature-card p-8 rounded-3xl text-center cursor-default"
                style={{
                  ...styles.glassCard,
                  border: "1px solid rgba(22,101,52,0.1)",
                }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
                  style={{ background: `${color}12` }}
                >
                  <Icon className="w-7 h-7" style={{ color }} />
                </div>
                <h3
                  className="font-bold text-lg text-gray-900 mb-3"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= STATS COUNTER ================= */}
      <section className="relative py-16 md:py-20">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, rgba(22,101,52,0.9), rgba(21,128,61,0.85))",
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "500+", label: "Happy Customers", icon: Users },
              { value: "50+", label: "Menu Items", icon: Utensils },
              { value: "4.8", label: "Average Rating", icon: Star },
              { value: "365", label: "Days of Service", icon: Clock },
            ].map(({ value, label, icon: Icon }, i) => (
              <div
                key={label}
                className={`${animatedStats ? "animate-count-up" : "opacity-0"}`}
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <Icon className="w-7 h-7 md:w-8 md:h-8 text-green-300 mx-auto mb-3" />
                <p className="text-3xl md:text-4xl font-extrabold text-white mb-1">{value}</p>
                <p className="text-green-200 text-sm md:text-base">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="relative py-20 md:py-28">
        <div
          className="absolute inset-0"
          style={{ background: "rgba(255,255,255,0.94)" }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <p
              className="text-green-700 text-xs md:text-sm tracking-widest uppercase mb-3"
              style={{ letterSpacing: "3px" }}
            >
              Simple Process
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              How It <span className="text-green-700">Works</span>
            </h2>
            <div className="indian-divider">
              <div className="indian-divider-icon" />
            </div>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Choose Your Plan",
                desc: "Browse our daily or weekly tiffin plans and select what suits your appetite and budget.",
                emoji: "📋",
              },
              {
                step: "02",
                title: "We Prepare Fresh",
                desc: "Our cooks prepare your meals fresh each day with handpicked ingredients and traditional recipes.",
                emoji: "👩‍🍳",
              },
              {
                step: "03",
                title: "Doorstep Delivery",
                desc: "Hot, packed, and delivered right to your door — on time, every time. Just sit back and enjoy!",
                emoji: "🚀",
              },
            ].map(({ step, title, desc, emoji }) => (
              <div
                key={step}
                className="relative text-center p-8 rounded-3xl"
                style={{
                  ...styles.glassCard,
                  border: "1px solid rgba(22,101,52,0.08)",
                }}
              >
                <div className="text-4xl mb-4">{emoji}</div>
                <div
                  className="inline-block px-3 py-1 rounded-full text-xs font-bold text-green-800 mb-3"
                  style={{ background: "rgba(22,101,52,0.08)" }}
                >
                  Step {step}
                </div>
                <h3
                  className="text-xl font-bold text-gray-900 mb-3"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= REVIEWS CTA SECTION ================= */}
      <section className="relative py-20 md:py-24">
        <div
          className="absolute inset-0"
          style={{ background: "rgba(240,253,244,0.92)" }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 text-center">
          <div
            className="p-10 md:p-16 rounded-3xl shadow-xl"
            style={{
              ...styles.glassCard,
              border: "2px solid rgba(22,101,52,0.1)",
            }}
          >
            {/* Stars */}
            <div className="flex justify-center gap-1.5 mb-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className="w-7 h-7 md:w-8 md:h-8 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>

            <h2
              className="text-2xl md:text-4xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Loved by <span className="text-green-700">Hundreds</span> of Families
            </h2>

            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
              Don't just take our word for it — hear from our happy customers who have made
              Swadisthz their daily tiffin choice. Real reviews, real satisfaction.
            </p>

            <HapticButton
              onClick={goToReviews}
              className="text-white px-8 py-4 rounded-full font-bold text-base md:text-lg transition-all hover:scale-105 shadow-lg"
              style={{
                background: "linear-gradient(135deg, #166534, #15803d)",
              }}
            >
              Read Customer Reviews ⭐
            </HapticButton>
          </div>
        </div>
      </section>

      {/* ================= FLOATING MENU BUTTON ================= */}
      {showFloatingMenu && (
        <HapticButton
          onClick={goToMenu}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 text-white px-6 py-3.5 md:px-7 md:py-4 rounded-full shadow-2xl font-bold z-50 flex items-center gap-2 hover:scale-105 transition-all text-sm md:text-base"
          style={{
            background: "linear-gradient(135deg, #166534, #22c55e)",
            boxShadow: "0 8px 32px rgba(22,101,52,0.35)",
          }}
        >
          🍽️ View Menu <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
        </HapticButton>
      )}

      {/* ================= FOOTER ================= */}
      <footer
        className="relative py-14 md:py-18"
        style={{
          background: "linear-gradient(180deg, #052e16, #0a1f0f)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-16 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-lg"
                  style={{
                    background: "linear-gradient(135deg, #22c55e, #16a34a)",
                  }}
                >
                  स
                </div>
                <h3
                  className="text-xl font-bold text-white"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {restaurantName || "Swadisthz"}
                </h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Authentic Indian tiffin service delivering homemade meals with love.
                Fresh, hygienic, and delicious — just like maa ke haath ka khaana.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3
                className="font-bold text-base mb-4 text-white"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Quick Links
              </h3>
              <div className="space-y-2.5">
                <button
                  onClick={goToMenu}
                  className="block text-gray-400 hover:text-green-400 transition text-sm"
                >
                  Our Menu
                </button>
                <button
                  onClick={goToReviews}
                  className="block text-gray-400 hover:text-green-400 transition text-sm"
                >
                  Customer Reviews
                </button>
                <button
                  onClick={handleOrderStatusClick}
                  className="block text-gray-400 hover:text-green-400 transition text-sm"
                >
                  Track Order
                </button>
              </div>
            </div>

            {/* Social */}
            <div>
              <h3
                className="font-bold text-base mb-4 text-white"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Follow Us
              </h3>
              <div className="flex gap-3">
                {[Instagram, Facebook, Twitter, Linkedin].map((Icon, i) => (
                  <button
                    key={i}
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all border border-gray-700 hover:border-green-500 text-gray-400 hover:text-green-400"
                    style={{ background: "rgba(255,255,255,0.05)" }}
                  >
                    <Icon className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-800 pt-6 md:pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-3">
              <p className="text-gray-500 text-xs md:text-sm">
                © {new Date().getFullYear()} {restaurantName || "Swadisthz"} Tiffin Service. All Rights Reserved.
              </p>
              <p className="text-gray-600 text-xs">
                Powered by <span className="text-green-500 font-semibold">Swadisthz</span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
