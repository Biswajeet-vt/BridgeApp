import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const steps = [
  "Personal Information",
  "Background Details",
  "Nomination Details",
  "Agreement & Declaration",
];

const OnboardingForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [openAccordion, setOpenAccordion] = useState<string | null>('1A');
  const [gender, setGender] = useState("");
  const [citizenship, setCitizenship] = useState("");
  const [taxResidency, setTaxResidency] = useState("");
  const [country, setCountry] = useState("")
  const [state, setState] = useState("")
  const [investmentObjective,setInvestmentObjective] = useState('')
  const [investmentExperience,setInvestmentExperience] = useState('')
  const [riskTolerance,setRiskTolerance] = useState('')
  const [annualIncome,setAnnualIncome] = useState('')
  const [occupation,setOccupation] = useState('')
  const [dob, setDob] = useState<Date | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <div className="flex w-full h-screen font-sans">
      {/* Left Section with Illustration */}
      <div className="w-1/2 bg-teal-600 flex items-center justify-center">
        <div className="max-w-sm text-center text-white px-4">
          <img
            src="/illustration.png"
            alt="Illustration"
            className="mx-auto mb-4"
          />
          <div className="flex justify-center space-x-2 mt-8">
            <div className="w-2 h-2 rounded-full bg-white opacity-50"></div>
            <div className="w-2 h-2 rounded-full bg-white"></div>
            <div className="w-2 h-2 rounded-full bg-white opacity-50"></div>
          </div>
        </div>
      </div>

      {/* Right Section with Form */}
      <div className="w-1/2 p-10 bg-white relative">
        {/* Step Dots */}
        <div className="relative flex justify-between items-center mb-10">
          {/* Line behind the dots */}
          <div className="absolute top-1.5 left-0 w-full h-0.5 bg-gray-300 z-0" />

          {/* Dots */}
          {steps.map((label, idx) => (
            <div key={idx} className="flex flex-col items-center z-20">
              <div
                className={`w-3 h-3 rounded-full mb-1 ${idx <= currentStep ? "bg-teal-600" : "bg-gray-300"
                  }`}
              ></div>
              <span className={`text-xs text-center w-20 ${idx <= currentStep ? "text-black-500" : "text-gray-400"
                }`}>{label}</span>
            </div>
          ))}
        </div>

        {currentStep === 0 && (
          <div className="space-y-4">
            {/* Accordion 1 */}
            <div className={`${openAccordion === "1A" ? "" : "border border-gray-300"} rounded-lg`}>
              <button
                className="flex items-center justify-between w-full p-4 font-medium"
                onClick={() => toggleAccordion("1A")}
              >
                <span className="label">1A - Personal Information</span>
                <span className="text-sm border border-black border-[1.5px] rounded-[6px] px-1.5">{openAccordion === "1A" ? "-" : "+"}</span>
              </button>
              {openAccordion === "1A" && (
                <div className="p-4 grid grid-cols-3 gap-4">
                  <input type="text" placeholder="First Name *" className="input" />
                  <input type="text" placeholder="Middle Name" className="input" />
                  <input type="text" placeholder="Last Name *" className="input" />
                  <input type="text" placeholder="Father's Name *" className="input" />

                  <select
                    className={`input select ${gender === "" ? "font-normal text-gray-500" : "font-bold text-black"}`}
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="" disabled hidden>
                      Select Gender *
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>

                  <select
                    className={`input select ${citizenship === "" ? "font-normal text-gray-500" : "font-bold text-black"}`}
                    value={citizenship}
                    onChange={(e) => setCitizenship(e.target.value)}
                  >
                    <option value="" disabled hidden>
                      Select Citizenship *
                    </option>
                    <option value="Indian">Indian</option>
                    <option value="American">American</option>
                    <option value="Other">Other</option>
                  </select>

                  <select
                    className={`input select ${taxResidency === "" ? "font-normal text-gray-500" : "font-bold text-black"}`}
                    value={taxResidency}
                    onChange={(e) => setTaxResidency(e.target.value)}
                  >
                    <option value="" disabled hidden>
                      Select Tax Residency *
                    </option>
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                    <option value="Other">Other</option>
                  </select>

                  <DatePicker
                    selected={dob}
                    onChange={(date: Date | null) => setDob(date)}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="DOB (dd/mm/yyyy) *"
                    className="input w-full font-normal text-gray-700"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    maxDate={new Date()}
                    popperPlacement="bottom-start"
                  />
                </div>

              )}
            </div>

            {/* Accordion 2 */}
            <div className={`${openAccordion === "1B" ? "" : "border border-gray-300"} rounded-lg`}>
              <button
                className="flex items-center justify-between w-full p-4 font-medium"
                onClick={() => toggleAccordion("1B")}
              >
                <span className="label">1B - Your Address</span>
                <span className="text-sm border border-black border-[1.5px] rounded-[6px] px-1.5">{openAccordion === "1B" ? "-" : "+"}</span>
              </button>
              {openAccordion === "1B" && (
                <div className="p-4 grid grid-cols-3 gap-4">
                  <input type="text" placeholder="Pincode*" className="input" />
                  <select
                    className={`input select ${country === "" ? "font-normal text-gray-500" : "font-bold text-black"}`}
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    <option value="" disabled hidden>
                      Country*
                    </option>
                    <option value="Male">India</option>
                    <option value="Female">USA</option>
                  </select>
                  <select
                    className={`input select ${state === "" ? "font-normal text-gray-500" : "font-bold text-black"}`}
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  >
                    <option value="" disabled hidden>
                      State*
                    </option>
                    <option value="Male">Gujarat</option>
                    <option value="Female">Rajasthan</option>
                  </select>
                  <input type="text" placeholder="City*" className="input" />
                  <input type="text" placeholder="Address Line 1*" className="input" />
                  <input type="text" placeholder="Address Line 2" className="input" />



                </div>
              )}
            </div>

            {/* Accordion 3 */}
            <div className={`${openAccordion === "1C" ? "" : "border border-gray-300"} rounded-lg`}>
              <button
                className="flex items-center justify-between w-full p-4 font-medium"
                onClick={() => toggleAccordion("1C")}
              >
                <span className="label">1C - Other Details</span>
                <span className="text-sm border border-black border-[1.5px] rounded-[6px] px-1.5">{openAccordion === "1C" ? "-" : "+"}</span>
              </button>
              {openAccordion === "1C" && (
                <div className="p-4 grid grid-cols-3 gap-4">
                <select
                  className={`input select ${investmentObjective === "" ? "font-normal text-gray-500" : "font-bold text-black"}`}
                  value={investmentObjective}
                  onChange={(e) => setInvestmentObjective(e.target.value)}
                >
                  <option value="" disabled hidden>
                    Investment Objective
                  </option>
                  <option value="Male">1</option>
                  <option value="Female">2</option>
                </select>
                
                <select
                  className={`input select ${investmentExperience === "" ? "font-normal text-gray-500" : "font-bold text-black"}`}
                  value={investmentExperience}
                  onChange={(e) => setInvestmentExperience(e.target.value)}
                >
                  <option value="" disabled hidden>
                    Investment Experience
                  </option>
                  <option value="Male">1</option>
                  <option value="Female">2</option>
                </select>
                
                <select
                  className={`input select ${riskTolerance === "" ? "font-normal text-gray-500" : "font-bold text-black"}`}
                  value={riskTolerance}
                  onChange={(e) => setRiskTolerance(e.target.value)}
                >
                  <option value="" disabled hidden>
                    Risk Tolerance                  </option>
                  <option value="Male">1</option>
                  <option value="Female">2</option>
                </select>

                <select
                  className={`input select ${annualIncome === "" ? "font-normal text-gray-500" : "font-bold text-black"}`}
                  value={annualIncome}
                  onChange={(e) => setAnnualIncome(e.target.value)}
                >
                  <option value="" disabled hidden>
                    Annual Income                  </option>
                  <option value="Male">1</option>
                  <option value="Female">2</option>
                </select>

                <select
                  className={`input select ${occupation === "" ? "font-normal text-gray-500" : "font-bold text-black"}`}
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                >
                  <option value="" disabled hidden>
                    Occupation                 </option>
                  <option value="Male">1</option>
                  <option value="Female">2</option>
                </select>
              </div>
              )}
            </div>
          </div>
        )}

        {/* Continue Button */}
        <div className="absolute bottom-10 left-0 w-full px-10">
          <button
            onClick={() => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))}
            className="w-full bg-teal-600 text-white py-3 rounded-full font-semibold hover:bg-teal-700 transition"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingForm;
