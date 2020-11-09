////////BARGRAPH///////////////////////////////	
	else {if (type == "bar") 
	{ 
	duobleload = 0;
		if (seriesselect == 'Stylesheets/commodities.csv'){series = "EU";csvreso = datapath + csv; parseDate = d3.time.format("%d.%m.%Y").parse; totiparse =  d3.time.format("%d.%m.%Y")	}
		if (rseries == "m" )		{parseDate = d3.time.format("%d.%m.%Y").parse; 			csvreso = datapath +"m"+csv + ".csv";												dateparser = d3.time.format("%Y-%m");		totiparse =  d3.time.format("%m.%Y")}
		else if (rseries == "y"  )	{parseDate = d3.time.format("%d.%m.%Y").parse; 			csvreso = datapath +"y"+csv + ".csv";												dateparser = d3.time.format("%Y");			totiparse =  d3.time.format("%Y") }
		else if (rseries == "d"  )	{parseDate = d3.time.format("%d.%m.%Y").parse; 			csvreso = datapath +"d"+csv +"_01-01-"+InputStartYear +".csv";						dateparser = d3.time.format("%Y-%m-%d"); 	totiparse =  d3.time.format("%d.%m.%Y")}
		else if (rseries == "h"  )	{
			if(hourly=="no"){
				parseDate = d3.time.format("%d.%m.%Y").parse; 			csvreso = datapath +"d"+csv +"_01-01-"+InputStartYear +".csv";						dateparser = d3.time.format("%Y-%m-%d"); 	totiparse =  d3.time.format("%d.%m.%Y %H")
			}
			else{
				parseDate = d3.time.format("%d.%m.%Y %H:%M:%S").parse; csvreso = datapath +"h"+csv +"_01-"+ InputStartMonthNr +"-"+InputStartYear +".csv" ;	dateparser = d3.time.format("%Y-%m-%d %H");	totiparse =  d3.time.format("%d.%m.%Y %H")
			}
		}

		var e = document.getElementById("cntry");
		var series = mapcountry
		var barcsv = csv;
		header = new Array;

		var data =  new Array;
		d3.csv(csvreso,  function(error, data) {
			if (error) throw error;	
		    causes = new Array;
			header = d3.keys(data[0]);
			for (i=2;i<header.length;i++){causes[i-2]= header[i];}
		});

		unfiltered 	= new Array;
		//if (rseries == "h"  ){InputEndDatex = InputEndDate.setHours(InputEndDate.getHours()+23) } // add 23 hours so the full day is displayed.
		//else {InputEndDatex = InputEndDate}
		//InputEndDate = dateparser(InputEndDatex)
		if (rseries == "d" && getyear(InputStartDate) < getyear(InputEndDate)){ 	csvreso2 =  datapath +"d"+csv +"_01-01-"+getyear(InputEndDate) +".csv"; 					duobleload = 1;}
		if (rseries == "h" && getmonth(InputStartDate) < getmonth(InputEndDate)&& hourly!="no"){ 	csvreso2 =  datapath +"h"+csv +"_01-"+ getmonth(InputEndDate) +"-"+InputStartYear +".csv"; 	duobleload = 1;}
		if (rseries == "h" && getyear(InputStartDate) < getyear(InputEndDate)){ 
			if(hourly=="no"){
			csvreso2 =  datapath +"d"+csv +"_01-01-"+getyear(InputEndDate) +".csv"; 					duobleload = 1;
			}
			else {
			csvreso2 =  datapath +"h"+csv +"_01-01-"+getyear(InputEndDate) +".csv"; 					duobleload = 1;
			}
		}
		if (duobleload ==1){
			queue()
				.defer(d3.csv,csvreso,typ) 
				.defer(d3.csv,csvreso2,typ) 
				.await(function(error, data1, data2) {
					unfiltered = data1.concat(data2) 
					//data = unfiltered.filter(function(d) dateparser(d.UTC) > dateparser(InputStartDate) && dateparser(d.UTC) <= dateparser(InputEndDate))
					drwabargraph(data)
				});
		}
		else{
			queue()
				.defer(d3.csv,csvreso,typ) 
				.await(function(error, unfiltered) {
					//data = unfiltered.filter(function(d) (dateparser(d.UTC) > dateparser(InputStartDate)) && (dateparser(d.UTC) <= dateparser(InputEndDate)))
					drwabargraph(data)
				});
		}

		function drwabargraph(data){
			var layers = d3.layout.stack()(causes.map(function(c) {
				return data.map(function(d) {
					return {x: d.UTC, y: d[c]};
				});
			 }));
			
			var country = d3.values(data[0]);
			// zwei x Achsen nötig einmal für korekte Datumsform und eine für die Dicke der bars
			var t= d3.time.scale()
				.domain(d3.extent(data,function(d){
					return d.UTC;
				}))	
				.range([0, width]);
			
			var x = d3.scale.ordinal()
				.rangeBands([0, width],.02);

			var y = d3.scale.linear()
				.rangeRound([height, 0]);
					
			var xAxis = d3.svg.axis()
				.scale(t)   
				.orient("bottom")
				//.tickPadding(6)
				.ticks(width/250)
				.tickFormat(axisformat);
			
			var yAxis = d3.svg.axis()
			    .scale(y)
				.orient("left")
				.ticks(4);
				//.tickSize(0-width)  //auskommentiert: keine Linien sichtbar
		
			x.domain(layers[0].map(function(d) { 
				return d.x; 
			}));
			y.domain([0, d3.max(layers[layers.length - 1], function(d) { 
					return d.y0 + d.y; 
			  })*1.1])();

			var layer = number.selectAll(".layer")
				.data(layers)
				.enter().append("g")
				.attr("class", "layer")
				.style("fill", function(d, i) { return colorscale[i]; });
			layer.selectAll("rect")
				.data(function(d) { return d; })
				.enter().append("rect")
				.attr("x", function(d) { return x(d.x); })
				.attr("y", function(d) { return y(d.y + d.y0); })
				.attr("height", function(d) { return y(d.y0) - y(d.y + d.y0)+1; })
				.attr("width", x.rangeBand()+2)

			number.append("svg:g")
				.attr("class", "axis xaxis")
				.attr("transform", "translate(0," + height + ")")
				.call(xAxis)
				.selectAll("text")
				.attr("transform", "rotate(0)" );
			number.append("svg:g")
				.attr("class", "axis y axis")
				// .attr("transform", "translate(" + width + ",0)")
				.call(yAxis);

			var ttip = d3.scale.ordinal()
				.range(0,300);			  
	
			text = [];
			ttipid = "#tooltip" + gnumber;
			tooltip = d3.select(ttipid)
			.attr("class", "tooltip hidden");
			
			ttip.domain(d3.keys(data[1]).filter(function(key) {  return key !== "UTC" || key !== "Type" ; }));

			data.forEach(function(d) {
				var y0 = 0;
				d.values = ttip.domain().map(function(name) {  return {name: name, y0: y0, y1:  +d[name]}; });
				d.nmrofentries = d.values.length			
				timestamp = (d.values[0].y1);
				totidate = new Date(timestamp)
				totidate = totiparse(totidate)
				for (var run = 2; run < d.nmrofentries; run++){
				if (rseries == "h"){shownformat = totidate+":00"}
				else {shownformat = totidate}
				if (typeof mouseover[gnumber][totidate] == 'undefined'){mouseover[gnumber][totidate]= shownformat+"<br>"+ headline+": "+"<br>";}				
				if (+d.values[run].y1 != 0){mouseover[gnumber][totidate] = mouseover[gnumber][totidate] +"<br>"+d.values[run].name + " : " + NumbType1(d.values[run].y1); } }				
			});
								
			//brush	
			var brush = d3.svg.brush()
				.x(t)
				.on("brushend", brushed);

			layer.append("g")
				.attr("class", "x brush")
				.call(brush)
				.selectAll("rect")
				.attr("y", 0)
				.attr("height", height );

			function brushed() {
				tooltip.classed("hidden", true);
				var regex = /(.+),(.+)/ ;
				match = regex.exec(brush.extent());
				startd = match[1] ;
				endd =  match[2] ;
				if (startd == endd) {mapdate = new Date(startd); selecteddate = mapdate; change(mapdate,mapcountry) ;return;} // change mapdate on one click
				
				brushselect(startd,endd)
			}	
			  
			layer.selectAll("rect")
				.on("mousemove", function(d) {
					var mousel = d3.event.pageX;
					var mouset = d3.event.pageY;
					var x0 = t.invert(d3.mouse(this)[0])
					var y0 = y.invert(d3.mouse(this)[1])
					getmouseposition(x0,y0,mousel,mouset)
					if (rseries == "m" )		{totiparse =  d3.time.format("%m.%Y") }
					else if (rseries == "y"  )	{totiparse =  d3.time.format("%Y") }
					else if (rseries == "d"  )	{totiparse =  d3.time.format("%d.%m.%Y") }
					else if (rseries == "h"  )	{totiparse =  d3.time.format("%d.%m.%Y %H") }
					totidate = totiparse(x0)
					tooltip.classed("hidden", false)
						.attr("style", "left:"+(ttposition)+"px;top:"+(ttheight)+"px")
						.html(mouseover[gnumber][(totidate)]);
						//.html("Date: "+formatDate(x0) + "<br>" + d.name + ": "+ NumbType(y0) );
				})
				.on("mouseout",  function(d) {
					tooltip.classed("hidden", true);
				}) 
				.on("mousedown", function(){
					if(d3.event.button === 2){
						d3.event.stopImmediatePropagation();
					};
				})
				.on('contextmenu', function (d, i) {
					tooltip.classed("hidden", true);
					d3.event.preventDefault();
					showall()
				// react on right-clicking
				});		

			var legend = number.selectAll('.legend')
				.data(causes)
				.enter()
				.append('g')
				.attr('class', 'legend')
				.attr('transform', function(d, i) {
					var height = legendRectSize + legendSpacing;
					var offset =  -10;
					var horz = width- offset;
					var vert = i * height - offset;
					return 'translate(' + horz + ',' + vert + ')';
				});
			legend.append('rect')
				.attr('width', legendRectSize)
				.attr('height', legendRectSize)
				.style("fill", function(d, i) { return colorscale[i]; })
				.style('stroke', function(d, i) { return colorscale[i]; });
			  
			legend.append('text')
				.attr('x', legendRectSize + legendSpacing)
				.attr('y', legendRectSize - legendSpacing)
				.text(function(d, i){ return causes[i]; }); 			  
		};	
		function typ(d) {
			if (d.Type == series){
				d.UTC = parseDate(d.UTC);
				causes.forEach(function(c) { d[c] = +d[c]; });
				return d;
			}
		}
	}
	