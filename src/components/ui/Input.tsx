interface InputViewProps {
    id: string;
    label?: string;
    placeholder?: string;
    subPlaceholder?: string;
    value?: string;
    onChange?: (value: string) => void;
}

export default function Input({
    id,
    label,
    value,
    onChange,
    placeholder,
    subPlaceholder,
}: InputViewProps) {
    return (
        <div className="input-group">
            <label className="item-label" htmlFor={id}>
                {label}
            </label>
            <div className="input-wrapper">
                <input
                    id={id}
                    type="text"
                    value={value}
                    placeholder={placeholder}
                    onChange={(e) => onChange?.(e.target.value)}
                />
                {subPlaceholder && (
                    <span className="unit">{subPlaceholder}</span>
                )}
            </div>
        </div>
    );
}
