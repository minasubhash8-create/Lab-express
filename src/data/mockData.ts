import { TestItem, PartnerLab, Phlebotomist, Booking, AuditLog, Address, Patient, HealthPackage } from '../types';

export const INITIAL_TESTS: TestItem[] = [
  {
    id: 'test-cbc',
    code: 'LX-CBC-01',
    name: 'Complete Blood Count (CBC) with ESR',
    category: 'Full Body',
    price: 349,
    originalPrice: 650,
    turnaroundTime: '6 Hours (Express)',
    fastTrackAvailable: true,
    sampleType: 'Blood',
    fastingRequired: false,
    preparationInstructions: [
      'No special fasting is mandatory for CBC alone.',
      'Stay well hydrated with plain drinking water before blood draw.',
      'Wear short sleeves or loose clothing for easy arm access.'
    ],
    description: 'Assesses overall health status, detects anemia, infections, clotting disorders, and monitors immune response.',
    parametersCount: 24,
    inclusions: ['Hemoglobin', 'RBC Count', 'WBC Count', 'Platelet Count', 'Neutrophils', 'Lymphocytes', 'ESR (Erythrocyte Sedimentation Rate)', 'MCV', 'MCH', 'MCHC', 'PCV'],
    department: 'Hematology',
    popular: true,
    badge: '⚡ Most Booked'
  },
  {
    id: 'test-full-body',
    code: 'LX-FB-MAX',
    name: 'LabExpress Full Body Comprehensive Checkup',
    category: 'Full Body',
    price: 1299,
    originalPrice: 3200,
    turnaroundTime: '12 Hours',
    fastTrackAvailable: true,
    sampleType: 'Blood & Urine',
    fastingRequired: true,
    fastingHours: 10,
    preparationInstructions: [
      'Strict 10 to 12 hours overnight fasting is required.',
      'Only plain water is permitted during fasting hours.',
      'Avoid heavy exercise and alcohol 24 hours prior to sample collection.',
      'First-morning mid-stream urine sample recommended.'
    ],
    description: 'Comprehensive 84-parameter master health check covering Heart, Liver, Kidney, Thyroid, Bone, Blood, and Metabolic health.',
    parametersCount: 84,
    inclusions: ['Complete Blood Count (24)', 'Lipid Profile (8)', 'Liver Function Test (11)', 'Kidney Function Test (9)', 'Thyroid T3, T4, TSH (3)', 'Fasting Blood Sugar (1)', 'Urine Routine (18)', 'HbA1c (2)', 'Calcium & Uric Acid'],
    department: 'Multi-Department Pathology',
    popular: true,
    badge: '⭐ 60% OFF Best Value'
  },
  {
    id: 'test-thyroid',
    code: 'LX-THY-03',
    name: 'Thyroid Profile Total (T3, T4, TSH)',
    category: 'Fasting Tests',
    price: 449,
    originalPrice: 850,
    turnaroundTime: '8 Hours',
    fastTrackAvailable: true,
    sampleType: 'Blood',
    fastingRequired: true,
    fastingHours: 8,
    preparationInstructions: [
      '8 hours overnight fasting is recommended for accurate hormone levels.',
      'If you take thyroid medication (e.g. Thyronorm/Eltroxin), take it after blood draw unless instructed otherwise by your doctor.',
      'Inform the phlebotomist about any ongoing steroid or biotin supplements.'
    ],
    description: 'Screens and monitors hyperthyroidism, hypothyroidism, fatigue, metabolism disorders, and hormonal imbalances.',
    parametersCount: 3,
    inclusions: ['Total Triiodothyronine (T3)', 'Total Thyroxine (T4)', 'Thyroid Stimulating Hormone (TSH Ultrasensitive)'],
    department: 'Biochemistry / Immunoassay',
    popular: true,
    badge: 'Popular'
  },
  {
    id: 'test-sugar-fasting',
    code: 'LX-BS-02',
    name: 'Blood Sugar Fasting (Glucose Fasting)',
    category: 'Diabetes & Blood Sugar',
    price: 149,
    originalPrice: 250,
    turnaroundTime: '4 Hours (Express)',
    fastTrackAvailable: true,
    sampleType: 'Blood',
    fastingRequired: true,
    fastingHours: 10,
    preparationInstructions: [
      'Strict 10-12 hours overnight fasting required. Do not eat breakfast or drink tea/coffee before sample draw.',
      'Only sips of plain water allowed.',
      'Test is best taken between 7:00 AM and 9:00 AM.'
    ],
    description: 'Measures circulating plasma glucose after an overnight fast; key primary screening test for diabetes and prediabetes.',
    parametersCount: 1,
    inclusions: ['Fasting Blood Glucose'],
    department: 'Biochemistry',
    popular: true,
    badge: '⚡ 4-Hr Report'
  },
  {
    id: 'test-hba1c',
    code: 'LX-HBA1C-01',
    name: 'HbA1c (Glycated Hemoglobin) with Estimated Average Glucose',
    category: 'Diabetes & Blood Sugar',
    price: 499,
    originalPrice: 899,
    turnaroundTime: '6 Hours',
    fastTrackAvailable: true,
    sampleType: 'Blood',
    fastingRequired: false,
    preparationInstructions: [
      'No fasting required; can be given at any time of the day.',
      'Reflects 3-month average blood glucose control.',
      'Safe to take regular meals and prescribed medications.'
    ],
    description: 'Gold standard test for diabetes monitoring; provides an accurate estimation of blood glucose control over past 90 days.',
    parametersCount: 2,
    inclusions: ['Glycated Hemoglobin (HbA1c %)', 'Estimated Average Glucose (eAG mg/dL)'],
    department: 'Automated HPLC Biochemistry',
    popular: true
  },
  {
    id: 'test-vitamin-d',
    code: 'LX-VIT-D3',
    name: 'Vitamin D 25-Hydroxy (25-OH D3)',
    category: 'Vitamins & Minerals',
    price: 699,
    originalPrice: 1500,
    turnaroundTime: '8 Hours',
    fastTrackAvailable: false,
    sampleType: 'Blood',
    fastingRequired: false,
    preparationInstructions: [
      'No fasting required.',
      'If taking high-dose Vitamin D sachets, consider testing 48 hours after your last dose.',
      'Plain water can be taken normally.'
    ],
    description: 'Assesses bone density risk, muscle fatigue, calcium absorption, and immune system resilience.',
    parametersCount: 1,
    inclusions: ['25-Hydroxy Vitamin D Total'],
    department: 'Chemiluminescence (CLIA)',
    popular: true,
    badge: 'High Demand'
  },
  {
    id: 'test-vitamin-b12',
    code: 'LX-VIT-B12',
    name: 'Vitamin B12 (Cyanocobalamin)',
    category: 'Vitamins & Minerals',
    price: 649,
    originalPrice: 1400,
    turnaroundTime: '8 Hours',
    fastTrackAvailable: false,
    sampleType: 'Blood',
    fastingRequired: true,
    fastingHours: 8,
    preparationInstructions: [
      'Overnight fasting of 8 hours is advised.',
      'Avoid taking B-complex vitamins for 24 hours prior to testing.'
    ],
    description: 'Evaluates nerve health, cognitive clarity, tingling sensations in extremities, and megaloblastic anemia.',
    parametersCount: 1,
    inclusions: ['Serum Vitamin B12'],
    department: 'Chemiluminescence (CLIA)',
    popular: false
  },
  {
    id: 'test-lipid',
    code: 'LX-LIP-05',
    name: 'Lipid Profile Comprehensive (Cholesterol & Triglycerides)',
    category: 'Heart Health',
    price: 499,
    originalPrice: 950,
    turnaroundTime: '6 Hours',
    fastTrackAvailable: true,
    sampleType: 'Blood',
    fastingRequired: true,
    fastingHours: 12,
    preparationInstructions: [
      'Strict 12 to 14 hours overnight fasting mandatory.',
      'Avoid high-fat dinners or alcohol the evening before.',
      'Drinking plain water is permitted.'
    ],
    description: 'Cardiovascular risk evaluation assessing good HDL, bad LDL, triglycerides, and heart health ratios.',
    parametersCount: 8,
    inclusions: ['Total Cholesterol', 'Triglycerides', 'HDL (Good) Cholesterol', 'LDL (Bad) Cholesterol', 'VLDL Cholesterol', 'Non-HDL Cholesterol', 'TC/HDL Ratio', 'LDL/HDL Ratio'],
    department: 'Clinical Biochemistry',
    popular: true,
    badge: 'Heart Care'
  },
  {
    id: 'test-liver-lft',
    code: 'LX-LFT-08',
    name: 'Liver Function Test (LFT) with Enzymes',
    category: 'Liver & Kidney',
    price: 549,
    originalPrice: 1100,
    turnaroundTime: '6 Hours',
    fastTrackAvailable: true,
    sampleType: 'Blood',
    fastingRequired: true,
    fastingHours: 10,
    preparationInstructions: [
      '10-12 hours overnight fasting recommended.',
      'Do not consume alcohol for at least 48 hours prior to test.'
    ],
    description: 'Examines liver inflammation, bile duct efficiency, jaundice markers, and protein synthesis.',
    parametersCount: 11,
    inclusions: ['Bilirubin Total', 'Bilirubin Direct', 'Bilirubin Indirect', 'SGOT (AST)', 'SGPT (ALT)', 'Alkaline Phosphatase', 'Total Protein', 'Albumin', 'Globulin', 'A/G Ratio', 'GGTP'],
    department: 'Biochemistry',
    popular: false
  },
  {
    id: 'test-kidney-kft',
    code: 'LX-KFT-09',
    name: 'Kidney Function Test (KFT / RFT) with Electrolytes',
    category: 'Liver & Kidney',
    price: 549,
    originalPrice: 1050,
    turnaroundTime: '6 Hours',
    fastTrackAvailable: true,
    sampleType: 'Blood',
    fastingRequired: false,
    preparationInstructions: [
      'No strict fasting required, but light fasting is preferable.',
      'Drink sufficient water before the test.',
      'Avoid high-protein meat meals 12 hours prior to avoid creatinine skew.'
    ],
    description: 'Monitors renal clearance, filtration rate, blood urea nitrogen, serum creatinine, and electrolyte balance.',
    parametersCount: 9,
    inclusions: ['Blood Urea Nitrogen (BUN)', 'Serum Creatinine', 'Uric Acid', 'Urea', 'eGFR', 'Sodium', 'Potassium', 'Chloride', 'Calcium'],
    department: 'Clinical Biochemistry',
    popular: false
  },
  {
    id: 'test-women-wellness',
    code: 'LX-WOMEN-01',
    name: 'Women Active Wellness & Hormone Panel',
    category: 'Women Health',
    price: 1599,
    originalPrice: 3400,
    turnaroundTime: '12 Hours',
    fastTrackAvailable: false,
    sampleType: 'Blood',
    fastingRequired: true,
    fastingHours: 10,
    preparationInstructions: [
      '10 hours overnight fasting recommended.',
      'If tracking menstrual cycle hormones (FSH/LH), schedule test between Day 2 and Day 4 of cycle.'
    ],
    description: 'Designed for women to assess PCOS risk, iron deficiency, thyroid balance, bone health, and hormone levels.',
    parametersCount: 42,
    inclusions: ['Thyroid Total (3)', 'Iron Deficiency Profile (4)', 'Vitamin D3 & B12', 'CBC (24)', 'FSH & LH Hormones', 'Prolactin', 'Calcium'],
    department: 'Immunoassay & Hematology',
    popular: true,
    badge: 'Special Care'
  },
  {
    id: 'test-senior-citizen',
    code: 'LX-SENIOR-02',
    name: 'Senior Citizen Vital Care Package (Ages 55+)',
    category: 'Senior Citizen',
    price: 1899,
    originalPrice: 4200,
    turnaroundTime: '12 Hours',
    fastTrackAvailable: false,
    sampleType: 'Blood & Urine',
    fastingRequired: true,
    fastingHours: 10,
    preparationInstructions: [
      '10-12 hours overnight fasting.',
      'Home collection recommended early morning for comfort.',
      'Prescribed blood pressure medicines may be taken with water.'
    ],
    description: 'Tailored for senior adults to monitor cardiac health, kidney filtration, joint inflammation, diabetic markers, and prostate/hormonal wellness.',
    parametersCount: 68,
    inclusions: ['Full Blood Count', 'Lipid Profile', 'KFT with Electrolytes', 'LFT', 'HbA1c', 'Uric Acid', 'High Sensitivity CRP', 'Urine Microscopic'],
    department: 'Comprehensive Geriatric Pathology',
    popular: true,
    badge: 'Geriatric Care'
  }
];

export const INITIAL_LABS: PartnerLab[] = [
  {
    id: 'lab-apex',
    name: 'Apex Reference Diagnostics & Pathology Lab',
    code: 'LAB-APX-01',
    nablCode: 'NABL-MC-2849',
    rating: 4.9,
    reviewsCount: 1420,
    address: 'Plot 42, Healthcare Corridor, Ring Road, South Extension',
    city: 'New Delhi',
    contactPhone: '+91 98110 44221',
    contactEmail: 'central@apexdiagnostics.demo',
    chiefPathologist: 'Dr. Sunita Deshmukh, MD (Path)',
    pathologistRegNo: 'DMC-24901',
    operatingHours: '06:00 AM – 10:00 PM (All 7 Days)',
    servicePincodes: ['110016', '110048', '110049', '110017', '110070', '110024', '110001', '110003'],
    activeBookingsCount: 14,
    commissionRate: 20,
    status: 'active',
    verifiedNabl: true
  },
  {
    id: 'lab-metropolis',
    name: 'Metropolis Express Clinical Labs',
    code: 'LAB-MET-02',
    nablCode: 'NABL-MC-3184',
    rating: 4.8,
    reviewsCount: 980,
    address: 'B-12, Sector 18, Commercial Hub',
    city: 'Noida',
    contactPhone: '+91 98710 99882',
    contactEmail: 'support@metropolisexpress.demo',
    chiefPathologist: 'Dr. Arvind Trivedi, MD, FICP',
    pathologistRegNo: 'UPMC-88402',
    operatingHours: '06:30 AM – 09:30 PM',
    servicePincodes: ['201301', '201303', '201304', '110091', '110092'],
    activeBookingsCount: 9,
    commissionRate: 18,
    status: 'active',
    verifiedNabl: true
  },
  {
    id: 'lab-carepath',
    name: 'CarePath Central Diagnostics & Genomics',
    code: 'LAB-CP-03',
    nablCode: 'NABL-MC-1940',
    rating: 4.9,
    reviewsCount: 1650,
    address: '88 Tech Park Boulevard, Koramangala 4th Block',
    city: 'Bengaluru',
    contactPhone: '+91 80 4120 7700',
    contactEmail: 'laboperations@carepath.demo',
    chiefPathologist: 'Dr. Rajeshwari Swaminathan, MD',
    pathologistRegNo: 'KMC-54190',
    operatingHours: '24 Hours Emergency Processing',
    servicePincodes: ['560034', '560095', '560068', '560102', '560001'],
    activeBookingsCount: 18,
    commissionRate: 22,
    status: 'active',
    verifiedNabl: true
  },
  {
    id: 'lab-suburban',
    name: 'Suburban Care Diagnostic Centre',
    code: 'LAB-SUB-04',
    nablCode: 'NABL-MC-4209',
    rating: 4.7,
    reviewsCount: 820,
    address: 'Shop 101, Near Metro Station, Andheri West',
    city: 'Mumbai',
    contactPhone: '+91 98200 33412',
    contactEmail: 'andheri@suburbancare.demo',
    chiefPathologist: 'Dr. Nikhil Kulkarni, MD',
    pathologistRegNo: 'MMC-73419',
    operatingHours: '07:00 AM – 09:00 PM',
    servicePincodes: ['400053', '400058', '400069', '400049'],
    activeBookingsCount: 6,
    commissionRate: 20,
    status: 'active',
    verifiedNabl: true
  }
];

export const INITIAL_PHLEBOTOMISTS: Phlebotomist[] = [
  {
    id: 'phleb-01',
    name: 'Ramesh Verma',
    phone: '+91 98112 00192',
    rating: 4.9,
    completedVisits: 840,
    experienceYears: 5,
    status: 'available',
    assignedLabId: 'lab-apex',
    vehicle: 'Electric Bike with Cold-Chain Box (2-8°C)',
    vaccinated: true
  },
  {
    id: 'phleb-02',
    name: 'Amit Kumar',
    phone: '+91 98711 33441',
    rating: 4.8,
    completedVisits: 520,
    experienceYears: 3,
    status: 'on_duty',
    assignedLabId: 'lab-apex',
    vehicle: 'Scooter with Temperature Controlled Kit',
    vaccinated: true
  },
  {
    id: 'phleb-03',
    name: 'Pooja Nair',
    phone: '+91 80 9182 7364',
    rating: 5.0,
    completedVisits: 1100,
    experienceYears: 6,
    status: 'available',
    assignedLabId: 'lab-carepath',
    vehicle: 'Cold Chain Courier Van',
    vaccinated: true
  },
  {
    id: 'phleb-04',
    name: 'Vikas Sharma',
    phone: '+91 98201 88290',
    rating: 4.7,
    completedVisits: 410,
    experienceYears: 2,
    status: 'available',
    assignedLabId: 'lab-metropolis',
    vehicle: 'Electric Two-Wheeler',
    vaccinated: true
  }
];

export const INITIAL_ADDRESSES: Address[] = [
  {
    id: 'addr-1',
    label: 'Home',
    street: 'Flat 402, Royal Palms Residency, Green Glen Layout',
    area: 'South Extension Part II',
    city: 'New Delhi',
    pincode: '110049',
    landmark: 'Behind Community Center',
    isDefault: true
  },
  {
    id: 'addr-2',
    label: 'Office',
    street: 'Tower B, 6th Floor, Cyber Heights Business Hub',
    area: 'Saket District Centre',
    city: 'New Delhi',
    pincode: '110017',
    landmark: 'Opposite Select CityWalk'
  }
];

export const INITIAL_PATIENTS: Patient[] = [
  {
    id: 'pat-1',
    name: 'Priya Sharma',
    age: 32,
    gender: 'Female',
    relation: 'Self',
    phone: '+91 98712 34567'
  },
  {
    id: 'pat-2',
    name: 'Rajendra Sharma',
    age: 64,
    gender: 'Male',
    relation: 'Father',
    phone: '+91 98101 22334'
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'LX-9421-DEL',
    createdAt: '2026-09-27T08:15:00.000Z',
    updatedAt: '2026-09-27T10:45:00.000Z',
    customerId: 'cust-priya-01',
    customerName: 'Priya Sharma',
    customerPhone: '+91 98712 34567',
    customerEmail: 'priya.sharma@example.com',
    patient: {
      id: 'pat-1',
      name: 'Priya Sharma',
      age: 32,
      gender: 'Female',
      relation: 'Self',
      phone: '+91 98712 34567'
    },
    collectionType: 'home',
    address: INITIAL_ADDRESSES[0],
    appointmentDate: '2026-09-27',
    timeSlot: '07:00 AM - 07:30 AM',
    tests: [
      INITIAL_TESTS[0], // CBC
      INITIAL_TESTS[2]  // Thyroid
    ],
    totalAmount: 798,
    discountAmount: 100,
    collectionFee: 0,
    finalAmount: 698,
    paymentStatus: 'paid_online',
    paymentMethod: 'UPI (GPay / PhonePe)',
    status: 'report_ready',
    assignedLabId: 'lab-apex',
    assignedLabName: 'Apex Reference Diagnostics & Pathology Lab',
    assignedPhlebotomistId: 'phleb-01',
    assignedPhlebotomistName: 'Ramesh Verma',
    sampleBarcode: 'LX-BAR-94210',
    sampleVials: ['EDTA K2 Lavender (Hematology)', 'SST Gold Cap Gel Separator (Serology)'],
    timeline: [
      {
        status: 'confirmed',
        timestamp: '2026-09-27T08:15:00.000Z',
        title: 'Booking Confirmed',
        note: 'Appointment confirmed with slot 07:00 AM - 07:30 AM.',
        actor: 'Customer Priya Sharma'
      },
      {
        status: 'staff_assigned',
        timestamp: '2026-09-27T08:20:00.000Z',
        title: 'Phlebotomist & Lab Assigned',
        note: 'Assigned to Apex Diagnostics. Ramesh Verma on route with cold-chain box.',
        actor: 'Admin Operations'
      },
      {
        status: 'sample_collected',
        timestamp: '2026-09-27T07:22:00.000Z',
        title: 'Home Sample Collected',
        note: 'Blood sample drawn successfully under sterile protocol. Barcode LX-BAR-94210 affixed.',
        actor: 'Phlebotomist Ramesh Verma'
      },
      {
        status: 'received_at_lab',
        timestamp: '2026-09-27T08:45:00.000Z',
        title: 'Sample Received at Laboratory',
        note: 'Temperature verified (4.2°C). Barcode scanned and queued in analyzer.',
        actor: 'Apex Lab Desk'
      },
      {
        status: 'processing',
        timestamp: '2026-09-27T09:15:00.000Z',
        title: 'Processing in Automated Analyzers',
        note: 'Sysmex XN-1000 automated hematology run and Roche Cobas e411 hormone analysis active.',
        actor: 'Lab Technician'
      },
      {
        status: 'report_ready',
        timestamp: '2026-09-27T10:45:00.000Z',
        title: 'Authorized Report Released',
        note: 'Results verified and digitally signed by Dr. Sunita Deshmukh, MD (Path). Ready to view and download.',
        actor: 'Dr. Sunita Deshmukh'
      }
    ],
    report: {
      reportId: 'REP-LX-9421',
      uploadedAt: '2026-09-27T10:45:00.000Z',
      pathologistName: 'Dr. Sunita Deshmukh, MD (Pathology)',
      pathologistRegNo: 'DMC-24901',
      labNablCode: 'NABL-MC-2849',
      labName: 'Apex Reference Diagnostics & Pathology Lab',
      status: 'authorized_final',
      parameters: [
        { name: 'Hemoglobin (Hb)', result: '13.4', normalRange: '12.0 - 15.5', unit: 'g/dL', flag: 'normal' },
        { name: 'Total Leukocyte Count (WBC)', result: '7,400', normalRange: '4,000 - 11,000', unit: '/cumm', flag: 'normal' },
        { name: 'Platelet Count', result: '245,000', normalRange: '150,000 - 450,000', unit: '/cumm', flag: 'normal' },
        { name: 'Erythrocyte Sedimentation Rate (ESR)', result: '12', normalRange: '0 - 20', unit: 'mm/1st hr', flag: 'normal' },
        { name: 'Total Triiodothyronine (T3)', result: '1.18', normalRange: '0.80 - 2.00', unit: 'ng/mL', flag: 'normal' },
        { name: 'Total Thyroxine (T4)', result: '7.9', normalRange: '5.1 - 14.1', unit: 'µg/dL', flag: 'normal' },
        { name: 'Thyroid Stimulating Hormone (TSH Ultrasensitive)', result: '2.45', normalRange: '0.40 - 4.20', unit: 'µIU/mL', flag: 'normal' }
      ],
      clinicalRemarks: 'All evaluated hematological indices and thyroid hormone values fall within biological reference intervals for age and sex. No evidence of anemia or thyroid dysfunction observed.',
      qrVerificationCode: 'VERIFIED-NABL-MC-2849-REP9421'
    }
  },
  {
    id: 'LX-8832-DEL',
    createdAt: '2026-09-27T14:10:00.000Z',
    updatedAt: '2026-09-27T15:30:00.000Z',
    customerId: 'cust-priya-01',
    customerName: 'Priya Sharma',
    customerPhone: '+91 98712 34567',
    customerEmail: 'priya.sharma@example.com',
    patient: {
      id: 'pat-2',
      name: 'Rajendra Sharma',
      age: 64,
      gender: 'Male',
      relation: 'Father',
      phone: '+91 98101 22334'
    },
    collectionType: 'home',
    address: INITIAL_ADDRESSES[0],
    appointmentDate: '2026-09-28',
    timeSlot: '06:30 AM - 07:00 AM',
    tests: [
      INITIAL_TESTS[1] // Full Body Comprehensive
    ],
    totalAmount: 1299,
    discountAmount: 200,
    collectionFee: 0,
    finalAmount: 1099,
    paymentStatus: 'pending_on_collection',
    paymentMethod: 'Cash on Sample Collection',
    status: 'sample_collected',
    assignedLabId: 'lab-apex',
    assignedLabName: 'Apex Reference Diagnostics & Pathology Lab',
    assignedPhlebotomistId: 'phleb-02',
    assignedPhlebotomistName: 'Amit Kumar',
    sampleBarcode: 'LX-BAR-88321',
    sampleVials: ['EDTA K2 Lavender', 'SST Gold Gel', 'Fluoride Grey (Sugar)', 'Sterile Urine Container'],
    timeline: [
      {
        status: 'confirmed',
        timestamp: '2026-09-27T14:10:00.000Z',
        title: 'Booking Confirmed',
        note: 'Early morning fasting collection scheduled for Father (Age 64).',
        actor: 'Customer Priya Sharma'
      },
      {
        status: 'staff_assigned',
        timestamp: '2026-09-27T14:25:00.000Z',
        title: 'Partner Lab & Staff Assigned',
        note: 'Assigned to Apex Diagnostics. Amit Kumar designated phlebotomist.',
        actor: 'Admin Operations'
      },
      {
        status: 'sample_collected',
        timestamp: '2026-09-27T15:30:00.000Z',
        title: 'Samples Collected',
        note: 'Collected 3 blood vials and 1 urine sample in cold-storage transit box.',
        actor: 'Phlebotomist Amit Kumar'
      }
    ]
  },
  {
    id: 'LX-7104-DEL',
    createdAt: '2026-09-27T17:00:00.000Z',
    updatedAt: '2026-09-27T17:05:00.000Z',
    customerId: 'cust-priya-01',
    customerName: 'Priya Sharma',
    customerPhone: '+91 98712 34567',
    customerEmail: 'priya.sharma@example.com',
    patient: {
      id: 'pat-1',
      name: 'Priya Sharma',
      age: 32,
      gender: 'Female',
      relation: 'Self'
    },
    collectionType: 'home',
    address: INITIAL_ADDRESSES[0],
    appointmentDate: '2026-09-28',
    timeSlot: '08:00 AM - 08:30 AM',
    tests: [
      INITIAL_TESTS[5], // Vitamin D
      INITIAL_TESTS[6]  // Vitamin B12
    ],
    totalAmount: 1348,
    discountAmount: 150,
    collectionFee: 0,
    finalAmount: 1198,
    paymentStatus: 'paid_online',
    paymentMethod: 'UPI (GPay / PhonePe)',
    status: 'confirmed',
    timeline: [
      {
        status: 'confirmed',
        timestamp: '2026-09-27T17:00:00.000Z',
        title: 'Booking Created',
        note: 'Awaiting lab assignment and collection staff allocation.',
        actor: 'Customer Priya Sharma'
      }
    ]
  },
  {
    id: 'LX-6029-NOI',
    createdAt: '2026-09-27T11:20:00.000Z',
    updatedAt: '2026-09-27T16:15:00.000Z',
    customerId: 'cust-vikram-99',
    customerName: 'Vikram Sethi',
    customerPhone: '+91 98119 55443',
    customerEmail: 'vikram.sethi@example.com',
    patient: {
      id: 'pat-vik-1',
      name: 'Vikram Sethi',
      age: 45,
      gender: 'Male',
      relation: 'Self'
    },
    collectionType: 'home',
    address: {
      id: 'addr-vik',
      label: 'Home',
      street: 'Tower 4, Flat 1201, Green Meadows',
      area: 'Sector 18',
      city: 'Noida',
      pincode: '201301'
    },
    appointmentDate: '2026-09-27',
    timeSlot: '09:00 AM - 09:30 AM',
    tests: [
      INITIAL_TESTS[7], // Lipid Profile
      INITIAL_TESTS[3]  // Fasting Blood Sugar
    ],
    totalAmount: 648,
    discountAmount: 50,
    collectionFee: 0,
    finalAmount: 598,
    paymentStatus: 'paid_online',
    paymentMethod: 'Credit / Debit Card',
    status: 'processing',
    assignedLabId: 'lab-metropolis',
    assignedLabName: 'Metropolis Express Clinical Labs',
    assignedPhlebotomistId: 'phleb-04',
    assignedPhlebotomistName: 'Vikas Sharma',
    sampleBarcode: 'LX-BAR-60299',
    sampleVials: ['Fluoride Grey', 'SST Gold Gel'],
    timeline: [
      {
        status: 'confirmed',
        timestamp: '2026-09-27T11:20:00.000Z',
        title: 'Booking Confirmed',
        note: 'Customer requested 4-hour express lipid & glucose turnaround.',
        actor: 'Customer Vikram'
      },
      {
        status: 'staff_assigned',
        timestamp: '2026-09-27T11:35:00.000Z',
        title: 'Assigned to Metropolis Express',
        note: 'Phlebotomist Vikas Sharma dispatched with sample kit.',
        actor: 'Admin Operations'
      },
      {
        status: 'sample_collected',
        timestamp: '2026-09-27T13:10:00.000Z',
        title: 'Sample Collected',
        note: 'Fast condition verified (11 hours fast). Samples barcode verified.',
        actor: 'Phlebotomist Vikas'
      },
      {
        status: 'received_at_lab',
        timestamp: '2026-09-27T14:40:00.000Z',
        title: 'Received at Metropolis Central Lab',
        note: 'Plasma separated by centrifuge at 3000 RPM. Quality test verified.',
        actor: 'Lab Reception'
      },
      {
        status: 'processing',
        timestamp: '2026-09-27T16:15:00.000Z',
        title: 'Running in Biochemistry Analyzer',
        note: 'Spectrophotometric enzymatic assays active on Beckman Coulter DxC 700 AU.',
        actor: 'Lab Technologist'
      }
    ]
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-101',
    timestamp: '2026-09-27T10:45:00.000Z',
    role: 'partner_lab',
    actorName: 'Dr. Sunita Deshmukh (Apex Lab)',
    action: 'REPORT_AUTHORIZED',
    bookingId: 'LX-9421-DEL',
    details: 'Verified and authorized final NABL certified laboratory report for patient Priya Sharma.'
  },
  {
    id: 'log-102',
    timestamp: '2026-09-27T16:15:00.000Z',
    role: 'partner_lab',
    actorName: 'Metropolis Lab Desk',
    action: 'STATUS_UPDATE',
    bookingId: 'LX-6029-NOI',
    details: 'Status advanced to PROCESSING after centrifugal separation.'
  },
  {
    id: 'log-103',
    timestamp: '2026-09-27T17:00:00.000Z',
    role: 'customer',
    actorName: 'Priya Sharma',
    action: 'NEW_BOOKING_CREATED',
    bookingId: 'LX-7104-DEL',
    details: 'Created new home collection booking for Vitamin D & B12 (Slot: 08:00 AM - 08:30 AM).'
  },
  {
    id: 'log-104',
    timestamp: '2026-09-27T14:25:00.000Z',
    role: 'admin',
    actorName: 'Super Admin (Operations Lead)',
    action: 'LAB_AND_STAFF_ASSIGNED',
    bookingId: 'LX-8832-DEL',
    details: 'Assigned booking to Apex Diagnostics and assigned phlebotomist Amit Kumar.'
  }
];

export const INITIAL_PACKAGES: HealthPackage[] = [
  {
    id: 'pkg-full-body-gold',
    code: 'LX-PKG-GOLD',
    name: 'Full Body Comprehensive Gold Package',
    hindiName: 'पूर्ण शरीर सम्पूर्ण गोल्ड चेकअप पैकेज',
    tagline: 'Complete 84-parameter master head-to-toe preventive evaluation for all vital organs',
    category: 'Full Body',
    price: 1299,
    originalPrice: 3499,
    discountPercentage: 63,
    parametersCount: 84,
    turnaroundTime: '12 Hours',
    fastTrackAvailable: true,
    sampleType: 'Blood & Urine',
    fastingRequired: true,
    fastingHours: 10,
    preparationInstructions: [
      '10-12 hours overnight fasting mandatory. Plain water allowed.',
      'First-morning mid-stream urine sample in clean sterile container.',
      'Avoid high-fat meal or alcohol 24 hours prior.'
    ],
    description: 'Comprehensive 84-parameter health checkup covering Heart, Liver, Kidney, Thyroid, Blood, Bone, and Metabolic health. Includes free digital PDF report and QR verification.',
    inclusions: [
      'Complete Hemogram (24)',
      'Lipid Profile (8)',
      'Liver Function Test (11)',
      'Kidney Function Test (9)',
      'Thyroid Profile Total (3)',
      'Diabetes Screen HbA1c & Fasting Sugar (2)',
      'Urine Routine & Microscopic (18)',
      'Calcium & Uric Acid (2)'
    ],
    includedCategories: [
      {
        categoryName: 'Complete Hemogram / CBC (24 Parameters)',
        tests: ['Hemoglobin', 'RBC Count', 'Total Leukocytes (WBC)', 'Platelet Count', 'ESR (Automated)', 'Neutrophils', 'Lymphocytes', 'Eosinophils', 'Monocytes', 'Basophils', 'MCV', 'MCH', 'MCHC', 'PCV/Hematocrit', 'RDW-CV']
      },
      {
        categoryName: 'Lipid Profile - Heart Shield (8 Parameters)',
        tests: ['Total Cholesterol', 'Triglycerides', 'HDL (Good) Cholesterol', 'LDL (Bad) Cholesterol', 'VLDL Cholesterol', 'Non-HDL Cholesterol', 'TC/HDL Ratio', 'LDL/HDL Ratio']
      },
      {
        categoryName: 'Liver Function Test - LFT (11 Parameters)',
        tests: ['Total Bilirubin', 'Direct Bilirubin', 'Indirect Bilirubin', 'SGOT (AST)', 'SGPT (ALT)', 'Alkaline Phosphatase (ALP)', 'Total Protein', 'Serum Albumin', 'Serum Globulin', 'A/G Ratio', 'GGTP']
      },
      {
        categoryName: 'Kidney Function Test - KFT (9 Parameters)',
        tests: ['Serum Creatinine', 'Blood Urea Nitrogen (BUN)', 'Serum Uric Acid', 'Blood Urea', 'Estimated GFR', 'Serum Sodium', 'Serum Potassium', 'Serum Chloride', 'Serum Calcium']
      },
      {
        categoryName: 'Thyroid Hormone Profile (3 Parameters)',
        tests: ['Total Triiodothyronine (T3)', 'Total Thyroxine (T4)', 'TSH Ultrasensitive 3rd Gen']
      },
      {
        categoryName: 'Diabetes & Glucose Screen (2 Parameters)',
        tests: ['HbA1c (Glycated Hemoglobin)', 'Estimated Average Glucose (eAG)', 'Fasting Plasma Blood Glucose']
      },
      {
        categoryName: 'Complete Urine Analysis (18 Parameters)',
        tests: ['Urine Protein / Albumin', 'Urine Glucose', 'Ketone Bodies', 'Bilirubin', 'Urobilinogen', 'Pus Cells / Leukocytes', 'Epithelial Cells', 'RBCs', 'Casts', 'Crystals', 'Specific Gravity', 'pH']
      }
    ],
    department: 'Multi-Department Pathology',
    popular: true,
    badge: '⭐ 63% OFF Bestseller',
    recommendedFor: 'Recommended for all adults (20-75 yrs) annually for early disease detection',
    isDemo: true
  },
  {
    id: 'pkg-senior-citizen-shield',
    code: 'LX-PKG-SENIOR',
    name: 'Senior Citizen Vital Care & Cardiac Shield',
    hindiName: 'वरिष्ठ नागरिक सम्पूर्ण स्वास्थ्य सुरक्षा पैकेज',
    tagline: 'Tailored for adults aged 55+ with joint, heart, sugar, kidney & vital bone monitoring',
    category: 'Senior Citizen',
    price: 1799,
    originalPrice: 4500,
    discountPercentage: 60,
    parametersCount: 76,
    turnaroundTime: '12 Hours',
    fastTrackAvailable: false,
    sampleType: 'Blood & Urine',
    fastingRequired: true,
    fastingHours: 10,
    preparationInstructions: [
      '10 hours overnight fasting recommended.',
      'Early morning home sample collection recommended for elder comfort.',
      'Regular BP and thyroid medications can be taken with water.'
    ],
    description: 'Specialized geriatric diagnostic battery evaluating cardiovascular health, joint inflammation, diabetic control, and renal filtration efficiency.',
    inclusions: [
      'High-Sensitivity CRP (Heart Inflammation)',
      'Complete Lipid Profile (8)',
      'Kidney Function with Electrolytes (9)',
      'Liver Function Test (11)',
      'HbA1c Diabetic Screen (2)',
      'Vitamin D3 & Calcium Bone Screen (2)',
      'Complete Hemogram CBC (24)',
      'Urine Routine & Microscopic (18)'
    ],
    includedCategories: [
      {
        categoryName: 'Cardiac Markers & Heart Inflammation (6 Parameters)',
        tests: ['High Sensitivity CRP (hs-CRP)', 'Total Cholesterol', 'Triglycerides', 'HDL', 'LDL', 'VLDL']
      },
      {
        categoryName: 'Renal, Electrolyte & Joint Panel (9 Parameters)',
        tests: ['Serum Creatinine', 'BUN', 'Uric Acid (Gout Screen)', 'Sodium', 'Potassium', 'Chloride', 'Calcium', 'eGFR']
      },
      {
        categoryName: 'Liver & Metabolism (11 Parameters)',
        tests: ['Bilirubin Total', 'SGOT', 'SGPT', 'Alkaline Phosphatase', 'Total Protein', 'Albumin', 'Globulin']
      },
      {
        categoryName: 'Glycemic Control (2 Parameters)',
        tests: ['HbA1c Glycated Hemoglobin', 'Fasting Plasma Glucose']
      },
      {
        categoryName: 'Bone Strength & Immunity (2 Parameters)',
        tests: ['Vitamin D3 25-Hydroxy', 'Serum Calcium']
      },
      {
        categoryName: 'Complete Blood Count (24 Parameters)',
        tests: ['Hemoglobin', 'Platelet Count', 'ESR', 'Total WBC', 'RBC Indices']
      }
    ],
    department: 'Geriatric Clinical Pathology',
    popular: true,
    badge: 'Geriatric Special',
    recommendedFor: 'Men and women aged 55 years and above, chronic disease monitoring',
    isDemo: true
  },
  {
    id: 'pkg-diabetes-shield',
    code: 'LX-PKG-DIAB',
    name: 'Diabetes Comprehensive Care & Sugar Shield',
    hindiName: 'डायबिटीज सम्पूर्ण केयर एवं शुगर शील्ड पैकेज',
    tagline: 'Quarterly gold-standard screening for pre-diabetic & diabetic individuals',
    category: 'Diabetes Care',
    price: 899,
    originalPrice: 2200,
    discountPercentage: 59,
    parametersCount: 48,
    turnaroundTime: '6 Hours (Express)',
    fastTrackAvailable: true,
    sampleType: 'Blood & Urine',
    fastingRequired: true,
    fastingHours: 10,
    preparationInstructions: [
      'Strict 10-12 hours fasting before morning sample collection.',
      'Post-meal medication should be taken only after blood draw.'
    ],
    description: 'Gold standard diabetes monitoring bundle tracking 3-month glycemic control, early diabetic nephropathy signs, and cholesterol ratios.',
    inclusions: [
      'HbA1c with Estimated Average Glucose (2)',
      'Fasting Blood Sugar Glucose (1)',
      'Diabetic Kidney Risk Panel (6)',
      'Complete Lipid Profile (8)',
      'Urine Microalbumin & Sugar (14)'
    ],
    includedCategories: [
      {
        categoryName: 'Glycemic Evaluation (3 Parameters)',
        tests: ['HbA1c (HPLC method)', 'Estimated Average Glucose (eAG)', 'Fasting Plasma Blood Glucose']
      },
      {
        categoryName: 'Diabetic Renal Risk Screen (6 Parameters)',
        tests: ['Serum Creatinine', 'Blood Urea Nitrogen (BUN)', 'Serum Uric Acid', 'eGFR', 'Electrolytes']
      },
      {
        categoryName: 'Cardiovascular Lipid Risk (8 Parameters)',
        tests: ['Total Cholesterol', 'Triglycerides', 'HDL Good Cholesterol', 'LDL Bad Cholesterol', 'VLDL']
      },
      {
        categoryName: 'Urine Sugar & Protein (14 Parameters)',
        tests: ['Urine Glucose', 'Urine Ketones', 'Urine Protein/Albumin', 'Pus Cells', 'Specific Gravity']
      }
    ],
    department: 'Metabolic & Endocrinology',
    popular: true,
    badge: '⚡ 6-Hr Express Report',
    recommendedFor: 'Individuals with diabetes, pre-diabetes, elevated HbA1c, or family history',
    isDemo: true
  },
  {
    id: 'pkg-women-wellness',
    code: 'LX-PKG-WOMEN',
    name: "Women's Wellness & Hormonal Harmony Package",
    hindiName: 'महिला स्वास्थ्य एवं हार्मोन संतुलन पैकेज',
    tagline: 'PCOS, thyroid, anemia, bone health & vitamin deficiency check for women',
    category: 'Women Wellness',
    price: 1499,
    originalPrice: 3600,
    discountPercentage: 58,
    parametersCount: 56,
    turnaroundTime: '12 Hours',
    fastTrackAvailable: false,
    sampleType: 'Blood',
    fastingRequired: true,
    fastingHours: 10,
    preparationInstructions: [
      '10 hours overnight fasting recommended.',
      'If checking for cycle regularity, Day 2 to Day 5 of menstrual cycle is optimal.'
    ],
    description: 'Formulated by leading gynecologists and pathologists to screen iron deficiency anemia, thyroid imbalance, Vitamin D fatigue, and hormonal wellness.',
    inclusions: [
      'Thyroid Profile Total (3)',
      'Iron Deficiency & Ferritin Anemia Profile (4)',
      'Vitamin D3 & Calcium Bone Screen (2)',
      'Complete Hemogram CBC with ESR (24)',
      'Lipid Profile & Glucose Screen (9)'
    ],
    includedCategories: [
      {
        categoryName: 'Thyroid Function Panel (3 Parameters)',
        tests: ['Total T3', 'Total T4', 'TSH Ultrasensitive']
      },
      {
        categoryName: 'Iron Deficiency & Anemia Profile (4 Parameters)',
        tests: ['Serum Iron', 'Total Iron Binding Capacity (TIBC)', 'Serum Ferritin', 'Transferrin Saturation %']
      },
      {
        categoryName: 'Bone Strength & Vital Vitamins (2 Parameters)',
        tests: ['Vitamin D3 25-OH', 'Serum Calcium Total']
      },
      {
        categoryName: 'Complete Hemogram (24 Parameters)',
        tests: ['Hemoglobin', 'ESR', 'RBC Indices', 'Platelet Count', 'WBC Differential Count']
      },
      {
        categoryName: 'Lipid & Metabolic Screen (9 Parameters)',
        tests: ['Total Cholesterol', 'Triglycerides', 'HDL', 'LDL', 'Fasting Blood Glucose']
      }
    ],
    department: 'Immunoassay & Hematology',
    popular: true,
    badge: "Women's Choice",
    recommendedFor: 'Women experiencing hair loss, fatigue, cycle irregularity, PCOS, or general wellness',
    isDemo: true
  },
  {
    id: 'pkg-cardiac-shield',
    code: 'LX-PKG-CARDIO',
    name: 'Healthy Heart & Advanced Cardiac Risk Profile',
    hindiName: 'हृदय सुरक्षा एवं लिपिड कार्डियक प्रोफाइल',
    tagline: 'In-depth cardiovascular biomarker screening including hs-CRP and lipid sub-fractions',
    category: 'Heart Care',
    price: 1199,
    originalPrice: 2800,
    discountPercentage: 57,
    parametersCount: 42,
    turnaroundTime: '8 Hours',
    fastTrackAvailable: true,
    sampleType: 'Blood',
    fastingRequired: true,
    fastingHours: 12,
    preparationInstructions: [
      'Strict 12 hours overnight fasting mandatory for accurate lipid calculations.',
      'Avoid high-fat dinner or alcohol on previous evening.'
    ],
    description: 'Advanced cardiac profiling assessing coronary risk, vascular inflammation, and atherogenic cholesterol fractions.',
    inclusions: [
      'Complete Lipid Profile (8)',
      'High Sensitivity C-Reactive Protein (hs-CRP)',
      'Fasting Blood Glucose (1)',
      'Serum Creatinine & Uric Acid (2)',
      'Complete Hemogram CBC (24)'
    ],
    includedCategories: [
      {
        categoryName: 'Lipid Profile Comprehensive (8 Parameters)',
        tests: ['Total Cholesterol', 'Triglycerides', 'HDL (Good) Cholesterol', 'LDL (Bad) Cholesterol', 'VLDL', 'Non-HDL Cholesterol', 'TC/HDL Ratio', 'LDL/HDL Ratio']
      },
      {
        categoryName: 'Cardiac Inflammation Markers (2 Parameters)',
        tests: ['High-Sensitivity CRP (hs-CRP)', 'Serum Uric Acid']
      },
      {
        categoryName: 'Renal & Glucose Risk (3 Parameters)',
        tests: ['Fasting Blood Glucose', 'Serum Creatinine', 'BUN']
      },
      {
        categoryName: 'Hematology Panel (24 Parameters)',
        tests: ['Hemoglobin', 'Platelet Count', 'Hematocrit', 'WBC Count']
      }
    ],
    department: 'Cardiovascular Biochemistry',
    popular: false,
    badge: 'Cardio Shield',
    recommendedFor: 'Adults with family history of heart disease, high stress, high blood pressure, or smoker history',
    isDemo: true
  },
  {
    id: 'pkg-fever-infection',
    code: 'LX-PKG-FEVER',
    name: 'Fever, Dengue & Acute Infection Screening Package',
    hindiName: 'बुखार, डेंगू एवं संक्रमण जांच पैकेज',
    tagline: 'Rapid emergency screening for seasonal viral fever, dengue, malaria and typhoid',
    category: 'Fever & Infection',
    price: 999,
    originalPrice: 2400,
    discountPercentage: 58,
    parametersCount: 32,
    turnaroundTime: '4 Hours (Express)',
    fastTrackAvailable: true,
    sampleType: 'Blood & Urine',
    fastingRequired: false,
    preparationInstructions: [
      'No fasting required; sample can be given anytime.',
      'Stay well hydrated with ORS, coconut water, or clean water.'
    ],
    description: 'Rapid-turnaround multi-parameter infection screen for acute fever, dengue NS1 antigen, malaria parasite, and typhoid fever.',
    inclusions: [
      'Platelet Count & CBC (24)',
      'Dengue NS1 Antigen Rapid (1)',
      'Dengue IgM & IgG Antibodies (2)',
      'Malaria Antigen Pv/Pf (1)',
      'Widal Typhoid Screen (1)',
      'Urine Routine Examination (18)'
    ],
    includedCategories: [
      {
        categoryName: 'Platelet & Blood Infection Markers (24 Parameters)',
        tests: ['Platelet Count Automated & Manual Smear', 'Hemoglobin', 'Total Leukocytes (WBC)', 'ESR', 'Differential Counts']
      },
      {
        categoryName: 'Dengue Serology (2 Parameters)',
        tests: ['Dengue NS1 Antigen (Day 1-5)', 'Dengue IgM & IgG Antibodies']
      },
      {
        categoryName: 'Malaria & Typhoid (2 Parameters)',
        tests: ['Malaria Parasite Antigen (P. vivax & P. falciparum)', 'Widal Slide Agglutination Test']
      },
      {
        categoryName: 'Urinary Tract Infection Screen (14 Parameters)',
        tests: ['Urine Pus Cells', 'Urine Nitrites', 'Urine RBCs', 'Bacteria']
      }
    ],
    department: 'Emergency Serology & Microbiology',
    popular: false,
    badge: '⚡ 4-Hr Emergency TAT',
    recommendedFor: 'Patients suffering from acute fever, chills, severe body ache, suspected dengue or viral infection',
    isDemo: true
  },
  {
    id: 'pkg-vital-organs',
    code: 'LX-PKG-ORGANS',
    name: 'Liver & Kidney Vital Organs Health Shield',
    hindiName: 'लिवर एवं किडनी वाइटल अंग सुरक्षा पैकेज',
    tagline: 'Essential organ function evaluation for medication users, alcohol consumers and preventive health',
    category: 'Vital Organs',
    price: 799,
    originalPrice: 2100,
    discountPercentage: 62,
    parametersCount: 38,
    turnaroundTime: '6 Hours',
    fastTrackAvailable: true,
    sampleType: 'Blood & Urine',
    fastingRequired: true,
    fastingHours: 10,
    preparationInstructions: [
      '10 hours overnight fasting recommended.',
      'Avoid alcohol for at least 48 hours prior to testing.'
    ],
    description: 'Combined liver and renal health monitoring measuring enzymatic clearance, jaundice markers, filtration rate, and electrolyte balance.',
    inclusions: [
      'Liver Function Test LFT (11)',
      'Kidney Function Test KFT with Electrolytes (9)',
      'Serum Uric Acid & Calcium (2)',
      'Urine Routine & Microscopic (18)'
    ],
    includedCategories: [
      {
        categoryName: 'Liver Function & Enzymes (11 Parameters)',
        tests: ['Bilirubin Total/Direct/Indirect', 'SGOT (AST)', 'SGPT (ALT)', 'Alkaline Phosphatase', 'Total Protein', 'Albumin', 'Globulin', 'A/G Ratio', 'GGTP']
      },
      {
        categoryName: 'Kidney Function & Electrolytes (9 Parameters)',
        tests: ['Serum Creatinine', 'Blood Urea Nitrogen (BUN)', 'Serum Uric Acid', 'eGFR', 'Sodium', 'Potassium', 'Chloride', 'Calcium']
      },
      {
        categoryName: 'Urine Routine Examination (18 Parameters)',
        tests: ['Protein', 'Bilirubin', 'Urobilinogen', 'Pus Cells', 'Casts', 'Crystals', 'Specific Gravity']
      }
    ],
    department: 'Biochemistry',
    popular: false,
    badge: 'Organ Care 62% OFF',
    recommendedFor: 'Routine preventive organ checkup, long-term medication users, or routine health reviews',
    isDemo: true
  }
];

