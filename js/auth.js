/** Demo session only. Production adapter must obtain server-verified identity. */
export const demoSession = Object.freeze({customerId:'demo-ruben',mode:'demo',authenticated:false});
/** Provider-neutral scope checks. Client checks demonstrate UX, not security. */
export function canAccess(state, permission, provider='muse') {
 return state.connection.connected && state.connection.provider === provider && state.connection.permissions[permission] === true;
}
export function requireAccess(state, permissions) {
 const missing=permissions.filter(p=>!canAccess(state,p));
 if(missing.length) throw new Error('Allow '+missing.join(' and ')+' in Muse permissions to continue.');
}
