const MyInputComp = ({
    label,
    type = 'text',
    className,
    value,
    placeholder,
    onChangeHandler,
    onBlurHandler,
}) => {
    return (
        <div className={`form-group`}>
            <label htmlFor="uname" style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing:1.3 }}>{label}:</label>
            <input
                required
                id={label}
                type={type}
                name={label}
                value={value}
                onBlur={onBlurHandler}
                placeholder={placeholder}
                onChange={onChangeHandler}
                className={`form-control ${className}`}
                style={{ fontWeight: 700, letterSpacing: 1.3 }}
            />
        </div>
    )
}

export default MyInputComp
