import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const trackEvent = async (type, meta) => {
  try {
    await axios.post(`${API}/track`, { type, meta });
  } catch (e) {
    // fire-and-forget; never block UX on analytics
  }
};

export const trackPageView = () => {
  if (typeof window === "undefined") return;
  const key = "bhavy_pv_session";
  if (sessionStorage.getItem(key)) return;
  sessionStorage.setItem(key, "1");
  trackEvent("page_view");
};
