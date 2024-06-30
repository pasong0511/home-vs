interface InputViewProps {
    label?: string;
    placeholder?: string;
}

function InputUI({ label, placeholder }: InputViewProps) {
    return (
        <div>
            <label>{label}</label>
            <input placeholder={placeholder} />
        </div>
    );
}

export default InputUI;
