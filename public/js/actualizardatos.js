//funcion propia de jquery
$(document).ready(function(){

    $('.btnact').on('click',function(){
    
       let btn= $('.btnact').index(this);
       let doc=$('.doc').eq(btn);
       let nom=$('.nom').eq(btn);
       let ape=$('.ape').eq(btn);
       let cel=$('.cel').eq(btn);
       let cor=$('.cor').eq(btn);
       
    
       let d=doc.val();
       let n=nom.val();
       let a=ape.val();
       let t=cel.val();
       let c=cor.val();
       

    
       alert(d+n+a+t+c);
    
    $.ajax({
    type:"POST",
    url:'/actualizardatos',
    data:{
        dd:d,nn:n,aa:a,tt:t,cc:c
    }
    
    });
        
    });
    
    });