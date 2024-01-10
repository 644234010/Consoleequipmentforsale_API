api_version=process.env.API_VERSION

module.exports = (app)=>{

    app.use('/products', require('./products'));
    app.use('/users', require('./users'));
    app.use('/categories', require('./categories'));

    app.get('*', (req,res)=> {
        return res.status(404).send('Not Found !')
    });

}