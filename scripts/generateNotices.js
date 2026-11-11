import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const noticesDir = path.resolve(__dirname, '../public/documents/notices');
if (!fs.existsSync(noticesDir)) {
  fs.mkdirSync(noticesDir, { recursive: true });
}

const documents = [
  {
    fileName: 'FCIT-NOT-2025-01-Membership-Selection.pdf',
    docId: 'FCIT-NOT-2025-01',
    refNo: 'HBTU/CSE/FCIT/2025/CIR-01',
    date: '15 March 2025',
    category: 'OFFICIAL NOTICE // MEMBERSHIP SELECTION',
    title: 'FCIT Annual Membership Selection Notice · 2025–2026',
    summary: 'Annual induction protocol for eligible undergraduate candidates into FCIT Working Guilds (Dev\'s Guild, Intelligence Guild, AlgoCrew, Fusion X).',
    sections: [
      {
        heading: '1. ELIGIBILITY & PREREQUISITES',
        body: 'Undergraduate students of B.Tech CSE, IT, and allied disciplines possessing proven technical curiosity, algorithmic proficiency, or open-source software contributions are eligible to apply. Applicants must register using university credentials.'
      },
      {
        heading: '2. GUILD ALLOCATION & EVALUATION PATHWAYS',
        body: 'Candidate evaluation is compartmentalised across four engineering guilds: Dev\'s Guild (Systems & Full-Stack Engineering), Intelligence Guild (Applied AI & Neural Models), AlgoCrew (Competitive Programming & Algorithms), and Fusion X (XR, UI/UX & Creative Engineering).'
      },
      {
        heading: '3. INDUCTION TIMELINE',
        body: 'Phase I (Online Technical Assessment): March 22, 2025.\nPhase II (Guild Architectural Challenge & Code Sprint): March 26-28, 2025.\nPhase III (Technical Review & Onboarding): April 02, 2025.'
      },
      {
        heading: '4. SUBMISSION & VERIFICATION',
        body: 'All portfolio repositories and challenge submissions must be committed to the designated FCIT Git repository prior to the deadline. Late submissions will be rejected by the automated CI evaluation pipeline.'
      }
    ],
    signatory: 'Prof. CSE & Faculty In-Charge, FCIT\nHarcourt Butler Technical University, Kanpur'
  },
  {
    fileName: 'FCIT-NOT-2025-02-Systems-Kernel-Workshop.pdf',
    docId: 'FCIT-NOT-2025-02',
    refNo: 'HBTU/CSE/FCIT/2025/WS-02',
    date: '02 April 2025',
    category: 'TECHNICAL WORKSHOP // SYSTEMS ARCHITECTURE',
    title: 'Build Lab: Systems & Kernel Foundations Workshop Registration',
    summary: 'Comprehensive hands-on systems programming clinic on Unix system internals, C memory architecture, and POSIX concurrency primitives.',
    sections: [
      {
        heading: '1. WORKSHOP OVERVIEW',
        body: 'A hands-on technical workshop focused on low-level systems programming in Unix environments. Topics include virtual memory mechanics, pointer arithmetic, custom malloc implementations, and Linux kernel system call tracing via strace/perf.'
      },
      {
        heading: '2. SCHEDULE & VENUE',
        body: 'Date: April 12-13, 2025\nTime: 10:00 AM - 05:00 PM IST\nVenue: Department Seminar Hall & Distributed Systems Computing Lab, CSE Building.'
      },
      {
        heading: '3. HARDWARE & ENVIRONMENT PREREQUISITES',
        body: 'Participants must bring a laptop configured with Linux (bare metal or WSL2/VM), GCC 13+, Make, GDB, and Git. Toolchain installation assistance will be provided 30 minutes prior to session commencement.'
      },
      {
        heading: '4. CERTIFICATION & CONTINUATION',
        body: 'Active participants completing the custom slab allocator assignment will receive a verified FCIT Systems Engineering Credential and priority selection for upcoming kernel development sprints.'
      }
    ],
    signatory: 'Lead Engineer, Dev\'s Guild & Technical Secretary, FCIT\nDepartment of Computer Science & Engineering'
  },
  {
    fileName: 'FCIT-NOT-2025-03-Open-Source-Summit.pdf',
    docId: 'FCIT-NOT-2025-03',
    refNo: 'HBTU/CSE/FCIT/2025/CONF-03',
    date: '12 May 2025',
    category: 'TECHNICAL SESSION // OPEN SOURCE COLLOQUIUM',
    title: 'Open Source Summit: Spring Edition Speaker & Sprint Announcement',
    summary: 'Collegiate technical symposium featuring keynote addresses from upstream maintainers, RFC formulation sprints, and fellowship mentorship.',
    sections: [
      {
        heading: '1. SYMPOSIUM AGENDA',
        body: 'The Spring Open Source Summit convenes active student maintainers and industry contributors. The agenda comprises keynote panels on upstream kernel contributions, Apache / CNCF governance models, and open protocol standardization.'
      },
      {
        heading: '2. CODE SPRINT & PROPOSAL CLINIC',
        body: 'Dedicated mentorship pods for Google Summer of Code (GSoC), Linux Foundation Mentorship (LFX), and Major League Hacking (MLH) fellow candidates. Maintainers will conduct direct pull request reviews.'
      },
      {
        heading: '3. KEYNOTE ADDRESSES',
        body: 'Session 01: "Designing Resilient Distributed State with eBPF" — 10:30 AM.\nSession 02: "RFC Mechanics and Consensus in Modern Compiler Frameworks" — 02:00 PM.'
      },
      {
        heading: '4. ADMISSION & ACCESS PROTOCOL',
        body: 'Open to all registered university students. Advance seating reservation is mandatory due to auditorium capacity constraints.'
      }
    ],
    signatory: 'Executive Council, FCIT\nDepartment of Computer Science & Engineering, HBTU'
  },
  {
    fileName: 'FCIT-NOT-2025-04-Department-Colloquium.pdf',
    docId: 'FCIT-NOT-2025-04',
    refNo: 'HBTU/CSE/FCIT/2025/COL-04',
    date: '28 May 2025',
    category: 'TECHNICAL SESSION // RESEARCH & COLLOQUIUM',
    title: 'Department Colloquium: Autonomous Systems & Distributed Architecture',
    summary: 'Special academic colloquium and technical paper reading on distributed consensus algorithms, Raft protocol verification, and fault-tolerant cloud runtimes.',
    sections: [
      {
        heading: '1. COLLOQUIUM THEME',
        body: 'The Department of Computer Science & Engineering in association with FCIT convenes a high-tier colloquium on formal verification of distributed state machines, TLA+ specifications, and asynchronous replication protocols.'
      },
      {
        heading: '2. PAPER PRESENTATION & DISCUSSION',
        body: 'Selected research scholars and student researchers will dissect breakthroughs in distributed storage consistency models and verifiable decentralized consensus systems.'
      },
      {
        heading: '3. SCHEDULE & PLATFORM',
        body: 'Date: June 05, 2025\nTime: 02:30 PM - 05:30 PM IST\nVenue: Virtual Stream + CSE Main Auditorium (Hybrid Session).'
      },
      {
        heading: '4. PARTICIPATION REQUIREMENTS',
        body: 'Attendees are advised to review the distributed consensus background reading list distributed via internal departmental mail.'
      }
    ],
    signatory: 'Research & Colloquium Coordinator, FCIT\nDepartment of Computer Science & Engineering'
  },
  {
    fileName: 'FCIT-NOT-2024-01-HackCSE-Rulebook.pdf',
    docId: 'FCIT-NOT-2024-01',
    refNo: 'HBTU/CSE/FCIT/2024/HACK-01',
    date: '18 October 2024',
    category: 'COMPETITION // HACKATHON RULEBOOK',
    title: 'HackCSE Collegiate Hackathon 2024 Rulebook & Schedule',
    summary: 'Official technical guidelines, judging rubrics, track briefs, and mentorship allocation for the 36-hour annual departmental hackathon.',
    sections: [
      {
        heading: '1. COMPETITION STRUCTURE',
        body: 'HackCSE is a 36-hour continuous software engineering hackathon bringing together multidisciplinary engineering teams to build production-grade prototypes.'
      },
      {
        heading: '2. TRACK ARCHITECTURES',
        body: 'Tracks include: (A) Autonomous Systems & Edge AI, (B) Distributed & Cryptographic Systems, (C) High-Throughput Developer Tooling, (D) Open Innovation for University Infrastructure.'
      },
      {
        heading: '3. CODE OF CONDUCT & CODE INTEGRITY',
        body: 'All codebases must be initialized from zero after the opening ceremony. Pre-existing code repositories will trigger immediate disqualification under automated Git commit audit rules.'
      },
      {
        heading: '4. EVALUATION CRITERIA',
        body: 'Technical Depth (35%), Architectural Soundness (25%), Functional Completeness (20%), UX & Polish (20%).'
      }
    ],
    signatory: 'Organising Committee, HackCSE 2024\nDepartment of Computer Science & Engineering, HBTU'
  }
];

async function createNoticePdf(docData) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]); // A4 in points
  const { width, height } = page.getSize();

  const fontRoman = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const fontBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
  const fontMono = await pdfDoc.embedFont(StandardFonts.Courier);
  const fontMonoBold = await pdfDoc.embedFont(StandardFonts.CourierBold);

  // Colors
  const navy = rgb(16 / 255, 43 / 255, 76 / 255);
  const gold = rgb(214 / 255, 179 / 255, 63 / 255);
  const darkCharcoal = rgb(25 / 255, 27 / 255, 31 / 255);
  const mutedText = rgb(90 / 255, 92 / 255, 96 / 255);
  const ivoryBg = rgb(255 / 255, 252 / 255, 245 / 255);

  // Background subtle tint
  page.drawRectangle({
    x: 0,
    y: 0,
    width,
    height,
    color: ivoryBg,
  });

  // Top header border line
  page.drawRectangle({
    x: 36,
    y: height - 40,
    width: width - 72,
    height: 3,
    color: navy,
  });
  page.drawRectangle({
    x: 36,
    y: height - 44,
    width: width - 72,
    height: 1,
    color: gold,
  });

  let currentY = height - 68;

  // Header Typography
  page.drawText('HARCOURT BUTLER TECHNICAL UNIVERSITY · KANPUR', {
    x: 36,
    y: currentY,
    size: 9,
    font: fontMonoBold,
    color: navy,
  });

  currentY -= 14;
  page.drawText('DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING', {
    x: 36,
    y: currentY,
    size: 13,
    font: fontBold,
    color: navy,
  });

  currentY -= 12;
  page.drawText('FRATERNITY OF CODING & INFORMATION TECHNOLOGY (FCIT)', {
    x: 36,
    y: currentY,
    size: 8.5,
    font: fontMono,
    color: gold,
  });

  currentY -= 20;

  // Metadata Bar
  page.drawRectangle({
    x: 36,
    y: currentY - 26,
    width: width - 72,
    height: 28,
    color: rgb(245 / 255, 240 / 255, 230 / 255),
    borderColor: rgb(220 / 255, 210 / 255, 195 / 255),
    borderWidth: 1,
  });

  page.drawText(`DOCUMENT ID: ${docData.docId}`, {
    x: 46,
    y: currentY - 14,
    size: 7.5,
    font: fontMonoBold,
    color: navy,
  });

  page.drawText(`REF: ${docData.refNo}`, {
    x: 230,
    y: currentY - 14,
    size: 7.5,
    font: fontMono,
    color: darkCharcoal,
  });

  page.drawText(`DATE: ${docData.date.toUpperCase()}`, {
    x: width - 150,
    y: currentY - 14,
    size: 7.5,
    font: fontMonoBold,
    color: navy,
  });

  currentY -= 48;

  // Notice Category
  page.drawText(`// ${docData.category}`, {
    x: 36,
    y: currentY,
    size: 8,
    font: fontMonoBold,
    color: rgb(143 / 255, 16 / 255, 27 / 255), // Burgundy
  });

  currentY -= 22;

  // Title (word wrap)
  page.drawText(docData.title, {
    x: 36,
    y: currentY,
    size: 16,
    font: fontBold,
    color: darkCharcoal,
  });

  currentY -= 14;

  // Divider
  page.drawLine({
    start: { x: 36, y: currentY },
    end: { x: width - 36, y: currentY },
    thickness: 1,
    color: rgb(214 / 255, 179 / 255, 63 / 255),
  });

  currentY -= 20;

  // Executive Summary
  page.drawText('EXECUTIVE SUMMARY & DISPATCH INTENT:', {
    x: 36,
    y: currentY,
    size: 8,
    font: fontMonoBold,
    color: navy,
  });

  currentY -= 14;

  page.drawText(docData.summary, {
    x: 36,
    y: currentY,
    size: 9.5,
    font: fontRoman,
    color: darkCharcoal,
    maxWidth: width - 72,
    lineHeight: 14,
  });

  currentY -= 32;

  // Sections
  for (const sec of docData.sections) {
    page.drawText(sec.heading, {
      x: 36,
      y: currentY,
      size: 9,
      font: fontMonoBold,
      color: navy,
    });
    currentY -= 14;

    page.drawText(sec.body, {
      x: 36,
      y: currentY,
      size: 9,
      font: fontRoman,
      color: darkCharcoal,
      maxWidth: width - 72,
      lineHeight: 13,
    });

    // Approximate lines consumed
    const lines = Math.ceil(sec.body.length / 95) + (sec.body.split('\n').length - 1);
    currentY -= lines * 14 + 16;
  }

  // Signatory & Seal section at bottom
  const sigY = 90;
  page.drawLine({
    start: { x: 36, y: sigY + 50 },
    end: { x: width - 36, y: sigY + 50 },
    thickness: 0.5,
    color: rgb(180 / 255, 180 / 255, 180 / 255),
  });

  page.drawText('ISSUED BY AUTHORITY OF:', {
    x: 36,
    y: sigY + 36,
    size: 7.5,
    font: fontMono,
    color: mutedText,
  });

  page.drawText(docData.signatory, {
    x: 36,
    y: sigY + 22,
    size: 8.5,
    font: fontRoman,
    color: darkCharcoal,
    lineHeight: 12,
  });

  // Official verification stamp text
  page.drawText('FCIT ARCHIVE RECORD: VERIFIED\nSHA256 CHECKSUM RECORDED IN LEDGER', {
    x: width - 230,
    y: sigY + 28,
    size: 7,
    font: fontMono,
    color: navy,
    lineHeight: 11,
  });

  // Footer bar
  page.drawRectangle({
    x: 36,
    y: 28,
    width: width - 72,
    height: 1,
    color: gold,
  });

  page.drawText(`FCIT OFFICIAL NOTICE REPOSITORY · ${docData.docId} · CONFIDENTIALITY: PUBLIC CIRCULAR`, {
    x: 36,
    y: 18,
    size: 6.5,
    font: fontMono,
    color: mutedText,
  });

  const pdfBytes = await pdfDoc.save();
  const filePath = path.join(noticesDir, docData.fileName);
  fs.writeFileSync(filePath, pdfBytes);
  console.log(`Generated: ${filePath} (${pdfBytes.length} bytes)`);
}

async function main() {
  for (const doc of documents) {
    await createNoticePdf(doc);
  }
}

main().catch(console.error);
