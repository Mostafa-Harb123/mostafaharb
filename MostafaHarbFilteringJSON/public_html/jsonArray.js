
var json = [
];




let url = 'https://Filltext.com/?rows=10&fname={firstName}&lname={lastName}&category=["category1","category2","category3"]&pretty=true';

fetch(url)
        .then(res => res.json())
        .then((out) => {
            for (var i = 0; i < out.length; i++)
                json.push(out[i]);
            show(json);
        })
        .catch(err => {
            throw err
        });


function filtering(cat) {
    var arr1 = json.filter(d => d.category == cat);

    show(arr1);
}

function show(arr) {


    var div = '';
    arr.forEach(obj => {
        div += "<div class='div'><label class='fullName'>";
        var name = "";
        Object.entries(obj).forEach(([key, value]) => {
            if (key == 'fname') {
                div += value;
                name += value.substring(0, 1);
            } else if (key == 'lname') {
                div += " " + value + "</label>";
                name += " " + value.substring(0, 1);
                div += "<div class='ab'>" + name + "</div>";
            } else
            if (key == 'category')
                div += "<div class='categories'>" + value + "</div>";

        });
        div += "</div>";
    });

    document.getElementById('result').innerHTML = div;
}

function getArray() {
    var num = document.getElementById("numRow").value;
    var catvalue = document.getElementById("cat").value;
    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;

    if (fname == '')
        fname = "{firstName}";
    if (lname == '')
        lname = "{lastName}";
    if (num == '')
        num = 10;
    if (catvalue=='')
        catvalue = "category1,categiry2,category3";


    var cats = catvalue.split(",");
    var arrcat = '[';
    var btns = "";
    for (var i = 0; i < cats.length; i++) {
        arrcat += '"' + cats[i] + '"';
        btns += "<button onclick=\"filtering('" + cats[i] + "')\">" + cats[i] + "</button>";
        if (i != cats.length - 1)
            arrcat += ',';
    }
    arrcat += "]";
    btns += "<button onclick=\"show(json)\">Reset</button>";

    document.getElementById("btns").innerHTML = btns;
    let url = 'https://Filltext.com/?rows=' + num + '&fname=' + fname + '&lname=' + lname + '&category=' + arrcat + '&pretty=true';

    json = [];
    fetch(url)
            .then(res => res.json())
            .then((out) => {
                for (var i = 0; i < out.length; i++)
                    json.push(out[i]);
                show(json);
            })
            .catch(err => {
                throw err
            });

}


