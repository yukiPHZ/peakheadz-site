(function attachPeakheadzItSupportObservation(root) {
  "use strict";

  const pageRoot = root.document && root.document.body;
  if (!pageRoot || !pageRoot.dataset.marketPage) return;

  const config = root.PeakheadzItSupportMarketObserverConfig || {};
  const runtimePackage = root.MarketObserverRuntimePackage || {};
  const profile = runtimePackage.profiles && runtimePackage.profiles[config.projectId];
  if (!profile || !Array.isArray(profile.aliases?.route_ids) || !profile.aliases.route_ids.includes(pageRoot.dataset.marketPage)) return;
  const page = {
    route_id: pageRoot.dataset.marketPage,
    content_type: pageRoot.dataset.marketContentType || "service_page",
    area: pageRoot.dataset.marketArea || "sakura_inzai_narita",
    service_type: pageRoot.dataset.marketServiceType || "onsite_it_support",
    intent_cluster: pageRoot.dataset.marketIntentCluster || "small_business_it_support",
    launch_group: "sakura_inzai_narita_initial",
    referrer_type: classifyReferrer(),
  };

  function consentState() {
    const api = root.MarketObserverConsent;
    return api && typeof api.read === "function" ? api.read().state : "unknown";
  }

  function mountConsent() {
    const api = root.MarketObserverConsent;
    if (api && typeof api.mount === "function") {
      api.mount({ locale: "ja", privacyUrl: "/information.html" });
    }
  }

  function classifyReferrer() {
    const query = new URLSearchParams(root.location.search || "");
    if (query.get("utm_source") === "google" && query.get("utm_campaign") === "gbp") return "google_business_profile";
    if (!root.document.referrer) return "direct";
    try {
      return new URL(root.document.referrer).origin === root.location.origin ? "internal" : "external";
    } catch (_error) {
      return "unknown";
    }
  }

  function actionToken(prefix) {
    if (root.crypto && root.crypto.randomUUID) return root.crypto.randomUUID();
    return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
  }

  function ctaGroup(target) {
    if (target.dataset.marketContactMethod) return "contact";
    if (target.closest(".it-support-contact")) return "contact";
    if (target.closest(".it-support-paths")) return "service_path";
    return "related_work";
  }

  function destinationType(target) {
    const method = target.dataset.marketContactMethod;
    if (method) return method;
    const href = target.getAttribute("href") || "";
    try {
      return new URL(href, root.location.origin).origin === root.location.origin ? "internal" : "external";
    } catch (_error) {
      return "external";
    }
  }

  function sectionId(target) {
    const eventName = target.dataset.marketImpression || "";
    if (eventName === "it_support_pricing_view") return "pricing";
    if (eventName === "it_support_lineworks_qr_view") return "lineworks_qr";
    return "contact";
  }

  function startObserver() {
    const tracker = root.MarketObserver;
    if (!tracker || typeof tracker.track !== "function") return;

    root.document.addEventListener("click", (event) => {
      const target = event.target instanceof Element ? event.target.closest("[data-market-event]") : null;
      const ctaId = target && target.dataset.marketCtaId;
      if (!target || !ctaId) return;
      tracker.track("cta_click", {
        ...page,
        cta_id: ctaId,
        cta_group: ctaGroup(target),
        contact_method: target.dataset.marketContactMethod || "",
        destination_type: destinationType(target),
      }, { actionToken: actionToken("cta") });
    }, true);

    const observed = root.document.querySelectorAll("[data-market-impression]");
    const trackSection = (element) => tracker.track("section_view", {
      ...page,
      section_id: sectionId(element),
    }, { actionToken: actionToken("section") });

    if (!("IntersectionObserver" in root)) {
      observed.forEach(trackSection);
      return;
    }
    const seen = new WeakSet();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || seen.has(entry.target)) return;
        seen.add(entry.target);
        trackSection(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.5 });
    observed.forEach((element) => observer.observe(element));
  }

  function start() {
    mountConsent();
    if (consentState() !== "granted" || !root.MarketObserver || !profile || !config.measurementId) return;
    const result = root.MarketObserver.init({
      measurementId: config.measurementId,
      runtimeSchema: runtimePackage.runtimeSchema,
      profile,
      runtimeSchemaHash: runtimePackage.runtimeSchemaHash,
      profileHash: runtimePackage.profileHashes && runtimePackage.profileHashes[config.projectId],
      pageContext: page,
    });
    if (!result.ok) return;
    root.MarketObserver.trackPageView(page);
    startObserver();
  }

  start();
})(typeof window !== "undefined" ? window : globalThis);
