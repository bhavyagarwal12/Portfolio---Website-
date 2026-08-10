import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Lock, Download, Mail, Eye, Loader2, RefreshCw, ArrowLeft, Send, CalendarRange } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const StatCard = ({ icon: Icon, label, value }) => (
  <div className="rounded-3xl border border-white/5 bg-[#111116] p-7">
    <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#7C5CFC]">
      <Icon className="h-5 w-5" />
    </div>
    <p className="font-display text-4xl font-semibold text-[#F5F5F7]">{value}</p>
    <p className="mt-1 text-xs uppercase tracking-widest text-[#6C6C7A]">{label}</p>
  </div>
);

const fmt = (iso) =>
  new Date(iso).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });

export default function Insights() {
  const [code, setCode] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [sendingWeekly, setSendingWeekly] = useState(false);

  const sendDigest = async () => {
    setSending(true);
    try {
      const res = await axios.post(`${API}/digest/send`, null, {
        params: { code, force: true },
      });
      const t = res.data.totals;
      toast.success(
        `Digest emailed to Bhavy — ${t.page_views} views, ${t.resume_downloads} downloads, ${t.new_messages} messages.`
      );
    } catch (e) {
      toast.error("Couldn't send digest. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const sendWeekly = async () => {
    setSendingWeekly(true);
    try {
      const res = await axios.post(`${API}/weekly/send`, null, {
        params: { code, force: true },
      });
      const t = res.data.totals;
      toast.success(
        `Weekly recap emailed — ${t.page_views} views, ${t.resume_downloads} downloads, ${t.new_messages} messages.`
      );
    } catch (e) {
      toast.error("Couldn't send weekly recap. Please try again.");
    } finally {
      setSendingWeekly(false);
    }
  };

  const load = async (passcode) => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`${API}/insights`, { params: { code: passcode } });
      setData(res.data);
    } catch (e) {
      setError(e?.response?.status === 401 ? "Incorrect passcode." : "Something went wrong.");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  if (!data) {
    return (
      <div className="grain relative flex min-h-screen items-center justify-center bg-[#0A0A0F] px-6">
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-[50vh] w-[80vw] max-w-2xl -translate-x-1/2 -translate-y-1/2">
          <div
            className="h-full w-full opacity-60"
            style={{
              background:
                "radial-gradient(50% 50% at 50% 50%, rgba(124,92,252,0.25) 0%, rgba(10,10,15,0) 70%)",
            }}
          />
        </div>
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          onSubmit={(e) => {
            e.preventDefault();
            load(code);
          }}
          data-testid="insights-login"
          className="relative z-10 w-full max-w-sm rounded-3xl border border-white/10 bg-[#111116]/90 p-8 backdrop-blur-xl"
        >
          <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[#7C5CFC]">
            <Lock className="h-5 w-5" />
          </div>
          <h1 className="font-display text-2xl font-semibold text-[#F5F5F7]">Visitor Insights</h1>
          <p className="mt-2 text-sm text-[#9A9AA5]">Enter your passcode to view analytics.</p>
          <input
            type="password"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Passcode"
            data-testid="insights-passcode"
            className="mt-6 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[#F5F5F7] outline-none transition-colors duration-300 placeholder:text-[#6C6C7A] focus:border-[#7C5CFC]"
          />
          {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            data-testid="insights-submit"
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#7C5CFC] px-6 py-3 font-medium text-white transition-all duration-300 hover:bg-[#8B7CF6] hover:shadow-[0_0_24px_rgba(124,92,252,0.5)] disabled:opacity-60"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Unlock"}
          </button>
          <a
            href="/"
            className="mt-5 inline-flex items-center gap-1.5 text-xs text-[#6C6C7A] transition-colors hover:text-[#9A9AA5]"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to portfolio
          </a>
        </motion.form>
      </div>
    );
  }

  const { totals, recent_messages, recent_events } = data;

  return (
    <div className="grain min-h-screen bg-[#0A0A0F] px-6 py-16" data-testid="insights-dashboard">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <p className="font-display text-sm uppercase tracking-[0.3em] text-[#7C5CFC]">Dashboard</p>
            <h1 className="mt-2 font-display text-4xl font-semibold text-[#F5F5F7]">Visitor Insights</h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={sendDigest}
              disabled={sending}
              data-testid="insights-send-digest"
              className="inline-flex items-center gap-2 rounded-full bg-[#7C5CFC] px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-[#8B7CF6] hover:shadow-[0_0_24px_rgba(124,92,252,0.5)] disabled:opacity-60"
            >
              {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              Daily digest
            </button>
            <button
              onClick={sendWeekly}
              disabled={sendingWeekly}
              data-testid="insights-send-weekly"
              className="inline-flex items-center gap-2 rounded-full border border-[#7C5CFC]/40 bg-[#7C5CFC]/10 px-4 py-2 text-sm font-medium text-[#c4b5fd] transition-all duration-300 hover:bg-[#7C5CFC]/20 disabled:opacity-60"
            >
              {sendingWeekly ? <Loader2 className="h-4 w-4 animate-spin" /> : <CalendarRange className="h-4 w-4" />}
              Weekly recap
            </button>
            <button
              onClick={() => load(code)}
              data-testid="insights-refresh"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-[#F5F5F7] transition-colors hover:border-white/30"
            >
              <RefreshCw className="h-4 w-4" /> Refresh
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <StatCard icon={Eye} label="Page Views" value={totals.page_views} />
          <StatCard icon={Download} label="Resume Downloads" value={totals.resume_downloads} />
          <StatCard icon={Mail} label="Contact Submissions" value={totals.contact_submissions} />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* recent messages */}
          <div className="rounded-3xl border border-white/5 bg-[#111116] p-7">
            <h2 className="mb-5 font-display text-lg font-medium text-[#F5F5F7]">Recent Messages</h2>
            {recent_messages.length === 0 && (
              <p className="text-sm text-[#6C6C7A]">No messages yet.</p>
            )}
            <div className="space-y-4">
              {recent_messages.map((m) => (
                <div key={m.id} className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium text-[#F5F5F7]">{m.name}</p>
                    <span className="text-xs text-[#6C6C7A]">{fmt(m.created_at)}</span>
                  </div>
                  <a href={`mailto:${m.email}`} className="text-xs text-[#7C5CFC]">
                    {m.email}
                  </a>
                  <p className="mt-2 text-sm leading-relaxed text-[#9A9AA5]">{m.message}</p>
                </div>
              ))}
            </div>
          </div>

          {/* recent activity */}
          <div className="rounded-3xl border border-white/5 bg-[#111116] p-7">
            <h2 className="mb-5 font-display text-lg font-medium text-[#F5F5F7]">Recent Activity</h2>
            {recent_events.length === 0 && (
              <p className="text-sm text-[#6C6C7A]">No activity yet.</p>
            )}
            <div className="space-y-2.5">
              {recent_events.map((ev) => (
                <div
                  key={ev.id}
                  className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        ev.type === "resume_download" ? "bg-[#7C5CFC]" : "bg-[#8B7CF6]/50"
                      }`}
                    />
                    <span className="text-sm capitalize text-[#F5F5F7]">
                      {ev.type.replace("_", " ")}
                    </span>
                  </div>
                  <span className="text-xs text-[#6C6C7A]">{fmt(ev.created_at)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <a
          href="/"
          className="mt-10 inline-flex items-center gap-1.5 text-sm text-[#6C6C7A] transition-colors hover:text-[#9A9AA5]"
        >
          <ArrowLeft className="h-4 w-4" /> Back to portfolio
        </a>
      </div>
    </div>
  );
}
