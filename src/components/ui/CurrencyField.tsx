interface CurrencyFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
}

export function CurrencyField({
  id,
  label,
  value,
  onChange,
  placeholder,
  error,
}: CurrencyFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
      </label>
      <div className="mt-2 flex items-center rounded-md border border-line bg-surface focus-within:border-primary">
        <span className="pl-3 text-muted">$</span>
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={0}
          step="1"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent px-2 py-2.5 text-ink outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
      </div>
      {error && <p className="mt-1.5 text-sm text-red-700">{error}</p>}
    </div>
  );
}
