function initializeTable() // fired at onload of the body and retrieved saved data
{
	var table = document.getElementById("todolist");
	// Create a new row in the table at the end of the table
	
	for(var j=0; j < localStorage.getItem("rowID");j++)
	{
		(function(){ // Nested Function to be able to preserve variables
		if(window.localStorage.getItem(j+"cell1") != null)
		{
			var i = j;
			var row = table.insertRow(-1);
			// Add Discription, Creation Time, Deadline, Category (pre-defined catagories [4]),
			// complete (checkbox), remove
			var cell1 = row.insertCell(0);
			var cell2 = row.insertCell(1);
			var cell3 = row.insertCell(2);
			var cell4 = row.insertCell(3);
			var cell5 = row.insertCell(4);
			var cell6 = row.insertCell(5);
			cell6.addEventListener("click",function(){
			if (confirm("Are you sure that you want to delete this item?")) // Ask if you want to remove
			{
				console.log(cell6.parentNode.rowIndex + " " + i + " " + j);
				localStorage.removeItem(i+"cell1");
				localStorage.removeItem(i+"cell2");
				localStorage.removeItem(i+"cell3");
				localStorage.removeItem(i+"cell4");
				localStorage.removeItem(i+"cell5");
				localStorage.removeItem(i+"cell6");
				localStorage.removeItem(i+"color");
				document.getElementById("todolist").deleteRow(cell6.parentNode.rowIndex);
			}
			}, false); // This is to delete rows

			// Retrieve the Data from Local Storage
			cell1.innerHTML = localStorage.getItem(i+"cell1");
			cell2.innerHTML = localStorage.getItem(i+"cell2").toLocaleString();
			cell3.innerHTML = localStorage.getItem(i+"cell3").toLocaleString();
			cell4.innerHTML = localStorage.getItem(i+"cell4");
			cell5.innerHTML = localStorage.getItem(i+"cell5");
			cell6.innerHTML = localStorage.getItem(i+"cell6");
			row.style.backgroundColor = localStorage.getItem(i+"color");
			console.log("Wow");
			notification(i);
		}
		}());
	}
}

function addToTable()
{
	//Find the table in the html document with id todolist
	var table = document.getElementById("todolist");

	var rowID = localStorage.getItem("rowID"); // ID is used to save data individually
	if (rowID == null)
	{
		rowID = 0;
	}
	var c = -1;
	var t = document.getElementById("catagories").children;
	console.log(t.length);
	for(var i = 0; i < t.length; i++)
	{
		console.log(t[i].value+" "+t[i].checked);
		if (t[i].checked == true)
		{
			c = t[i].value;
			var rowColor = t[i].title;
			console.log("What? "+c);
		}
	}

	// Create a new row in the table at the end of the table
	var row = table.insertRow(-1);
	// Add Discription, Creation Time, Deadline, Category (pre-defined catagories [4]),
	// complete (checkbox), remove
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);
	var cell4 = row.insertCell(3);
	var cell5 = row.insertCell(4);
	var cell6 = row.insertCell(5);
	cell6.addEventListener("click",function(){
	if (confirm("Are you sure that you want to delete this item?"))
	{	
		// Delete LocalStorage Data when row is removed
		localStorage.removeItem(rowID+"cell1");
		localStorage.removeItem(rowID+"cell2");
		localStorage.removeItem(rowID+"cell3");
		localStorage.removeItem(rowID+"cell4");
		localStorage.removeItem(rowID+"cell5");
		localStorage.removeItem(rowID+"cell6");
		localStorage.removeItem(rowID+"color");
		document.getElementById("todolist").deleteRow(cell6.parentNode.rowIndex);
	}
		}, false); // This is to delete rows
	var d = new Date();

	// Add data to page and to Storage Data
	cell1.innerHTML = document.getElementById("newDisc").value;
	localStorage.setItem(rowID+"cell1", cell1.innerHTML);
	cell2.innerHTML = d.toLocaleString();
	localStorage.setItem(rowID+"cell2", d);
	cell3.innerHTML = document.getElementById("newTime").value;
	localStorage.setItem(rowID+"cell3", cell3.innerHTML);
	cell4.innerHTML = c;
	localStorage.setItem(rowID+"cell4", cell4.innerHTML);
	cell5.innerHTML = "<input type='checkbox' class='complete' id="+rowID+"cb"+
	" onclick='updateCB("+rowID+")'></input>";
	localStorage.setItem(rowID+"cell5", cell5.innerHTML);
	cell6.innerHTML = "<button class='removeRow' id="+cell6+">x</button>";
	localStorage.setItem(rowID+"cell6", cell6.innerHTML);
	row.style.backgroundColor = rowColor;
	localStorage.setItem(rowID+"color", rowColor);
	setTimeout(notification,10000, rowID);
	localStorage.setItem("rowID", ++rowID);
}

function sortRow(n)
{
	// Bubble Sort 
	var table, rows, switching, x, y, sorted = false;
	table = document.getElementById("todolist");
	var rows = table.rows;
	var order = "up";
	var t = false;
	console.log("Pre-Loop");
	while(sorted == false)
	{	
		console.log("Loop: 1");
		switching = false;
		for(var i = 1; i < rows.length-1; i++) // Start at 1: 0 is the headings
		{
			console.log("	Loop: 2");
			x = rows[i].getElementsByTagName("td")[n];
			y = rows[i+1].getElementsByTagName("td")[n];
			if (n == 4) // If checking checkboxs
			{
				x = x.children[0].checked;
				y = y.children[0].checked;
				console.log("	"+x+" "+y);
				if (y == true && x == false && order == "up")
				{
					rows[i].parentNode.insertBefore(rows[i+1], rows[i]);
					switching = true;
					t = true;
				}
				if (y == false && x == true && order == "down")
				{
					rows[i].parentNode.insertBefore(rows[i+1], rows[i]);
					switching = true;
					t = true;
				}
			}
			else{
				console.log("	x: "+x.innerHTML + "; i : " + i + " : " + rows.length);
				console.log("	y: "+y.innerHTML);
				if (y.innerHTML.toLowerCase() < x.innerHTML.toLowerCase() && order == "up")
				{
					rows[i].parentNode.insertBefore(rows[i+1], rows[i]);
					switching = true;
					t = true;
				}
				if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase() && order == "down")
				{
					rows[i].parentNode.insertBefore(rows[i+1], rows[i]);
					switching = true;
					t = true;
				}
			}
		}
		if (t == false && switching == false && order == "down")
		{
			break;
		}
		if (t == false && order == "up" && switching == false)
		{
			console.log("down");
			order = "down"; // Already sorted, so flip orientation
		}
		if (t == true && switching == false)
		{
			break; // You are done!!
		}
	}
}

function newCat()
{
	var d = document.getElementById("newCat").value;
	var d1 = document.getElementById("newColor").value;
	if(d !== "")
	{
		var p = document.createElement("input");
		p.type = "radio";
		p.name = "cat";
		p.value = d;
		p.title = d1;
		var c = document.getElementById("catagories"); // Create New Catigory choice
		c.appendChild(p);
		var f = document.createElement("p"); // Add Catagory name to the screen
		f.textContent = p.value;
		f.style.display = "inline";
		c.appendChild(f);
	}
}
function updateCB(x)
{
	var t = "";
	if (document.getElementById(x+"cb").checked)
	{
		var t = "checked";
	}
	console.log(document.getElementById(x+"cb").checked);
	localStorage.setItem(x+"cell5", "<input type='checkbox' "+
	t+" class='complete' id='"+x+"cb"+
	"' onclick='updateCB("+x+")'></input>");
}

//Light Box Functions
var currentSlide = 1;
function getImage(x)
{
	return "p"+x+".jpg";
}

function CurrentSlide(x)
{
	currentSlide = x;
	console.log(getImage(currentSlide));
	document.getElementById("theImage").src = getImage(currentSlide);
}
function nextSlide(x,event)
{
	if(event != null)
	{
		if(event.keyCode == 37)
		{
			currentSlide += x;
		}
		else
		{
			currentSlide -= x;
		}
	}
	else
	{
		console.log(event);
		currentSlide += x;
	}
	if(currentSlide < 1)
	{
		currentSlide = 20;
	}
	if (currentSlide > 20)
	{
		currentSlide = 1;
	}
	if(event != null)
	{
		if(event.keyCode == 37)
		{
			document.getElementById("theImage").src = getImage(currentSlide);
		}
		else if (event.keyCode == 39)
		{
			document.getElementById("theImage").src = getImage(currentSlide);
		}
		else if (event.keyCode == 27)
		{
			closeBox();
		}
	}
	else{
		document.getElementById("theImage").src = getImage(currentSlide);
	}
}
function openBox()
{
	console.log("Sooo..");
	play = false;
	document.getElementById("lightbox").style.display = "block";
}
function closeBox()
{
	play = false;
	document.getElementById("lightbox").style.display = "none";
}
play = false; // Value used for slideshow playing
function nextPic()
{	
	if(play == true)
	{
		++currentSlide;
		if(currentSlide < 1)
		{
			currentSlide = 20;
		}
		if (currentSlide > 20)
		{
			currentSlide = 1;
		}
		document.getElementById("theImage").src = getImage(currentSlide);
		setTimeout(nextPic,10000); // Wait 10 Sec to change
	}
}
function playShow() //Play the Slide Show
{
	if (play == true)
	{
		play = false;
		document.getElementsByClassName("play").innerHTML = "&#x25b7";
	}
	else{
		play = true;
		document.getElementsByClassName("play").innerHTML = "&#x25fc";
		setTimeout(nextPic,10000); // Wait 10 Sec to change
	}
}

function notification(ID)
{
	console.log("called");
	var d = new Date();
	if(localStorage.getItem(ID+"cell3") != "")
	{
		console.log(localStorage.getItem(ID+"cell3")+","+d);
		console.log(d, ID, localStorage.getItem(ID+"cell3"));
		console.log(Date.parse(localStorage.getItem(ID+"cell3")) - Date.parse(d));
		if (Date.parse(localStorage.getItem(ID+"cell3")) - Date.parse(d) < 300000
		&& Date.parse(localStorage.getItem(ID+"cell3")) - Date.parse(d) > 0)
		{
			var p = document.createElement("p");
			p.id = "note";
			p.onclick = function(){document.getElementById("noteSound").parentNode.removeChild(document.getElementById("noteSound"));
				document.getElementById("note").parentNode.removeChild(document.getElementById("note"));};
			p.textContent = "5 Minute Warning to Complete "+localStorage.getItem(ID+"cell1")+" by "
			+localStorage.getItem(ID+"cell3")+"!!!";
			p.style.backgroundColor = "red";
			var c = document.getElementById("content"); // Create New Catigory choice
			c.appendChild(p);
			var f = document.createElement("audio"); // Add Catagory name to the screen
			f.setAttribute("controls","controls")
			f.setAttribute("autoplay","autoplay");
			f.setAttribute("loop","loop");
			f.setAttribute("src","sound.mp3");
			f.style.visible = false;
			f.id = "noteSound";
			c.appendChild(f);
		}
		else if (Date.parse(localStorage.getItem(ID+"cell3")) - Date.parse(d) > 0){
			setTimeout(notification,10000,ID);
		}
	}
}
