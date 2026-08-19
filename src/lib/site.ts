import type { LucideIcon } from "lucide-react";
import {
  Accessibility,
  Backpack,
  BadgeCheck,
  BarChart3,
  Bell,
  BookOpen,
  Boxes,
  Bus,
  CalendarDays,
  ClipboardCheck,
  Cloud,
  DatabaseBackup,
  CreditCard,
  Fingerprint,
  Globe,
  GraduationCap,
  IdCard,
  Layers,
  Library,
  LineChart,
  Lock,
  MessageSquare,
  NotebookPen,
  PackageSearch,
  QrCode,
  ScanLine,
  ShieldCheck,
  Smartphone,
  UserRoundCheck,
  Users,
  Wallet,
} from "lucide-react";

export const site = {
  name: "Colegios",
  tagline: "The operating system for modern schools",
  company: "AppMeSoft Private Limited",
  phones: ["+91-7838160389", "+91-9654047009"],
  whatsapp: "917838160389",
  email: "info@colegios.in",
  parentSite: "https://appme.in/",
  url: "https://colegios.appme.in",
} as const;

export const navLinks = [
  { name: "Home", href: "/" },
  { name: "Modules", href: "/features" },
  { name: "Campus Safety", href: "/security" },
  { name: "Contact", href: "/contact" },
] as const;

/* ------------------------------------------------------------------
   The four new capabilities. These lead everywhere they appear.
   ------------------------------------------------------------------ */

export type Highlight = {
  slug: string;
  name: string;
  kicker: string;
  summary: string;
  icon: LucideIcon;
  accent: "brand" | "leaf" | "saffron";
  points: string[];
};

export const newCapabilities: Highlight[] = [
  {
    slug: "qr-id-cards",
    name: "HMAC-secured QR ID cards",
    kicker: "Every card signs itself",
    summary:
      "Each student and staff ID carries a QR signed with a rotating HMAC key. A photograph of someone else's card fails at the gate, because the signature it carries has already expired.",
    icon: IdCard,
    accent: "brand",
    points: [
      "Payload signed server-side with HMAC-SHA256 — the card holds no readable personal data",
      "Signatures rotate on a short window, so screenshots and photocopies stop scanning",
      "Works offline at the gate: the scanner verifies the signature without a round trip",
      "Revoke a lost card instantly; the next scan is rejected campus-wide",
    ],
  },
  {
    slug: "secure-pickup",
    name: "Secure student pickup",
    kicker: "The right child leaves with the right adult",
    summary:
      "Dismissal runs on a scan. The guardian shows their QR, the gate confirms the pairing against the student's authorised list, and the parent gets a notification the moment the child is released.",
    icon: ScanLine,
    accent: "leaf",
    points: [
      "Guardian QR is matched to the student's authorised pickup list before release",
      "One-time delegate passes for a driver, relative or neighbour, valid for a single window",
      "Parents receive a released-at notification with time, gate and the name of who collected",
      "Every dismissal is logged, so an audit answers who left with whom, and when",
    ],
  },
  {
    slug: "visitor-management",
    name: "Visitor management",
    kicker: "No unlogged stranger on campus",
    summary:
      "Visitors pre-register or check in at the gate. Colegios issues a time-bound pass, notifies the host and closes the visit on exit, so the register is always current.",
    icon: UserRoundCheck,
    accent: "saffron",
    points: [
      "Pre-approved invitations with a time-bound QR pass sent by SMS or WhatsApp",
      "Walk-in capture: photo, ID proof, purpose and person being met",
      "Host is notified on arrival and can approve or decline from their phone",
      "Live on-campus roster and a one-tap evacuation list for drills and emergencies",
    ],
  },
  {
    slug: "inventory-management",
    name: "Inventory management",
    kicker: "Know what the school owns",
    summary:
      "Track uniforms, books, lab equipment, sports kit and furniture from purchase to issue to write-off, with reorder alerts before a stockroom runs dry.",
    icon: Boxes,
    accent: "brand",
    points: [
      "Item master with categories, stores, batches and per-unit cost",
      "Issue and return against a student, class, staff member or department",
      "Low-stock and reorder-level alerts, with purchase requests raised in a click",
      "Stock ledger and valuation reports that reconcile with your accounts",
    ],
  },
];

/* ------------------------------------------------------------------
   Full module catalogue
   ------------------------------------------------------------------ */

export type Module = {
  name: string;
  description: string;
  icon: LucideIcon;
  isNew?: boolean;
  href?: string;
};

export type ModuleGroup = {
  id: string;
  title: string;
  intent: string;
  accent: "brand" | "leaf" | "saffron";
  modules: Module[];
};

export const moduleGroups: ModuleGroup[] = [
  {
    id: "campus-safety",
    title: "Campus and safety",
    intent: "Control who enters, who leaves and what the school owns.",
    accent: "saffron",
    modules: [
      {
        name: "HMAC-secured QR ID cards",
        description:
          "Signed, rotating QR identities for students and staff. Screenshots and photocopies do not scan.",
        icon: IdCard,
        isNew: true,
        href: "/security#qr-id-cards",
      },
      {
        name: "Secure student pickup",
        description:
          "Guardians scan at dismissal. The pairing is verified before release and the parent is notified.",
        icon: ScanLine,
        isNew: true,
        href: "/security#secure-pickup",
      },
      {
        name: "Visitor management",
        description:
          "Time-bound visitor passes, host approval, live on-campus roster and an evacuation list.",
        icon: UserRoundCheck,
        isNew: true,
        href: "/security#visitor-management",
      },
      {
        name: "Inventory management",
        description:
          "Uniforms, books, lab and sports stock tracked from purchase to issue, with reorder alerts.",
        icon: Boxes,
        isNew: true,
        href: "/security#inventory-management",
      },
      {
        name: "Gate and premises log",
        description:
          "Every scan at every gate, searchable by person, date and gate, retained for audit.",
        icon: QrCode,
      },
      {
        name: "Transport tracking",
        description:
          "Route, stop and bus assignment with boarding scans, so a missed bus is noticed immediately.",
        icon: Bus,
      },
    ],
  },
  {
    id: "academics",
    title: "Academics",
    intent: "Run the teaching day without paper.",
    accent: "brand",
    modules: [
      {
        name: "Admissions and enquiry",
        description:
          "Online enquiry to enrolment in one pipeline, with document upload and a status a parent can check.",
        icon: GraduationCap,
      },
      {
        name: "Student information",
        description:
          "One profile per child: family, medical, documents, academic history and transfer certificates.",
        icon: Users,
      },
      {
        name: "Attendance",
        description:
          "Marked from a phone or auto-filled from the morning gate scan, with absentee alerts to parents.",
        icon: ClipboardCheck,
      },
      {
        name: "Exams and results",
        description:
          "Any grading scheme you already use — marks, grades, CCE, custom weightings — and report cards in a click.",
        icon: BookOpen,
      },
      {
        name: "Timetable",
        description:
          "Class, teacher and room schedules with substitution handling when a teacher is away.",
        icon: CalendarDays,
      },
      {
        name: "Homework and diary",
        description: "Daily work published to the parent app with due dates and attachments.",
        icon: NotebookPen,
      },
      {
        name: "Library",
        description:
          "Catalogue, issue and return, reservations and automatic late-fee provisioning.",
        icon: Library,
      },
      {
        name: "Certificates",
        description: "Bonafide, transfer and character certificates generated from live records.",
        icon: BadgeCheck,
      },
    ],
  },
  {
    id: "finance",
    title: "Fees and finance",
    intent: "Collect more, chase less, reconcile in minutes.",
    accent: "leaf",
    modules: [
      {
        name: "Flexible fee engine",
        description:
          "Concessions, waive-offs, partial payments, fines and sibling discounts, all inside the same structure.",
        icon: Wallet,
      },
      {
        name: "Hybrid fee schedules",
        description:
          "Monthly, quarterly, term and annual heads can coexist on one student. Mix them freely.",
        icon: Layers,
      },
      {
        name: "Online and offline collection",
        description:
          "Take payment at the counter or through the parent app; both land in the same ledger with a receipt.",
        icon: CreditCard,
      },
      {
        name: "Dues and reminders",
        description:
          "Automatic reminders before a due date and escalation after it, without a single phone call.",
        icon: Bell,
      },
      {
        name: "Payroll and staff HR",
        description:
          "Geo-fenced biometric attendance, leave, salary calculation and downloadable payslips.",
        icon: Fingerprint,
      },
      {
        name: "Accounts and expenses",
        description:
          "Vouchers, expense heads and inventory purchases that reconcile against collection.",
        icon: LineChart,
      },
    ],
  },
  {
    id: "platform",
    title: "Platform",
    intent: "Everything above, on every device, for every role.",
    accent: "brand",
    modules: [
      {
        name: "Parent and student app",
        description:
          "Android and iOS. Fees, attendance, results, diary and notices in one place, per child.",
        icon: Smartphone,
      },
      {
        name: "Announcements",
        description:
          "Notices to a class, a section or the whole school, with WhatsApp delivery arriving soon.",
        icon: MessageSquare,
      },
      {
        name: "Dashboards and reports",
        description:
          "Collection, attendance, admission and performance views for the principal, exportable in a click.",
        icon: BarChart3,
      },
      {
        name: "Role-based access",
        description:
          "A class teacher, an accountant and a trustee each see only what their role permits.",
        icon: Lock,
      },
      {
        name: "Cloud hosted",
        description:
          "Encrypted backups, no server in a cupboard, and updates that arrive without a visit.",
        icon: Cloud,
      },
      {
        name: "Stores and requisitions",
        description:
          "Departmental requests, approvals and issue slips wired into the inventory ledger.",
        icon: PackageSearch,
      },
    ],
  },
];

export const moduleCount = moduleGroups.reduce(
  (total, group) => total + group.modules.length,
  0,
);

/* ------------------------------------------------------------------
   The signature: one day at a school running Colegios
   ------------------------------------------------------------------ */

export type DayEvent = {
  time: string;
  minutes: number; // minutes from 00:00, used to place the marker
  label: string;
  module: string;
  detail: string;
  icon: LucideIcon;
  accent: "brand" | "leaf" | "saffron";
};

export const schoolDay: DayEvent[] = [
  {
    time: "07:40",
    minutes: 7 * 60 + 40,
    label: "Gate opens",
    module: "QR ID cards",
    detail:
      "Students tap a signed ID card at the gate. The scan verifies the HMAC signature offline, in under a second.",
    icon: IdCard,
    accent: "brand",
  },
  {
    time: "08:15",
    minutes: 8 * 60 + 15,
    label: "Attendance closes",
    module: "Attendance",
    detail:
      "The register fills itself from the morning scans. Parents of absent children are notified before the first period ends.",
    icon: ClipboardCheck,
    accent: "leaf",
  },
  {
    time: "09:30",
    minutes: 9 * 60 + 30,
    label: "A parent arrives",
    module: "Visitor management",
    detail:
      "A visitor pass is issued at reception, the class teacher is notified on her phone, and the visit closes itself on exit.",
    icon: UserRoundCheck,
    accent: "saffron",
  },
  {
    time: "11:00",
    minutes: 11 * 60,
    label: "Fees settle",
    module: "Fee engine",
    detail:
      "Counter payments and app payments land in the same ledger. The day's collection is already reconciled.",
    icon: Wallet,
    accent: "leaf",
  },
  {
    time: "13:15",
    minutes: 13 * 60 + 15,
    label: "Lab stock issued",
    module: "Inventory",
    detail:
      "Twelve dissection kits go out against Class IX-B. Stock drops below its reorder level, so a purchase request is raised.",
    icon: Boxes,
    accent: "brand",
  },
  {
    time: "14:45",
    minutes: 14 * 60 + 45,
    label: "Dismissal",
    module: "Secure pickup",
    detail:
      "Each guardian scans at the gate. The pairing is checked against the authorised list, and the parent is told the moment the child is released.",
    icon: ScanLine,
    accent: "saffron",
  },
  {
    time: "16:20",
    minutes: 16 * 60 + 20,
    label: "The head reads the day",
    module: "Dashboards",
    detail:
      "Attendance, collection, visitors and stock movement for the day, on one screen, without asking anyone for a file.",
    icon: BarChart3,
    accent: "brand",
  },
];

export const dayStart = 7 * 60; // 07:00
export const dayEnd = 17 * 60; // 17:00

/* ------------------------------------------------------------------
   Supporting content
   ------------------------------------------------------------------ */

export const outcomes = [
  {
    stat: "One",
    unit: "system",
    label: "Admissions to alumni",
    detail: "Fees, exams, attendance, stock and safety share a single record. Nothing is re-keyed.",
    icon: Layers,
  },
  {
    stat: "<1",
    unit: "second",
    label: "Gate verification",
    detail: "A signed QR is checked at the gate without a network round trip.",
    icon: ShieldCheck,
  },
  {
    stat: "Zero",
    unit: "paper",
    label: "Registers and files",
    detail: "Every record is searchable, dated and attributable to the person who entered it.",
    icon: Backpack,
  },
  {
    stat: "24×7",
    unit: "access",
    label: "For parents",
    detail: "Android, iOS and the web. The same truth, whoever is looking at it.",
    icon: Smartphone,
  },
];

/* ------------------------------------------------------------------
   Engineering standards.

   NOTE FOR THE TEAM: these are statements about how the product is
   built, not third-party certifications. Nothing here claims an ISO,
   SOC 2 or GDPR audit — add those only once they are actually held.
   Confirm each line below against the current implementation before
   this goes live.
   ------------------------------------------------------------------ */

export const standards = [
  {
    title: "Security",
    line: "Identity is signed, records are encrypted, and every action has a name against it.",
    icon: Lock,
    specs: [
      "HMAC-SHA256 signed QR identities",
      "Encrypted in transit and at rest",
      "Role-based access, full audit trail",
    ],
  },
  {
    title: "Reliability",
    line: "No server in a cupboard, and no morning where the gate stops working.",
    icon: DatabaseBackup,
    specs: [
      "Cloud hosted, automated backups",
      "Gate verification works offline",
      "Updates ship without a site visit",
    ],
  },
  {
    title: "Accessibility",
    line: "Built for the oldest phone in the staff room and the parent who needs larger text.",
    icon: Accessibility,
    specs: [
      "WCAG 2.2 AA contrast and keyboard use",
      "Runs on entry-level Android",
      "Respects system text size",
    ],
  },
  {
    title: "Interoperability",
    line: "Standard formats throughout, so your data is never trapped in our shape of it.",
    icon: Globe,
    specs: [
      "Unicode UTF-8 across every field",
      "ISO 8601 dates, ISO 4217 currency",
      "Full export in open formats",
    ],
  },
];

export const standardsChips = [
  "HMAC-SHA256",
  "TLS in transit",
  "Encryption at rest",
  "Role-based access control",
  "WCAG 2.2 AA",
  "Unicode UTF-8",
  "ISO 8601",
  "ISO 4217",
  "Android · iOS · Web",
];

export const faqs = [
  {
    q: "How long does it take to move our school onto Colegios?",
    a: "Most schools go live in two to four weeks. We import your existing student, staff and fee data, configure your fee heads and grading scheme to match what you already use, and train your staff on the modules they will actually touch. You are not asked to change how your school works.",
  },
  {
    q: "What makes the QR ID cards different from a printed card with a barcode?",
    a: "A printed barcode is a number, so a photograph of it works just as well as the card. A Colegios QR carries a payload signed with HMAC-SHA256 using a key that rotates on a short window. A photograph stops verifying once that window passes, and a lost card can be revoked campus-wide in one action.",
  },
  {
    q: "Do the gates need an internet connection to work?",
    a: "No. Signature verification happens on the scanning device, so entry and dismissal keep working through a network outage. Scans sync and notifications go out once the connection returns.",
  },
  {
    q: "Can parents use it if they are not comfortable with apps?",
    a: "Yes. Everything in the parent app is also delivered as SMS, and WhatsApp delivery is arriving shortly. Fee receipts and report cards can still be printed at the counter for any parent who prefers paper.",
  },
  {
    q: "Where is our data kept, and who can see it?",
    a: "Data is held encrypted in the cloud with automated backups, and access is role-based. A class teacher, an accountant and a trustee each see only what their role permits. Your school owns its data and can export it at any time.",
  },
  {
    q: "What does it cost?",
    a: "Pricing depends on your enrolment and the modules you switch on, so we quote per school rather than publishing a number that fits nobody. Book a demo and you will have a written quote the same week.",
  },
];

export const audiences = [
  {
    role: "For the head of school",
    line: "Collection, attendance, admissions and campus movement on one screen, without asking anyone for a file.",
    icon: BarChart3,
  },
  {
    role: "For the office",
    line: "Fee heads that match your structure, receipts that reconcile themselves, and dues chased automatically.",
    icon: Wallet,
  },
  {
    role: "For teachers",
    line: "Attendance, marks, homework and notices from a phone between periods. Report cards generate themselves.",
    icon: NotebookPen,
  },
  {
    role: "For parents",
    line: "Fees, results, diary and a notification the moment their child is collected at the gate.",
    icon: Smartphone,
  },
];
