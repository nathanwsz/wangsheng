function fetchJSONData() {
    fetch('vendor/jquery/research_projects.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {//console.log(data);
                initialize(data);
            }
        )
        .catch(error => console.error('Failed to fetch data:', error));
}

// Specify your desired display order here, by id
const displayOrder = [
    '5f38609b4b7b6700015f7ee5', // Navigating the Unknown
    '67fe52c87bda6dda5c5de1c6', // Balancing Usefulness and Safety in LLM
    '68006e750a6d22af59b7d34e', // Who should be Invited?
    '65df9b845ad04767b1ceee04', // Car Insurance Telematics, Driver Incentives
    '65d3a8b2fb839dd66802c621', // RL for Model Discovery
    '6537fc8b9e66d99cff0c8375', // Ad Sequencing
    '647bb41f2574fe5648d591ec', // Digital billboard
    '5d9c0eb2777e3e0001050b50', // Crowdsourcing Decision Support System
    '69b94a13d5126b014ee0e4fc', // TAM2.0
    '690f665c4408ed4243995397', // Guarantee Price in Two-sided Platform
    '5e1df5ea421e4c000155015e', // Information Selling in Ad Auctions
    '5d94ef23f51fed0001876f31', // Optimal Efforts of Zale Advertisement
    '65a6f028e7eaeb4f23b495fa', // Response Letter Template
    '64998d1584b0ea703ff8e92d', // Prob&StatL1
    '66bb58415a4f5d9160e57f89', // interview
    '60f4c1fdfb6032dd04829d69', // CV
    '65aeb053a864c382e2c4d1a5', // PhD Dissertation
    '65a6f007fbb7a99cb09cbdfa', // Response Letter
    '6521c8633dc1cba6a9be688d', // interview
    '64da4b1ba60bcb50aee6fcdb', // Prob&StatL1 (Copy)
    '647bb3f17f132ed0532ec02a', // Digital Billboard Advertising
    '61a80b7830118efd1739eaff', // Research Project: Viral impression
    '5ea476ed09e2280001bb175e', // Term Paper
    '5eae2b08475b510001425196', // Knowledge management report
    '5eab00ffd12170000101d06f', // Knowledge management presentation
    '5e3b4d4b3c6f000001c9c318', // Homework
    '5d82c1c66ec79a00019b93b7', // econ 2
    '5b9ad4e1f9699b21eb585169', // Statistics Homework
    '5b80d137c5f2313c78024bf9', // Optimization Homework
    '5b86dbd498f3225e4e56dfea', // Economics Homework
    '608edba9eb94940a4e178cd4', // ICIS Template
    '66525e7be1ae575e5dffa5ac', // *** Libraries
    '68006e5caadada78945d757b'  // *** Libraries_Template
];

function initialize(data) {
    const template = document.getElementsByClassName('researchcard')[0];

    // Build a lookup so we can find each item by id quickly
    const dataById = {};
    for (let key in data) {
        const dt = data[key];
        dataById[dt['id']] = dt;
    }

    // Track last inserted node per category (ribbon)
    const ribbons = document.getElementsByClassName('ribbon');
    const lastInserted = [
        ribbons[0] || null, // publication
        ribbons[1] || null, // working-paper
        ribbons[2] || null  // work-in-progress
    ];

    // Walk through displayOrder instead of data's natural order
    displayOrder.forEach(id => {
        const dt = dataById[id];
        if (!dt) {
            console.warn('No data found for id:', id);
            return;
        }

        const copied = template.cloneNode(true);
        copied.className = dt['class'];
        copied.style.display = "block";

        let processing = copied.getElementsByClassName('card-title')[0];
        processing.setAttribute('onclick', 'abs(\'' + dt['id'] + '\')');
        processing.innerHTML = dt['title'];

        processing = copied.getElementsByClassName('card-subtitle')[0];
        processing.innerHTML = dt['authors'] + '<a class="status"></a>';

        processing = processing.getElementsByClassName('status')[0];
        processing.innerHTML = dt['status'];

        processing = copied.getElementsByClassName('card-info')[0];
        processing.id = dt['id'];

        processing = copied.getElementsByClassName('abstract')[0];
        processing.innerHTML = '<b>Abstract:</b> ' + dt['abstract'];

        processing = copied.getElementsByClassName('keywords')[0];
        processing.innerHTML = '<b>Keywords:</b> ' + dt['keywords'];

        let position = -1;
        switch (dt['progress']) {
            case "publication": position = 0; break;
            case "working-paper": position = 1; break;
            case "work-in-progress": position = 2; break;
        }

        if (position > -1) {
            const anchor = lastInserted[position];
            anchor.parentNode.insertBefore(copied, anchor.nextSibling);
            lastInserted[position] = copied;
        }
    });
}