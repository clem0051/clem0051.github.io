function initializeTable()
{
	var table = document.getElementById("todolist");
	// Create a new row in the table at the end of the table
	var i = 1, more = true;
	while(more == true)
	{
		if(window.localStorage.getItem(i+"cell1") != null)
		{
			console.log("Here");
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
				var i = row.rowIndex;
				localStorage.removeItem(i+"cell1");
				localStorage.removeItem(i+"cell2");
				localStorage.removeItem(i+"cell3");
				localStorage.removeItem(i+"cell4");
				localStorage.removeItem(i+"cell5");
				localStorage.removeItem(i+"cell6");
				localStorage.removeItem(i+"color");
				document.getElementById("todolist").deleteRow(row.rowIndex);
			}
			}, false); // This is to delete rows

			cell1.innerHTML = localStorage.getItem(i+"cell1");
			cell2.innerHTML = localStorage.getItem(i+"cell2");
			cell3.innerHTML = localStorage.getItem(i+"cell3");
			cell4.innerHTML = localStorage.getItem(i+"cell4");
			cell5.innerHTML = localStorage.getItem(i+"cell5");
			cell6.innerHTML = localStorage.getItem(i+"cell6");
			row.style.backgroundColor = localStorage.getItem(i+"color");
		}
		else {more = false;}
		i++;
	}
}

function addToTable()
{
	//Find the table in the html document with id todolist
	var table = document.getElementById("todolist");

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
		localStorage.removeItem(row.rowIndex+"cell1");
		localStorage.removeItem(row.rowIndex+"cell2");
		localStorage.removeItem(row.rowIndex+"cell3");
		localStorage.removeItem(row.rowIndex+"cell4");
		localStorage.removeItem(row.rowIndex+"cell5");
		localStorage.removeItem(row.rowIndex+"cell6");
		localStorage.removeItem(row.rowIndex+"color");
		document.getElementById("todolist").deleteRow(row.rowIndex);
	}
		}, false); // This is to delete rows
	var d = new Date();

	cell1.innerHTML = document.getElementById("newDisc").value;
	localStorage.setItem(row.rowIndex+"cell1", cell1.innerHTML);
	cell2.innerHTML = d.toLocaleString();
	localStorage.setItem(row.rowIndex+"cell2", cell2.innerHTML);
	cell3.innerHTML = document.getElementById("newTime").value.toLocaleString();
	localStorage.setItem(row.rowIndex+"cell3", cell3.innerHTML);
	cell4.innerHTML = c;
	localStorage.setItem(row.rowIndex+"cell4", cell4.innerHTML);
	cell5.innerHTML = "<input type='checkbox' class='complete'></input>";
	localStorage.setItem(row.rowIndex+"cell5", cell5.innerHTML);
	cell6.innerHTML = "<button class='removeRow'>x</button>";
	localStorage.setItem(row.rowIndex+"cell6", cell6.innerHTML);
	row.style.backgroundColor = rowColor;
	localStorage.setItem(row.rowIndex+"color", rowColor);
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
		var c = document.getElementById("catagories");
		c.appendChild(p);
		var f = document.createElement("p");
		f.textContent = p.value;
		f.style.display = "inline";
		c.appendChild(f);
	}
}

//Light Box Functions
var currentSilde = 1;
function CurrentSlide(x)
{
	currentSilde = x;
}
function nextSlide(x)
{
	currentSilde += 1;
}
