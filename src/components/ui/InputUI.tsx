interface InputViewProps {
    id: string;
    label?: string;
    placeholder?: string;
    subPlaceholder?: string;
}

function InputUI({ id, label, placeholder }: InputViewProps) {
    return (
        <div className="input-group">
            <label className="item-label" htmlFor={id}>
                {label}
            </label>
            <input id={id} type="text" placeholder={placeholder} />
        </div>
    );
}

export default InputUI;
