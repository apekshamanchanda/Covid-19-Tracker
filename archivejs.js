var req= new XMLHttpRequest();

req.open('GET', 'https://data.covid19india.org/data.json', true);


req.onload = function(){
    var data = JSON.parse(this.responseText);
    var states  = data.statewise;
    var main = document.querySelector('.main');
   for(var i=0;i<states.length-1;i++){
       var section = $('<div></div>').addClass('section');
       var heading = $('<h2></h2>').addClass('font-effect-3d-float').text(states[i].state);

       $(section).append(heading);

       var div1 = $('<div></div>').addClass('separate');
       var div2 = $('<div></div>').addClass('separate');
       var div3 = $('<div></div>').addClass('separate');

       var ph1=$('<p></p>').addClass('heading').text('Confirmed Cases:');
       var ph2=$('<p></p>').addClass('heading').text('Recoveries:');
       var ph3=$('<p></p>').addClass('heading').text('Deaths: ');
       var pd1=$('<p></p>').addClass('data').text(states[i].confirmed);
       var pd2=$('<p></p>').addClass('data').text(states[i].recovered);
       var pd3=$('<p></p>').addClass('data').text(states[i].deaths);
        $(div1).append(ph1, pd1);
        $(div2).append(ph2, pd2);
        $(div3).append(ph3, pd3);

        $(section).append(div1, div2, div3);
        $(main).append(section);
   }



}

req.send();