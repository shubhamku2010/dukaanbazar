import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@caffeineai/core-infrastructure";
import { CheckCircle, Mail, MessageCircle, Phone } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { createActor } from "../backend";

interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const INITIAL: FormState = { name: "", email: "", phone: "", message: "" };

export default function ContactPage() {
  const { actor } = useActor(createActor);
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const validate = (): boolean => {
    const e: Partial<FormState> = {};
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((ev) => ({ ...ev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
        form.message.trim(),
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

  return (
    <div className="bg-background min-h-screen" data-ocid="contact.page">
      {/* Header banner */}
      <div className="bg-primary py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            className="font-display text-3xl md:text-5xl font-semibold text-primary-foreground"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Humse Sampark Karein
          </motion.h1>
          <motion.p
            className="text-primary-foreground/80 mt-3 text-base md:text-lg"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Koi bhi sawaal ho — hum 24 ghante mein jawab denge.
          </motion.p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact Form */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-card border border-border rounded-2xl p-7 md:p-9">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-6">
                Message Bhejein
              </h2>

              {submitted ? (
                <motion.div
                  className="flex flex-col items-center text-center py-10 gap-4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  data-ocid="contact.success_state"
                >
                  <CheckCircle className="w-14 h-14 text-accent" />
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    Message Mil Gaya!
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
                    Shukriya aapke message ke liye. Hum jald hi aapse sampark
                    karenge — usually 24 ghante ke andar.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setSubmitted(false)}
                    data-ocid="contact.send_another_button"
                  >
                    Aur Message Bhejein
                  </Button>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-5"
                  data-ocid="contact.form"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <Label htmlFor="name">
                        Naam <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Aapka poora naam"
                        className={errors.name ? "border-destructive" : ""}
                        data-ocid="contact.name_input"
                      />
                      {errors.name && (
                        <p
                          className="text-xs text-destructive"
                          data-ocid="contact.name_field_error"
                        >
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email">
                        Email <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="aap@example.com"
                        className={errors.email ? "border-destructive" : ""}
                        data-ocid="contact.email_input"
                      />
                      {errors.email && (
                        <p
                          className="text-xs text-destructive"
                          data-ocid="contact.email_field_error"
                        >
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="phone">Phone Number (optional)</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      data-ocid="contact.phone_input"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="message">
                      Message <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Aapka sawaal ya feedback yahan likhein…"
                      rows={5}
                      className={errors.message ? "border-destructive" : ""}
                      data-ocid="contact.message_textarea"
                    />
                    {errors.message && (
                      <p
                        className="text-xs text-destructive"
                        data-ocid="contact.message_field_error"
                      >
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {serverError && (
                    <div
                      className="text-sm text-destructive bg-destructive/8 border border-destructive/20 rounded-lg px-4 py-3"
                      data-ocid="contact.error_state"
                    >
                      {serverError}
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                    disabled={submitting || !actor}
                    data-ocid="contact.submit_button"
                  >
                    {submitting ? (
                      <>
                        <div className="w-4 h-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
                        <span data-ocid="contact.loading_state">
                          Bhej rahe hain…
                        </span>
                      </>
                    ) : (
                      <>
                        <Mail className="w-4 h-4" /> Message Bhejein
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            className="flex flex-col gap-5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-display text-base font-semibold text-foreground mb-4">
                Seedha Sampark Karein
              </h3>
              <div className="space-y-4">
                <a
                  href="https://wa.me/919876543210?text=Hi%2C%20I%20have%20a%20question%20about%20DukaanBazar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                  data-ocid="contact.whatsapp_link"
                >
                  <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors flex-shrink-0">
                    <MessageCircle className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">WhatsApp</p>
                    <p>+91 98765 43210</p>
                  </div>
                </a>

                <a
                  href="mailto:support@dukaanbazar.in"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                  data-ocid="contact.email_link"
                >
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors flex-shrink-0">
                    <Mail className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Email</p>
                    <p>support@dukaanbazar.in</p>
                  </div>
                </a>

                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Phone</p>
                    <p>+91 98765 43210</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary/8 border border-primary/20 rounded-2xl p-5">
              <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center mb-3">
                <CheckCircle className="w-4 h-4 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground text-sm mb-1.5">
                24 Ghante Mein Jawab
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Hum generally 24 ghante ke andar respond karte hain. Urgent
                queries ke liye WhatsApp best option hai.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-5">
              <h4 className="font-semibold text-foreground text-sm mb-2">
                Support Hours
              </h4>
              <div className="space-y-1 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>Monday – Saturday</span>
                  <span className="text-foreground font-medium">
                    9 AM – 7 PM
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="text-foreground font-medium">
                    10 AM – 4 PM
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
