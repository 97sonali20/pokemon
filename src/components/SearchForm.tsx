export default function SearchForm({
    types,
    search,
    onSearchChange,
    selectedType,
    onTypeChange
}: any) {
    return (
        <div className="flex flex-col sm:flex-row gap-4">
            <input
                type="text"
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search Pokémon by name"
                className="p-2 border rounded w-full sm:w-1/2"
            />
            <select
                value={selectedType}
                onChange={(e) => onTypeChange(e.target.value)}
                className="p-2 border rounded w-full sm:w-1/2"
            >
                <option value="">All Types</option>
                {types.map((t: any) => (
                    <option key={t.name} value={t.name}>
                        {t.name.toUpperCase()}
                    </option>
                ))}
            </select>
        </div>
    );
}
