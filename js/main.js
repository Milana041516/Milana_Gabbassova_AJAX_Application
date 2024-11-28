(() => {

    //variables
    const hotspots = document.querySelectorAll(".Hotspot");
    const materialTemplate = document.querySelector("#material-template");
    const materialList = document.querySelector("#material-list");
    const loader = document.querySelector("#loader");
    const errorCont = document.querySelector("#error-container");
    const allContent = document.querySelector("#content-info");
    let isErrorShown = false;
  
    
    function errorHere(error) {
      if (isErrorShown) return;
      console.log(error);
  
      loader.classList.toggle('hidden');
      allContent.classList.add('hidden');
  
      const errorMessage = document.createElement('p');
      errorMessage.textContent = `Ooops, something went wrong. Please check your internet connection or try again later. Error Message ${error}`;
  
      errorCont.appendChild(errorMessage);
      isErrorShown = true; 
    }
  
    //functions
    function loadInfoBoxes() {
  
      loader.classList.toggle("hidden");
  
      fetch("https://swiftpixel.com/earbud/api/infoboxes")
      .then(response => response.json())
      .then(infoBoxes => {
        console.log(infoBoxes);
        infoBoxes.forEach((infoBox, index) => {
          let selected = document.querySelector(`#hotspot-${index + 1}`);
    
          const headingElement = document.createElement('h2');
          headingElement.textContent = infoBox.heading;
    
          const descriptionElement = document.createElement('p');
          descriptionElement.textContent = infoBox.description;
  
          const imgElement = document.createElement('img');
          imgElement.src = `images/${infoBox.thumbnail}`;
          imgElement.width = 100;
    
          selected.appendChild(headingElement);
          selected.appendChild(descriptionElement);
          selected.appendChild(imgElement);
        });
      })
      .catch(error => {
        console.log(error);
        errorHere(error);
      })
    }
  
    loadInfoBoxes();
  
    function loadMaterilaInfo() {
  
      loader.classList.toggle("hidden");
  
      fetch("https://swiftpixel.com/earbud/api/materials")
      .then(response => response.json())
      .then(materials => {
        console.log(materials)
  
        materials.forEach(material => {
          const clone = materialTemplate.content.cloneNode(true);
          const materialHeading = clone.querySelector(".material-heading");
          materialHeading.textContent = material.heading;
      
          const materialDescription = clone.querySelector(".material-description");
          materialDescription.textContent = material.description;
      
          materialList.appendChild(clone);
      
          })
      })
      .catch(error => {
        console.log(error);
        errorHere(error);
      })
      
    }
  
    loadMaterilaInfo();
  
  
    function showInfo() {
      let selected = document.querySelector(`#${this.slot}`);
      gsap.to(selected, 1, { autoAlpha: 1 });
    }
  
    function hideInfo() {
      let selected = document.querySelector(`#${this.slot}`);
      gsap.to(selected, 1, { autoAlpha: 0 });
    }
  
    //Event listeners
  
    hotspots.forEach(function (hotspot) {
      hotspot.addEventListener("mouseenter", showInfo);
      hotspot.addEventListener("mouseleave", hideInfo);
    });
  
  })();
  
  