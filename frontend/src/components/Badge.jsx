import React from 'react';

/**
 * Antigravity Badge Component
 * 
 * A subtle, high-contrast badge for highlighting features or events.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Badge content
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.variant='primary'] - Variant ('primary', 'success', 'warning', 'error')
 */
const Badge = ({ children, className = '', variant = 'primary' }) => {
    const variants = {
        primary: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.1)]',
        success: 'bg-green-500/10 border-green-500/20 text-green-400',
        warning: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400',
        error: 'bg-red-500/10 border-red-500/20 text-red-400',
        cyan: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
    };

    const selectedVariant = variants[variant] || variants.primary;

    return (
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-[0.15em] transition-all backdrop-blur-md ${selectedVariant} ${className}`}>
            {children}
        </div>
    );
};

export default Badge;
