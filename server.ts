import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// API health endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", app: "legal.topsparkdigital" });
});

// Master Bangladesh Legal & Tax Knowledge System Prompt for Gemini
const BANGLADESH_LEGAL_TAX_SYSTEM_PROMPT = `You are the Expert Bangladesh Legal, Tax, Corporate & Compliance AI Assistant for "legal.topsparkdigital".
You possess deep, authoritative, and practical knowledge of Bangladesh's statutory laws, regulations, Statutory Regulatory Orders (SROs), National Board of Revenue (NBR) directives, Registrar of Joint Stock Companies and Firms (RJSC) rules, ICAB auditing standards, and judicial practices.

YOUR EXPERTISE SPANS THE 6 CORE PRACTICE AREAS UNDER BANGLADESH LAW:

======================================================================
1. PERSONAL INCOME TAX (E-RETURN) [ব্যক্তিগত আয়কর ও ই-রিটার্ন]
======================================================================
- Primary Statutes: Income Tax Act 2023 (আয়কর আইন ২০২৩), Finance Acts, and NBR e-Return Notifications.
- Assessment Year & Tax Day: Income year is July 1 to June 30. Tax Day for individual taxpayers is November 30 (unless extended by NBR).
- Individual Tax Slabs & Tax-Free Thresholds:
  * General Taxpayers (Male): First ৳3,50,000 (0%), Next ৳1,00,000 (5%), Next ৳4,00,000 (10%), Next ৳5,00,000 (15%), Next ৳5,00,000 (20%), Balance income (25%).
  * Female & Senior Citizens (65+ years): First ৳4,00,000 is tax-free.
  * Third Gender & Physically Challenged / Disabled persons: First ৳4,75,000 is tax-free.
  * Gazetted War-Wounded Freedom Fighters: First ৳5,00,000 is tax-free.
  * Parents/Legal Guardians of disabled individuals get an additional ৳50,000 tax-free limit.
- Minimum Tax Thresholds (Section 163):
  * Dhaka & Chattogram City Corporation areas: Minimum ৳5,000.
  * Other City Corporation areas: Minimum ৳4,000.
  * Outside City Corporations (Pourashava / Rural): Minimum ৳3,000.
- Mandatory Online E-Return Submission (etaxnbr.gov.bd):
  * Mandatory for specified employees (Govt, Bank, Telecom, Listed companies, corporate firms in Dhaka/Chattogram).
  * Requires: 12-digit e-TIN and biometric NID-registered mobile number for OTP verification.
- Wealth Statement (IT-10B / সম্পদ বিবরণী - Sections 166 & 167):
  * Mandatory if: Total gross assets exceed ৳40,00,000 (40 Lakhs), or owner of any motor car, or owns house property/flat in city corporation, or has foreign assets, or is a director/shareholder of a limited company.
  * Surcharge on Net Wealth: Applies if net wealth exceeds ৳4 Crore (10% to 35% surcharge on total income tax).
- Investment Tax Rebate (Schedule 6 Part 3):
  * Eligible investments: DPS (up to ৳1,20,000/year), Approved Life Insurance Premiums, Sanchayapatra (National Savings Certificates), Listed Stock Shares, Govt Treasury Bonds, Benevolent/Group Insurance funds.
  * Rebate Formula: 15% of allowable investment, OR 3% of total taxable income, OR ৳10,00,000 (whichever is lower).
- Proof of Submission of Return (PSR - Section 264):
  * Mandatory for 44+ essential public/commercial services (obtaining bank loans > ৳5 Lakh, Trade License renewal, credit card issuance, property registration, municipal building plan approval, utility connections, company directorship).
- Late Filing Penalties: Delay interest @ 4% per month under Section 174; penalty under Section 266/270.

======================================================================
2. COMPANY TAX (CORPORATE TAX) [কর্পোরেট আয়কর]
======================================================================
- Primary Statutes: Income Tax Act 2023 (আয়কর আইন ২০২৩), Finance Acts, Chapter 7 (TDS), Chapter 20 (Transfer Pricing).
- Corporate Tax Rates:
  * Non-Listed Private Limited Company: 27.5% standard (reduced to 25% if all income, expenditures > ৳5 Lakh, and total transactions > ৳36 Lakh are transacted via cashless/bank channels).
  * Publicly Listed Company: 20% (if compliant with cashless conditions) or 22.5%.
  * One Person Company (OPC): 22.5% (cashless compliant) or 25%.
  * Banks, Insurance & Financial Institutions: 37.5% (listed) to 40% (non-listed).
  * RMG (Ready-Made Garments) Exporters: 12% (10% for green certified factories).
  * Cigarette & Tobacco: 45% + 2.5% surcharge.
- Minimum Turnover Tax (Section 163):
  * Applies to companies with loss or low profit margin: 0.6% on gross receipts (2% for mobile operators, 1% for tobacco, 0.1% for new manufacturing startups in first 3 years).
- Advance Income Tax (AIT - Sections 120-129):
  * Mandatory for entities with estimated total income > ৳6,00,000. Paid in 4 quarterly installments (Sept 15, Dec 15, Mar 15, June 15). Shortfall attracts 10% annual delay interest.
- Tax Deducted at Source (TDS / Withholding Tax - Sections 86-119):
  * Mandatory deduction on vendor supplies, contracting, rent, professional/consultancy fees, salaries, dividends, and imports. Monthly withholding return under Section 177 is mandatory.
- Tax Filing Deadline:
  * Company Tax Day is the 15th day of the 7th month following the end of the company's accounting year (e.g., January 15 for June 30 year-end).
  * Audited Financial Statements with ICAB Document Verification Code (DVC) are legally mandatory.

======================================================================
3. VAT & BIN SERVICES [ভ্যাট ও বিন সেবা]
======================================================================
- Primary Statutes: Value Added Tax and Supplementary Duty Act 2012 (মূল্য সংযোজন কর ও সম্পূরক শুল্ক আইন ২০১২) and VAT Rules 2016.
- 9-Digit Business Identification Number (BIN) via NBR VAT Online System (vat.gov.bd):
  * Mandatory for all importers, exporters, manufacturers, commercial tenders, and registered commercial service providers.
  * Enlistment/Registration Thresholds:
    - Annual turnover below ৳50 Lakh: Excluded/Enlistment (no turnover tax).
    - Annual turnover ৳50 Lakh to ৳3 Crore: Turnover Tax Enlistment @ 4%.
    - Annual turnover above ৳3 Crore (or mandatory specified business activities regardless of turnover): Full 9-digit VAT Registration.
- VAT Rates:
  * Standard Rate: 15% (eligible for full Input Tax Credit / Rebate under Section 46).
  * Truncated / Reduced Rates: 5%, 7.5%, 10% (Input tax credit generally not admissible).
- Key Mushak Forms & Compliance:
  * Mushak 9.1 (Monthly VAT Return): Mandatory monthly submission by the 15th day of each following month (Section 64). Late penalty ৳10,000 + 1% monthly interest.
  * Mushak 4.3 (Input-Output Coefficient / উপকরণ-উৎপাদ সহগ): Mandatory declaration before supplying any new manufactured goods or services (Rule 21).
  * Mushak 6.3: Standard Tax Invoice to accompany every supply.
  * Mushak 6.6: Certificate of VAT Deducted at Source (VDS).
- VAT Deducted at Source (VDS):
  * Prescribed withholding entities (Govt, Limited Companies, Banks, NGOs) must deduct VAT on designated goods and services (e.g. procurement providers @ 7.5%, space rent @ 15%, security/cleaning @ 10%, advertising @ 15%).

======================================================================
4. COMPANY FORMATION & AGM RETURN [কোম্পানি গঠন ও এজিএম রিটার্ন]
======================================================================
- Primary Statutes: The Companies Act 1994 (কোম্পানি আইন ১৯৯৪), Companies (2nd Amendment) Act 2020 (OPC), Partnership Act 1932.
- Company Entity Types:
  * Private Limited Company: 2 to 50 shareholders, minimum 2 directors.
  * One Person Company (OPC): 1 natural individual shareholder + 1 designated nominee. Minimum paid-up capital ৳25 Lakh, max ৳5 Crore; turnover limit ৳1 Crore to ৳50 Crore.
  * Public Limited Company: Minimum 7 shareholders, min 3 directors.
  * Foreign Branch/Liaison Office: BIDA approval required before RJSC registration.
- RJSC Incorporation Process (roc.gov.bd):
  1. Name Clearance: Valid for 30 days.
  2. Drafting Memorandum of Association (MOA) and Articles of Association (AOA) with authorized capital and objects.
  3. Filing Statutory Forms: Form I (Declaration), Form VI (Notice of Registered Office), Form IX (Consent of Director), Form X (List of Directors), Form XII (Particulars of Directors/Managers).
  4. Payment of Government Registration Fees and Stamp Duty based on authorized share capital.
  5. Issuance of Certificate of Incorporation with digital authentication.
- Post-Incorporation Mandatory Steps:
  * Local Trade License, 12-digit e-TIN, Bank Account opening, encashment certificate, 9-digit BIN.
- Annual General Meeting (AGM - Section 81) & Statutory Returns:
  * First AGM: Held within 18 months from incorporation date.
  * Subsequent AGMs: Held once every calendar year, within 15 months of previous AGM.
  * Annual RJSC Filings:
    - Schedule X (Form 23B): Annual List of Shareholders and Summary of Share Capital submitted within 30 days of AGM.
    - Form XII: Update within 14 days of any change in directors/managing directors.
    - DVC-verified Audited Financial Statements submission.

======================================================================
5. AUDITING & FINANCIAL REPORTING [অডিটিং ও আর্থিক নিরীক্ষা]
======================================================================
- Primary Statutes: Financial Reporting Act 2015 (FRA), The Companies Act 1994 (Sections 210-213), Chartered Accountants Order 1973, ICAB guidelines, BFRS/IFRS and International Standards on Auditing (ISA).
- Statutory Audit Requirement:
  * Every Private and Public Limited Company in Bangladesh is legally required to have its annual accounts audited by an independent Chartered Accountant (CA) firm licensed by the Institute of Chartered Accountants of Bangladesh (ICAB).
- Document Verification Code (DVC):
  * Mandatory system-generated code developed by ICAB and NBR to verify authentic audit reports.
  * Required for corporate income tax filing with NBR, RJSC annual returns, bank loan underwriting, and BIDA/Bangladesh Bank approvals.
- Audit Solutions:
  * Statutory Financial Audit under Companies Act 1994.
  * Tax & VAT Audit Health Check / NBR assessment compliance.
  * Internal Audit, Standard Operating Procedures (SOP) & Internal Control Review.
  * Due Diligence & Forensic Audits for M&A and foreign investment.

======================================================================
6. LEGAL CONSULTATION: FAMILY LAW & CIVIL LAW [পারিবারিক ও দেওয়ানি আইন]
======================================================================
A. Family Law (পারিবারিক আইন):
- Muslim Family Laws Ordinance 1961 (MFLO / মুসলিম পারিবারিক আইন অধ্যাদেশ ১৯৬১):
  * Talaq / Divorce (Section 7): Written notice must be sent to the Chairman of Union Parishad / City Corporation Mayor / Ward Councilor, with a copy served to the spouse. Effective after 90 days of statutory notice (Iddat period).
  * Polygamy (Section 6): Prior written permission of the Arbitration Council is mandatory.
  * Maintenance (খোরপোশ - Section 9): Husband is legally obligated to maintain his wife during marriage and iddat, and provide for minor children.
  * Dower / Mahr (দেনমোহর - Section 10): Legally enforceable debt; Prompt (Mu'ajjal) payable on demand, Deferred (Muwajjal) payable on dissolution/death.
- Muslim Marriages and Divorces (Registration) Act 1974: Mandatory registration of Nikah (Kabin-nama) and Talaq by government-authorized Kazi.
- Dissolution of Muslim Marriages Act 1939: Judicial grounds for woman to seek divorce (cruelty, non-maintenance for 2 years, missing husband for 4 years, impotence, etc.).
- Child Custody & Guardianship (সন্তানের হেফাজত ও অভিভাবকত্ব):
  * Guardians and Wards Act 1890: Welfare of the minor is the paramount judicial test.
  * Mother has custody (Hizanat) of boys up to age 7 and girls up to puberty; father remains legal/financial guardian.
- Family Courts Act 2023 (পারিবারিক আদালত আইন ২০২৩): Exclusive jurisdiction over 5 matters: (1) Dissolution of marriage, (2) Restitution of conjugal rights, (3) Dower, (4) Maintenance, (5) Child custody and guardianship.
- Hindu Marriage Registration Act 2012 (optional registration) & Special Marriage Act 1872 (civil marriage).

B. Civil Law, Land & Property (দেওয়ানি আইন, জমি ও সম্পত্তি বিরোধ):
- Code of Civil Procedure 1908 (CPC / দেওয়ানি কার্যবিধি ১৯০৮): Civil litigation, Plaint (Order 7), Written Statement (Order 8), Temporary Injunction (নিষেধাজ্ঞা - Order 39 Rules 1 & 2), Execution of Decrees (Order 21).
- Specific Relief Act 1877 (সুনির্দিষ্ট প্রতিকার আইন ১৮৭৭):
  * Section 9: Suit for recovery of possession of immovable property by dispossessed person (within 6 months of illegal dispossession).
  * Section 42: Declaratory Suit (স্বত্ব ঘোষণার মামলা - title declaration, declaration of forged kabala/deeds).
  * Section 52-57: Permanent and Temporary Injunctions.
  * Section 12-30: Specific performance of contracts (চুক্তি প্রবল - e.g. enforcing Bayanapatra deed).
- Transfer of Property Act 1882 & Registration Act 1908:
  * Saf Kabala (Sale Deed), Heba (Gift deed), Mortgage, Lease. Mandatory registration of land contracts and sale deeds.
- Succession Act 1925 (উত্তরাধিকার আইন ১৯২৫):
  * Succession Certificate (সাকসেশন সার্টিফিকেট) from District Judge Court for movable financial assets (bank accounts, shares, savings certificates of deceased).
  * Probate & Letters of Administration for wills.
- Limitation Act 1908 (তামাদি আইন ১৯০৮): Statutory limitation periods for filing civil suits, appeals, and revisions.

======================================================================
RESPONSE STYLE & GUIDELINES:
======================================================================
- Respond in the language preferred by the user. If the user writes in Bangla, answer in rich, accurate Bengali (বাংলা). If English, answer in clear English.
- Cite relevant Bangladesh Acts, Sections, and official portals (incometax.gov.bd, etaxnbr.gov.bd, vat.gov.bd, roc.gov.bd) where helpful.
- Provide structured answers with bullet points, steps, deadlines, and requirements.
- Always include a subtle disclaimer that your guidance provides general legal & tax information and that users can book direct consultations with Top Spark Legal specialists for tailored case representation.
- Tone: Professional, authoritative, welcoming, and legally sound.`;

// Comprehensive Fallback Knowledge Engine for Bangladesh Legal & Tax
function generateFallbackLegalResponse(message: string, language: string): string {
  const query = message.toLowerCase().trim();
  const isBn = language === "bn";

  // 1. Personal Income Tax & E-Return
  if (
    query.includes("e-return") ||
    query.includes("ereturn") ||
    query.includes("ই-রিটার্ন") ||
    query.includes("ই রিটার্ন") ||
    query.includes("income tax") ||
    query.includes("আয়কর") ||
    query.includes("ট্যাক্স রিটার্ন") ||
    query.includes("tax slab") ||
    query.includes("ট্যাক্স স্ল্যাব") ||
    query.includes("কর স্ল্যাব") ||
    query.includes("করমুক্ত") ||
    query.includes("tax rebate") ||
    query.includes("কর রেয়াত") ||
    query.includes("it-10b") ||
    query.includes("সম্পদ বিবরণী") ||
    query.includes("wealth statement") ||
    query.includes("psr") ||
    query.includes("রিটার্ন দাখিলের প্রমাণ")
  ) {
    if (isBn) {
      return `**বাংলাদেশ আয়কর আইন ২০২৩ অনুযায়ী ব্যক্তিগত আয়কর ও ই-রিটার্ন (E-Return) নিয়মাবলী:**

১. **করমুক্ত আয়ের সীমা ও ট্যাক্স স্ল্যাব:**
   • সাধারণ পুরুষ করদাতা: প্রথম ৩,৫০,০০০ টাকা পর্যন্ত করমুক্ত (০%)
   • নারী ও ৬৫ বছর বা তদূর্ধ্ব জ্যেষ্ঠ নাগরিক: প্রথম ৪,০০,০০০ টাকা পর্যন্ত করমুক্ত
   • তৃতীয় লিঙ্গ ও প্রতিবন্ধী ব্যক্তি: প্রথম ৪,৭৫,০০০ টাকা পর্যন্ত করমুক্ত
   • গেজেটভুক্ত যুদ্ধাহত বীর মুক্তিযোদ্ধা: প্রথম ৫,০০,০০০ টাকা পর্যন্ত করমুক্ত
   • প্রতিবন্ধী সন্তানের পিতা/মাতা/আইনি অভিভাবক অতিরিক্ত ৫০,০০০ টাকা করমুক্ত সুবিধা পান।

২. **আয়ের স্ল্যাবভিত্তিক ট্যাক্স রেট:**
   • পরবর্তী ১,০০,০০০ টাকার জন্য: ৫%
   • পরবর্তী ৪,০০,০০০ টাকার জন্য: ১০%
   • পরবর্তী ৫,০০,০০০ টাকার জন্য: ১৫%
   • পরবর্তী ৫,০০,০০০ টাকার জন্য: ২০%
   • অবশিষ্ট মোট আয়ের উপর: ২৫%

৩. **ন্যূনতম কর (Minimum Tax):**
   • ঢাকা ও চট্টগ্রাম সিটি কর্পোরেশন এলাকা: ৫,০০০ টাকা
   • অন্যান্য সিটি কর্পোরেশন এলাকা: ৪,০০০ টাকা
   • সিটি কর্পোরেশনের বাইরের এলাকা (পৌরসভা/উপজেলা): ৩,০০০ টাকা

৪. **অনলাইন ই-রিটার্ন দাখিল (etaxnbr.gov.bd):**
   • এনবিআর পোর্টালে ১২-সংখ্যার e-TIN ও বায়োমেট্রিক NID-নিবন্ধিত মোবাইল নম্বর দিয়ে রেজিস্ট্রেশন করে ঘরে বসেই ট্যাক্স হিসাব, চালান পেমেন্ট ও একনলেজমেন্ট স্লিপ ডাউনলোড করা যায়।

৫. **সম্পদ বিবরণী (IT-10B) দাখিলের শর্তাবলী (ধারা ১৬৬ ও ১৬৭):**
   • মোট পরিসম্পদ ৪০ লাখ টাকার বেশি হলে, অথবা মোটর গাড়ির মালিক হলে, অথবা সিটি কর্পোরেশনে ফ্ল্যাট/বাড়ির মালিক হলে, অথবা লিমিটেড কোম্পানির পরিচালক হলে সম্পদ বিবরণী দাখিল বাধ্যতামূলক।

৬. **বিনিয়োগ কর রেয়াত (Schedule 6 Part 3):**
   • ডিপিএস (সর্বোচ্চ ১,২০,০০০ টাকা/বছর), সঞ্চয়পত্র, জীবন বীমার প্রিমিয়াম, শেয়ার বাজারে বিনিয়োগ ইত্যাদিতে প্রযোজ্য বিনিয়োগের উপর সর্বোচ্চ ১৫% কর রেয়াত পাওয়া যায়।

*পরামর্শ:* আপনার ই-রিটার্ন প্রস্তুতি, ট্যাক্স প্ল্যানিং ও সম্পদ বিবরণী তৈরিতে legal.topsparkdigital বিশেষজ্ঞ সেবা দিয়ে থাকে।`;
    } else {
      return `**Personal Income Tax & E-Return Guidelines in Bangladesh (Income Tax Act 2023):**

1. **Tax-Free Income Thresholds:**
   • General Individual Taxpayers: First ৳3,50,000 is tax-free (0%).
   • Female Taxpayers & Senior Citizens (65+ yrs): First ৳4,00,000 is tax-free.
   • Third Gender & Physically Challenged individuals: First ৳4,75,000 is tax-free.
   • Gazetted War-Wounded Freedom Fighters: First ৳5,00,000 is tax-free.
   • Parents/Guardians of disabled dependents receive an additional ৳50,000 tax-free limit.

2. **Progressive Tax Slabs:**
   • Next ৳1,00,000: 5%
   • Next ৳4,00,000: 10%
   • Next ৳5,00,000: 15%
   • Next ৳5,00,000: 20%
   • Remaining Balance: 25%

3. **Minimum Tax Liability:**
   • Dhaka & Chattogram City Corporation Areas: ৳5,000
   • Other City Corporations: ৳4,000
   • Non-City Corporation / Municipal & Rural Areas: ৳3,000

4. **Online E-Return Portal (\`etaxnbr.gov.bd\`):**
   • Register using your 12-digit e-TIN and biometric NID-linked mobile SIM. The portal generates instant tax calculations, online A-Challan payments, and the official Return Acknowledgement Receipt & Certificate.

5. **Mandatory Wealth Statement (IT-10B - Sections 166 & 167):**
   • Required if total gross wealth exceeds ৳40,00,000 (40 Lakhs), or if you own a motor car, house property/apartment in a city corporation, foreign assets, or serve as a shareholder-director of a limited company.

6. **Investment Tax Rebate (Schedule 6 Part 3):**
   • Eligible investments include DPS (up to ৳1,20,000/year), approved life insurance premiums, government treasury bonds, Sanchayapatra, and listed capital market shares.

*Disclaimer: General informational guidance. Contact legal.topsparkdigital for customized return filing support.*`;
    }
  }

  // 2. Company Tax & Corporate Compliance
  if (
    query.includes("company tax") ||
    query.includes("corporate tax") ||
    query.includes("কোম্পানি ট্যাক্স") ||
    query.includes("কর্পোরেট কর") ||
    query.includes("ait") ||
    query.includes("অগ্রিম কর") ||
    query.includes("advance tax") ||
    query.includes("tds") ||
    query.includes("withholding tax") ||
    query.includes("উৎস কর") ||
    query.includes("transfer pricing")
  ) {
    if (isBn) {
      return `**বাংলাদেশ কোম্পানি ট্যাক্স ও কর্পোরেট কর নিয়মাবলী (আয়কর আইন ২০২৩):**

১. **কর্পোরেট ট্যাক্স হার:**
   • নন-লিস্টেড প্রাইভেট লিমিটেড কোম্পানি: সাধারণ হার ২৭.৫% (যদি সকল লেনদেন, আয় এবং ৫ লাখ টাকার অধিক ব্যয় ব্যাংক/ক্যাশলেস মাধ্যমে সম্পন্ন হয় তবে ২৫%)।
   • লিস্টেড পাবলিক লিমিটেড কোম্পানি: ২০% (ক্যাশলেস শর্তপূরণ সাপেক্ষে) অথবা ২২.৫%।
   • এক ব্যক্তি কোম্পানি (OPC): ২২.৫% (ক্যাশলেস) অথবা ২৫%।
   • ব্যাংক ও আর্থিক প্রতিষ্ঠান: ৩৭.৫% (লিস্টেড) থেকে ৪০% (নন-লিস্টেড)।
   • আরএমজি পোশাক রপ্তানিকারক: ১২% (গ্রিন সার্টিফাইড ফ্যাক্টরি হলে ১০%)।

২. **ন্যূনতম টার্নওভার ট্যাক্স (ধারা ১৬৩):**
   • লোকসান বা কম মুনাফাকারী কোম্পানির ক্ষেত্রে মোট গ্রস প্রাপ্তির উপর ০.৬% হারে ন্যূনতম কর প্রযোজ্য হয় (মোবাইল অপারেটরের ক্ষেত্রে ২%, নতুন উৎপাদনকারী স্টার্টআপের প্রথম ৩ বছর ০.১%)।

৩. **অগ্রিম আয়কর (AIT - ধারা ১২০-১২৯):**
   • প্রাক্কলিত আয় ৬ লাখ টাকার বেশি হলে প্রতি অর্থবছরে ৪টি ত্রৈমাসিক কিস্তিতে (১৫ সেপ্টেম্বর, ১৫ ডিসেম্বর, ১৫ মার্চ, ১৫ জুন) অগ্রিম কর পরিশোধ করতে হয়।

৪. **উৎস কর কর্তন (TDS / Withholding Tax):**
   • সরবরাহকারী বিল, ঠিকাদারি, অফিস ভাড়া, পেশাদার সেবা ফি, বেতন এবং লভ্যাংশ প্রদানের সময় নির্ধারিত হারে উৎস কর কর্তন ও ধারা ১৭৭ অনুযায়ী মাসিক রিটার্ন দাখিল বাধ্যতামূলক।

৫. **রিটার্ন দাখিলের সময়সীমা ও ডিভিসি (DVC):**
   • কোম্পানির আয়বছর শেষ হওয়ার ৭ম মাসের ১৫ তারিখের মধ্যে চার্টার্ড অ্যাকাউন্ট্যান্ট ফার্ম কর্তৃক নিরীক্ষিত ও আইসিএবি-এর DVC (ডকুমেন্ট ভেরিফিকেশন কোড) সম্বলিত অডিট রিপোর্ট সহ ট্যাক্স রিটার্ন দাখিল করতে হয়।

*পরামর্শ:* কর্পোরেট ট্যাক্স প্ল্যানিং ও এনবিআর অডিট সহায়তার জন্য legal.topsparkdigital টিম প্রস্তুত রয়েছে।`;
    } else {
      return `**Bangladesh Corporate Income Tax Regulations (Income Tax Act 2023):**

1. **Applicable Corporate Tax Rates:**
   • Non-Listed Private Limited Company: Standard 27.5% (reduced to 25% if all income, expenditures > ৳5 Lakh, and total transactions > ৳36 Lakh are transacted via banking/cashless channels).
   • Publicly Listed Company: 20% (cashless compliant) or 22.5%.
   • One Person Company (OPC): 22.5% (cashless compliant) or 25%.
   • Banks & Financial Institutions: 37.5% (listed) to 40% (non-listed).
   • RMG Exporting Companies: 12% (10% for green-certified factories).

2. **Minimum Turnover Tax (Section 163):**
   • Applies on gross receipts if regular tax is lower or in case of loss: General rate is 0.6% (2% for telecom operators, 0.1% for new manufacturing startups during the first 3 years).

3. **Advance Income Tax (AIT - Sections 120-129):**
   • Mandatory if estimated taxable income exceeds ৳6,00,000. Payable in 4 equal quarterly installments (Sep 15, Dec 15, Mar 15, June 15).

4. **Withholding Tax / TDS Compliance (Sections 86-119):**
   • Deduction at source on vendor supplies, contractors, rent, professional services, and salaries. Monthly TDS statement filing under Section 177 is strictly mandatory.

5. **Mandatory Audited Accounts & DVC:**
   • Corporate tax returns must be accompanied by audited financial statements bearing a valid Document Verification Code (DVC) issued by an ICAB-licensed CA firm.

*Note: For specialized corporate tax planning and NBR representation, consult legal.topsparkdigital.*`;
    }
  }

  // 3. VAT & BIN Services
  if (
    query.includes("vat") ||
    query.includes("bin") ||
    query.includes("ভ্যাট") ||
    query.includes("বিন") ||
    query.includes("mushak") ||
    query.includes("মূসক") ||
    query.includes("9.1") ||
    query.includes("4.3") ||
    query.includes("vds") ||
    query.includes("উৎসে মূসক")
  ) {
    if (isBn) {
      return `**বাংলাদেশ মূল্য সংযোজন কর ও সম্পূরক শুল্ক আইন ২০১২ অনুযায়ী ভ্যাট ও বিন (BIN) নিয়মাবলী:**

১. **৯-সংখ্যার বিজনেস আইডেন্টিফিকেশন নম্বর (BIN) রেজিস্ট্রেশন:**
   • এনবিআর ভ্যাট অনলাইন পোর্টালে (vat.gov.bd) অনলাইনে আবেদন করতে হয়।
   • বার্ষিক টার্নওভার ৫০ লাখ টাকার নিচে: অব্যাহতিপ্রাপ্ত / তালিকাভুক্তি।
   • বার্ষিক টার্নওভার ৫০ লাখ থেকে ৩ কোটি টাকা: ৪% হারে টার্নওভার কর তালিকাভুক্তি।
   • বার্ষিক টার্নওভার ৩ কোটি টাকার বেশি অথবা আমদানিকারক/রপ্তানিকারক/নির্দিষ্ট সেবা: বাধ্যতামূলক ৯-সংখ্যার ভ্যাট রেজিস্ট্রেশন।

২. **ভ্যাট হারসমূহ (VAT Rates):**
   • প্রমিত (Standard) ভ্যাট হার: ১৫% (এতে উপকরণ কর রেয়াত বা Input Tax Credit পাওয়া যায়)।
   • হ্রাসকৃত হার: ৫%, ৭.৫%, ১০% (এক্ষেত্রে সাধারণত উপকরণ রেয়াত পাওয়া যায় না)।

৩. **মূসক ৯.১ (মাসিক ভ্যাট রিটার্ন):**
   • প্রতি কর মেয়াদের পরবর্তী মাসের **১৫ তারিখের** মধ্যে মূসক ৯.১ রিটার্ন দাখিল করা বাধ্যতামূলক (ধারা ৬৪)।
   • সময়মত রিটার্ন দাখিল না করলে প্রতি রিটার্নে ১০,০০০ টাকা জরিমানা এবং অপরিশোধিত ভ্যাটের উপর মাসিক ১% বিলম্ব সুদ প্রযোজ্য হয়।

৪. **মূসক ৪.৩ (উপকরণ-উৎপাদ সহগ / Input-Output Coefficient):**
   • যে কোনো নতুন পণ্য উৎপাদন বা সেবা সরবরাহের পূর্বে কাঁচামাল ও মূল্যের অনুপাত ঘোষণা করে মূসক ৪.৩ দাখিল করা বাধ্যতামূলক (বিধি ২১)।

৫. **উৎসে মূসক কর্তন (VDS - মূসক ৬.৬):**
   • সীমিত দায় কোম্পানি ও সরকারি সংস্থা নির্ধারিত ৪৩+ সেবা খাতে বিল পরিশোধের সময় উৎস থেকে ভ্যাট কেটে মূসক ৬.৬ সার্টিফিকেট প্রদান করে সরকারি কোষাগারে জমা দিতে বাধ্য।

*পরামর্শ:* ভ্যাট রিটার্ন দাখিল ও অডিট কমপ্লায়েন্সের জন্য legal.topsparkdigital এর সহায়তা নিন।`;
    } else {
      return `**Bangladesh VAT & BIN Regulations (VAT & SD Act 2012 & Rules 2016):**

1. **9-Digit Business Identification Number (BIN) via \`vat.gov.bd\`:**
   • Mandatory for importers, exporters, manufacturers, commercial tenders, and specified service providers.
   • Turnover Thresholds:
     - Under ৳50 Lakhs: Excluded from mandatory registration.
     - ৳50 Lakhs to ৳3 Crore: Turnover Tax Enlistment @ 4%.
     - Above ৳3 Crore (or specified businesses): Standard 9-digit VAT Registration.

2. **VAT Rates & Input Tax Credit (Section 46):**
   • Standard Rate: 15% (allows full Input Tax Credit/Rebate).
   • Reduced Rates: 5%, 7.5%, 10% (Input tax rebate generally not admissible).

3. **Monthly VAT Return (Mushak 9.1):**
   • Must be submitted by the **15th day** of each following month (Section 64). Late submission attracts a fixed penalty of ৳10,000 per return + 1% monthly interest on unpaid VAT.

4. **Input-Output Coefficient (Mushak 4.3):**
   • Mandatory declaration of raw materials, overheads, and value addition ratio before supplying any manufactured product or service (Rule 21).

5. **VAT Deducted at Source (VDS & Mushak 6.6):**
   • Registered withholding entities must deduct VAT on designated procurement and service categories and issue Mushak 6.6 certificates within 3 working days.

*Note: For complete VAT filing and audit health checks, contact legal.topsparkdigital.*`;
    }
  }

  // 4. Company Formation & AGM Return
  if (
    query.includes("company formation") ||
    query.includes("incorporat") ||
    query.includes("কোম্পানি গঠন") ||
    query.includes("কোম্পানি রেজিস্ট্রেশন") ||
    query.includes("rjsc") ||
    query.includes("আরজেএসসি") ||
    query.includes("opc") ||
    query.includes("agm") ||
    query.includes("এজিএম") ||
    query.includes("schedule x") ||
    query.includes("তফসিল") ||
    query.includes("form xii") ||
    query.includes("ফর্ম ১২") ||
    query.includes("moa") ||
    query.includes("aoa")
  ) {
    if (isBn) {
      return `**কোম্পানি আইন ১৯৯৪ অনুযায়ী কোম্পানি গঠন ও বার্ষিক এজিএম (AGM) রিটার্ন নিয়মাবলী:**

১. **কোম্পানির প্রকারভেদ:**
   • প্রাইভেট লিমিটেড কোম্পানি: ন্যূনতম ২ জন ও সর্বোচ্চ ৫০ জন শেয়ারহোল্ডার, ন্যূনতম ২ জন পরিচালক।
   • এক ব্যক্তি কোম্পানি (OPC): ১ জন প্রাকৃতিক ব্যক্তি শেয়ারহোল্ডার + ১ জন মনোনীত ব্যক্তি (Nominee)। পরিশোধিত মূলধন ২৫ লাখ থেকে ৫ কোটি টাকা।
   • পাবলিক লিমিটেড কোম্পানি: ন্যূনতম ৭ জন শেয়ারহোল্ডার ও ৩ জন পরিচালক।

২. **আরজেএসসি (RJSC - roc.gov.bd) ইনকর্পোরেশন ধাপসমূহ:**
   • ধাপ ১: নাম ছাড়পত্র (Name Clearance) আবেদন (মেয়াদ ৩০ দিন)।
   • ধাপ ২: মেমোরেন্ডাম অব অ্যাসোসিয়েশন (MOA) ও আর্টিকেলস অব অ্যাসোসিয়েশন (AOA) ড্রাফটিং।
   • ধাপ ৩: সংবিধিবদ্ধ ফরম পূরণ — Form I (ঘোষণাপত্র), Form VI (অফিসের ঠিকানা), Form IX (পরিচালকের সম্মতি), Form X (পরিচালকদের তালিকা), Form XII (পরিচালকদের বিবরণ)।
   • ধাপ ৪: অনুমোদিত মূলধনের উপর সরকারি রেজিস্ট্রেশন ফি ও স্ট্যাম্প ডিউটি প্রদান।
   • ধাপ ৫: ইনকর্পোরেশন সার্টিফিকেট ও সার্টিফাইড MOA/AOA সংগ্রহ।

৩. **বার্ষিক সাধারণ সভা (AGM - ধারা ৮১) ও আরজেএসসি রিটার্ন:**
   • প্রথম AGM: কোম্পানি গঠনের ১৮ মাসের মধ্যে অনুষ্ঠিত হতে হবে।
   • পরবর্তী AGM: প্রতি ক্যালেন্ডার বছরে একবার এবং পূর্ববর্তী AGM-এর ১৫ মাসের মধ্যে অনুষ্ঠিত হতে হবে।
   • শিডিউল এক্স (Schedule X / Form 23B): AGM সমাপ্তির **৩০ দিনের** মধ্যে বার্ষিক শেয়ারহোল্ডার তালিকা ও মূলধনের বিবরণ আরজেএসসিতে দাখিল করতে হয়।
   • ফর্ম XII: পরিচালকমণ্ডলী বা ব্যবস্থাপনা পরিচালকের কোনো পরিবর্তন হলে ১৪ দিনের মধ্যে আপডেট করতে হয়।
   • নিরীক্ষিত আর্থিক বিবরণী (Audited Financial Statements with DVC) দাখিল বাধ্যতামূলক।

*পরামর্শ:* সম্পূর্ণ এন্ড-টু-এন্ড কোম্পানি রেজিস্ট্রেশন ও বার্ষিক আরজেএসসি কমপ্লায়েন্সের জন্য legal.topsparkdigital বিশেষজ্ঞ সেবা দেয়।`;
    } else {
      return `**Company Formation & Annual AGM Filings in Bangladesh (The Companies Act 1994):**

1. **Company Entity Structures:**
   • Private Limited Company: 2 to 50 shareholders, minimum 2 directors.
   • One Person Company (OPC): 1 individual shareholder + 1 designated nominee. Minimum paid-up capital ৳25 Lakh, max ৳5 Crore.
   • Public Limited Company: Minimum 7 shareholders, min 3 directors.

2. **Step-by-Step RJSC Incorporation (\`roc.gov.bd\`):**
   • Step 1: Online Name Clearance application (valid for 30 days).
   • Step 2: Drafting the Memorandum of Association (MOA) and Articles of Association (AOA).
   • Step 3: Submission of statutory forms: Form I (Declaration), Form VI (Registered Office), Form IX (Director Consent), Form X (List of Directors), Form XII (Particulars of Directors/Managers).
   • Step 4: Payment of government registration fees and stamp duty based on authorized share capital.
   • Step 5: Issuance of official Certificate of Incorporation and digitally certified MOA/AOA.

3. **Annual General Meeting (AGM - Section 81) & RJSC Filings:**
   • First AGM: Must be held within 18 months of incorporation.
   • Subsequent AGMs: Held once every calendar year, and within 15 months of the previous AGM.
   • Statutory Annual Return (Schedule X / Form 23B): Must be filed within **30 days** of holding the AGM.
   • Form XII: Filed within 14 days of any change in the Board of Directors or Managing Director.
   • DVC-verified audited financial statements must accompany the annual return.

*Note: For complete RJSC incorporation and annual compliance filings, connect with legal.topsparkdigital.*`;
    }
  }

  // 5. Auditing & Financial Reporting
  if (
    query.includes("audit") ||
    query.includes("অডিট") ||
    query.includes("নিরীক্ষা") ||
    query.includes("dvc") ||
    query.includes("ডিভিসি") ||
    query.includes("icab") ||
    query.includes("আর্থিক বিবরণী") ||
    query.includes("financial statement")
  ) {
    if (isBn) {
      return `**বাংলাদেশে সংবিধিবদ্ধ অডিটিং ও আইসিএবি ডিভিসি (DVC) নিয়মাবলী:**

১. **আইনি বাধ্যবাধকতা (কোম্পানি আইন ১৯৯৪ ও FRA ২০১৫):**
   • বাংলাদেশে নিবন্ধিত প্রতিটি প্রাইভেট ও পাবলিক লিমিটেড কোম্পানির বার্ষিক আর্থিক হিসাব একজন স্বতন্ত্র চার্টার্ড অ্যাকাউন্ট্যান্ট (CA) ফার্ম দ্বারা নিরীক্ষা করা সংবিধিবদ্ধভাবে বাধ্যতামূলক (ধারা ২১০-২১৩)।

২. **ডকুমেন্ট ভেরিফিকেশন কোড (DVC):**
   • ভুয়া অডিট রিপোর্ট রোধে ICAB এবং NBR যৌথভাবে DVC ব্যবস্থা চালু করেছে।
   • প্রতিটি আসল অডিট রিপোর্টে একটি ইউনিক ১৮-সংখ্যার DVC কোড থাকে।
   • এনবিআর আয়কর রিটার্ন, আরজেএসসি বার্ষিক রিটার্ন ও ব্যাংক লোনের ক্ষেত্রে DVC ছাড়া অডিট রিপোর্ট আইনত গ্রহণযোগ্য নয়।

৩. **অডিট সেবা ক্যাটাগরি:**
   • সংবিধিবদ্ধ বার্ষিক আর্থিক অডিট (Statutory Financial Audit)
   • ট্যাক্স ও ভ্যাট ইন্টারনাল অডিট এবং প্রি-অ্যাসেসমেন্ট হেলথ চেক
   • অভ্যন্তরীণ নিয়ন্ত্রণ ব্যবস্থা (Internal Controls & SOP Audit)
   • বিশেষ ফরেনসিক অডিট ও ডিউ ডিলিজেন্স (Due Diligence for Foreign Investment)।

*পরামর্শ:* আপনার প্রতিষ্ঠানের জন্য বিশ্বস্ত ও মানসম্মত অডিটিং সহায়তার জন্য legal.topsparkdigital এর সাথে যোগাযোগ করুন।`;
    } else {
      return `**Statutory Auditing & ICAB DVC Standards in Bangladesh:**

1. **Statutory Legal Requirement (Companies Act 1994 & FRA 2015):**
   • Every Private and Public Limited Company in Bangladesh is legally required to have its annual financial statements audited by an independent Chartered Accountant (CA) firm registered with the Institute of Chartered Accountants of Bangladesh (ICAB) under Sections 210-213.

2. **Document Verification Code (DVC):**
   • Mandatory system-generated security code developed jointly by ICAB and NBR.
   • NBR tax circles, RJSC, commercial banks, and Bangladesh Bank verify the DVC online. Any audit report submitted without an authentic DVC is treated as invalid and non-compliant.

3. **Audit Service Areas:**
   • Statutory Financial Statement Audits (BFRS / IFRS & ISA compliant).
   • Tax & VAT Internal Audit & Health Checks.
   • Internal Controls & Corporate Governance Reviews.
   • Financial Due Diligence for Mergers, Acquisitions & Foreign Investments.

*Note: For accredited statutory auditing and compliance support, contact legal.topsparkdigital.*`;
    }
  }

  // 6. Legal Consultation: Family Law & Civil Law
  if (
    query.includes("family law") ||
    query.includes("divorce") ||
    query.includes("talaq") ||
    query.includes("তালাক") ||
    query.includes("ডিভোর্স") ||
    query.includes("বিবাহবিচ্ছেদ") ||
    query.includes("পারিবারিক আইন") ||
    query.includes("দেনমোহর") ||
    query.includes("dower") ||
    query.includes("mahr") ||
    query.includes("খোরপোশ") ||
    query.includes("maintenance") ||
    query.includes("custody") ||
    query.includes("হেফাজত") ||
    query.includes("সন্তান") ||
    query.includes("civil law") ||
    query.includes("দেওয়ানি") ||
    query.includes("জমি") ||
    query.includes("property") ||
    query.includes("injunction") ||
    query.includes("নিষেধাজ্ঞা") ||
    query.includes("succession") ||
    query.includes("সাকসেশন") ||
    query.includes("kabala") ||
    query.includes("কবলা") ||
    query.includes("বায়না")
  ) {
    if (isBn) {
      return `**বাংলাদেশে পারিবারিক আইন ও দেওয়ানি সম্পত্তি আইন সংক্রান্ত পরামর্শ:**

১. **পারিবারিক আইন (Family Law):**
   • **তালাক / বিবাহবিচ্ছেদ প্রক্রিয়া (MFLO ১৯৬১, ধারা ৭):** তালাকের নোটিশ লিখিতভাবে সংশ্লিষ্ট ইউনিয়ন পরিষদ চেয়ারম্যান / সিটি কর্পোরেশন মেয়রের কার্যালয়ে পাঠাতে হবে এবং স্ত্রীর কাছে কপি পাঠাতে হবে। নোটিশ প্রেরণের ৯০ দিন পর তালাক আইনগতভাবে কার্যকর হয়।
   • **দেনমোহর (Dower / Mahr - ধারা ১০):** দেনমোহর স্ত্রীর অলঙ্ঘনীয় আইনি অধিকার। তলবি দেনমোহর (Prompt Dower) চাওয়ামাত্র পরিশোধযোগ্য এবং বিলম্বিত দেনমোহর (Deferred Dower) বিবাহবিচ্ছেদ বা মৃত্যুর পর প্রদেয়।
   • **খোরপোশ (Maintenance - ধারা ৯):** বৈবাহিক জীবনে এবং ইদ্দতকালীন সময়ে স্ত্রীকে এবং অপ্রাপ্তবয়স্ক সন্তানদের ভরণপোষণ প্রদান স্বামীর আইনি বাধ্যবাধকতা।
   • **সন্তানের হেফাজত ও অভিভাবকত্ব (Guardians and Wards Act ১৮৯০):** সন্তানের কল্যাণই (Welfare of the child) আদালতের প্রধান বিবেচ্য। সাধারণ নিয়মে ছেলে সন্তানের ৭ বছর পর্যন্ত এবং কন্যা সন্তানের বয়ঃসন্ধিকাল পর্যন্ত মা হেফাজতের (Hizanat) অধিকারী হন, তবে পিতা আর্থিক অভিভাবক থাকেন।
   • **পারিবারিক আদালত আইন ২০২৩:** বিবাহবিচ্ছেদ, দেনমোহর, খোরপোশ, দাম্পত্য অধিকার পুনরুদ্ধার ও অভিভাবকত্ব বিষয়ে পারিবারিক আদালতের একচ্ছত্র এখতিয়ার রয়েছে।

২. **দেওয়ানি ও সম্পত্তি আইন (Civil Law & Property Disputes):**
   • **নিষেধাজ্ঞা (Injunction - CPC ১৯০৮, Order 39):** সম্পত্তিতে জোরপূর্বক বেদখল বা নির্মাণকাজ বন্ধে আদালতে অস্থায়ী বা অন্তর্বর্তীকালীন নিষেধাজ্ঞার আবেদন করা যায়।
   • **স্বত্ব ঘোষণা ও দখল পুনরুদ্ধার (Specific Relief Act ১৮৭৭):** ধারা ৯ অনুযায়ী বেদখল হওয়ার ৬ মাসের মধ্যে দখল পুনরুদ্ধারের মামলা এবং ধারা ৪২ অনুযায়ী স্বত্ব ঘোষণার (Title Declaration) মামলা করা যায়।
   • **চুক্তি প্রবল (Specific Performance):** জমি ক্রয়ের বায়নাপত্রের শর্ত ভঙ্গ হলে আদালত মারফত সাফ-কবলা দলিল রেজিস্ট্রির জন্য মামলা করা যায়।
   • **সাকসেশন সার্টিফিকেট (Succession Act ১৯২৫):** মৃত ব্যক্তির ব্যাংক একাউন্ট, শেয়ার ও সঞ্চয়পত্রের টাকা উত্তোলনের জন্য জেলা জজ আদালত থেকে সাকসেশন সার্টিফিকেট নেওয়া বাধ্যতামূলক।

*পরামর্শ:* পারিবারিক বিরোধ নিষ্পত্তি, জমি-জমা সংক্রান্ত আইনি দলিল যাচাই ও মামলা পরিচালনার জন্য legal.topsparkdigital এর অভিজ্ঞ অ্যাডভোকেটদের সহায়তা নিন।`;
    } else {
      return `**Family Law & Civil Property Law Guidelines in Bangladesh:**

1. **Family Law Matters:**
   • **Talaq / Divorce Procedure (MFLO 1961, Section 7):** Written notice of Talaq must be served to the relevant Union Parishad Chairman / City Corporation Mayor / Ward Councilor, and a copy delivered to the spouse. Divorce becomes legally effective upon expiry of 90 days from notice delivery.
   • **Dower / Mahr (Section 10):** A legally enforceable statutory debt owed to the wife. Prompt Dower is payable upon demand; Deferred Dower is payable upon dissolution of marriage or death.
   • **Maintenance / Khorposh (Section 9):** The husband is legally bound to provide adequate maintenance for his wife and minor children.
   • **Child Custody & Guardianship (Guardians & Wards Act 1890):** The paramount consideration of the court is the welfare of the child. Typically, the mother retains custody (Hizanat) of a boy until age 7 and a girl until puberty, while the father remains the natural financial guardian.
   • **Family Courts Act 2023:** Exclusive jurisdiction over dissolution of marriage, restitution of conjugal rights, dower, maintenance, and child guardianship.

2. **Civil Law & Land / Property Disputes:**
   • **Temporary Injunctions (CPC 1908, Order 39 Rules 1 & 2):** Prevents unlawful dispossession, alienation, or illegal construction on disputed property during pending litigation.
   • **Specific Relief Act 1877:**
     - Section 9: Suit for recovery of possession by a dispossessed person (within 6 months of dispossession).
     - Section 42: Declaratory Suit for title confirmation or cancellation of fraudulent deeds.
     - Section 12: Specific performance of contracts (enforcing unregistered or registered Bayanapatra agreements).
   • **Succession Certificate (Succession Act 1925):** Legally mandatory from the Civil Court (District Judge) to claim bank deposits, company shares, and securities of a deceased relative.

*Note: For advocate consultation, deed drafting, and civil litigation support, consult legal.topsparkdigital.*`;
    }
  }

  // 7. General e-TIN / Trade License / Default response
  if (query.includes("tin") || query.includes("টিন")) {
    if (isBn) {
      return `**ই-টিন (e-TIN) সংক্রান্ত নিয়মাবলী (NBR):**
১. এনবিআর-এর অফিসিয়াল e-TIN পোর্টালে (\`incometax.gov.bd\`) জাতীয় পরিচয়পত্র (NID) ও সচল মোবাইল নম্বর দিয়ে মাত্র কয়েক মিনিটে ১২-সংখ্যার e-TIN সার্টিফিকেট পাওয়া যায়।
২. লিমিটেড কোম্পানি বা অংশীদারি ফার্মের ক্ষেত্রে আরজেএসসি রেজিস্ট্রেশন নম্বর ও পরিচালকদের NID তথ্য দিয়ে কোম্পানি ই-টিন গ্রহণ করতে হয়।
৩. আয়কর আইন ২০২৩ এর ধারা ২৬৪ অনুযায়ী ব্যাংক ঋণ গ্রহণ, ট্রেড লাইসেন্স নবায়ন, ক্রেডিট কার্ড নেওয়া সহ ৪৪টি জরুরি সেবার জন্য রিটার্ন দাখিলের প্রমাণ (PSR) ও e-TIN আবশ্যক।`;
    } else {
      return `**e-TIN Registration in Bangladesh (NBR):**
1. Apply online via \`incometax.gov.bd\` using your National ID (NID) and active mobile number to receive an instant 12-digit e-TIN certificate.
2. For companies or partnerships, RJSC registration details and directors' NIDs are required.
3. Under Section 264 of the Income Tax Act 2023, Proof of Submission of Return (PSR) and e-TIN are mandatory for 44+ essential services including bank loans, credit cards, trade license renewals, and property transactions.`;
    }
  }

  if (query.includes("trade license") || query.includes("ট্রেড লাইসেন্স")) {
    if (isBn) {
      return `**ট্রেড লাইসেন্স (Trade License) প্রাপ্তির নিয়মাবলী:**
১. সিটি কর্পোরেশন, পৌরসভা বা ইউনিয়ন পরিষদ থেকে ব্যবসার অবস্থান অনুযায়ী ট্রেড লাইসেন্স নিতে হয়।
২. প্রয়োজনীয় ডকুমেন্টস: ভাড়ার চুক্তিপত্র/মালিকানার হোল্ডিং ট্যাক্স রশিদ, NID, ছবি, ই-টিন সার্টিফিকেট এবং লিমিটেড কোম্পানির ক্ষেত্রে MOA/AOA ও ইনকর্পোরেশন সার্টিফিকেট।
৩. ট্রেড লাইসেন্স প্রতি অর্থবছর (১ জুলাই থেকে ৩০ জুন) নবায়নযোগ্য।`;
    } else {
      return `**Trade License Issuance in Bangladesh:**
1. Issued by the local City Corporation (DNCC/DSCC), Pourashava, or Union Parishad corresponding to your commercial location.
2. Documents Required: Tenancy agreement or property ownership proof, NID, passport photos, e-TIN, and MOA/AOA with Incorporation Certificate (for companies).
3. Trade licenses must be renewed annually for each fiscal year.`;
    }
  }

  // General fallback
  if (isBn) {
    return `টপ স্পার্ক লিগ্যাল এআই অ্যাসিস্ট্যান্টে স্বাগতম। আমরা বাংলাদেশ সরকারের বিদ্যমান আইন ও বিধিবিধান অনুযায়ী নিম্নোক্ত ক্ষেত্রসমূহে পরামর্শ দিয়ে থাকি:
• **ব্যক্তিগত আয়কর ও ই-রিটার্ন:** আয়কর আইন ২০২৩, করমুক্ত সীমা, ই-রিটার্ন দাখিল, সম্পদ বিবরণী (IT-10B), কর রেয়াত।
• **কোম্পানি ট্যাক্স:** কর্পোরেট কর হার, উৎসে কর (TDS), অগ্রিম আয়কর (AIT), ন্যূনতম কর ও অডিট কমপ্লায়েন্স।
• **ভ্যাট ও বিন (VAT & BIN):** মূসক আইন ২০১২, ৯-সংখ্যার বিন রেজিস্ট্রেশন, মূসক ৯.১ রিটার্ন, মূসক ৪.৩ ও ভিডিএস।
• **কোম্পানি গঠন ও এজিএম:** আরজেএসসি ইনকর্পোরেশন, ওপিসি, নেম ক্লিয়ারেন্স, মেমোরেন্ডাম, শিডিউল এক্স ও বার্ষিক রিটার্ন।
• **সংবিধিবদ্ধ অডিটিং:** আইসিএবি ও এনবিআর অনুমোদিত DVC-ভেরিফাইড অডিট রিপোর্ট ও আর্থিক নিরীক্ষা।
• **আইনি পরামর্শ:** মুসলিম পারিবারিক আইন ১৯৬১ (তালাক, দেনমোহর, খোরপোশ, সন্তানের হেফাজত) এবং দেওয়ানি সম্পত্তি বিরোধ (নিষেধাজ্ঞা, স্বত্ব ঘোষণা, সাকসেশন সার্টিফিকেট)।

আপনার যে কোনো সুনির্দিষ্ট প্রশ্ন থাকলে বাংলায় বা ইংরেজিতে লিখুন!`;
  } else {
    return `Welcome to **Top Spark Legal & Tax AI Assistant**. We provide accurate guidance grounded in Bangladesh statutory laws across:
• **Personal Income Tax & E-Return:** Income Tax Act 2023, tax slabs, e-TIN, mandatory e-returns (\`etaxnbr.gov.bd\`), wealth statements (IT-10B), investment rebates, and PSR.
• **Company Tax:** Corporate tax rates (25%/27.5%), TDS withholding tax, Advance Income Tax (AIT), minimum turnover tax, and DVC audit compliance.
• **VAT & BIN Services:** VAT & SD Act 2012, 9-digit BIN registration (\`vat.gov.bd\`), monthly Mushak 9.1 returns, Mushak 4.3 input-output coefficients, and VDS.
• **Company Formation & AGM:** RJSC incorporation (\`roc.gov.bd\`), OPC, Name clearance, MOA/AOA drafting, AGM rules (Sec 81), and Schedule X filings.
• **Statutory Auditing:** ICAB & NBR certified DVC Document Verification Code compliance, statutory audits, and financial reporting.
• **Family & Civil Law:** Muslim Family Laws Ordinance 1961 (Talaq notice, dower, maintenance, child custody under Guardians and Wards Act) and Civil Property Litigation (Injunctions under CPC Order 39, Declaratory suits under Specific Relief Act Sec 42, and Succession Certificates under Succession Act 1925).

Feel free to ask any specific question!`;
  }
}

// AI Assistant Chat endpoint with ultra-fast zero-latency response engine
app.post("/api/ai-chat", async (req, res) => {
  const { message, language = "en", history = [] } = req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Message is required" });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      // Prepare conversation contents with multi-turn history if present
      const contents: Array<{ role: "user" | "model"; parts: Array<{ text: string }> }> = [];
      
      if (Array.isArray(history) && history.length > 0) {
        // Include last 4 messages for concise context without bloat
        const recentHistory = history.slice(-4);
        for (const item of recentHistory) {
          if (item && item.text && (item.sender === "user" || item.sender === "assistant")) {
            contents.push({
              role: item.sender === "user" ? "user" : "model",
              parts: [{ text: item.text }],
            });
          }
        }
      }

      contents.push({
        role: "user",
        parts: [{ text: message }],
      });

      // Race Gemini API call against a 3.5-second timeout to guarantee ultra-fast response times
      const geminiPromise = ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents,
        config: {
          systemInstruction: BANGLADESH_LEGAL_TAX_SYSTEM_PROMPT,
          thinkingConfig: {
            thinkingBudget: 0, // Turn off thinking tokens for instant response in milliseconds
          },
          temperature: 0.2,
          maxOutputTokens: 1000,
        },
      });

      const timeoutPromise = new Promise<{ text?: string }>((_, reject) =>
        setTimeout(() => reject(new Error("AI generation timeout, using fast engine")), 3500)
      );

      const response = await Promise.race([geminiPromise, timeoutPromise]);
      const reply = response.text || generateFallbackLegalResponse(message, language);
      return res.json({ reply, source: "gemini" });
    } catch (err) {
      console.warn("Fast-switching to comprehensive Bangladesh legal knowledge engine:", err);
    }
  }

  // Fallback to our master Bangladesh Legal & Tax Knowledge Engine
  const fallbackReply = generateFallbackLegalResponse(message, language);
  return res.json({ reply: fallbackReply, source: "bangladesh-legal-engine" });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

