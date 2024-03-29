AFRAME.registerComponent("createbuttons", {
    init: function() {
      // 1. Crea el botón para ordenar
      var button1 = document.createElement("button");
      button1.innerHTML = "ORDENA";
      button1.setAttribute("id", "order-button");
      button1.setAttribute("class", "btn btn-danger ml-3 mr-3");
  
      // 2. Crea el botón para el resumen de la orden
      var button2 = document.createElement("button");
      button2.innerHTML = "RESUMEN";
      button2.setAttribute("id", "order-summary-button");
      button2.setAttribute("class", "btn btn-danger ml-3");
  
      // 3. Añadelos en algún lugar
      var buttonDiv = document.getElementById("button-div");
      buttonDiv.appendChild(button2);
      buttonDiv.appendChild(button1);
    }
  });