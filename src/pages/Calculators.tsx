import React, { useState, useMemo, memo, useCallback } from "react";
import { Calculator, Activity, Weight, Info, RefreshCw } from "lucide-react";
import ParticleBackground from "../components/ParticleBackground";

/* ───────── CALCULATOR LOGIC COMPONENTS ───────── */

const Calculators = () => {
  const [weight, setWeight] = useState<string>("");
  const [heightCm, setHeightCm] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [activity, setActivity] = useState<number>(1.2);
  const [result, setResult] = useState<{ bmi: number; ibw: number; tdee: number } | null>(null);

  const calculate = useCallback(() => {
    const w = parseFloat(weight);
    const h = parseFloat(heightCm);
    const a = parseFloat(age);

    if (!w || !h || !a) {
      alert("Please enter all details correctly.");
      return;
    }

    const heightM = h / 100;
    const heightInches = h / 2.54;

    // 1. BMI
    const bmi = w / (heightM * heightM);

    // 2. IBW (Hamwi Formula for Women)
    let ibw = 45.5;
    if (heightInches > 60) {
      ibw += 2.2 * (heightInches - 60);
    }

    // 3. TDEE (Mifflin-St Jeor for Women)
    const bmr = 10 * w + 6.25 * h - 5 * a - 161;
    const tdee = bmr * activity;

    setResult({ bmi, ibw, tdee });
  }, [weight, heightCm, age, activity]);

  const reset = () => {
    setWeight("");
    setHeightCm("");
    setAge("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-indigo-50 relative pt-16">
      <div className="animated-background" />
      <ParticleBackground />

      <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Health <span className="text-Mg bg-gradient-to-r from-Mg to-Lg bg-clip-text text-transparent">Calculators</span>
          </h1>
          <p className="text-xl text-Dg opacity-90">
            Understand your body's unique needs with our science-backed tools.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* INPUT FORM */}
          <div className="bg-white/40 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/50 space-y-6">
            <h2 className="text-2xl font-bold text-Dg flex items-center gap-2">
              <Calculator className="w-6 h-6 text-Mg" /> Enter Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input 
                label="Weight (kg)" 
                placeholder="e.g. 65" 
                value={weight} 
                onChange={(e) => setWeight(e.target.value)} 
              />
              <Input 
                label="Height (cm)" 
                placeholder="e.g. 165" 
                value={heightCm} 
                onChange={(e) => setHeightCm(e.target.value)} 
              />
              <Input 
                label="Age" 
                placeholder="e.g. 28" 
                value={age} 
                onChange={(e) => setAge(e.target.value)} 
              />
              <div>
                <label className="block text-xs font-bold uppercase text-black-400 mb-2 ml-1">Activity Level</label>
                <select 
                  className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-100 focus:ring-2 focus:ring-Mg outline-none"
                  value={activity}
                  onChange={(e) => setActivity(parseFloat(e.target.value))}
                >
                  <option value={1.2}>Sedentary (No Exercise)</option>
                  <option value={1.375}>Lightly Active</option>
                  <option value={1.55}>Moderately Active</option>
                  <option value={1.725}>Very Active</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={calculate}
                className="flex-1 bg-gradient-to-r from-Mg to-Lg text-white py-4 rounded-2xl font-bold hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
              >
                Calculate Now
              </button>
              <button
                onClick={reset}
                className="p-4 bg-white/50 text-gray-700 rounded-2xl hover:bg-white hover:text-red-500 transition-all shadow-md"
              >
                <RefreshCw className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* RESULTS DISPLAY */}
<div className="space-y-6">
  {result ? (
    <div className="grid gap-6 animate-in fade-in slide-in-from-right-8 duration-500">
      <ResultCard 
        icon={Info} 
        title="Body Mass Index (BMI)" 
        value={result.bmi.toFixed(1)} 
        unit="" 
        subtitle={
          result.bmi < 18.5 ? "Status: Underweight" : 
          result.bmi < 25 ? "Status: Healthy Weight" : 
          result.bmi < 30 ? "Status: Overweight" : "Status: Obese"
        }
      />
      
      <ResultCard 
        icon={Weight} 
        title="Ideal Body Weight" 
        value={result.ibw.toFixed(1)} 
        unit="kg" 
        subtitle="Based on Clinical Hamwi Method"
      />
      
      <ResultCard 
        icon={Activity} 
        title="Daily Energy Needs (TDEE)" 
        value={Math.round(result.tdee).toString()} 
        unit="kcal" 
        subtitle="To maintain current weight"
      />
      
      <div className="bg-white/40 backdrop-blur-sm p-4 rounded-2xl border border-Mg/20 mt-2">
        <p className="text-[12px] text-Dg/70 italic leading-relaxed">
          <strong>Note:</strong> These are general clinical estimates. 
          Pregnancy, lactation, and PCOS significantly alter caloric needs. 
          Please book a session for a custom metabolic plan.
        </p>
      </div>
    </div>
  ) : (
              <div className="bg-white/20 border border-dashed border-gray-300 rounded-3xl p-20 text-center">
                <div className="bg-white/50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calculator className="w-10 h-10 text-Dg-300" />
                </div>
                <h3 className="text-xl font-bold text-black-400">Ready to calculate?</h3>
                <p className="text-Lg">Enter your metrics to reveal your health insights.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

/* ───────── SUB-COMPONENTS ───────── */

const Input = ({ label, placeholder, value, onChange }) => (
  <div>
    <label className="block text-xs font-bold uppercase tracking-wider text-black-400 mb-2 ml-1">{label}</label>
    <input
      type="number"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
className="w-full px-4 py-3 rounded-xl bg-white/70 backdrop-blur-md border border-white/40 text-slate-700 font-medium placeholder-slate-700 focus:ring-2 focus:ring-Mg focus:bg-white/95 transition-all duration-300 outline-none shadow-sm"    />
  </div>
);

const ResultCard = ({ icon: Icon, title, value, unit, subtitle }) => (
  <div className="group p-6 rounded-3xl bg-white/60 backdrop-blur-md border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
    <div className="flex items-center gap-6">
      {/* Icon with Areej's Theme Gradient */}
      <div className="bg-gradient-to-br from-Mg to-Lg p-4 rounded-2xl shadow-lg text-white transform group-hover:rotate-6 transition-transform">
        <Icon className="w-7 h-7" />
      </div>
      
      <div className="flex-1">
        <h4 className="text-xs font-bold uppercase tracking-widest text-black-400 mb-1">{title}</h4>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-black text-Dg">{value}</span>
          <span className="text-lg font-bold text-Mg">{unit}</span>
        </div>
        <p className="text-[10px] md:text-xs font-bold mt-1 text-Lg uppercase tracking-tight">
          {subtitle}
        </p>
      </div>
    </div>
  </div>
);

export default memo(Calculators);