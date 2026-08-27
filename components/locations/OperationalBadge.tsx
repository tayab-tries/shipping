import React from 'react';
import { MapPin, Truck, ShieldCheck } from 'lucide-react';
import { Container } from '@/components/ui/Container';

export interface OperationalBadgeProps {
  cityName: string;
  hasPhysicalBranch: boolean;
  branchAddress?: string;
  collectionAvailable: boolean;
  serviceAvailable: boolean;
}

export const OperationalBadge: React.FC<OperationalBadgeProps> = ({
  cityName,
  hasPhysicalBranch,
  branchAddress,
  collectionAvailable,
}) => {
  return (
    <section className="w-full bg-surface-subtle border-b border-border py-6">
      <Container>
        <div className="bg-surface p-4 rounded-md border border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-surface-muted rounded-md shrink-0">
              {hasPhysicalBranch ? (
                <MapPin className="w-5 h-5 text-secondary" />
              ) : (
                <Truck className="w-5 h-5 text-secondary" />
              )}
            </div>
            <div>
              <span className="text-xs font-mono font-semibold text-secondary uppercase tracking-wider block">
                {hasPhysicalBranch ? 'Verified Branch Office' : 'Service Coverage Area'}
              </span>
              <p className="text-body-sm font-semibold text-foreground">
                {hasPhysicalBranch && branchAddress
                  ? `Physical Branch Address: ${branchAddress}`
                  : collectionAvailable
                  ? `Cargo pickup and receiving dispatch available across ${cityName}.`
                  : `Cargo shipping coverage available for customers in ${cityName}.`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground shrink-0">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Verified Operational Area</span>
          </div>
        </div>
      </Container>
    </section>
  );
};
