interface NumberFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  suffix?: string;
  helpText?: string;
  error?: string;
}

export function NumberField({
  id,
  label,
  value,
  onChange,
  placeholder,
  suffix,
  helpText,
  error,
}: NumberFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
      </label>
      {helpText && <p className="mt-1 text-xs text-muted">{helpText}</p>}
      <div className="mt-2 flex items-center rounded-md border border-line bg-surface focus-within:border-primary">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={0}
          step="1"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent px-3 py-2.5 text-ink outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        {suffix && <span className="pr-3 text-muted">{suffix}</span>}
      </div>
      {error && <p className="mt-1.5 text-sm text-red-700">{error}</p>}
    </div>
  );
}
