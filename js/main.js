
(function() {
    var labels = document.getElementsByTagName('label')
    for (var i = 0; i < labels.length; i++) {
        labels[i].addEventListener('click', function (e) {
                if (this.className === 'open') {
                    this.className = ''
                } else {
                    this.className = 'open'
                }
                e.preventDefault();
        })
    }
    var divs = document.getElementsByClassName('four')
    document.addEventListener('click', function(e) {
       var target = e.target;
       var uncheck = true;
       for (var i = 0; i < divs.length; i++) {
            if(target === divs[i] || divs[i].contains(target)) {
            uncheck = false;
        }
       }
       if(uncheck) {
           var labels = document.getElementsByTagName('label')
           for (var i = 0; i < labels.length; i++) {
               labels[i].className = ''
           }
       }  
   }, false)
   
})(); 