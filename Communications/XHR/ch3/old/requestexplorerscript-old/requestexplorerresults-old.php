<?php
 
    require('database.inc');
    
    header("Cache-Control: no-cache");
    header("Pragma: no-cache");
        
    //get headers
    $headers = array();
    $query =      "SELECT distinct headerName from browser_headers_support ORDER BY headerName";
    $results = $mdb2->query($query);
    while ($row = $results->fetchRow())
        $headers[] = $row["headername"];  
    
    $browserdata = array("Firefox"=>array("version"=>"2.0"), "IE"=>array("version"=>"7.0"), "Opera"=>array("version"=>"9.1"), "Safari"=>array("version"=>"2.0"));
    $ignoreHeaders = array("Accept-Charset", "Accept-Encoding", "Content-Length", "Expect", "Date", "Host", "Keep-Alive", "Referer", "TE", "Trailer", "Transfer-Encoding", "Upgrade");
    $replaceHeaders = array("Authorization", "Content-Base", "Content-Location", "Content-MD5", "Content-Range", "Content-Type", "Content-Version", "Delta-Base", "Depth", "Destination", "ETag", "From", "If-Modified-Since", "If-Range", "If-Unmodified-Since", "Max-Forwards", "MIME-Version", "Overwrite", "Proxy-Authorization", "SOAPAction", "Timeout"); 
 
    //get browser data
    $query = "    SELECT * from browser_headers_support
                WHERE 
                    (    browserName = 'IE'
                        AND browserOS = 'WinXP'
                        AND browserVersion = '7'
                        AND browserVersionMinor = '0'
                    )
                OR
                    (
                        browserName = 'Firefox'
                        AND browserOS = 'WinXP'
                        AND browserVersion = '2'
                        AND browserVersionMinor = '0'
                    )
                OR
                    (
                        browserName = 'Opera'
                        AND browserOS = 'WinXP'
                        AND browserVersion = '9'
                        AND browserVersionMinor = '1'
                    )
                OR
                    (
                        browserName = 'Safari'
                        AND browserOS = 'MacOSX'
                        AND browserVersion = '2'
                        AND browserVersionMinor = '0'
                    )
            ";
            
    $results = $mdb2->query($query);
    while ($row = $results->fetchRow())
    {
        $browserdata[$row["browsername"]][$row["headername"]] =$row["headerstatus"];  
    }
    
?>
 
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<title>Chapter 3 : XMLHttpRequest - Request Explorer Results</title>
<link rel="stylesheet" href="global.css" type="text/css" media="screen" />
</head>
<body>
<h3>setRequestHeader() by Browser Results</h3>
<table border=1 width="100%" cellpadding=5 cellspacing=0>
<tr><th>Header Name</th><th>Expected Behavior</th>
<?php
foreach($browserdata as $browserName=>$browserData)
    print "<th>$browserName " . $browserData["version"] . "</th>";
?>
</tr>
 
<?php
foreach($headers as $headerName)
{
    print "<tr><td>$headerName</td>";
    if (in_array($headerName, $ignoreHeaders))
        $expected = "unchanged";
    else if (in_array($headerName, $replaceHeaders))
        $expected = "modified";
    else
        $expected = "appended";
    
    print "<td>$expected</td>";    
    foreach($browserdata as $browserName=>$data)
    {
        if (isset($data[$headerName]))
            $actual = $data[$headerName];
        else if ($headerName == "User-Agent")
            $actual = "modified";
        else
            $actual = "No Info";
            
        if ($actual == $expected)
            $className = "match";
        else if ($expected == "appended" && $actual == "modified")
            $className = "unknown";
        else if ($expected == "unchanged" && $actual == "does not exist")
            $className = "match";
        else
            $className = "nomatch";
            
        print "<td class='$className'>$actual</td>";
    }
    print "</tr>";
}
?>
</table>
 
</body>
</html>