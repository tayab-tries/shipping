import React from 'react';
import { ArrowRight, Calculator } from 'lucide-react';
import { Container } from '@/components/ui/Container';

export const QuickQuoteTeaser: React.FC = () => {
  return (
    <section className="w-full bg-brand-navy border-b border-border-dark py-8">
      <Container>
        <div className="bg-brand-black-deep border border-border-dark rounded-md p-6 lg:p-8 text-slate-200">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-accent uppercase tracking-wider mb-1">
                <Calculator className="w-4 h-4 text-accent" />
                <span>Quick Quote Request</span>
              </div>
              <h2 className="text-heading-md text-white font-bold">
                Request a Shipping Quote Based on Your Cargo and Destination
              </h2>
            </div>
            <p className="text-body-sm text-slate-400 max-w-md">
              Select your origin city in Pakistan and destination country to prefill your detailed quote request.
            </p>
          </div>

          {/* Native HTML GET Form — 100% Server Rendered */}
          <form action="/quote" method="GET" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            {/* Origin City */}
            <div>
              <label htmlFor="origin-select" className="block text-xs font-mono font-semibold text-slate-300 mb-1.5">
                Origin City (Pakistan)
              </label>
              <select
                id="origin-select"
                name="origin"
                className="w-full bg-brand-navy text-slate-100 text-sm font-normal rounded-md border border-border-dark px-3.5 py-2.5 appearance-none focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="lahore">Lahore</option>
                <option value="karachi">Karachi</option>
                <option value="islamabad">Islamabad</option>
                <option value="rawalpindi">Rawalpindi</option>
                <option value="faisalabad">Faisalabad</option>
                <option value="sialkot">Sialkot</option>
                <option value="multan">Multan</option>
                <option value="peshawar">Peshawar</option>
              </select>
            </div>

            {/* Destination Country */}
            <div>
              <label htmlFor="dest-select" className="block text-xs font-mono font-semibold text-slate-300 mb-1.5">
                Destination Country
              </label>
              <select
                id="dest-select"
                name="destination"
                className="w-full bg-brand-navy text-slate-100 text-sm font-normal rounded-md border border-border-dark px-3.5 py-2.5 appearance-none focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="uk">United Kingdom</option>
                <option value="uae">United Arab Emirates</option>
                <option value="usa">United States</option>
                <option value="canada">Canada</option>
                <option value="ksa">Saudi Arabia</option>
              </select>
            </div>

            {/* Cargo Type */}
            <div>
              <label htmlFor="cargo-select" className="block text-xs font-mono font-semibold text-slate-300 mb-1.5">
                Cargo Type
              </label>
              <select
                id="cargo-select"
                name="cargo"
                className="w-full bg-brand-navy text-slate-100 text-sm font-normal rounded-md border border-border-dark px-3.5 py-2.5 appearance-none focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="air_freight">Air Freight</option>
                <option value="sea_cargo">Sea Cargo</option>
                <option value="door_to_door">Door-to-Door</option>
              </select>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full h-10 px-4 py-2.5 bg-accent text-brand-black hover:bg-accent-hover font-bold text-sm rounded-md transition-colors inline-flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring"
              >
                <span>Continue to Quote</span>
                <ArrowRight className="w-4 h-4 text-brand-black" />
              </button>
            </div>
          </form>
        </div>
      </Container>
    </section>
  );
};
