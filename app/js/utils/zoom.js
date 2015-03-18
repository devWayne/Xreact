 function clacImgZoomParam(maxWidth, maxHeight, width, height) {
     var param = {
         top: 0,
         left: 0,
         width: width,
         height: height
     };
     if (width > maxWidth || height > maxHeight) {
         rateWidth = width / maxWidth;
         rateHeight = height / maxHeight;

         if (rateWidth > rateHeight) {
             param.width = maxWidth;
             param.height = Math.round(height / rateWidth);
         } else {
             param.width = Math.round(width / rateHeight);
             param.height = maxHeight;
         }
     }

     param.left = Math.round((maxWidth - param.width) / 2);
     param.top = Math.round((maxHeight - param.height) / 2);
     return param;
 }

module.exports = clacImgZoomParam;

