export type FrictionLevel = "Lower" | "Moderate" | "High" | "Unknown";
export type EvidenceStatus = "Verified fact" | "Planning inference" | "Operator confirmation needed";

export type ExcursionSource = {
  title: string;
  publisher: string;
  url: string;
  checkedOn: string;
  supports: string;
};

export type ExcursionSegment = {
  stage: string;
  level: FrictionLevel;
  friction: string;
  verify: string;
};

export type ExcursionFaq = {
  question: string;
  answer: string;
};

export type ExcursionLibraryEntry = {
  slug: string;
  port: string;
  country: string;
  routeName: string;
  title: string;
  seoTitle: string;
  description: string;
  lead: string;
  reviewedOn: string;
  reviewDueOn: string;
  confidence: "Source-checked route pattern";
  scopeNote: string;
  verdictTitle: string;
  verdict: string;
  bestFit: string[];
  poorFit: string[];
  assumptions: string[];
  unresolved: string[];
  frictionMap: ExcursionSegment[];
  questions: string[];
  gentlerPlan: string[];
  faqs: ExcursionFaq[];
  sources: ExcursionSource[];
  relatedGuide?: { href: string; label: string };
};

export const excursionEntries: readonly ExcursionLibraryEntry[] = [
  {
    slug: "santorini-oia-shore-excursion-walking-difficulty",
    port: "Santorini",
    country: "Greece",
    routeName: "Santorini port to Fira and Oia",
    title: "Santorini and Oia shore excursion walking difficulty",
    seoTitle: "Santorini Shore Excursion Walking Difficulty for Seniors",
    description:
      "Check Santorini and Oia shore excursion difficulty for an older traveler: tendering, the Fira cable car, 587 port steps, Oia walking, standing, and return logistics.",
    lead:
      "Two tours called “Santorini and Oia highlights” can place completely different demands on an older traveler. The decisive detail is often not Oia itself—it is how the operator moves guests between the ship, tender landing, clifftop, coach, and return tender.",
    reviewedOn: "2026-08-14",
    reviewDueOn: "2026-11-14",
    confidence: "Source-checked route pattern",
    scopeNote:
      "This record evaluates a common Santorini–Fira–Oia route pattern. It does not verify every cruise-line or independent excursion using a similar name.",
    verdictTitle: "The ship-to-clifftop transition can be harder than the sightseeing.",
    verdict:
      "Santorini may be workable when the excursion confirms its tender landing, avoids the port steps, limits standing, provides close coach access, and protects the return plan. It is a poor blind booking when “Oia highlights” leaves those transitions unexplained.",
    bestFit: [
      "The operator names the tender landing and the transport used to reach the clifftop.",
      "The traveler can manage tender boarding and coach steps with the assistance actually offered.",
      "Oia walking is short, paced, and paired with a reliable seated break.",
      "The return route and ship cutoff leave room for variable port operations.",
    ],
    poorFit: [
      "The listing does not say whether the cable car or the 587 port steps are involved.",
      "Long standing or queues would exceed the traveler’s comfortable limit.",
      "The Oia drop-off, meeting point, and walking route are unspecified.",
      "The traveler needs a guaranteed step-free route or cannot transfer into a tender or coach.",
    ],
    assumptions: [
      "The ship anchors in the caldera and guests transfer ashore rather than walking directly from a berth.",
      "The excursion visits Fira, Oia, or both and returns to the ship the same day.",
      "The traveler is ambulatory but may need shorter walking and standing intervals.",
    ],
    unresolved: [
      "The exact tender landing assigned to this excursion",
      "Whether the cable car is required, included, or bypassed by organized transport",
      "The expected wait and standing time at the cable car or tender",
      "The coach drop-off, pedestrian route, and meeting point in Oia",
      "What happens if the traveler needs to shorten the visit",
    ],
    frictionMap: [
      {
        stage: "Ship to tender",
        level: "Moderate",
        friction: "Gangway, moving between vessels, steps or thresholds, and waiting to load.",
        verify: "Tender accessibility, assistance, step count, and whether mobility aids are accepted.",
      },
      {
        stage: "Tender to clifftop",
        level: "Unknown",
        friction: "The route may involve organized transport or the Fira cable car; the official port also identifies a 587-step route.",
        verify: "Named landing, exact uphill transport, standing time, and the no-stairs alternative.",
      },
      {
        stage: "Fira or Oia visit",
        level: "Moderate",
        friction: "Pedestrian lanes, grades, crowds, standing, and distance from coach access to viewpoints and meeting points.",
        verify: "Landmark sequence, walking minutes, longest stand, stairs, seating, and coach drop-off.",
      },
      {
        stage: "Return to the waterfront",
        level: "Unknown",
        friction: "A different return route, cable-car schedule, variable port demand, and tired legs can change the effort.",
        verify: "Return transport, who manages timing, backup plan, and ship cutoff margin.",
      },
      {
        stage: "Tender to ship",
        level: "Moderate",
        friction: "A second vessel transfer after the traveler has already completed the port day.",
        verify: "Expected wait, boarding assistance, and whether the ship or operator controls the return tender.",
      },
    ],
    questions: [
      "Where will guests tender ashore for this exact excursion?",
      "How do guests get from the tender landing to Fira or the coach—is the cable car involved?",
      "Does any part of the route use the 587 steps between Fira and the old port?",
      "How many minutes of walking and standing occur in Oia before a reliable seat?",
      "Where does the coach drop off, and how far is the viewpoint or guided route from there?",
      "Are stairs, steep lanes, or crowded standing areas unavoidable?",
      "Can a guest shorten the Oia walk and wait near the meeting point?",
      "Who manages the return tender timing, and what is the backup if transport is delayed?",
    ],
    gentlerPlan: [
      "Choose a small-group or private route only after the operator confirms the tender landing and uphill transport.",
      "Keep Oia to a short named route with a seated stop instead of unstructured wandering and a distant meeting point.",
      "Avoid combining a long Fira walk, extended Oia free time, and another walking-heavy stop on the same port day.",
      "Reconfirm the cable-car timetable and the operator’s return plan close to the sailing date.",
    ],
    faqs: [
      {
        question: "Do Santorini cruise passengers have to climb 587 steps?",
        answer:
          "Not necessarily. The Municipal Port Fund identifies the cable car and a 587-step route between Fira Bay and Fira, while organized excursion logistics may differ. Ask where your group lands and exactly how it reaches the clifftop; never infer a step-free route from the excursion title.",
      },
      {
        question: "Is the Santorini cable car guaranteed for my excursion?",
        answer:
          "No. The official ticket site tells passengers to check the current timetable and notes that it can change. The excursion seller must confirm whether the cable car is part of your route, how tickets are handled, and what return plan applies.",
      },
      {
        question: "Is Oia suitable for an older traveler?",
        answer:
          "It depends on the coach drop-off, walking route, grades, stairs, crowd conditions, standing time, and the traveler’s comfortable limits. A short paced visit can fit differently from an open-ended walk with a distant meeting point.",
      },
    ],
    sources: [
      {
        title: "Cruise and Fira Bay information",
        publisher: "Municipal Port Fund of Thira",
        url: "https://www.santoriniports.gov.gr/en/cruise",
        checkedOn: "2026-08-14",
        supports: "Caldera anchoring, Fira Bay access, cable car, 587 steps, and current cruise operations.",
      },
      {
        title: "About the Santorini cable car",
        publisher: "Santorini Cable Car",
        url: "https://santorinicablecar.gr/about-the-cable-car/",
        checkedOn: "2026-08-14",
        supports: "Official connection between the old port and Fira and operating context.",
      },
      {
        title: "Official cable-car tickets and timetable notice",
        publisher: "Santorini Cable Car",
        url: "https://tickets.santorinicablecar.gr/en/",
        checkedOn: "2026-08-14",
        supports: "Current timetable-change warning and passenger responsibility to recheck operations.",
      },
      {
        title: "Santorini settlements",
        publisher: "Visit Greece",
        url: "https://www.visitgreece.gr/experiences/culture/archaeological-sites-and-monuments/archaeological-sites-of-santorini/",
        checkedOn: "2026-08-14",
        supports: "Oia’s cliff-built setting and narrow traditional streets on the island.",
      },
    ],
    relatedGuide: {
      href: "/guides/dubrovnik-shore-excursion-walking-difficulty",
      label: "Compare Dubrovnik Old Town and City Walls",
    },
  },
  {
    slug: "ephesus-shore-excursion-walking-difficulty",
    port: "Kuşadası",
    country: "Türkiye",
    routeName: "Kuşadası port to Ephesus",
    title: "Ephesus shore excursion walking difficulty",
    seoTitle: "Ephesus Shore Excursion Walking Difficulty for Seniors",
    description:
      "Check Ephesus shore excursion difficulty for an older traveler: Kuşadası transfers, upper and lower gates, marble streets, Terrace Houses, standing, and route questions.",
    lead:
      "Ephesus is not a single flat attraction. It is a large ancient city with two gates about three kilometers apart, a main visitor route along historic streets, and optional areas that can change the effort. The excursion’s entrance sequence matters as much as its duration.",
    reviewedOn: "2026-08-14",
    reviewDueOn: "2026-11-14",
    confidence: "Source-checked route pattern",
    scopeNote:
      "This record evaluates a common Kuşadası–Ephesus route pattern. It does not verify every excursion, guide pace, vehicle, or optional stop sold under an Ephesus name.",
    verdictTitle: "A one-way gate plan may reduce backtracking, but this remains an ancient-street walking day.",
    verdict:
      "Ephesus may fit an ambulatory older traveler when the operator confirms the two-gate sequence, limits the route, allows pauses, and explains optional areas. “Coach tour” does not mean low walking: official and UNESCO sources describe a wide site whose main visitor flow follows its historic streets.",
    bestFit: [
      "The operator names both entry and exit gates and uses a one-way route without unnecessary backtracking.",
      "The traveler is steady on historic stone or marble surfaces and can handle the disclosed walking and standing intervals.",
      "The group can skip optional areas and still reach the vehicle or a reliable waiting point.",
      "The itinerary leaves enough recovery after Ephesus instead of stacking several walking-heavy sites.",
    ],
    poorFit: [
      "The seller provides only total tour duration and no walking or standing estimate.",
      "The entrance, exit, and optional Terrace Houses inclusion are unknown.",
      "The traveler cannot safely manage uneven historic surfaces or vehicle steps without confirmed assistance.",
      "The route offers no early exit, seating plan, or way to shorten the visit.",
    ],
    assumptions: [
      "The excursion starts from Kuşadası cruise port and includes a road transfer to Ephesus.",
      "The route enters the Ephesus archaeological site rather than visiting only a museum or nearby landmark.",
      "The traveler is ambulatory but may need controlled walking, standing, and recovery intervals.",
    ],
    unresolved: [
      "Which Ephesus gate the group enters and which gate it exits",
      "The exact landmark sequence and total walking and standing minutes",
      "Whether the separately accessed Terrace Houses are included",
      "Surface, stairs, shade, seating, and restroom timing on the operator’s route",
      "Whether a guest can shorten the route and reconnect with the vehicle",
    ],
    frictionMap: [
      {
        stage: "Ship to coach",
        level: "Lower",
        friction: "Pier walking, boarding wait, and coach steps begin the day before the archaeological site.",
        verify: "Pier meeting point, coach access, assistance, and seating arrangements.",
      },
      {
        stage: "Kuşadası to Ephesus",
        level: "Lower",
        friction: "Road transfer and time seated can be manageable, but may be combined with additional stops.",
        verify: "Transfer duration for the sailing date, restrooms, and every included stop.",
      },
      {
        stage: "Gate and entry",
        level: "Unknown",
        friction: "Ephesus has upper and lower gates about three kilometers apart; the chosen sequence shapes the route.",
        verify: "Named entry and exit gates, queue plan, surface, and first place to sit.",
      },
      {
        stage: "Ancient city route",
        level: "High",
        friction: "Historic marble-paved streets, a wide site, fixed guide pace, standing, crowds, and limited shortcuts.",
        verify: "Landmark sequence, walking and standing minutes, grades, steps, seating, and early-exit plan.",
      },
      {
        stage: "Terrace Houses or add-ons",
        level: "Unknown",
        friction: "The Terrace Houses require separate access and can expand the route; other excursions add nearby sites.",
        verify: "Whether included, the access demands, skip option, and where the traveler would rejoin.",
      },
      {
        stage: "Exit and return",
        level: "Moderate",
        friction: "Vehicle reconnection and tired legs after a long guided route.",
        verify: "Exit gate, pickup distance, waiting conditions, and return-to-ship margin.",
      },
    ],
    questions: [
      "Which Ephesus gate does the group enter, and which gate does it exit?",
      "What landmark sequence does the guide follow inside the archaeological site?",
      "How many minutes of walking and standing occur before a reliable seated break?",
      "Is the Terrace Houses area included, optional, or excluded?",
      "What historic surfaces, grades, stairs, or coach steps are unavoidable?",
      "Can a guest skip part of the route and meet the group at the exit gate?",
      "Are shade, restrooms, and seating available at planned intervals?",
      "What other stops are included, and how much walking do they add?",
    ],
    gentlerPlan: [
      "Prefer a confirmed one-way route between the two gates with no return walk through the site.",
      "Ask for a shorter named landmark sequence instead of relying on an “easy” or “moderate” label.",
      "Treat the Terrace Houses and every additional stop as a separate fit decision; skip them when the access details remain unclear.",
      "Choose a smaller group or private guide only when the operator confirms the pace can actually change and the vehicle can meet the agreed gate.",
    ],
    faqs: [
      {
        question: "How much walking is involved in an Ephesus shore excursion?",
        answer:
          "The exact amount depends on the gates, route, included landmarks, and optional stops. Türkiye’s official museum page says the upper and lower gates are about three kilometers apart, while UNESCO describes the main visitor flow along Curetes and Marble streets. Ask for walking and standing minutes for the exact tour.",
      },
      {
        question: "Is Ephesus suitable for older travelers?",
        answer:
          "It can be for an ambulatory traveler whose balance, stamina, and pace fit the stated route. Suitability cannot be inferred from age or the tour’s broad activity label; verify the gate sequence, historic surfaces, standing, seating, and exit options.",
      },
      {
        question: "Should an older traveler visit the Ephesus Terrace Houses?",
        answer:
          "Treat the Terrace Houses as a separate decision. The official museum page says they have separate entry, and an excursion may or may not include them. Ask the operator to describe their access demands and the skip-and-rejoin plan before booking.",
      },
    ],
    sources: [
      {
        title: "Ephesus archaeological site",
        publisher: "Republic of Türkiye Ministry of Culture and Tourism",
        url: "https://www.muze.gov.tr/muze-detay?DistId=EFS&SectionId=EFS01",
        checkedOn: "2026-08-14",
        supports: "Two gates about three kilometers apart, current visitor information, and separate Terrace Houses access.",
      },
      {
        title: "Ephesus World Heritage evaluation",
        publisher: "UNESCO World Heritage Centre",
        url: "https://whc.unesco.org/document/151544",
        checkedOn: "2026-08-14",
        supports: "Main visitor flow from the Upper Agora along Curetes and Marble streets toward the southern gate.",
      },
      {
        title: "Selçuk and Ephesus visitor overview",
        publisher: "GoTürkiye",
        url: "https://goturkiye.com/culturaljourneys/selcuk",
        checkedOn: "2026-08-14",
        supports: "On-foot exploration, marked paths, and the archaeological site’s wide extent.",
      },
      {
        title: "Ege Port Kuşadası",
        publisher: "Global Ports Holding",
        url: "https://www.globalportsholding.com/our-ports/ege-port-kusadasi/",
        checkedOn: "2026-08-14",
        supports: "Kuşadası’s role as the cruise gateway to Ephesus and port transport context.",
      },
    ],
    relatedGuide: {
      href: "/guides/pompeii-shore-excursion-walking-difficulty",
      label: "Compare Pompeii’s ancient-site terrain",
    },
  },
] as const;

export function getExcursionEntry(slug: string) {
  return excursionEntries.find((entry) => entry.slug === slug);
}

export function formatEvidenceDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}
