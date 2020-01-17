// hamburger menu
const menuSlider = () => {
    let burgerMenu = document.getElementById('hamburger');
    let menu = document.querySelector('.menu').children[1];

    burgerMenu.addEventListener('click', function() {
        menu.classList.toggle('small')
    });
}

menuSlider();


// wether report

// get current temperature
function getData(object, str, str2) {
    for (let item in object) {
        if (item == str) {
            let res = object[item];

            if (Array.isArray(res)) {
                for (let y of res) {

                    for (let re in y) {
                        if (re == str2) {
                            return y[re];
                        }
                    }
                }
            } else {

                for (let x in res) {
                    if (x == str2) {
                        return res[x];
                    }
                }
            }
        }
    }
}

// Kelvin to Celsius
function KelToCel(kelvin) {
    if (kelvin < (0)) {
        return 'below absolute zero (0 K)';
    } else {
        return (kelvin - 273.15).toFixed(1);
    }
}

// api call

function searchWeather() {
    let input = document.getElementById('weather-search');
    let search = document.querySelector('.search__btn');

    search.addEventListener('click', apiSearch);
    window.addEventListener('keyup', apiSearch, false);

    function apiSearch(e) {
        let key = e.which || e.keyCode || 0;
        if (key === 13 || e.target.classList.contains('search__btn')) {

            let cityName = input.value;

            if (cityName) {
                input.value = ''
            }

            let xhr = new XMLHttpRequest();

            xhr.open('GET', `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=b31c7c4d10a429009cdca57719f18c34`, false);
            xhr.send();

            if (xhr.status != 200) {
                alert(`Error ${xhr.status} ${xhr.statusText}`);
            } else {
                let obj = JSON.parse(xhr.responseText);

                // temperature
                let temp = KelToCel(getData(obj, 'main', 'temp'));

                let docTemp = document.getElementById('current-temp');
                docTemp.textContent = temp;

                // description
                let desc = getData(obj, 'weather', 'description');
                let docDesc = document.querySelector('.desc');
                docDesc.innerHTML = desc;

                // wind
                let windSpeed = getData(obj, 'wind', 'speed');
                let docWind = document.querySelector('.wind-speed');
                docWind.innerHTML = `${windSpeed} m/s`;

                // rain
                let rain = getData(obj, 'rain', '1h');
                let docRain = document.querySelector('.rain');
                if (rain) {
                    docRain.innerHTML = `${rain} mm/h`;
                } else {
                    docRain.innerHTML = '--';
                }

                // snow
                let snow = getData(obj, 'snow', '1h');
                let docSnow = document.querySelector('.snow');
                if (snow) {
                    docSnow.innerHTML = `${snow} mm/h`;
                } else {
                    docSnow.innerHTML = '--';
                }
            }
        }
    }
}
searchWeather();

// hide/show top menu on scroll

let prev = window.pageYOffset;
window.onscroll = function() {
    var cur = window.pageYOffset;
    let menu = document.querySelector(".menu");

    if (prev > cur) {
        menu.style.top = "0";
        menu.style.backgroundColor = 'rgb(96, 146, 212, 0.7)';
    } else {
        menu.style.top = "-150px";
        menu.style.backgroundColor = '';
    }
    prev = cur;
}

// collapsible 

function arrowUp (icon) {
    icon.classList.toggle('fa-angle-up');
    icon.parentNode.parentNode.classList.toggle("active");

    let content = icon.parentNode.parentNode.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
};


    