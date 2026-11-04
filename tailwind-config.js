// Configuração do Tailwind (CDN). Deve ser carregada DEPOIS do script do Tailwind.
tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                darkBg: '#0b0f19',
                darkCard: '#111827',
                neonPurple: '#a855f7',
                neonBlue: '#3b82f6',
                neonCyan: '#06b6d4',
                accentDark: '#1f2937'
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                mono: ['Fira Code', 'monospace']
            }
        }
    }
};
