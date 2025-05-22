function fetchJSONData() {
    fetch('/wangsheng/vendor/bootstrap/css/bootstrap.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {console.log(data);
            const template = document.getElementsByClassName('custom-tr')[0];
            for (var key in data) {
                var dt=data[key];
                const copied=template.cloneNode(true);
                copied.setAttribute('style','');
                copied.getElementsByClassName('custom-id')[0].setAttribute('data-project-id', dt['data-project-id']);
                copied.getElementsByClassName('custom-name')[0].setAttribute('href', dt['link']);
                console.log(copied.getElementsByClassName('custom-name'));
                copied.getElementsByClassName('custom-name')[0].innerHTML=dt['name'];
                copied.getElementsByClassName('custom-owner')[0].innerHTML=dt['owner'];
                copied.getElementsByClassName('custom-update')[0].innerHTML=dt['update'];
                template.parentNode.insertBefore(copied,template.nextSibling);
            }
        }
        )
        .catch(error => console.error('Failed to fetch data:', error));
}

