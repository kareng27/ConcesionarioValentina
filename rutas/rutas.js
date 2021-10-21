const express=require('express')
const rutas=express.Router();
const controller=require('../controlador/controller')

rutas.get('/',controller.index);

rutas.post('/login',controller.login);


rutas.get('/usuario',controller.consultageneralusuario);
rutas.post('/frminsertarusuario',controller.insertarusuario)

rutas.get('/datos',controller.consultageneraldatos);
rutas.post('/frminsertardatos',controller.insertardatos);

rutas.get('/vehiculo',controller.consultageneralvehiculo);
rutas.post('/frminsertarvehiculo',controller.insertarvehiculo)
rutas.get('/datosvendedor',controller.consultageneraldatosvendedor);
rutas.post('/actualizardatos',controller.actualizardatos)
rutas.get('/categoria',controller.consultageneralcategoria);
rutas.get('/consultacategoria',controller.consultageneralconsultacategoria);

rutas.get('/vistacomprador',controller.vistacomprador);
rutas.post('/datosporcategoriavendedor',controller.datosporcategoriavendedor)
rutas.get('/vistaambos',controller.vistaambos);
rutas.get('/categoriaprecio',controller.categoriaprecio);
rutas.post('/frmcategoriaprecio',controller.categoriaprecio)
rutas.get('/categoriapreciousu',controller.categoriapreciousu);
rutas.post('/frmcategoriapreciousu',controller.categoriapreciousu)

rutas.get('/vistausuario',controller.vistausuario);
rutas.get('/vistacompradorusuario',controller.vistacompradorusuario);
rutas.get('/consultacategoriausuario',controller.consultageneralconsultacategoriausuario);
rutas.get('/vehiculousu',controller.consultageneralvehiculousu);
rutas.get('/categoriausu',controller.consultageneralcategoriausu);
rutas.get('/datosvendedorusu',controller.consultageneraldatosvendedorusu);
rutas.post('/actualizardatosusu',controller.actualizardatosusu)


rutas.get('/dentrocategoria1',controller.consultacc1);
rutas.get('/dentrocategoria2',controller.consultacc2);
rutas.get('/dentrocategoria3',controller.consultacc3);
rutas.get('/dentrocategoria4',controller.consultacc);

rutas.get('/dentrocategoria1usu',controller.consultacc1usu);
rutas.get('/dentrocategoria2usu',controller.consultacc2usu);
rutas.get('/dentrocategoria3usu',controller.consultacc3usu);
rutas.get('/dentrocategoria4usu',controller.consultaccusu);





rutas.get('/cerrar',controller.cerrar)

module.exports=rutas