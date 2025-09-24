// Add runtime config type definition
declare global {
    interface Window {
        RUNTIME_CONFIG?: {
            API_URL: string;
        };
    }
}

const getBaseUrl = () => {
    // First check runtime configuration (from runtime-config.js)
    if (typeof window !== 'undefined' && window.RUNTIME_CONFIG?.API_URL) {
        console.log('Using runtime config API_URL:', window.RUNTIME_CONFIG.API_URL);
        return window.RUNTIME_CONFIG.API_URL;
    }

    // Check if we're in a Codespace
    const codespaceName = process.env.CODESPACE_NAME;
    if (codespaceName) {
        // Use the same protocol as the current page
        const protocol = typeof window !== 'undefined' ? window.location.protocol : 'https:';
        const protocolToUse = protocol.includes('https') ? 'https' : 'http';
        console.log(`Using Codespace URL with ${protocolToUse} protocol`);
        return `${protocolToUse}://${codespaceName}-3000.app.github.dev`;
    }

    // Use the same origin as the frontend for API requests
    if (typeof window !== 'undefined' && window.location.origin) {
        const baseURL = window.location.origin.split(':').slice(0, 2).join(':') + ':3000';
        console.log(`Using window.location.origin for API base URL: ${baseURL}`);
        return baseURL;
    }

    const protocol = typeof window !== 'undefined' ? window.location.protocol : 'http:';
    const protocolToUse = protocol.includes('https') ? 'https' : 'http';
    return `${protocolToUse}://localhost:3000`;
};

export const API_BASE_URL = getBaseUrl();

export const api = {
    baseURL: API_BASE_URL,
    endpoints: {
        products: '/api/products',
        suppliers: '/api/suppliers',
        orders: '/api/orders',
        branches: '/api/branches',
        headquarters: '/api/headquarters',
        deliveries: '/api/deliveries',
        orderDetails: '/api/order-details',
        orderDetailDeliveries: '/api/order-detail-deliveries'
    }
};