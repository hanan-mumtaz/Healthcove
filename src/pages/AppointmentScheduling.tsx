import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, Mail, MapPin, Check, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import ParticleBackground from '../components/ParticleBackground';

interface AppointmentSlot {
  id: string;
  date: Date;
  time: string;
  available: boolean;
  duration: number; // minutes
}

interface BookingData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  reason: string;
  notes: string;
}

const AVAILABLE_TIMES = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'];
const CONSULTATION_TYPES = [
  { id: 'initial', label: 'Initial Consultation', duration: 60 },
  { id: 'followup', label: 'Follow-up Session', duration: 45 },
  { id: 'meal-planning', label: 'Meal Planning Session', duration: 90 },
  { id: 'pcos', label: 'PCOS Management', duration: 60 },
  { id: 'pregnancy', label: 'Pregnancy Nutrition', duration: 60 },
];

const CalendarView: React.FC<{ selectedDate: string; onSelectDate: (date: string) => void; }> = ({ selectedDate, onSelectDate }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Optimized Calendar Array Generation (Less Lines)
  const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const days = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

  const changeMonth = (offset: number) => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset));

  const isDateAvailable = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return date > new Date() && date.getDay() !== 0 && date.getDay() !== 6; // No Sundays or Saturdays
  };

  return (
    <div className="bg-white/75 backdrop-blur-md rounded-2xl border border-white/40 p-6">
      {/* Month Header */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-emerald-100 rounded-lg transition-colors">
          <ChevronLeft className="w-5 h-5 text-Mg" />
        </button>
        <h3 className="text-xl font-bold text-Dg">
          {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h3>
        <button onClick={() => changeMonth(1)} className="p-2 hover:bg-emerald-100 rounded-lg transition-colors">
          <ChevronRight className="w-5 h-5 text-Mg" />
        </button>
      </div>

      {/* Day Labels */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center text-xs font-bold text-slate-500 uppercase py-2">{day}</div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, idx) => {
          if (!day) return <div key={`empty-${idx}`} />;

          const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const isAvailable = isDateAvailable(day);
          const isSelected = selectedDate === dateStr;

          return (
            <button
              key={day}
              onClick={() => isAvailable && onSelectDate(dateStr)}
              disabled={!isAvailable}
              className={`p-2 rounded-lg text-sm font-semibold transition-all ${
                isSelected ? 'bg-Mg text-white shadow-lg scale-105'
                  : isAvailable ? 'bg-emerald-100 text-Dg hover:bg-Mg hover:text-white'
                  : 'text-slate-300 bg-slate-100 cursor-not-allowed'
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const TimeSlots: React.FC<{ selectedTime: string; onSelectTime: (time: string) => void; }> = ({ selectedTime, onSelectTime }) => (
  <div className="bg-white/75 backdrop-blur-md rounded-2xl border border-white/40 p-6">
    <h3 className="text-lg font-bold text-Dg mb-4 flex items-center gap-2">
      <Clock className="w-5 h-5 text-Mg" /> Select Time Slot
    </h3>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {AVAILABLE_TIMES.map((time) => (
        <button
          key={time}
          onClick={() => onSelectTime(time)}
          className={`py-3 rounded-lg font-semibold transition-all ${
            selectedTime === time ? 'bg-Mg text-white shadow-lg scale-105' : 'bg-emerald-100 text-Dg hover:bg-Mg hover:text-white'
          }`}
        >
          {time}
        </button>
      ))}
    </div>
  </div>
);

export default function AppointmentScheduling() {
  const [step, setStep] = useState<'type' | 'calendar' | 'details' | 'confirmation'>('type');
  const [booking, setBooking] = useState<Partial<BookingData>>({
    name: '', email: '', phone: '', date: '', time: '', reason: 'initial', notes: '',
  });

  const handleBookingSubmit = () => {
    if (!booking.name || !booking.email || !booking.phone || !booking.date || !booking.time) {
      alert('Please fill in all required fields');
      return;
    }
    setStep('confirmation');
  };

  const updateBooking = (field: keyof BookingData, value: string) => setBooking((b) => ({ ...b, [field]: value }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-indigo-50 relative overflow-hidden pt-16">
      <div className="animated-background" />
      <ParticleBackground />
      <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12 flex flex-col items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Book a <span className="text-Mg bg-gradient-to-r from-Mg to-Lg bg-clip-text text-transparent">Consultation</span>
            </h1>
            <p className="text-lg text-Dg opacity-90 max-w-2xl mx-auto text-center">
              Empowering Pakistani Women Through Nutrition. Currently accepting limited clients — book your slot now.
            </p>
            <div className="mt-6 bg-white/50 backdrop-blur-sm border border-Mg/20 p-3 rounded-xl flex items-center justify-center gap-2 text-sm text-Mg font-bold italic shadow-sm w-fit mx-auto">
              <AlertCircle className="w-4 h-4" />
              <span>"Currently accepting limited clients — book your slot now"</span>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="mb-10 max-w-4xl mx-auto w-full px-4">
            <div className="flex items-start justify-between w-full">
              {['type', 'calendar', 'details', 'confirmation'].map((stepKey, idx) => {
                const stepLabels = ['Type', 'Calendar', 'Details', 'Confirm'];
                const stepOrder = { type: 0, calendar: 1, details: 2, confirmation: 3 };
                const currentStepIdx = stepOrder[step as keyof typeof stepOrder];
                const isCompleted = idx < currentStepIdx;
                const isActive = idx === currentStepIdx;
                
                return (
                  <React.Fragment key={stepKey}>
                    <div className="flex flex-col items-center relative z-10 w-20">
                      <div
                        onClick={() => idx <= currentStepIdx && setStep(stepKey as typeof step)}
                        className={`w-14 h-14 rounded-full flex items-center justify-center font-bold transition-all duration-300 shadow-lg cursor-pointer ${
                          isActive ? 'bg-gradient-to-br from-Mg to-Lg text-white scale-110 ring-4 ring-Mg/30'
                            : isCompleted ? 'bg-Mg text-white hover:bg-Lg hover:scale-105' : 'bg-slate-200 text-slate-500'
                        }`}
                      >
                        {isCompleted ? <Check className="w-6 h-6" /> : <span className="text-lg">{idx + 1}</span>}
                      </div>
                      <span className={`text-xs font-bold mt-3 text-center transition-colors duration-300 ${isActive || isCompleted ? 'text-Mg' : 'text-slate-400'}`}>
                        {stepLabels[idx]}
                      </span>
                    </div>
                    {idx < 3 && <div className={`flex-1 h-1 mt-7 mx-2 rounded transition-all duration-300 ${isCompleted || isActive ? 'bg-Mg' : 'bg-slate-200'}`} />}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Step 1: Consultation Type */}
          {step === 'type' && (
            <div className="space-y-6">
              <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/40 border-l-4 border-l-Mg">
                <div className="flex flex-col items-center justify-center gap-3 mb-8 cursor-default">
                  <div className="px-4 py-1 bg-gradient-to-r from-Mg to-Lg text-white text-sm font-bold rounded-full shadow-md">Step 1</div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-Dg text-center">Select Consultation Type</h2>
                </div>

                <div className="space-y-3">
                  {CONSULTATION_TYPES.map((type) => {
                    const isSelected = booking.reason === type.id;
                    return (
                      <button
                        key={type.id}
                        onClick={() => { updateBooking('reason', type.id); setStep('calendar'); }}
                        className={`w-full p-4 bg-white border-2 rounded-xl transition-all text-left group ${
                          isSelected ? 'border-Mg bg-Mg/5' : 'border-emerald-200 hover:border-Mg hover:bg-Mg/5'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className={`font-bold transition-colors ${isSelected ? 'text-Mg' : 'text-Dg group-hover:text-Mg'}`}>{type.label}</h3>
                            <p className="text-sm text-slate-600">{type.duration} minutes</p>
                          </div>
                          {/* Visual Indicator for Saved Selection */}
                          <div className={`w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center ${
                            isSelected ? 'border-Mg bg-Mg text-white' : 'border-emerald-300 group-hover:border-Mg group-hover:bg-Mg group-hover:text-white'
                          }`}>
                            {isSelected && <Check className="w-4 h-4" />}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Calendar */}
          {step === 'calendar' && (
            <div className="space-y-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/40 border-l-4 border-l-Mg">
              <div className="flex flex-col items-center justify-center gap-3 mb-8 cursor-default">
                <div className="px-4 py-1 bg-gradient-to-r from-Mg to-Lg text-white text-sm font-bold rounded-full shadow-md">Step 2</div>
                <h2 className="text-2xl sm:text-3xl font-bold text-Dg text-center">Select Date & Time</h2>
              </div>

              <CalendarView selectedDate={booking.date || ''} onSelectDate={(date) => updateBooking('date', date)} />
              <TimeSlots selectedTime={booking.time || ''} onSelectTime={(time) => updateBooking('time', time)} />
              
              <div className="flex gap-4 justify-end pt-4 border-t border-white/40">
                <button onClick={() => setStep('type')} className="px-8 py-3 bg-white border-2 border-Mg text-Mg font-bold rounded-xl hover:bg-Mg/5 transition-all">Back</button>
                <button onClick={() => setStep('details')} disabled={!booking.date || !booking.time} className="px-8 py-3 bg-gradient-to-r from-Mg to-Lg text-white font-bold rounded-xl hover:shadow-lg disabled:opacity-50 transition-all">Continue</button>
              </div>
            </div>
          )}

          {/* Step 3: Contact Details */}
          {step === 'details' && (
            <div className="space-y-6">
              <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/40 border-l-4 border-l-Mg">
                <div className="flex flex-col items-center justify-center gap-3 mb-8 cursor-default">
                  <div className="px-4 py-1 bg-gradient-to-r from-Mg to-Lg text-white text-sm font-bold rounded-full shadow-md">Step 3</div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-Dg text-center">Your Information</h2>
                </div>

                <form className="space-y-5">
                  {[
                    { label: 'Full Name *', icon: User, type: 'text', field: 'name', placeholder: 'Your full name' },
                    { label: 'Email Address *', icon: Mail, type: 'email', field: 'email', placeholder: 'your.email@example.com' },
                    { label: 'Phone Number *', icon: Phone, type: 'tel', field: 'phone', placeholder: '+92 XXX XXXXXXX' }
                  ].map(({ label, icon: Icon, type, field, placeholder }) => (
                    <div key={field}>
                      <label className="block text-sm font-bold text-Dg mb-2 flex items-center gap-2">
                        <Icon className="w-4 h-4 text-Mg" /> {label}
                      </label>
                      <input
                        type={type}
                        value={booking[field as keyof BookingData] || ''}
                        onChange={(e) => updateBooking(field as keyof BookingData, e.target.value)}
                        className="w-full px-4 py-3 border border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-Mg/50"
                        placeholder={placeholder}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-sm font-bold text-Dg mb-2">Additional Notes</label>
                    <textarea
                      value={booking.notes || ''}
                      onChange={(e) => updateBooking('notes', e.target.value)}
                      className="w-full px-4 py-3 border border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-Mg/50"
                      placeholder="Any health concerns or dietary restrictions we should know about?"
                      rows={4}
                    />
                  </div>
                </form>

                <div className="flex gap-4 justify-end mt-8">
                  <button onClick={() => setStep('calendar')} className="px-8 py-3 bg-white border-2 border-Mg text-Mg font-bold rounded-xl hover:bg-Mg/5 transition-all">Back</button>
                  <button onClick={handleBookingSubmit} className="px-8 py-3 bg-gradient-to-r from-Mg to-Lg text-white font-bold rounded-xl hover:shadow-lg transition-all">Confirm Booking</button>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {step === 'confirmation' && (
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-12 border border-white/40 border-l-4 border-l-Mg text-center">
              <div className="flex flex-col items-center justify-center gap-3 mb-8 cursor-default">
                <div className="px-4 py-1 bg-gradient-to-r from-Mg to-Lg text-white text-sm font-bold rounded-full shadow-md">Step 4</div>
                <h2 className="text-2xl sm:text-3xl font-bold text-Dg text-center">Booking Confirmed! 🎉</h2>
              </div>

              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 bg-gradient-to-br from-Mg to-Lg rounded-full flex items-center justify-center animate-bounce">
                  <Check className="w-8 h-8 text-white" />
                </div>
              </div>
              <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
                Thank you for booking your consultation. We've sent a confirmation email to <strong>{booking.email}</strong> with all the details.
              </p>

              <div className="bg-emerald-50 rounded-2xl p-6 mb-8 space-y-3 text-left max-w-md mx-auto border border-emerald-100">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-Mg" />
                  <div><p className="text-sm text-slate-600">Date</p><p className="font-bold text-Dg">{booking.date}</p></div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-Mg" />
                  <div><p className="text-sm text-slate-600">Time</p><p className="font-bold text-Dg">{booking.time}</p></div>
                </div>
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-Mg" />
                  <div><p className="text-sm text-slate-600">With</p><p className="font-bold text-Dg">Areej Fatima</p></div>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm text-slate-600 mb-6">
                  Areej will reach out via WhatsApp before your appointment to confirm and discuss any specific concerns.
                </p>
                <button
                  onClick={() => {
                    setStep('type');
                    setBooking({ name: '', email: '', phone: '', date: '', time: '', reason: 'initial', notes: '' });
                  }}
                  className="px-8 py-3 bg-gradient-to-r from-Mg to-Lg text-white font-bold rounded-xl hover:shadow-lg transition-all"
                >
                  Back to Home
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}