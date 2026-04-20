import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  Heart,
  MapPin,
  ShieldCheck,
  Sparkles,
  Store,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Vishwas (Trust)",
    desc: "Har dukaan verified hai. Customers aur sellers dono ke liye safe aur transparent experience.",
  },
  {
    icon: Users,
    title: "Samudaay (Community)",
    desc: "Hum ek doosre ki madad karte hain — chote shopkeepers milkar ek badi awaaz bante hain.",
  },
  {
    icon: Sparkles,
    title: "Asaliyat (Authenticity)",
    desc: "Hamare products genuine hain — sidha local artisans aur shopkeepers se, koi middleman nahi.",
  },
];

const BENEFITS_SELLERS = [
  "Free shop page with your own URL",
  "Product images aur details upload karo",
  "WhatsApp aur online payment dono support",
  "Apna dashboard se orders track karo",
];

const BENEFITS_BUYERS = [
  "Hazaron local shops ek jagah explore karo",
  "Category aur price se filter karo",
  "Seller se seedha WhatsApp par baat karo",
  "Secure online payment via Stripe",
];

export default function AboutPage() {
  return (
    <div className="bg-background" data-ocid="about.page">
      {/* Hero */}
      <section className="relative bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 50%, oklch(0.7 0.12 70) 0%, transparent 60%), radial-gradient(circle at 80% 20%, oklch(0.7 0.12 70) 0%, transparent 50%)",
            }}
          />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary-foreground/15 backdrop-blur-sm border border-primary-foreground/20 rounded-full px-4 py-1.5 text-sm text-primary-foreground/90 mb-6">
              <Heart className="w-3.5 h-3.5 fill-current" />
              Local ke liye, Local se
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-semibold text-primary-foreground leading-tight mb-6">
              DukaanBazar ki Kahani
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
              India ke har gali-mohalle mein chhupe talented shopkeepers ko
              duniya tak pahunchane ka mission — ek dukaan, ek sapna.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Hamari Kahani */}
      <section className="bg-background py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <h2
                className="font-display text-3xl md:text-4xl font-semibold text-primary mb-5"
                data-ocid="about.story_section"
              >
                Hamari Kahani
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Surat ki ek saree dukaan, Jaipur ka lehenga maker, ya Lucknow ka
                kurti artisan — yeh log saalon se apne haath se banaye kapdon ko
                sirf apne mohalle mein bech rahe the. Unhein online jaana tha,
                magar koi aasaan raasta nahi tha.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                DukaanBazar isi zaroorat se janam liya. Hamare platform par koi
                bhi dukaan owner apni shop create kar sakta hai — bina kisi
                technical knowledge ke — aur apne products poore desh ke
                customers tak pahuncha sakta hai.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Ab Amazon jaisi badi companies ke saath compete nahi karna —
                apni local pehchaan ke saath, apne customers se seedha connect
                karo. Yahi hai DukaanBazar ka vaada.
              </p>
            </motion.div>
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              {[
                { num: "500+", label: "Local Shops" },
                { num: "10K+", label: "Products Listed" },
                { num: "25+", label: "Cities Covered" },
                { num: "1 Lakh+", label: "Happy Customers" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-card border border-border rounded-2xl p-6 text-center"
                >
                  <p className="font-display text-3xl font-semibold text-primary">
                    {stat.num}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Multi-vendor benefits */}
      <section className="bg-muted/40 py-16 md:py-20 border-y border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-3">
              Sabke liye Faayda
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              DukaanBazar ek multi-vendor marketplace hai — jahan sellers aur
              buyers dono ka fayda hai.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Dukaan Owners ke liye",
                icon: Store,
                items: BENEFITS_SELLERS,
                accent: "bg-primary/8 border-primary/20",
                iconColor: "text-primary",
              },
              {
                title: "Customers ke liye",
                icon: Users,
                items: BENEFITS_BUYERS,
                accent: "bg-accent/8 border-accent/20",
                iconColor: "text-accent",
              },
            ].map((group, i) => (
              <motion.div
                key={group.title}
                className={`rounded-2xl border p-7 ${group.accent}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <group.icon className={`w-6 h-6 ${group.iconColor}`} />
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {group.title}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-muted-foreground"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-background py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-3">
              Hamare Mool Mulya
            </h2>
            <p className="text-muted-foreground">
              Yeh values hi hain jo hamen alag banate hain.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                className="bg-card border border-border rounded-2xl p-7 text-center"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <v.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {v.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team / Join Us */}
      <section className="bg-muted/40 border-t border-border py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
              <MapPin className="w-7 h-7 text-primary" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Hamare Saath Judo
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Humari team passionate developers aur entrepreneurs se bani hai jo
              India ke local business ecosystem ko transform karna chahte hain.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Agar aap bhi ek dukaan owner hain — chahe bade sheher mein ya
              chote qasbay mein — DukaanBazar aapka intezaar kar raha hai.{" "}
              <strong className="text-foreground">
                Aaj hi apni dukaan register karein
              </strong>{" "}
              aur apne customers se seedha connect ho jaiye.
            </p>
            <Button
              asChild
              size="lg"
              className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
              data-ocid="about.register_seller_button"
            >
              <Link to="/seller/dashboard">
                <Store className="w-5 h-5" />
                Apni Dukaan Register Karein
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
