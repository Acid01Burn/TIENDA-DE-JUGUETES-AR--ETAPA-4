var uid = null;
AFRAME.registerComponent("markerhandler",{
    init: async function(){
        var toys = await this.getToys();

        if(uid === null){
            this.askUserId();
        }

        this.el.addEventListener("markerFound", () => {
            if (uid !== null){
                this.handleMarkerFound(toys, markerId);
            }      
        });

        this.el.addEventListener("markerLost",() => {
                this.handleMarkerLost();
        });
    },

    askUserId: function(){
        var iconUrl = 
        "https://raw.githubusercontent.com/whitehatjr/ar-toy-store-assets/master/toy-shop.png"

        swal({
            title: "Welcome to Toy Shop!!",
            icon: iconUrl,
            content: {
                element: "input",
                attributes: {
                    placeholder: "Escribe tu ID de usuario, por ejemplo:(U01)"
                }
            }
        }).then(inputValue => {
            uid = inputValue;
        });
    },
    handleMarkerFound: function(toys, markerId){
        var toy = toys.filter(toy => toy.id === markerId)[0];

    if (toy.is_out_of_stock) {
      swal({
        icon: "warning",
        title: toy.toy_name.toUpperCase(),
        text: "This toy is out of stock!!!",
        timer: 2500,
        buttons: false
      });
    } else {
      // Cambiar la escala del modelo a la escala inicial
      var model = document.querySelector(`#model-${toy.id}`);
      model.setAttribute("position", toy.model_geometry.position);
      model.setAttribute("rotation", toy.model_geometry.rotation);
      model.setAttribute("scale", toy.model_geometry.scale);

      // Hacer el modelo visible
      var model = document.querySelector(`#model-${toy.id}`);
      model.setAttribute("visible", true);

      // hacer visible el Container mian plane
      var mainPlane = document.querySelector(`#main-plane-${toy.id}`);
      mainPlane.setAttribute("visible", true);

      // Cambiar el boton div visible
      var buttonDiv = document.getElementById("button-div");
      buttonDiv.style.display = "flex";

      var orderButtton = document.getElementById("order-button");
      var orderSummaryButtton = document.getElementById("order-summary-button");

      // Manejo de eventos Click
      orderButtton.addEventListener("click", () => {
        uid = uid.toUpperCase();
        this.handleOrder(uid, toy);

        swal({
          icon: "https://i.imgur.com/4NZ6uLY.jpg",
          title: "Thanks For Order !",
          text: "  ",
          timer: 2000,
          buttons: false
        });
      });

      orderSummaryButtton.addEventListener("click", () => {
        swal({
          icon: "warning",
          title: "Order Summary",
          text: "Work In Progress"
        });
      });
    }
    },

    handleMarkerLost: function(){
        var buttonDiv = document.getElementById("button-div");
        buttonDiv.style.display = "none";
    }
});