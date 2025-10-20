import React from 'react';

// FIX: Replaced JSX syntax with React.createElement calls to be compatible with a .ts file extension.
// This resolves многочисленные parsing errors caused by the TypeScript compiler not being in TSX mode.
const supecoLogo = (className: string): React.ReactElement => (
    React.createElement('div', { className: `flex items-center space-x-2 ${className}` },
        React.createElement('svg', {
            width: "40",
            height: "40",
            viewBox: "0 0 24 24",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            className: "text-supeco-yellow"
        },
            React.createElement('path', { d: "M12 2L2 7V17L12 22L22 17V7L12 2Z", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }),
            React.createElement('path', { d: "M2 7L12 12", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }),
            React.createElement('path', { d: "M12 22V12", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }),
            React.createElement('path', { d: "M22 7L12 12", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }),
            React.createElement('path', { d: "M17 4.5L7 9.5", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })
        ),
        React.createElement('div', { className: "flex flex-col" },
            React.createElement('span', { className: "font-bold text-xl tracking-wider" }, "SUPECO"),
            React.createElement('span', { className: "text-xs text-gray-300 -mt-1" }, "DLC Smart")
        )
    )
);

export default supecoLogo;
