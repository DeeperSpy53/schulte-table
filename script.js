let array = [];
let count = 1, time = 0, timerId, record;
getNumbers();

function getNumbers() 
{
    record = localStorage.getItem('record', 0);
    console.log(record);

    if(record == null)
    {
        localStorage.setItem('record', 0);
        record = 0;
    }
    document.querySelector('.record').innerHTML = "Рекорд: " + record + " сек.";
    console.log(record);

	for (let i = 0; i < 25; i++)
        array[i] = randIntExcep(1, 25, array);

    timerId = setInterval(() => {
        ++time;
        document.querySelector('.timer').innerHTML = "Время: " + time;
    }, 1000);
    showNumbers();
}

function showNumbers()
{
    let elem = document.querySelectorAll('.block__number');
	for (let i = 0; i < 25; i++)
        elem[i].innerHTML = array[i];
}

function randIntExcep(min, max, exp) 
{
    var n, exp = Array.isArray(exp) ? exp : [(isNaN(exp) ? min-1 : exp)];
    while(true)
    {
        n = Math.floor(Math.random() * (max - min + 1)) + min;
        if(exp.indexOf(n) < 0) 
            return n;
    }
}

function restart()
{
    array = [];
    count = 1;

    if(record == 0 || time < record)
        localStorage.setItem('record', time);

    clearInterval(timerId);
    time = 0;

    let elem = document.querySelectorAll('.block__number');
    for (let i = 0; i < 25; i++)
        elem[i].style.color = "#fff";

    getNumbers();
}

function onClick(elem)
{
    if(elem.innerHTML == count)
    {        
        ++count;
        elem.style.color = "#828282";

        if(count == 26)
            restart();

        let info = document.querySelector('.info');
        info.innerHTML = "Найдите: " + count;
    }
}