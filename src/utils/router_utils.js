/*
 * Return { currentPage, currentSection, pageType, subSections } based on the
 * window current location
 */
export const computeCurrentLocation = (location, siteSkeleton) => {
    // Corner case: check to see if we are on the homepage
    if (location.pathname === "/" || location.pathname === "") {
        return {
            currentPage: "Home",
            currentSection: "",
            pageType: "",
            subSections: []
        };
    }

    // Compute current page
    const currentNavPath = location.pathname.split('#')[0].split('/');
    const currentNavPage = currentNavPath[1];

    // Compute current section (if it exists)
    let currentNavSection = (currentNavPath.length > 2) ? currentNavPath[2] : "";
    if (currentNavSection === "" && location.hash !== "") {
        // Use the hash as the section instead
        currentNavSection = location.hash.substr(1);
    }

    // Match page
    for (const pageDetails of siteSkeleton) {
        const processedPageName = (pageDetails.page) ? urlify(pageDetails.page) : "";
        if (currentNavPage === processedPageName) {
            // Page matches, now match section if necessary
            let currentSection = "";

            if (pageDetails.sections && (pageDetails.sections.length > 0)) {
                // Match section
                for (const sectionName of pageDetails.sections) {
                    const processedSectionName = urlify(sectionName);
                    if (currentNavSection === processedSectionName) {
                        // Section matches
                        currentSection = sectionName;
                        break;
                    }
                }
            }

            // Return matching
            return {
                currentPage: pageDetails.page || "",
                currentSection: currentSection || "",
                pageType: pageDetails.type || "",
                subSections: pageDetails.sections || []
            };
        }
    }

    // Could not find page! Return empty data
    return {
        currentPage: "",
        currentSection: "",
        pageType: "",
        subSections: []
    };
};

// Convert an array of strings into a URL
export const arrayToURL = (arr) =>
    arr.reduce(
        (url, entry) => (url + urlify(entry) + "/"),
        "/"
    );

// Map string to URL
export const urlify = (string) =>
    string
        .replace(/\s+/g, '-')
        .replace(/’/g, '')
        .toLowerCase();
