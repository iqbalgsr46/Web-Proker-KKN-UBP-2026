import React from 'react';

export function PillButton({ 
  children, 
  className = "", 
  variant = "blue", 
  href,
  download,
  target,
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & React.AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: "blue" | "red" | "yellow" | "green" }) {
  const variants = {
    blue: "bg-google-blue text-white",
    red: "bg-google-red text-white",
    yellow: "bg-google-yellow text-[#202124]",
    green: "bg-google-green text-white",
  };
  
  const commonClasses = `px-6 sm:px-10 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg tracking-wide transition-all border-2 border-[#202124] shadow-[4px_4px_0px_#202124] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#202124] active:translate-y-1 active:translate-x-1 active:shadow-none flex items-center justify-center gap-2 ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} download={download} target={target} className={commonClasses} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button 
      className={commonClasses}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
