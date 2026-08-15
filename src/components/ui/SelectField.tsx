interface SelectOption {
  value: string;
  label: string;
  group?: string;
}

interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
}

export function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  placeholder,
  error,
}: SelectFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-md border border-line bg-surface px-3 py-2.5 text-ink outline-none focus:border-primary"
      >
        <option value="" disabled>
          {placeholder ?? "Select…"}
        </option>
        {[...new Set(options.map((option) => option.group).filter(Boolean))].map((group) => (
          <optgroup key={group} label={group}>
            {options.filter((option) => option.group === group).map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </optgroup>
        ))}
        {options.filter((option) => !option.group).map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
      {error && <p className="mt-1.5 text-sm text-red-700">{error}</p>}
    </div>
  );
}
