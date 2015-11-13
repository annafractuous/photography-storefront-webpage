var main = function() {
   
    //X to fade out lightbox
    $(".close").on('click', function() {
        $(".lightbox").fadeOut(300);
    });
    
    //ESC to fade out lightbox
    $(document).keyup(function(e) { 
        if (e.which == 27) { 
            $('.lightbox').fadeOut(300);
        }
    });
   
   //set initial number of cart items to 0
   var totalItems = 0;
   $('#items').html(totalItems);
   
   //photo object constructor
   function Photo(title,size) {
       this.title = title;
       this.size = size;
       this.price;
       this.setPrice = function(){
           switch(size){
               case "5x7":
                   this.price = 25;
                   break;
               case "8x10":
                   this.price = 40;
                   break;
               case "11x14":
                   this.price = 65;
                   break;
               case "16x20":
                   this.price = 75;
                   break;
           }
       }
       this.setPrice();
   }
   
   var cartStuff = [];
   var total = 0;
   
   //hide/display empty cart or edit cart messages
   var checkCartContents = function(){
       if(cartStuff.length == 0) {
           document.getElementById("emptyCart").style.display = "block";
           document.getElementById("editCart").style.display = "none";
           document.getElementById("cartTotal").style.display = "none";
       }
       if(cartStuff.length > 0){
           document.getElementById("emptyCart").style.display = "none";
           document.getElementById("editCart").style.display = "block";
           document.getElementById("cartTotal").style.display = "block";
       }
    }
    
    $('.sizeSelect').change(function() {
        
    });
    
    checkCartContents();
   
   //add new items to cart summary
   var printCart = function(){
        var table = document.getElementById("ordersumm");
        var row = table.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        
        cell1.className = "titleCell";
        cell2.className = "sizeCell";
        cell3.className = "priceCell";
        
        var i = cartStuff.length - 1;
        cell1.innerHTML = cartStuff[i].title;
        cell2.innerHTML = cartStuff[i].size;
        cell3.innerHTML = "$" + cartStuff[i].price;
        
        total += cartStuff[i].price;
        $("#sumtotal").html(total);
   }
   
   $('.addtoCart').click(function(event){
        //get print ID, title & size
        var print = event.target.className.split(" ")[1];
        var title = $("h4."+print).text();
        var size = $("select."+print).val();
        
        if (size == null) {
            alert("Please select a print size.");
        }
        
        else {
        //cart counter
        totalItems += 1;
        $('#items').html(totalItems);
        
        //add print to cart
        var newPrint = new Photo(title, size);
        cartStuff.push(newPrint);
        checkCartContents();
        printCart();
        
        //reset print size drop-down
        $('.sizeSelect').val("");
        }
   })
   
};

$(document).ready(main);