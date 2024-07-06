interface InputViewProps {
    id: string;
    label?: string;
    placeholder?: string;
    subPlaceholder?: string;
}

function InputUI({ id, label, placeholder, subPlaceholder }: InputViewProps) {
    return (
        <div className="input-group">
            <label className="item-label" htmlFor={id}>
                {label}
            </label>
            <div className="input-wrapper">
                <input id={id} type="text" placeholder={placeholder} />
                {subPlaceholder && (
                    <span className="unit">{subPlaceholder}</span>
                )}
            </div>
        </div>
    );
}

export default InputUI;
