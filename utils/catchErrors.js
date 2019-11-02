const catchErrors = (error, displayError) => {
    let errorMsg;
    if (error.response) {
        // req was made, server resonded with status code that is not 200s
        errorMsg = error.response.data;
        console.error('Error response', errorMsg);

        //for cloudinary img uploads
        if (error.response.data.error) {
            errorMsg = error.response.data.error.message;
        }
    } else if (error.request) {
        //req was made, no res was received
        errorMsg = error.request;
        console.error('Error request', errorMsg);
    } else {
        //something else happened
        errorMsg = error.message;
        console.error('Error message', errorMsg);
    }
    displayError(errorMsg);
};

export default catchErrors;
