function z(){
    var b=1000;
    function x(){
        var a =10;
        function y(){
            console.log(a,b);
        }
        y();
    }
    x();
}
z();