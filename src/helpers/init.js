import { isValidUUID } from './helpers';
const defaultProxyIP = '192.237.192.175';
let userID, dohURL, proxyIP, trojanPassword, defaultHttpPorts, defaultHttpsPorts, panelVersion, hostName, origin, client, pathName;

function initParams(request, env) {
    const proxyIPs = env.PROXYIP?.split(',').map(proxyIP => proxyIP.trim());
    userID = env.UUID || 'e9b267bc-63be-4eb4-a6b6-950da2fc3a61';
    if (!isValidUUID(userID)) throw new Error(`Invalid UUID: ${userID}`);
    dohURL = env.DOH_URL || 'https://cloudflare-dns.com/dns-query';
    proxyIP = proxyIPs ? proxyIPs[Math.floor(Math.random() * proxyIPs.length)] : defaultProxyIP;
    trojanPassword = env.TROJAN_PASS || '950da2fc3a61';
    defaultHttpPorts = ['80', '8080', '2052', '2082', '2086', '2095', '8880'];
    defaultHttpsPorts = ['443', '8443', '2053', '2083', '2087', '2096'];
    panelVersion = '2.7.6.1';
    hostName = request.headers.get('Host');
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);
    client = searchParams.get('app');
    origin = url.origin;
    pathName = url.pathname;
}

export function initializeParams(request, env) {
    initParams(request, env);
    return Promise.resolve();
}

export { userID, dohURL, proxyIP, trojanPassword, hostName, origin, client, pathName, defaultHttpPorts, defaultHttpsPorts, panelVersion };
