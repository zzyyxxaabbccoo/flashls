var JSLoaderPlaylist = {

  onRequestResource : function(instanceId,url, resourceLoadedFlashCallback, resourceFailureFlashCallback) {
    //console.log("JSURLLoader.onRequestResource");
    if(!this.flashObject) {
      this.flashObject = getFlashMovieObject(instanceId);
    }
    this.xhrGET(url,this.xhrReadBytes, this.xhrTransferFailed, resourceLoadedFlashCallback, resourceFailureFlashCallback);
  },
  xhrGET : function (url,loadcallback, errorcallback,resourceLoadedFlashCallback, resourceFailureFlashCallback) {
    var xhr = new XMLHttpRequest();
    xhr.binding = this;
    xhr.resourceLoadedFlashCallback = resourceLoadedFlashCallback;
    xhr.resourceFailureFlashCallback = resourceFailureFlashCallback;
    xhr.open("GET", url, loadcallback? true: false);
    if (loadcallback) {
      xhr.onload = loadcallback;
      xhr.onerror= errorcallback;
      xhr.send();
    } else {
      xhr.send();
      return xhr.status == 200? xhr.response: "";
    }
  },
  xhrReadBytes : function(event) {
    //console.log("playlist loaded");
    this.binding.flashObject[this.resourceLoadedFlashCallback](event.currentTarget.responseText);
  },
  xhrTransferFailed : function(oEvent) {
    console.log("An error occurred while transferring the file :" + oEvent.target.status);
    this.binding.flashObject[this.resourceFailureFlashCallback](res);
  }
}
