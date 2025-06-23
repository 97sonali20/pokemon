import Link from 'next/link';

export default function Breadcrumb({ name }: { name: string }) {
  return (
    <div className="text-sm text-gray-600 mb-2">
      <Link href="/" className="hover:underline text-blue-600">Home</Link> → <span className="capitalize">{name}</span>
    </div>
  );
}
