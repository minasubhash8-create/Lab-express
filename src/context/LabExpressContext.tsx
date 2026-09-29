import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Role,
  BookingStatus,
  TestItem,
  PartnerLab,
  Phlebotomist,
  Booking,
  AuditLog,
  Address,
  Patient,
  LabReport,
  HealthPackage,
  CompanyRegistrationDetails
} from '../types';
import {
  INITIAL_TESTS,
  INITIAL_LABS,
  INITIAL_PHLEBOTOMISTS,
  INITIAL_BOOKINGS,
  INITIAL_AUDIT_LOGS,
  INITIAL_ADDRESSES,
  INITIAL_PATIENTS,
  INITIAL_PACKAGES
} from '../data/mockData';

interface LabExpressContextType {
  currentRole: Role;
  setCurrentRole: (role: Role) => void;
  activeLabId: string;
  setActiveLabId: (labId: string) => void;
  activeCity: string;
  setActiveCity: (city: string) => void;
  tests: TestItem[];
  packages: HealthPackage[];
  labs: PartnerLab[];
  phlebotomists: Phlebotomist[];
  bookings: Booking[];
  auditLogs: AuditLog[];
  cart: TestItem[];
  savedAddresses: Address[];
  savedPatients: Patient[];
  
  // Filtered views based on isDemoModeActive (for Customer & Partner Lab views)
  activeTests: TestItem[];
  activePackages: HealthPackage[];
  activeLabs: PartnerLab[];
  activeBookings: Booking[];

  // Cart Actions
  addToCart: (test: TestItem) => void;
  removeFromCart: (testId: string) => void;
  clearCart: () => void;
  isInCart: (testId: string) => boolean;

  // Company & Compliance Details
  companyDetails: CompanyRegistrationDetails;
  updateCompanyDetails: (details: Partial<CompanyRegistrationDetails>) => void;

  // Booking Actions
  createBooking: (bookingInput: {
    patient: Patient;
    address?: Address;
    collectionType: 'home' | 'lab_visit';
    appointmentDate: string;
    timeSlot: string;
    tests: TestItem[];
    paymentMethod: 'UPI (GPay / PhonePe)' | 'Bank Transfer (NEFT / IMPS)' | 'Credit / Debit Card' | 'Cash on Sample Collection' | string;
    paymentUtrNumber?: string;
    paymentReceiptUrl?: string;
  }) => Booking;

  assignLabAndPhlebotomist: (bookingId: string, labId: string, phlebotomistId?: string) => void;
  updateBookingStatus: (bookingId: string, newStatus: BookingStatus, note: string, updatedBy?: string) => void;
  uploadLabReport: (bookingId: string, report: LabReport) => void;
  cancelBooking: (bookingId: string, reason: string) => void;
  deleteBooking: (bookingId: string) => void;
  deleteTestFromBooking: (bookingId: string, testId: string) => void;

  // Security Locks
  isAdminUnlocked: boolean;
  setIsAdminUnlocked: (val: boolean) => void;
  lockAdmin: () => void;
  isLabUnlocked: boolean;
  setIsLabUnlocked: (val: boolean) => void;
  lockLab: () => void;

  // Catalog & Lab Admin Actions
  addTest: (test: TestItem) => void;
  updateTest: (test: TestItem) => void;
  deleteTest: (testId: string) => void;
  clearDemoCatalog: () => void;

  // Packages Management Actions
  addPackage: (pkg: HealthPackage) => void;
  updatePackage: (pkg: HealthPackage) => void;
  deletePackage: (packageId: string) => void;
  clearDemoPackages: () => void;
  convertPackageToTest: (pkg: HealthPackage) => TestItem;

  // Lab Actions
  addLab: (lab: PartnerLab) => void;
  updateLab: (lab: PartnerLab) => void;
  deleteLab: (labId: string) => void;
  clearDemoLabs: () => void;
  clearDemoBookings: () => void;
  clearAllDemoData: () => void;
  
  // Data Mode
  isDemoModeActive: boolean;
  setIsDemoModeActive: (val: boolean) => void;
  
  // Customer Profile Actions
  addPatient: (patient: Patient) => void;
  addAddress: (address: Address) => void;

  // System
  resetToDemoData: () => void;
}

const LabExpressContext = createContext<LabExpressContextType | undefined>(undefined);

const STORAGE_KEY_PREFIX = 'labexpress_v1_';

export const DEFAULT_COMPANY_DETAILS: CompanyRegistrationDetails = {
  companyName: 'LabExpress Healthcare Private Limited',
  tradeName: 'LabExpress Diagnostic & Pathology Network',
  gstNumber: '08AAACL9829M1ZQ',
  msmeNumber: 'UDYAM-RJ-14-0098234',
  cinNumber: 'U85110RJ2026PTC098234',
  clinicalEstablishmentRegNo: 'RAJ-CE-2026-88741',
  nablAccreditationNo: 'NABL-MC-5590/ISO-15189',
  registeredOffice: 'Plot 42, Health City, Tonk Road, Jaipur, Rajasthan - 302018',
  officialPhone: '+91 97837 70735',
  officialEmail: 'compliance@labexpress.in',
  bankName: 'HDFC Bank Ltd',
  bankAccountNo: '50200088921456',
  bankIfscCode: 'HDFC0000123',
  bankAccountName: 'LabExpress Healthcare Private Limited',
  upiVpa: 'labexpress@okhdfcbank'
};

export const LabExpressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<Role>('customer');
  const [activeLabId, setActiveLabId] = useState<string>('lab-apex');
  const [activeCity, setActiveCity] = useState<string>('Jaipur');

  const [companyDetails, setCompanyDetails] = useState<CompanyRegistrationDetails>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}company_details`);
      return saved ? JSON.parse(saved) : DEFAULT_COMPANY_DETAILS;
    } catch {
      return DEFAULT_COMPANY_DETAILS;
    }
  });

  const updateCompanyDetails = (details: Partial<CompanyRegistrationDetails>) => {
    setCompanyDetails((prev) => {
      const updated = { ...prev, ...details };
      try {
        localStorage.setItem(`${STORAGE_KEY_PREFIX}company_details`, JSON.stringify(updated));
      } catch (e) {
        console.warn('LocalStorage error', e);
      }
      return updated;
    });
  };

  // Hydrate or initialize data
  const [tests, setTests] = useState<TestItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}tests`);
      return saved ? JSON.parse(saved) : INITIAL_TESTS;
    } catch {
      return INITIAL_TESTS;
    }
  });

  const [packages, setPackages] = useState<HealthPackage[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}packages`);
      return saved ? JSON.parse(saved) : INITIAL_PACKAGES;
    } catch {
      return INITIAL_PACKAGES;
    }
  });

  const [labs, setLabs] = useState<PartnerLab[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}labs`);
      return saved ? JSON.parse(saved) : INITIAL_LABS;
    } catch {
      return INITIAL_LABS;
    }
  });

  const [phlebotomists, setPhlebotomists] = useState<Phlebotomist[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}phlebotomists`);
      return saved ? JSON.parse(saved) : INITIAL_PHLEBOTOMISTS;
    } catch {
      return INITIAL_PHLEBOTOMISTS;
    }
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}bookings`);
      return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
    } catch {
      return INITIAL_BOOKINGS;
    }
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}auditLogs`);
      return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
    } catch {
      return INITIAL_AUDIT_LOGS;
    }
  });

  const [savedAddresses, setSavedAddresses] = useState<Address[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}addresses`);
      return saved ? JSON.parse(saved) : INITIAL_ADDRESSES;
    } catch {
      return INITIAL_ADDRESSES;
    }
  });

  const [savedPatients, setSavedPatients] = useState<Patient[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}patients`);
      return saved ? JSON.parse(saved) : INITIAL_PATIENTS;
    } catch {
      return INITIAL_PATIENTS;
    }
  });

  const [isAdminUnlocked, setIsAdminUnlocked] = useState<boolean>(false);
  const lockAdmin = () => setIsAdminUnlocked(false);

  const [isLabUnlocked, setIsLabUnlocked] = useState<boolean>(false);
  const lockLab = () => setIsLabUnlocked(false);

  const [isDemoModeActive, setIsDemoModeActive] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}demo_mode`);
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  const [cart, setCart] = useState<TestItem[]>([]);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}demo_mode`, JSON.stringify(isDemoModeActive));
    } catch (e) {
      console.warn(e);
    }
  }, [isDemoModeActive]);
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}tests`, JSON.stringify(tests));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  }, [tests]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}packages`, JSON.stringify(packages));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  }, [packages]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}labs`, JSON.stringify(labs));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  }, [labs]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}phlebotomists`, JSON.stringify(phlebotomists));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  }, [phlebotomists]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}bookings`, JSON.stringify(bookings));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  }, [bookings]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}auditLogs`, JSON.stringify(auditLogs));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  }, [auditLogs]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}addresses`, JSON.stringify(savedAddresses));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  }, [savedAddresses]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}patients`, JSON.stringify(savedPatients));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  }, [savedPatients]);

  // Cart operations
  const addToCart = (test: TestItem) => {
    setCart((prev) => {
      if (prev.some((t) => t.id === test.id)) return prev;
      return [...prev, test];
    });
  };

  const removeFromCart = (testId: string) => {
    setCart((prev) => prev.filter((t) => t.id !== testId));
  };

  const clearCart = () => setCart([]);

  const isInCart = (testId: string) => cart.some((t) => t.id === testId);

  // Helper to append audit logs
  const logAction = (role: Role, actorName: string, action: string, details: string, bookingId?: string) => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      role,
      actorName,
      action,
      bookingId,
      details
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  // Create Booking
  const createBooking = (bookingInput: {
    patient: Patient;
    address?: Address;
    collectionType: 'home' | 'lab_visit';
    appointmentDate: string;
    timeSlot: string;
    tests: TestItem[];
    paymentMethod: 'UPI (GPay / PhonePe)' | 'Bank Transfer (NEFT / IMPS)' | 'Credit / Debit Card' | 'Cash on Sample Collection' | string;
    paymentUtrNumber?: string;
    paymentReceiptUrl?: string;
  }): Booking => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const cityCode = activeCity.substring(0, 3).toUpperCase();
    const bookingId = `LX-${randomNum}-${cityCode}`;
    const now = new Date().toISOString();

    const totalAmount = bookingInput.tests.reduce((acc, t) => acc + t.price, 0);
    const discountAmount = totalAmount > 1000 ? 150 : 50;
    const collectionFee = bookingInput.collectionType === 'home' ? 0 : 0; // Free express pickup promo
    const finalAmount = Math.max(0, totalAmount - discountAmount + collectionFee);

    const isPaidOnline = bookingInput.paymentMethod !== 'Cash on Sample Collection';

    const newBooking: Booking = {
      id: bookingId,
      createdAt: now,
      updatedAt: now,
      customerId: 'cust-priya-01',
      customerName: 'Priya Sharma',
      customerPhone: '+91 97837 70735',
      customerEmail: 'priya.sharma@example.com',
      patient: bookingInput.patient,
      collectionType: bookingInput.collectionType,
      address: bookingInput.address,
      appointmentDate: bookingInput.appointmentDate,
      timeSlot: bookingInput.timeSlot,
      tests: bookingInput.tests,
      totalAmount,
      discountAmount,
      collectionFee,
      finalAmount,
      paymentStatus: isPaidOnline ? 'paid_online' : 'pending_on_collection',
      paymentMethod: bookingInput.paymentMethod,
      paymentUtrNumber: bookingInput.paymentUtrNumber,
      paymentReceiptUrl: bookingInput.paymentReceiptUrl,
      status: 'confirmed',
      isCustom: true,
      isDemo: false,
      timeline: [
        {
          status: 'confirmed',
          timestamp: now,
          title: 'Booking Confirmed',
          note: `Appointment slot: ${bookingInput.timeSlot} on ${bookingInput.appointmentDate}. Payment: ${bookingInput.paymentMethod}${bookingInput.paymentUtrNumber ? ` (Ref UTR: ${bookingInput.paymentUtrNumber})` : ''}.`,
          actor: 'Customer Priya Sharma'
        }
      ]
    };

    setBookings((prev) => [newBooking, ...prev]);
    logAction(
      'customer',
      'Priya Sharma',
      'NEW_BOOKING_CREATED',
      `Booked ${bookingInput.tests.length} tests for ${bookingInput.patient.name} (${bookingId}).`,
      bookingId
    );

    clearCart();
    return newBooking;
  };

  // Admin assigns Lab & Phlebotomist
  const assignLabAndPhlebotomist = (bookingId: string, labId: string, phlebotomistId?: string) => {
    const targetLab = labs.find((l) => l.id === labId);
    const targetPhleb = phlebotomists.find((p) => p.id === phlebotomistId);
    const now = new Date().toISOString();

    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId) return b;

        const updatedTimeline = [
          ...b.timeline,
          {
            status: 'staff_assigned' as BookingStatus,
            timestamp: now,
            title: 'Partner Lab & Phlebotomist Assigned',
            note: `Assigned to ${targetLab?.name || 'Partner Lab'}${
              targetPhleb ? ` with Phlebotomist ${targetPhleb.name}` : ''
            }. Cold-chain transit initialized.`,
            actor: 'Admin Operations'
          }
        ];

        return {
          ...b,
          status: 'staff_assigned',
          assignedLabId: labId,
          assignedLabName: targetLab?.name,
          assignedPhlebotomistId: phlebotomistId,
          assignedPhlebotomistName: targetPhleb?.name,
          sampleBarcode: b.sampleBarcode || `LX-BAR-${Math.floor(10000 + Math.random() * 90000)}`,
          updatedAt: now,
          timeline: updatedTimeline
        };
      })
    );

    logAction(
      'admin',
      'Operations Lead',
      'LAB_AND_STAFF_ASSIGNED',
      `Assigned booking ${bookingId} to ${targetLab?.name || labId} and phlebotomist ${targetPhleb?.name || 'Default'}.`,
      bookingId
    );
  };

  // Generic status advancement
  const updateBookingStatus = (bookingId: string, newStatus: BookingStatus, note: string, updatedBy?: string) => {
    const now = new Date().toISOString();
    const actorRole = currentRole;
    const actorName =
      updatedBy ||
      (actorRole === 'admin'
        ? 'Admin Central'
        : actorRole === 'partner_lab'
        ? 'Partner Lab Technician'
        : 'Customer');

    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId) return b;

        let statusTitle = 'Status Updated';
        if (newStatus === 'sample_collected') statusTitle = 'Sample Collected from Patient';
        if (newStatus === 'received_at_lab') statusTitle = 'Sample Received at Lab Desk';
        if (newStatus === 'processing') statusTitle = 'Processing in Analyzers';
        if (newStatus === 'report_ready') statusTitle = 'Authorized Report Ready';
        if (newStatus === 'cancelled') statusTitle = 'Booking Cancelled';

        return {
          ...b,
          status: newStatus,
          updatedAt: now,
          timeline: [
            ...b.timeline,
            {
              status: newStatus,
              timestamp: now,
              title: statusTitle,
              note: note || `Booking progressed to ${newStatus}`,
              actor: actorName
            }
          ]
        };
      })
    );

    logAction(actorRole, actorName, `STATUS_${newStatus.toUpperCase()}`, note, bookingId);
  };

  // Upload Lab Report & Complete
  const uploadLabReport = (bookingId: string, report: LabReport) => {
    const now = new Date().toISOString();
    const actorName = `${report.pathologistName} (${report.labName})`;

    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId) return b;
        return {
          ...b,
          status: 'report_ready',
          report,
          updatedAt: now,
          timeline: [
            ...b.timeline,
            {
              status: 'report_ready',
              timestamp: now,
              title: 'Official NABL Report Released',
              note: `Digitally authorized by ${report.pathologistName} (${report.pathologistRegNo}). Ready for customer download.`,
              actor: actorName
            }
          ]
        };
      })
    );

    logAction('partner_lab', actorName, 'REPORT_AUTHORIZED_RELEASED', `Authorized report ${report.reportId} released for ${bookingId}.`, bookingId);
  };

  // Cancel Booking
  const cancelBooking = (bookingId: string, reason: string) => {
    const now = new Date().toISOString();
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId) return b;
        return {
          ...b,
          status: 'cancelled',
          cancellationReason: reason,
          paymentStatus: b.paymentStatus === 'paid_online' ? 'refunded' : b.paymentStatus,
          updatedAt: now,
          timeline: [
            ...b.timeline,
            {
              status: 'cancelled',
              timestamp: now,
              title: 'Booking Cancelled',
              note: `Reason: ${reason}. Automated refund triggered if prepaid.`,
              actor: currentRole === 'customer' ? 'Customer Priya Sharma' : 'Admin Operations'
            }
          ]
        };
      })
    );

    logAction(currentRole, 'User', 'BOOKING_CANCELLED', `Cancelled ${bookingId}. Reason: ${reason}`, bookingId);
  };

  // Permanently delete a booking order
  const deleteBooking = (bookingId: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== bookingId));
    logAction(currentRole, currentRole === 'admin' ? 'Super Admin' : 'User', 'BOOKING_DELETED', `Deleted booking ID: ${bookingId}`, bookingId);
  };

  // Delete an individual test from an active booking
  const deleteTestFromBooking = (bookingId: string, testId: string) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId) return b;
        const remainingTests = b.tests.filter((t) => t.id !== testId);
        if (remainingTests.length === 0) {
          // If no tests left, cancel or remove
          return {
            ...b,
            tests: [],
            status: 'cancelled',
            cancellationReason: 'All tests removed from booking'
          };
        }
        const newTotal = remainingTests.reduce((sum, t) => sum + t.price, 0);
        const newDiscount = newTotal > 1000 ? 150 : 50;
        const newFinal = Math.max(0, newTotal - newDiscount);
        return {
          ...b,
          tests: remainingTests,
          totalAmount: newTotal,
          discountAmount: newDiscount,
          finalAmount: newFinal,
          updatedAt: new Date().toISOString()
        };
      })
    );
    logAction(currentRole, 'Operations', 'TEST_REMOVED_FROM_BOOKING', `Removed test ${testId} from booking ${bookingId}`, bookingId);
  };

  const DEMO_TEST_IDS = new Set(INITIAL_TESTS.map((t) => t.id));
  const DEMO_PACKAGE_IDS = new Set(INITIAL_PACKAGES.map((p) => p.id));
  const DEMO_LAB_IDS = new Set(INITIAL_LABS.map((l) => l.id));
  const DEMO_BOOKING_IDS = new Set(INITIAL_BOOKINGS.map((b) => b.id));

  // Active / Filtered lists based on isDemoModeActive:
  // When isDemoModeActive is FALSE, demo items are hidden from customer catalog & partner lab queues!
  const activeTests = isDemoModeActive
    ? tests
    : tests.filter((t) => t.isCustom === true || !DEMO_TEST_IDS.has(t.id));

  const activePackages = isDemoModeActive
    ? packages
    : packages.filter((p) => p.isCustom === true || !DEMO_PACKAGE_IDS.has(p.id));

  const activeLabs = isDemoModeActive
    ? labs
    : labs.filter((l) => l.isCustom === true || !DEMO_LAB_IDS.has(l.id));

  const activeBookings = isDemoModeActive
    ? bookings
    : bookings.filter((b) => !DEMO_BOOKING_IDS.has(b.id));

  // Test catalog actions
  const addTest = (test: TestItem) => {
    setTests((prev) => [{ ...test, isCustom: true }, ...prev]);
    logAction('admin', 'Super Admin', 'ADD_TEST_CATALOG', `Added test ${test.name} (${test.code})`);
  };

  const updateTest = (updated: TestItem) => {
    setTests((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    logAction('admin', 'Super Admin', 'UPDATE_TEST_CATALOG', `Updated test ${updated.name}`);
  };

  const deleteTest = (testId: string) => {
    setTests((prev) => prev.filter((t) => t.id !== testId));
    logAction('admin', 'Super Admin', 'DELETE_TEST_CATALOG', `Deleted test ID: ${testId}`);
  };

  const clearDemoCatalog = () => {
    setTests((prev) => prev.filter((t) => !DEMO_TEST_IDS.has(t.id) && t.isCustom));
    logAction('admin', 'Super Admin', 'CLEAR_DEMO_CATALOG', 'Cleared all initial demo tests from catalog. Only real tests will be active.');
  };

  // Package Actions
  const addPackage = (pkg: HealthPackage) => {
    setPackages((prev) => [{ ...pkg, isCustom: true }, ...prev]);
    logAction('admin', 'Super Admin', 'ADD_PACKAGE', `Created new health package: ${pkg.name} (${pkg.code})`);
  };

  const updatePackage = (updated: HealthPackage) => {
    setPackages((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    logAction('admin', 'Super Admin', 'UPDATE_PACKAGE', `Updated health package: ${updated.name}`);
  };

  const deletePackage = (packageId: string) => {
    setPackages((prev) => prev.filter((p) => p.id !== packageId));
    logAction('admin', 'Super Admin', 'DELETE_PACKAGE', `Deleted health package ID: ${packageId}`);
  };

  const clearDemoPackages = () => {
    setPackages((prev) => prev.filter((p) => !DEMO_PACKAGE_IDS.has(p.id) && p.isCustom));
    logAction('admin', 'Super Admin', 'CLEAR_DEMO_PACKAGES', 'Cleared all demo packages from catalog.');
  };

  const convertPackageToTest = (pkg: HealthPackage): TestItem => ({
    id: pkg.id,
    code: pkg.code,
    name: pkg.name,
    hindiName: pkg.hindiName,
    category: 'Packages',
    price: pkg.price,
    originalPrice: pkg.originalPrice,
    turnaroundTime: pkg.turnaroundTime,
    fastTrackAvailable: pkg.fastTrackAvailable,
    sampleType: pkg.sampleType,
    fastingRequired: pkg.fastingRequired,
    fastingHours: pkg.fastingHours,
    preparationInstructions: pkg.preparationInstructions,
    description: pkg.description,
    parametersCount: pkg.parametersCount,
    inclusions: pkg.inclusions,
    department: pkg.department,
    popular: pkg.popular,
    badge: pkg.badge,
    isDemo: pkg.isDemo,
    isCustom: pkg.isCustom,
    isPackage: true,
    packageId: pkg.id,
    includedCategories: pkg.includedCategories
  });

  // Lab network actions
  const addLab = (lab: PartnerLab) => {
    setLabs((prev) => [...prev, { ...lab, isCustom: true }]);
    logAction('admin', 'Super Admin', 'ADD_PARTNER_LAB', `Added partner lab ${lab.name}`);
  };

  const updateLab = (updated: PartnerLab) => {
    setLabs((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
    logAction('admin', 'Super Admin', 'UPDATE_PARTNER_LAB', `Updated partner lab ${updated.name}`);
  };

  const deleteLab = (labId: string) => {
    setLabs((prev) => prev.filter((l) => l.id !== labId));
    logAction('admin', 'Super Admin', 'DELETE_PARTNER_LAB', `Deleted partner laboratory ${labId}`);
  };

  const clearDemoLabs = () => {
    setLabs((prev) => prev.filter((l) => !DEMO_LAB_IDS.has(l.id) && l.isCustom));
    logAction('admin', 'Super Admin', 'CLEAR_DEMO_LABS', 'Cleared all default demo partner labs.');
  };

  const clearDemoBookings = () => {
    setBookings((prev) => prev.filter((b) => !DEMO_BOOKING_IDS.has(b.id) && (b.isCustom || !b.isDemo)));
    logAction('admin', 'Super Admin', 'CLEAR_DEMO_BOOKINGS', 'Cleared all demo dummy orders from partner lab queue.');
  };

  const clearAllDemoData = () => {
    setTests((prev) => prev.filter((t) => !DEMO_TEST_IDS.has(t.id) && t.isCustom));
    setPackages((prev) => prev.filter((p) => !DEMO_PACKAGE_IDS.has(p.id) && p.isCustom));
    setLabs((prev) => prev.filter((l) => !DEMO_LAB_IDS.has(l.id) && l.isCustom));
    setBookings((prev) => prev.filter((b) => !DEMO_BOOKING_IDS.has(b.id) && (b.isCustom || !b.isDemo)));
    setIsDemoModeActive(false);
    logAction('admin', 'Super Admin', 'PURGE_ALL_DEMO_DATA', 'Purged all demo catalog tests, packages, demo labs, and demo bookings. Activated live production mode.');
  };

  // Profile actions
  const addPatient = (patient: Patient) => {
    setSavedPatients((prev) => [...prev, patient]);
  };

  const addAddress = (address: Address) => {
    setSavedAddresses((prev) => [...prev, address]);
  };

  // Reset demo
  const resetToDemoData = () => {
    setTests(INITIAL_TESTS);
    setPackages(INITIAL_PACKAGES);
    setLabs(INITIAL_LABS);
    setPhlebotomists(INITIAL_PHLEBOTOMISTS);
    setBookings(INITIAL_BOOKINGS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setSavedAddresses(INITIAL_ADDRESSES);
    setSavedPatients(INITIAL_PATIENTS);
    setIsDemoModeActive(true);
    setCart([]);
    try {
      localStorage.removeItem(`${STORAGE_KEY_PREFIX}tests`);
      localStorage.removeItem(`${STORAGE_KEY_PREFIX}packages`);
      localStorage.removeItem(`${STORAGE_KEY_PREFIX}labs`);
      localStorage.removeItem(`${STORAGE_KEY_PREFIX}phlebotomists`);
      localStorage.removeItem(`${STORAGE_KEY_PREFIX}bookings`);
      localStorage.removeItem(`${STORAGE_KEY_PREFIX}auditLogs`);
      localStorage.removeItem(`${STORAGE_KEY_PREFIX}addresses`);
      localStorage.removeItem(`${STORAGE_KEY_PREFIX}patients`);
      localStorage.setItem(`${STORAGE_KEY_PREFIX}demo_mode`, JSON.stringify(true));
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <LabExpressContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        activeLabId,
        setActiveLabId,
        activeCity,
        setActiveCity,
        tests,
        packages,
        labs,
        phlebotomists,
        bookings,
        auditLogs,
        cart,
        savedAddresses,
        savedPatients,
        activeTests,
        activePackages,
        activeLabs,
        activeBookings,
        addToCart,
        removeFromCart,
        clearCart,
        isInCart,
        createBooking,
        assignLabAndPhlebotomist,
        updateBookingStatus,
        uploadLabReport,
        cancelBooking,
        deleteBooking,
        deleteTestFromBooking,
        isAdminUnlocked,
        setIsAdminUnlocked,
        lockAdmin,
        isLabUnlocked,
        setIsLabUnlocked,
        lockLab,
        addTest,
        updateTest,
        deleteTest,
        clearDemoCatalog,
        addPackage,
        updatePackage,
        deletePackage,
        clearDemoPackages,
        convertPackageToTest,
        addLab,
        updateLab,
        deleteLab,
        clearDemoLabs,
        clearDemoBookings,
        clearAllDemoData,
        isDemoModeActive,
        setIsDemoModeActive,
        companyDetails,
        updateCompanyDetails,
        addPatient,
        addAddress,
        resetToDemoData
      }}
    >
      {children}
    </LabExpressContext.Provider>
  );
};

export const useLabExpress = () => {
  const context = useContext(LabExpressContext);
  if (!context) {
    throw new Error('useLabExpress must be used within a LabExpressProvider');
  }
  return context;
};
