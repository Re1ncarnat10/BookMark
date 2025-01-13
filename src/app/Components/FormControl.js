import React from 'react';

const FormControl = ({ label, value, onChange, type = 'text', required = false, disabled= false, max }) => {
    const labelSpans = label.split('').map((char, index) => (
        <span key={index} style={{ transitionDelay: `${index * 50}ms` }}>{char}</span>
    ));

    return (
        <div className="form-control">
            <input
                type={type}
                value={value}
                onChange={onChange}
                required={required}
                disabled={disabled}
                max={max}
            />
            <label>
                {labelSpans}
            </label>
        </div>
    );
};

export default FormControl;