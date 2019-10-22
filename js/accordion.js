function Accordion(options) {
 // selecting our div with id = my-accordion to add appropriate classes for grid and accordion
  var accordionSelector = document.getElementById(options.container);
  accordionSelector.classList.add('accordion');
  accordionSelector.classList.add('col-sm-8');
  accordionSelector.classList.add('col-lg-7');

  // create wrapper container for accordion in order to make grid work
  var wrapper = document.createElement('div');
  wrapper.classList.add('cols');

  // insert wrapper before accordionSelector in the DOM tree
  accordionSelector.parentNode.insertBefore(wrapper, accordionSelector);

  // move accordionSelector into wrapper
  wrapper.appendChild(accordionSelector);

  // check if there is mainTitle in options, in order to create it
  if ( options.mainTitle ) {
    // create tab for main header of the accordion
    var accordionTab = document.createElement('div');
    accordionTab.classList.add('accordion__tab');
    accordionTab.classList.add('accordion__tab--main');
    accordionTab.setAttribute('id', 'accordion-tab-header-main');

    // create main title
    var accordionTitle = document.createElement('h2');
    accordionTitle.classList.add('accordion__title');
    accordionTitle.classList.add('accordion__title--main');
    accordionTitle.innerHTML = options.mainTitle;

    // appending everything created to the DOM, to create the structure
    document.getElementById(options.container).appendChild(accordionTab);
    document.getElementById(accordionTab.id).appendChild(accordionTitle);
  }

  // iterate through panels, in order to start creating each one of them in the DOM
  for (var i = 0; i < options.panels.length; i++) {
    // create accordion tab for this item of the array
    var accordionTab = document.createElement('div');
    accordionTab.classList.add('accordion__tab');
    accordionTab.classList.add('accordion__tab--expandable');
    accordionTab.setAttribute('id', 'accordion-tab-' + i);

    // create accordion header for this item of the array
    var accordionHeader = document.createElement('div');
    accordionHeader.classList.add('accordion__header');
    accordionHeader.setAttribute('id', 'accordion-header-' + i);

    // create accordion icon for this item of the array
    var accordionArrowDown = document.createElement('i');
    accordionArrowDown.classList.add('material-icons');
    accordionArrowDown.classList.add('accordion__arrow__down');
    accordionArrowDown.innerHTML = "keyboard_arrow_down";

    // create accordion icon for this item of the array
    var accordionArrowUp = document.createElement('i');
    accordionArrowUp.classList.add('material-icons');
    accordionArrowUp.classList.add('accordion__arrow__up');
    accordionArrowUp.innerHTML = "keyboard_arrow_up";

    // create accordion header container for this item of the array
    var accordionHeaderContainer = document.createElement('div');
    accordionHeaderContainer.classList.add('accordion__header__container');
    accordionHeaderContainer.setAttribute('id', 'accordion-header-container' + i);

    // create accordion title for this item of the array
    var accordionTitle = document.createElement('h3');
    accordionTitle.classList.add('accordion__title');
    accordionTitle.innerHTML = options.panels[i].title;

    // create accordion body for this item of the array
    var accordionBody = document.createElement('div');
    accordionBody.classList.add('accordion__body');
    accordionBody.setAttribute('id', 'accordion-body');
    accordionBody.innerHTML = options.panels[i].content;

    // declare variable for the subtitle, which will store created h4 within to append it to headerContainer
    var accordionSubtitle = null;

    if (options.panels[i].title && options.panels[i].subtitle) {
      // adding propert styling to header/body if there is a subtitle
      accordionHeader.classList.add('accordion__header--alt');
      accordionBody.classList.add('accordion__body--alt');

      // create accordion subtitle
      accordionSubtitle = document.createElement('h4');
      accordionSubtitle.classList.add('accordion__subtitle');
      accordionSubtitle.innerHTML = options.panels[i].subtitle;
    }

    // appending everything created to the DOM, to create the structure
    document.getElementById(options.container).appendChild(accordionTab);
    document.getElementById(accordionTab.id).appendChild(accordionHeader);
    document.getElementById(accordionTab.id).appendChild(accordionBody);
    document.getElementById(accordionHeader.id).appendChild(accordionHeaderContainer);
    document.getElementById(accordionHeader.id).appendChild(accordionArrowDown);
    document.getElementById(accordionHeader.id).appendChild(accordionArrowUp);
    document.getElementById(accordionHeaderContainer.id).appendChild(accordionTitle);

    // checking if there is created subtitle beforehand and appending it to headerContainer
    if (accordionSubtitle !== null) {
      document.getElementById(accordionHeaderContainer.id).appendChild(accordionSubtitle);
    }
  }

  // getting every element with selected classname
  var acc = document.getElementsByClassName("accordion__tab--expandable");

  // iterating through every element that has certain classname and attaching event listener to them
  for (var i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      // toggling class "active" in the classlist
      this.classList.toggle("active");

      // selecting the accordion__body of this certain accordion__tab
      var body = this.children[1];

      // adding necessary height for this certain accordion__body
      if (body.style.maxHeight) {
        body.style.maxHeight = null;
      } else {
        body.style.maxHeight = body.scrollHeight + "px";
      } 
    });
  }
}