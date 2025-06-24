import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
      <div className="flex items-center">
        <Home className="w-4 h-4" />
      </div>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />}
          
          {item.href ? (
            <Link 
              href={item.href}
              className="hover:text-blue-600 transition-colors font-medium capitalize"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 font-medium capitalize">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}
