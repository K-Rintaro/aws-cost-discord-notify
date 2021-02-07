# aws-cost-discord-notify
AWS cost notification system for Discord

## What is this?
aws-cost-discord-notify is the effective system that can check AWS cost daily & monthly.\
The notifications are pushed to Discord.

## How to Use
1. Create your Discord bot at https://discord.com/developers/applications
2. Create AWS IAM user and get access key id & secret access key 

Example policy:
```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ce:*"
      ],
      "Resource": [
        "*"
      ]
    }
  ]
}
```
3. Create .env file and set Discord token, AWS access key and AWS secret access key that you got.\
You can check the example .env file from env.example
4. Set your Discord channel id at index.js
