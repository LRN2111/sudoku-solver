function solvePuzzle() {
    // Retrieve form input, format as array of arrays
    // each inner array contains a row of the sudoku e.g. ["x", "4", "x", "x", "1", ...]
    var input = document.forms["form_input"]["puzzle_input"].value;
    var input_lines = input.trim().split(",");
    var puzzle_array = [];
    for (var i = 0; i < input_lines.length; i++) {
        puzzle_array.push(input_lines[i].split(""));
    };
    
    // to solve puzzle, iterate over each element using iterateSolution (see below)
    // do this again and again until there are no unknowns
    do {
        iterateSolution(puzzle_array);
        var all_nums = [].concat.apply([], puzzle_array);
    } while (all_nums.includes("x"));
        
    // once there are no unknowns, can show solution on webpage
    if (!(all_nums.includes("x"))) {
        for (var i=0; i < puzzle_array.length; i++) { 
            // generates id of table row (see html) then sets this element as variable results_row
            var table_row_id = "row" + i;
            var results_row = document.getElementById(table_row_id);
            // clears table of any values (in case one solution has already been provided)
            while (results_row.hasChildNodes()) {
                results_row.removeChild(results_row.firstChild);
            }
            // adds table elements for each value to the current row of the table.
            for (var j=0; j < puzzle_array[i].length; j++) {
                var answer_element = document.createElement("td");
                answer_element.innerHTML = puzzle_array[i][j];
                results_row.appendChild(answer_element); 
            }
        }
    } 
    // return false to stop submission - retains the submission data
    return false; 
}

// function for iterating solution to puzzle
function iterateSolution(array) {
    // loop through each row, then loop through each value of the row (i, then j)
    for (var i=0; i < array.length; i++) { 
        for (var j=0; j < array[i].length; j++) { 
            var row = array[i]; // Array of 9 numbers in row i
            var col = array.map(element => element[j]); // Array of 9 numbers in col j
            // make new array (variable "square") for each line of the square around element [i][j]
            var x = Math.floor(i / 3) 
            var y = Math.floor(j / 3) 
            var squareline1 = [array[x * 3 + 0][y * 3 + 0], array[x * 3 + 0][y * 3 + 1], array[x * 3 + 0][y * 3 + 2]]; 
            var squareline2 = [array[x * 3 + 1][y * 3 + 0], array[x * 3 + 1][y * 3 + 1], array[x * 3 + 1][y * 3 + 2]];  
            var squareline3 = [array[x * 3 + 2][y * 3 + 0], array[x * 3 + 2][y * 3 + 1], array[x * 3 + 2][y * 3 + 2]];
            var square = squareline1.concat(squareline2, squareline3); // Array of 9 numbers in the relevant square
            
            // finding possible values if the current element is an unknown
            if (array[i][j] == "x") {
                var possible = [];
                // loop through numbers 1 to 9
                for (var number = 1; number <= 9; number++) {
                    // if number cannot be found in row, column or 3x3 square, it's a possibility -> add to 'possible' array
                    if (!(row.includes(number.toString())) && !(col.includes(number.toString())) && !(square.includes(number.toString()))) {
                        possible.push(number.toString());
                    } 
                };
                // if possible array only contains 1 number, that is the only option
                if (possible.length == 1) {
                    array[i][j] = possible[0];
                }
            }
        }
    }
}