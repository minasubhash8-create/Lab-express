import React, { useState } from 'react';
import { useLabExpress } from '../../context/LabExpressContext';
import { TestItem, Patient, Address } from '../../types';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  User,
  ShieldCheck,
  CheckCircle2,
  CreditCard,
  Banknote,
  Smartphone,
  Plus,
  Zap,
  Building,
  AlertCircle,
  MessageCircle,
  BellRing,
  Landmark,
  Copy,
  Check,
  QrCode,
  Upload,
  ExternalLink,
  FileText,
  Image as ImageIcon
} from 'lucide-react';
import { OFFICIAL_WHATSAPP_DISPLAY, OFFICIAL_WHATSAPP_NUMBER } from '../common/WhatsAppNotificationModal';

interface BookingModalProps {
  testsToBook: TestItem[];
  isOpen: boolean;
  onClose: () => void;
  onBookingComplete: (bookingId: string) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  testsToBook,
  isOpen,
  onClose,
  onBookingComplete
}) => {
  const {
    savedAddresses,
    savedPatients,
    addPatient,
    addAddress,
    createBooking,
    activeCity,
    companyDetails
  } = useLabExpress();

  // Selection states
  const [selectedPatientId, setSelectedPatientId] = useState<string>(savedPatients[0]?.id || '');
  const [selectedAddressId, setSelectedAddressId] = useState<string>(savedAddresses[0]?.id || '');
  const [collectionType, setCollectionType] = useState<'home' | 'lab_visit'>('home');
  const [appointmentDate, setAppointmentDate] = useState<string>('2026-09-28');
  const [timeSlot, setTimeSlot] = useState<string>('07:00 AM - 07:30 AM');
  const [paymentMethod, setPaymentMethod] = useState<string>('UPI (GPay / PhonePe)');
  const [paymentUtrNumber, setPaymentUtrNumber] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [copiedBankAcc, setCopiedBankAcc] = useState(false);
  const [paymentReceiptUrl, setPaymentReceiptUrl] = useState<string | null>(null);
  const [receiptFileName, setReceiptFileName] = useState<string | null>(null);
  const [showQrCode, setShowQrCode] = useState(true);

  // Handle payment receipt upload
  const handleReceiptUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setReceiptFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      setPaymentReceiptUrl(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  // New patient mini-form
  const [showAddPatient, setShowAddPatient] = useState(false);
  const [newPatientName, setNewPatientName] = useState('');
  const [newPatientAge, setNewPatientAge] = useState('');
  const [newPatientGender, setNewPatientGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [newPatientRelation, setNewPatientRelation] = useState<'Self' | 'Spouse' | 'Father' | 'Mother' | 'Child' | 'Other'>('Mother');

  // New address mini-form
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newStreet, setNewStreet] = useState('');
  const [newArea, setNewArea] = useState('');
  const [newPincode, setNewPincode] = useState('110049');

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || testsToBook.length === 0) return null;

  // Pricing calculations
  const totalAmount = testsToBook.reduce((acc, t) => acc + t.price, 0);
  const originalTotal = testsToBook.reduce((acc, t) => acc + t.originalPrice, 0);
  const discountAmount = totalAmount > 1000 ? 150 : 50;
  const collectionFee = 0; // FREE Express pickup
  const finalAmount = Math.max(0, totalAmount - discountAmount + collectionFee);

  const selectedPatient = savedPatients.find((p) => p.id === selectedPatientId) || savedPatients[0];
  const selectedAddress = savedAddresses.find((a) => a.id === selectedAddressId) || savedAddresses[0];

  const handleAddNewPatient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPatientName.trim() || !newPatientAge) return;

    const newP: Patient = {
      id: `pat-${Date.now()}`,
      name: newPatientName.trim(),
      age: parseInt(newPatientAge, 10),
      gender: newPatientGender,
      relation: newPatientRelation
    };
    addPatient(newP);
    setSelectedPatientId(newP.id);
    setShowAddPatient(false);
    setNewPatientName('');
    setNewPatientAge('');
  };

  const handleAddNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStreet.trim() || !newArea.trim()) return;

    const newAddr: Address = {
      id: `addr-${Date.now()}`,
      label: 'Home',
      street: newStreet.trim(),
      area: newArea.trim(),
      city: activeCity,
      pincode: newPincode.trim() || '110001'
    };
    addAddress(newAddr);
    setSelectedAddressId(newAddr.id);
    setShowAddAddress(false);
    setNewStreet('');
    setNewArea('');
  };

  const handleConfirmBooking = () => {
    if (!selectedPatient) return;
    setIsSubmitting(true);

    setTimeout(() => {
      const newBooking = createBooking({
        patient: selectedPatient,
        address: collectionType === 'home' ? selectedAddress : undefined,
        collectionType,
        appointmentDate,
        timeSlot,
        tests: testsToBook,
        paymentMethod,
        paymentUtrNumber: paymentUtrNumber.trim() || undefined,
        paymentReceiptUrl: paymentReceiptUrl || undefined
      });

      setIsSubmitting(false);
      onBookingComplete(newBooking.id);
    }, 600);
  };

  const timeSlots = [
    '06:30 AM - 07:00 AM (Fasting Priority)',
    '07:00 AM - 07:30 AM',
    '07:30 AM - 08:00 AM',
    '08:00 AM - 08:30 AM',
    '09:00 AM - 09:30 AM',
    '10:30 AM - 11:00 AM',
    '04:30 PM - 05:00 PM (Non-Fasting)'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse" />
              <h2 className="text-lg font-bold">Book Diagnostic Test Order</h2>
            </div>
            <p className="text-xs text-slate-400">
              {testsToBook.length} test{testsToBook.length > 1 ? 's' : ''} selected • Doorstep pickup in {activeCity}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[72vh] overflow-y-auto">
          
          {/* Selected Tests Pill Summary */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
            <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Selected Tests ({testsToBook.length})
            </p>
            <div className="flex flex-wrap gap-2">
              {testsToBook.map((t) => (
                <div
                  key={t.id}
                  className="bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-800 flex items-center gap-2 shadow-2xs"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                  <span className="max-w-[200px] truncate">{t.name}</span>
                  <span className="font-bold text-slate-900">₹{t.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Collection Mode Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              1. Choose Collection Mode
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setCollectionType('home')}
                className={`p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                  collectionType === 'home'
                    ? 'border-teal-600 bg-teal-50/60 ring-2 ring-teal-500/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className={`p-2 rounded-lg ${collectionType === 'home' ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-bold text-slate-900">Home Sample Collection</p>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 rounded">FREE</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Certified phlebotomist visits home with cold box & vacuum tubes.
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setCollectionType('lab_visit')}
                className={`p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                  collectionType === 'lab_visit'
                    ? 'border-teal-600 bg-teal-50/60 ring-2 ring-teal-500/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className={`p-2 rounded-lg ${collectionType === 'lab_visit' ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Visit Partner Lab Directly</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Walk in to nearest accredited partner laboratory branch.
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Patient Details */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                2. Patient Details
              </label>
              <button
                type="button"
                onClick={() => setShowAddPatient(!showAddPatient)}
                className="text-xs text-teal-600 font-bold hover:text-teal-700 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                {showAddPatient ? 'Cancel' : 'Add Family Member'}
              </button>
            </div>

            {showAddPatient ? (
              <form onSubmit={handleAddNewPatient} className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-3 space-y-3">
                <p className="text-xs font-bold text-slate-800">Add New Patient</p>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={newPatientName}
                    onChange={(e) => setNewPatientName(e.target.value)}
                    className="sm:col-span-2 text-xs p-2 bg-white border border-slate-300 rounded-lg outline-teal-600"
                  />
                  <input
                    type="number"
                    required
                    placeholder="Age"
                    min="1"
                    max="110"
                    value={newPatientAge}
                    onChange={(e) => setNewPatientAge(e.target.value)}
                    className="text-xs p-2 bg-white border border-slate-300 rounded-lg outline-teal-600"
                  />
                  <select
                    value={newPatientGender}
                    onChange={(e) => setNewPatientGender(e.target.value as any)}
                    className="text-xs p-2 bg-white border border-slate-300 rounded-lg outline-teal-600"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">Relation:</span>
                    <select
                      value={newPatientRelation}
                      onChange={(e) => setNewPatientRelation(e.target.value as any)}
                      className="text-xs p-1.5 bg-white border border-slate-300 rounded-lg outline-teal-600"
                    >
                      <option value="Self">Self</option>
                      <option value="Spouse">Spouse</option>
                      <option value="Father">Father</option>
                      <option value="Mother">Mother</option>
                      <option value="Child">Child</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="bg-teal-600 text-white font-bold px-3 py-1.5 rounded-lg text-xs hover:bg-teal-700"
                  >
                    Save & Select Patient
                  </button>
                </div>
              </form>
            ) : null}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {savedPatients.map((patient) => (
                <div
                  key={patient.id}
                  onClick={() => setSelectedPatientId(patient.id)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer flex items-center justify-between transition-all ${
                    selectedPatientId === patient.id
                      ? 'border-teal-600 bg-teal-50/60 font-semibold text-teal-950 ring-1 ring-teal-500/30'
                      : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <User className="w-4 h-4 text-teal-600" />
                    <div>
                      <p className="font-bold text-slate-900">{patient.name}</p>
                      <p className="text-[11px] text-slate-500">
                        {patient.relation} • {patient.gender}, {patient.age} yrs
                      </p>
                    </div>
                  </div>
                  {selectedPatientId === patient.id && (
                    <CheckCircle2 className="w-4 h-4 text-teal-600" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Address (If Home Collection) */}
          {collectionType === 'home' && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  3. Sample Pickup Address
                </label>
                <button
                  type="button"
                  onClick={() => setShowAddAddress(!showAddAddress)}
                  className="text-xs text-teal-600 font-bold hover:text-teal-700 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  {showAddAddress ? 'Cancel' : 'Add New Address'}
                </button>
              </div>

              {showAddAddress && (
                <form onSubmit={handleAddNewAddress} className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-3 space-y-2">
                  <input
                    type="text"
                    required
                    placeholder="House / Flat No., Apartment / Building Name"
                    value={newStreet}
                    onChange={(e) => setNewStreet(e.target.value)}
                    className="w-full text-xs p-2 bg-white border border-slate-300 rounded-lg outline-teal-600"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      placeholder="Area / Locality"
                      value={newArea}
                      onChange={(e) => setNewArea(e.target.value)}
                      className="text-xs p-2 bg-white border border-slate-300 rounded-lg outline-teal-600"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Pincode"
                      value={newPincode}
                      onChange={(e) => setNewPincode(e.target.value)}
                      className="text-xs p-2 bg-white border border-slate-300 rounded-lg outline-teal-600"
                    />
                  </div>
                  <div className="flex justify-end pt-1">
                    <button
                      type="submit"
                      className="bg-teal-600 text-white font-bold px-3 py-1.5 rounded-lg text-xs hover:bg-teal-700"
                    >
                      Save Address
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-2">
                {savedAddresses.map((addr) => (
                  <div
                    key={addr.id}
                    onClick={() => setSelectedAddressId(addr.id)}
                    className={`p-3 rounded-xl border text-xs cursor-pointer flex items-center justify-between transition-all ${
                      selectedAddressId === addr.id
                        ? 'border-teal-600 bg-teal-50/60 ring-1 ring-teal-500/30'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">{addr.label}</span>
                          <span className="text-[10px] text-teal-700 bg-teal-100 font-semibold px-1.5 py-0.2 rounded">
                            {addr.pincode}
                          </span>
                        </div>
                        <p className="text-slate-600 text-[11px] mt-0.5">
                          {addr.street}, {addr.area}, {addr.city}
                        </p>
                      </div>
                    </div>
                    {selectedAddressId === addr.id && (
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Date & Express Slot Picker */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              4. Date & 30-Min Fasting Time Slot
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
              {[
                { label: 'Today (Express)', date: '2026-09-28' },
                { label: 'Tomorrow', date: '2026-09-29' },
                { label: 'Wednesday', date: '2026-09-30' }
              ].map((d) => (
                <button
                  key={d.date}
                  type="button"
                  onClick={() => setAppointmentDate(d.date)}
                  className={`p-2.5 rounded-lg border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    appointmentDate === d.date
                      ? 'bg-teal-700 text-white border-teal-700'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  {d.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-36 overflow-y-auto p-1">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setTimeSlot(slot)}
                  className={`p-2 rounded-lg border text-left text-xs transition-all flex items-center justify-between ${
                    timeSlot === slot
                      ? 'border-teal-600 bg-teal-50 text-teal-950 font-bold ring-1 ring-teal-500/30'
                      : 'border-slate-200 text-slate-700 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span className="truncate">{slot}</span>
                  </div>
                  {timeSlot === slot && <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />}
                </button>
              ))}
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              5. Select Payment Mode
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                {
                  id: 'UPI (GPay / PhonePe)',
                  icon: Smartphone,
                  label: 'UPI Instant',
                  sub: 'GPay, PhonePe, Paytm'
                },
                {
                  id: 'Bank Transfer (NEFT / IMPS)',
                  icon: Landmark,
                  label: 'Bank Transfer',
                  sub: 'NEFT / IMPS / RTGS'
                },
                {
                  id: 'Credit / Debit Card',
                  icon: CreditCard,
                  label: 'Cards / NetBanking',
                  sub: 'Zero fee transaction'
                },
                {
                  id: 'Cash on Sample Collection',
                  icon: Banknote,
                  label: 'Pay at Pickup',
                  sub: 'Cash or QR on collection'
                }
              ].map((m) => {
                const Icon = m.icon;
                const isSelected = paymentMethod === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPaymentMethod(m.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-teal-600 bg-teal-50/70 ring-1 ring-teal-500/30 font-semibold'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <Icon className={`w-4 h-4 mb-1.5 ${isSelected ? 'text-teal-600' : 'text-slate-500'}`} />
                    <p className="text-xs font-bold text-slate-900">{m.label}</p>
                    <p className="text-[10px] text-slate-500">{m.sub}</p>
                  </button>
                );
              })}
            </div>

            {/* UPI Payment Instructions & QR */}
            {paymentMethod === 'UPI (GPay / PhonePe)' && (
              <div className="mt-3 p-3.5 bg-teal-50/90 rounded-2xl border border-teal-300 text-xs space-y-3 shadow-xs">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-teal-700" />
                    <span className="font-bold text-teal-950">Official Verified Merchant UPI (Instant Zero Fee)</span>
                  </div>
                  <span className="bg-teal-200/80 text-teal-900 text-[10px] font-black px-2 py-0.5 rounded-full">
                    GPay • PhonePe • Paytm • BHIM
                  </span>
                </div>

                {/* QR Code and Payment Details Layout */}
                <div className="bg-white p-3.5 rounded-2xl border border-teal-200 grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                  
                  {/* Dynamic Visual QR Code */}
                  <div className="flex flex-col items-center justify-center p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                    <div className="w-28 h-28 bg-white p-1.5 rounded-xl border-2 border-teal-600 shadow-sm flex flex-col items-center justify-center relative group">
                      {/* Stylized high-res SVG QR Representation with UPI branding */}
                      <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900">
                        {/* QR Matrix Corner Anchors */}
                        <rect x="5" y="5" width="26" height="26" rx="4" fill="currentColor" />
                        <rect x="9" y="9" width="18" height="18" rx="2" fill="#fff" />
                        <rect x="13" y="13" width="10" height="10" fill="#0d9488" />

                        <rect x="69" y="5" width="26" height="26" rx="4" fill="currentColor" />
                        <rect x="73" y="9" width="18" height="18" rx="2" fill="#fff" />
                        <rect x="77" y="13" width="10" height="10" fill="#0d9488" />

                        <rect x="5" y="69" width="26" height="26" rx="4" fill="currentColor" />
                        <rect x="9" y="73" width="18" height="18" rx="2" fill="#fff" />
                        <rect x="13" y="77" width="10" height="10" fill="#0d9488" />

                        {/* QR Data Pattern Dots */}
                        <circle cx="42" cy="15" r="3" fill="currentColor" />
                        <circle cx="56" cy="15" r="3" fill="currentColor" />
                        <circle cx="48" cy="28" r="3" fill="currentColor" />
                        <circle cx="42" cy="42" r="3.5" fill="#0d9488" />
                        <circle cx="58" cy="42" r="3.5" fill="#0d9488" />
                        <circle cx="20" cy="48" r="3" fill="currentColor" />
                        <circle cx="80" cy="48" r="3" fill="currentColor" />
                        <circle cx="42" cy="58" r="3" fill="currentColor" />
                        <circle cx="58" cy="58" r="3" fill="currentColor" />
                        <circle cx="48" cy="72" r="3.5" fill="#0d9488" />
                        <circle cx="42" cy="85" r="3" fill="currentColor" />
                        <circle cx="56" cy="85" r="3" fill="currentColor" />
                        <circle cx="78" cy="78" r="4" fill="currentColor" />
                        <circle cx="85" cy="65" r="3" fill="currentColor" />
                      </svg>
                      {/* Center UPI Badge */}
                      <span className="absolute bg-teal-700 text-white text-[8px] font-black px-1.5 py-0.5 rounded shadow-xs uppercase">
                        UPI ₹{finalAmount}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-bold mt-1.5">Scan to Pay ₹{finalAmount}</span>
                  </div>

                  {/* Details & Actions */}
                  <div className="sm:col-span-2 space-y-2.5">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-extrabold block">Official UPI Handle / VPA:</span>
                      <div className="flex items-center justify-between gap-2 bg-slate-50 p-2 rounded-xl border border-teal-200 mt-0.5">
                        <span className="font-mono font-black text-sm text-teal-950">
                          {companyDetails?.upiVpa || 'labexpress@okhdfcbank'}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(companyDetails?.upiVpa || 'labexpress@okhdfcbank');
                            setCopiedUpi(true);
                            setTimeout(() => setCopiedUpi(false), 2500);
                          }}
                          className="px-2.5 py-1 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                        >
                          {copiedUpi ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedUpi ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={`upi://pay?pa=${encodeURIComponent(companyDetails?.upiVpa || 'labexpress@okhdfcbank')}&pn=${encodeURIComponent(companyDetails?.companyName || 'LabExpress Healthcare')}&am=${finalAmount}&cu=INR&tn=LabExpress%20Diagnostic`}
                        className="flex-1 py-1.5 px-3 bg-teal-800 hover:bg-teal-900 text-white text-center rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Open in UPI App (Pay ₹{finalAmount})</span>
                      </a>
                    </div>
                  </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      UPI UTR / Reference No. (Optional):
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 426891002345 (12-digit UTR)"
                      value={paymentUtrNumber}
                      onChange={(e) => setPaymentUtrNumber(e.target.value)}
                      className="w-full p-2 bg-white border border-slate-300 rounded-xl text-xs font-mono outline-teal-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Attach Payment Screenshot (Optional):
                    </label>
                    <label className="flex items-center gap-2 p-2 bg-white border border-dashed border-teal-400 rounded-xl cursor-pointer hover:bg-teal-50/50 transition-colors">
                      <Upload className="w-4 h-4 text-teal-600 shrink-0" />
                      <span className="text-[11px] text-slate-600 truncate">
                        {receiptFileName || 'Upload Receipt / Screenshot'}
                      </span>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={handleReceiptUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {paymentReceiptUrl && (
                  <div className="p-2 bg-emerald-100/70 border border-emerald-300 rounded-xl flex items-center justify-between text-[11px] text-emerald-900 font-medium">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                      Payment receipt attached: <strong>{receiptFileName}</strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setPaymentReceiptUrl(null);
                        setReceiptFileName(null);
                      }}
                      className="text-red-600 hover:text-red-800 text-[10px] font-bold cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Bank Transfer (NEFT / IMPS) Details */}
            {paymentMethod === 'Bank Transfer (NEFT / IMPS)' && (
              <div className="mt-3 p-3.5 bg-indigo-50/90 rounded-2xl border border-indigo-300 text-xs space-y-3 shadow-xs">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Landmark className="w-4 h-4 text-indigo-700" />
                    <span className="font-bold text-indigo-950">Official Corporate Current Account (NEFT / IMPS / RTGS)</span>
                  </div>
                  <span className="bg-indigo-200/80 text-indigo-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Direct Bank Transfer
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-white p-3.5 rounded-2xl border border-indigo-200 text-[11px]">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Beneficiary / Account Name</span>
                    <span className="font-bold text-slate-900">{companyDetails?.bankAccountName || 'LabExpress Healthcare Private Limited'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Bank & Branch</span>
                    <span className="font-bold text-slate-900">{companyDetails?.bankName || 'HDFC Bank Ltd'}, Tonk Road, Jaipur</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Account Number</span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="font-mono font-black text-indigo-950 text-xs">{companyDetails?.bankAccountNo || '50200088921456'}</span>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(companyDetails?.bankAccountNo || '50200088921456');
                          setCopiedBankAcc(true);
                          setTimeout(() => setCopiedBankAcc(false), 2500);
                        }}
                        className="text-indigo-600 hover:text-indigo-800 text-[10px] font-bold bg-indigo-50 px-1.5 py-0.5 rounded cursor-pointer"
                      >
                        {copiedBankAcc ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">IFSC Code</span>
                    <span className="font-mono font-black text-indigo-950 text-xs">{companyDetails?.bankIfscCode || 'HDFC0000123'}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Bank UTR / IMPS Reference Number *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter 12 or 16-digit UTR number"
                      value={paymentUtrNumber}
                      onChange={(e) => setPaymentUtrNumber(e.target.value)}
                      className="w-full p-2 bg-white border border-slate-300 rounded-xl text-xs font-mono font-bold outline-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Upload Bank Transfer Receipt:
                    </label>
                    <label className="flex items-center gap-2 p-2 bg-white border border-dashed border-indigo-400 rounded-xl cursor-pointer hover:bg-indigo-50/50 transition-colors">
                      <Upload className="w-4 h-4 text-indigo-600 shrink-0" />
                      <span className="text-[11px] text-slate-600 truncate">
                        {receiptFileName || 'Upload Receipt / PDF / Image'}
                      </span>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={handleReceiptUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {paymentReceiptUrl && (
                  <div className="p-2 bg-indigo-100/70 border border-indigo-300 rounded-xl flex items-center justify-between text-[11px] text-indigo-900 font-medium">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-indigo-700 shrink-0" />
                      Bank transfer receipt attached: <strong>{receiptFileName}</strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setPaymentReceiptUrl(null);
                        setReceiptFileName(null);
                      }}
                      className="text-red-600 hover:text-red-800 text-[10px] font-bold cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* WhatsApp Instant Notification Alert */}
          <div className="p-3.5 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-300 shadow-xs space-y-2">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
              </div>
              <div className="flex-1 text-xs">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <h4 className="font-bold text-emerald-950 flex items-center gap-1.5">
                    <span>Confirmed Hone Par WhatsApp Notification</span>
                    <span className="bg-emerald-200/80 text-emerald-900 text-[10px] font-black px-1.5 py-0.5 rounded">
                      24x7 Active
                    </span>
                  </h4>
                  <span className="text-[11px] font-mono font-bold text-emerald-800">
                    {OFFICIAL_WHATSAPP_DISPLAY}
                  </span>
                </div>
                <p className="text-emerald-800 text-[11px] mt-1 leading-relaxed">
                  Booking confirm hote hi turant aapke WhatsApp aur official diagnostic desk <strong>({OFFICIAL_WHATSAPP_DISPLAY})</strong> par automated booking confirmation slip, phlebotomist tracking link aur barcode details bhej di jayengi.
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-white/80 border border-emerald-300 px-2 py-0.5 rounded-md">
                    <BellRing className="w-3 h-3 text-emerald-600" />
                    Instant Dispatch Enabled
                  </span>
                  <a
                    href={`https://wa.me/91${OFFICIAL_WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello LabExpress, I am booking a diagnostic test. Please keep me updated.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] text-teal-700 hover:text-teal-900 underline font-semibold cursor-pointer"
                  >
                    Test WhatsApp Contact
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
            <div className="flex justify-between text-slate-600">
              <span>Tests Price Total</span>
              <span>₹{totalAmount}</span>
            </div>
            <div className="flex justify-between text-emerald-600 font-medium">
              <span>LabExpress Health Discount</span>
              <span>- ₹{discountAmount}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Doorstep Cold-Chain Pickup</span>
              <span className="text-emerald-700 font-bold">FREE</span>
            </div>
            <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline font-bold text-slate-900 text-sm">
              <span>Final Total Payable</span>
              <span className="text-xl text-teal-700">₹{finalAmount}</span>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-800"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleConfirmBooking}
            className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-6 py-3 rounded-xl text-xs shadow-lg shadow-teal-600/20 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Assigning Nearest Fleet...
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                Confirm & Book (₹{finalAmount})
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
