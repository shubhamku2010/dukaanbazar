import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, B as Button } from "./index-DuMvlbDW.js";
import { I as Input } from "./input-BRbx0oKP.js";
import { L as Label, T as Textarea } from "./textarea-TwgKtf55.js";
import { u as useActor, c as createActor } from "./backend-B-zt_gHz.js";
import { m as motion } from "./proxy-Rb8B9lu2.js";
import { M as MessageCircle } from "./message-circle-DpsNwd5x.js";
import { P as Phone } from "./phone-BmocqhcR.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const CircleCheckBig = createLucideIcon("circle-check-big", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7", key: "132q7q" }],
  ["rect", { x: "2", y: "4", width: "20", height: "16", rx: "2", key: "izxlao" }]
];
const Mail = createLucideIcon("mail", __iconNode);
const INITIAL = { name: "", email: "", phone: "", message: "" };
function ContactPage() {
  const { actor } = useActor(createActor);
  const [form, setForm] = reactExports.useState(INITIAL);
  const [errors, setErrors] = reactExports.useState({});
  const [submitting, setSubmitting] = reactExports.useState(false);
  const [submitted, setSubmitted] = reactExports.useState(false);
  const [serverError, setServerError] = reactExports.useState(null);
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Naam zaroori hai";
    if (!form.email.trim()) {
      e.email = "Email zaroori hai";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Valid email daalein";
    }
    if (!form.message.trim()) e.message = "Message zaroori hai";
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) {
      setErrors((ev) => ({ ...ev, [name]: void 0 }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (!actor) {
      setServerError("Connection issue. Please try again.");
      return;
    }
    setSubmitting(true);
    setServerError(null);
    try {
      const result = await actor.submitContactForm(
        form.name.trim(),
        form.email.trim(),
        form.phone.trim(),
        form.message.trim()
      );
      if (result.__kind__ === "ok") {
        setSubmitted(true);
        setForm(INITIAL);
      } else {
        setServerError(result.err || "Kuch galat hua. Dobara try karein.");
      }
    } catch {
      setServerError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background min-h-screen", "data-ocid": "contact.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-primary py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.h1,
        {
          className: "font-display text-3xl md:text-5xl font-semibold text-primary-foreground",
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5 },
          children: "Humse Sampark Karein"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.p,
        {
          className: "text-primary-foreground/80 mt-3 text-base md:text-lg",
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay: 0.1 },
          children: "Koi bhi sawaal ho — hum 24 ghante mein jawab denge."
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: "lg:col-span-2",
          initial: { opacity: 0, x: -20 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.5 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-7 md:p-9", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-semibold text-foreground mb-6", children: "Message Bhejein" }),
            submitted ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                className: "flex flex-col items-center text-center py-10 gap-4",
                initial: { opacity: 0, scale: 0.95 },
                animate: { opacity: 1, scale: 1 },
                transition: { duration: 0.4 },
                "data-ocid": "contact.success_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-14 h-14 text-accent" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-semibold text-foreground", children: "Message Mil Gaya!" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed max-w-sm", children: "Shukriya aapke message ke liye. Hum jald hi aapse sampark karenge — usually 24 ghante ke andar." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "outline",
                      onClick: () => setSubmitted(false),
                      "data-ocid": "contact.send_another_button",
                      children: "Aur Message Bhejein"
                    }
                  )
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "form",
              {
                onSubmit: handleSubmit,
                noValidate: true,
                className: "space-y-5",
                "data-ocid": "contact.form",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "name", children: [
                        "Naam ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "name",
                          name: "name",
                          value: form.name,
                          onChange: handleChange,
                          placeholder: "Aapka poora naam",
                          className: errors.name ? "border-destructive" : "",
                          "data-ocid": "contact.name_input"
                        }
                      ),
                      errors.name && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-xs text-destructive",
                          "data-ocid": "contact.name_field_error",
                          children: errors.name
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "email", children: [
                        "Email ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "email",
                          name: "email",
                          type: "email",
                          value: form.email,
                          onChange: handleChange,
                          placeholder: "aap@example.com",
                          className: errors.email ? "border-destructive" : "",
                          "data-ocid": "contact.email_input"
                        }
                      ),
                      errors.email && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-xs text-destructive",
                          "data-ocid": "contact.email_field_error",
                          children: errors.email
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "phone", children: "Phone Number (optional)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "phone",
                        name: "phone",
                        type: "tel",
                        value: form.phone,
                        onChange: handleChange,
                        placeholder: "+91 98765 43210",
                        "data-ocid": "contact.phone_input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "message", children: [
                      "Message ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Textarea,
                      {
                        id: "message",
                        name: "message",
                        value: form.message,
                        onChange: handleChange,
                        placeholder: "Aapka sawaal ya feedback yahan likhein…",
                        rows: 5,
                        className: errors.message ? "border-destructive" : "",
                        "data-ocid": "contact.message_textarea"
                      }
                    ),
                    errors.message && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-xs text-destructive",
                        "data-ocid": "contact.message_field_error",
                        children: errors.message
                      }
                    )
                  ] }),
                  serverError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "text-sm text-destructive bg-destructive/8 border border-destructive/20 rounded-lg px-4 py-3",
                      "data-ocid": "contact.error_state",
                      children: serverError
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "submit",
                      size: "lg",
                      className: "w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2",
                      disabled: submitting || !actor,
                      "data-ocid": "contact.submit_button",
                      children: submitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "data-ocid": "contact.loading_state", children: "Bhej rahe hain…" })
                      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-4 h-4" }),
                        " Message Bhejein"
                      ] })
                    }
                  )
                ]
              }
            )
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "flex flex-col gap-5",
          initial: { opacity: 0, x: 20 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.5, delay: 0.15 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-semibold text-foreground mb-4", children: "Seedha Sampark Karein" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "a",
                  {
                    href: "https://wa.me/919876543210?text=Hi%2C%20I%20have%20a%20question%20about%20DukaanBazar",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group",
                    "data-ocid": "contact.whatsapp_link",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4 text-accent" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: "WhatsApp" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "+91 98765 43210" })
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "a",
                  {
                    href: "mailto:support@dukaanbazar.in",
                    className: "flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group",
                    "data-ocid": "contact.email_link",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-4 h-4 text-primary" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: "Email" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "support@dukaanbazar.in" })
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-sm text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-muted flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4 text-muted-foreground" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: "Phone" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "+91 98765 43210" })
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/8 border border-primary/20 rounded-2xl p-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground text-sm mb-1.5", children: "24 Ghante Mein Jawab" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: "Hum generally 24 ghante ke andar respond karte hain. Urgent queries ke liye WhatsApp best option hai." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-foreground text-sm mb-2", children: "Support Hours" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Monday – Saturday" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: "9 AM – 7 PM" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Sunday" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: "10 AM – 4 PM" })
                ] })
              ] })
            ] })
          ]
        }
      )
    ] }) })
  ] });
}
export {
  ContactPage as default
};
