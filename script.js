document.addEventListener('scroll', function (e) {
    document.querySelector('.loader').style.width= (window.pageYOffset/(e.target.scrollingElement.scrollHeight - 754))*100+"%";
  });


document.addEventListener('scroll', function (e) {
    document.querySelector('#left').style.transform = "translate3d(-"+ window.pageYOffset+"px, "+window.pageYOffset +"px, 0px)"
    document.querySelector('#right').style.transform = "translate3d("+ window.pageYOffset+"px, "+window.pageYOffset +"px, 0px)";

    if(window.pageYOffset>360){
        $('#left').fadeOut(10);
        $('#right').fadeOut(10);
        }else {
            $('#left').fadeIn();
            $('#right').fadeIn();
        }
        


    });

    function toString(n){
        switch (n) {
            case 0:
                return "Jan";
            case 1:
                return "Feb";
            case 2:
                return "Mar";
            case 3:
                return "Apr";
            case 4:
                return "May";
            case 5:
                return "Jun";
            case 6:
                return "Jul";
            case 7:
                return "Aug";
            case 8:
                return "Sep";
            case 9:
                return "Oct";
            case 10:
                return "Nov";
            case 11:
                return "Dec";
        }
    }


    var count = document.getElementsByClassName('countUp');

    function countUp(target, number, incrementFactor){
        var i=0;
        setInterval(myf, 10);
        function myf(){
            if(i>=number){return;}
            i=i+incrementFactor;
            if(i>number){i=number;}
            target.innerText=i;
            
    
        }
    }
    //Dates
    var d = new Date();
    dates=[];
    for(var i=1;i<=6;i++){
        var m1 = new Date();
        m1.setDate(d.getDate()-i)
        dates.push(m1);
    }
    


    //
var obj;
var copy=[];
$('#newdata').on('click', function(e){
    $(".overlay").fadeOut();
    var xhr= new XMLHttpRequest();
    xhr.open('GET', 'https://data.covid19india.org/data.json', true);

    xhr.onload= function (){
        obj = JSON.parse(this.responseText);
        document.getElementById('caseval').innerHTML=obj.cases_time_series[obj.cases_time_series.length-1].totalconfirmed;
        document.getElementById('caseinc').innerHTML=obj.cases_time_series[obj.cases_time_series.length-1].dailyconfirmed;
        document.getElementById('deathval').innerHTML=obj.cases_time_series[obj.cases_time_series.length-1].totaldeceased;
        document.getElementById('deathinc').innerHTML=obj.cases_time_series[obj.cases_time_series.length-1].dailydeceased;
        document.getElementById('rval').innerHTML=obj.cases_time_series[obj.cases_time_series.length-1].totalrecovered;
        document.getElementById('rinc').innerHTML=obj.cases_time_series[obj.cases_time_series.length-1].dailyrecovered;;
        copy=[]
        for (var i=0;i<obj.statewise.length;i++){
            copy.push(obj.statewise[i]);
        }

    }
   
    xhr.send();
    setTimeout(up, 500);
    function up(){
        for (var p=0 ; p < count.length ; p++){
            countUp(count[p], count[p].innerText, Math.floor(count[p].innerText/200));
        }

        //
        google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Year', 'Infected', 'Recovered'],
          ["Perspective",  0,    0],
          [dates[5].getDate()+' '+toString(dates[5].getMonth()),  obj.cases_time_series[obj.cases_time_series.length-7].totalconfirmed,      obj.cases_time_series[obj.cases_time_series.length-7].totalrecovered],
          [dates[4].getDate()+' '+toString(dates[4].getMonth()),  obj.cases_time_series[obj.cases_time_series.length-6].totalconfirmed,      obj.cases_time_series[obj.cases_time_series.length-6].totalrecovered],
          [dates[3].getDate()+' '+toString(dates[3].getMonth()),  obj.cases_time_series[obj.cases_time_series.length-5].totalconfirmed,       obj.cases_time_series[obj.cases_time_series.length-5].totalrecovered],
          [dates[2].getDate()+' '+toString(dates[2].getMonth()),  obj.cases_time_series[obj.cases_time_series.length-4].totalconfirmed,      obj.cases_time_series[obj.cases_time_series.length-4].totalrecovered],
          [dates[1].getDate()+' '+toString(dates[1].getMonth()),  obj.cases_time_series[obj.cases_time_series.length-3].totalconfirmed,      obj.cases_time_series[obj.cases_time_series.length-3].totalrecovered],
          [dates[0].getDate()+' '+toString(dates[0].getMonth()), obj.cases_time_series[obj.cases_time_series.length-2].totalconfirmed ,       obj.cases_time_series[obj.cases_time_series.length-2].totalrecovered],
          [d.getDate()+' '+toString(d.getMonth()),  obj.cases_time_series[obj.cases_time_series.length-1].totalconfirmed,      obj.cases_time_series[obj.cases_time_series.length-1].totalrecovered]
        ]);

        var options = {
          title: 'Week Stats',
          curveType: 'function',
          legend: { position: 'bottom' }
        };

        var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

        chart.draw(data, options);
      }

      setTimeout(function () {
                $('.main-stat').slideDown();
            }, 400);

//


    }
    

});





var btn = document.querySelector('#getstate');
let lat, lon;
let geocoded;
var robj;
function success(position){

    
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    var xhr1 = new XMLHttpRequest();
    xhr1.open('GET', 'https://api.opencagedata.com/geocode/v1/json?q='+lat+'+'+lon+'&key=61ca76559d2148ec8094058f94ec76d8', true);
    xhr1.onload= function(){
       

        geocoded=JSON.parse(this.responseText);
        document.getElementById('tagstate').innerHTML=geocoded.results[0].components.state;
        document.getElementById('tagregion').innerHTML= geocoded.results[0].components.county+",   "+ geocoded.results[0].components.state_district;
        var xhr2 = new XMLHttpRequest();
        xhr2.open('GET', 'https://data.covid19india.org/state_district_wise.json', true);
        xhr2.onload=function(){
            robj=JSON.parse(this.responseText)
            document.getElementById('activeregion').innerHTML = robj[geocoded.results[0].components.state].districtData[geocoded.results[0].components.state_district].active
            document.getElementById('infectedregion').innerHTML = robj[geocoded.results[0].components.state].districtData[geocoded.results[0].components.state_district].confirmed
            document.getElementById('deathregion').innerHTML = robj[geocoded.results[0].components.state].districtData[geocoded.results[0].components.state_district].deceased
            document.getElementById('recoveredregion').innerHTML = robj[geocoded.results[0].components.state].districtData[geocoded.results[0].components.state_district].delta.recovered
            
            var o;
            for(o=0;0<copy.length;o++){
                if(copy[o].state===geocoded.results[0].components.state){break;}
            }
            document.getElementById('activestate').innerHTML = copy[o].active
            document.getElementById('infectedstate').innerHTML = copy[o].confirmed
            document.getElementById('infectedstateinc').innerHTML = copy[o].deltaconfirmed
            document.getElementById('deathstate').innerHTML = copy[o].deaths
            document.getElementById('deathstateinc').innerHTML = copy[o].deltadeaths
            document.getElementById('recoverstate').innerHTML = copy[o].recovered
            document.getElementById('recoverstateinc').innerHTML = copy[o].deltarecovered
           
    
        }
        
        xhr2.send();




        setTimeout(function (){$('.region').slideDown();
        $('.state').slideDown(10);}, 10);
       
    }
    
    xhr1.send();





   
}
function fail(){
 
    console.error("Not Found")
}
btn.onclick = function (){
    navigator.geolocation.getCurrentPosition(success, fail);
}

