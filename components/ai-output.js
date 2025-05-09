export default function AiOutput({ output }) {
  if (!output) return null;

  console.log(output)

  // Split the output into lines
  const lines = output.split('\n').map(line => line.trim()).filter(Boolean);

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