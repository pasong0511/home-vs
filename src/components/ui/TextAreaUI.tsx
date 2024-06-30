interface TextAreaViewProps {
    label?: string;
    placeholder?: string;
}

function TextAreaUI({ label, placeholder }: TextAreaViewProps) {
    return (
        <div>
            <label>{label}</label>
            <textarea placeholder={placeholder} />
        </div>
    );
}

export default TextAreaUI;
