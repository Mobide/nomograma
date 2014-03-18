	
$(document).on("mobileinit", function() {
$.mobile.defaultPageTransition = "slide";
$.mobile.page.prototype.options.domCache = true;

});
// Evento para la primera carga de la página	
$(document).ready(function(event){

});

$(document).bind('pageload', function(){
});
$(document).on("pagebeforeshow", "#index-page", function() {
   
});
$(document).on("pagebeforeshow", "#cuestionary-page", function() {
   ocultarCuestionario()
   mostrar();
});
$(document).on("pagebeforeshow", "#result-page", function() {
   ocultarResultado()
   mostratCalculos();
});

$(document).on( "pagebeforechange", function( event ) { 
});

$(document).on( "pagebeforehide", function( event ) { 
//alert(1);
//document.location.href="http://demo.mobide.es/nomo/cuestionary.html?patient=qqq&eye=Left&nomogram=Ferrara5";

//$( ":mobile-pagecontainer" ).pagecontainer( "change", , { dataUrl: "cuestionary.html?patient=qqq&eye=Left&nomogram=Ferrara8"} );
});

////////////////GENERIC FUNCTIONS////////////////////////////
function ocultarCuestionario() {
	$("#pathologyp").hide();
	$("#keratometry").hide();
	$("#pachymetry").hide();
	$("#asphericity").hide();
	$("#coma").hide();
	$("#astigmatism").hide();
	$("#refraction").hide();
	$("#apex").hide();
	$("#coneApexNewIntacs").hide();
}
function ocultarResultado() {
	$("#ferraraRingDiv").hide();
	$("#qp").hide();
	$("#ferraraRingDiv").hide();
	$("#pachymetryDiv").hide();
	$("#incisionF5F6").hide();
	$("#laserdiv").hide();
	$("#cornealdivintacs").hide();
	$("#incisionIntacs").hide();
	$("#ferrararing2p").hide();
	$("#cornealdivnewintacst6").hide();
	$("#cornealdivnewintacst7").hide();
	$("#cornealdivintacssk").hide();		
	$("#cornealdivintacsskDecen").hide();
	}

	function mostrar()
	{
		var nomogram=tipeNomogram();
		if (nomogram == "ferrara5")
		{
			$("#pathologyp").show();
			$("#keratometry").show();
			$("#pachymetry").show();
			$("#asphericity").show();
			
			$("#pathology").html("<option value='pellucid'>Pellucid marginal degeneration</option>"+
			"<option value='ovalcone'>Oval cone</option>" +
			"<option value='nipplecone'>Nipple cone</option>");
			$("#pathology").val('pellucid').selectmenu("refresh"); 
		} 
		else if(nomogram == "ferrara6")
		{
			$("#pathologyp").show();
			$("#keratometry").show();
			$("#coma").show();
			$("#astigmatism").show();
			$("#pachymetry").show();
			$("#asphericity").show();
		
			$("#pathology").html("<option value='Central'>Central</option>" +
			"<option value='Pericentral'>Pericentral</option>" +
			"<option value='Paracentral'>Paracentral</option>" +
			"<option value='Bowtie'>Bowtie</option>");
			$("#pathology").val('Central').selectmenu("refresh");
		}	
		else if( nomogram == "intacs")
		{
			$("#pathologyp").show();
			$("#keratometry").show();
			$("#pachymetry").show();
			$("#refraction").show();
			$("#apex").show();
			
			$("#pathology").html("<option value='Myopia'>Myopia</option>"+
			"<option value='Keratoconus'>Keratoconus</option>");
			$("#pathology").val('Myopia').selectmenu("refresh");
						
		
		
		}
		else if( nomogram == "intacssk")
		{
			$("#keratometry").show();
			$("#pachymetry").show();
			$("#refraction").show();
			$("#apex").show();
		}
		else if ( nomogram=="newintacs")
		{
			$("#keratometry").show();
			$("#pachymetry").show();
			$("#refraction").show();
			$("#apex").show();
			$("#coneApexNewIntacs").show();
		}
		
		
	}
	
	function removeComa(theString)
	{			
		var	parsedString;
		var n = theString.indexOf(",");
		parsedString = theString;
		if (n>-1)
		{
			//There is a coma, so replace by a .				
			parsedString=parsedString.replace(",",".");
		}
		return parsedString;
	}
	
	
	function tipeNomogram(){
	 return $("#nomogram").val();
	}
	
	
	function validateCuestionario(){
		var nomogram= tipeNomogram();
		if (nomogram=="ferrara5"){
		validateFerrara5();
		}
		else if(nomogram=="ferrara6")
		{
		validateFerrara6();
		}
		else if(nomogram=="intacs")
		{
		validateIntacs();
		
		}
		else if(nomogram=="intacssk")
		{
		validateIntacsSK();
		}
		else if(nomogram=="newintacs")
		{
		validateNewIntacs();
		}
		
		
		
	}
	
	
	
	///// INDEX  VALIDATION /////////////////////////////////////////////////////////////
	function validateInicio(){
		$("#PatientMessage").html("");
		$("#PatientMessage").hide();
	
		if(($("#patient").val())!=""){
			$("#link-cuestionary").attr("href","#cuestionary-page?");
			return true;
		}
		else{
			$("#PatientMessage").html("Missing Name of Patient");
			$("#PatientMessage").show(400);
			return false
		}
	}
	
	
	
	
	//FERRARA5 NOMOGRAM 5//////////////////////////////////////////////////////
	function validateFerrara5()
	{
		$("#qMezua").html("");
		$("#patximetriaMezua").html("");
		$("#keratometriaMezua").html("");
		
		$("#qMezua").hide();
		$("#patximetriaMezua").hide();
		$("#keratometriaMezua").hide();
			
			
			
			k1=document.getElementById('k1d').value;
			k2=document.getElementById('k2d').value;
			k1a=document.getElementById('k1axis').value;
			k2a=document.getElementById('k2axis').value;
			patxis=document.getElementById('patxisteep').value;
			patxit=document.getElementById('patxithinnest').value;
			pathology=document.getElementById('pathology').value;
			q=document.getElementById('q').value;
			var checkOk = true;
			
			//Convert Texts to parseFloats			
			k1=parseFloat( removeComa(document.getElementById('k1d').value) );
			k2=parseFloat( removeComa(document.getElementById('k2d').value) );
			k1a=parseFloat( removeComa(document.getElementById('k1axis').value) );
			k2a=parseFloat( removeComa(document.getElementById('k2axis').value) );						
			
			//Check Keratometry
			//if ( (k1=='' || k2=='' || k1a=='' || k2a=='') && (document.getElementById('q').value.length == 0) )
			if ( (isNaN(k1) || isNaN(k2) || isNaN(k1a) || isNaN(k2a)) && (document.getElementById('q').value.length == 0) )
			{			
				document.getElementById('keratometriaMezua').innerHTML="Missing or Wrong Keratometry parameters!!!";	
				$("#keratometriaMezua").show(400);
				return  false;
			}
			
			
			if (  Math.abs(k1a-k2a)!=90 && (document.getElementById('q').value.length == 0))
			{
				document.getElementById('keratometriaMezua').innerHTML="The difference between axis must be 90 degrees.";
				$("#keratometriaMezua").show(400);
				return false;
			}
			
			if ( k1>k2 )
			{
				document.getElementById('keratometriaMezua').innerHTML="K2 must be bigger than K1";
				$("#keratometriaMezua").show(400);
				return false;
			}
			
			
			if (  ((k1+k2)/2)>=60 )
			{
				document.getElementById('keratometriaMezua').innerHTML="Mean keratometry is over 60D and this is a contraindication for Rings. Please contact one of our consultants.";
				$("#keratometriaMezua").show(400);
				return false;
			}
			
			document.getElementById('keratometriaMezua').innerHTML="";
			
			//Convert Texts to parseFloats			
			patxis=parseFloat( removeComa(document.getElementById('patxisteep').value) );
			patxit=parseFloat(removeComa( document.getElementById('patxithinnest').value) );
			//Check Pachymetry
			if ( (isNaN(patxis) || isNaN(patxit) ) )
			{
				document.getElementById('patximetriaMezua').innerHTML="Missing or wrong Pachymetry parameters"
				$("#patximetriaMezua").show(400);
				return false;
			}
											
			
			if (patxit>patxis) 
			{
				document.getElementById('patximetriaMezua').innerHTML="Please check the pachimetry values.";
				$("#patximetriaMezua").show(400);
				return false;
			}
			if (patxit<=300)  
			{
				document.getElementById('patximetriaMezua').innerHTML="The cornea is too thin. Rings are not recomended.";// <a class='test' id='helphelpPachymetry' href='#' tooltip='It is very risky to introduce  corneal rings, so a corneal transplant is necessary for these cases.'><img style='position:relative;top:5px; width:17px;' src='img/laguntza.png' /></a>";
				$("#patximetriaMezua").show(400);			
				return false;
			}			
			
			document.getElementById('patximetriaMezua').innerHTML="";
			
			if (document.getElementById('q').value.length == 0)
			//if (!manual)			
			{				
				// Conversion from Keratometry to Asphericity
				qmedia=(k1+k2)/2;				
				if (qmedia<42) {qfin=0.16;document.getElementById('q').value=qfin;} // comprobar que para valores pequeños funciona porque la segunda parte antes no estaba
				else if (qmedia>=42 & qmedia<44) {qfin=-0.41;document.getElementById('q').value=qfin;}
				else if (qmedia>=44 & qmedia<46) {qfin=-0.49;document.getElementById('q').value=qfin;}
				else if (qmedia>=46 & qmedia<48) {qfin=-0.69;document.getElementById('q').value=qfin;}
				else if (qmedia>=48 & qmedia<50) {qfin=-0.94;document.getElementById('q').value=qfin;}
				else if (qmedia>=50 & qmedia<52) {qfin=-1.13;document.getElementById('q').value=qfin;}
				else if (qmedia>=52 & qmedia<54) {qfin=-1.16;document.getElementById('q').value=qfin;}
				else if (qmedia>=54 & qmedia<58) {qfin=-1.38;document.getElementById('q').value=qfin;}
				else if (qmedia>=58 & qmedia<60) {qfin=-1.58;document.getElementById('q').value=qfin;}
				else if (qmedia>=60 ) 
				{
					document.getElementById('keratometriaMezua').innerHTML="The mean Keratometry cannot exceed 60D <a class='test' id='helphelpKeratometry' href='#' tooltip='The ectasia is very advanced and a corneal transplant is necessary.'><img style='position:relative;top:5px; width:17px;' src='img/laguntza.png' /></a>";document.getElementById('keratometriaMezua').style.left="7%";					
					$("#keratometriaMezua").show(400);
					return false;
				}				
			}
			//Parse Q value 
			else
			{
				parsedQ = removeComa (document.getElementById('q').value);
				document.getElementById('q').value = parsedQ;
				qValue = parseFloat(parsedQ);
				
					//Check if pathology and Q Value are coherent
				if (document.getElementById('pathology').value == 'pellucid' && qValue<=-0.23)
				{
					document.getElementById('qMezua').innerHTML="The Q value must be greater than -0.23 for Pellucid marginal degeneration Pathology";
					$("#qMezua").show(400);
					return false;
				}
				else if (document.getElementById('pathology').value == 'ovalcone' && ((qValue>-0.23) || (qValue<=-1.45)))
				{
					document.getElementById('qMezua').innerHTML="The Q value must be between -0.23 and -1.45 for Oval cone Pathology";
					$("#qMezua").show(400);
					return false;
				}
			}
			//qValue = document.getElementById('q');
			/*
			else if (document.getElementById('pathology').value == 'nipplecone' && (qValue>-1.45) )
			{
				document.getElementById('qMezua').innerHTML="Q value should be lower than -1.45 for Nipple cone Pathology";
				document.getElementById('qMezua').style.left="10px";
				return false;
			}
			*/
			////////////////////////// ENVIO DE DATOS POR URL/////////////////////////////////////
			
			linkAnt="";
			if(window.location.href.indexOf("?") != -1){
				linkAnt=window.location.href.substr(window.location.href.indexOf('?')+1).toLowerCase();
			}
			
			/*
			if (document.getElementById('q').value.length == ""){
				$("#link-result").attr("href","result.html?" + aux1 + "&pathology=" + $("#pathology").val() + 
				"&k1d=" + k1 + "&k2d=" + k2 + "&k1axis=" + k1a + "&k2axis=" + k2a + 
				"&patxisteep=" + patxis + "&patxithinnest=" + patxit);
			
			}
			*/
			//else{
			
				$("#link-result").attr("href","#result-page");
			//}
			return true;

			//document.getElementById('formularioa').submit ();			
	}
		
		
	//FERRARA6 NOMOGRAM//////////////////////////////////////////////////////
	function validateFerrara6()
	{
		$("#qMezua").html("");
		$("#patximetriaMezua").html("");
		$("#keratometriaMezua").html("");
		$("#comaMezua").html("");
		$("#astigmatismMezua").html("");
		
		
		$("#qMezua").hide();
		$("#patximetriaMezua").hide();
		$("#keratometriaMezua").hide();
		$("#comaMezua").hide("");
		$("#astigmatismMezua").hide("");

		k1=document.getElementById('k1d').value;
		k2=document.getElementById('k2d').value;
		k1a=document.getElementById('k1axis').value;
		k2a=document.getElementById('k2axis').value;
		//coma=document.getElementById('comaValue').value;
		//astigmatism=document.getElementById('astigmatismValue').value;
		patxis=document.getElementById('patxisteep').value;
		patxit=document.getElementById('patxithinnest').value;
		pathology=document.getElementById('pathology').value;
		q=document.getElementById('q').value;
		var checkOk = true;
		
		//Convert Texts to parseFloats			
		k1=parseFloat( removeComa(document.getElementById('k1d').value) );
		k2=parseFloat( removeComa(document.getElementById('k2d').value) );
		k1a=parseFloat( removeComa(document.getElementById('k1axis').value) );
		k2a=parseFloat( removeComa(document.getElementById('k2axis').value) );
		coma=parseFloat( removeComa(document.getElementById('comaValue').value) );
		astigmatism=parseFloat( removeComa(document.getElementById('astigmatismValue').value) );
		
		//Check Keratometry
		if ( (isNaN(k1) || isNaN(k2) || isNaN(k1a) || isNaN(k2a)) && (document.getElementById('q').value.length == 0) )
		{			
			document.getElementById('keratometriaMezua').innerHTML="Missing or wrong Keratometry parameter";
			$("#keratometriaMezua").show(400);
			return  false;
		}
		document.getElementById('keratometriaMezua').innerHTML="";
		
		if (  Math.abs(k1a-k2a)!=90 && (document.getElementById('q').value.length == 0))
		{
			document.getElementById('keratometriaMezua').innerHTML="The difference between axis must be 90 degrees.";
			$("#keratometriaMezua").show(400);
			return false;
		}
		
		document.getElementById('keratometriaMezua').innerHTML="";
		
		if (  k1>k2)
		{
			document.getElementById('keratometriaMezua').innerHTML="K2 must be bigger than K1";
			$("#keratometriaMezua").show(400);
			return false;
		}
				
		document.getElementById('keratometriaMezua').innerHTML="";
		
		if (  ((k1+k2)/2)>=60 )
		{
			document.getElementById('keratometriaMezua').innerHTML="Mean keratometry is over 60D and this is a contraindication for Rings. Please contact one of our consultants.";
			$("#keratometriaMezua").show(400);
			return false;
		}
		document.getElementById('keratometriaMezua').innerHTML="";
		
		//Check Coma
		if ( isNaN(coma) ) 
		{
			document.getElementById('comaMezua').innerHTML="Missing or wrong Coma parameter";
			$("#comaMezua").show(400);
			return false;
		}			
		document.getElementById('comaMezua').innerHTML="";		
					
		//Check Astigmatism
		if ( isNaN(astigmatism) ) 
		{
			document.getElementById('astigmatismMezua').innerHTML="Missing or wrong Astigmatism parameter"
			$("#astigmatismMezua").show(400);
			return false;
		}
		
		//Check if pathology and Astigmatism Value are coherent
		if ( (document.getElementById('pathology').value == 'Paracentral'  || document.getElementById('pathology').value == 'Pericentral') && (astigmatism <=-100 || 0<astigmatism) )
		{
			document.getElementById('astigmatismMezua').innerHTML="Astigmatism value should be between 0 and -100 for Paracentral or Pericentral Pathology";
			$("#astigmatismMezua").show(400);
			return false;
		}
		
		document.getElementById('astigmatismMezua').innerHTML="";			
		
		//Convert Texts to parseFloats			
		patxis=parseFloat( removeComa(document.getElementById('patxisteep').value) );
		patxit=parseFloat(removeComa( document.getElementById('patxithinnest').value) );
		
		//Check Pachymetry
		if ( ( patxis=='' || patxit=='') || (isNaN(patxis) || isNaN(patxit) ) )
		{
			document.getElementById('patximetriaMezua').innerHTML="Missing or wrong Pachymetry parameters"
			$("#patximetriaMezua").show(400);
			return false;
		}						
		
		if (patxit>patxis) 
		{
			document.getElementById('patximetriaMezua').innerHTML="Please check the pachimetry values.";
			$("#patximetriaMezua").show(400);
			return false;
		}
		if (patxit<=300)  
		{
			document.getElementById('patximetriaMezua').innerHTML="The cornea is too thin. Rings are not recomended.";// <a class='test' id='helphelpPachymetry' href='#' tooltip='It is very risky to introduce  corneal rings, so a corneal transplant is necessary for these cases.'><img style='position:relative;top:5px; width:17px;' src='img/laguntza.png' /></a>";
			$("#patximetriaMezua").show(400);
			return false;
		}			
		
		document.getElementById('patximetriaMezua').innerHTML="";
		if (document.getElementById('q').value.length == 0)
		//if (!manual)
		{
			// Conversion from Keratometry to Asphericity
			qmedia=(k1+k2)/2;				
			if (qmedia<42){qfin=0.16;document.getElementById('q').value=qfin;}
			else if (qmedia>=42 & qmedia<44) {qfin=-0.41;document.getElementById('q').value=qfin;}
			else if (qmedia>=44 & qmedia<46) {qfin=-0.49;document.getElementById('q').value=qfin;}
			else if (qmedia>=46 & qmedia<48) {qfin=-0.69;document.getElementById('q').value=qfin;}
			else if (qmedia>=48 & qmedia<50) {qfin=-0.94;document.getElementById('q').value=qfin;}
			else if (qmedia>=50 & qmedia<52) {qfin=-1.13;document.getElementById('q').value=qfin;}
			else if (qmedia>=52 & qmedia<54) {qfin=-1.16;document.getElementById('q').value=qfin;}
			else if (qmedia>=54 & qmedia<58) {qfin=-1.38;document.getElementById('q').value=qfin;}
			else if (qmedia>=58 & qmedia<60) {qfin=-1.58;document.getElementById('q').value=qfin;}
			else if (qmedia>=60 ) 
			{
				document.getElementById('keratometriaMezua').innerHTML="The mean Keratometry cannot exceed 60D <a class='test' id='helphelpKeratometry' href='#' tooltip='The ectasia is very advanced and a corneal transplant is necessary.'><img style='position:relative;top:5px; width:17px;' src='img/laguntza.png' /></a>";document.getElementById('keratometriaMezua').style.left="7%";					
				$("#keratometriaMezua").show(400);
				return false;
			}				
		}
		else
		{
			parsedQ = removeComa(document.getElementById('q').value);
			document.getElementById('q').value = parsedQ;
		}
	
		//Submit the form
		//document.getElementById('formularioa').submit ();

		
		$("#link-result").attr("href","#result-page");
		
	}
		
		
		//INTACS NOMOGRAM//////////////////////////////////////////////////////
	function validateIntacs ()
	{						
		$("#keratometriaMezua").html("");
		$("#patximetriaMezua").html("");
		$("#refractionMezua").html("");

		$("#patximetriaMezua").hide();
		$("#keratometriaMezua").hide();
		$("#refractionMezua").hide();
	
		pathology=document.getElementById('pathology').value;						
		coneApex=document.getElementById('coneApex').value;
		
		
		//Convert Texts to parseFloats			
		k1=parseFloat( removeComa(document.getElementById('k1d').value) );
		k2=parseFloat( removeComa(document.getElementById('k2d').value) );
		k1a=parseFloat( removeComa(document.getElementById('k1axis').value) );
		k2a=parseFloat( removeComa(document.getElementById('k2axis').value) );
		
		//Check Keratometry
		if ( (isNaN(k1) || isNaN(k2) || isNaN(k1a) || isNaN(k2a)) )
		{			
			document.getElementById('keratometriaMezua').innerHTML="Missing or Wrong Keratometry parameters!!!";					
			$("#keratometriaMezua").show(400);
			return  false;
		}
		document.getElementById('keratometriaMezua').innerHTML="";
		
		if (  k1>k2)
		{
			document.getElementById('keratometriaMezua').innerHTML="K2 must be bigger than K1";
			$("#keratometriaMezua").show(400);
			return false;
		}
		
		if (  Math.abs(k1a-k2a)!=90 )
		{
			document.getElementById('keratometriaMezua').innerHTML="The difference between axis must be 90 degrees.";
			$("#keratometriaMezua").show(400);
			return false;
		}
		
		if (  ((k1+k2)/2)>=60 )
		{
			document.getElementById('keratometriaMezua').innerHTML="Mean keratometry is over 60D and this is a contraindication for Rings. Please contact one of our consultants.";
			$("#keratometriaMezua").show(400);
			return false;
		}
		
		//Convert Texts to parseFloats			
		patxis=parseFloat( removeComa(document.getElementById('patxisteep').value) );
		patxit=parseFloat( removeComa( document.getElementById('patxithinnest').value) );
		
		//Check Pachymetry
		if ( (isNaN(patxis) || isNaN(patxit) ) )
		{
			document.getElementById('patximetriaMezua').innerHTML="Missing or wrong Pachymetry parameters"
			$("#patximetriaMezua").show(400);
			return false;
		}										
		
		if (patxit>patxis) 
		{
			document.getElementById('patximetriaMezua').innerHTML="Please check the pachimetry values.";
			$("#patximetriaMezua").show(400);
			return false;
		}
		if (patxit<=300)  
		{
			document.getElementById('patximetriaMezua').innerHTML="The cornea is too thin. Rings are not recomended.";// <a class='test' id='helphelpPachymetry' href='#' tooltip='It is very risky to introduce  corneal rings, so a corneal transplant is necessary for these cases.'><img style='position:relative;top:5px; width:17px;' src='img/laguntza.png' /></a>";
			$("#patximetriaMezua").show(400);
			return false;
		}
		
		document.getElementById('patximetriaMezua').innerHTML="";
					
		spherePower = parseFloat( removeComa(document.getElementById('spherePowerValue').value) );
		astigmatism = parseFloat( removeComa(document.getElementById('refractionValue').value) );
		astigmatismAxis = parseFloat( removeComa(document.getElementById('refractionAxis').value) );
				
		//Check Refraction
		if (  (isNaN(astigmatism) || isNaN(astigmatismAxis) || isNaN(spherePower) ) )
		{
			document.getElementById('refractionMezua').innerHTML="Missing or wrong Refraction parameters";
			$("#refractionMezua").show(400);
			return false;
		}			

		if (document.getElementById('pathology').value == 'Myopia' && (0<spherePower || spherePower<=-4.0) )
		{
			document.getElementById('refractionMezua').innerHTML="Spherical Power must be between 0 and -4.0D in Myopia pathology.";
			$("#refractionMezua").show(400);
			return false;
		}		
		
		if (document.getElementById('pathology').value == 'Keratoconus' && document.getElementById('coneApex').value=='Decentered' && astigmatism>=-2.0 )
		{
			if( 0<spherePower || spherePower<=-4.0)
			{
				document.getElementById('refractionMezua').innerHTML="Sphere power must be between lower than -2.0D with Keratoconus, Decentered cone Apex and Astigmatism higher than -2.0D";
				$("#refractionMezua").show(400);
				return false;
			}
		}	
		
		if (document.getElementById('pathology').value == 'Keratoconus' && document.getElementById('coneApex').value=='Centered')
		{
			if( 0<spherePower || spherePower<=-5.0)
			{
				document.getElementById('refractionMezua').innerHTML="Sphere power must be between 0D and -5.0D with Keratoconus and Centered cone Apex.";
				$("#refractionMezua").show(400);
				return false;
			}
		}	
	

		spherePower = parseFloat( removeComa(document.getElementById('spherePowerValue').value) );
		astigmatism = parseFloat( removeComa(document.getElementById('refractionValue').value) );
		astigmatismAxis = parseFloat( removeComa(document.getElementById('refractionAxis').value) );
		
		document.getElementById('spherePowerValue').value = spherePower;
		document.getElementById('refractionValue').value = astigmatism;
		document.getElementById('refractionAxis').value = astigmatismAxis;
		
		
		
		document.getElementById('refractionMezua').innerHTML="";
		astigmatism=parseFloat(document.getElementById('refractionValue').value);						
			
		//Submit the form
		//document.getElementById('formularioa').submit ();
	
		$("#link-result").attr("href","#result-page");
	}
		
		//INTACSSK NOMOGRAM//////////////////////////////////////////////////////
	function validateIntacsSK ()
	{					
		$("#keratometriaMezua").html("");
		$("#patximetriaMezua").html("");
		$("#refractionMezua").html("");

		$("#patximetriaMezua").hide();
		$("#keratometriaMezua").hide();
		$("#refractionMezua").hide();
		
		
		//Convert Texts to parseFloats			
		k1=parseFloat( removeComa(document.getElementById('k1d').value) );
		k2=parseFloat( removeComa(document.getElementById('k2d').value) );
		k1a=parseFloat( removeComa(document.getElementById('k1axis').value) );
		k2a=parseFloat( removeComa(document.getElementById('k2axis').value) );						
		
		//Check Keratometry
		if (  (isNaN(k1) || isNaN(k2) || isNaN(k1a) || isNaN(k2a)) )
		{	
			document.getElementById('keratometriaMezua').innerHTML="Missing or Wrong Keratometry parameters!!!";					
			$("#keratometriaMezua").show(400);
			return  false;
		}
		
		document.getElementById('keratometriaMezua').innerHTML="";
		
		if (  Math.abs(k1a-k2a)!=90 )
		{
			document.getElementById('keratometriaMezua').innerHTML="The difference between axis must be 90 degrees.";
			$("#keratometriaMezua").show(400);
			return false;
		}
		
		document.getElementById('keratometriaMezua').innerHTML="";
		
		if (  k1>k2)
		{
			document.getElementById('keratometriaMezua').innerHTML="K2 must be bigger than K1";
			$("#keratometriaMezua").show(400);
			return false;
		}
		
		document.getElementById('keratometriaMezua').innerHTML="";
		
		if (  ((k1+k2)/2)>=60 )
		{
			document.getElementById('keratometriaMezua').innerHTML="Mean keratometry is over 60D and this is a contraindication for Rings. Please contact one of our consultants.";
			$("#keratometriaMezua").show(400);
			return false;
		}					
		
		document.getElementById('keratometriaMezua').innerHTML="";
		
		//Convert Texts to parseFloats			
		patxis=parseFloat( removeComa(document.getElementById('patxisteep').value) );
		patxit=parseFloat(removeComa( document.getElementById('patxithinnest').value) );
		
		//Check Pachymetry
		if ( (isNaN(patxis) || isNaN(patxit) ) )
		{
			document.getElementById('patximetriaMezua').innerHTML="Missing or wrong Pachymetry parameters"
			$("#patximetriaMezua").show(400);
			return false;
		}
		
		document.getElementById('patximetriaMezua').innerHTML="";
										
		
		if (patxit>patxis) 
		{
			document.getElementById('patximetriaMezua').innerHTML="Please check the pachimetry values.";
			$("#patximetriaMezua").show(400);
			return false;
		}
		
		document.getElementById('patximetriaMezua').innerHTML="";
		
		if (patxit<=300)  
		{
			document.getElementById('patximetriaMezua').innerHTML="The cornea is too thin. Rings are not recomended.";// <a class='test' id='helphelpPachymetry' href='#' tooltip='It is very risky to introduce  corneal rings, so a corneal transplant is necessary for these cases.'><img style='position:relative;top:5px; width:17px;' src='img/laguntza.png' /></a>";
			$("#patximetriaMezua").show(400);				
			return false;
		}
		
		document.getElementById('patximetriaMezua').innerHTML="";
				
		spherePower = parseFloat( removeComa(document.getElementById('spherePowerValue').value) );
		astigmatism = parseFloat( removeComa(document.getElementById('refractionValue').value) );
		astigmatismAxis = parseFloat( removeComa(document.getElementById('refractionAxis').value) );
		
		//Check Refraction
		if (  (isNaN(astigmatism) || isNaN(astigmatismAxis) || isNaN(spherePower) ) )
		{
			document.getElementById('refractionMezua').innerHTML="Missing or wrong Refraction parameters";
			$("#refractionMezua").show(400);
			return false;
		}		
		
		if ( (document.getElementById('coneApex').value=='Centered') && ( spherePower<=-10.0) )
		{
			document.getElementById('refractionMezua').innerHTML="Sphere Power must higher than -10.0D with centered cone apex.";
			$("#refractionMezua").show(400);
			return false;
		}					
		
		if (document.getElementById('coneApex').value == 'Decentered' && (astigmatism>-3.0) && (0<spherePower || spherePower<=-4.0) )
		{
			document.getElementById('refractionMezua').innerHTML="Sphere Power must be between 0 and -10.0D with decentered cone apex and astigmatism higher than -3.0D";
			$("#refractionMezua").show(400);
			return false;
		}
		/*
		if (document.getElementById('coneApex').value == 'Decentered' && (astigmatism<=-3.0) && (0<spherePower || spherePower<=-4.0) )
		{
			document.getElementById('astigmatismMezua').innerHTML="Sphere Power should be between 0 and -10.0D with decentered cone apex and astigmatism higher than -3.0D";
			document.getElementById('astigmatismMezua').style.left="5px";
			return false;
		}
		*/
		
		spherePower = parseFloat( removeComa(document.getElementById('spherePowerValue').value) );
		astigmatism = parseFloat( removeComa(document.getElementById('refractionValue').value) );
		astigmatismAxis = parseFloat( removeComa(document.getElementById('refractionAxis').value) );
		
		document.getElementById('spherePowerValue').value = spherePower;
		document.getElementById('refractionValue').value = astigmatism;
		document.getElementById('refractionAxis').value = astigmatismAxis;
		
		document.getElementById('refractionMezua').innerHTML="";
														
		//Submit the form
		//document.getElementById('formularioa').submit ();
		
		$("#link-result").attr("href","#result-page");
	}
		
		//NEW INTACS NOMOGRAM//////////////////////////////////////////////////////
	function validateNewIntacs()
	{				
		$("#keratometriaMezua").html("");
		$("#patximetriaMezua").html("");
		$("#coneApexMezua").html("");
		$("#refractionMezua").html("");

		$("#patximetriaMezua").hide();
		$("#keratometriaMezua").hide();
		$("#refractionMezua").hide();
		$("#coneApexMezua").hide();
		
	
		//Convert Texts to parseFloats			
		k1=parseFloat( removeComa(document.getElementById('k1d').value) );
		k2=parseFloat( removeComa(document.getElementById('k2d').value) );
		k1a=parseFloat( removeComa(document.getElementById('k1axis').value) );
		k2a=parseFloat( removeComa(document.getElementById('k2axis').value) );
		coneapexpos=parseFloat( removeComa(document.getElementById('coneApexPos').value) );
		
		//Check Keratometry
		if (  (isNaN(k1) || isNaN(k2) || isNaN(k1a) || isNaN(k2a)) )
		{			
			document.getElementById('keratometriaMezua').innerHTML="Missing or Wrong Keratometry parameters!!!";					
			$("#keratometriaMezua").show(400);
			return  false;
		}
		
		document.getElementById('keratometriaMezua').innerHTML="";
		
		if (  Math.abs(k1a-k2a)!=90 )
		{
			document.getElementById('keratometriaMezua').innerHTML="The difference between axis must be 90 degrees.";
			$("#keratometriaMezua").show(400);
			return false;
		}
		
		document.getElementById('keratometriaMezua').innerHTML="";
		
		if (  k1>k2)
		{
			document.getElementById('keratometriaMezua').innerHTML="K2 must be bigger than K1";
			$("#keratometriaMezua").show(400);
			return false;
		}
		
		document.getElementById('keratometriaMezua').innerHTML="";
		
		if (  ((k1+k2)/2)>=60 )
		{
			document.getElementById('keratometriaMezua').innerHTML="Mean keratometry is over 60D and this is a contraindication for Rings. Please contact one of our consultants.";
			$("#keratometriaMezua").show(400);
			return false;
		}					
		
		document.getElementById('keratometriaMezua').innerHTML="";
		
		//Convert Texts to parseFloats			
		patxis=parseFloat( removeComa(document.getElementById('patxisteep').value) );
		patxit=parseFloat(removeComa( document.getElementById('patxithinnest').value) );
		
		//Check Pachymetry
		if ( (isNaN(patxis) || isNaN(patxit) ) )
		{
			document.getElementById('patximetriaMezua').innerHTML="Missing or wrong Pachymetry parameters"
			$("#patximetriaMezua").show(400);
			return false;
		}
		
		document.getElementById('patximetriaMezua').innerHTML="";
										
		
		if (patxit>patxis) 
		{
			document.getElementById('patximetriaMezua').innerHTML="Please check the pachimetry values.";
			$("#patximetriaMezua").show(400);
			return false;
		}
		
		document.getElementById('patximetriaMezua').innerHTML="";
		
		if (patxit<=300)  
		{
			document.getElementById('patximetriaMezua').innerHTML="The cornea is too thin. Rings are not recomended.";// <a class='test' id='helphelpPachymetry' href='#' tooltip='It is very risky to introduce  corneal rings, so a corneal transplant is necessary for these cases.'><img style='position:relative;top:5px; width:17px;' src='img/laguntza.png' /></a>";
			$("#patximetriaMezua").show(400);				
			return false;
		}
		
		document.getElementById('patximetriaMezua').innerHTML="";
				
		spherePower = parseFloat( removeComa(document.getElementById('spherePowerValue').value) );
		astigmatism = parseFloat( removeComa(document.getElementById('refractionValue').value) );
		astigmatismAxis = parseFloat( removeComa(document.getElementById('refractionAxis').value) );
		
		
		//Check Refraction
		if (  (isNaN(astigmatism) || isNaN(astigmatismAxis) || isNaN(spherePower) ) )
		{
			document.getElementById('refractionMezua').innerHTML="Missing or wrong Refraction parameters";
			$("#refractionMezua").show(400);
			return false;
		}		
		if (  isNaN(coneapexpos) )
		{
			document.getElementById('coneApexMezua').innerHTML="Missing Cone Apex Position parameter";
			$("#coneApexMezua").show(400);
			return false;
		}
		
		
		spherePower = parseFloat( removeComa(document.getElementById('spherePowerValue').value) );
		astigmatism = parseFloat( removeComa(document.getElementById('refractionValue').value) );
		astigmatismAxis = parseFloat( removeComa(document.getElementById('refractionAxis').value) );
		
		document.getElementById('spherePowerValue').value = spherePower;
		document.getElementById('refractionValue').value = astigmatism;
		document.getElementById('refractionAxis').value = astigmatismAxis;
		
		document.getElementById('refractionMezua').innerHTML="";
														
		//Submit the form
		//document.getElementById('formularioa').submit ();
		$("#link-result").attr("href","#result-page");
	}

	function manualQ (e)
	{		
		manual=true;
		console.log("manual");					
	}


//////////////////////////////////////// C A L C U L O  N O M O G R A M A //////////////////////////////////////////////
	
		
	function mostratCalculos()
	{
	/*valore por defecto para que si no se declara la variable no falle*/

		var nomogram= tipeNomogram();
	
		$("#patient-result").html($("#patient").val());
		$("#eye-result").html($("input[name='radio-choice']:checked").val());
	
		if ($("#nomogram").val()=="ferrara5"){
		$("#nomogram-result").html("Ferrara 5");
		}
		else if($("#nomogram").val()=="ferrara6"){
		$("#nomogram-result").html("Ferrara 6");
		}
		else if($("#nomogram").val()=="intacs"){
		$("#nomogram-result").html("INTACS");
		}
		else if($("#nomogram").val()=="intacssk"){
		$("#nomogram-result").html("INTACS SK");
		}
		else if($("#nomogram").val()=="newintacs"){
		$("#nomogram-result").html("newintacs");
		}
		grosor =0;grosor2=0;grado=0;grado2=0;
		anillos=1;
		k1d="";
		k1axis="";
		k2d="";
		k2axis="";
		eye="";
		qp="";
		patxisteep="";
		patxithinnest="";
		pathology="";
		
		/////////////// KERATOMETRY /////////////////////
		
		k1d=$("#k1d").val();
		$("#k1d-result").html(k1d);
		k1axis=$("#k1axis").val();
		$("#k1axis-result").html(k1axis);
		k2d=$("#k2d").val();
		$("#k2d-result").html(k2d);
		k2axis=$("#k2axis").val();
		$("#k2axis-result").html(k2axis);
		eye=$("input[name='radio-choice']:checked").val().toLowerCase();
		qp=$("#q").val()
		$("#q-result").html(qp);
		patxisteep=$("#patxisteep").val();
		$("#patxisteep-result").html(patxisteep);
		patxithinnest=$("#patxithinnest").val();
		$("#patxithinnest-result").html(patxithinnest);
		pathology=$("#pathology").val();
			
		
	
		
		if (nomogram=="ferrara5"){

			$("#ferraraRingDiv").show();
			$("#qp").show();
			$("#ferraraRingDiv").show();
			$("#pachymetryDiv").show();
			$("#incisionF5F6").show();
			$("#laserdiv").show();
			
			if (pathology=="pellucid"){
				grado2="";
				grosor2="";
				grado="140";
				anillos=1;
				grosor2='';

				if (Math.abs(k1d-k2d)<=4){
					grosor=150;
				}
				else if ((  Math.abs(k1d-k2d)>4) &&  Math.abs(k1d-k2d)<=8 ) {
				
					if (200>(patxithinnest * 0.5)){
						grosor=150;
					}
					else {
						grosor=200;
					}
				
				}
				else if  ( Math.abs(k1d-k2d)>8) 
				{
					//Check Pachymetry (Thinnest pachymetry cannot be thinner than Ring Thickness
					if (250>(patxithinnest * 0.5)){
						grosor=200;
					}
					else{
						grosor=250;
					}	
				}
				manualincisiondepth=(patxisteep * 80)/100;
				laserincisiondepth=(patxithinnest * 70)/100;
				K1power = k1d
				K2power = k2d
				
				K1axis = k1axis
				K2axis = k2axis
				
				if (K1power>K2power){
					incision=K1axis;
				}
				else{
					incision=K2axis;
				}
				//Check OD or OS
				
				if (eye == "left"){
					RingRotationValue = -incision;
				}
				else{
					RingRotationValue = 180-incision;
				}
				
			}
			
			
			
			//Ovalcone Pathology
			else if (pathology == "ovalcone")
			{			
				grado="";
				grosor="";
				grado="160";		
				grosor2="";

				if (qp<=-0.23 && qp>=-0.41) 
				{
					grosor=150;anillos=1;
				}
				else if ( qp<=-0.42 && qp>=-0.54 ) 
				{
					anillos=1;
					//Check Pachymetry (Thinnest pachymetry cannot be thinner than Ring Thickness
					if (200>(patxithinnest * 0.5)){
						grosor=150;
					}
					else {
					grosor=200;
					}
				}
				else if (qp<=-0.55 && qp>=-0.69)
				{
					anillos=1;
					//Check Pachymetry (Thinnest pachymetry cannot be thinner than Ring Thickness
					if (250>(patxithinnest * 0.5)) {
						grosor=200;
					}
					else {
					grosor=250;
					}
				}
				else if (qp<=-0.70 && qp>=-0.87)
				{
					anillos=2;
					grado2=grado;
					grosor=150;
					grosor2=150;
				}
				else if (qp<=-0.88 && qp>=-0.98)
				{
					anillos=2;
					grado2=grado;
					//Check Pachymetry (Thinnest pachymetry cannot be thinner than Ring Thickness
					if (200>(patxithinnest * 0.5)) 
					{
						grosor=150;
						grosor2=150;
					}
					else 
					{
						grosor=150;
						grosor2=200;
					}				
				}
				else if (qp<=-0.99 && qp>=-1.04)
				{
					anillos=2;
					grado2=grado;
					//Check Pachymetry (Thinnest pachymetry cannot be thinner than Ring Thickness
					if (250>(patxithinnest * 0.5))
					{
						{grosor=150;grosor2=200;}
					}
					else {
					grosor=150;
					grosor2=250;
					}
				}
				else if (qp<=-1.05 && qp>=-1.14)
				{
					anillos=2;
					grado2=grado;
					//Check Pachymetry (Thinnest pachymetry cannot be thinner than Ring Thickness
					if (200>(patxithinnest * 0.5))
					{
						grosor=150;
						grosor2=150;
					}
					else {
						grosor=200;
						grosor2=200;
					}
				}
				else if (qp<=-1.15 && qp>=-1.21)
				{
					anillos=2;
					grado2=grado;
					//Check Pachymetry (Thinnest pachymetry cannot be thinner than Ring Thickness
					if (250>(patxithinnest * 0.5)) 
					{
						grosor=200;
						grosor2=200;
					}
					else 
					{
						grosor=250;
						grosor2=250;
					}
				}
				else if (qp<=-1.22 && qp>=-1.45)
				{
					anillos=2;
					grado2=grado;
					//Check Pachymetry (Thinnest pachymetry cannot be thinner than Ring Thickness
					if (200>(patxithinnest * 0.5)){
						grosor=150;
						grosor2=200;
						}
					else {
						grosor=200;
						grosor2=250;
					}
				}

				manualincisiondepth=(patxisteep * 80)/100;
				laserincisiondepth=(patxithinnest * 70)/100;
				
				K1power = k1d
				K2power = k2d
				K1axis = k1axis
				K2axis =k2axis
				if (K1power>K2power){
					incision=K1axis;
				}	
				else{
					incision=K2axis;
				}		
				
				//Check OD or OS
				if (eye == "left")
					RingRotationValue = - incision;
				else
					RingRotationValue = 180-incision;	
	
			}
	
				//Nipplecone Pathology
			else if (pathology=='nipplecone')
			{
				grado2="";
				grosor2="";
				grado="210";
				grosor2='';
				//$maximo=$_POST['patxithinnest']/2;
				if (qp>-0.6)
				{
					grosor=150;
					anillos=1;
				}
				else if (qp<=-0.6 && qp>-0.9)
				{
					//Check Pachymetry (Thinnest pachymetry cannot be thinner than Ring Thickness
					if (200>(patxithinnest * 0.5)){
						grosor=150
						anillos=1
					}
					else {
					grosor=200;
					anillos=1;
					}
				}
				else if (qp<=-0.9)
				{
					//Check Pachymetry (Thinnest pachymetry cannot be thinner than Ring Thickness
					if (250>(patxithinnest * 0.5)){
						 grosor=200;
						 anillos=1;
					}
					else {
					grosor=250;
					anillos=1;
					}
				}		
					
				manualincisiondepth= (patxisteep *80)/100;
				laserincisiondepth= (patxithinnest *70)/100;			
				
				K1power = k1d
				K2power = k2d
				K1axis = k1axis
				K2axis = k2axis
				
				//Exception
				if (eye == "left"){
					incision=60;
				}
				else{
					incision=120;
				}
						
				//Check OD or OS
				if (eye == "left"){
					RingRotationValue = -60;
				}
				else{
					RingRotationValue = 180 - 120;
				}
			}
				$("#ferrararing-result").html( grado + "°/" + grosor +"&#956;m");
				$("#incision-result").html(incision + "&#176;");
				$("#incisiondepth-result").html(manualincisiondepth)
				
				if (anillos==2){
				$("#ferrararing2p").show();
				$("#ferrararing2-result").html(grado2 + "°/" + grosor2 +"&#956;m" );
				}	
		}
		
		
		
		
		
		
		else if(nomogram=="ferrara6")
		{
			$("#ferraraRingDiv").show();
			$("#qp").show();
			$("#ferraraRingDiv").show();
			$("#pachymetryDiv").show();
			$("#incisionF5F6").show();
			$("#laserdiv").show();
			astigmatism=$("#astigmatism").val();
			$("#astigmatismvalue-result").html(astigmatism);
			coma=$("#coma").val();
			$("#comavalue-result").html(coma);
			
			
		
		
			//Pellucid Pathology
			if (pathology=="Central")
			{		

				$("#loz").show()
			
				grosor2='';
				grado2='';
				anillos=1;
				grado="210";
				OZ = 5;
								
				if  (qp>=-0.60){
				grosor=150;
				}
				else if ( qp<-0.6 &&  qp>=-0.90 ) 
				{
					//Check Pachymetry (Thinnest pachymetry cannot be thinner than Ring Thickness
					if (200>(patxithinnest * 0.5)) 
						grosor=150;
					else grosor=200;
				}
				else if ( qp<-0.9) 
				{
					//Check Pachymetry (Thinnest pachymetry cannot be thinner than Ring Thickness
					if (250>(patxithinnest*0.5)){
						grosor=200;
					}
					else{
						grosor=250;
					}	
				}	
				
				//Incision
				manualincisiondepth=(patxisteep * 80)/100;
				laserincisiondepth=(patxithinnest * 70)/100;
				K1power = k1d;
				K2power = k2d;
				K1axis = k1axis;
				K2axis = k2axis;
				if (K1power>K2power){
					incision=K1axis;
				}
				else {
					incision=K2axis;
				}
				if (eye == "left"){
					incision=60;
				}	
				else{
					incision=120;
				}		
				//Check OD or OS
				if (eye == "left"){
					RingRotationValue = -60;
				}
				else{
					RingRotationValue = 180 - 120;
				}
			}
			
			
			else if (pathology=='Pericentral' || pathology=='Paracentral')
			{		
							
				OZ = '';			
				k1=k1d;
				k2=k2d;
				
				if (0>=astigmatism && astigmatism>-2)
				{				
					grosor2='';
					grado2='';
					anillos=1;
					grado="150";
					//Reduce Pathymetry in 50 units
					patxithinnest = patxithinnest - 50;
					if (patxithinnest>=300 &&  patxithinnest<450){
						grosor = 150;
					}
					else if (patxithinnest>=450 &&  patxithinnest<500){
						grosor = 200;
					}
					else if (patxithinnest>=500 &&  patxithinnest<600){
						grosor = 250;
					}
					else if (patxithinnest>=600){
						grosor = 300;			
					}						
				}
				else if (-2>=astigmatism && astigmatism>-3)
				{
					grosor2='';
					grado2='';
					anillos=1;
					grado="150";	
					if (patxithinnest>=300 &&  patxithinnest<450)
						grosor = 150;
					else if (patxithinnest>=450 &&  patxithinnest<500)
						grosor = 200;
					else if (patxithinnest>=500 &&  patxithinnest<600)
						grosor = 250;
					else if (patxithinnest>=600)
						grosor = 300;							
					
				}
				else if (-3>=astigmatism && astigmatism>-4)
				{
					grado2='';
					grosor2='';
					anillos=1;
					//Check Coma

					//Diferencia entre eje más plano y eje comático
					coma = Math.abs(coma - k1axis );
					if (coma>=30 && coma<75){
						grado="150";					
					}
					else if (coma>=0 && coma<30){					
						grado="120";
					}				
					if (patxithinnest>=300 &&  patxithinnest<450){
						grosor = 150;
					}
					else if (patxithinnest>=450 &&  patxithinnest<500){
						grosor = 200;
					}
					else if (patxithinnest>=500 &&  patxithinnest<600){
						grosor = 250;
					}
					else if (patxithinnest>=600){
						grosor = 300;			
					}
				}
				else if (-4>=astigmatism && astigmatism>-5)
				{
					grado2="";
					grosor2="";
					k1 = $_POST['k1axis'];
					//Diferencia entre eje más plano y eje comático
					coma = Math.abs( coma - k1axis );
					if (coma>=30 && coma<75){
						anillos=1;
						grado="150";	
						grado2="";					
						grosor2="";
						if (patxithinnest>=300 &&  patxithinnest<450){
							grosor = 150;
						}
						else if (patxithinnest>=450 &&  patxithinnest<500){
							grosor = 200;
						}
						else if (patxithinnest>=500 &&  patxithinnest<600){
							grosor = 250;
						}
						else if (patxithinnest>=600){
							grosor = 300;		
						}
					}
					else if (coma>=0 && coma<30)
					{					
						anillos=2;
						//One Ring of 90º and Thikness given Pachymetry -50
						grado2="90";
						if (patxithinnest-50>=300 &&  patxithinnest-50<450){
							grosor2 = 150;
						}
						else if (patxithinnest-50>=450 &&  patxithinnest-50<500){
							grosor2 = 200;
						}
						else if (patxithinnest-50>=500 &&  patxithinnest-50<600){
							grosor2 = 250;
						}
						else if (patxithinnest-50>=600){
							grosor2 = 300;
						}
						//Another Ring of 120º  and Thikness given Pachymetry 
						grado="120";
						if (patxithinnest>=300 &&  patxithinnest<450){
							grosor = 150;
						}
						else if (patxithinnest>=450 &&  patxithinnest<500){
							grosor = 200;
						}
						else if (patxithinnest>=500 &&  patxithinnest<600){
							grosor = 250;
						}
						else if (patxithinnest>=600){
							grosor = 300;
						}
					}			
				}
				else if (-5>=astigmatism && astigmatism>-6)
				{				
					grado2='';
					grosor2='';
					anillos=2;
					//One Ring of 90º and Thikness given Pachymetry
					grado2="90";
					if (patxithinnest>=300 &&  patxithinnest<450){
						grosor2 = 150;
					}	
					else if (patxithinnest>=450 &&  patxithinnest<500){
						grosor2 = 200;
					}
					else if (patxithinnest>=500 &&  patxithinnest<600){
						grosor2 = 250;
					}
					else if (patxithinnest>=600){
						grosor2 = 300;
					}
						
					//Another Ring of 120º  and Thikness given Pachymetry 
					grado="120";					
					if (patxithinnest>=300 &&  patxithinnest<450){
						grosor = 150;
					}
					else if (patxithinnest>=450 &&  patxithinnest<500){
						grosor = 200;
					}
					else if (patxithinnest>=500 &&  patxithinnest<600){
						grosor = 250;
					}
					else if (patxithinnest>=600){
						grosor = 300;
					}
				}
				else if (-6>=astigmatism && astigmatism>=-99)
				{
					grado2='';
					grosor2='';
					anillos=2;	
					//One Ring of 90º and Thikness given Pachymetry
					grado2="90";
					if (patxithinnest>=400 &&  patxithinnest<450){
						grosor2 = 150;
					}
					else if (patxithinnest>=450 &&  patxithinnest<500){
						grosor2 = 200;
					}
					else if (patxithinnest>=500 &&  patxithinnest<550){
						grosor2 = 250;
					}
					else if (patxithinnest>=550){
						grosor2 = 300;
					}
					
					
					//Another Ring of 120º  and Thikness given Pachymetry 
					grado="120";		
					patxithinnest = patxithinnest + 50;
					if (patxithinnest>=400 &&  patxithinnest<450){
						grosor = 150;
					}
					else if (patxithinnest>=450 &&  patxithinnest<500){
						grosor = 200;
					}
					else if (patxithinnest>=500 &&  patxithinnest<550){
						grosor = 250;
					}
					else if (patxithinnest>=550){
						grosor = 300
					}
				}				
				
				//Incision
				manualincisiondepth=(patxisteep *80)/100;
				laserincisiondepth=(patxithinnest *70)/100;
				K1power = k1d;
				K2power = k2d;
				K1axis = k1axis;
				K2axis = k2axis;
				if (K1power>K2power){
					incision=K1axis;
				}
				else{
					incision=K2axis;
				}
						
				//Check OD or OS
				if (eye == "left"){
					//$RingRotationValue = 180 - $incision;
					RingRotationValue = - incision;
					//$RingRotationValue =  -(180-$incision);
				}
				else{
					RingRotationValue = 180 - incision;	
					//$RingRotationValue = -$incision;	
				}	
			}	
			
			else if (pathology=="Bowtie")
			{		
				//Use two simmetric rings of same Thikness and Arc
				anillos=2;	
				OZ = '';
				grado="120";
				grado2="120";
				
				if (patxithinnest>=400 &&  patxithinnest<450){
					grosor = 150;
				}
				else if (patxithinnest>=450 &&  patxithinnest<500){
					grosor = 200;
				}
				else if (patxithinnest>=500 &&  patxithinnest<550){
					grosor = 250;
				}
				else if (patxithinnest>=550){
					grosor = 300;
				}
				grosor2= grosor;
							
				//Incision
				manualincisiondepth=(patxisteep * 80)/100;
				laserincisiondepth=(patxithinnest *70)/100;
				K1power = k1d;
				K2power = k2d;
				K1axis = k1axis;
				K2axis = k2axis;
				if (K1power>K2power)
					incision=K1axis;
				else
					incision=K2axis;
						
				//Check OD or OS
				if (eye == "left")
					RingRotationValue = - incision;
				else
					//$RingRotationValue = 180 - $incision;	
					RingRotationValue = (180-incision);	
			}

			$("#oz-result").html(OZ)
			$("#ferrararing-result").html( grado + "°/" + grosor +"&#956;m");
			$("#incision-result").html(incision + "&#176;");
			$("#incisiondepth-result").html(manualincisiondepth)
			
			if (anillos==2){
			$("#ferrararing2p").show();
			$("#ferrararing2-result").html(grado2 + "°/" + grosor2 +"&#956;m" );
			}	
			
			
		}
		
		
		
		
		
		
		
		else if(nomogram=="intacs")
		{
			/*valor por defecto*/
		
		
			$("#pachymetryDiv").show();
			$("#cornealdivintacs").show();
			$("#ferraraRingDiv").show();
			$("#incisionIntacs").show();
			$("#laserdiv").show();
			
			spherepower=$("#spherePowerValue").val();
			$("#spherepowervalue-result").html(spherepower);
			cyl=$("#refractionValue").val();
			$("#cylvalue-result").html(cyl);
			axis=$("#refractionAxis").val();
			$("#axisvalue-resutl").html(axis);
			coneapex=$("#coneApex").val();
			$("#coneApex").html(coneapex);
			
			
			if((pathology=="Myopia") || (pathology=="Keratoconus" && coneapex=="Decentered" && cyl>=-2.0) )
			{	
				anillos=2;
				if (0>=spherepower && spherepower>-0.75){grosor = 210;grosor2=210;grado=150;grado2=150;}
				else if (-0.75>=spherepower && spherepower>-1.0){grosor = 230;grosor2=230;grado=150;grado2=150;}			
				else if (-1.0>=spherepower && spherepower>-1.30){grosor = 250;grosor2=250;grado=150;grado2=150;}
				else if (-1.30>=spherepower && spherepower>-1.7){grosor = 275;grosor2=275;grado=150;grado2=150;}
				else if (-1.70>=spherepower && spherepower>-2.0){grosor = 300;grosor2=300;grado=150;grado2=150;}
				else if (-2.0>=spherepower && spherepower>-2.30){grosor = 325;grosor2=325;grado=150;grado2=150;}
				else if (-2.3>=spherepower && spherepower>-2.70){grosor = 350;grosor2=350;grado=150;grado2=150;}
				else if (-2.7>=spherepower && spherepower>-3.00){grosor = 375;grosor2=375;grado=150;grado2=150;}
				else if (-3.0>=spherepower && spherepower>-3.40){grosor = 400;grosor2=400;grado=150;grado2=150;}
				else if (-3.4>=spherepower && spherepower>-3.70){grosor = 425;grosor2=425;grado=150;grado2=150;}
				else if (-4.0>=spherepower ){grosor = 450;grosor2=450;grado=150;grado2=150;}							
			}
			else if ((pathology=='Keratoconus' ) && coneApex=='Centered')
			{
				anillos=2;
				if (0>=spherepower && spherepower>-1.0){grosor = 210;grosor2=210;grado=150;grado2=150;}
				else if (-1.0>=spherepower && spherepower>-1.75){grosor = 250;grosor2=250;grado=150;grado2=150;}			
				else if (-2.0>=spherepower && spherepower>-2.75){grosor = 300;grosor2=300;grado=150;grado2=150;}			
				else if (-3.0>=spherepower && spherepower>-3.75){grosor = 350;grosor2=350;grado=150;grado2=150;}
				else if (-4.0>=spherepower && spherepower>-4.75){grosor = 400;grosor2=400;grado=150;grado2=150;}
				else if (-5.0>=spherepower ){grosor = 450;grosor2=450;grado=150;grado2=150;}					
			}			
			else if ((pathology=='Keratoconus' ) &&  coneapex=='Decentered')
			{
				anillos=2;
				if (-2.0>cyl && cyl>-3.0){grosor = 350;grosor2=210;grado=150;grado2=150;}
				else if (-3.0>=cyl && cyl>-4.0){grosor = 400;grosor2=210;grado=150;grado2=150;}			
				else if (-4.0>=cyl){grosor = 450;grosor2=210;grado=150;grado2=150;}				
			}
		
			//Incision
			manualincisiondepth=(patxisteep * 80)/100;
			laserincisiondepth=(patxithinnest * 70)/100;
			K1power = k1d;
			K2power = k2d;
			K1axis = k1axis;
			K2axis = k2axis;
			if (K1power>K2power){
				incision=K1axis;
			}
			else{
				incision=K2axis;
			}
					
			//Check OD or OS
			if (eye == "left"){
				RingRotationValue = - incision;
			}
			else{
				RingRotationValue = 180 - incision;	
			}
			
			
			$("#ferrararing-result").html( grado + "°/" + grosor +"&#956;m");
			//$("#incision").html(incision + "&#176;");
			$("#incisiondepth-result").html(manualincisiondepth)
			alert(anillos);
			if (anillos==2){
			$("#ferrararing2p").show();
			$("#ferrararing2-result").html(grado2 + "°/" + grosor2 +"&#956;m" );
			}	
			
			
			
		}
		else if(nomogram=="intacssk")
		{
			$("#pachymetryDiv").show();
			$("#ferraraRingDiv").show();
			$("#incisionIntacs").show();
			$("#laserdiv").show();
		
			spherepower=$("#spherePowerValue").val();
			$("#spherepowervalue-result").html(spherepower);
			cyl=$("#refractionValue").val();
			$("#cylvalue-result").html(cyl);
			axis=$("#refractionAxis").val();
			$("#axisvalue-resutl").html(axis);
			coneapex=$("#coneApex").val();
			$("#coneApex").html(coneapex);

			
			if (coneapex=='Centered')
			{		
				$("#cornealdivintacssk").show();			
				anillos=2;			
				if      ( spherepower>-1.0)    {grosor = 210;grosor2=210;grado=150;grado2=150;}			
				else if (-1.0>=spherepower && spherepower>-2.0) {grosor = 250;grosor2=250;grado=150;grado2=150;}
				else if (-2.0>=spherepower && spherepower>-4.0) {grosor = 300;grosor2=300;grado=150;grado2=150;}
				else if (-4.0>=spherepower && spherepower>-6.0) {grosor = 350;grosor2=350;grado=150;grado2=150;}
				else if (-6.0>=spherepower && spherepower>-8.0) {grosor = 400;grosor2=400;grado=150;grado2=150;}
				else if (-8.0>=spherepower && spherepower>-10.0){grosor = 450;grosor2=450;grado=150;grado2=150;}			
			}
			else if ((coneapex=='Decentered') && cyl >-3.0)
			{
			
				$("#cornealdivintacsskDecen").show();
				anillos=2;
				if      (0>=spherepower && spherepower>-0.75)   {grosor = 210;grosor2=210;grado=150;grado2=150;}
				else if (-0.75>=spherepower && spherepower>-1.0){grosor = 230;grosor2=230;grado=150;grado2=150;}
				else if (-1.0>=spherepower && spherepower>-1.3) {grosor = 250;grosor2=250;grado=150;grado2=150;}
				else if (-1.3>=spherepower && spherepower-1.7) {grosor = 275;grosor2=275;grado=150;grado2=150;}
				else if (-1.7>=spherepower && spherepower>-2.0) {grosor = 300;grosor2=300;grado=150;grado2=150;}
				else if (-2.0>=spherepower && spherepower>-2.3) {grosor = 325;grosor2=325;grado=150;grado2=150;}
				else if (-2.3>=spherepower && spherepower>-2.7) {grosor = 350;grosor2=350;grado=150;grado2=150;}
				else if (-2.7>=spherepower && spherepower>-3.0) {grosor = 375;grosor2=375;grado=150;grado2=150;}
				else if (-3.0>=spherepower && spherepower>-3.4) {grosor = 400;grosor2=400;grado=150;grado2=150;}
				else if (-3.4>=spherepower && spherepower>-3.7) {grosor = 425;grosor2=425;grado=150;grado2=150;}
				else if (-3.7>=spherepower)                      {grosor = 450;grosor2=450;grado=150;grado2=150;}
			}			
			else if ((coneapex=='Decentered') && cyl <=-3.0)
			{
				$("#cornealdivintacsskDecen").show();
				anillos=2;
				if (-3.0>=cyl && cyl>-5.0)      {grosor = 350;grosor2=210;grado=150;grado2=150;}
				else if (-5.0>=cyl && cyl>-7.0) {grosor = 400;grosor2=210;grado=150;grado2=150;}
				else if (-7.0>=cyl )            {grosor = 450;grosor2=210;grado=150;grado2=150;}
			}
			
			
			//Incision
			manualincisiondepth=(patxisteep *80)/100;
			laserincisiondepth=(patxithinnest *70)/100;
			K1power = k1d;
			K2power = k2d;
			K1axis = k1axis;
			K2axis = k2axis;
			if (K1power>K2power){
				incision=K1axis;
			}
			else{
				incision=K2axis;
			}		
			//Check OD or OS
			if (eye == "left"){
				RingRotationValue = - incision;
			}
			else{
				RingRotationValue = 180 - incision;	
			}
			$("#ferrararing-result").html( grado + "°/" + grosor +"&#956;m");
			//$("#incision").html(incision + "&#176;");
			$("#incisiondepth-result").html(manualincisiondepth)
			
			if (anillos==2){
			$("#ferrararing2p").show();
			$("#ferrararing2-result").html(grado2 + "°/" + grosor2 +"&#956;m" );
			}	
			
			
			
		}
		else if(nomogram=="newintacs")
		{
			$("#pachymetryDiv").show();
			$("#ferraraRingDiv").show();
			$("#incisionIntacs").show();
			$("#laserdiv").show();
		
			spherepower=$("#spherePowerValue").val();
			$("#spherepowervalue-result").html(spherepower);
			cyl=$("#refractionValue").val();
			$("#cylvalue-result").html(cyl);
			axis=$("#refractionAxis").val();
			$("#axisvalue-resutl").html(axis);
			coneapex=$("#coneApex").val();
			$("#coneApex").html(coneapex);
			
			coneapexpos=$("#coneApexPos").val();
			$("#coneapexpos").html(coneapexpos);
			
		
		
		
			tunel=0;
			pathology='';
			sphericalEquivalent = spherePower + (cyl/2.0);		

			if (spherePower<cyl)
			{
				anillos=2;			
				tunel = 6;
				if      ( sphericalEquivalent<=0.0 && sphericalEquivalent>=-0.75) {grosor = 210;grosor2=210;grado=150;grado2=150;}
				else if (-1.0>=sphericalEquivalent && sphericalEquivalent>=-1.75) {grosor = 250;grosor2=250;grado=150;grado2=150;}
				else if (-2.0>=sphericalEquivalent && sphericalEquivalent>=-3.75) {grosor = 300;grosor2=300;grado=150;grado2=150;}
				else if (-4.0>=sphericalEquivalent && sphericalEquivalent>=-5.75) {grosor = 350;grosor2=350;grado=150;grado2=150;}
				else if (-6.0>=sphericalEquivalent && sphericalEquivalent>=-7.75) {grosor = 400;grosor2=400;grado=150;grado2=150;}
				else if (-8.0>=sphericalEquivalent && sphericalEquivalent>=-9.95) {grosor = 450;grosor2=450;grado=150;grado2=150;}	
				else if (-10.0>=sphericalEquivalent){grosor = 500;grosor2=500;grado=150;grado2=150;}	
			}
			else if ( spherepower == cyl && coneapex=='Centered')
			{ 
				anillos=2;			
				tunel = 6;
				if      ( sphericalEquivalent<=0.0 && sphericalEquivalent>=-0.75) {grosor = 210;grosor2=210;grado=150;grado2=150;}
				else if (-1.0>=sphericalEquivalent && sphericalEquivalent>=-1.75) {grosor = 250;grosor2=250;grado=150;grado2=150;}
				else if (-2.0>=sphericalEquivalent && sphericalEquivalent>=-3.75) {grosor = 300;grosor2=300;grado=150;grado2=150;}
				else if (-4.0>=sphericalEquivalent && sphericalEquivalent>=-5.75) {grosor = 350;grosor2=350;grado=150;grado2=150;}
				else if (-6.0>=sphericalEquivalent && sphericalEquivalent>=-7.75) {grosor = 400;grosor2=400;grado=150;grado2=150;}
				else if (-8.0>=sphericalEquivalent && sphericalEquivalent>=-9.95) {grosor = 450;grosor2=450;grado=150;grado2=150;}	
				else if (-10.0>sphericalEquivalent)							    {grosor = 500;grosor2=500;grado=150;grado2=150;}	
			}
			else if ( spherepower == cyl && coneapex=='Decentered')
			{ 
				anillos=2;
				tunel = 6;			
				if      ( cyl<=-2.0 && cyl>=-2.75){grosor = 300;grosor2=210;grado=150;grado2=150;}
				else if (-3.0>=cyl && cyl>=-4.75) {grosor = 350;grosor2=210;grado=150;grado2=150;}
				else if (-5.0>=cyl && cyl>=-6.75) {grosor = 400;grosor2=210;grado=150;grado2=150;}			
				else if (-7.0>cyl)							  {grosor = 450;grosor2=210;grado=150;grado2=150;}	
			}
			else if (( spherepower > cyl  &&  coneapex=='Centered'  )  || ((cyl<0 && spherepower>0)  &&  coneapex=='Centered' ))
			{
				
				anillos=2;			
				tunel = 7;
				if      ( ( spherepower<=3.0 && spherepower>=-1.5) && (cyl<=-3.0 && cyl>=-4.75) ) {grosor = 300;grosor2=300;grado=90;grado2=90;}
				else if ( ( spherepower<=3.0 && spherepower>=-1.5) && (cyl<=-5.0 && cyl>=-6.75) ) {grosor = 350;grosor2=350;grado=90;grado2=90;}
				else if ( ( spherepower<=3.0 && spherepower>=-1.5) && (cyl<=-7.0) ) 							{grosor = 400;grosor2=400;grado=90;grado2=90;}
				else if ( (-1.75>=spherepower)	 && (cyl<=-3.0 && cyl>=-4.75))                      {grosor = 350;grosor2=350;grado=90;grado2=90;}
				else if ( (-1.75>=spherepower)	 && (cyl<=-5.0 && cyl>=-6.75))                      {grosor = 400;grosor2=400;grado=90;grado2=90;}
				else if ( (-1.75>=spherepower)	 && (cyl<=-7.0))              						            {grosor = 450;grosor2=450;grado=90;grado2=90;}
			}		
			
			else if ( (spherepower > cyl  &&  coneapex=='Decentered' && coneapexpos>=3.0 && coneapexpos<5.0 ) || ((cyl<0 && spherepower>0)  &&  coneapex=='Decentered' && coneapexpos>=3.0 && coneapexpos<5.0 ))
			{
				//echo "Astigmatism<Myopia/ Astigmatism+Hyperopia:";
				anillos=1;	
				tunel = 6;
				if      ( ( spherepower<=3.0 && spherepower>=-1.0) && (cyl<=-2.0 && cyl>=-2.75) ) {anillos=1;grosor = 350;grosor2=0;grado=150;grado2=0;}
				else if ( ( spherepower<=3.0 && spherepower>=-1.0) && (cyl<=-3.0 && cyl>=-4.75) ) {anillos=1;grosor = 400;grosor2=0;grado=150;grado2=0;}
				else if ( ( spherepower<=3.0 && spherepower>=-1.0) && (cyl<=-5.0 && cyl>=-6.75) ) {anillos=1;grosor = 450;grosor2=0;grado=150;grado2=0;}
				else if ( ( spherepower<=3.0 && spherepower>=-1.0) && (cyl<=-7.0) ) 							{anillos=1;grosor = 500;grosor2=0;grado=150;grado2=0;}			
				else if ( (-1.25>=spherepower)	 && (cyl<=-2.25 && cyl>=-2.75))                     {anillos=2;grosor = 300;grosor2=210;grado=150;grado2=150;}
				else if ( (-1.25>=spherepower)	 && (cyl<=-3.0 && cyl>=-4.75))                      {anillos=2;grosor = 350;grosor2=210;grado=150;grado2=150;}
				else if ( (-1.25>=spherepower)	 && (cyl<=-5.0 && cyl>=-6.75))                      {anillos=2;grosor = 400;grosor2=210;grado=150;grado2=150;}
				else if ( (-1.25>=spherepower)	 && (cyl<=-7.0))              						            {anillos=2;grosor = 450;grosor2=210;grado=150;grado2=150;}
			}	
			else if ( (spherepower > cyl && coneapex=='Decentered' && coneapexpos>=5.0 && coneapexpos<7.0 ) || ((spherepower<0 && spherePower>0)  &&  coneapex=='Decentered' && coneapexpos>=5.0 && coneapexpos<7.0 ))
			{
				//echo "Astigmatism<Myopia/ Astigmatism+Hyperopia:";
				anillos=1;	
				tunel = 7;
				if      ( ( spherepower<=3.0 && spherepower>=-1.0) && (cyl<=-2.0 && cyl>=-2.75) ) {anillos=1;grosor = 350;grosor2=0;grado=150;grado2=0;}
				else if ( ( spherepower<=3.0 && spherepower>=-1.0) && (cyl<=-3.0 && cyl>=-4.75) ) {anillos=1;grosor = 400;grosor2=0;grado=150;grado2=0;}
				else if ( ( spherepower<=3.0 && spherepower>=-1.0) && (cyl<=-5.0 && cyl>=-6.75) ) {anillos=1;grosor = 450;grosor2=0;grado=150;grado2=0;}
				else if ( ( spherepower<=3.0 && spherepower>=-1.0) && (cyl<=-7.0) ) {anillos=1;grosor = 500;grosor2=0;grado=150;grado2=0;}								
				else if ( cyl<spherepower &&  coneapex=='Decentered' && cyl<=-3.0 && spherepower>=-2.0) {anillos=1;grosor = 250;grosor2=0;grado=210;grado2=0;}
			}	
				
			if (tunel==6){
				$("#cornealdivnewintacst6").show();
				
			}
			if (tunel==7){
				$("#cornealdivnewintacst7").show();
			}							
				
				
				
				
			//Incision
			manualincisiondepth=(patxisteep*80)/100;
			laserincisiondepth=(patxithinnest*70)/100;
			K1power = k1d;
			K2power = k2d;
			K1axis = k1axis;
			K2axis = k2axis;
			/*if ($K1power>$K2power)
				$incision=$K1axis;
			else
				$incision=$K2axis;
					
			//Check OD or OS
			if ($_POST['eye'] == "Left")
				$RingRotationValue = - $incision;
			else
				$RingRotationValue = 180 - $incision;	
			*/	
				
				
			//As in Ferrara 5
			if (eye == "left")
				incision=60;
			else
				incision=120;
						
			//Check OD or OS
			if (eye == "left")			
				RingRotationValue = -60;
			else
				RingRotationValue =  180 -120;	;	
				
			$("#ferrararing-result").html( grado + "°/" + grosor +"&#956;m");
			//$("#incision").html(incision + "&#176;");
			$("#incisiondepth-result").html(manualincisiondepth)
			
			if (anillos==2){
			$("#ferrararing2p").show();
			$("#ferrararing2-result").html(grado2 + "°/" + grosor2 +"&#956;m" );
			}
		}
		
		if (grado==90){
			ringType="img/90R.png";
		}
		if (grado==120){
			ringType="img/120R.png";
		}
		if (grado==140){
			ringType="img/140R.png";
		}
		if (grado==150){
			ringType="img/150R.png";
		}
		else if (grado==160){
			ringType="img/160R.png";
		}
		else if (grado==210){
			ringType="img/210R.png";
		}

		if (anillos==2){					
			if (grado2==90){
				ringType2="img/90R.png";
			}
			if (grado2==120){
				ringType2="img/120R.png";
			}
			if (grado2==140){
				ringType2="img/140R.png";
			}
			if (grado2==150){
				ringType2="img/150R.png";
			}
			else if (grado2==160){
				ringType2="img/160R.png";
			}
			else if (grado2==210){
				ringType2="img/150R.png";
			}
		}												
		
		//"<img src=" + ringType + "id='ring1' style='position:absolute;top:0px;left:195px;z-index:999;transform-origin: 50% 50%;transform: rotate(" + RingRotationValue + "deg);-moz-transform-origin: 50% 50%;-moz-Transform:rotate(" + RingRotationValue + "deg);-ms-transform-origin: 50% 50%;-ms-Transform:rotate(" + RingRotationValue + "deg);-webkit-transform-origin: 50% 50%;-webkit-Transform:rotate(" + RingRotationValue + "deg)'/>";					
		$("#imgNomo").html( "<img src='img/OjoBaseNew.png' id='ojo' style='position:absolute;bottom:60px;left:20px;'/><img src='" + ringType + "' id='ring1' style='position:absolute;bottom:60px;left:20px;;z-index:999;transform-origin: 50% 50%;transform: rotate(" + RingRotationValue + "deg);-moz-transform-origin: 50% 50%;-moz-Transform:rotate(" + RingRotationValue + "deg);-ms-transform-origin: 50% 50%;-ms-Transform:rotate(" + RingRotationValue + "deg);-webkit-transform-origin: 50% 50%;-webkit-Transform:rotate(" + RingRotationValue + "deg)'/>" );
		
		
		
		//Put Thickest Ring Down
		if (anillos==2){
			if (grosor2>grosor){
				temp = ringType;
				ringType = ringType2;
				ringType2 = temp;
			}
		}
		
		if (anillos==2)
		{
		RingRotationValue2 = RingRotationValue + 180;	
			$("#imgNomo").html( "<img src='img/OjoBaseNew.png' id='ojo' style='position:absolute;bottom:60px;left:20px;'/><img src='" + ringType + "' id='ring1' style='position:absolute;bottom:60px;left:20px;;z-index:999;transform-origin: 50% 50%;transform: rotate(" + RingRotationValue + "deg);-moz-transform-origin: 50% 50%;-moz-Transform:rotate(" + RingRotationValue + "deg);-ms-transform-origin: 50% 50%;-ms-Transform:rotate(" + RingRotationValue + "deg);-webkit-transform-origin: 50% 50%;-webkit-Transform:rotate(" + RingRotationValue + "deg)'/>" +
			"<img src='" + ringType2 + "' id='ring1' style='position:absolute;bottom:60px;left:20px;;z-index:999;transform-origin: 50% 50%;transform: rotate(" + RingRotationValue2 + "deg);-moz-transform-origin: 50% 50%;-moz-Transform:rotate(" + RingRotationValue2 + "deg);-ms-transform-origin: 50% 50%;-ms-Transform:rotate(" + RingRotationValue2 + "deg);-webkit-transform-origin: 50% 50%;-webkit-Transform:rotate(" + RingRotationValue2 + "deg)'/>"
			);
		}					


		
		


	}
	




