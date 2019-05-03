class Config{
	
	constructor(app){
		// Setting .html as the default template extension
		this.app.set('view engine', 'html');

		// Initializing the ejs template engine
		this.app.engine('html', require('ejs').renderFile);

		// Telling express where it can find the templates
		this.app.set('views', (__dirname + '/../views'));

		//Files 
		this.app.use(require('express').static(require('path').join('data')));

	}
}
module.exports = Config;