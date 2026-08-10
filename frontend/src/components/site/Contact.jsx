import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Mail, Phone, Linkedin, Github, ArrowUpRight, Send, Loader2 } from "lucide-react";
import { Reveal } from "./Reveal";
import { PROFILE } from "../../data";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/contact`, form);
      toast.success("Message sent! Bhavy will get back to you soon.");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      toast.error("Something went wrong. Please try again or email directly.");
    } finally {
      setLoading(false);
    }
  };

  const links = [
    { icon: Mail, label: "Email", value: PROFILE.email, href: `mailto:${PROFILE.email}` },
    { icon: Phone, label: "Phone", value: PROFILE.phone, href: `tel:${PROFILE.phone}` },
    { icon: Linkedin, label: "LinkedIn", value: "bhavy-agarwal", href: PROFILE.linkedin },
    { icon: Github, label: "GitHub", value: "bhavyagarwal12", href: PROFILE.github },
  ];

  return (
    <section id="contact" className="relative w-full overflow-hidden px-6 pb-16 pt-28" data-testid="contact-section">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[60vh]">
        <div
          className="h-full w-full"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 100%, #2d1b4e 0%, #1a1035 40%, rgba(10,10,15,0) 75%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <Reveal>
          <p className="text-center font-display text-sm font-medium uppercase tracking-[0.3em] text-[#7C5CFC]">
            Get in touch
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mx-auto mt-5 max-w-4xl text-center font-display text-4xl font-semibold leading-[1.03] tracking-tight text-[#F5F5F7] sm:text-6xl lg:text-7xl">
            Let's Build Something <span className="text-gradient">Data-Driven</span>.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* form */}
          <Reveal>
            <form
              onSubmit={submit}
              data-testid="contact-form"
              className="rounded-3xl border border-white/5 bg-[#111116] p-8"
            >
              <div className="space-y-5">
                <div>
                  <label className="mb-2 block text-xs uppercase tracking-widest text-[#6C6C7A]">Name</label>
                  <input
                    data-testid="contact-name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[#F5F5F7] outline-none transition-colors duration-300 placeholder:text-[#6C6C7A] focus:border-[#7C5CFC]"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs uppercase tracking-widest text-[#6C6C7A]">Email</label>
                  <input
                    data-testid="contact-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@company.com"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[#F5F5F7] outline-none transition-colors duration-300 placeholder:text-[#6C6C7A] focus:border-[#7C5CFC]"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs uppercase tracking-widest text-[#6C6C7A]">Message</label>
                  <textarea
                    data-testid="contact-message"
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell me about the role or project..."
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[#F5F5F7] outline-none transition-colors duration-300 placeholder:text-[#6C6C7A] focus:border-[#7C5CFC]"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  data-testid="contact-submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#7C5CFC] px-6 py-3.5 font-medium text-white transition-all duration-300 hover:bg-[#8B7CF6] hover:shadow-[0_0_30px_rgba(124,92,252,0.5)] disabled:opacity-60"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </Reveal>

          {/* links */}
          <Reveal delay={0.1}>
            <div className="grid h-full grid-cols-1 gap-4 sm:grid-cols-2">
              {links.map((l) => {
                const Icon = l.icon;
                return (
                  <a
                    key={l.label}
                    href={l.href}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    data-testid={`contact-link-${l.label.toLowerCase()}`}
                    className="group flex flex-col justify-between rounded-3xl border border-white/5 bg-[#111116] p-6 transition-colors duration-500 hover:border-[#7C5CFC]/40"
                  >
                    <div className="flex items-center justify-between">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#7C5CFC]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-[#6C6C7A] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#7C5CFC]" />
                    </div>
                    <div className="mt-8">
                      <p className="text-xs uppercase tracking-widest text-[#6C6C7A]">{l.label}</p>
                      <p className="mt-1 truncate text-[#F5F5F7]">{l.value}</p>
                    </div>
                  </a>
                );
              })}
            </div>
          </Reveal>
        </div>

        {/* footer */}
        <div className="mt-24 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <p className="font-display text-lg font-medium tracking-tight text-[#F5F5F7]">
            BHAVY AGARWAL
          </p>
          <p className="text-sm text-[#6C6C7A]">
            © {new Date().getFullYear()} — Data & Analytics Engineer. Built with intent.
          </p>
        </div>
      </div>
    </section>
  );
};
