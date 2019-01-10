$(function() {
 
    // Atribui evento e função para limpeza dos campos
    $('#buscar').on('input', limpaCampos);
 
    // Dispara o Autocomplete a partir do segundo caracter
    $( "#buscar" ).autocomplete({
	    minLength: 3,
	    source: function( request, response ) {
	        $.ajax({
	            url: "http://www.hpware.com.br/sbd/consulta.php",
	            dataType: "json",
	            data: {
	            	acao: 'autocomplete',
	                parametro: $('#buscar').val()
	            },
	            success: function(data) {
	               response(data);
	            }
	        });
	    },
	    focus: function( event, ui ) {
	        $("#buscar").val( ui.item.descricao );
	        carregarDados();
	        return false;
	    },
	    select: function( event, ui ) {
	        $("#buscar").val( ui.item.descricao );
	        return false;
	    }
    })
    .autocomplete( "instance" )._renderItem = function( ul, item ) {
      return $( "<li>" )
        .append( "<a><b>cid: </b>" + item.cid + "<br><b>Descrição: </b>" + item.descricao + "</a><br>" )
        .appendTo( ul );
    };
 
    // Função para carregar os dados da consulta nos respectivos campos
    function carregarDados(){
    	var busca = $('#buscar').val();
 
    	if(busca != "" && busca.length >= 3){
    		$.ajax({
	            url: "http://www.hpware.com.br/sbd/consulta.php",
	            dataType: "json",	
	            data: {
	            	acao: 'consulta',
	                parametro: $('#buscar').val()
	            },
	            success: function( data ) {
	               
	            }
	        });
    	}
    }
 
    // Função para limpar os campos caso a busca esteja vazia
    function limpaCampos(){
       var busca = $('#buscar').val();
 
       if(busca == ""){
	   		
       }
    }
});