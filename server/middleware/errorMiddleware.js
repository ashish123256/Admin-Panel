export const notFound = (req,res,next) => {
    const error =  new Error(`NOt found - ${req.originalUrl}`)
    res.status(404);
    next(error);
}