
function setActive(button) {
    const activelis=document.getElementsByClassName('active');
    for (const li in activelis) {
        activelis[li].className='';
    }
    button.parentNode.className='active';
}
function fetchJSONData(button = null, category) {
    fetch('bootstrap.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (category !== 'startup') {
                setActive(button);
                const template = document.getElementsByClassName('custom-tr-concrete');
                let lenTemplate = template.length;
                while (lenTemplate>0) {
                    template[0].remove();
                    lenTemplate=lenTemplate-1;
                }
            } else {
                category = 'ongoing';
            }
            initialize(category, data);
        }
        )
        .catch(error => console.error('Failed to fetch data:', error));
}

function initialize(category,data)  {
fetch('bootstrap.min.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(catdata => {
        const template = document.getElementsByClassName('custom-tr')[0];
        var previouscopied=template;
        for (let key in data) {
            let dt=data[key];
            const side=dt['name']!=="*** Libraries" && dt['name']!=="*** Libraries_Template"
            const ongoing = category==="ongoing" && !dt['trashed'] && !dt["archived"] && side;
            const all = category==="all" && !dt['trashed'];
            const archived = category==="archived" && dt['archived'] && side;
            const trash = category==="trash" && dt['trashed'] && side;
            if (ongoing || all || archived || trash) {
                const copied=template.cloneNode(true);
                copied.className='custom-tr-concrete';
                copied.setAttribute('style','');
                copied.getElementsByClassName('custom-id')[0].setAttribute('data-project-id', dt['id']);
                copied.getElementsByClassName('custom-name')[0].setAttribute('href', 'https://www.overleaf.com/project/' + dt['id']);
                copied.getElementsByClassName('custom-name')[0].innerHTML=dt['name'];
                copied.getElementsByClassName('custom-owner')[0].innerHTML=dt['owner']['firstName']+' '+dt['owner']['lastName'];
                // copied.getElementsByClassName('custom-update')[0].innerHTML=dt['update'];
                // console.log(catdata)
                if (dt['name'] in catdata) {
                    copied.getElementsByClassName('custom-badge')[0].innerHTML=catdata[dt['name']];
                    copied.getElementsByClassName('custom-color')[0].style.backgroundColor='rgb(70, 100, 180)';
                }
                if (trash) {
                    copied.getElementsByClassName('custom-badge')[0].innerHTML="---";
                    copied.getElementsByClassName('custom-color')[0].style.backgroundColor='rgb(70, 70, 70)';
                }

                template.parentNode.insertBefore(copied,previouscopied.nextSibling);
                previouscopied=copied;
            }
        }
    })
}

