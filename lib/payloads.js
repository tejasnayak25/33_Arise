export default [
  "<img src='#' onerror=console.log('ssxss') />",
  "<script>console.log('ssxss');</script>",
  `"/><script>console.log('ssxss');</script>`,
  `=""/><script>console.log('ssxss');</script>`,
  `"><svg onload=console.log('ssxss');>`,
  `' onerror='console.log("ssxss")`,
  'javascript%3Aalert%28%27ssxss%27%29',
  ';javascript:console.log("ssxss");//',
  '<<SCRIPT>console.log("ssxss");//<</SCRIPT>',
  `$('#div').html('<img alt="<x" title="/><img src=x onerror=console.log("ssxss")>">');`,
  "'**console.log('ssxss'));//",
  `javascript:/*--></title></style></textarea></script></xmp><svg/onload='+/"/+/onmouseover=1/+/[*/[]/+console.log('ssxss')//'>`,
  '<a onmouseover="console.log("ssxss")">ssxss</a>',
  `" onmouseover="console.log('ssxss')"`,
  `"onmouseover="console.log('ssxss')"`,
  `"onmouseover="console.log&#40;'ssxss'&#41;"`
];
