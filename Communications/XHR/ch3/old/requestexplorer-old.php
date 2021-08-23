<?php
    
    $fileName = rand() . "1.xml";
    $fh = fopen("webdav/userfiles/" . $fileName, 'w') or die("can't open file");
    $message = 
    "<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\r\n
        <pollresults>\r\n
        <rating>1</rating>\r\n
        <average>3</average>\r\n
        <votes>100</votes>\r\n
        </pollresults>\r\n
    " ;
    fwrite($fh, $message);
    fclose($fh);
    
    $dirName = rand();
    $curDirectory = "userfiles";
 
?>
 
 
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<title>Chapter 3 : XMLHttpRequest - Request Explorer</title>
<style type="text/css">
 
    body {font-family: Verdana, Arial, Sans-serif;}
    h1 {text-align: center;}
    .deleteButton {background-color: transparent; color: #990000; font-weight: bold; font-size: larger; border-style: hidden; margin-left: 5px;}
    #responseOutput {border-top-style: dashed; border-top-width: 2px;}
</style>
 
<link rel="stylesheet" href="global.css" type="text/css" media="screen" />
<script type="text/javascript">
 
 
var fileName = "<?php echo $fileName; ?>";
var dirName = "<?php echo $dirName; ?>";
var curDirectory = "<?php echo $curDirectory; ?>";
var lockToken = "";
 
function escapeValue(value)
{
 var escapedVal = (encodeURIComponent) ? encodeURIComponent(value) : escape(value);
 return escapedVal.replace(/\%20/g,'+');
}
 
function createXHR()
{
   try { return new XMLHttpRequest(); } catch(e) {}
   try { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); } catch (e) {}
   try { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); } catch (e) {}
   try { return new ActiveXObject("Msxml2.XMLHTTP"); } catch (e) {}
   try { return new ActiveXObject("Microsoft.XMLHTTP"); } catch (e) {}
 
   return null;
}
 
 
function sendRequest(form)
{
    var url = "http://ajaxref.com/ch3/showrequest.php";
    var responseOutput = document.getElementById("responseOutput");
    responseOutput.innerHTML = "";
    
    var xhr = createXHR();
    if (xhr)
    {
     var postBody = null;
     //get payload
     var payload = "";
     for (var i=0; i < g_payloadList.length;i++)
     {
        if (payload != "")
            payload += "&";
        
        var id = g_payloadList[i].id.substring(3);
        
        var key = document.getElementById(("inputname" + id)).value.replace(/^\s+|\s+$/g, "");
        if (key != "")
        {
            var val = document.getElementById(("inputvalue" + id)).value;
            payload += escapeValue(key) + "=" + escapeValue(val);
        }
    }    
    
     var requestMethod = form.requestMethod.options[form.requestMethod.selectedIndex].text;
     switch (requestMethod)
      {
       case "GET":
               url += "?" + payload;
            break;
       case "LOCK":
       case "UNLOCK":
       case "MOVE":
       case "PROPFIND":
       case "PROPPATCH":
       case    "COPY":
               url = "http://ajaxref.com/ch3/webdav/" + curDirectory + "/" + fileName;
            break;
       case "MKCOL":
               url = "http://ajaxref.com/ch3/webdav/userfiles/" + dirName;
            break;
       case "OPTIONS" : url = "http://ajaxref.com/*";
                        break;
       
      }
      
     var async = form.async.checked;
     xhr.open(requestMethod, url, async);
     
     switch(requestMethod)//yes again
     {
        case "POST":
            postBody = payload;               
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            break;
        case "COPY":
            xhr.setRequestHeader("Overwrite", "T");
            //intentially fall through
        case "MOVE":
            (curDirectory == "userfiles") ? curDirectory = "userfiles/move"  : curDirectory = "userfiles"; 
            xhr.setRequestHeader("Destination", "http://ajaxref.com/ch3/webdav/" + curDirectory + "/" + fileName);
            break;
        case "LOCK":
            postBody = "<";
            postBody += "?xml version=\"1.0\" encoding=\"utf-8\" ?>\n";
            postBody += "<d:lockinfo xmlns:d=\"DAV:\">\n";
              postBody += "<d:lockscope><d:exclusive/></d:lockscope>\n";
              postBody += "<d:locktype><d:write/></d:locktype>\n";
            postBody += "</d:lockinfo>\n";
            break;
        case "UNLOCK":
            postBody = "<";
            postBody += "?xml version=\"1.0\" ?>\n";
            postBody += "<D:transactioninfo xmlns:D=\"DAV:\">\n";
               postBody += "<D:transactionstatus><D:commit/></D:transactionstatus>\n";
            postBody += "</D:transactioninfo>\n";
            xhr.setRequestHeader("Lock-Token", lockToken);
            break;
        case "PROPFIND":
            postBody = "<";
            postBody += "?xml version=\"1.0\"?>\n";
            postBody += "<a:propfind xmlns:a=\"DAV:\">\n";
            postBody += "<a:prop><a:getcontenttype/></a:prop>\n";
            postBody += "</a:propfind>\n";
            xhr.setRequestHeader("Depth", 0);
            xhr.setRequestHeader("Translate", "f");
            break;
        case "PROPPATCH":
            postBody = "<";
            postBody += "?xml version=\"1.0\"?>\n";
            postBody += "<d:propertyupdate xmlns:d=\"DAV:\" xmlns:o=\"urn:schemas-microsoft-com:office:office\">\n";
              postBody += "<d:set>\n";
            postBody += "<d:prop>\n";
              postBody += "<o:Author>Thomas Powell</o:Author>\n";
            postBody += "</d:prop>\n";
              postBody += "</d:set>\n";
            postBody += "</d:propertyupdate>\n";
            break;
     }
         
        
     //set request headers
     for (var i=0; i < g_customHeadersList.length;i++)
     {
        var id = g_customHeadersList[i].id.substring(3);
        var key = document.getElementById(("inputname" + id)).value.replace(/^\s+|\s+$/g, "");
        if (key != "")
        {
            var val = document.getElementById(("inputvalue" + id)).value;
            xhr.setRequestHeader(key, val);
        }
    }
    for (var i=0; i < g_standardHeadersList.length;i++)
     {
        var id = g_standardHeadersList[i].id.substring(3);
        var sel = document.getElementById(("selectname" + id));
        var key =  sel.options[sel.selectedIndex].text;
        var val = document.getElementById(("inputvalue" + id)).value;
        xhr.setRequestHeader(key, val);
        
    }
     if (async)
         xhr.onreadystatechange = function(){handleResponse(xhr,requestMethod,postBody);};
     xhr.send(postBody);
    } 
    
    if (!async)
        handleResponse(xhr);
    
 
}
 
function handleResponse(xhr, requestMethod, postBody)
{
    if (xhr.readyState == 4)
    {
     if (xhr.status == 200)
      {
        var responseString, requestString;
        var responseOutput = document.getElementById("responseOutput");
        var converted = xhr.getAllResponseHeaders().replace(/<([^>]*)>/g, "&lt;$1&gt;");
        converted = converted.replace(/\n/g, "<br/>");
        
        switch(requestMethod)
        {
           case "LOCK":
                   requestString = '<strong>Payload</strong><div class="data">' + postBody.replace(/<([^>]*)>/g, "&lt;$1&gt;").replace(/\n/g, "<br/>") + '</div>';
                   responseString = '<div class="data">' + xhr.responseText.replace(/<([^>]*)>/g, "&lt;$1&gt;").replace(/\n/g, "<br/>") + '</div>';
                lockToken = xhr.getResponseHeader("Lock-Token");
                alert(lockToken);
                   break;
           default: 
                   requestString =    xhr.responseText;
                responseString = '<div class="data" title="In this example the payload is the network details">N/A</div>'; 
        }
        
        responseOutput.innerHTML = '<h3>Request</h3>' + requestString;
        responseOutput.innerHTML += '<h3>Response</h3><strong>Headers</strong><div class="data">' + converted + '</div><strong>Payload</strong>' + responseString;
        
        
        
        responseOutput.style.display = "";
      }
     else 
      {
       var responseOutput = document.getElementById("responseOutput");
       var converted = xhr.getAllResponseHeaders();
       if (converted)
       {
        converted = converted.replace(/<([^>]*)>/g, "&lt;$1&gt;");
        converted = converted.replace(/\n/g, "<br/>");
       }
        
       if (postBody)
           responseOutput.innerHTML = '<h3>Request</h3><strong>Payload</strong><div class="data">' + postBody.replace(/<([^>]*)>/g, "&lt;$1&gt;").replace(/\n/g, "<br/>") + '</div>';
       else
           responseOutput.innerHTML = '';
        
       responseOutput.innerHTML += '<h3>Response</h3><strong>Status</strong><div class="data"> ' + xhr.status + " " + xhr.statusText + '</div>';
       responseOutput.innerHTML += '<strong>Headers</strong><div class="data">' + converted + '</div>';
       responseOutput.innerHTML += '<strong>Payload</strong><div class="data">' + xhr.responseText.replace(/<([^>]*)>/g, "&lt;$1&gt;").replace(/\n/g, "<br/>") + '</div>';
       responseOutput.style.display = "";        
      }
    }
}
 
var g_rowCount = 1;
var g_payloadList  = new Array();
var g_standardHeadersList  = new Array();
var g_customHeadersList  = new Array();
 
function makeNewRow(headerRowName, buttonRowName, addSelect, list)
{
    var buttonRow = document.getElementById(buttonRowName);
    var parentTable = buttonRow.parentNode;
    var headerRow = document.getElementById(headerRowName);
    
    /* build a container */
    var row = document.createElement("tr");
    row.id = "row" + g_rowCount;
    
    var td = document.createElement("td");
    
    if (addSelect)
    {
        /* Add the select filed */
        var duplicateSelect = document.getElementById("duplicateSelect");
        var requestHeaderSelect = duplicateSelect.cloneNode(true);
        requestHeaderSelect.id = "selectname" + g_rowCount;
        requestHeaderSelect.name = "selectname" + g_rowCount;
        requestHeaderSelect.style.visibility = "visible";
        td.appendChild(requestHeaderSelect);
    }
    else
    {
        /* add text input name field */
        var inputField = document.createElement("input");
        inputField.type = "text";
        inputField.size = "40";
        inputField.id = "inputname" + g_rowCount;
        inputField.name = "inputname" + g_rowCount;
 
        td.appendChild(inputField);
    }
    
    row.appendChild(td);
    
    td = document.createElement("td");
    /* add text input value field */
    
    var valueField = document.createElement("input");
    valueField.type = "text";
    valueField.size = "40";
    valueField.id = "inputvalue" + g_rowCount;
    valueField.name = "inputvalue" + g_rowCount;
 
    td.appendChild(valueField);
    row.appendChild(td);
    
    /* add a remove button */
 
    td = document.createElement("td");
    var deleteButton = document.createElement("img");
    deleteButton.src = "delete.gif";
    deleteButton.className = "deleteButton";
    deleteButton.alt = "X";
    deleteButton.onclick =  function(){removeRow(row, list);};
    td.appendChild(deleteButton);
    row.appendChild(td);
    
    
    headerRow.style.display = "";
    /* add particular the controls */
    parentTable.insertBefore(row, buttonRow);    
        
    /* update our counts */
    list.push(row);
    g_rowCount++;
}
 
function removeRow(row, list)
{
  /* remove from array */
  for (var i=0; i < list.length;i++)
     if (list[i].id == row.id)
       list.splice(i, 1);
       
  /* remove form control */
  var parentTable = row.parentNode;
  parentTable.removeChild(row);
  
}
 
function updateFields(methodSelect)
{
    var requestMethod = methodSelect.options[methodSelect.selectedIndex].text;
    var payload = document.getElementById("payload");
        
    if (requestMethod != "GET" && requestMethod != "POST")
        payload.style.visibility = "hidden";
    else
        payload.style.visibility = "visible";
 
}
 
function updateDAV(davCheck, requestMethod)
{
    if (davCheck.checked)
    {
        var davOptions = ["MOVE", "PROPFIND", "PROPPATCH", "MKCOL", "COPY", "LOCK", "UNLOCK"];
        for (var i=0;i<davOptions.length;i++)
        {
            var option = document.createElement("option");
            var txt = document.createTextNode(davOptions[i]);
              option.appendChild(txt)
            requestMethod.appendChild(option);
        }    
        
    }
    else
    {
        for (var i=13;i>6;i--)
            requestMethod.remove(i);
 
    }
}
 
window.onload = function () 
{ 
 document.requestForm.requestButton.onclick = function () { sendRequest(this.form); };
 
 document.getElementById('payloadButton').onclick = function(){makeNewRow('payloadHeader', 'payloadButtonRow', false, g_payloadList);};
 
 document.getElementById('standardHeadersButton').onclick = function(){makeNewRow('standardHeadersHeader', 'standardHeadersButtonRow', true, g_standardHeadersList);};
 document.getElementById('customHeadersButton').onclick = function(){makeNewRow('customHeadersHeader', 'customHeadersButtonRow', false, g_customHeadersList);};
 
 document.requestForm.requestMethod.onchange = function(){updateFields(this);};
 document.requestForm.DAV.onchange = function(){updateDAV(this, this.form.requestMethod);};
};
</script>
 
</head>
<body>
<h1>Ajax Request Explorer</h1>
<form action="#" name="requestForm">
 
<fieldset>
<legend>Basic</legend>
<label>HTTP Method
  <select name="requestMethod">
      <option>GET</option>
    <option>HEAD</option>
    <option>POST</option>
    <option>PUT</option>
    <option>DELETE</option>
    <option>OPTIONS</option>
    <option>TRACE</option>
    <option>NOTMETHOD</option>
   </select>
 </label>
 <label>&nbsp;&nbsp;Allow WebDAV: <input type="checkbox" name="DAV" /></label>
 <br />
 <label>URL: <input type="text" name="url" size="40" value="http://ajaxref.com/ch3/showrequest.php" readonly="readonly" name="queryString" /></label><br />
 <label>Asynchronous:
 <input type="checkbox" name="async" value="true" checked="checked" /> 
 </label>
</fieldset>
 
 <br /><br />
 
 <div id="StandardHeaders">
 <fieldset>
 <legend>Standard Request Headers</legend>
 
    <table>        
    <tr id="standardHeadersHeader"  style="display:none;">
        <th>Name</th><th colspan="2">Value</th>
    </tr>    
    <tr id="standardHeadersButtonRow">
        <td colspan="3"><img src="add.gif" id="standardHeadersButton" alt="Add Standard Header" /></td>
    </tr>        
    </table>
 </fieldset>
 
</div>
 
<br /><br />
 
<div id="CustomHeaders">
<fieldset>
<legend>Custom Request Headers</legend>
    <table>        
    <tr id="customHeadersHeader"  style="display:none;">
        <th>Name</th><th colspan="2">Value</th>
    </tr>    
    <tr id="customHeadersButtonRow">
    
        <td colspan="3">
        <img src="add.gif" id="customHeadersButton" alt="Add Custom Request Header" />
        </td>
    </tr>        
    </table>
 </fieldset> 
</div>
 
<br /><br />
<div id="payload">
 <fieldset>
 <legend>Payload</legend>
    <table>        
    <tr id="payloadHeader" style="display:none;">
        <th>Name</th><th colspan="2">Value</th>
    </tr>    
    
    
    <tr id="payloadButtonRow">
        <td colspan="3" >
        <img src="add.gif" id="payloadButton" alt="Add name-value pair" />
       </td>
    </tr>        
    </table>
 </fieldset> 
</div>
 
<br /><br /><br />
  <input type="button" name="requestButton" value="Send Request" />
  
  <select id="duplicateSelect" style="visibility:hidden;">
      <option>Accept</option>
      <option>Accept-Charset</option> 
    <option>Accept-Encoding</option>
    <option>Accept-Language</option>
    <option>Authorization</option>
    <option>Cache-Control</option>
    <option>Charge-To</option> 
    <option>Connection</option>
    <option>Content-Base</option>
    <option>Content-Language</option> 
    <option>Content-Encoding</option>
    <option>Content-Length</option> 
    <option>Content-Location</option> 
    <option>Content-MD5</option> 
    <option>Content-Range</option> 
    <option>Content-Type</option> 
    <option>Content-Version</option> 
    <option>Host</option>
    <option>Date</option>
    <option>Delta-Base</option> 
    <option>Depth</option> 
    <option>Destination</option> 
    <option>ETag</option> 
    <option>Expect</option>
    <option>From</option> 
    <option>If-Match</option>
    <option>If-Modified-Since</option>
    <option>If-None-Match</option> 
    <option>If-Range</option> 
    <option>If-Unmodified-Since</option> 
    <option>Keep-Alive</option>
    <option>Max-Forwards</option> 
    <option>MIME-Version</option> 
    <option>Overwrite</option>
    <option>Pragma</option> 
    <option>Proxy-Authorization</option>
    <option>Range</option> 
    <option>Referer</option>
    <option>SOAPAction</option> 
    <option>TE</option>
    <option>Timeout</option> 
    <option>Trailer</option>
    <option>Transfer-Encoding</option> 
    <option>Upgrade</option>
    <option>User-Agent</option>
    <option>Via</option>
    <option>Warning</option>
  </select>
</form>
<br />
 
<div id="responseOutput" class="results" style="display:none;">&nbsp;</div>
 
</body>
</html>