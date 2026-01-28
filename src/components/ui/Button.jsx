import React from 'react';

export const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    let variantClass = 'btn-primary';
    if (variant === 'outline') variantClass = 'btn-outline'; // Need to define this in index.css or style here
    if (variant === 'ghost') variantClass = 'btn-ghost';

    return (
        <button className={`btn ${variantClass} ${className}`} {...props}>
            {children}
        </button>
    );
};
