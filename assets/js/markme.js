let sourceImage, targetRoot, maState;

// save references to the original image and its parent div (positioning root)
function setSourceImage(source) {
    sourceImage = source;
    targetRoot = source.parentElement;
}

function showMarkerArea(target) {
    const markerArea = new markerjs2.MarkerArea(sourceImage);
    // since the container div is set to position: relative it is now our positioning root
    // end we have to let marker.js know that
    markerArea.targetRoot = targetRoot;
    markerArea.addRenderEventListener((imgURL, state) => {
        target.src = imgURL;
        // save the state of MarkerArea
        maState = state;
    });
    markerArea.show();
    // if previous state is present - restore it
    if (maState) {
        markerArea.restoreState(maState);
    }
}

setSourceImage(document.getElementById("sourceImage"));

const sampleImage = document.getElementById("sampleImage");
sampleImage.addEventListener("click", () => {
    showMarkerArea(sampleImage);
});