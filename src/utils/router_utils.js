// Return { className: "active" } if the current hash matches the target hash
export const activeHash = (targetHash, activeHash, className = '') => {
    if (targetHash === activeHash) {
        return { className: `${className} active` };
    } else {
        return { className: className };
    }
};

// Return { className: "active" } if the current path matches the target path
export const activePath = (targetPath, activePath, className = '') => {
    console.log(targetPath, activePath);
    if (targetPath === activePath) {
        return { className: `${className} active` };
    } else {
        return { className: className };
    }
};
