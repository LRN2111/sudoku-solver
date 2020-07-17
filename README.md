# sudoku-solver
Web page for solving basic 9x9 sudoku puzzles

Works for basic puzzles.

Example inputs:
xx9xx2xx5,538x64xx9,162xxxx3x,xx3x27xxx,x546xx1xx,xx7x1534x,3xx8x19x6,7xx3xx85x,x91xxx47x
5xx4x9726,xx4x6xx3x,xx7xxxx41,xxx748x9x,xx9x2x1xx,x8x913xxx,35xxxx9xx,x7xx3x6xx,1486x5xx3


Currently crashes if the puzzle is too difficult - loop goes on forever. 
Tried to use a break statement to get out of this at the point that the iterateSolution() function has no effect, but couldn't get it to work. 
