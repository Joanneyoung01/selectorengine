var $ = function (selector) {
  var elements = []; // declare an empty array
  let classEls = [], tagEls = [], idEl= null; // declare empty ids, classes and variable
  selector = selector.trim().toLowerCase(); // tidy up the selector argument

  // 1 - split selector by '.' and '#'
  var splitValues = selector.split(/(\.|\#)/g) // split them by the full stop of hashtag
  // console.log(splitValues)

  // 2 - group values into type variables (classes, id and tags) 
  for (i = 0; i < splitValues.length; i++) { // take the split up values, we are going to loop them now
    var selector = splitValues[i]; // take each separate array item, and declare that as a new type of 'selector'
    // console.log(splitValues);

    // 3 - check type of selectors, if class or id, take incremented value after '#' or '.', else store as 'tag' 
    // fetch DOM elements, store in variables/arrays
    if (selector.charAt(0) === '.') { // if selector starts with a full stop
      className = splitValues[++i] // (some_class) increment after full stop once, then take the value after that full stop e.g 'some_class' store as 'className'
      classEls = Array.from(document.getElementsByClassName(className)); // cross check it in the DOM, fetch the dom elements that include 'className'
      continue; // carry on to next loop
    } else if (selector.charAt(0) === '#') { // if the charactor starts with a hash
      idName = splitValues[++i] // (some_id) increment after hashtag once, then take the value after that e.g 'some_id' store as 'idName'
      idEl = document.getElementById(idName); // get dom elements by looking for 'some_id'
      continue; // carry on
    } else if (selector === '') {  // if it's blank, skip it
      continue;
    } else {
      tagEls = Array.from(document.getElementsByTagName(selector)); // everything else falls into tagEls, makes an array from items fetched by selector
      // console.log(selector);
    }
  }

  // 4 - create array of variables, filter out duplicates and empty values
  collatedArray = [...classEls, idEl, ...tagEls]; // Creates a new Array instance with a variable number of arguments, regardless of number or type of the arguments from classEls, id El, tagEls
  collatedArray = new Set(collatedArray) // remove dupes
  let tempElements = Array.from(collatedArray).filter(el => el != null);  //creates a new elements from the collated array, filters out any empties like """ 
  // console.log(tempElements);

  // too many elements were being returned, so I had to check them against whether it's empty or valid
  // 5 - validate array elements on intersection, only return true values and push to elements array
  for (i = 0; i < tempElements.length; i++)  { // take the temp elements array
    let tmp = tempElements[i]; // take each integer and it's now a 'tmp' // elements <div id="some_id"> etc 
    let valid = true // declaring a valuable to be used later
    // console.log(tempElements); // returns all of the elements in the dom 

    // idEl is not empty, AND a tmp is a node from the Dom (<div id="some id") then it's false
    if (idEl !== null && idEl !== tmp) {
      valid = false;
    } 
    // ifClassEls isn't an empty array AND classEls array doesn't include the node tmp then it's false
    if (classEls.length > 0 && !classEls.includes(tmp)) {
      valid = false;
    }
    //if tagEls array isn't empty AND it doesn't include the node for tmp then it's false
    if (tagEls.length > 0 && !tagEls.includes(tmp)) {
      valid = false;
    }
    // otherwise its true, and can be pushed to the elements array
    if (valid === true) {
      elements.push(tmp);
    }

  }

  // 6 - return final elements array 
  return elements; 

}



