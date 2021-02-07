require('dotenv').config();

const config = { 
    apiVersion: '2017-10-25',
    accessKeyId : process.env.AccessKeyId,
    secretAccessKey : process.env.SecretAccessKey,
    region : 'us-east-1'
}

const CostExplorer = require('aws-cost-explorer');
const ce = CostExplorer(config);

const fetch = require('node-fetch')
const cron = require('node-cron')

const Discord = require('discord.js'); 
const client = new Discord.Client();

cron.schedule('0 0 23 * * *', () => {
    ce.getTodayCosts(null, function(err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log(JSON.stringify(data))
            var amount = data.Total.Amount
            fetch('https://www.gaitameonline.com/rateaj/getrate')
              .then(res => res.json())
              .then(body => {
                var usdjpy = body.quotes[20].bid
                var jpyfinal = usdjpy * amount
                client.on('ready', () => {
                    console.log(`Logged in as ${client.user.tag}!`)
                })
                client.channels.cache.get('YOUR_DISCORD_CHANNEL_ID').send({
                    embed: {
                        title: "Today's AWS Cost Notification",
                        color: 7506394,
                        timestamp: new Date(),
                        footer: {
                            text: "©️2021 Rintaro Kobayashi | MIT License"
                          },
                        thumbnail: {
                            url: "https://futurumresearch.com/wp-content/uploads/2020/01/aws-logo.png"
                        },
                        fields: [
                            {
                              name: "The amount of AWS cost",
                              value: `${amount} USD`
                            },
                            {
                              name: "USD :arrow_right: JPY",
                              value: `${jpyfinal} JPY`
                            }
                        ]
                    }
                })
            })
        }
    });
})

cron.schedule('0 0 23 1 * *', () => {
    ce.getTodayCosts(null, function(err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log(JSON.stringify(data))
            var amount = data.Total.Amount
            fetch('https://www.gaitameonline.com/rateaj/getrate')
              .then(res => res.json())
              .then(body => {
                var usdjpy = body.quotes[20].bid
                var jpyfinal = usdjpy * amount
                client.on('ready', () => {
                    console.log(`Logged in as ${client.user.tag}!`)
                })
                client.channels.cache.get('YOUR_DISCORD_CHANNEL_ID').send({
                    embed: {
                        title: "Last month's AWS Cost Notification",
                        color: 7506394,
                        timestamp: new Date(),
                        footer: {
                            text: "©️2021 Rintaro Kobayashi | MIT License"
                          },
                        thumbnail: {
                            url: "https://futurumresearch.com/wp-content/uploads/2020/01/aws-logo.png"
                        },
                        fields: [
                            {
                              name: "The amount of AWS cost",
                              value: `${amount} USD`
                            },
                            {
                              name: "USD :arrow_right: JPY",
                              value: `${jpyfinal} JPY`
                            }
                        ]
                    }
                })
            })
        }
    });
})

client.login(process.env.Discord_Token);
