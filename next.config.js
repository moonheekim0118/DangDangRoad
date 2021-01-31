module.exports={
    compress:true,
    webpack(config, { webpack }){
        const plugins = [...config.plugins];
        const prod = process.env.NODE_ENV==='production';
        return{
            ...config,
            mode: prod? 'production' : 'development',
            devtool: prod? 'hidden-source-map' : 'eval',
            plugins:plugins
        }
    }
};