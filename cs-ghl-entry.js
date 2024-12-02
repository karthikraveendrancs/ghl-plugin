const targetNode = document.body; // Observe changes to the entire body
const config = { childList: true, subtree: true };
const baseUrl = 'https://ghl-cs-api.vercel.app/';
const locationMap = {};

const observer = new MutationObserver((mutationsList, observer) => {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            const contactsHeader = document.querySelector('.topmenu-nav'); // Adjust selector
            if (contactsHeader && document.querySelector('.topmenu-navtitle').textContent.trim() === 'Contacts' ) {
                const csIdentifier = document.querySelector('#contact\\.carestack_identifier');
                if(!csIdentifier || document.querySelector('#button-create-patient-contact')){
                    return;
                }
                const customButton = document.createElement('button');
                customButton.innerText = 'Convert To Patient';
                customButton.id = 'button-create-patient-contact';
                customButton.className = 'custom-button n-button n-button--primary-type n-button--medium-type h-11 min-w-[8rem]';
                customButton.style = 'background-color: #42ba78 !important; color: white; margin-right:8px';
                customButton.onclick = function() {
                    const firstName = document.querySelector('[name="contact.first_name"]').value;
                    const lastName = document.querySelector('[name="contact.last_name"]').value;
                    const dob = document.querySelector('[name="contact.date_of_birth"]').value;
                    const gender = document.querySelector('[name="contact.gender"]').value;
                    const defaultLocationId = document.querySelector('[name="contact.default_location"]').value;
                    
                };
                csIdentifier.closest('FORM').appendChild(customButton);
                 (async () => {
                     const tenant = location.href.match('/location\/([^\/]+)/')[1];
                     if (tenant in locationMap) {
                         await loadLocations();
                     }
                     const locationCombo = document.querySelector('[name="contact.default_location"]');
                     locationCombo.remove(1);
                     locationMap[tenant].forEach((currentValue, index, array) => {
                        const locOption = document.createElement('option');
                        locOption.value = currentValue['id'];
                        locOption.text = currentValue['name'];
                        locationCombo.add(locOption);
                     });
                  })();
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
    xhr.open("POST", baseUrl + 'tenants//patients', true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.setRequestHeader('Authorization', getToken());
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
        "lastName": " Raveendran",
        "dob": "1981-07-31T00:00:00",
        "gender": 1,
        "defaultLocationId": 1
    });
    xhr.send(data);
}

const loadLocations = async function(tenant) {
    let xhr = new XMLHttpRequest();
    const token = await getToken()
    xhr.open("GET", baseUrl + `tenants/${tenant}/locations`, true);
    xhr.setRequestHeader('Authorization', token);
    xhr.onload = function () {
        if (xhr.status === 200 || xhr.status === 201) {
            console.log("Response received:", xhr.responseText);
            const jsonResponse = JSON.parse(xhr.responseText);
            locationMap[tenant] = jsonResponse;
        } else {
            console.error("Error:", xhr.status, xhr.statusText);
        }
    };
    xhr.onerror = function () {
        console.error("Request failed.");
    };
    xhr.send();
}

// Start observing the body for changes
observer.observe(targetNode, config);
