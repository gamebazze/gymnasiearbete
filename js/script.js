var selectResolution = document.getElementById("resolution");
var selectYear =  document.getElementById("year");
var selectMonth = document.getElementById("month");
var selectWeek = document.getElementById("week");
var selectDay = document.getElementById("day");
var selectHour = document.getElementById("hour");

var currentResolution;
var currentYear;
var currentMonth;
var currentWeek;
var currentDay;
var currentHour;

selectResolution.addEventListener("change", function(){
    currentResolution = this.options[this.selectedIndex].value;

    if(selectYear.options.length <= 0){
        let t  = document.createElement("option");
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
            break;
        default: 
            if(selectMonth.options.length <= 0){
                let t  = document.createElement("option");
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
    }
    
})

selectMonth.addEventListener("change", function(){
    currentMonth = this.options[this.selectedIndex].value;

    if(selectDay.options.length <= 0){
        let t  = document.createElement("option");
        t.text = "Dag";

        selectDay.add(t);
        
        $.ajax("api/?action=get_days&year=" + currentYear + "&month=" + currentMonth)
        .done(function(responseText){
            var days = responseText.days;

            console.log(days);

            for(let i = 0; i < days.length; i++){
                var temp = document.createElement("option");

                temp.text = days[i];
                temp.value = days[i];

                selectDay.add(temp);
            }
            selectDay.style.display = "";
        })

        
    }
    
})