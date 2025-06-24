'use client';

import FavoritesList from '@/components/FavoriteList';
import Breadcrumb from '@/components/BreadCrumb';

export default function FavoritesPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Breadcrumb 
          items={[
            { label: 'Home', href: '/' },
            { label: 'Favorites' }
          ]} 
        />
      </div>

      <FavoritesList />
    </div>
  );
}