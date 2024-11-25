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
                customButton.style = 'background-color: #42ba78 !important; color: white; margin-right:8px';
                customButton.onclick = function() {
                    cuOpportunityBtn.click();
                };
                cuOpportunityBtn.parentElement.insertBefore(customButton,cuOpportunityBtn );
            }
        }
    }
});

const createPatient = function() {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "https://celebration.uat.carestack.com/api/v1.0/patients", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onload = function () {
        if (xhr.status === 200 || xhr.status === 201) {
            console.log("Response received:", xhr.responseText);
        } else {
            console.error("Error:", xhr.status, xhr.statusText);
        }
    };
    xhr.onerror = function () {
        console.error("Request failed.");
    };
    var data = JSON.stringify({
        "firstName": "Karthik",
        "lastName": "Raveendran",
        "dob": "1981-07-31T00:00:00",
        "gender": 1,
        "defaultLocationId": 1
    });
    xhr.send(data);
}

// Start observing the body for changes
observer.observe(targetNode, config);
