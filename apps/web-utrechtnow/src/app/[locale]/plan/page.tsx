import { DayPlanner } from '@/components/day-planner';

export const metadata = {
  title: 'AI dagplanner — Utrecht Now',
};

export default function PlanPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <p className="text-terracotta-600 uppercase text-xs tracking-wide mb-2">AI dagplanner</p>
      <h1 className="font-serif text-4xl text-canal-900 mb-3">Stel je ideale dag samen</h1>
      <p className="text-canal-700 mb-8 max-w-2xl">
        Vertel ons wat je wilt — actief of relaxed, met kinderen, foodie, kunstliefhebber, sportief.
        Onze AI bouwt een persoonlijk dagprogramma met échte Utrechtse leveranciers, direct boekbaar.
      </p>
      <DayPlanner />
    </div>
  );
}
