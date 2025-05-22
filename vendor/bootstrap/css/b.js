function fetchJSONData() {
    fetch('bootstrap.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {//console.log(data);
                initialize("ongoing",data);
        }
        )
        .catch(error => console.error('Failed to fetch data:', error));
}

function fetchJSONDataTrashed(button) {
    fetch('bootstrap.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {//console.log(data);
                const activelis=document.getElementsByClassName('active');
                for (const li in activelis) {
                    activelis[li].className='';
                }
                console.log(button);
                button.parentNode.className='active';
                const template = document.getElementsByClassName('custom-tr-concrete');
                let lenTemplate = template.length;
                while (lenTemplate>0) {
                    template[0].remove();
                    lenTemplate=lenTemplate-1;
                }
                initialize("trash",data);
        }
        )
        .catch(error => console.error('Failed to fetch data:', error));
}

function initialize(category,data)  {
    const template = document.getElementsByClassName('custom-tr')[0];
    var previouscopied=template;
    for (var key in data) {
        var dt=data[key];
        if ((category==="ongoing" && !dt['trashed']) || (category==="trash" && dt['trashed'])) {
            const copied=template.cloneNode(true);
            copied.className='custom-tr-concrete';
            copied.setAttribute('style','');
            copied.getElementsByClassName('custom-id')[0].setAttribute('data-project-id', dt['id']);
            copied.getElementsByClassName('custom-name')[0].setAttribute('href', 'https://www.overleaf.com/project/' + dt['id']);
            copied.getElementsByClassName('custom-name')[0].innerHTML=dt['name'];
            copied.getElementsByClassName('custom-owner')[0].innerHTML=dt['owner']['firstName']+' '+dt['owner']['lastName'];
            copied.getElementsByClassName('custom-update')[0].innerHTML=dt['update'];
            if ('badge' in dt) {
                copied.getElementsByClassName('custom-badge')[0].innerHTML=dt['badge'];
                copied.getElementsByClassName('custom-color')[0].style.backgroundColor='rgb(185, 67, 240)';
            }
            template.parentNode.insertBefore(copied,previouscopied.nextSibling);
            previouscopied=copied;
        }
    }
}

