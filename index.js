const SlackBot=require('slackbots');
const axios=require('axios');

const bot=new SlackBot({
	token:'xoxb-512192529110-510188918497-aA8AF61v7SpVJSdoGnvsWX7U',
	name:'jokebot'
});

bot.on('start',function(){
	const params={
		icon_emoji:':smiley:'
	};

	bot.postMessageToChannel('general','Get Ready To Laugh With @Jokebot',params);

});

bot.on('error',function(err)
{
	console.log(err);
});

bot.on('message',function(data){
	if(data.type!=='message'){
		return;
	}

	handlemessage(data.text);
});

function handlemessage(message){

	if(message.includes(' chucknorris')){
		chuck();
	}
	else if(message.includes(' yomama')){
        yomama();
	}
	else if(message.includes(' random')){
		random();
	}
	else if(message.includes(' help')){
		help();
	}
}

function chuck()
{
	axios.get('http://api.icndb.com/jokes/random').then(function(res){
		const joke=res.data.value.joke;

		const params={
		icon_emoji:':laughing:'
	};

	bot.postMessageToChannel('general','Chuck Norris:' + joke,params);

});
}

function yomama()
{
	axios.get('https://api.yomomma.info/').then(function(res){
		const joke=res.data.joke;

		const params={
		icon_emoji:':laughing:'
	};

	bot.postMessageToChannel('general','Yo Mama:' + joke,params);

});
}

function random()
{
	const rd=Math.floor((Math.random()*2)+1);
	if(rd==1)
	{
		chuck();
	}
	else if(rd==2)
	{
		yomama();
	}
}

function help()
{
	const params={
		icon_emoji:':question:'
	};

	bot.postMessageToChannel('general','Type @jokebot with either "chucknorris" or "yomama" or "random" to get a joke',params);

}
