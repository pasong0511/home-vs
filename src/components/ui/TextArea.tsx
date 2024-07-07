interface TextAreaViewProps {
    label?: string;
    placeholder?: string;
}

function TextArea({ label, placeholder }: TextAreaViewProps) {
    return (
        <div>
            <label className="item-label">{label}</label>
            <textarea placeholder={placeholder} />
        </div>
    );
}

export default TextArea;
