import { fetchTransactions, analyzeTransactions } from "@/lib/actions";

export default async function AiOutput({ range }) {
  const transactions = await fetchTransactions(range)

  const analysis = await analyzeTransactions(transactions)
  if (!analysis) return null;

  console.log(analysis)

  // Split the output into lines
  const lines = analysis.split('\n').map(line => line.trim()).filter(Boolean);

  // Find the first line that starts with '*', which marks the start of bullet points
  const bulletStart = lines.findIndex(line => line.startsWith('*'));

  // The compliment/paragraph is everything before the first bullet
  const compliment = lines.slice(0, bulletStart).join(' ');

  // The bullet points are all lines starting with '*'
  const bullets = lines.slice(bulletStart).filter(line => line.startsWith('*'));

  return (
    <div>
      {compliment && <p className="mb-4">{compliment}</p>}
      {bullets.length > 0 && (
        <ul className="list-disc pl-6 space-y-2">
          {bullets.map((b, i) => (
            <li key={i}>{b.replace(/^\*\s*/, '')}</li>
          ))}
        </ul>
      )}
    </div>
  );
}