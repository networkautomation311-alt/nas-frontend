// components/StatsCard.jsx
export default function StatsCard({ title, value }) {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md w-full max-w-xs mx-auto flex flex-col items-start">
      <p className="text-gray-500 text-sm sm:text-base">{title}</p>
      <h2 className="text-xl sm:text-2xl font-bold mt-1">{value}</h2>
    </div>
  );
}