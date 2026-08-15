interface CheckboxOption<T extends string> {
  value: T;
  label: string;
}

interface CheckboxGroupProps<T extends string> {
  name: string;
  legend: string;
  helpText?: string;
  options: CheckboxOption<T>[];
  value: T[];
  onChange: (value: T[]) => void;
  error?: string;
}

export function CheckboxGroup<T extends string>({
  name,
  legend,
  helpText,
  options,
  value,
  onChange,
  error,
}: CheckboxGroupProps<T>) {
  function toggle(option: T) {
    if (value.includes(option)) {
      onChange(value.filter((v) => v !== option));
    } else {
      onChange([...value, option]);
    }
  }

  return (
    <fieldset>
      <legend className="text-sm font-medium text-ink">{legend}</legend>
      {helpText && <p className="mt-1 text-xs text-muted">{helpText}</p>}
      <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {options.map((option) => {
          const id = `${name}-${option.value}`;
          const checked = value.includes(option.value);
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
                type="checkbox"
                id={id}
                name={name}
                checked={checked}
                onChange={() => toggle(option.value)}
                className="h-4 w-4 rounded border-line text-primary focus:ring-primary"
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
