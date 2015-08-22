//manejo de archivos
var f = {
	txt :null,
	action: null,
	createFile : function(){
		f.action=0;
		f.txt = $('#aSEnd').val();
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, f.gotFS, f.fail); //Pide accseo al sistema de archivos indica si el archivo sera creado permanente o temporalmente, funciones de satisfaccion y error
	},
	gotFS : function(fileSystem) {
  		if(f.action == 0)
			fileSystem.root.getFile("readme.txt", {create: true, exclusive: false}, f.gotFileEntry, f.fail); // va a la raiz y obtiene los permisos de un archivo indicado, indica si exite y lo abre sino lo crea y lo abre y lo defines como esxclusi o no
		else
			fileSystem.root.getFile("readme.txt", null, f.gotFileEntry, f.fail);
    },
	gotFileEntry : function(fileEntry) {
		if(f.action == 0)
        	fileEntry.createWriter(f.gotFileWriter, f.fail); //obtiene la entrada ala archivo mediante un objeto y crea un apuntador, para poder crear dentro del archivo
		else
			fileEntry.file(f.readAsText);
    },
	gotFileWriter : function(writer) {
        alert('archivo escrito');
        writer.write(f.txt);
    },

	readFile : function(){
		f.action=1;
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, f.gotFS, f.fail);
	},
	readAsText : function(file) {
        var reader = new FileReader();
        reader.onloadend = function(evt) {
            $('#aGet').text(evt.target.result);
        };
        reader.readAsText(file);
    },
	fail : function(error) {
        alert(error.code);
    }
};