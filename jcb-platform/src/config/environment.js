// Application mode — switched via .env
export const APP_MODE = import.meta.env.VITE_APP_MODE || 'demo'; // 'demo' | 'production'

const config = {
  demo: {
    useFirebase:     false,
    useMockData:     true,
    persistData:     false,
    enableAnalytics: false,
    apiBaseUrl:      'http://localhost:5000/api',
  },
  production: {
    useFirebase:     true,
    useMockData:     false,
    persistData:     true,
    enableAnalytics: true,
    apiBaseUrl:      import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  },
};

export const getConfig = () => config[APP_MODE] ?? config.demo;
export const isDemo = () => APP_MODE === 'demo';
export const isProduction = () => APP_MODE === 'production';
