// Return { className: "active" } if the current hash matches the target hash
export const activeHash = (targetHash, activeHash, className = '') => {
    if (targetHash === activeHash) {
        return { className: `${className} active` };
    } else {
        return { className: className };
    }
};
