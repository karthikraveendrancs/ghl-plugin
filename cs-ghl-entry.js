const targetNode = document.body; // Observe changes to the entire body
const config = { childList: true, subtree: true }; // Look for added/removed nodes

const observer = new MutationObserver((mutationsList, observer) => {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            const contactsHeader = document.querySelector('.topmenu-nav'); // Adjust selector
            if (contactsHeader && document.querySelector('.topmenu-navtitle').textContent.trim() === 'Contacts' && document.querySelector('.hl_wrapper.hl_contact--details') != null 
                && !document.querySelector('.custom-button')) {
                const customButton = document.createElement('button');
                customButton.innerText = 'Create Patient';
                customButton.className = 'custom-button';
                customButton.style = 'margin-left: 10px; background-color: #42ba78; color: white; padding: 5px; border: none; cursor: pointer;';
                customButton.onclick = function() {
                    alert('Custom button clicked!');
                };
                contactsHeader.appendChild(customButton);
            }
            const cuOpportunityBtn = document.querySelector('#CreateUpdateOpportunity');
            if (cuOpportunityBtn && !document.querySelector('#button-create-patient-opportunity')){
                const customButton = document.createElement('button');
                customButton.innerText = 'Create Patient';
                customButton.id = 'button-create-patient-opportunity';
                customButton.className = 'n-button n-button--primary-type n-button--medium-type h-11 min-w-[8rem]'
                customButton.style = 'background-color: #42ba78; color: white;';
                customButton.onclick = function() {
                    alert('Custom button clicked!');
                };
                cuOpportunityBtn.parentElement.insertBefore(customButton,cuOpportunityBtn );
            }
        }
    }
});

// Start observing the body for changes
observer.observe(targetNode, config);
