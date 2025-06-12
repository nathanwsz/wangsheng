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

function initialize(data)  {
    const template = document.getElementsByClassName('researchcard')[0];
    for (let key in data) {
        const dt = data[key];
        const copied=template.cloneNode(true);
        copied.className=dt['class'];
        copied.style.display="block";

        let processing = copied.getElementsByClassName('card-title')[0];
        processing.setAttribute('onclick','abs(\'' + dt['id'] + '\')');
        processing.innerHTML = dt['title'];

        processing= copied.getElementsByClassName('card-subtitle')[0];
        processing.innerHTML = dt['authors'] + '<a class="status"></a>';

        processing= processing.getElementsByClassName('status')[0];
        processing.innerHTML = dt['status'];

        processing = copied.getElementsByClassName('card-info')[0];
        processing.id = dt['id']

        processing= copied.getElementsByClassName('abstract')[0];
        processing.innerHTML = '<b>Abstract:</b> ' + dt['abstract'];

        processing= copied.getElementsByClassName('keywords')[0];
        processing.innerHTML = '<b>Keywords:</b> ' + dt['keywords'];

        let position = -1;
        switch (dt['progress']) {
            case "publication": position = 0;break;
            case "working-paper": position = 1;break;
            case "work-in-progress": position = 2;break;
        }
        if (position > -1){
            const location = document.getElementsByClassName('ribbon')[position];
            template.parentNode.insertBefore(copied,location.nextSibling);

        }
    }
}

