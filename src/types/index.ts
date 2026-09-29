export type Role = 'customer' | 'admin' | 'partner_lab';

export type BookingStatus =
  | 'confirmed'
  | 'staff_assigned'
  | 'sample_collected'
  | 'received_at_lab'
  | 'processing'
  | 'report_ready'
  | 'cancelled';

export interface TestItem {
  id: string;
  code: string;
  name: string;
  hindiName?: string;
  category: 'Full Body' | 'Fasting Tests' | 'Diabetes & Blood Sugar' | 'Vitamins & Minerals' | 'Heart Health' | 'Liver & Kidney' | 'Women Health' | 'Senior Citizen' | 'Packages';
  price: number;
  originalPrice: number;
  turnaroundTime: string; // e.g. "6 Hours (Express)", "12 Hours", "24 Hours"
  fastTrackAvailable: boolean;
  sampleType: 'Blood' | 'Urine' | 'Blood & Urine' | 'Saliva / Swab';
  fastingRequired: boolean;
  fastingHours?: number;
  preparationInstructions: string[];
  description: string;
  parametersCount: number;
  inclusions: string[];
  department: string;
  popular?: boolean;
  badge?: string;
  isDemo?: boolean;
  isCustom?: boolean;
  isPackage?: boolean;
  packageId?: string;
  includedCategories?: {
    categoryName: string;
    tests: string[];
  }[];
}

export interface HealthPackage {
  id: string;
  code: string;
  name: string;
  hindiName?: string;
  tagline: string;
  category: 'Full Body' | 'Senior Citizen' | 'Diabetes Care' | 'Women Wellness' | 'Heart Care' | 'Fever & Infection' | 'Vital Organs';
  price: number;
  originalPrice: number;
  discountPercentage: number;
  parametersCount: number;
  turnaroundTime: string;
  fastTrackAvailable: boolean;
  sampleType: 'Blood' | 'Urine' | 'Blood & Urine' | 'Saliva / Swab';
  fastingRequired: boolean;
  fastingHours?: number;
  preparationInstructions: string[];
  description: string;
  inclusions: string[];
  includedCategories: {
    categoryName: string;
    tests: string[];
  }[];
  department: string;
  popular?: boolean;
  badge?: string;
  recommendedFor: string;
  isDemo?: boolean;
  isCustom?: boolean;
}

export interface Address {
  id: string;
  label: 'Home' | 'Office' | 'Parents' | 'Other';
  street: string;
  area: string;
  city: string;
  pincode: string;
  landmark?: string;
  line1?: string;
  line2?: string;
  isDefault?: boolean;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  relation: 'Self' | 'Spouse' | 'Father' | 'Mother' | 'Child' | 'Other';
  phone?: string;
}

export interface PartnerLab {
  id: string;
  name: string;
  code: string;
  nablCode: string;
  rating: number;
  reviewsCount: number;
  address: string;
  city: string;
  contactPhone: string;
  contactEmail?: string;
  chiefPathologist: string;
  pathologistRegNo: string;
  operatingHours?: string;
  servicePincodes: string[];
  activeBookingsCount?: number;
  activeWorkload?: number;
  commissionRate: number; // percentage, e.g. 20
  status?: 'active' | 'busy' | 'offline';
  verifiedNabl?: boolean;
  isDemo?: boolean;
  isCustom?: boolean;
  isPartnerHub?: boolean;
  district?: string;
  tehsil?: string;
  subDistrict?: string;
  state?: string;
  accreditationDate?: string;
  turnaroundGuaranteedHours?: number;
  maxDailyCapacity?: number;
  gstNumber?: string;
  msmeNumber?: string;
  registrationNumber?: string;
  clinicalEstablishmentNo?: string;
}

export interface Phlebotomist {
  id: string;
  name: string;
  phone: string;
  rating: number;
  completedVisits: number;
  experienceYears: number;
  status: 'available' | 'on_duty' | 'off_duty';
  assignedLabId: string;
  vehicle: string;
  vaccinated: boolean;
}

export interface TestResultParameter {
  name: string;
  result: string;
  normalRange: string;
  unit: string;
  flag: 'normal' | 'low' | 'high';
}

export interface LabReport {
  reportId: string;
  uploadedAt: string;
  pathologistName: string;
  pathologistRegNo: string;
  labNablCode: string;
  labName: string;
  status: 'authorized_final' | 'provisional';
  parameters: TestResultParameter[];
  clinicalRemarks: string;
  qrVerificationCode: string;
  fileUrl?: string;
  fileName?: string;
  fileSizeBytes?: number;
  signedElectronically?: boolean;
  signatureTimestamp?: string;
  signatureHash?: string;
}

export interface CompanyRegistrationDetails {
  companyName: string;
  tradeName: string;
  gstNumber: string;
  msmeNumber: string;
  cinNumber: string;
  clinicalEstablishmentRegNo: string;
  nablAccreditationNo: string;
  registeredOffice: string;
  officialPhone: string;
  officialEmail: string;
  bankName: string;
  bankAccountNo: string;
  bankIfscCode: string;
  bankAccountName: string;
  upiVpa: string;
}

export interface BookingTimelineEntry {
  status: BookingStatus;
  timestamp: string;
  title: string;
  note: string;
  actor: string;
}

export interface Booking {
  id: string; // e.g. "LX-8392-DEL"
  createdAt: string;
  updatedAt: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  patient: Patient;
  collectionType: 'home' | 'lab_visit';
  address?: Address;
  appointmentDate: string;
  timeSlot: string; // e.g. "06:30 AM - 07:00 AM"
  tests: TestItem[];
  totalAmount: number;
  discountAmount: number;
  collectionFee: number;
  finalAmount: number;
  paymentStatus: 'paid_online' | 'pending_on_collection' | 'refunded';
  paymentMethod: 'UPI (GPay / PhonePe)' | 'Bank Transfer (NEFT / IMPS)' | 'Credit / Debit Card' | 'Cash on Sample Collection' | string;
  paymentUtrNumber?: string;
  paymentReceiptUrl?: string;
  status: BookingStatus;
  assignedLabId?: string;
  assignedLabName?: string;
  assignedPhlebotomistId?: string;
  assignedPhlebotomistName?: string;
  sampleBarcode?: string;
  sampleVials?: string[];
  timeline: BookingTimelineEntry[];
  report?: LabReport;
  cancellationReason?: string;
  adminNotes?: string;
  isDemo?: boolean;
  isCustom?: boolean;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  role: Role;
  actorName: string;
  action: string;
  bookingId?: string;
  details: string;
}
