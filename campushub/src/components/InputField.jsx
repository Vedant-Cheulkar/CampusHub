const InputField = ({ value, onChange, placeholder, type = "text" }) => {
    return (
        <>
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            /><br /><br />
        </>
    );
};

export default InputField;
