export const TermsAndConditions = () => {
    const terms: string[] = [
      "Eligibility: You must be at least 18 years old or the age of majority in your jurisdiction to use this app. By registering, you represent and warrant that you meet this eligibility requirement.",
      "You are required to provide accurate and complete information during registration.",
      "You are solely responsible for maintaining the confidentiality of your account credentials. Stock trading involves significant risk. You may lose some or all of your investment.",
      "Past performance is not indicative of future results. You acknowledge and accept these risks before making any trades. You agree to pay any applicable fees, commissions, or charges associated with trades or account maintenance. Fees are subject to change, and we will notify you in advance of any changes.",
      "We collect and use your personal information in accordance with our Privacy Policy. By using this app, you consent to the collection, use, and disclosure of your information as described in the Privacy Policy.",
    ];

    const policy:string[] = ['']
  
    return (
      <div className="flex flex-col items-start gap-4 px-4 md:px-12 text-left w-full">
        <h1 className="text-xl md:text-3xl font-bold">Privacy Policy</h1>
        <div className="leading-relaxed space-y-4">
          {terms.map((term, index:number) => (
            <p key={index} className="text-sm md:text-base">
              {term}
            </p>
          ))}
        </div>
      </div>
    );
  };