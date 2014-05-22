/*
Typography.js
A growing library of methods to support better readability through manipulation of 
type size, line length (measure) and vertical rhythm.

Some basic line length guidelines:
	1. An ideal line length should contain 45 to 75 characters.
	2. The longer the line length, the taller the line-height should be.
	3. In print, designers use a points-times-two rule. Double the font-size to get the proper line length in picas. 
       For example, if the font height is 11 points, then the line length is 22 picas or about 3.5.
 Some basic vertical rhythm guidelines 
 	1. Everything should be lined up on an imaginary grid of evenly spaced horizontal lines
 	2. Vertical rhythm is contributed to by font-size, line-height, and margin size
 	3. Set the base font-size and line-height
 		a. Standard line-height is 150% of font-size.(font-size * 1.5)
 	4. Set the Space Between Paragraphs
 		b. The spacing of paragraphs should be related to the basic line-height unit. By default, 
 		   paragraphs are spaced 1em top and bottom
 Some basic modular scale guidelines
*/

/* Line Length Helpers
--------------------------------------------- */

/* 
setTypeSizeFromLength
Set the font-size of paragraphs based on its parent element's width
so that there are roughly 75 characters per line.
	Call on resize or page laod.
	@param (possibly refactor to pass in the class name of the element whose width you want)
*/
function setTypeSizeFromLength() {
    var p = $('p')
    parent = p.parent().width();
    p.css('font-size', parent / 5 + 'rem');
}

/* Vertical Rhythm Helpers
--------------------------------------------- */