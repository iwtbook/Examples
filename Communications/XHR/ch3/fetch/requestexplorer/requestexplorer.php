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
 
 
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Chapter 3 : Fetch - Request Explorer</title>
<style>
  body {font-family: Verdana, Arial, Sans-serif;}
  h1 {text-align: center;}
  .deleteButton {background-color: transparent; color: #990000; font-weight: bold; font-size: larger; border-style: hidden; margin-left: 5px;}
  #responseOutput {border-top-style: dashed; border-top-width: 2px;}
</style>

<link rel="stylesheet" href="global.css" />
<script>

  let fileName = '<?php echo $fileName; ?>';
  let dirName = '<?php echo $dirName; ?>';
  let curDirectory = '<?php echo $curDirectory; ?>';
  let lockToken = '';

  function sendRequest(form) {
    let url = 'http://ajaxref.com/ch3/showrequest.php';
    let responseOutput = document.getElementById('responseOutput');
    responseOutput.innerHTML = '';

    let postBody = null;

    let payloadURL = new URL(url);

    for (let i=0; i < g_payloadList.length;i++) {
      let id = g_payloadList[i].id.substring(3);
      
      let key = document.getElementById(`inputname${id}`).value.trim();
      if (key != '') {
        let val = document.getElementById(`inputvalue${id}`).value;
        payloadURL.searchParams.set(key, val);
      }
    }

    let methodDropdown = document.getElementById('requestMethod');
    let requestMethod = methodDropdown.options[methodDropdown.selectedIndex].text;
    switch (requestMethod) {
      case 'GET':
        url = payloadURL;
        break;
      case 'LOCK':
      case 'UNLOCK':
      case 'MOVE':
      case 'PROPFIND':
      case 'PROPPATCH':
      case 'COPY':
        url = `http://ajaxref.com/ch3/webdav/${curDirectory}/${fileName}`;
        break;
      case 'MKCOL':
        url = `http://ajaxref.com/ch3/webdav/userfiles/${dirName}`;
        break;
      case 'OPTIONS' : 
        url = 'http://ajaxref.com/*';
        break;
    }

    let async = document.getElementById('async').checked;

    let headers = new Headers();
    
    switch(requestMethod) { // yes, again
      case 'POST':
        postBody = (payloadURL.search).substring(1); // get search params as string, without beginning ? character       
        headers.set('Content-Type', 'application/x-www-form-urlencoded');
        break;
      case 'COPY':
        headers.set('Overwrite', 'T');
        //intentially fall through
      case 'MOVE':
        curDirectory = (curDirectory == 'userfiles') ? 'userfiles/move' : 'userfiles'; 
        headers.set('Destination', `http://ajaxref.com/ch3/webdav/${curDirectory}/${fileName}`);
        break;
      case 'LOCK':
        postBody = `<
          ?xml version="1.0" encoding="utf-8" ?>
          <d:lockinfo xmlns:d="DAV:">
          <d:lockscope><d:exclusive/></d:lockscope>
          <d:locktype><d:write/></d:locktype>
          </d:lockinfo>
        `;
        break;
      case 'UNLOCK':
        postBody = `<
          ?xml version="1.0" ?>
          <D:transactioninfo xmlns:D="DAV:">
          <D:transactionstatus><D:commit/></D:transactionstatus>
          </D:transactioninfo>
        `;
        headers.set('Lock-Token', lockToken);
        break;
      case 'PROPFIND':
        postBody = `<
          ?xml version="1.0"?>
          <a:propfind xmlns:a="DAV:">
          <a:prop><a:getcontenttype/></a:prop>
          </a:propfind>
        `;
        headers.set('Depth', 0);
        headers.set('Translate', 'f');
        break;
      case 'PROPPATCH':
        postBody = `<
          ?xml version="1.0"?>
          <d:propertyupdate xmlns:d="DAV:" xmlns:o="urn:schemas-microsoft-com:office:office">
          <d:set>
          <d:prop>
          <o:Author>Thomas Powell</o:Author>
          </d:prop>
          </d:set>
          </d:propertyupdate>
        `;
        break;
    }
      
    
    //set request headers
    for (let customHeader of g_customHeadersList) {
      let id = customHeader.id.substring(3);
      let key = document.getElementById(`inputname${id}`).value.trim();
      if (key != '') {
        let val = document.getElementById(`inputvalue${id}`).value;
        headers.set(key, val);
      }
    }
    for (let standardHeader of g_standardHeadersList) {
      let id = standardHeader.id.substring(3);
      let sel = document.getElementById(`selectname${id}`);
      let key =  sel.options[sel.selectedIndex].text;
      let val = document.getElementById(`inputvalue${id}`).value;
      headers.set(key, val);
    }

    if (async) { // async
      let httpResponse;
      fetch(url, {
        method: requestMethod,
        headers,
        body: postBody
      })
      .then(response => {
        httpResponse = response;
        return response.text();
      })
      .then(responseText => handleResponse(httpResponse, responseText, requestMethod, postBody));
    } else { // synchronous
      syncSendRequest(url, requestMethod, headers);
    }
  }

  async function syncSendRequest(url, requestMethod, headers) {
    let responseOutput = document.getElementById('responseOutput');
    responseOutput.style.display = '';

    let response = await fetch(url, { method: requestMethod, headers });
    let responseText = await response.text();
    handleResponse(response, responseText);
  }


  function handleResponse(response, responseText, requestMethod, postBody) {
    let responseOutput = document.getElementById('responseOutput');

    let headerString = '';
    response.headers.forEach((value, name) => {
      headerString += `${name}: ${value}<br />`;
    });

    if (response.ok) {
      let responseString, requestString;

      switch(requestMethod) {
        case 'LOCK':
          requestString = `<strong>Payload</strong><div class="data">${postBody.replace(/<([^>]*)>/g, "&lt;$1&gt;").replace(/\n/g, "<br />")}</div>`;
          responseString = `<div class="data">${responseText.replace(/<([^>]*)>/g, "&lt;$1&gt;").replace(/\n/g, "<br />")}</div>`;
          lockToken = response.headers.get('Lock-Token');
          alert(lockToken);
          break;
        default: 
          requestString = responseText;
          responseString = '<div class="data" title="In this example the payload is the network details">N/A</div>'; 
      }
      
      responseOutput.innerHTML = `<h3>Request</h3>${requestString}`;
      responseOutput.innerHTML += `<h3>Response</h3><strong>Headers</strong><div class="data">${headerString}</div><strong>Payload</strong>${responseString}`;
      
      responseOutput.style.display = '';
    } else {
      if (postBody)
        responseOutput.innerHTML = `<h3>Request</h3><strong>Payload</strong><div class="data">${postBody.replace(/<([^>]*)>/g, "&lt;$1&gt;").replace(/\n/g, "<br />")}</div>`;
      else
        responseOutput.innerHTML = '';
      
      responseOutput.innerHTML += `<h3>Response</h3><strong>Status</strong><div class="data"> ${response.status} ${response.statusText}</div>`;
      responseOutput.innerHTML += `<strong>Headers</strong><div class="data">${headerString}</div>`;
      responseOutput.innerHTML += `<strong>Payload</strong><div class="data">${responseText.replace(/<([^>]*)>/g, "&lt;$1&gt;").replace(/\n/g, "<br />")}</div>`;
      responseOutput.style.display = '';        
    }
  }
  
  let g_rowCount = 1;
  let g_payloadList  = new Array();
  let g_standardHeadersList  = new Array();
  let g_customHeadersList  = new Array();
  
  function makeNewRow(headerRowName, buttonRowName, addSelect, list) {
    let buttonRow = document.getElementById(buttonRowName);
    let parentTable = buttonRow.parentNode;
    let headerRow = document.getElementById(headerRowName);
    
    // build a container 
    let row = document.createElement('tr');
    row.id = `row${g_rowCount}`;
    
    let td = document.createElement('td');
    
    if (addSelect) {
      // add the select filed 
      let duplicateSelect = document.getElementById('duplicateSelect');
      let requestHeaderSelect = duplicateSelect.cloneNode(true);
      requestHeaderSelect.id = `selectname${g_rowCount}`;
      requestHeaderSelect.name = `selectname${g_rowCount}`;
      requestHeaderSelect.style.visibility = 'visible';
      td.appendChild(requestHeaderSelect);
    } else {
      // add text input name field 
      let inputField = document.createElement('input');
      inputField.type = 'text';
      inputField.size = '40';
      inputField.id = `inputname${g_rowCount}`;
      inputField.name = `inputname${g_rowCount}`;

      td.appendChild(inputField);
    }
    
    row.appendChild(td);
    
    td = document.createElement('td');
    // add text input value field
    
    let valueField = document.createElement('input');
    valueField.type = 'text';
    valueField.size = '40';
    valueField.id = `inputvalue${g_rowCount}`;
    valueField.name = `inputvalue${g_rowCount}`;

    td.appendChild(valueField);
    row.appendChild(td);
    
    // add a remove button

    td = document.createElement('td');
    let deleteButton = document.createElement('img');
    deleteButton.src = 'delete.gif';
    deleteButton.className = 'deleteButton';
    deleteButton.alt = 'X';
    deleteButton.addEventListener('click', () => removeRow(row, list));
    td.appendChild(deleteButton);
    row.appendChild(td);
    
    
    headerRow.style.display = '';
    // add particular the controls
    parentTable.insertBefore(row, buttonRow);    
        
    // update our counts
    list.push(row);
    g_rowCount++;
  }

  function removeRow(row, list) {
    // remove from array
    for (let i=0; i < list.length;i++)
      if (list[i].id == row.id)
        list.splice(i, 1);

    // remove form control
    let parentTable = row.parentNode;
    parentTable.removeChild(row);
  }

  function updateFields(methodSelect) {
    let requestMethod = methodSelect.options[methodSelect.selectedIndex].text;
    let payload = document.getElementById('payload');

    if (requestMethod != 'GET' && requestMethod != 'POST')
      payload.style.visibility = 'hidden';
    else
      payload.style.visibility = 'visible';
  }

  function updateDAV(davCheck, requestMethod) {
    if (davCheck.checked) {
      let davOptions = ['MOVE', 'PROPFIND', 'PROPPATCH', 'MKCOL', 'COPY', 'LOCK', 'UNLOCK'];
      for (let davOption of davOptions) {
        let option = document.createElement('option');
        let txt = document.createTextNode(davOption);
        option.appendChild(txt);
        requestMethod.appendChild(option);
      }   
    } else {
      for (let i=13;i>6;i--)
        requestMethod.remove(i);
    }
  }

  window.addEventListener('DOMContentLoaded', function() { 
    document.getElementById('requestButton').addEventListener('click', function() { sendRequest(this.form); });
    
    document.getElementById('payloadButton').addEventListener('click', () => { makeNewRow('payloadHeader', 'payloadButtonRow', false, g_payloadList); });
    
    document.getElementById('standardHeadersButton').addEventListener('click', () => { makeNewRow('standardHeadersHeader', 'standardHeadersButtonRow', true, g_standardHeadersList); });
    document.getElementById('customHeadersButton').addEventListener('click', () => { makeNewRow('customHeadersHeader', 'customHeadersButtonRow', false, g_customHeadersList); });
    
    document.getElementById('requestMethod').addEventListener('change', function() { updateFields(this); });
    document.getElementById('DAV').addEventListener('change', function() { updateDAV(this, this.form.requestMethod); });
  });
</script>
 
</head>
<body>
<h1>Ajax Request Explorer</h1>
<form name="requestForm">
  <fieldset>
    <legend>Basic</legend>
    <label>HTTP Method
      <select id="requestMethod">
        <option>GET</option>
        <option>HEAD</option>
        <option>POST</option>
        <option>PUT</option>
        <option>DELETE</option>
        <option>OPTIONS</option>
        <option>NOTMETHOD</option>
      </select>
    </label>
    <label>&nbsp;&nbsp;Allow WebDAV: <input type="checkbox" id="DAV" /></label>
    <br />
    <label>URL: <input type="text" id="url" size="40" value="http://ajaxref.com/ch3/showrequest.php" readonly="readonly" name="queryString" /></label><br />
    <label>Asynchronous:
      <input type="checkbox" id="async" value="true" checked="checked" /> 
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
  <input type="button" id="requestButton" value="Send Request" />
  
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
 
<output id="responseOutput" class="results" style="display:none;">&nbsp;</output>
 
</body>
</html>