const mySecret = process.env['TOKEN']
require("dotenv")
const {
    Client,
    Util,
    Collection,
    MessageEmbed,
    Structures
} = require("discord.js");
const Discord = require('discord.js');
const client = new Client({
    disableEveryone: true
})
const keepAlive = require('./server.js')
keepAlive()

const config = require("./config.json")
const ServerID = config.GuildID
const channelID = config.CfsID
const LogChannel = config.CfsLogID
const Database = require("@replit/database")
const db = new Database()
const picExt = [".webp", ".png", ".jpg", ".jpeg", ".gif"];
const videoExt = [".webm", ".mp4", ".mov"];
async function createEmbed(text, message) {
    const newembed = new Discord.MessageEmbed()
        .setColor(`RANDOM`)
        .setDescription(text)
    return message.channel.send(newembed) //.then(msg=>msg.delete({timeout:60000}));
}
client.on('ready', async () => {
    //  console.clear()
    console.log(`${client.user.tag} is online!`)
    //await db.delete("CfsCount")

})
client.on('message', async (message, args) => {
    // cfs
    if (message.author.bot) return;
    let check = await db.get("CfsCount")
    if (check == null) db.set("CfsCount", 0)
    let checklogs = await db.get("logs")
    if (checklogs == null) db.set("logs", [])
    if (message.channel.type === "dm") {
        let CfsCount = await db.get("CfsCount")
        let logs = await db.get("logs")
        let userID = message.author.id
        if (message.content.startsWith(config.PREFIX.toLowerCase() + "anon", "Anon")) {

            var args = message.content.split(" ").slice(0)
            var args = args.slice(1).join(" ")
            if (!args) return createEmbed("**❌ | Silakan masukkan Pesan Rahasia**", message)
            var guildID = ServerID


            createEmbed("**💌 | Pesan Rahasiamu telah terkirim!**", message).then(msg => msg.delete({
                timeout: `${10000}`
            }))
            CfsCount += 1;
            await db.set("CfsCount", CfsCount)
            logs.push(message.author.id)
            await db.set("logs", logs)

            if (args.length > 1024) return message.reply("Isi pesan antum terlalu panjang (Batas 1024) :/")
            let embed = new Discord.MessageEmbed()
                .setTitle(`📧   Anonymous`)
                .setDescription(args)
                .setFooter(`Goodissues Confession`)
                .setTimestamp()
            let embed1 = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setAuthor(`Pesan rahasia Log #${CfsCount}`, client.user.displayAvatarURL())
                .setDescription(args)
                .setFooter("pesan rahasia Dikirim oleh:  " + message.author.tag + " ", message.author.avatarURL)
                .setTimestamp()
            if (message.attachments.size > 0) {
                let attachment = message.attachments.first()
                picExt.forEach(async (ext) => {
                    if (attachment.name.endsWith(ext)) {
                        embed.setImage(attachment.url);
                        embed1.setImage(attachment.url);
                        client.guilds.cache.get(guildID).channels.cache.get(channelID).send(embed).catch(console.log(`Pesan diterima dari ${userID}!(${message.author.username}) kepada ${ServerID}`))
                        var channelIDS = LogChannel
                        if (channelIDS == "no-channel") return
                        client.guilds.cache.get(guildID).channels.cache.get(channelIDS).send(embed1)
                    }
                });
                videoExt.forEach(async (ext) => {
                    if (attachment.name.endsWith(ext)) {
                        client.guilds.cache.get(guildID).channels.cache.get(channelID).send(`**Pesan Rahasia baru #${CfsCount}**`, attachment).catch(console.log(`Pesan diterima dari ${userID}!(${message.author.username}) kepada ${ServerID}`))
                        var channelIDS = LogChannel
                        if (channelIDS == "no-channel") return
                        client.guilds.cache.get(guildID).channels.cache.get(channelIDS).send(`**Pesan Rahasia baru #${CfsCount}\nPesan Rahasia dikirim oleh: ${message.author.tag}**`, attachment).catch(console.log(`Pesan diterima dari ${userID}!(${message.author.username}) kepada ${ServerID}`))
                    }
                });
            } else {
                client.guilds.cache.get(guildID).channels.cache.get(channelID).send(embed).catch(console.log(`Pesan diterima dari ${userID}!(${message.author.username}) kepada ${ServerID}`))
                var channelIDS = LogChannel
                if (channelIDS === "no-channel") return
                client.guilds.cache.get(guildID).channels.cache.get(channelIDS).send(embed1)
            } 
        } else if (message.content.startsWith(config.PREFIX.toLowerCase() + "pub", "Pub")) {

            var args = message.content.split(" ").slice(0)
            var args = args.slice(1).join(" ")
            if (!args) return createEmbed("**❌ | Silakan masukkan Pesan anda!**", message)
            var guildID = ServerID


            createEmbed("**💌 | Pesanmu telah terkirim!**", message).then(msg => msg.delete({
                timeout: `${10000}`
            }))
            CfsCount += 1;
            await db.set("CfsCount", CfsCount)
            logs.push(message.author.id)
            await db.set("logs", logs)

            if (args.length > 1024) return message.reply("Isi pesan antum terlalu panjang (Batas 1024) :/")
            let embed = new Discord.MessageEmbed()
                .setTitle(`📧   ${message.author.tag}`)
                .setDescription(args)
                .setFooter(`Goodissues Confession`)
                .setTimestamp()
            let embed1 = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setAuthor(`Pesan Normal Log #${CfsCount}`, client.user.displayAvatarURL())
                .setDescription(args)
                .setFooter("Pesan Normal, Dikirim oleh:  " + message.author.tag + " ", message.author.avatarURL)
                .setTimestamp()
            if (message.attachments.size > 0) {
                let attachment = message.attachments.first()
                picExt.forEach(async (ext) => {
                    if (attachment.name.endsWith(ext)) {
                        embed.setImage(attachment.url);
                        embed1.setImage(attachment.url);
                        client.guilds.cache.get(guildID).channels.cache.get(channelID).send(embed).catch(console.log(`Pesan diterima dari ${userID}!(${message.author.username}) kepada ${ServerID}`))
                        var channelIDS = LogChannel
                        if (channelIDS == "no-channel") return
                        client.guilds.cache.get(guildID).channels.cache.get(channelIDS).send(embed1)
                    }
                });
                videoExt.forEach(async (ext) => {
                    if (attachment.name.endsWith(ext)) {
                        client.guilds.cache.get(guildID).channels.cache.get(channelID).send(`**Pesan Normal baru #${CfsCount}**`, attachment).catch(console.log(`Pesan diterima dari ${userID}!(${message.author.username}) kepada ${ServerID}`))
                        var channelIDS = LogChannel
                        if (channelIDS == "no-channel") return
                        client.guilds.cache.get(guildID).channels.cache.get(channelIDS).send(`**Pesan Normal baru #${CfsCount}\nPesan Normal dikirim oleh: ${message.author.tag}**`, attachment).catch(console.log(`Pesan diterima dari ${userID}!(${message.author.username}) kepada ${ServerID}`))
                    }
                });
            } else {
                client.guilds.cache.get(guildID).channels.cache.get(channelID).send(embed).catch(console.log(`Pesan diterima dari ${userID}!(${message.author.username}) kepada ${ServerID}`))
                var channelIDS = LogChannel
                if (channelIDS === "no-channel") return
                client.guilds.cache.get(guildID).channels.cache.get(channelIDS).send(embed1)
            }

        } else if (message.content.startsWith(config.PREFIX.toLowerCase() + "reply")) {
            //let args = message.content.split(" ").slice(0)

            var args = message.content.split(" ").slice(0)
            var args = args.slice(1)

            let Rargs = message.content.split(" ").slice(2).join(" ")
            if (!args[0]) return createEmbed("**❌ | Silakan masukkan jumlah Pesan Rahasia**", message)
            if (isNaN(args[0])) return createEmbed("**❌ | Harap masukkan bilangan bulat!**", message)
            if (!args[1]) return createEmbed("**❌ | Silakan masukkan pesan Anda**", message)
            let userID = logs[args[0] - 1]
            try {
                if (message.author.bot) return;
                const member = client.users.fetch(userID).then(user => {

                    let embed = new Discord.MessageEmbed()
                        .setColor('#FFE9A7')
                        .setAuthor(`Seseorang menjawab Pesanmu`, client.user.avatarURL({
                            dynamic: true
                        }))
                        .setDescription(Rargs)
                        .setTimestamp()

                    user.send(embed)
                    console.log(`Balasan dikirim ke ${userID}!`)
                })
                if (!member) return createEmbed("**Tidak dapat mengirim pesan ke pengguna ini**", message)
                //   member.send(embed).catch(console.log(`Reply was sent to ${userID}!`))
                createEmbed("**Pesan Anda Terkirim!**", message).then(msg => msg.delete({
                    timeout: 10000
                }))
            } catch (error) {
                return createEmbed("**Tidak dapat mengirim pesan ke pengguna ini**", message)
            }
        }
    }
});

client.login(process.env.TOKEN);