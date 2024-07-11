export const catchAsyncError=(theErr)=>{
    return (req, res, next) => {
        Promise.resolve(theErr(req, res, next)).catch(next)
    };
}