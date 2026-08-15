interface RadioOption<T extends string> {
  value: T;
  label: string;
}

interface RadioGroupProps<T extends string> {
  name: string;
  legend: string;
  helpText?: string;
  options: RadioOption<T>[];
  value: T | undefined;
  onChange: (value: T) => void;
  error?: string;
}

export function RadioGroup<T extends string>({
  name,
  legend,
  helpText,
  options,
  value,
  onChange,
  error,
}: RadioGroupProps<T>) {
  return (
    <fieldset>
      <legend className="text-sm font-medium text-ink">{legend}</legend>
      {helpText && <p className="mt-1 text-xs text-muted">{helpText}</p>}
      <div className="mt-3 space-y-2">
        {options.map((option) => {
          const id = `${name}-${option.value}`;
          const checked = value === option.value;
          return (
            <label
              key={option.value}
              htmlFor={id}
              className={`flex cursor-pointer items-center gap-3 rounded-md border px-4 py-3 text-sm transition-colors ${
                checked
                  ? "border-primary bg-accent-soft"
                  : "border-line bg-surface hover:border-muted-soft"
              }`}
            >
              <input
                type="radio"
                id={id}
                name={name}
                value={option.value}
                checked={checked}
                onChange={() => onChange(option.value)}
                className="h-4 w-4 border-line text-primary focus:ring-primary"
              />
              <span className="text-ink">{option.label}</span>
            </label>
          );
        })}
      </div>
      {error && <p className="mt-1.5 text-sm text-red-700">{error}</p>}
    </fieldset>
  );
}
