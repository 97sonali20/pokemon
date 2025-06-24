import { PokemonType } from '@/types/pokemon';
import { Search, Filter, X, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface SearchFormProps {
    types: PokemonType[];
    search: string;
    onSearchChange: (value: string) => void;
    selectedTypes: string[];
    onTypesChange: (types: string[]) => void;
}

export default function SearchForm({
    types,
    search,
    onSearchChange,
    selectedTypes,
    onTypesChange
}: SearchFormProps) {
    const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const hasActiveFilters = search || selectedTypes.length > 0;

    const handleClearAll = () => {
        onSearchChange('');
        onTypesChange([]);
    };

    const handleTypeToggle = (typeName: string) => {
        const isSelected = selectedTypes.includes(typeName);
        if (isSelected) {
            onTypesChange(selectedTypes.filter(t => t !== typeName));
        } else {
            onTypesChange([...selectedTypes, typeName]);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsTypeDropdownOpen(false);
            }
        };

        if (isTypeDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isTypeDropdownOpen]);

    
    const getTypeColor = (type: string) => {
        const colors: { [key: string]: string } = {
            normal: 'bg-gray-500',
            fire: 'bg-red-500',
            water: 'bg-blue-500',
            electric: 'bg-yellow-500',
            grass: 'bg-green-500',
            ice: 'bg-cyan-400',
            fighting: 'bg-red-700',
            poison: 'bg-purple-500',
            ground: 'bg-yellow-600',
            flying: 'bg-indigo-400',
            psychic: 'bg-pink-500',
            bug: 'bg-green-400',
            rock: 'bg-yellow-700',
            ghost: 'bg-purple-700',
            dragon: 'bg-indigo-700',
            dark: 'bg-gray-800',
            steel: 'bg-gray-600',
            fairy: 'bg-pink-400',
        };
        return colors[type] || 'bg-gray-500';
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="border-b border-gray-100 px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Search className="h-5 w-5 text-blue-600" />
                        <h2 className="text-lg font-semibold text-gray-900">Search & Filter</h2>
                    </div>
                    {hasActiveFilters && (
                        <button
                            onClick={handleClearAll}
                            className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <X size={14} />
                            Clear All
                        </button>
                    )}
                </div>
            </div>

            <div className="p-6 space-y-6">
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700">
                            Search & Filter
                        </label>
                        {selectedTypes.length > 0 && (
                            <span className="text-xs text-blue-600 font-normal">
                                {selectedTypes.length} type{selectedTypes.length > 1 ? 's' : ''} selected
                            </span>
                        )}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 sm:items-start">
                        <div className="relative flex-1 min-w-0">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => onSearchChange(e.target.value)}
                                placeholder="Search Pokemon by name..."
                                className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-500 hover:border-gray-300"
                            />
                            {search && (
                                <button
                                    onClick={() => onSearchChange('')}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                >
                                    <X size={16} />
                                </button>
                            )}
                        </div>

                        <div ref={dropdownRef} className="relative flex-shrink-0 w-full sm:w-64">
                        <button
                            type="button"
                            onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
                            className="w-full flex items-center justify-between px-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-300"
                        >
                            <div className="flex items-center gap-2">
                                <Filter className="h-5 w-5 text-gray-400" />
                                <span className="text-gray-700">
                                    {selectedTypes.length === 0 
                                        ? `All Types (${types.length} available)`
                                        : `${selectedTypes.length} type${selectedTypes.length > 1 ? 's' : ''} selected`
                                    }
                                </span>
                            </div>
                            {isTypeDropdownOpen ? (
                                <ChevronUp className="h-5 w-5 text-gray-400" />
                            ) : (
                                <ChevronDown className="h-5 w-5 text-gray-400" />
                            )}
                        </button>

                        {isTypeDropdownOpen && (
                            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto">
                                <div className="p-3 border-b border-gray-100">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-gray-700">Select Types</span>
                                        {selectedTypes.length > 0 && (
                                            <button
                                                onClick={() => onTypesChange([])}
                                                className="text-xs text-blue-600 hover:text-blue-700"
                                            >
                                                Clear All
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <div className="p-2 space-y-1">
                                    {types.map((type) => {
                                        const isSelected = selectedTypes.includes(type.name);
                                        return (
                                            <button
                                                key={type.name}
                                                onClick={() => handleTypeToggle(type.name)}
                                                className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors capitalize ${
                                                    isSelected
                                                        ? 'bg-blue-50 text-blue-700'
                                                        : 'text-gray-700 hover:bg-gray-50'
                                                }`}
                                            >
                                                <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                                                    isSelected
                                                        ? 'bg-blue-600 border-blue-600'
                                                        : 'border-gray-300'
                                                }`}>
                                                    {isSelected && <Check size={12} className="text-white" />}
                                                </div>
                                                <div className={`w-3 h-3 rounded-full ${getTypeColor(type.name)}`}></div>
                                                {type.name}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                        </div>
                    </div>
                </div>

                {hasActiveFilters && (
                    <div className="pt-4 border-t border-gray-100">
                        <div className="flex items-start gap-2 text-sm">
                            <span className="text-gray-500 mt-1">Active filters:</span>
                            <div className="flex flex-wrap gap-2">
                                {search && (
                                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-xs">
                                        Search: &ldquo;{search}&rdquo;
                                        <button
                                            onClick={() => onSearchChange('')}
                                            className="hover:text-blue-900"
                                        >
                                            <X size={12} />
                                        </button>
                                    </span>
                                )}
                                {selectedTypes.map((type) => (
                                    <span 
                                        key={type}
                                        className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-800 rounded-md text-xs capitalize"
                                    >
                                        <div className={`w-2 h-2 rounded-full ${getTypeColor(type)}`}></div>
                                        {type}
                                        <button
                                            onClick={() => handleTypeToggle(type)}
                                            className="hover:text-gray-900"
                                        >
                                            <X size={12} />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
