let parentDivs = new Set([...document.querySelectorAll('[role="group"]')].map(el => el.parentElement));

// Function to apply visibility hidden to parent divs that match the condition
function hideElements() {
    parentDivs.forEach(parent => {
        if (parent.querySelector('.zgqNQQ')) {
            parent.style.visibility = 'hidden'; // Apply visibility hidden
        }
    });
}

// Initial run for already loaded elements
hideElements();

const observer = new MutationObserver(mutations => {
    let newElementsFound = false;

    mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1) { // Ensure it's an element
                const newGroups = node.matches?.('[role="group"]') 
                    ? [node] 
                    : [...node.querySelectorAll?.('[role="group"]')];

                newGroups.forEach(group => {
                    const parent = group.parentElement;
                    if (!parentDivs.has(parent)) {
                        parentDivs.add(parent);
                        newElementsFound = true;
                        
                        // Hide the new element immediately
                        if (parent.querySelector('.zgqNQQ')) {
                            parent.style.visibility = 'hidden';
                        }
                    }
                });
            }
        });
    });

    if (newElementsFound) {
        hideElements(); // Re-run the check for visibility
    }
});

// Observe for lazy-loaded content
observer.observe(document.body, { childList: true, subtree: true });

// Listen for React component re-renders (DOM changes due to React updates)
const reactObserver = new MutationObserver(() => {
    hideElements(); // Apply the visibility change immediately on re-render
});

// Observe the root of the React app to detect any re-renders
const root = document.getElementById('root') || document.body;  // Adjust depending on your React app's root element
reactObserver.observe(root, {
    childList: true,
    subtree: true
});

// Function to manually check for content after lazy load
function checkLazyContent() {
    const newParentDivs = [...document.querySelectorAll('[role="group"]')]
        .map(el => el.parentElement)
        .filter(parent => !parentDivs.has(parent));
    
    if (newParentDivs.length > 0) {
        newParentDivs.forEach(parent => {
            parentDivs.add(parent);
            if (parent.querySelector('.zgqNQQ')) {
                parent.style.visibility = 'hidden';
            }
        });
    }
}

// Trigger check on page load (for content already loaded)
checkLazyContent();

// Optionally, periodically check for new content to keep it smooth
setInterval(checkLazyContent, 2000);  // Check every 2 seconds for new elements