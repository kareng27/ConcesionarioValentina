const connection=require('../conexion/conexion')
const cnn=connection();
const{render}=require('ejs')
const controller={};
const bcryptjs=require('bcryptjs');
//const session = require('express-session');
controller.index=(req,res,next)=>{
    res.render('login')
    res.send("error en controlador")
}



 /*inicio usuario*/
controller.consultageneralusuario=(req,res,next)=>{
    if(req.session.login){
    cnn.query('SELECT * FROM tbusuario',(err,resbd)=>{
        if(err){
          next(new Error(err))  
          console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('usuario',{datos:resbd});
        }
    }) 
}
else{
    res.redirect('/');
}
 }

controller.insertarusuario=async(req,res,next)=>{
    //console.log(req.body)
    const d=req.body.UsuId;
    const u=req.body.UsuLogin;
    const c=req.body.UsuPassword;
    const r=req.body.UsuTipo;
    const password=await bcryptjs.hash(c,8)
 

    console.log(d,u);
    cnn.query('INSERT INTO tbusuario SET?',{UsuId:d,UsuLogin:u,UsuPassword:password,UsuTipo:r},(err,resbd)=>{
        if(err){
            next(new Error(err))
        }
        else{
            //console.log(resbd);
            res.redirect('usuario')
        }
    });
    }


    controller.login=async(req,res,next)=>{
        const usu=await req.body.fullname;
        const cla=await req.body.password;
        cnn.query('SELECT * FROM tbusuario WHERE UsuLogin=?',[usu],async(err,results)=>{
            if(results!=0){
                console.log("aaaaaaaa")
                
            }
            if(err){
                next(new Error("Error de consulta login",err));
            }
            //else if(results!=0 && await(bcryptjs.compare(cla,results[0].UsuPassword))){ /*contraseña incriptada*/
             else if(results!=0 && await(cla,results[0].UsuPassword)){         
                    console.log("Datos correctossss");
                     //res.redirect('usu');
                     tipo=results[0].UsuTipo;
                     uss=results[0].UsuLogin;
                     ddc=results[0].UsuId;
                     req.session.login=true;
                     req.session.uss = results[0].UsuLogin
                     req.session.ddc = results[0].UsuId

                     switch(tipo){
                         case 'Vendedor':
                            //res.redirect('usuario');
                            
                            res.redirect('vehiculo');

                             break;

                         case 'Comprador':
                             res.redirect('vistacomprador');
                             break;

                         case 'Usuario':
                             res.redirect('vistausuario');
                             break;

                         case 'Administrador':
                             res.redirect('datos');
                             break;
                     }

                     

                    }
            else{
                     console.log("Datos incorrectos");
                     res.redirect('/');

            }
        })
    }


    /*inicio datos personales*/
    controller.consultageneraldatos=(req,res,next)=>{
        if(req.session.login){
        cnn.query('SELECT * FROM tbdatos',(err,resbd)=>{
            if(err){
              next(new Error(err))  
              console.log("Error en la consulta")
            }
            else{
                console.log(resbd)
                res.render('datos',{datos:resbd});
            }
        }) 
    }
    else{
        res.redirect('/');
    }
     }

     

     controller.insertardatos=(req,res,next)=>{
        //console.log(req.body)
        const d=req.body.DatId;
        const n=req.body.DatNombre;
        const a=req.body.DatApellido;
        const c=req.body.DatTipoId;
        const t=req.body.DatNumeroId;
        const s=req.body.DatTelefono;
        const f=req.body.DatCorreo;
     
    
        console.log(d,n);
        cnn.query('INSERT INTO tbdatos SET?',{DatId:d,DatNombre:n,DatApellido:a,DatTipoId:c,DatNumeroId:t,DatTelefono:s,DatCorreo:f},(err,resbd)=>{
            if(err){
                next(new Error(err))
            }
            else{
                //console.log(resbd);
                res.redirect('datos')
            }
        });
        }

        
    controller.actualizardatos=(req,res,next)=>{
        const docx=req.body.dd;
        const nomx=req.body.nn;
        const apex=req.body.aa;
        const corx=req.body.cc;
        const celx=req.body.tt;

        console.log("Aquiiiiiiiiiiiiiiiiii");
        cnn.query('UPDATE tbdatos set DatNombre="'+nomx+'",DatApellido="'+apex+'",DatTelefono="'+celx+'",DatCorreo="'+corx+'" WHERE DatId="'+docx+'"', (err,respbb)=>{
      
          if(err){
              next(new Error(err));
          }
          else{
              console.log("Actualizado")
              res.redirect('datosvendedor')
          }
        })
      }

    controller.consultageneraldatosvendedor=(req,res,next)=>{
                if(req.session.login){
                cnn.query('SELECT * FROM tbdatos WHERE DatId="'+[ddc]+'"',(err,resbd)=>{
                    if(err){
                      next(new Error(err))  
                      console.log("Error en la consulta")
                    }
                    else{
                        console.log(resbd)
                        res.render('datosvendedor',{datos:resbd});
                    }
                }) 
            }
            else{
                res.redirect('/');
            }
             }
        /*vehiculo*/
        controller.consultageneralvehiculo=(req,res,next)=>{
            if(req.session.login){
            cnn.query('SELECT * FROM tbvehiculo',(err,resbd)=>{
                if(err){
                  next(new Error(err))  
                  console.log("Error en la consulta")
                }
                else{
                    console.log(resbd)
                    res.render('vehiculo',{datos:resbd});
                }
            }) 
        }
        else{
            res.redirect('/');
        }
         }

         				

         controller.insertarvehiculo=(req,res,next)=>{
            //console.log(req.body)
            const d=req.body.VehiPlaca;
            const n=req.body.VehiDatId;
            const a=req.body.VehiCatId;
            const c=req.body.VehiModelo;
            const t=req.body.VehiMarca;
            const s=req.body.VehiColor;
            const f=req.body.VehiEstado;
            const l=req.body.VehiPrecio;
         
        
            console.log(d,n);
            cnn.query('INSERT INTO tbvehiculo SET?',{VehiPlaca:d,VehiDatId:n,VehiCatId:a,VehiModelo:c,VehiMarca:t,VehiColor:s,VehiEstado:f,VehiPrecio:l},(err,resbd)=>{
                if(err){
                    next(new Error(err))
                }
                else{
                    //console.log(resbd);
                    res.redirect('vehiculo')
                }
            });
            }




            


    /*inicio categorias*/
    controller.consultageneralcategoria=(req,res,next)=>{
        if(req.session.login){
        cnn.query('SELECT * FROM tbcategoria',(err,resbd)=>{
            if(err){
              next(new Error(err))  
              console.log("Error en la consulta")
            }
            else{
                console.log(resbd)
                res.render('categoria',{datos:resbd});
            }
        }) 
    }
    else{
        res.redirect('/');
    }
     }


     controller.consultageneralconsultacategoria=(req,res,next)=>{
        if(req.session.login){
        cnn.query('SELECT * FROM tbcategoria',(err,resbd)=>{
            if(err){
              next(new Error(err))  
              console.log("Error en la consulta")
            }
            else{
                console.log(resbd)
                res.render('consultacategoria',{datos:resbd});
            }
        }) 
    }
    else{
        res.redirect('/');
    }
     }

     controller.datosporcategoriavendedor=(req,res,next)=>{
        if(req.session.login){
        cnn.query('SELECT * FROM tbvehiculo INNER JOIN tbdatos ON (VehiDatId=DatId) INNER JOIN tbusuarios ON (UsuDoc=CliDoc) WHERE UsuNom="'+[uss]+'" ',(err,resbd)=>{
            if(err){
              next(new Error(err))  
              console.log("Error en la consulta")
            } 
            else{
                console.log(resbd)
                res.render('datosporcategoriavendedor',{datos:resbd});
            }
        }) 
    }
    else{
        res.redirect('/');
    }
     }

     /*vista de ambos*/
    controller.vistaambos=(req,res,next)=>{
        if(req.session.login){  
        console.log("En la de los dos")
        res.render('vistaambos')
        }
        else{
            res.redirect('/');
        }
    }
   

    /*vista comprador*/

    controller.vistacomprador=(req,res,next)=>{
        if(req.session.login){  
        console.log("En la vista comprador")
        res.render('vistacomprador')
        }
        else{
            res.redirect('/');
        }
    }



    /*fin comprador*/


/*vista usuario*/

controller.vistausuario=(req,res,next)=>{
    if(req.session.login){  
    console.log("En la vista comprador")
    res.render('vistausuario')
    }
    else{
        res.redirect('/');
    }
}

controller.vistacompradorusuario=(req,res,next)=>{
    if(req.session.login){  
    console.log("En la vista comprador")
    res.render('vistacompradorusuario')
    }
    else{
        res.redirect('/');
    }
}

controller.consultageneralconsultacategoriausuario=(req,res,next)=>{
    if(req.session.login){
    cnn.query('SELECT * FROM tbcategoria',(err,resbd)=>{
        if(err){
          next(new Error(err))  
          console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('consultacategoriausuario',{datos:resbd});
        }
    }) 
}
else{
    res.redirect('/');
}
 }

 
controller.consultaccusu=(req,res,next)=>{
    if(req.session.login){
    cnn.query('SELECT * FROM tbvehiculo WHERE VehiCatId="'+"4"+'"',(err,resbd)=>{
        if(err){
          next(new Error(err))  
          console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('dentrocategoria4usu',{datos:resbd});
        }
    }) 
}
else{
    res.redirect('/');
}
 }


 controller.consultacc3usu=(req,res,next)=>{
    if(req.session.login){
    cnn.query('SELECT * FROM tbvehiculo WHERE VehiCatId="'+"3"+'"',(err,resbd)=>{
        if(err){
          next(new Error(err))  
          console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('dentrocategoria3usu',{datos:resbd});
        }
    }) 
}
else{
    res.redirect('/');
}
 }


 controller.consultacc2usu=(req,res,next)=>{
    if(req.session.login){
    cnn.query('SELECT * FROM tbvehiculo WHERE VehiCatId="'+"2"+'"',(err,resbd)=>{
        if(err){
          next(new Error(err))  
          console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('dentrocategoria2usu',{datos:resbd});
        }
    }) 
}
else{
    res.redirect('/');
}
 }


 controller.consultacc1usu=(req,res,next)=>{
    if(req.session.login){
    cnn.query('SELECT * FROM tbvehiculo WHERE VehiCatId="'+"1"+'"',(err,resbd)=>{
        if(err){
          next(new Error(err))  
          console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('dentrocategoria1usu',{datos:resbd});
        }
    }) 
}
else{
    res.redirect('/');
}
 }

 controller.consultageneralvehiculousu=(req,res,next)=>{
    if(req.session.login){
    cnn.query('SELECT * FROM tbvehiculo',(err,resbd)=>{
        if(err){
          next(new Error(err))  
          console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('vehiculousu',{datos:resbd});
        }
    }) 
}
else{
    res.redirect('/');
}
 }


 controller.consultageneralcategoriausu=(req,res,next)=>{
    if(req.session.login){
    cnn.query('SELECT * FROM tbcategoria',(err,resbd)=>{
        if(err){
          next(new Error(err))  
          console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('categoriausu',{datos:resbd});
        }
    }) 
}
else{
    res.redirect('/');
}
 }

 controller.consultageneraldatosvendedorusu=(req,res,next)=>{
    if(req.session.login){
    cnn.query('SELECT * FROM tbdatos WHERE DatId="'+[ddc]+'"',(err,resbd)=>{
        if(err){
          next(new Error(err))  
          console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('datosvendedorusu',{datos:resbd});
        }
    }) 
}
else{
    res.redirect('/');
}
 }


 controller.actualizardatosusu=(req,res,next)=>{
    const docx=req.body.dd;
    const nomx=req.body.nn;
    const apex=req.body.aa;
    const corx=req.body.cc;
    const celx=req.body.tt;

    console.log("Aquiiiiiiiiiiiiiiiiii");
    cnn.query('UPDATE tbdatos set DatNombre="'+nomx+'",DatApellido="'+apex+'",DatTelefono="'+celx+'",DatCorreo="'+corx+'" WHERE DatId="'+docx+'"', (err,respbb)=>{
  
      if(err){
          next(new Error(err));
      }
      else{
          console.log("Actualizado")
          res.redirect('datosvendedorusu')
      }
    })
  }

/*fin usuario*/


controller.categoriaprecio=(req,res,next)=>{
    if(req.session.login){
        const i=req.body.rangomin;
        const a=req.body.rangomax;     
        console.log(i,a);
        cnn.query('SELECT * FROM tbvehiculo INNER JOIN tbdatos on (VehiDatId=DatId)  WHERE VehiPrecio>=? AND VehiPrecio<=?',[i,a],(err,resbd)=>{
            if(err){
              next(new Error(err))  
              console.log("Error en la consulta")
            }
            else{
                console.log(resbd)
                res.render('categoriaprecio',{datos:resbd});
            }
        }) 
     
    }
    else{
        res.redirect('/');
    }
 }

 controller.categoriapreciousu=(req,res,next)=>{
    if(req.session.login){
        const i=req.body.rangomin;
        const a=req.body.rangomax;     
        console.log(i,a);
        cnn.query('SELECT * FROM tbvehiculo INNER JOIN tbdatos on (VehiDatId=DatId)  WHERE VehiPrecio>=? AND VehiPrecio<=?',[i,a],(err,resbd)=>{
            if(err){
              next(new Error(err))  
              console.log("Error en la consulta")
            }
            else{
                console.log(resbd)
                res.render('categoriapreciousu',{datos:resbd});
            }
        }) 
     
    }
    else{
        res.redirect('/');
    }
 }





/*
controller.consultacreditos=(req,res,next)=>{
    cnn.query('SELECT * FROM tbcreditos'),(err,resbd)=>{
        if(er){
            next(new Error(err))
            console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('credito_cliente',{datos:resbd});
        }
    }
}

*/

/*
controller.consultalineas=(req,res,next)=>{
    cnn.query('SELECT * FROM tblineas'),(err,resbd)=>{
        if(er){
            next(new Error(err))
            console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('lineas_credito',{datos:resbd});
        }
    }
}

*/


controller.consultacc=(req,res,next)=>{
    if(req.session.login){
    cnn.query('SELECT * FROM tbvehiculo WHERE VehiCatId="'+"4"+'"',(err,resbd)=>{
        if(err){
          next(new Error(err))  
          console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('dentrocategoria4',{datos:resbd});
        }
    }) 
}
else{
    res.redirect('/');
}
 }


 controller.consultacc3=(req,res,next)=>{
    if(req.session.login){
    cnn.query('SELECT * FROM tbvehiculo WHERE VehiCatId="'+"3"+'"',(err,resbd)=>{
        if(err){
          next(new Error(err))  
          console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('dentrocategoria3',{datos:resbd});
        }
    }) 
}
else{
    res.redirect('/');
}
 }


 controller.consultacc2=(req,res,next)=>{
    if(req.session.login){
    cnn.query('SELECT * FROM tbvehiculo WHERE VehiCatId="'+"2"+'"',(err,resbd)=>{
        if(err){
          next(new Error(err))  
          console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('dentrocategoria2',{datos:resbd});
        }
    }) 
}
else{
    res.redirect('/');
}
 }


 controller.consultacc1=(req,res,next)=>{
    if(req.session.login){
    cnn.query('SELECT * FROM tbvehiculo WHERE VehiCatId="'+"1"+'"',(err,resbd)=>{
        if(err){
          next(new Error(err))  
          console.log("Error en la consulta")
        }
        else{
            console.log(resbd)
            res.render('dentrocategoria1',{datos:resbd});
        }
    }) 
}
else{
    res.redirect('/');
}
 }











    



    








controller.cerrar=(req,res,next)=>{
    req.session.destroy(()=>{
        res.redirect('/');
    });
}









module.exports=controller;