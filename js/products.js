$(document).ready(function(){
    $.getJSON('data/product.json', function(products){
   $('main').attr('class', "list-group");
  var $pageList = $('<div/>').addClass('page');
  //creates an array that contains all of the data from the json

  var createProductRows = function(products) {
    //creating a new div to hold the information that is getting mapped
    var $row = $('<div/>')
      .attr('id', + products.id)
      .addClass('products-row');
    //in order to get all of the elements to react to the flex markup I needed to create a seperate div for the images
    var $images = $('<div/>');
    $('<img/>')
      .attr('src', 'img/product/thumbs/' + products.image)
      .appendTo($images);

    $images.appendTo($row);

    
    var $ul = $('<ul/>')
      .appendTo($row);

    var price = $('<li/>').text('Price: ' + products.price).appendTo($ul).css('color', 'blue');
    var desc = $('<li>').text('Description: ' + products.desc).appendTo($ul).css('color', 'blue');

    return $row;
  };
    


  var $rows = $.map(products, createProductRows);
  $($rows).addClass('all-products');
  $pageList.append($rows);
  $('main').append($pageList);
  //console.log(data);



                          //event
 $(".btn").on('click',function(event) {
    event.preventDefault();
    var searchValue = $('#input').val();
    $("main").empty();
    //$('main').append('<h2>').text(searchValue);
    
    //var searched = search(data, searchValue);
    var found = complexSearch(products, searchValue);
                                                //creating a new div to hold the information that is getting mapped
    var $searchedRows = $.map(found, createProductRows); 
    $('main').append($searchedRows);
  });
   
    
  function filterByType(products) {
    var types =  _.pluck(products, 'type');
    return _.unique(types);
  }
  var types = filterByType(products);
  console.log(types);

  function addTypes() {
    $('.dropdown-menu')
    .append(_.map(types, function(value){
      return $('<li>')
      .addClass('dropdown-items')
      .attr('href', '#')
      .append("<a>"+value+"</a>").attr('id', value);
    }));
  }

  addTypes();

  $('.dropdown-items').on('click', function(event){
      event.preventDefault();
      $('main').empty();
      var $id = this.id;
      _.each(products, function(product){
        console.log($id)
        if(product.type === $id) {
          $('main').append(createProductRows(product));
        //console.log(product);
        //$('main').append(createProductRows(product));
        }
      });
  });

function createLightBoxData(products) {
  var $box = $('<div>');
  var $images = $('<div/>');
    $('<img/>')
      .attr('src', 'img/product/')
      .appendTo($images);
      
  $box.append($images);
  var $stock = $('<div/>').text('stcok: ' + products.stock).appendTo($box).css('color', 'blue');
  
  
  var $ul = $('<ul/>')
      .appendTo($box);
      
  for (var key in products) {
      if (Array.isArray(products[key])) {
        var $li = $('<li/>').text(key + ": " + products[key]);
        
        $ul.append($li);
      }
    }
  return $box;
}

$('.products-row').on('click', function(event){
  var $id = this.id;
  //$(event.currentTarget).css('background-color', 'grey');
  $('#lightbox').fadeIn(400);
  _.each(products, function(product){
        console.log($id)
        if(product.id === $id) {
          $('#lightbox').append($('<div>').text('hey'));
          console.log(createLightBoxData(product));
        //console.log(product);
        //$('main').append(createProductRows(product));
        
        }
      });
});




  //$($page).append(createProductRows(products));
  //console.log(search(products,'Samsung'));
  
  
  
  
  
  
  
  //don't write below this line 
    });

    //wrap image in a div\//create a method called render products and takes an
    //array of products
    //think about empting the ul
    //bootstrap nav bar
    
    
});
  
  
  
  
  // ALL YOUR CODE GOES ABOVE HERE //

function isComplex(value) {
  var result = false;
  if (Array.isArray(value)) {
    result = true;
  } else if(typeof value === 'object' && value !== null) {
    result = true;
  }
  return result;
}

function complexSearch(collection, target) {
    var matches = [];
    _.each(collection, function(value) {
      if (isComplex(value)) {
        if (complexSearch(value, target).length) {
          matches.push(value);
        }
      }
      else {
        if (typeof value === 'string' && typeof target === 'string') {
          if (value.toLowerCase().indexOf(target.toLowerCase()) > -1) {
            matches.push(value);
          }
        }
        else {
          if (value === target) {
            matches.push(value);
          }
        }
      }
    });
    return matches;
  }




 




