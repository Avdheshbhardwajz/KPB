const asyncHandeler = (requesthandler) => {
    return (req,res,next)=>{
        Promise.resolve(requesthandler(req,res,next)).
        catch((err) => next(err))
    }
}

export { asyncHandeler }