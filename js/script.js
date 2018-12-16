var selectResolution = document.getElementById("resolution");
var selectYear =  document.getElementById("year");
var selectMonth = document.getElementById("month");
var selectWeek = document.getElementById("week");
var selectDay = document.getElementById("day");

var currentResolution;
var currentYear;
var currentMonth;
var currentWeek;
var currentDay;

let t;

var temperatureChart = new Chart(document.getElementById("temperature-graph"));
var humidityChart = new Chart(document.getElementById("humidity-graph"));

selectResolution.addEventListener("change", function(){
    currentResolution = this.options[this.selectedIndex].value;

    selectMonth.style.display = "none";
    selectWeek.style.display = "none";
    selectDay.style.display = "none";

    if(selectYear.options.length <= 0){
        t  = document.createElement("option");
        t.text = "År";

        selectYear.add(t);
        
        $.ajax("api/?action=get_years")
        .done(function(responseText){
            var years = responseText.years;

            for(let i = 0; i < years.length; i++){
                var temp = document.createElement("option");

                var d = new Date(years[i]);

                temp.text = d.getFullYear();
                temp.value = d.getFullYear();

                selectYear.add(temp);
            }
            selectYear.style.display = "";
        })

        
    }
    
})

selectYear.addEventListener("change", function(){
    currentYear = this.options[this.selectedIndex].value;


    switch(currentResolution){
        case "week":
            $(selectWeek).empty();
            t  = document.createElement("option");
            t.text = "Vecka";
    
            selectWeek.add(t);
            
            $.ajax("api/?action=get_weeks&year=" + currentYear)
            .done(function(responseText){
                var weeks = responseText.weeks;
    
                for(let i = 0; i < weeks.length; i++){
                    var temp = document.createElement("option");
    
                    temp.text = weeks[i];
                    temp.value = weeks[i];
    
                    selectWeek.add(temp);
                }
                selectWeek.style.display = "";
            })
            break;
        default: 
            $(selectMonth).empty();
            t  = document.createElement("option");
            t.text = "Månad";
    
            selectMonth.add(t);
            
            $.ajax("api/?action=get_months&year=" + currentYear)
            .done(function(responseText){
                var months = responseText.months;
    
                for(let i = 0; i < months.length; i++){
                    var temp = document.createElement("option");
    
                    temp.text = months[i];
                    temp.value = months[i];
    
                    selectMonth.add(temp);
                }
                selectMonth.style.display = "";
            })
    }
    
})

selectMonth.addEventListener("change", function(){
    currentMonth = this.options[this.selectedIndex].value;

    $(selectDay).empty();
    t  = document.createElement("option");
    t.text = "Dag";

    selectDay.add(t);
    
    $.ajax("api/?action=get_days&year=" + currentYear + "&month=" + currentMonth)
    .done(function(responseText){
        var days = responseText.days;

        for(let i = 0; i < days.length; i++){
            var temp = document.createElement("option");

            temp.text = days[i];
            temp.value = days[i];

            selectDay.add(temp);
        }
        selectDay.style.display = "";
    })
    
})

selectWeek.addEventListener("change", function(){
    currentWeek = this.options[this.selectedIndex].value;

        
    $.ajax("api/?action=get_week&year=" + currentYear + "&week=" + currentWeek)
    .done(function(responseText){
        var temperatures = responseText.temperatures;
        var humidity = responseText.humidity;

        temperatureChart.update(temperatures);
        humidityChart.update(humidity);
    
    })
    
})

selectDay.addEventListener("change", function(){
    currentDay = this.options[this.selectedIndex].value;

        
    $.ajax("api/?action=get_day&year=" + currentYear + "&month=" + currentMonth + "&day=" + currentDay)
    .done(function(responseText){
        var temperatures = responseText.temperatures;
        var humidity = responseText.humidity;

        temperatureChart.update(temperatures);
        humidityChart.update(humidity);
    
    })
    
})