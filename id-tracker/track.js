var token = atob("T1RJek9UWTVNRGcxT0RNeU9ESTJPVE13LlljWHZSQS5iMkt4VGJlUUpiMHpFM2l4LTE4N2M3eHl2aUE=")

var infos = async (id, token) => {
    const response = await fetch("https://canary.discordapp.com/api/v9/users/" + id, {
        method: 'GET',
        headers: {
            'Authorization': 'Bot ' + token
        },
    })
    return await response.json();
}

var avatar = async (id, token) => {
    const response = await fetch("https://canary.discordapp.com/api/v9/users/" + id, {
        method: 'GET',
        headers: {
            'Authorization': 'Bot ' + token
        },
    })
    let avatar = await response.json();
    return "https://cdn.discordapp.com/avatars/" + id + "/" + avatar.avatar
}

var banner = async (id, token) => {
    const response = await fetch("https://canary.discordapp.com/api/v9/users/" + id, {
        method: 'GET',
        headers: {
            'Authorization': 'Bot ' + token
        },
    })
    let data = await response.json();
    return "https://cdn.discordapp.com/banners/" + id + "/" + data.banner + "?size=512"
}

document.getElementById("submit").addEventListener("click", function () {
    search(document.getElementById("input_user_id").value)
})

search = async (id) => {
    let userData = await infos(id, token)
    console.log(userData)
    if(userData.banner || userData.banner != null) {
        document.getElementById("user_banner").classList.remove("hidden")
        document.getElementById("user_banner").src = await banner(id, token)
    
    } else {
        document.getElementById("user_banner").classList.add("hidden")
    }
    
    document.getElementById("user_id").innerText = userData.id
    document.getElementById("username").innerText = userData.username + "#" + userData.discriminator
    document.getElementById("userAvatar").src = await avatar(id, token)

    if(userData.public_flags=== 64) {
        document.getElementById("house_img").src = "https://discord.com/assets/64ae1208b6aefc0a0c3681e6be36f0ff.svg"
    }
    if(userData.public_flags=== 128) { 
        document.getElementById("house_img").src = "https://discord.com/assets/48cf0556d93901c8cb16317be2436523.svg"
    }
    if(userData.public_flags=== 256) { 
        document.getElementById("house_img").src = "https://discord.com/assets/9fdc63ef8a3cc1617c7586286c34e4f1.svg"
    }

    document.getElementById("results_container").classList.remove('hidden')
}
