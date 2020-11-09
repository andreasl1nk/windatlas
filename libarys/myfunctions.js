/////FUNCTIONS///////////
 //Helpmenu
 function helpmenu(){
 d3.text("help.txt", function(text) {
alert(text);
});
	}
		
 
//get Mouse location and change mouseover[gnumber] Position
function getmouseposition(x0,y0,mousel,mouset){
	ttheight = 600
	if (+mousel > 1500){ttposition = 23}
	else {ttposition = 23 }
}

//Zoom Out
function showall()
{

	NewDateParse = d3.time.format("%d-%b-%Y")
	e = document.getElementById("from");
	actfromdate = InputDateParse(e.value)
	minfromdate = InputDateParse(initfirstdate)
	f = document.getElementById("to");
	acttodate = InputDateParse(f.value)
	g = document.getElementById("resolution");
	rseries = g.value
	if(rseries == "h") 		
	{
		actfromdate	 = 	+actfromdate - 15000000000,	diffdate = +actfromdate-minfromdate; if (diffdate <0){actfromdate = minfromdate} ;actfromdate = 	new Date(actfromdate),	startd 	= NewDateParse(actfromdate)
		acttodate	 = 	+acttodate 		+ 15000000000,	acttodate = 	new Date(acttodate),	endd 	= NewDateParse(acttodate)
		newreso 	 = "d"	
	}
	else if(rseries == "d") {
		startd = initfirstdate,endd =lastdate 
		newreso = "m"	
	}
	else if(rseries == "m") {
		startd = initfirstdate,endd = lastdate, newreso = "y"				//hier kann auch auf xmax xmin verwiesen werden wenn dies in den styleshets stehen
	}
	else 					{
		startd = initfirstdate,endd = lastdate, newreso = "y" 
	}
	e.value = startd
	f.value = endd
	g.value = newreso
	mapdate = actfromdate;
	selecteddate = mapdate;
	change(mapdate, mapcountry)
}

//Zoom In
function brushselect(startd,endd)
{
	NewDateParse = d3.time.format("%d-%b-%Y")
	g = document.getElementById("resolution");
	res = g.value 
	startd = new Date(startd);
	mapdate = startd
	selecteddate = mapdate;
	endd = new Date(endd);
	tinterval = endd-startd
	startd = NewDateParse(startd)
	endd = NewDateParse(endd)
	if(+tinterval < 3000000000){res = "h"}					//ab ca einem Monat
	else if (+tinterval < 25000000000){res = "d"}			// ab ca einem Jahr
	//else {res = "m"}
	g = document.getElementById("resolution");
	g.value = res
	e = document.getElementById("from");
	e.value = startd
	f = document.getElementById("to");
	f.value = endd
	h = document.getElementById("drpdwn");
	mapcountry = h. value
	change(mapdate,mapcountry)
}

//move x Axis (<<  >>)
 function movebutton(vorzeichen)
 {
 	g = document.getElementById("resolution");
	var res = g.value	
  	e = document.getElementById("from");
	f = document.getElementById("to");
	h = document.getElementById("drpdwn");
	mapcountry = h.value
	InputDateReParse = d3.time.format("%d-%b-%Y");
	newstartd = InputDateParse(e.value);
	newstartd = new Date(newstartd);
	newendd = InputDateParse(f.value);
	newendd = new Date(newendd);
	tinterval = (newendd-newstartd)/3
	days = tinterval/1000/60/60/24
	if (res == "y"){days =0}
	days = days *vorzeichen
	newstartd.setDate(newstartd.getDate() + days);
	newendd.setDate(newendd.getDate() + days);
	mapdate = newstartd
	newstartd = InputDateReParse(newstartd)
	e.value = newstartd
	newendd = InputDateReParse(newendd)
	f.value = newendd
	change(mapdate,mapcountry)

  }


//set the centerposition of the countries tran1 and tran2 set the middle of the map, sca set the zoomlevel, clat and clon change the position of the countryname in the map 
function centercountry(land){
	switch(land){
			case "Germany": 			 tran1 = -500; tran2 = 350; sca = 200;  clat =0;  clon = 0; shortname = "DE";break;
			case"Albania": 				  tran1 = -500; tran2 = 350; sca = 200; clat =-1;  clon =1; shortname = "AL";break;
			case"Austria": 				 tran1 = -500; tran2 = 350; sca = 200; clat =0;  clon = 0.3; shortname = "AT";break;
			case"Belarus": 				  tran1 = -500; tran2 = 350; sca = 200; clat =0;  clon = 0; shortname = "BY";break;
			case"Belgium": 				  tran1 = -500; tran2 = 350; sca = 200; clat =-0.2;  clon = 0.6; shortname = "BE";break;
			case"Bosnia Herzegovina": 	 tran1 = -500; tran2 = 350; sca = 200; clat =0;  clon = 0.4; shortname = "BA";break;
			case"Bulgaria": 			  tran1 = -500; tran2 = 350; sca = 200; clat =0;  clon = 0.4; shortname = "BG";break;
			case"Croatia": 				  tran1 = -500; tran2 = 350; sca = 200; clat =-1;  clon = 2; shortname = "HR";break;
			case"Czech Republic": 		  tran1 = -500; tran2 = 350; sca = 200; clat =0;  clon = 0.5; shortname = "CZ";break;
			case"Cyprus": 				 tran1 = -500; tran2 = 350; sca = 200; clat =0;  clon = 0; shortname = "CY";break;
			case"Denmark": 				  tran1 = -500; tran2 = 350; sca = 200; clat =0;  clon = 0; shortname = "DK";break;
			case"Estonia":				  tran1 = -500; tran2 = 350; sca = 200; clat =0;  clon = 0.5; shortname = "EE";break;
			case"Finland": 				  tran1 = -500; tran2 = 350; sca = 200; clat =0;  clon = 0; shortname = "FI";break;
			case"France": 				  tran1 = -500; tran2 = 350; sca = 200; clat =0;  clon = 0; shortname = "FR";break;
			case"Greece": 				  tran1 = -500; tran2 = 350; sca = 200; clat =0;  clon = 0; shortname = "GR";break;
			case"Hungary": 				 tran1 = -500; tran2 = 350; sca = 200; clat =0;  clon = 0.4; shortname = "HU";break;
			case"Ireland": 				 tran1 = -500; tran2 = 350; sca = 200; clat =0;  clon = 0; shortname = "IE";break;
			case"Italy": 				  tran1 = -500; tran2 = 350; sca = 200; clat =0;  clon = 0; shortname = "IT";break;
			case"Latvia": 				 tran1 = -500; tran2 = 350; sca = 200; clat =0;  clon = 0; shortname = "LV";break;
			case"Lithuania": 			  tran1 = -500; tran2 = 350; sca = 200; clat =0;  clon = 0.5; shortname = "LT";break;
			case"Luxembourg":			 tran1 = -500; tran2 = 350; sca = 200; clat =0;  clon = 1; shortname = "LU";break;
			case"Macedonia": 			  tran1 = -500; tran2 = 350; sca = 200; clat =0;  clon = 0.7; shortname = "MK";break;
			case"Montenegro": 			 tran1 = -500; tran2 = 350; sca = 200; clat =  -1;  clon = 1.1; shortname = "ME";break;
			case"Malta": 				  tran1 = -500; tran2 = 350; sca = 200; clat =0;  clon = 0.5; shortname = "MT";break;
			case"Netherlands": 			  tran1 = -500; tran2 = 350; sca = 200; clat =0;  clon = 0; shortname = "NL";break;
			case"Norway": 				  tran1 = -500; tran2 = 350; sca = 200; clat =-5;  clon =10; shortname = "NO";break;
			case"Poland": 				  tran1 = -500; tran2 = 350; sca = 200; clat =0;  clon = 0; shortname = "PL";break;
			case"Portugal": 			  tran1 = -500; tran2 = 350; sca = 200; clat =0;  clon = 0; shortname = "PT";break;
			case"Romania": 				  tran1 = -500; tran2 = 350; sca = 200; clat =0;  clon = 0; shortname = "EO";break;
			case"Russia": 				  tran1 = -500; tran2 = 350; sca = 200; clat =0;  clon = 0; shortname = "RU";break;
			case"Serbia": 				  tran1 = -500; tran2 = 350; sca = 200; clat =0;  clon = 1; shortname = "RS";break;
			case"Slovakia": 			 tran1 = -500; tran2 = 350; sca = 200; clat =0;  clon = 0; shortname = "SK";break;
			case"Slovenia": 			  tran1 = -500; tran2 = 350; sca = 200; clat =0;  clon = 0.6; shortname = "SL";break;
			case"Spain": 				  tran1 = -500; tran2 = 350; sca = 200; clat =0;  clon = 0; shortname = "ES";break;
			case"Sweden": 				  tran1 = -500; tran2 = 350; sca = 200; clat =-0.9;  clon = 0; shortname = "SE";break;
			case"Switzerland": 			  tran1 = -500; tran2 = 350; sca = 200; clat =0;  clon = 0.5; shortname = "CH";break;
			case"Ukraine": 				  tran1 = -500; tran2 = 350; sca = 200; clat =0;  clon = 0; shortname = "UA";break;
			case"United Kingdom": 		  tran1 = -500; tran2 = 350; sca = 200; clat =0;  clon = 0; shortname = "UK";break;
			case"onlyd": 		 		 tran1 = -500; tran2 = 350; sca = 200; clat =0;  clon = 0; shortname = "OD";break;
			default: 					  tran1 = -500; tran2 = 350; sca = 200;	clat =0;  clon = 0; shortname = "EU";break;			//show the EU map
	}
}

//changes if Dropdowns change
function changes()
{

	
	NewDateParse = d3.time.format("%d-%b-%Y")
	e = document.getElementById("from");
	actfromdate = InputDateParse(e.value)
	f = document.getElementById("to");
	acttodate = InputDateParse(f.value)
	g = document.getElementById("resolution");
	rseries = g.value
	tinterval = acttodate-actfromdate
	z = document.getElementById("szenario");
	szenario = z.value

	datapath = szenario;
	if(rseries == "h" && +tinterval > 3000000000) 		
	{
		acttodate	 = 	+actfromdate		+ 3000000000,	acttodate = 	new Date(acttodate),	endd 	= NewDateParse(acttodate)
		f.value = endd
		selecteddate =actfromdate
	}
//	else if (rseries == "d" && +tinterval > 25000000000) {
//		acttodate = 	+actfromdate		+ 25000000000,	acttodate = 	new Date(acttodate),	endd 	= NewDateParse(acttodate)
//		f.value = endd	
//		selecteddate = actfromdate
//		}


	



	change((mapdate,mapcountry))
}

//Changes on Interaction 
function change (mapdate,mapcountry)
{

	firstdate = document.getElementById("from").value;
	if (mapdate instanceof Date) {}
	else { 
		if (selecteddate instanceof Date)
			{mapdate = selecteddate}
		else 
		{
			InputDateParse = d3.time.format("%d-%b-%Y").parse;
			zwischendate = InputDateParse(firstdate);
			mapdate = zwischendate;
		}
	}
	stylecsv = document.getElementById("series").value;
	loadcsv(stylecsv,firstdate,mapdate,mapcountry);
}
//load the chart csv with the colorscales
function loadcolorscale ()
{

colour = []
avoidline = []
colorscale = []


	d3.csv("Stylesheets/chart.csv", function(err, Chart) {
			Chart.forEach(function(i){
		header = i.headline;
		colorscale[header] = [];	
		avoidline[header] = [];
		})
		Chart.forEach(function(i){
		if (i.serie == "map"){
		colour = i.r
		}
		else {
		colour = d3.rgb(i.r, i.g, i.b);
		}
		header = i.headline;
		
		if	(i.displaytype == 0){avoidline[header].push(i.serie)}
		else{colorscale[header].push(colour);}		
		})	
	})
}
//autoscalecheckbox
function autoscalecheck(checkboxElem) {
  if (checkboxElem.checked) {
	autoscalevalue =1;
	
    change()
  } else {

	autoscalevalue =0;
  }
}

//Standardscale
function rescale(mapdate){


//e = document.getElementById("mincosc");
//e.value = "";
//f = document.getElementById("maxcosc");
//f.value = "";
change (mapdate,mapcountry)
}

//modal functions 

function shownonect(){
	showncountries = []
	allco.forEach(function(entry){
	
		document.getElementById(entry).checked = false;
		})
}
function showallct(){
	showncountries = []
	allco.forEach(function(entry){
	showncountries.push(entry)
		document.getElementById(entry).checked = true;
		})
}	
				
function showeurope(){
	shownonect()
	europe27.forEach(function(entry){
		document.getElementById(entry).checked = true;
		showncountries.push(entry)
	})

}
function showenbr(){
	shownonect()
	energybrainpoollist.forEach(function(entry){
		document.getElementById(entry).checked = true;
		showncountries.push(entry)
	})

}

//Länderauswahlfunktion
function changecontry(checkboxElem,id)	{
  if (checkboxElem.checked) {
	showncountries.push(id)
	change()
  } 
  else {
	delposition = showncountries.indexOf(id) ; 
	if (delposition>= 0){ showncountries.splice(delposition,1)}
	change()
  }
  
}

		function setup(width,height){
			//projection = d3.geo.mercator()
			projection =d3.geo.naturalEarth()
			
				.translate([(tran1+(height + margin.top + margin.bottom-300)), (tran2+(height + margin.top + margin.bottom-300)*2)])				//ganz europa bei einer höhe von 300px: 75,470 scale 350
				.scale( sca+(height + margin.top + margin.bottom-300)*1.5);																			//Zoomstufe (kleinere Zahl --> weniger Zooom)
			path = d3.geo.path().projection(projection)	 	
		}
		
function exportToCsv(filename, rows) {
        var processRow = function (row) {
            var finalVal = '';
            for (var j = 0; j < row.length; j++) {
                var innerValue = row[j] === null ? '' : row[j].toString();
                if (row[j] instanceof Date) {
                    innerValue = row[j].toLocaleString();
                };
                var result = innerValue.replace(/"/g, '""');
                if (result.search(/("|,|\n)/g) >= 0)
                    result = '"' + result + '"';
                if (j > 0)
                    finalVal += '';
                finalVal += result;
            }
            return finalVal + '\n';
        };

        var csvFile = '';
        for (var i = 0; i < rows.length; i++) {
            csvFile += processRow(rows[i]);
        }

        var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, filename);
        } else {
            var link = document.createElement("a");
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", filename);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }		

