import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

const FALLBACK_RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  INR: 83.5,
  JPY: 157,
  CAD: 1.37,
  AUD: 1.52,
  SGD: 1.35,
  BRL: 5.05,
  CHF: 0.88,
};

export function useCurrencyRates() {
  const [rates, setRates] = useState(FALLBACK_RATES);

  useEffect(() => {
    let active = true;

    const loadRates = async () => {
      const { data, error } = await supabase.functions.invoke('currency-rates', {
        body: { base: 'USD' },
      });

      if (!active || error || !data || typeof data.rates !== 'object' || data.rates === null) {
        return;
      }

      const validRates = Object.entries(data.rates).every(
        ([currency, rate]) => typeof currency === 'string' && typeof rate === 'number' && Number.isFinite(rate) && rate > 0,
      );
      if (validRates) {
        setRates(data.rates as Record<string, number>);
      }
    };

    void loadRates();
    return () => {
      active = false;
    };
  }, []);

  return rates;
}
