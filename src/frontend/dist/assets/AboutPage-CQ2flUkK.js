import { c as createLucideIcon, j as jsxRuntimeExports, b as Store, B as Button, L as Link } from "./index-DuMvlbDW.js";
import { m as motion } from "./proxy-Rb8B9lu2.js";
import { a as ShieldCheck, S as Sparkles } from "./sparkles-Bw29YzkD.js";
import { M as MapPin } from "./map-pin-DZRB48yo.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
      key: "c3ymky"
    }
  ]
];
const Heart = createLucideIcon("heart", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const Users = createLucideIcon("users", __iconNode);
const VALUES = [
  {
    icon: ShieldCheck,
    title: "Vishwas (Trust)",
    desc: "Har dukaan verified hai. Customers aur sellers dono ke liye safe aur transparent experience."
  },
  {
    icon: Users,
    title: "Samudaay (Community)",
    desc: "Hum ek doosre ki madad karte hain — chote shopkeepers milkar ek badi awaaz bante hain."
  },
  {
    icon: Sparkles,
    title: "Asaliyat (Authenticity)",
    desc: "Hamare products genuine hain — sidha local artisans aur shopkeepers se, koi middleman nahi."
  }
];
const BENEFITS_SELLERS = [
  "Free shop page with your own URL",
  "Product images aur details upload karo",
  "WhatsApp aur online payment dono support",
  "Apna dashboard se orders track karo"
];
const BENEFITS_BUYERS = [
  "Hazaron local shops ek jagah explore karo",
  "Category aur price se filter karo",
  "Seller se seedha WhatsApp par baat karo",
  "Secure online payment via Stripe"
];
function AboutPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background", "data-ocid": "about.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative bg-primary overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 opacity-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute inset-0",
          style: {
            backgroundImage: "radial-gradient(circle at 20% 50%, oklch(0.7 0.12 70) 0%, transparent 60%), radial-gradient(circle at 80% 20%, oklch(0.7 0.12 70) 0%, transparent 50%)"
          }
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 bg-primary-foreground/15 backdrop-blur-sm border border-primary-foreground/20 rounded-full px-4 py-1.5 text-sm text-primary-foreground/90 mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-3.5 h-3.5 fill-current" }),
              "Local ke liye, Local se"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-6xl font-semibold text-primary-foreground leading-tight mb-6", children: "DukaanBazar ki Kahani" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed", children: "India ke har gali-mohalle mein chhupe talented shopkeepers ko duniya tak pahunchane ka mission — ek dukaan, ek sapna." })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-16 md:py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-12 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -24 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true },
          transition: { duration: 0.55 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h2",
              {
                className: "font-display text-3xl md:text-4xl font-semibold text-primary mb-5",
                "data-ocid": "about.story_section",
                children: "Hamari Kahani"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-4", children: "Surat ki ek saree dukaan, Jaipur ka lehenga maker, ya Lucknow ka kurti artisan — yeh log saalon se apne haath se banaye kapdon ko sirf apne mohalle mein bech rahe the. Unhein online jaana tha, magar koi aasaan raasta nahi tha." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-4", children: "DukaanBazar isi zaroorat se janam liya. Hamare platform par koi bhi dukaan owner apni shop create kar sakta hai — bina kisi technical knowledge ke — aur apne products poore desh ke customers tak pahuncha sakta hai." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed", children: "Ab Amazon jaisi badi companies ke saath compete nahi karna — apni local pehchaan ke saath, apne customers se seedha connect karo. Yahi hai DukaanBazar ka vaada." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: "grid grid-cols-2 gap-4",
          initial: { opacity: 0, x: 24 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true },
          transition: { duration: 0.55, delay: 0.1 },
          children: [
            { num: "500+", label: "Local Shops" },
            { num: "10K+", label: "Products Listed" },
            { num: "25+", label: "Cities Covered" },
            { num: "1 Lakh+", label: "Happy Customers" }
          ].map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-card border border-border rounded-2xl p-6 text-center",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-3xl font-semibold text-primary", children: stat.num }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: stat.label })
              ]
            },
            stat.label
          ))
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/40 py-16 md:py-20 border-y border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "text-center mb-12",
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl md:text-4xl font-semibold text-foreground mb-3", children: "Sabke liye Faayda" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-xl mx-auto", children: "DukaanBazar ek multi-vendor marketplace hai — jahan sellers aur buyers dono ka fayda hai." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [
        {
          title: "Dukaan Owners ke liye",
          icon: Store,
          items: BENEFITS_SELLERS,
          accent: "bg-primary/8 border-primary/20",
          iconColor: "text-primary"
        },
        {
          title: "Customers ke liye",
          icon: Users,
          items: BENEFITS_BUYERS,
          accent: "bg-accent/8 border-accent/20",
          iconColor: "text-accent"
        }
      ].map((group, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: `rounded-2xl border p-7 ${group.accent}`,
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5, delay: i * 0.1 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(group.icon, { className: `w-6 h-6 ${group.iconColor}` }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-foreground", children: group.title })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: group.items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "li",
              {
                className: "flex items-start gap-2.5 text-sm text-muted-foreground",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" }),
                  item
                ]
              },
              item
            )) })
          ]
        },
        group.title
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-16 md:py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "text-center mb-12",
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl md:text-4xl font-semibold text-foreground mb-3", children: "Hamare Mool Mulya" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Yeh values hi hain jo hamen alag banate hain." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: VALUES.map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "bg-card border border-border rounded-2xl p-7 text-center",
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5, delay: i * 0.1 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(v.icon, { className: "w-6 h-6 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-foreground mb-2", children: v.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: v.desc })
          ]
        },
        v.title
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/40 border-t border-border py-16 md:py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.55 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-7 h-7 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl md:text-4xl font-semibold text-foreground mb-4", children: "Hamare Saath Judo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-3", children: "Humari team passionate developers aur entrepreneurs se bani hai jo India ke local business ecosystem ko transform karna chahte hain." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed mb-8", children: [
            "Agar aap bhi ek dukaan owner hain — chahe bade sheher mein ya chote qasbay mein — DukaanBazar aapka intezaar kar raha hai.",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Aaj hi apni dukaan register karein" }),
            " ",
            "aur apne customers se seedha connect ho jaiye."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              size: "lg",
              className: "gap-2 bg-primary hover:bg-primary/90 text-primary-foreground",
              "data-ocid": "about.register_seller_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/seller/dashboard", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Store, { className: "w-5 h-5" }),
                "Apni Dukaan Register Karein"
              ] })
            }
          )
        ]
      }
    ) }) })
  ] });
}
export {
  AboutPage as default
};
