# 🌌 Omada Webhook to Discord
An easy script for integrating Discord Webhooks with the Omada Controller. It allows sending logs from the controller to a selected Discord channel.

![Discord_gVcpXzaMEdDg.png](images/Discord_gVcpXzaMEdDg.png)
*ENABLE_DATA_CENSORING=true*

## Worth Knowing
✅ Discord @mentions for critical alerts (detected attack, errors, etc.)  
✅ [Middleware](middlewares/verifySecret.js) responsible for verifying the `shardSecret`.  
✅ Ability to enable censorship of sensitive data.  
✅ Ready [configuration](ecosystem.config.js) for [PM2](https://www.npmjs.com/package/pm2).  
✅ Built in [Node.js](https://nodejs.org) using the [Express.js](https://www.npmjs.com/package/express) framework.

## Cloning
```bash
git clone https://github.com/sefinek/Omada-Webhook-to-Discord.git
```

## Endpoint
After running this script, webhooks from your controller should be directed to this endpoint:
```
POST /discord/webhook
```

### Example
```
http://192.168.0.145:8080/discord/webhook
```

## MIT License
Copyright 2024-2025 © by [Sefinek](https://sefinek.net). All Rights Reserved.