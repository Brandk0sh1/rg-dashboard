"use client";

import { useState } from "react";

const periods = ["7 дней", "30 дней", "Квартал"] as const;

export function PeriodFilter() {
  const [selectedPeriod, setSelectedPeriod] = useState<(typeof periods)[number]>("30 дней");

  return (
    <div aria-label="Период отчёта" className="flex rounded-xl bg-slate-800 p-1" role="group">
      {periods.map((period) => (
        <button
          className={`rounded-lg px-3 py-2 text-sm font-medium transition ${selectedPeriod === period ? "bg-white text-slate-950 shadow-sm" : "text-slate-300 hover:text-white"}`}
          key={period}
          onClick={() => setSelectedPeriod(period)}
          type="button"
        >{period}</button>
      ))}
    </div>
  );
}
